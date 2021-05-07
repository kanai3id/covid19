<template>
  <data-view
    :title="title"
    title-id="number-of-confirmed-cases"
    :date="date"
    :url="url"
  >
    <template v-if="showSelector" v-slot:button>
      <data-selector v-model="dataKind" :items="dataKinds" />
    </template>

    <div style="flex-grow: 1; display: flex; align-items: start;">
      <time-bar-line-chart
        chart-id="number-of-confirmed-cases"
        :chart-data="chartData"
        legend-order-kind="desc"
      />
    </div>

    <template v-slot:infoPanel>
      <data-view-basic-info-panel
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
import DataSelector, { SelectorItem } from '@/components/DataSelector.vue'
import DataViewBasicInfoPanel from '@/components/DataViewBasicInfoPanel.vue'
import DateSelectSlider from '@/components/DateSelectSlider.vue'
import TimeBarLineChart, { GraphData } from '@/components/TimeBarLineChart.vue'
import { PatientsSummaryDaily } from '@/utils/types.ts'
import OpenDataLink from '@/components/OpenDataLink.vue'

export type NewPatientsAverageType = {
  date: Dayjs
  count: number
  average7days: number | undefined
  count7days: number | undefined
}

type DataKind = 'transition' | 'cumulative'

type DisplayInfo = {
  lText: string
  sText: string
  unit: string
}

@Component({
  components: {
    DataView,
    DataSelector,
    DataViewBasicInfoPanel,
    DateSelectSlider,
    TimeBarLineChart,
    OpenDataLink
  }
})
export default class PatientsChart extends Vue {
  @Prop()
  public date?: string

  @Prop()
  public dailyData?: PatientsSummaryDaily[]

  @Prop()
  public url?: string

  @Prop()
  public title?: string

  private readonly showSelector = true
  private dataKind: DataKind = 'transition'
  private readonly dataKinds = [
    { key: 'transition', label: this.$t('日別') } as SelectorItem,
    { key: 'cumulative', label: this.$t('累計') } as SelectorItem
  ]

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
    const lastDay = this.chartData.datasets[0].values.slice(-1)[0]
    const lastDayBefore = this.chartData.datasets[0].values.slice(-2)[0]
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

    const dataset = this.chartData.datasets[0]
    const latestValueText = dataset.values.slice(-1)[0].toLocaleString()
    const lastDay = this.chartData.dates.slice(-1)[0].toString()
    const latestDate = this.$d(getDayjsObject(lastDay).toDate(), 'date')
    return {
      lText: latestValueText,
      sText: `${latestDate} ${this.$t('日別値')} （${this.$t('前日比')}：${this.displayDiffValue} ${dataset.unit}）`,
      unit: dataset.unit
    }
  }

  constructor() {
    super()

    this.chartDataSet.set('transition', this.buildDailyTransitionGraphData())
    this.chartDataSet.set('cumulative', this.buildDailyCumulativeGraphData())
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
    data: PatientsSummaryDaily[]
  ): Enumerable.IEnumerable<NewPatientsAverageType> => {
    const source = Enumerable.from(data).reverse()
    return source
      .select(d => d['日付'])
      .select((_, index) => source.skip(index).take(7))
      .select(d => {
        const first = d.first()
        const ave =
          d.count() === 7
            ? d
                .where(d => d['小計'] !== undefined)
                .average(d => Number(d['小計']))
            : undefined
        const cnt =
          d.count() === 7
            ? d.where(d => d['小計'] !== undefined).sum(d => Number(d['小計']))
            : undefined

        return {
          date: dayjs(dayjs(first['日付']).format('YYYY-MM-DD')),
          count: Number(first['小計']),
          average7days: ave,
          count7days: cnt
        }
      })
      .reverse()
  }

  private buildDailyTransitionGraphData = (): GraphData => {
    const now = dayjs()
    const rows = PatientsChart.makeAverageNewPatients(this.dailyData ?? [])
      .where(d => d.date < now)
      .select(d => {
        return {
          date: d.date.format('YYYY-MM-DD'),
          count: d.count,
          average7days: d.average7days
        }
      })

    return {
      dates: rows.select(d => d.date).toArray(),
      datasets: [
        {
          type: 'bar',
          title: this.$t('陽性者数'),
          unit: this.$t('人'),
          values: rows.select(d => d.count).toArray(),
          order: 2
        },
        {
          type: 'line',
          title: this.$t('7日間移動平均'),
          unit: this.$t('人'),
          values: rows.select(d => d.average7days).toArray(),
          order: 1
        }
      ]
    } as GraphData
  }

  private buildDailyCumulativeGraphData = (): GraphData => {
    let subTotal = 0
    const now = dayjs()
    const arr = (this.dailyData ?? [])
      .filter(d => dayjs(d['日付']) < now)
      .map(d => {
        subTotal += Number(d['小計'])
        return {
          date: dayjs(d['日付']).format('YYYY-MM-DD'),
          total: subTotal
        }
      })

    const rows = Enumerable.from(arr)

    return {
      dates: rows.select(d => d.date).toArray(),
      datasets: [
        {
          type: 'bar',
          title: this.$t('陽性者累計数'),
          unit: this.$t('人'),
          values: rows.select(d => d.total).toArray()
        }
      ]
    } as GraphData
  }
}
</script>
