<template>
  <v-col cols="12" md="6" class="DataCard">
    <time-bar-chart
      :title="$t('入院日数')"
      :title-id="'stay'"
      :chart-id="'time-bar-chart-stay'"
      :chart-data="stayGraph"
      :date="stay.last_update"
      :unit="'人'"
      :url="
        'https://www.pref.nagano.lg.jp/hoken-shippei/kenko/kenko/kansensho/joho/corona-doko.html'
      "
      :show-button="false"
    />
  </v-col>
</template>

<script>
import stay from '@/data/stay.json'
import TimeBarChart from '@/components/TimeBarChart.vue'
import formatVariableGraph from '@/utils/formatVariableGraph'

export default {
  components: {
    TimeBarChart
  },
  data() {
    // 入退日数
    const stayGraph = formatVariableGraph(stay.data)

    const data = {
      stay,
      stayGraph
    }
    return data
  }
}
</script>
