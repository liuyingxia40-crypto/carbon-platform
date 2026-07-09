import type { EChartsOption } from 'echarts'
import { CHART_COLORS } from '../../components/charts/chartTheme'

const REPORT_ELECTRICITY_COST = 1050000
const REPORT_WATER_COST = 190000
const REPORT_UNIT_AREA = 106.7
const REPORT_UNIT_ROOM = 7111
const REPORT_CARBON_INTENSITY = 0.062

const axisLabel = { color: CHART_COLORS.muted, fontSize: 11 }

export function buildCostStructureOption(): EChartsOption {
  return {
    color: [CHART_COLORS.primary, CHART_COLORS.secondary],
    backgroundColor: CHART_COLORS.bg,
    grid: { left: 48, right: 16, top: 24, bottom: 36 },
    tooltip: {
      trigger: 'axis',
      formatter: (p: unknown) => {
        const items = p as { name: string; value: number; seriesName: string }[]
        const item = items[0]
        return `${item.name}<br/>${item.value.toLocaleString()} 元`
      },
    },
    xAxis: {
      type: 'category',
      data: ['年电费', '年水费'],
      axisLabel: { color: CHART_COLORS.title, fontSize: 11 },
      axisLine: { lineStyle: { color: CHART_COLORS.grid } },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        ...axisLabel,
        formatter: (v: number) => `${(v / 10000).toFixed(0)}万`,
      },
      splitLine: { lineStyle: { color: CHART_COLORS.grid } },
    },
    series: [
      {
        type: 'bar',
        data: [REPORT_ELECTRICITY_COST, REPORT_WATER_COST],
        barWidth: 48,
        itemStyle: { borderRadius: [4, 4, 0, 0] },
        label: {
          show: true,
          position: 'top',
          fontSize: 10,
          color: CHART_COLORS.title,
          formatter: (p) => `${((Number(p.value) || 0) / 10000).toFixed(0)}万`,
        },
      },
    ],
  }
}

export function buildEnergyCompareOption(): EChartsOption {
  const data = [
    { name: '单位面积电耗', value: REPORT_UNIT_AREA, unit: 'kWh/㎡' },
    { name: '单间客房电耗', value: REPORT_UNIT_ROOM, unit: 'kWh/间' },
    { name: '碳排放强度', value: REPORT_CARBON_INTENSITY * 1000, unit: 'kgCO₂/㎡' },
  ]
  return {
    color: [CHART_COLORS.primary],
    backgroundColor: CHART_COLORS.bg,
    grid: { left: 100, right: 48, top: 8, bottom: 8 },
    tooltip: {
      trigger: 'axis',
      formatter: (p: unknown) => {
        const item = (p as { name: string; value: number }[])[0]
        const raw = data.find((d) => d.name === item.name)
        const display =
          raw?.name === '碳排放强度'
            ? `${REPORT_CARBON_INTENSITY} tCO₂/㎡`
            : `${raw?.value} ${raw?.unit}`
        return `${item.name}<br/>${display}`
      },
    },
    xAxis: {
      type: 'value',
      axisLabel: { show: false },
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
        barWidth: 16,
        itemStyle: { borderRadius: [0, 4, 4, 0] },
      },
    ],
  }
}

export function buildHostingPathOption(): EChartsOption {
  const steps = ['数据采集', '指标计算', '风险识别', '服务匹配', '长期托管']
  return {
    backgroundColor: CHART_COLORS.bg,
    grid: { left: 16, right: 16, top: 40, bottom: 16 },
    xAxis: {
      type: 'category',
      data: steps,
      axisLabel: { color: CHART_COLORS.title, fontSize: 10, interval: 0 },
      axisLine: { lineStyle: { color: CHART_COLORS.grid } },
      axisTick: { show: false },
    },
    yAxis: {
      type: 'value',
      show: false,
      max: 5,
    },
    series: [
      {
        type: 'line',
        data: [1, 2, 3, 4, 5],
        smooth: true,
        symbol: 'circle',
        symbolSize: 10,
        lineStyle: { color: CHART_COLORS.primary, width: 2 },
        itemStyle: {
          color: CHART_COLORS.primary,
          borderColor: '#fff',
          borderWidth: 2,
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(14, 143, 143, 0.18)' },
              { offset: 1, color: 'rgba(14, 143, 143, 0.02)' },
            ],
          },
        },
        label: {
          show: true,
          position: 'top',
          formatter: (p) => String((p.dataIndex ?? 0) + 1),
          color: CHART_COLORS.primary,
          fontSize: 10,
          fontWeight: 'bold',
        },
      },
    ],
  }
}
