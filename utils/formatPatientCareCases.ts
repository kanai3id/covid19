type DataType = {
  children: [
    {
      attr: '患者数'
      value: number
      children: [
        {
          attr: '入院'
          value: number
        },
        {
          attr: '入院中'
          value: number
        },
        {
          attr: '入院予定'
          value: number
        },
        {
          attr: '宿泊療養'
          value: number
        },
        {
          attr: '宿泊療養中'
          value: number
        },
        {
          attr: '宿泊療養予定'
          value: number
        },
        {
          attr: '自宅療養中'
          value: number
        },
        {
          attr: '調整中'
          value: number
        }
      ]
    }
  ]
}

type ConfirmedCasesType = {
  患者数: number
  入院: number
  入院中: number
  入院予定: number
  宿泊療養: number
  宿泊療養中: number
  宿泊療養予定: number
  自宅療養中: number
  調整中: number
}

interface ChildData {
  attr: string
  value: number
}

type ChildDataType = {
  attr?: string
  value?: number
  children?: ChildData[]
}

function getSelectedItem(data: DataType, key: string) {
  let result: number | undefined
  const recursiveSearch = (data: ChildDataType) => {
    if (result) {
      return
    }
    if (data.attr === key) {
      result = data.value
    } else if (data.children) {
      data.children.forEach((child: ChildDataType) => {
        if (result) {
          return
        }
        recursiveSearch(child)
      })
    }
  }
  recursiveSearch(data)

  return result || 0
}

/**
 * Format for *Chart component
 *
 * @param data - Raw data
 */
export default (data: DataType) => {
  return {
    患者数: getSelectedItem(data, '患者数'),
    入院: getSelectedItem(data, '入院'),
    入院中: getSelectedItem(data, '入院中'),
    入院予定: getSelectedItem(data, '入院予定'),
    宿泊療養: getSelectedItem(data, '宿泊療養'),
    宿泊療養中: getSelectedItem(data, '宿泊療養中'),
    宿泊療養予定: getSelectedItem(data, '宿泊療養予定'),
    自宅療養中: getSelectedItem(data, '自宅療養中'),
    調整中: getSelectedItem(data, '調整中')
  } as ConfirmedCasesType
}
