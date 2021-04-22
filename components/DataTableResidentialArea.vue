<template>
  <data-view :title="title" :title-id="titleId" :date="date">
    <template v-slot:button>
      <span />
    </template>
    <v-data-table
      :ref="'displayedTable'"
      :headers="chartData.headers"
      :items="chartData.datasets"
      :items-per-page="-1"
      :hide-default-footer="true"
      :height="320"
      :fixed-header="true"
      :mobile-breakpoint="0"
      :custom-sort="customSort"
      :disable-sort="true"
      class="cardTable"
    >
      <template v-slot:body="{ items }">
        <tbody>
          <tr v-for="item in items" :key="item.text">
            <th class="text-start">{{ item['更新日'] }}</th>
            <td class="text-start" style="font-size : 12px;">
              {{ item['居住地'] }}
            </td>
            <th class="text-start">{{ item['新規'] }}</th>
            <th class="text-start">{{ item['陽性者数'] }}</th>
            <th class="text-start">{{ item['療養中'] }}</th>
            <th class="text-start">{{ item['退院'] }}</th>
          </tr>
        </tbody>
      </template>
    </v-data-table>
    <template v-slot:additionalDescription>
      <ul class="ListStyleNone">
        <li>
          {{ $t('※退院には死亡退院・転院を含む') }}
        </li>
      </ul>
    </template>
    <template v-slot:infoPanel>
      <data-view-basic-info-panel
        :l-text="info.lText"
        :s-text="info.sText"
        :unit="info.unit"
      />
    </template>
    <template v-slot:footer>
      <open-data-link :url="url" />
    </template>
  </data-view>
</template>

<style lang="scss">
.cardTable {
  &.v-data-table {
    th {
      padding: 8px 10px;
      height: auto;
      border-bottom: 1px solid $gray-4;
      white-space: nowrap;
      color: $gray-2;
      font-size: 12px;

      &.text-center {
        text-align: center;
      }
    }
    td {
      padding: 8px 10px !important;
      height: auto !important;
      border-bottom: 1px solid $gray-4 !important;
      color: $gray-2 !important;
      @include font-size(12, true);

      &.text-center {
        text-align: center;
      }
    }

    tbody {
      tr {
        color: $gray-1;

        th {
          font-weight: normal;
        }

        td {
          padding: 8px 10px;
          height: auto;
          font-size: 12px;

          &.text-center {
            text-align: center;
          }
        }

        &:nth-child(odd) {
          th,
          td {
            background: rgba($gray-4, 0.3);
          }
        }
      }
    }
    &:focus {
      outline: dotted $gray-3 1px;
    }
  }
  .v-data-table__wrapper {
    box-shadow: 0 -20px 12px -12px #0003 inset;
  }
  .v-data-footer {
    @include font-size(12);
    &__pagination {
      margin-left: 0;
      margin-right: 5px;
    }
  }
}
.v-menu__content {
  width: 60px;
  .v-list-item {
    padding: 0 8px;
  }
}
.v-list-item__title {
  font-size: 0.8rem;
}
.note {
  margin: 8px 0 0;
  font-size: 12px;
  color: $gray-3;

  ul,
  ol {
    list-style-type: none;
    padding: 0;
  }
}
</style>

<script lang="ts">
import Vue from 'vue'
import DataView from '@/components/DataView.vue'
import DataViewBasicInfoPanel from '@/components/DataViewBasicInfoPanel.vue'
import OpenDataLink from '@/components/OpenDataLink.vue'

export default Vue.extend({
  components: { DataView, DataViewBasicInfoPanel, OpenDataLink },
  props: {
    title: {
      type: String,
      default: ''
    },
    titleId: {
      type: String,
      default: ''
    },
    chartData: {
      type: Object,
      default: () => {}
    },
    date: {
      type: String,
      default: ''
    },
    info: {
      type: Object,
      default: () => {}
    },
    url: {
      type: String,
      default: ''
    },
    customSort: {
      type: Function,
      default(items: Object[], index: string[], isDesc: boolean[]) {
        items.sort((a: any, b: any) => {
          let comparison = 0
          if (String(a[index[0]]) < String(b[index[0]])) {
            comparison = -1
          } else if (String(b[index[0]]) < String(a[index[0]])) {
            comparison = 1
          }
          // a と b が等しい場合は上記のif文を両方とも通過するので 0 のままとなる

          // 降順指定の場合は符号を反転
          if (comparison !== 0) {
            comparison = isDesc[0] ? comparison * -1 : comparison
          }
          return comparison
        })
        return items
      }
    }
  },
  mounted() {
    const vTables = this.$refs.displayedTable as Vue
    const vTableElement = vTables.$el
    const tables = vTableElement.querySelectorAll('table')
    // NodeListをIE11でforEachするためのワークアラウンド
    const nodes = Array.prototype.slice.call(tables, 0)
    nodes.forEach((table: HTMLElement) => {
      table.setAttribute('tabindex', '0')
    })
  }
})
</script>
