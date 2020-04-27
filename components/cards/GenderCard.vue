<template>
  <v-col cols="12" md="6" class="DataCard">
    <circle-chart
      :title="$t('性別陽性患者数')"
      :title-id="'gender-card'"
      :chart-data="genderGraph"
      :date="date"
      :unit="$t('人')"
      :info="$t('累計値')"
      :url="'https://www.pref.nagano.lg.jp/hoken-shippei/kenko/kenko/kansensho/joho/corona-doko.html'"
    />
  </v-col>
</template>

<script>
import genderData from '@/data/gender.json'
import formatVariableGraph from '@/utils/formatCircleGraph.ts'
import CircleChart from '@/components/GenderCircleChart.vue'

export default {
  components: {
    CircleChart
  },
  data() {
    return {
      date: String,
      genderGraph: []
    }
  },
  created() {
    this.setData()
  },
  methods: {
    setData() {
      this.genderGraph = formatVariableGraph(genderData.gender_summary.data)
      this.date = genderData.gender_summary.date
    }
  }
}
</script>
