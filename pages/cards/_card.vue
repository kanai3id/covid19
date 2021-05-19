<template>
  <div>
    <confirmed-cases-details-card
      v-if="this.$route.params.card == 'details-of-confirmed-cases'"
    />
    <confirmed-cases-number-card
      v-else-if="this.$route.params.card == 'number-of-confirmed-cases'"
    />
    <confirmed-cases-attributes-card
      v-else-if="this.$route.params.card == 'attributes-of-confirmed-cases'"
    />
    <positive-rate-card
      v-else-if="this.$route.params.card == 'positive-rate-card'"
    />
    <age-card v-else-if="this.$route.params.card == 'age-card'" />
    <residential-area-card
      v-else-if="this.$route.params.card == 'residential-area-card'"
    />
    <stay-card v-else-if="this.$route.params.card == 'stay-card'" />
    <beds-card v-else-if="this.$route.params.card == 'beds-card'" />
    <patient-care-card
      v-else-if="this.$route.params.card == 'patient-care-card'"
    />
    <consultation-desk-reports-number-card
      v-else-if="
        this.$route.params.card == 'consultation-desk-reports-number-card'
      "
    />
    <adjacent-prefecture-card
      v-else-if="this.$route.params.card == 'adjacent-prefecture-card'"
    />
    <medical-treatment-card
      v-else-if="this.$route.params.card == 'medical-treatment-card'"
    />
    <!--
    <gender-card v-else-if="this.$route.params.card == 'gender-card'" />
    <inspection-persons-number-card
      v-else-if="this.$route.params.card == 'number-of-inspection-persons'"
    />
-->
  </div>
</template>

<script>
import Data from '@/data/data.json'
import ages from '@/data/age.json'
import beds from '@/data/beds.json'
import stay from '@/data/stay.json'
import patient from '@/data/patient-care.json'
import residentialarea from '@/data/residential-area.json'
import adjacentprefecture from '@/data/adjacent-prefecture.json'
import medicaltreatment from '@/data/medical-treatment.json'
import test from '@/data/test.json'
// import gender from '@/data/gender.json'

// 検査陽性者の状況 : data.json
import ConfirmedCasesDetailsCard from '@/components/cards/ConfirmedCasesDetailsCard.vue'
// 陽性患者の属性 : data.json
import ConfirmedCasesAttributesCard from '@/components/cards/ConfirmedCasesAttributesCard.vue'
// 陽性患者数 : data.json
import ConfirmedCasesNumberCard from '@/components/cards/ConfirmedCasesNumberCard.vue'
// 居住地の状況 : residential-area.json
import ResidentialAreaCard from '@/components/cards/ResidentialArea.vue'
// 年代別陽性患者数 : age.json
import AgeCard from '@/components/cards/AgeCard.vue'
// 療養中患者日数 : stay.json
import StayCard from '@/components/cards/StayCard.vue'
// 検査の陽性率 : test.json
import PositiveRateCard from '@/components/cards/PositiveRateCard.vue'
// 新型コロナ受診相談窓口相談件数 : data.json
import ConsultationDeskReportsNumberCard from '@/components/cards/ConsultationDeskReportsNumberCard.vue'
// 入院患者数と病床数 : beds.json
import BedsCard from '@/components/cards/BedsCard.vue'
// 療養患者状況 : patient-care.json
import PatientCareCard from '@/components/cards/PatientCareCard.vue'
// 隣接県の状況 : adjacent-prefecture.json
import AdjacentPrefectureCard from '@/components/cards/AdjacentPrefectureCard.vue'
// 療養患者数 : discharge-hospital.json
import MedicalTreatmentCard from '@/components/cards/MedicalTreatmentCard.vue'

// 性別陽性患者数 : gender.json
// import GenderCard from '@/components/cards/GenderCard.vue'
// 検査実施件数 : data.json
// import InspectionPersonsNumberCard from '@/components/cards/InspectionPersonsNumberCard.vue'

export default {
  components: {
    ConfirmedCasesDetailsCard,
    ConfirmedCasesNumberCard,
    ConfirmedCasesAttributesCard,
    PositiveRateCard,
    ConsultationDeskReportsNumberCard,
    AgeCard,
    ResidentialAreaCard,
    StayCard,
    BedsCard,
    PatientCareCard,
    AdjacentPrefectureCard,
    MedicalTreatmentCard
    // GenderCard,
    // InspectionPersonsNumberCard,
  },
  data() {
    let title, updatedAt
    switch (this.$route.params.card) {
      case 'details-of-confirmed-cases':
        title = this.$t('検査陽性者の状況')
        updatedAt = Data.patients.date
        break
      case 'attributes-of-confirmed-cases':
        title = this.$t('陽性患者の属性')
        updatedAt = Data.patients.date
        break
      case 'number-of-confirmed-cases':
        title = this.$t('陽性患者数')
        updatedAt = Data.patients.date
        break
      case 'residential-area-card':
        title = this.$t('居住地の状況')
        updatedAt = residentialarea.date
        break
      case 'age-card':
        title = this.$t('年代別陽性患者数')
        updatedAt = ages.date
        break
      case 'stay-card':
        title = this.$t('療養中患者日数')
        updatedAt = stay.date
        break
      case 'beds-card':
        title = this.$t('入院患者数と病床数')
        updatedAt = beds.beds_summary.date
        break
      case 'patient-care-card':
        title = this.$t('患者療養状況')
        updatedAt = patient.lastUpdate
        break
      case 'positive-rate-card':
        title = this.$t('検査の陽性率')
        updatedAt = test.test_summary.date
        break
      case 'consultation-desk-reports-number-card':
        title = this.$t('新型コロナ受診相談窓口相談件数')
        updatedAt = Data.querents.date
        break
      case 'adjacent-prefecture-card':
        title = this.$t('隣接県の状況')
        updatedAt = adjacentprefecture.date
        break
      case 'medical-treatment-card':
        title = this.$t('治療患者数')
        updatedAt = medicaltreatment.date
        break
      //    case 'gender-card':
      //      title = this.$t('性別陽性患者数')
      //      updatedAt = gender.gender_summary.date
      //      break
      //    case 'number-of-inspection-persons':
      //      title = this.$t('検査実施人数')
      //      updatedAt = Data.inspection_persons.date
      //      break
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
