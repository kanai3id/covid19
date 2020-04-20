// import dayjs from 'dayjs'

const headers = [
  { text: '日付', value: '日付' },
  { text: '居住地', value: '居住地' },
  { text: '年代', value: '年代' },
  { text: '性別', value: '性別' },
  { text: '状況', value: '状況', align: 'center' },
  { text: '滞在歴等', value: '滞在歴等' }
]

type DataType = {
  日付: string
  居住地: string | null
  年代: string | null
  性別: '男性' | '女性' | string
  状況: string | null
  滞在歴等: string | null
  [key: string]: any
}

type TableDataType = {
  日付: string
  居住地: DataType['居住地']
  年代: DataType['年代']
  性別: DataType['性別'] | '不明'
  状況: DataType['状況']
  滞在歴等: DataType['滞在歴等']
}

type TableDateType = {
  headers: typeof headers
  datasets: TableDataType[]
}

/**
 * Format for DataTable component
 *
 * @param data - Raw data
 */
export default (data: DataType[]) => {
  const tableDate: TableDateType = {
    headers,
    datasets: []
  }
  data.forEach(d => {
    const TableRow: TableDataType = {
      日付: d['日付'],
      居住地: d['居住地'] ?? '調査中',
      年代: d['年代'] ?? '不明',
      性別: d['性別'] ?? '不明',
      状況: d['状況'],
      滞在歴等: d['滞在歴等']
    }
    tableDate.datasets.push(TableRow)
  })
  tableDate.datasets.sort((a, b) =>
    a.日付 === b.日付 ? 0 : a.日付 < b.日付 ? 1 : -1
  )
  return tableDate
}
