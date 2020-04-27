<template>
  <v-col cols="12" md="6" class="DataCard">
    <circle-chart
      :title="$t('入院患者数と病床数')"
      :title-id="'beds-card'"
      :chart-data="bedsGraph"
      :date="date"
      :unit="$t('床')"
      :info="$t('入院患者数') + '/' + $t('病床数')"
      :url="'https://www.pref.nagano.lg.jp/hoken-shippei/kenko/kenko/kansensho/joho/corona-doko.html'"
    />
  </v-col>
</template>

<script>
import bedsData from '@/data/beds.json'
import formatVariableGraph from '@/utils/formatCircleGraph.ts'
import CircleChart from '@/components/BedsCircleChart.vue'

export default {
  components: {
    CircleChart
  },
  data() {
    return {
      date: String,
      bedsGraph: []
    }
  },
  created() {
    this.setData()
  },
  methods: {
    setData() {
      this.bedsGraph = formatVariableGraph(bedsData.beds_summary.data)
      this.date = bedsData.beds_summary.date
    }
  }
}
</script>
