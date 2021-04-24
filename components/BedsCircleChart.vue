<template>
  <data-view :title="title" :title-id="titleId" :date="date" :url="url">
    <template v-slot:additionalDescription>
      <ul :class="$style.notes">
        <li>
          <external-link
            url="https://www.mhlw.go.jp/stf/seisakunitsuite/newpage_00023.html"
          >
            {{
              $t('厚生労働省:療養状況等及び入院患者受入病床数について')
            }}
          </external-link>
        </li>
      </ul>
      <ul :class="$style.notes">
        <li>
          * {{ $t('データは長野県の速報値を利用') }}
        </li>
        <li>
          * {{ $t('医療施設病床数') }}:434 / {{ $t('宿泊施設居室数') }}:715
        </li>
      </ul>
    </template>
    <pie-chart
      :chart-id="chartId"
      :chart-data="displayData"
      :options="displayOption"
      :height="240"
    />
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

<script>
import DataView from '@/components/DataView.vue'
import DataViewBasicInfoPanel from '@/components/DataViewBasicInfoPanel.vue'
// import OpenDataLink from '@/components/OpenDataLink.vue'
import ExternalLink from '@/components/ExternalLink.vue'

export default {
  components: { DataView, DataViewBasicInfoPanel, ExternalLink },
  props: {
    title: {
      type: String,
      required: false,
      default: ''
    },
    titleId: {
      type: String,
      required: false,
      default: ''
    },
    chartId: {
      type: String,
      required: false,
      default: 'pie-chart'
    },
    chartData: {
      type: Array,
      required: false,
      default: () => []
    },
    date: {
      type: String,
      required: true,
      default: ''
    },
    unit: {
      type: String,
      required: false,
      default: ''
    },
    info: {
      type: String,
      required: false,
      default: ''
    },
    url: {
      type: String,
      required: false,
      default: ''
    }
  },
  computed: {
    displayInfo() {
      if (this.isNotLoaded()) {
        return {
          lText: '',
          sText: '',
          unit: ''
        }
      }

      const chartData = this.chartData[this.chartData.length - 1]
      const total = chartData.cumulative
      const remaining = chartData.transition
      const patients = total - remaining
      return {
        lText: patients + '/' + total,
        sText: this.info,
        unit: this.unit
      }
    },
    displayData() {
      if (this.isNotLoaded()) {
        return {
          labels: [''],
          datasets: [
            {
              label: '',
              data: '',
              backgroundColor: '',
              borderWidth: 0
            }
          ]
        }
      }
      // const colorArray = ['#00d154', '#008830']
      const colorArray = ['#00b849', '#00d154', '#008830']
      return {
        labels: this.chartData.map(d => {
          return this.$t(d.label)
        }),
        datasets: [
          {
            label: this.chartData.map(d => {
              return this.$t(d.label)
            }),
            data: this.chartData.map(d => {
              return d.transition
            }),
            backgroundColor: this.chartData.map((_, index) => {
              return colorArray[index]
            }),
            borderWidth: 0
          }
        ]
      }
    },
    displayOption() {
      if (this.isNotLoaded()) {
        return {}
      }

      const unitBed = this.unit
      const unitPerson = this.$t('人')
      const label = this.$t('病床数')
      const chartData = this.chartData
      return {
        tooltips: {
          displayColors: false,
          callbacks: {
            label(tooltipItem) {
              const index = tooltipItem.index
              const numerator = chartData[index].transition
              // const numeratorUnit = index === 1 ? unitBed : unitPerson
              const numeratorUnit = index === 2 ? unitBed : unitPerson
              const denominator =
                chartData[0].transition + chartData[1].transition
              const denominatorLabel = label
              // return `${numerator} ${numeratorUnit} (${denominatorLabel}: ${denominator}${unitBed})`
              return `${numerator} ${numeratorUnit}`
            },
            title(tooltipItem, data) {
              return data.labels[tooltipItem[0].index]
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: true
        },
        animation: { duration: 0 }
      }
    }
  },
  methods: {
    isNotLoaded() {
      return this.chartData.length === 0
    }
  }
}
</script>

<style lang="scss" module>
.Graph-Desc {
  margin: 10px 0;
  font-size: 12px;
  color: $gray-3;
}
.link {
  text-decoration: none;
}
ul.notes {
  margin-top: 10px;
  margin-bottom: 0;
  padding-left: 0 !important;
  font-size: 12px;
  color: $gray-3;

  > li {
    list-style-type: none;
  }
}
</style>
