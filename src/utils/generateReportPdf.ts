import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

export const PDF_PROGRESS = {
  PREPARING: '正在整理报告数据…',
  RENDERING: '正在生成报告页面…',
  LAYOUT: '正在排版 PDF…',
  DOWNLOADING: 'PDF 已生成，正在下载…',
  DONE: '报告下载完成',
  FAILED: 'PDF 生成失败，请稍后重试',
} as const

const PDF_BLOCK_SELECTOR =
  ':scope > .report-doc-header, :scope > .report-section:not(.report-section--charts), :scope > .report-section--charts > [data-pdf-block], :scope > .report-summary'

const EXPORT_CLASS = 'report--pdf-export'
const A4_WIDTH_MM = 210
const A4_HEIGHT_MM = 297
const PAGE_MARGIN_MM = 12
const BLOCK_GAP_MM = 4

function formatPdfFilename(): string {
  const now = new Date()
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  return `能碳快测报告_${y}${m}${d}.pdf`
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

function getPdfBlocks(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll(PDF_BLOCK_SELECTOR)) as HTMLElement[]
}

async function waitForReportAssets(container: HTMLElement): Promise<void> {
  if (document.fonts?.ready) {
    await document.fonts.ready
  }

  const images = Array.from(container.querySelectorAll('img'))
  await Promise.all(
    images.map(
      (img) =>
        new Promise<void>((resolve) => {
          if (img.complete) {
            resolve()
            return
          }
          img.addEventListener('load', () => resolve(), { once: true })
          img.addEventListener('error', () => resolve(), { once: true })
        }),
    ),
  )

  const deadline = Date.now() + 4000
  while (Date.now() < deadline) {
    const loadingCharts = container.querySelector('.chart-loading')
    const chartSvgs = container.querySelectorAll('.chart-card svg')
    if (!loadingCharts && chartSvgs.length >= 3) {
      break
    }
    await sleep(120)
  }

  await new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve())
    })
  })
}

function applyExportMode(pageRoot: HTMLElement | null): void {
  pageRoot?.classList.add(EXPORT_CLASS)
}

function removeExportMode(pageRoot: HTMLElement | null): void {
  pageRoot?.classList.remove(EXPORT_CLASS)
}

async function captureBlock(canvasTarget: HTMLElement): Promise<HTMLCanvasElement> {
  return html2canvas(canvasTarget, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff',
    logging: false,
    scrollX: 0,
    scrollY: -window.scrollY,
    windowWidth: canvasTarget.scrollWidth,
    imageTimeout: 15000,
  })
}

interface PageCursor {
  y: number
}

function ensureSpace(
  pdf: jsPDF,
  cursor: PageCursor,
  requiredHeightMm: number,
  pageHeightMm: number,
  marginMm: number,
): void {
  const available = pageHeightMm - marginMm - cursor.y
  if (requiredHeightMm > available) {
    pdf.addPage()
    cursor.y = marginMm
  }
}

function addCanvasToPdf(
  pdf: jsPDF,
  canvas: HTMLCanvasElement,
  cursor: PageCursor,
  contentWidthMm: number,
  pageHeightMm: number,
  marginMm: number,
): void {
  const imgWidthMm = contentWidthMm
  const imgHeightMm = (canvas.height * imgWidthMm) / canvas.width
  const pageContentHeightMm = pageHeightMm - marginMm * 2
  const pxPerMm = canvas.height / imgHeightMm

  let remainingMm = imgHeightMm
  let sourceY = 0

  while (remainingMm > 0.5) {
    const availableMm = pageHeightMm - marginMm - cursor.y
    if (availableMm < 8) {
      pdf.addPage()
      cursor.y = marginMm
      continue
    }

    const sliceMm = Math.min(remainingMm, availableMm, pageContentHeightMm)
    const slicePx = sliceMm * pxPerMm

    const sliceCanvas = document.createElement('canvas')
    sliceCanvas.width = canvas.width
    sliceCanvas.height = Math.ceil(slicePx)
    const ctx = sliceCanvas.getContext('2d')
    if (!ctx) {
      throw new Error('无法创建画布上下文')
    }

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, sliceCanvas.width, sliceCanvas.height)
    ctx.drawImage(
      canvas,
      0,
      sourceY,
      canvas.width,
      slicePx,
      0,
      0,
      canvas.width,
      slicePx,
    )

    const imageData = sliceCanvas.toDataURL('image/jpeg', 0.92)
    pdf.addImage(imageData, 'JPEG', marginMm, cursor.y, imgWidthMm, sliceMm)

    sourceY += slicePx
    remainingMm -= sliceMm
    cursor.y += sliceMm

    if (remainingMm > 0.5) {
      pdf.addPage()
      cursor.y = marginMm
    }
  }

  cursor.y += BLOCK_GAP_MM
}

export async function generateReportPdf(
  documentRoot: HTMLElement,
  onProgress: (message: string) => void,
): Promise<void> {
  const pageRoot = documentRoot.closest('.report') as HTMLElement | null
  applyExportMode(pageRoot)

  try {
    onProgress(PDF_PROGRESS.PREPARING)
    await waitForReportAssets(documentRoot)
    await sleep(200)

    onProgress(PDF_PROGRESS.RENDERING)
    const blocks = getPdfBlocks(documentRoot)
    if (blocks.length === 0) {
      throw new Error('未找到可导出的报告内容')
    }

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    })

    const contentWidthMm = A4_WIDTH_MM - PAGE_MARGIN_MM * 2
    const cursor: PageCursor = { y: PAGE_MARGIN_MM }

    for (let i = 0; i < blocks.length; i += 1) {
      const block = blocks[i]
      const canvas = await captureBlock(block)
      const blockHeightMm = (canvas.height * contentWidthMm) / canvas.width

      ensureSpace(pdf, cursor, Math.min(blockHeightMm, A4_HEIGHT_MM - PAGE_MARGIN_MM * 2), A4_HEIGHT_MM, PAGE_MARGIN_MM)
      addCanvasToPdf(pdf, canvas, cursor, contentWidthMm, A4_HEIGHT_MM, PAGE_MARGIN_MM)

      if (i === Math.floor(blocks.length / 2)) {
        onProgress(PDF_PROGRESS.LAYOUT)
      }
    }

    onProgress(PDF_PROGRESS.DOWNLOADING)
    pdf.save(formatPdfFilename())
    onProgress(PDF_PROGRESS.DONE)
  } finally {
    removeExportMode(pageRoot)
  }
}
