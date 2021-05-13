<template>
  <data-view
    :title="title"
    title-id="positive-rate-card"
    :date="date"
    :url="url"
  >
    <div style="flex-grow: 1; display: flex; align-items: start;">
      <time-bar-line-chart
        chart-id="positive-rate-chart"
        :chart-data="chartData"
        legend-order-kind="desc"
        :y-axis-left-setting="yAxisLeftSetting"
        :y-axis-right-setting="yAxisRightSetting"
      />
    </div>

    <template v-slot:infoPanel>
      <data-view-basic-info-panel
        :l-title="displayInfo.lTitle"
        :l-text="displayInfo.lText"
        :s-text="displayInfo.sText"
        :unit="displayInfo.unit"
      />
    </template>
    <template v-slot:footer>
      <open-data-link v-show="url" :url="url" />
    </template>
  </data-view>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import dayjs, { Dayjs } from 'dayjs'
import * as Enumerable from 'linq'
import DataView from '@/components/DataView.vue'
import { getDayjsObject } from '@/utils/formatDate'
import DataViewBasicInfoPanel from '@/components/DataViewBasicInfoPanel.vue'
import TimeBarLineChart, {
  GraphData,
  YAxisSetting
} from '@/components/TimeBarLineChart.vue'
import { TestSummaryDaily } from '@/utils/types.ts'
import OpenDataLink from '@/components/OpenDataLink.vue'

export type NewPatientsAverageType = {
  date: Dayjs
  total: number
  positive: number
  average7days: number | undefined
}

type DataKind = 'transition' | 'cumulative'

type DisplayInfo = {
  lTitle: string
  lText: string
  sText: string
  unit: string
}

@Component({
  components: {
    DataView,
    DataViewBasicInfoPanel,
    TimeBarLineChart,
    OpenDataLink
  }
})
export default class TestsChart extends Vue {
  @Prop()
  public date?: string

  @Prop()
  public dailyData?: TestSummaryDaily[]

  @Prop()
  public url?: string

  @Prop()
  public title?: string

  private readonly yAxisLeftSetting: YAxisSetting = {
    min: 0,
    unit: '人',
    visible: true
  } as YAxisSetting

  private readonly yAxisRightSetting: YAxisSetting = {
    suggestedMin: 0,
    suggestedMax: 10,
    step: 5,
    unit: '%',
    visible: true
  } as YAxisSetting

  private readonly showSelector = true
  private dataKind: DataKind = 'transition'

  private readonly chartDataSet = new Map<DataKind, GraphData>()

  private formatDayBeforeRatio = (dayBeforeRatio: any) => {
    const dayBeforeRatioLocaleString = dayBeforeRatio.toLocaleString()
    const prefix = Math.sign(dayBeforeRatio) === 1 ? '+' : ''
    return `${prefix}${dayBeforeRatioLocaleString}`
  }

  private get displayDiffValue(): string {
    if (this.chartData.datasets[0].values.slice(-2)[0] === undefined) {
      return '-'
    }
    const lastDay = this.chartData.datasets[2].values.slice(-1)[0]
    const lastDayBefore = this.chartData.datasets[2].values.slice(-2)[0]
    return this.formatDayBeforeRatio(lastDay - lastDayBefore)
  }

  private get displayInfo(): DisplayInfo {
    if ((this.chartData?.datasets?.length ?? 0) <= 0) {
      return {
        lText: '-',
        sText: '-',
        unit: ''
      } as DisplayInfo
    }

    const dataset = this.chartData.datasets[2]
    const latestValueText = dataset.values.slice(-1)[0].toLocaleString()
    const lastDay = this.chartData.dates.slice(-1)[0].toString()
    const latestDate = this.$d(getDayjsObject(lastDay).toDate(), 'date')
    return {
      lTitle: `${this.$t('陽性率')}`,
      lText: latestValueText,
      sText: `${latestDate} （${this.$t('前日比')}：${
        this.displayDiffValue
      } ${this.$t('ポイント')}）`,
      unit: dataset.unit
    }
  }

  constructor() {
    super()

    this.chartDataSet.set('transition', this.buildDailyTransitionGraphData())
  }

  private get chartData(): GraphData {
    const data = this.chartDataSet.get(this.dataKind)
    if (data) {
      return data
    } else {
      return {
        dates: [],
        datasets: []
      } as GraphData
    }
  }

  public static makeAverageNewPatients = (
    data: TestSummaryDaily[]
  ): Enumerable.IEnumerable<NewPatientsAverageType> => {
    const source = Enumerable.from(data).reverse()
    return source
      .select(d => d['日付'])
      .select((_, index) => source.skip(index).take(7))
      .select(d => {
        const first = d.first()
        let ave
        if (d.count() === 7) {
          const grp = d.where(
            d => d['陽性者数'] !== undefined && d['検査人数'] !== undefined
          )
          const sumPersons = grp.sum(d => Number(d['検査人数']))
          const sumPositives = grp.sum(d => Number(d['陽性者数']))
          ave =
            sumPersons === 0
              ? undefined
              : Math.round((sumPositives / sumPersons) * 1000) / 10
        }
        return {
          date: dayjs(dayjs(first['日付']).format('YYYY-MM-DD')),
          total: Number(first['検査人数']),
          positive: Number(first['陽性者数']),
          average7days: ave
        }
      })
      .reverse()
  }

  private buildDailyTransitionGraphData = (): GraphData => {
    const now = dayjs()
    const rows = TestsChart.makeAverageNewPatients(this.dailyData ?? [])
      .where(d => d.date < now)
      .select(d => {
        let negative: number | undefined
        if (d.total !== undefined && d.positive !== undefined) {
          negative = d.total - d.positive
        }
        return {
          date: d.date.format('YYYY-MM-DD'),
          total: d.total,
          positive: d.positive,
          negative,
          average7days: d.average7days
        }
      })

    return {
      dates: rows.select(d => d.date).toArray(),
      datasets: [
        {
          type: 'bar',
          color: '#00CC00',
          title: this.$t('検査人数'),
          unit: this.$t('人'),
          values: rows.select(d => d.negative).toArray(),
          tooltipValues: rows.select(d => d.total).toArray(),
          yAxisKind: 'y-axis-left',
          order: 3
        },
        {
          type: 'bar',
          color: '#007700',
          title: this.$t('陽性者数'),
          unit: this.$t('人'),
          values: rows.select(d => d.positive).toArray(),
          yAxisKind: 'y-axis-left',
          order: 2
        },
        {
          type: 'line',
          title: this.$t('陽性率(7日間平均)'),
          unit: '%',
          values: rows.select(d => d.average7days).toArray(),
          yAxisKind: 'y-axis-right',
          order: 1
        }
      ]
    } as GraphData
  }
}
</script>
