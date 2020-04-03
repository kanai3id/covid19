// import dayjs from 'dayjs'

const headers = [
  { text: '日付', value: '日付' },
  { text: '居住地', value: '居住地' },
  { text: '年齢', value: '年齢' },
  { text: '性別', value: '性別' },
  { text: '状況※', value: '状況', align: 'center' },
  { text: '接触者', value: '接触者' }
]

type DataType = {
  日付: string
  居住地: string | null
  年齢: string | null
  性別: '男性' | '女性' | string
  状況: string | null
  接触者: string | null
  [key: string]: any
}

type TableDataType = {
  日付: string
  居住地: DataType['居住地']
  年齢: DataType['年齢']
  性別: DataType['性別'] | '不明'
  状況: DataType['状況']
  接触者: DataType['接触者']
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
      年齢: d['年齢'] ?? '不明',
      性別: d['性別'] ?? '不明',
      状況: d['状況'],
      接触者: d['接触者']
    }
    tableDate.datasets.push(TableRow)
  })
  tableDate.datasets.sort((a, b) => (a === b ? 0 : a < b ? 1 : -1))
  return tableDate
}
