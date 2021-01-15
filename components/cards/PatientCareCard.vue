<template>
  <v-col cols="12" md="6" class="DataCard">
    <client-only>
      <data-view
        :title="$t('患者療養状況')"
        :title-id="'patient-care-card'"
        :date="mainSummary.lastUpdate"
      >
        <confirmed-cases-details-table
          :aria-label="$t('検査陽性者の状況')"
          v-bind="confirmedCases"
        />
      </data-view>
    </client-only>
  </v-col>
</template>

<script>
import mainSummary from '@/data/patient-care.json'
import formatPatientCareCases from '@/utils/formatPatientCareCases'
import DataView from '@/components/DataView.vue'
import ConfirmedCasesDetailsTable from '@/components/PatientCareTable.vue'

export default {
  components: {
    DataView,
    ConfirmedCasesDetailsTable
  },
  data() {
    const confirmedCases = formatPatientCareCases(mainSummary.main_summary)
    return {
      mainSummary,
      confirmedCases,
    }
  },
}
</script>
