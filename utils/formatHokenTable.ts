// import dayjs from 'dayjs'

const headers = [
  { text: '更新日', value: '更新日' },
  { text: '居住地', value: '居住地' },
  { text: '陽性者数', value: '陽性者数', align: 'center' },
  { text: '滞在歴', value: '滞在歴' },
  { text: '帰省', value: '帰省' }
]

type DataType = {
  更新日: string
  居住地: string
  陽性者数: number
  滞在歴: number
  帰省: number
  [key: string]: any
}

type TableDataType = {
  更新日: string
  居住地: DataType['居住地']
  陽性者数: DataType['陽性者数']
  滞在歴: DataType['滞在歴']
  帰省: DataType['帰省']
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
      陽性者数: d['陽性者数'],
      滞在歴: d['滞在歴'],
      帰省: d['帰省']
    }
    tableDate.datasets.push(TableRow)
  })
  tableDate.datasets.sort((a, b) =>
    a.陽性者数 === b.陽性者数 ? 0 : a.陽性者数 < b.陽性者数 ? 1 : -1
  )
  return tableDate
}
