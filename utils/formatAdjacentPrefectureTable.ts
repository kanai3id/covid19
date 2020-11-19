// import dayjs from 'dayjs'

const headers = [
  { text: '県名', value: '県名' },
  { text: '陽性者数', value: '陽性者数', align: 'center' },
  { text: '入院', value: '入院' },
  { text: '退院', value: '退院' },
  { text: '死亡', value: '死亡' },
  { text: '実効再生産数', value: '実効再生産数' }
]

type DataType = {
  県名: string
  陽性者数: number
  入院: number
  退院: number
  死亡: number
  実効再生産数: number
  [key: string]: any
}

type TableDataType = {
  県名: DataType['県名']
  陽性者数: DataType['陽性者数']
  入院: DataType['入院']
  退院: DataType['退院']
  死亡: DataType['死亡']
  実効再生産数: DataType['実効再生産数']
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
      県名: d['県名'],
      陽性者数: d['陽性者数'],
      入院: d['入院'],
      退院: d['退院'],
      死亡: d['死亡'],
      実効再生産数: d['実効再生産数']
    }
    tableDate.datasets.push(TableRow)
  })
  tableDate.datasets.sort((a, b) =>
    a.陽性者数 === b.陽性者数 ? 0 : a.陽性者数 < b.陽性者数 ? 1 : -1
  )
  return tableDate
}
