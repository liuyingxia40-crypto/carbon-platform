import type { EChartsOption } from 'echarts'
import type { DemoFormData, DemoResult } from '../demoCalc'
import { CHART_COLORS, CHART_PALETTE } from '../../components/charts/chartTheme'

const axisLabel = { color: CHART_COLORS.muted, fontSize: 11 }
const legendStyle = { textStyle: { color: CHART_COLORS.muted, fontSize: 11 } }

export function getEnergyStructureData(
  result: DemoResult,
  form: DemoFormData,
): { name: string; value: number }[] {
  const elec = result.annualElectricityCost
  const water = result.annualWaterCost
  const costTotal = elec + water || 1
  let elecShare = Math.round((elec / costTotal) * 72)
  let waterShare = Math.round((water / costTotal) * 10)
  let deviceShare = 8
  if (form.hasCentralAC) deviceShare += 3
  if (form.hasChillerPlant) deviceShare += 2
  if (form.hasElevator) deviceShare += 1
  if (form.hasRestaurant) deviceShare += 1
  let opsShare = 100 - elecShare - waterShare - deviceShare
  if (opsShare < 6) {
    opsShare = 6
    const overflow = elecShare + waterShare + deviceShare + opsShare - 100
    elecShare = Math.max(50, elecShare - overflow)
  }
  return [
    { name: '用电', value: elecShare },
    { name: '用水', value: waterShare },
    { name: '设备管理', value: deviceShare },
    { name: '运营因素', value: opsShare },
  ]
}

export function getPriorityScores(form: DemoFormData): { name: string; value: number }[] {
  return [
    { name: '分项计量', value: form.hasSubMetering ? 64 : 86 },
    { name: '空调/冷站', value: form.hasCentralAC || form.hasChillerPlant ? 82 : 68 },
    { name: '照明系统', value: 74 },
    { name: '峰谷电价', value: 78 },
    { name: '电力交易', value: form.hasEms ? 66 : 72 },
  ]
}

export function buildEnergyStructureOption(
  result: DemoResult,
  form: DemoFormData,
): EChartsOption {
  const data = getEnergyStructureData(result, form)
  return {
    color: CHART_PALETTE,
    backgroundColor: CHART_COLORS.bg,
    tooltip: { trigger: 'item', formatter: '{b}: {c}%' },
    legend: { bottom: 0, ...legendStyle },
    series: [
      {
        type: 'pie',
        radius: ['42%', '68%'],
        center: ['50%', '44%'],
        avoidLabelOverlap: true,
        label: { color: CHART_COLORS.title, fontSize: 11 },
        data,
      },
    ],
  }
}

export function buildCarbonCompositionOption(result: DemoResult): EChartsOption {
  return {
    color: [CHART_COLORS.primary, CHART_COLORS.secondary],
    backgroundColor: CHART_COLORS.bg,
    tooltip: { trigger: 'item', formatter: '{b}<br/>{c} tCO₂ ({d}%)' },
    legend: { bottom: 0, ...legendStyle },
    series: [
      {
        type: 'pie',
        radius: ['0%', '68%'],
        center: ['50%', '44%'],
        roseType: 'radius',
        label: { color: CHART_COLORS.title, fontSize: 11 },
        data: [
          { name: '用电相关碳排', value: +result.electricityCarbon.toFixed(1) },
          { name: '用水相关碳排', value: +result.waterCarbon.toFixed(1) },
        ],
      },
    ],
  }
}

export function buildPriorityOption(form: DemoFormData): EChartsOption {
  const data = getPriorityScores(form).sort((a, b) => a.value - b.value)
  return {
    color: [CHART_COLORS.primary],
    backgroundColor: CHART_COLORS.bg,
    grid: { left: 88, right: 36, top: 8, bottom: 8 },
    tooltip: {
      trigger: 'axis',
      formatter: (p: unknown) => {
        const item = (p as { name: string; value: number }[])[0]
        return `${item.name}<br/>优先级评分：${item.value}`
      },
    },
    xAxis: {
      type: 'value',
      max: 100,
      axisLabel: { ...axisLabel },
      splitLine: { lineStyle: { color: CHART_COLORS.grid } },
    },
    yAxis: {
      type: 'category',
      data: data.map((d) => d.name),
      axisLabel: { color: CHART_COLORS.title, fontSize: 11 },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    series: [
      {
        type: 'bar',
        data: data.map((d) => d.value),
        barWidth: 14,
        itemStyle: { borderRadius: [0, 4, 4, 0] },
        label: {
          show: true,
          position: 'right',
          color: CHART_COLORS.secondary,
          fontSize: 10,
          formatter: '{c}',
        },
      },
    ],
  }
}
