export type SceneType = '酒店' | '公寓' | '商业楼宇' | '园区' | '中小企业'

export interface DemoFormData {
  scene: SceneType
  projectName: string
  city: string
  buildingArea: string
  roomCount: string
  annualElectricity: string
  annualElectricityCost: string
  annualWater: string
  annualWaterCost: string
  hasCentralAC: boolean
  hasChillerPlant: boolean
  hasElevator: boolean
  hasRestaurant: boolean
  hasEms: boolean
  hasSubMetering: boolean
}

export interface DemoResult {
  annualElectricity: number
  annualElectricityCost: number
  annualWater: number
  annualWaterCost: number
  unitAreaElectricity: number
  unitRoomElectricity: number
  electricityCarbon: number
  waterCarbon: number
  totalCarbon: number
  risks: string[]
  suggestions: string[]
}

export const SCENE_OPTIONS: SceneType[] = [
  '酒店',
  '公寓',
  '商业楼宇',
  '园区',
  '中小企业',
]

export const DEFAULT_FORM: DemoFormData = {
  scene: '酒店',
  projectName: '乌镇样例酒店',
  city: '嘉兴',
  buildingArea: '12000',
  roomCount: '180',
  annualElectricity: '2800000',
  annualElectricityCost: '2200000',
  annualWater: '45000',
  annualWaterCost: '180000',
  hasCentralAC: true,
  hasChillerPlant: true,
  hasElevator: true,
  hasRestaurant: true,
  hasEms: false,
  hasSubMetering: false,
}

function parseNumber(value: string, fallback: number): number {
  const parsed = Number.parseFloat(value.replace(/,/g, '').trim())
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

export function formatNumber(value: number, decimals = 2): string {
  return value.toLocaleString('zh-CN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

export function computeDemoResult(form: DemoFormData): DemoResult {
  const annualElectricity = parseNumber(
    form.annualElectricity,
    Number.parseFloat(DEFAULT_FORM.annualElectricity),
  )
  const annualElectricityCost = parseNumber(
    form.annualElectricityCost,
    Number.parseFloat(DEFAULT_FORM.annualElectricityCost),
  )
  const annualWater = parseNumber(
    form.annualWater,
    Number.parseFloat(DEFAULT_FORM.annualWater),
  )
  const annualWaterCost = parseNumber(
    form.annualWaterCost,
    Number.parseFloat(DEFAULT_FORM.annualWaterCost),
  )
  const buildingArea = parseNumber(
    form.buildingArea,
    Number.parseFloat(DEFAULT_FORM.buildingArea),
  )
  const roomCount = parseNumber(
    form.roomCount,
    Number.parseFloat(DEFAULT_FORM.roomCount),
  )

  const unitAreaElectricity = annualElectricity / buildingArea
  const unitRoomElectricity = annualElectricity / roomCount
  const electricityCarbon = (annualElectricity * 0.5703) / 1000
  const waterCarbon = annualWater * 0.0003
  const totalCarbon = electricityCarbon + waterCarbon

  const risks: string[] = []

  if (unitAreaElectricity > 200) {
    risks.push(
      '单位面积能耗偏高，建议进一步核查空调、照明和公区用电，具备后续评估价值。',
    )
  } else {
    risks.push(
      '整体能耗水平需结合行业基准进一步对标，建议关注季节性波动与异常用能。',
    )
  }

  if (!form.hasSubMetering) {
    risks.push('当前缺少分项计量，难以识别重点耗能区域，建议进一步采集设备数据。')
  }

  if (form.hasCentralAC || form.hasChillerPlant) {
    risks.push('冷站或中央空调系统可能存在优化空间，具备后续节能评估价值。')
  }

  if (form.hasRestaurant) {
    risks.push('客房、公区和餐饮区域用电边界尚需进一步拆分。')
  }

  if (!form.hasEms && risks.length < 4) {
    risks.push('尚未建立能源管理系统，用能监测能力有待加强，可作为长期托管基础。')
  }

  const suggestions = [
    '建议补充分项计量，建立水、电、燃气、设备数据台账。',
    '建议评估峰谷电价和电力交易方向，具备后续评估价值。',
    '建议关注空调、照明、电梯等重点设备的节能优化空间。',
    '建议进入碳元平台长期托管，持续沉淀能耗和碳排数据。',
  ]

  return {
    annualElectricity,
    annualElectricityCost,
    annualWater,
    annualWaterCost,
    unitAreaElectricity,
    unitRoomElectricity,
    electricityCarbon,
    waterCarbon,
    totalCarbon,
    risks: risks.slice(0, 4),
    suggestions,
  }
}
