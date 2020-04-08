<template>
  <v-col cols="12" md="6" class="DataCard">
    <time-bar-chart
      :title="$t('陽性者の状況グラフ')"
      :title-id="'hospitalization'"
      :chart-id="'time-bar-chart-hospitalization'"
      :chart-data="hospitalizationGraph"
      :date="hospitalization.last_update"
      :unit="$t('人')"
      :url="
        'https://www.pref.nagano.lg.jp/hoken-shippei/kenko/kenko/kansensho/joho/corona-doko.html'
      "
      :show-button="false"
    />
  </v-col>
</template>

<script>
import hospitalization from '@/data/hospitalization.json'
import TimeBarChart from '@/components/TimeBarChart.vue'
import formatVariableGraph from '@/utils/formatVariableGraph'

export default {
  components: {
    TimeBarChart
  },
  data() {
    // 入退院数
    const hospitalizationGraph = formatVariableGraph(hospitalization.data)

    const data = {
      hospitalization,
      hospitalizationGraph
    }
    return data
  }
}
</script>
