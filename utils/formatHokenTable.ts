// import dayjs from 'dayjs'

const headers = [
  { text: '更新日', value: '更新日' },
  { text: '居住地', value: '居住地' },
  { text: '人数', value: '人数' },
]

type DataType = {
  更新日: string
  居住地: string
  人数: number
  [key: string]: any
}

type TableDataType = {
  更新日: string
  居住地: DataType['居住地']
  人数: DataType['人数']
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
      人数: d['人数']
    }
    tableDate.datasets.push(TableRow)
  })
  tableDate.datasets.sort((a, b) =>
    a.人数 === b.人数 ? 0 : a.人数 < b.人数 ? 1 : -1
  )
  return tableDate
}
