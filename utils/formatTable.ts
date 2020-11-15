import Vue from 'vue'
import dayjs from 'dayjs'

type Header = {
  text: string
  value: string
  align?: string
}

const headers: Header[] = [
  { text: 'No', value: 'No' },
  { text: '公表日', value: '公表日' },
  { text: '居住地', value: '居住地' },
  { text: '年代と性別', value: '年代と性別' },
  { text: '状況', value: '状況' },
]

type DataType = {
  No: number
  公表日: string
  居住地: string | null
  年代と性別: string | null
  状況: string | null
  [key: string]: any
}

type TableDataType = {
  No: number
  公表日: string
  居住地: DataType['居住地']
  年代と性別: DataType['年代と性別'] | '不明'
  状況: DataType['状況'] | '調査中'
}

type TableDateType = {
  headers: Header[]
  datasets: TableDataType[]
}

/**
 * Format for DataTable component
 *
 * @param data - Raw data
 */
export default function (data: DataType[]): TableDateType {
  const datasets = data
    .map((d) => ({
      No: d.No ?? '不明',
      公表日: d['公表日'],
      居住地: d['居住地'] ?? '調査中',
      年代と性別: d['年代と性別'] ?? '不明',
      状況: d['状況'] ?? '調査中',
    }))
    .sort((a, b) => dayjs(a.公表日).unix() - dayjs(b.公表日).unix())
    .reverse()
  return {
    headers,
    datasets,
  }
}

function formatDateString(date: string): string | undefined {
  const day = dayjs(date)
  if (day.isValid()) {
    return Vue.prototype.$nuxt.$options.i18n.d(day.toDate(), 'dateWithoutYear')
  }
}
