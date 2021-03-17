<template>
  <div>
    <confirmed-cases-details-card
      v-if="this.$route.params.card == 'details-of-confirmed-cases'"
    />
    <!--
    <tested-cases-details-card
      v-else-if="this.$route.params.card == 'details-of-tested-cases'"
    />
-->
    <confirmed-cases-number-card
      v-else-if="this.$route.params.card == 'number-of-confirmed-cases'"
    />
    <!--
    <confirmed-cases-by-municipalities-card
      v-else-if="
        this.$route.params.card == 'number-of-confirmed-cases-by-municipalities'
      "
    />
-->
    <confirmed-cases-attributes-card
      v-else-if="this.$route.params.card == 'attributes-of-confirmed-cases'"
    />
    <!--
    <tested-number-card
      v-else-if="this.$route.params.card == 'number-of-tested'"
    />
-->
    <inspection-persons-number-card
      v-else-if="this.$route.params.card == 'number-of-inspection-persons'"
    />
    <!--
    <telephone-advisory-reports-number-card
      v-else-if="
        this.$route.params.card ==
          'number-of-reports-to-covid19-telephone-advisory-center'
      "
    />
-->
    <consultation-desk-reports-number-card
      v-else-if="
        this.$route.params.card ==
          'number-of-reports-to-covid19-consultation-desk'
      "
    />
    <!--
    <metro-card
      v-else-if="
        this.$route.params.card == 'predicted-number-of-toei-subway-passengers'
      "
    />
    <agency-card v-else-if="this.$route.params.card == 'agency'" />
-->
    <age-card v-else-if="this.$route.params.card == 'age-card'" />
    <residential-area-card
      v-else-if="this.$route.params.card == 'residential-area-card'"
    />
    <stay-card v-else-if="this.$route.params.card == 'stay-card'" />
    <beds-card v-else-if="this.$route.params.card == 'beds-card'" />
    <patient-care-card
      v-else-if="this.$route.params.card == 'patient-care-card'"
    />
    <gender-card v-else-if="this.$route.params.card == 'gender-card'" />
    <adjacent-prefecture-card
      v-else-if="this.$route.params.card == 'adjacent-prefecture-card'"
    />
    <discharge-hospital-card
      v-else-if="this.$route.params.card == 'discharge-hospital-card'"
    />
  </div>
</template>

<script>
import Data from '@/data/data.json'
// import MetroData from '@/data/metro.json'
// import agencyData from '@/data/agency.json'
import ages from '@/data/age.json'
import beds from '@/data/beds.json'
import gender from '@/data/gender.json'
import patient from '@/data/patient-care.json'
import stay from '@/data/stay.json'
import residentialarea from '@/data/residential-area.json'
import adjacentprefecture from '@/data/adjacent-prefecture.json'
import dischargehospital from '@/data/discharge-hospital.json'
import ConfirmedCasesDetailsCard from '@/components/cards/ConfirmedCasesDetailsCard.vue'
// import TestedCasesDetailsCard from '@/components/cards/TestedCasesDetailsCard.vue'
import ConfirmedCasesNumberCard from '@/components/cards/ConfirmedCasesNumberCard.vue'
import ConfirmedCasesAttributesCard from '@/components/cards/ConfirmedCasesAttributesCard.vue'
// import ConfirmedCasesByMunicipalitiesCard from '@/components/cards/ConfirmedCasesByMunicipalitiesCard.vue'
// import TestedNumberCard from '@/components/cards/TestedNumberCard.vue'
import InspectionPersonsNumberCard from '@/components/cards/InspectionPersonsNumberCard.vue'
// import TelephoneAdvisoryReportsNumberCard from '@/components/cards/TelephoneAdvisoryReportsNumberCard.vue'
import ConsultationDeskReportsNumberCard from '@/components/cards/ConsultationDeskReportsNumberCard.vue'
// import MetroCard from '@/components/cards/MetroCard.vue'
// import AgencyCard from '@/components/cards/AgencyCard.vue'
import AgeCard from '@/components/cards/AgeCard.vue'
import ResidentialAreaCard from '@/components/cards/ResidentialArea.vue'
// import HospitalizationCard from '@/components/cards/HospitalizationCard.vue'
import StayCard from '@/components/cards/StayCard.vue'
import BedsCard from '@/components/cards/BedsCard.vue'
import GenderCard from '@/components/cards/GenderCard.vue'
import PatientCareCard from '@/components/cards/PatientCareCard.vue'
import AdjacentPrefectureCard from '@/components/cards/AdjacentPrefectureCard.vue'
import DischargeHospitalCard from '@/components/cards/DischargeHospitalCard.vue'

export default {
  components: {
    ConfirmedCasesDetailsCard,
    //    TestedCasesDetailsCard,
    ConfirmedCasesNumberCard,
    ConfirmedCasesAttributesCard,
    //    ConfirmedCasesByMunicipalitiesCard,
    //    TestedNumberCard,
    InspectionPersonsNumberCard,
    //    TelephoneAdvisoryReportsNumberCard,
    ConsultationDeskReportsNumberCard,
    //    MetroCard,
    //    AgencyCard,
    AgeCard,
    ResidentialAreaCard,
    // HospitalizationCard,
    StayCard,
    BedsCard,
    PatientCareCard,
    GenderCard,
    AdjacentPrefectureCard,
    DischargeHospitalCard
  },
  data() {
    let title, updatedAt
    switch (this.$route.params.card) {
      case 'details-of-confirmed-cases':
        title = this.$t('検査陽性者の状況')
        updatedAt = Data.patients.date
        break
      //      case 'details-of-tested-cases':
      //        title = this.$t('検査実施状況')
      //        updatedAt = Data.inspection_status_summary.date
      //        break
      case 'number-of-confirmed-cases':
        title = this.$t('陽性患者数')
        updatedAt = Data.patients.date
        break
      //      case 'number-of-confirmed-cases-by-municipalities':
      //        title = this.$t('陽性患者数（区市町村別）')
      //        updatedAt = patientData.date
      //        break
      case 'attributes-of-confirmed-cases':
        title = this.$t('陽性患者の属性')
        updatedAt = Data.patients.date
        break
      //      case 'number-of-tested':
      //        title = this.$t('検査実施件数')
      //        updatedAt = Data.inspections_summary.date
      //        break
      case 'number-of-inspection-persons':
        title = this.$t('検査実施人数')
        updatedAt = Data.inspection_persons.date
        break
      //      case 'number-of-reports-to-covid19-telephone-advisory-center':
      //        title = this.$t('新型コロナコールセンター相談件数')
      //        updatedAt = Data.contacts.date
      //        break
      case 'number-of-reports-to-covid19-consultation-desk':
        title = this.$t('新型コロナ受診相談窓口相談件数')
        updatedAt = Data.querents.date
        break
      //      case 'predicted-number-of-toei-subway-passengers':
      //        title = this.$t('都営地下鉄の利用者数の推移')
      //        updatedAt = MetroData.date
      //        break
      //      case 'agency':
      //        title = this.$t('都庁来庁者数の推移')
      //        updatedAt = agencyData.date
      //        break
      case 'age-card':
        title = this.$t('年代別陽性患者数')
        updatedAt = ages.date
        break
      case 'residential-area-card':
        title = this.$t('居住地の状況')
        updatedAt = residentialarea.date
        break
      case 'stay-card':
        title = this.$t('入院日数')
        updatedAt = stay.date
        break
      case 'beds-card':
        title = this.$t('入院患者数と病床数')
        updatedAt = beds.beds_summary.date
        break
      case 'gender-card':
        title = this.$t('性別陽性患者数')
        updatedAt = gender.gender_summary.date
        break
      case 'patient-care-card':
        title = this.$t('患者療養状況')
        updatedAt = patient.lastUpdate
        break
      case 'adjacent-prefecture-card':
        title = this.$t('隣接県の状況')
        updatedAt = adjacentprefecture.date
        break
      case 'discharge-hospital-card':
        title = this.$t('退院・療養解除')
        updatedAt = dischargehospital.date
        break
    }

    const data = {
      title,
      updatedAt
    }
    return data
  },
  head() {
    const url = 'https://covid19-nagano.info'
    // const timestamp = new Date().getTime()
    const ogpImage = `${url}/ogp.png`
    /* const ogpImage =
      this.$i18n.locale === 'ja'
        ? `${url}/ogp/${this.$route.params.card}.png?t=${timestamp}`
        : `${url}/ogp/${this.$i18n.locale}/${this.$route.params.card}.png?t=${timestamp}` */
    const description = `${this.updatedAt} | ${this.$t(
      '当サイトは新型コロナウイルス感染症 (COVID-19) に関する最新情報を提供するために、長野県出身の個人(ITエンジニア)が長野県非公式で開設したものです。'
    )}`

    return {
      title: this.title,
      meta: [
        {
          hid: 'og:url',
          property: 'og:url',
          content: url + this.$route.path + '/'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content:
            this.title +
            ' | ' +
            this.$t('長野県') +
            ' ' +
            this.$t('新型コロナウイルス感染症') +
            this.$t('対策サイト')
        },
        {
          hid: 'description',
          name: 'description',
          content: description
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: description
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: ogpImage
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: ogpImage
        }
      ]
    }
  }
}
</script>
