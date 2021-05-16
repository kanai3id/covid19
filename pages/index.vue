<template>
  <div class="MainPage">
    <div class="Header mb-3">
      <page-header :icon="headerItem.icon">{{ headerItem.title }}</page-header>
      <div class="UpdatedAt">
        <span>{{ $t('最終更新') }}</span>
        <time :datetime="updatedAt">{{ Data.lastUpdate }}</time>
      </div>
      <div
        v-show="!['ja', 'ja-basic'].includes($i18n.locale)"
        class="Annotation"
      >
        <span>{{ $t('注釈') }}</span>
      </div>
    </div>
    <whats-new class="mb-4" :items="newsItems" />
    <infection-medicalcareprovision-status />
<!--
    <static-info
      class="mb-4"
      :url="
        'https://www.pref.nagano.lg.jp/hoken-shippei/kenko/kenko/kansensho/joho/corona-soudan.html#jusinsodan'
      "
      :text="$t('自分や家族の症状に不安や心配があればまずは電話相談をどうぞ')"
      :btn-text="$t('24時間対応')"
    />
-->
    <card-row class="DataBlock">
      <!-- 検査陽性者の状況 -->
      <confirmed-cases-details-card />
      <confirmed-cases-attributes-card />
      <confirmed-cases-number-card />
      <residential-area-card />
      <age-card />
      <stay-card />
      <beds-card />
      <patient-care-card />
      <positive-rate-card />
      <consultation-desk-reports-number-card />
      <adjacent-prefecture-card />
      <discharge-hospital-card />
      <!-- <gender-card /> -->
      <!-- <inspection-persons-number-card /> -->
    </card-row>
    <v-divider />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { MetaInfo } from 'vue-meta'
import { convertDatetimeToISO8601Format } from '@/utils/formatDate'

import Data from '@/data/data.json'
import News from '@/data/news.json'

import PageHeader from '@/components/PageHeader.vue'
import WhatsNew from '@/components/WhatsNew.vue'
import CardRow from '@/components/cards/CardRow.vue'
import StaticInfo from '@/components/StaticInfo.vue'
import InfectionMedicalcareprovisionStatus from '@/components/InfectionMedicalcareprovisionStatus.vue'

import ConfirmedCasesDetailsCard from '@/components/cards/ConfirmedCasesDetailsCard.vue'
import ConfirmedCasesAttributesCard from '@/components/cards/ConfirmedCasesAttributesCard.vue'
import ConfirmedCasesNumberCard from '@/components/cards/ConfirmedCasesNumberCard.vue'
import ResidentialAreaCard from '@/components/cards/ResidentialArea.vue'
import AgeCard from '@/components/cards/AgeCard.vue'
import StayCard from '@/components/cards/StayCard.vue'
import PositiveRateCard from '@/components/cards/PositiveRateCard.vue'
import ConsultationDeskReportsNumberCard from '@/components/cards/ConsultationDeskReportsNumberCard.vue'
import BedsCard from '@/components/cards/BedsCard.vue'
import PatientCareCard from '@/components/cards/PatientCareCard.vue'
import AdjacentPrefectureCard from '@/components/cards/AdjacentPrefectureCard.vue'
import DischargeHospitalCard from '@/components/cards/DischargeHospitalCard.vue'
// import GenderCard from '@/components/cards/GenderCard.vue'
// import InspectionPersonsNumberCard from '@/components/cards/InspectionPersonsNumberCard.vue'

export default Vue.extend({
  components: {
    PageHeader,
    WhatsNew,
    CardRow,
    StaticInfo,
    InfectionMedicalcareprovisionStatus,
    ConfirmedCasesDetailsCard,
    ConfirmedCasesAttributesCard,
    ConfirmedCasesNumberCard,
    ResidentialAreaCard,
    AgeCard,
    StayCard,
    PositiveRateCard,
    ConsultationDeskReportsNumberCard,
    BedsCard,
    PatientCareCard,
    AdjacentPrefectureCard,
    DischargeHospitalCard
    // GenderCard,
    // InspectionPersonsNumberCard,
  },
  data() {
    const data = {
      Data,
      headerItem: {
        icon: 'mdi-chart-timeline-variant',
        title: this.$t('長野の最新感染動向')
      },
      newsItems: News.newsItems
    }
    return data
  },
  computed: {
    updatedAt() {
      return convertDatetimeToISO8601Format(this.$data.Data.lastUpdate)
    }
  },
  head(): MetaInfo {
    return {
      title: this.$t('長野の最新感染動向') as string
    }
  }
})
</script>

<style lang="scss" scoped>
.MainPage {
  .Header {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;

    @include lessThan($small) {
      flex-direction: column;
      align-items: baseline;
    }
  }

  .UpdatedAt {
    @include font-size(14);

    color: $gray-3;
    margin-bottom: 0.2rem;
  }

  .Annotation {
    @include font-size(12);

    color: $gray-3;
    @include largerThan($small) {
      margin: 0 0 0 auto;
    }
  }
  .DataBlock {
    margin: 20px -8px;

    .DataCard {
      @include largerThan($medium) {
        padding: 10px;
      }

      @include lessThan($small) {
        padding: 4px 8px;
      }
    }
  }
}
</style>
