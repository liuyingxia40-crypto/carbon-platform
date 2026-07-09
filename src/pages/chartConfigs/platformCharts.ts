import type { EChartsOption } from 'echarts'
import { CHART_COLORS } from '../../components/charts/chartTheme'

export function buildPlatformAssetOption(): EChartsOption {
  const categories = [
    { name: '能耗数据' },
    { name: '碳排数据' },
    { name: '设备数据' },
    { name: '运营数据' },
    { name: '企业碳能数据资产底座' },
    { name: '降本分析' },
    { name: '碳管理' },
    { name: '绿色资产配置' },
    { name: '服务履约记录' },
  ]

  const nodes = [
    { id: '0', name: '能耗数据', x: 80, y: 60, symbolSize: 52, category: 0 },
    { id: '1', name: '碳排数据', x: 80, y: 140, symbolSize: 52, category: 0 },
    { id: '2', name: '设备数据', x: 80, y: 220, symbolSize: 52, category: 0 },
    { id: '3', name: '运营数据', x: 80, y: 300, symbolSize: 52, category: 0 },
    {
      id: '4',
      name: '企业碳能\n数据资产底座',
      x: 280,
      y: 180,
      symbolSize: 72,
      category: 1,
    },
    { id: '5', name: '降本分析', x: 480, y: 60, symbolSize: 48, category: 2 },
    { id: '6', name: '碳管理', x: 480, y: 140, symbolSize: 48, category: 2 },
    { id: '7', name: '绿色资产配置', x: 480, y: 220, symbolSize: 52, category: 2 },
    { id: '8', name: '服务履约记录', x: 480, y: 300, symbolSize: 52, category: 2 },
  ]

  const links = [
    { source: '0', target: '4' },
    { source: '1', target: '4' },
    { source: '2', target: '4' },
    { source: '3', target: '4' },
    { source: '4', target: '5' },
    { source: '4', target: '6' },
    { source: '4', target: '7' },
    { source: '4', target: '8' },
  ]

  return {
    backgroundColor: CHART_COLORS.bg,
    tooltip: { show: true },
    legend: { show: false },
    series: [
      {
        type: 'graph',
        layout: 'none',
        roam: false,
        label: {
          show: true,
          color: CHART_COLORS.title,
          fontSize: 9,
          lineHeight: 12,
        },
        edgeSymbol: ['none', 'arrow'],
        edgeSymbolSize: 6,
        lineStyle: {
          color: CHART_COLORS.border,
          width: 1.5,
          curveness: 0.08,
        },
        categories: categories.map((c, i) => ({
          name: c.name,
          itemStyle: {
            color:
              i === 0
                ? CHART_COLORS.secondary
                : i === 1
                  ? CHART_COLORS.primary
                  : CHART_COLORS.tertiary,
          },
        })),
        data: nodes,
        links,
      },
    ],
  }
}
