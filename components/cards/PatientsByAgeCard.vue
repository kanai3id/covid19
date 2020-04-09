<template>
  <v-col cols="12" md="6" class="DataCard">
    <time-bar-chart
      :title="$t('年代別陽性患者数')"
      :title-id="'patients-by-age-card'"
      :chart-id="'time-bar-chart-patients-by-age-card'"
      :chart-data="ageGraph"
      :date="age.last_update"
      :unit="$t('人')"
      :url="
        'https://www.pref.nagano.lg.jp/hoken-shippei/kenko/kenko/kansensho/joho/corona-doko.html'
      "
      :show-button="false"
    />
  </v-col>
</template>

<script>
import age from '@/data/age.json'
import TimeBarChart from '@/components/TimeBarChart.vue'
import formatVariableGraph from '@/utils/formatVariableGraph'

export default {
  components: {
    TimeBarChart
  },
  data() {
    // 年代別陽性患者数
    const ageGraph = formatVariableGraph(age.data)

    const data = {
      age,
      ageGraph
    }
    return data
  }
}
</script>
