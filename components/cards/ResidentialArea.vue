<template>
  <v-col cols="12" md="6" class="DataCard">
    <data-table
      :title="$t('居住地の状況')"
      :title-id="'residential-area-card'"
      :chart-data="residentialAreaTable"
      :chart-option="{}"
      :date="Data.date"
      :info="sumInfoOfPatients"
      :url="
        'https://www.pref.nagano.lg.jp/hoken-shippei/kenko/kenko/kansensho/joho/corona-doko.html'
      "
      :source="$t('オープンデータを入手')"
      :custom-sort="customSort"
    />
  </v-col>
</template>

<script>
import Data_ from '@/data/data.json'
import Data from '@/data/residential-area.json'
import formatGraph from '@/utils/formatGraph'
import formatTable from '@/utils/formatResidentialArea'
import { getDayjsObject } from '@/utils/formatDate'
import DataTable from '@/components/DataTableResidentialArea.vue'

export default {
  components: {
    DataTable
  },
  data() {
    // 感染者数グラフ
    const patientsGraph = formatGraph(Data_.patients_summary.data)

    const residentialAreaTable = formatTable(Data.data)

    // 日付
    const lastDay = patientsGraph[patientsGraph.length - 1].label
    const dateAsOf = this.$d(getDayjsObject(lastDay).toDate(), 'date')

    const sumInfoOfPatients = {
      lText: patientsGraph[
        patientsGraph.length - 1
      ].cumulative.toLocaleString(),
      sText: this.$t('{date}の累計', { date: dateAsOf }),
      unit: this.$t('人')
    }

    // 陽性患者の属性 ヘッダー翻訳
    for (const header of residentialAreaTable.headers) {
      header.text =
        header.value === '退院' ? this.$t('退院') : this.$t(header.value)
    }
    // 陽性患者の属性 中身の翻訳
    for (const row of residentialAreaTable.datasets) {
      row['居住地'] = this.getTranslatedWording(row['居住地'])
      row['陽性患者数'] = this.getTranslatedWording(row['陽性患者数'])
    }

    const data = {
      Data,
      residentialAreaTable,
      sumInfoOfPatients
    }
    return data
  },
  methods: {
    getTranslatedWording(value) {
      if (value === '-' || value === '‐' || value == null) {
        // 翻訳しようとしている文字列が以下のいずれかだった場合、翻訳しない
        // - 全角のハイフン
        // - 半角のハイフン
        // - null
        return value
      }

      return this.$t(value)
    },
    customSort(items) {
      return items
    }
  }
}
</script>
