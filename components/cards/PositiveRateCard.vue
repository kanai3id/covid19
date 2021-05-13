<template>
  <v-col cols="12" md="6" class="DataCard">
    <patients-line-chart
      :date="Data.test_summary.date"
      :daily-data="Data.test_summary.data"
      :title-id="'positive-rate-card'"
      :chart-id="'positive-rate-chart'"
      :title="$t('検査の陽性率')"
      :url="
        'https://www.pref.nagano.lg.jp/hoken-shippei/kenko/kenko/kansensho/joho/corona-doko.html'
      "
    />
  </v-col>
</template>

<script>
import Data from '@/data/test.json'
import PatientsLineChart from '@/components/TestsLineChart.vue'

export default {
  components: {
    PatientsLineChart
  },
  data() {
    const data = {
      Data
    }
    return data
  }
}
</script>
