<template>
  <v-col cols="12" md="6" class="DataCard">
    <data-table
      :title="$t('隣接県の状況')"
      :title-id="'adjacent-prefecture-card'"
      :chart-data="prefectureTable"
      :chart-option="{}"
      :date="Data.date"
      :info="info"
      :url="'https://www.stopcovid19.jp/'"
      :source="$t('オープンデータを入手')"
      :custom-sort="customSort"
    />
  </v-col>
</template>

<script>
import Data from '@/data/adjacent-prefecture.json'
import formatTable from '@/utils/formatAdjacentPrefectureTable.ts'
import DataTable from '@/components/DataTable.vue'

export default {
  components: {
    DataTable
  },
  data() {
    const prefectureTable = formatTable(Data.data)

    // 隣接県の状況 ヘッダー翻訳
    for (const header of prefectureTable.headers) {
      header.text = this.$t(header.value)
    }
    // 隣接県の状況 中身の翻訳
    for (const row of prefectureTable.datasets) {
      row['県名'] = this.getTranslatedWording(row['県名'])
    }

    const info = {
      sText: this.$t('COVID-19 Japan様のデータを利用', '')
    }

    const data = {
      Data,
      prefectureTable,
      info
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
