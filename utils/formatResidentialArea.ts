// import dayjs from 'dayjs'

const headers = [
  { text: '更新日', value: '更新日' },
  { text: '居住地', value: '居住地' },
  { text: '新規', value: '新規', align: 'center' },
  { text: '陽性者数', value: '陽性者数', align: 'center' },
  { text: '療養中', value: '療養中' },
  { text: '退院', value: '退院' }
]

type DataType = {
  更新日: string
  居住地: string
  新規: number
  陽性者数: number
  療養中: number
  退院: number
  [key: string]: any
}

type TableDataType = {
  更新日: string
  居住地: DataType['居住地']
  新規: DataType['新規']
  陽性者数: DataType['陽性者数']
  療養中: DataType['療養中']
  退院: DataType['退院']
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
      更新日: d['更新日'],
      居住地: d['居住地'] ?? '調査中',
      新規: d['新規'],
      陽性者数: d['陽性者数'],
      療養中: d['療養中'],
      退院: d['退院']
    }
    tableDate.datasets.push(TableRow)
  })
  tableDate.datasets.sort((a, b) =>
    a.療養中 === b.療養中 ? 0 : a.療養中 < b.療養中 ? 1 : -1
  )
  return tableDate
}
