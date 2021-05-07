<template>
  <v-col cols="12" md="6" class="DataCard">
    <patients-line-chart
      :date="Data.patients_summary.date"
      :daily-data="Data.patients_summary.data"
      :title-id="'number-of-confirmed-cases'"
      :chart-id="'time-bar-chart-patients'"
      :title="$t('陽性患者数')"
      :url="
        'https://www.pref.nagano.lg.jp/hoken-shippei/kenko/kenko/kansensho/joho/corona-doko.html'
      "
    />
  </v-col>
</template>

<script>
import Data from '@/data/data.json'
import PatientsLineChart from '@/components/PatientsLineChart.vue'

export default {
  components: {
    PatientsLineChart
  },
  data() {
    // 感染者数グラフ
    const data = {
      Data
    }
    return data
  }
}
</script>
