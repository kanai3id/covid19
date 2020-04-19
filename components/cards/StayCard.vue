<template>
  <v-col cols="12" md="6" class="DataCard">
    <stay-bar-chart
      :title="$t('入院患者日数')"
      :title-id="'stay-card'"
      :chart-id="'chart-stay-card'"
      :chart-data="stayData"
      :date="stayData.date"
      :options="displayOption"
      :unit="$t('人')"
    />
  </v-col>
</template>

<script>
import stayData from '@/data/stay.json'
import StayBarChart from '@/components/StayBarChart.vue'
export default {
  components: {
    StayBarChart
  },
  data() {
    return {
      stayData
    }
  }
}
</script>
