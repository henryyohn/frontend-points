<template>
  <a-spin :spinning="loading">
    <div class="t-conatiner">

      <!-- <div class="t-header">
        <div class="t-header-item" v-for="(item, index) in columns" :key="index+'th'">
          <a-checkbox v-if="index===0 && showCheck" @change="onAllChange" style="marginRight:10px;"></a-checkbox>
          {{item.title}}
        </div>
      </div> -->

      <template v-if="dataSourse.length > 0">
        <div class="parent-row" v-for="(order, index) in dataSourse" :key="index+'row'">
          <!-- <div class="r-header" >
            <a-checkbox @change="onChange(order)" :checked="selectedRows.includes(order.order_no)" v-if="showCheck"></a-checkbox>
            <span>订单号：{{order.order_no}}</span>
            <span v-if="order.trade_no != ''">支付流水号：{{order.trade_no}}</span>
            <span>下单时间：{{order.create_time}}</span>
          </div> -->

            <table class="parent-row">
              <tr class="t-header">
                <th class="t-header-item" v-for="(item, index) in columns" :key="index+'th'">
                  <a-checkbox v-if="index===0 && showCheck" @change="onAllChange" style="marginRight:10px;"></a-checkbox>
                  {{item.title}}
                </th>
              </tr>
              <tr class="r-header"  >
                  <td :colspan="columns.length" class="r-header-info">
                    <a-checkbox @change="onChange(order)" :checked="selectedRows.includes(order.order_no)" v-if="showCheck"></a-checkbox>
                    <span>订单号：{{order.order_no}}</span>
                    <span v-if="order.trade_no != ''">支付流水号：{{order.trade_no}}</span>
                    <span>下单时间：{{order.create_time}}</span>
                  </td>
                </tr>
              <tbody>
              <tr class="t-row" v-for="(good, i) in order.order_goods" :key="i+'child'">
                <!-- <template v-for="(col, k) in columns">
                  <td
                    class="t-row-item"
                    :key="k+'c-col'"
                    v-if="!col.rowspan"
                    :rowspan="col.rowspan ? order.goods.length : 0">
                    <template v-if="col.scopedSlots">
                      <slot :name="col.scopedSlots.customRender" v-bind:order="order"></slot>
                    </template>
                    <template v-else>
                      <img class="item-image" v-if="k === 0" :src="good.image" alt="">
                      <span>{{good[col.key]}}</span>
                    </template>
                  </td>
                  <td
                    class="t-row-item"
                    :key="k+'c-col'"
                    v-else-if="col.rowspan && i === 0"
                    :rowspan="col.rowspan ? order.goods.length : 0">
                    <template v-if="col.scopedSlots">
                      <slot :name="col.scopedSlots.customRender" v-bind:order="order"></slot>
                    </template>
                    <template v-else>
                      <img class="item-image" v-if="k === 0" :src="good.image" alt="">
                      <span>{{good[col.key]}}</span>
                    </template>
                  </td>
                </template> -->


                <td class="t-row-item">
                  <div class="row-first-item">
                    <img class="item-image" :src="good.goods_img" alt="">
                    <span style="text-align: left">{{good[columns[0].key]}}</span>
                  </div>
                </td>
                <td class="t-row-item">
                  <span>{{good[columns[1].key]}}</span>
                </td>
                <td class="t-row-item">
                  <span>kkdkdkdkdkdkkdkddkdkk222222222dk</span>
                  <!-- <span v-else>{{good[columns[2].key]}}</span> -->
                </td>
                <td class="t-row-item">
                  <slot :name="columns[3].scopedSlots.customRender" v-bind:goods="{refund_status: good.refund_status, id: good.id}">
                    <span>{{good[columns[3].key]}}</span>
                  </slot>
                </td>
                <td
                  class="t-row-item"
                  v-if="i === 0"
                  :rowspan="3">
                  <span>{{order.order_address && order.order_address.name}}</span>
                </td>
                <td
                  class="t-row-item"
                  v-if="i === 0"
                  :rowspan="3">
                  <span>¥{{order.actual_amount}}</span>
                </td>
                <td
                  class="t-row-item"
                  v-if="i === 0"
                  :rowspan="3">
                  <slot :name="columns[6].scopedSlots.customRender" v-bind:order="order">
                    <span>{{good[columns[6].key]}}</span>
                  </slot>
                </td>
                <td
                  class="t-row-item"
                  v-if="i === 0"
                  :rowspan="3">
                  <slot :name="columns[7].scopedSlots.customRender" v-bind:order="order"></slot>
                </td>
              </tr>
              </tbody>
            </table>
        </div>
      </template>
      <div v-else>
        <a-empty :image="simpleImage" />
      </div>
    </div>
  </a-spin>
</template>

<script>
import { Empty } from 'ant-design-vue';
  export default {
    props: {
      dataSourse: {
        type: Array,
        default: () => []
      },
      columns: {
        type: Array,
        default: () => []
      },
      // selectedRowIds: {
      //   type: Array,
      //   default: () => []
      // },
      loading: {
        type: Boolean,
        default: false,
      },
      showCheck: {
        type: Boolean,
        default: true
      }
    },
    beforeCreate() {
      this.simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
    },
    data() {
      return {
        selectedRows: [],
      }
    },
    methods: {
      onChange(item) {
        const index = this.selectedRows.indexOf(item.order_no);
        if(index > -1) {
          this.selectedRows.splice(index, 1);
        } else {
          this.selectedRows.push(item.order_no);
        }
        this.$emit('onCheckChange', this.selectedRows)
      },
      onAllChange(e) {
        if(e.target.checked) {
          const allIds = this.dataSourse.map(item => item.order_no);
          this.selectedRows = allIds;
        } else {
          this.selectedRows = [];
        }
        this.$emit('onCheckChange', this.selectedRows)
      }
    }
  }
</script>

<style lang="less" scoped>
.t-conatiner {
  margin: 10px;
  height: 100%;
  position: relative;
}
table {
  width: 100%;
}
.t-header {
  background-color: #f4f4f4;
  height: 74px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 10px solid #fff;
}
.t-header-item {
  flex: 1 1 0;
  text-align: center;
  font-weight: bold;
}
.t-header-item:first-child {
  flex: 0 0 40%;
  padding-left: 16px;
  text-align: left;
}
.t-row-item {
  // flex: 1;
  text-align: center;
  // display: flex;
  // align-items: center;
  // justify-content: center;
  min-width: 74px;
}
.row-first-item {
  display: flex;
  align-items: center;
  margin-left: 32px;
}
.t-row-item:first-child {
  // flex: 0 0 40%;
  width: 40%;
  justify-content: flex-start;
}
.t-row-item span {
  // flex: 1;
}
table tr td {
  border: 0;
}

th, td {
  text-align: center;
}
.parent-row {
  margin: 10px 0;
  border-bottom: 1px solid #f4f4f4;
}
.r-header {
  height: 50px;
  line-height: 50px;
  background-color: #f4f4f4;
  padding: 0 16px;
}
.r-header span {
  display: inline-block;
  padding-left: 16px;
}
.r-header-info {
  text-align: left;
}
.t-row {
  // display: flex;
  padding: 5px;
}
.item-image {
  margin: 8px 8px 8px 0;
  width: 60px;
  height: 60px;
}
.t-loading {
  text-align: center;
  height: 100%;
}
</style>
