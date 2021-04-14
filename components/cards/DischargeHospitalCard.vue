<template>
  <v-col cols="12" md="6" class="DataCard">
    <client-only>
      <time-bar-chart
        :title="$t('療養患者数')"
        :title-id="'discharge-hospital-card'"
        :chart-id="'time-bar-chart-patients'"
        :chart-data="patientsGraph"
        :date="Data.date"
        :unit="$t('人')"
        :url="'https://toyokeizai.net/sp/visual/tko/covid19/'"
      >
        <template v-slot:additionalDescription>
          <ul>
            <li>
              {{
                $t(
                  '（注）療養患者数：入院中/予定・宿泊療養/予定・自宅療養・調整中'
                )
              }}
            </li>
          </ul>
          <ul>
            <li>
              {{ $t('TOYO KEIZAI ONLINE様のデータを利用') }}
            </li>
          </ul>
        </template>
      </time-bar-chart>
    </client-only>
  </v-col>
</template>

<script>
import Data from '@/data/discharge-hospital.json'
import formatGraph from '@/utils/formatGraph'
import TimeBarChart from '@/components/TimeBarChartDisableDataSelector.vue'

export default {
  components: {
    TimeBarChart
  },
  data() {
    const patientsGraph = formatGraph(Data.data)

    const data = {
      Data,
      patientsGraph
    }
    return data
  }
}
</script>
