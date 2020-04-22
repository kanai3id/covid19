<template>
  <v-col cols="12" md="6" class="DataCard">
    <age-bar-chart
      :title="$t('年代別陽性患者数')"
      :title-id="'age-card'"
      :chart-id="'chart-age-card'"
      :chart-data="ageData"
      :date="ageData.date"
      :unit="$t('人')"
    />
  </v-col>
</template>

<script>
import ageData from '@/data/age.json'
import AgeBarChart from '@/components/AgeBarChart.vue'
export default {
  components: {
    AgeBarChart
  },
  data() {
    return {
      ageData
    }
  }
}
</script>
