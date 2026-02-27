<template>
  <div class="app-container home">
    <div class="station-top">
      <el-row :gutter="12" class="mt5">
        <el-col :span="6">
          <div class="top-item-box item-box-one" style="display: flex;">
            <div style="flex:2;height:100%;">
              <div>{{ $t('home.inbound') }}</div>
              <div style="text-align:center;margin-top:30px;">
                <span style="font-size:26px;font-weight:bold;">33</span>
              </div>
            </div>
            <div style="flex:3;display: flex;flex-direction:column;justify-content:space-evenly">
              <div>{{ $t('home.inboundPendingInbound', { count: 15 }) }}</div>
              <div>{{ $t('home.inboundPendingCheck', { count: 15 }) }}</div>
              <div>{{ $t('home.inboundPendingOnShelf', { count: 2 }) }}</div>
              <div>{{ $t('home.inboundPendingFinish', { count: 1 }) }}</div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="top-item-box item-box-two" style="display: flex;">
            <div style="flex:2;height:100%;">
              <div>{{ $t('home.outbound') }}</div>
              <div style="text-align:center;margin-top:30px;">
                <span style="font-size:26px;font-weight:bold;">20</span>
              </div>
            </div>
            <div style="flex:3;display: flex;flex-direction:column;justify-content:space-evenly">
              <div>{{ $t('home.outboundPendingAllocate', { count: 5 }) }}</div>
              <div>{{ $t('home.outboundPendingWave', { count: 5 }) }}</div>
              <div>{{ $t('home.outboundPendingPick', { count: 5 }) }}</div>
              <div>{{ $t('home.outboundPendingOutbound', { count: 5 }) }}</div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="top-item-box item-box-three" style="display: flex;">
            <div style="flex:2;height:100%;">
              <div>{{ $t('home.other') }}</div>
              <div style="text-align:center;margin-top:30px;">
                <span style="font-size:26px;font-weight:bold;">15</span>
              </div>
            </div>
            <div style="flex:3;display: flex;flex-direction:column;justify-content:space-evenly">
              <div>{{ $t('home.otherPendingCutoff', { count: 5 }) }}</div>
              <div>{{ $t('home.otherExceptionOrder', { count: 5 }) }}</div>
              <div>{{ $t('home.otherTodayArrive', { count: 5 }) }}</div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="top-item-box item-box-four" style="display: flex;">
            <div style="flex:2;height:100%;">
              <div>{{ $t('home.stockWarning') }}</div>
              <div style="text-align:center;margin-top:30px;">
                <span style="font-size:26px;font-weight:bold;">5</span>
              </div>
            </div>
            <div style="flex:3;display: flex;flex-direction:column;justify-content:space-evenly">
              <div>{{ $t('home.stockWarehouseItem', { name: '松陵仓', count: 1 }) }}</div>
              <div>{{ $t('home.stockWarehouseItem', { name: '盛泽仓', count: 2 }) }}</div>
              <div>{{ $t('home.stockWarehouseItem', { name: '园区仓', count: 2 }) }}</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="station-middle">
      <el-row :gutter="12">
        <el-col :span="6">
          <el-card class="box-card" shadow="never">
            <div class="card-title">{{ $t('home.warehouseGoodsRatio') }}</div>
            <div style="height: calc(100% - 30px);">
              <StationPie height="100%"></StationPie>
              <div></div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="18">
          <el-card class="box-card" shadow="never">
            <div style="display:flex;justify-content: space-between;align-items: center;">
              <div class="card-title">{{ $t('home.inboundTrend') }}</div>
              <el-radio-group v-model="tabPosition" @change="dateChange">
                <!-- <el-radio-button label="day">当日</el-radio-button> -->
                <el-radio-button label="month">{{ $t('home.thisMonth') }}</el-radio-button>
                <el-radio-button label="year">{{ $t('home.thisYear') }}</el-radio-button>
              </el-radio-group>
            </div>
            <div style="height: calc(100% - 30px);">
              <StationBar height="100%" :chartData="barChartData" :xName="barXName"/>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="station-bottom">
      <el-row :gutter="12">
        <el-col :span="6">
          <el-card class="box-card" shadow="never">
            <div class="card-title">{{ $t('home.last7SaleOutbound') }}</div>
            <div style="height: calc(100% - 30px);">
              <StationLine height="100%" itemColor="#ee4368" :yName="$t('home.unitPiece')" :chartData="lineDataOne"/>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="box-card" shadow="never">
            <div class="card-title">{{ $t('home.last7PickOutbound') }}</div>
            <div style="height: calc(100% - 30px);">
              <StationLine height="100%" :chartData="lineDataTwo" :yName="$t('home.unitPiece')" itemColor="#5470c6"/>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="box-card" shadow="never">
            <div class="card-title">{{ $t('home.last7Move') }}</div>
            <div style="height: calc(100% - 30px);">
              <StationLine
                height="100%"
                :chartData="lineDataThree"
                :yName="$t('home.unitPiece')"
                itemColor="#c58bea"
              />
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="box-card" shadow="never">
            <div class="card-title">{{ $t('home.last7ReturnInbound') }}</div>
            <div style="height: calc(100% - 30px);">
              <StationLine
                height="100%"
                :yName="$t('home.unitPiece')"
                :chartData="lineDataFour"
                itemColor="#c7a428"
              />
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script setup>
import StationPie from './components/StationPie.vue'
import StationLine from './components/StationLine.vue'
import StationBar from './components/StationBar.vue'
import { onMounted, ref } from 'vue'
import moment from 'moment';

const tabPosition = ref('month')
const barChartData = ref({
  yData: [79, 68, 56, 72, 51, 63, 67, 71, 58, 81, 64, 77, 56, 69]
})
const barXName = ref('home.unitDay')
const lineDataOne = ref({
  yData: [79, 65, 21, 67, 21, 89, 56],
})
const lineDataTwo = ref({
  yData: [45, 72, 16, 37, 64, 28, 46],
})
const lineDataThree = ref(
  {
    yData: [16, 27, 37, 16, 27, 21, 11],
  }
)
const lineDataFour = ref({
  yData: [134, 107, 94, 173, 37, 143, 86],
})

onMounted((()=>{
  initTime();
  dateChange('month');
}))

// 时间类型选择
function dateChange(value) {
  let date = new Date()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let barXData = []
  let barYData = []
  if(value === 'year') {
    for(let i = 0; i < month; i++) {
      barXData.push(moment().subtract(i, 'months').format('YYYY-MM'))
      barYData.push(Math.floor(Math.random()*(180-120+1))+120)
    }
    barXName.value = '月'
  } else {
    for(let i = 0; i < day; i++) {
      barXData.push(moment().subtract(i, 'days').format('MM-DD'))
      barYData.push(Math.floor(Math.random()*(30-15+1))+15)
    }
    barXName.value = '日'
  }
  barChartData.value = {
    xData: barXData.reverse(),
    yData: barYData
  }
}
// 初始化时间模拟数据
function initTime() {
  let lineXData = []
  for(let i = 0; i < 7; i++) {
    lineXData.push(moment().subtract(i, 'days').format('MM-DD'))
  }
  lineXData = lineXData.reverse()
  lineDataOne.value.xData = lineXData
  lineDataTwo.value.xData = lineXData
  lineDataThree.value.xData = lineXData
  lineDataFour.value.xData = lineXData
}


</script>


<style scoped>
.app-container {
  min-height: calc(100vh - 84px);
  padding: 12px 12px 0 12px;
}

.top-item-box {
  height: 160px;
  background: #fff;
  margin-bottom: 12px;
  border-radius: 12px;
  color: #fff;
  padding: 16px;
}

.item-box-one {
  background: linear-gradient(30deg, #1a94db, #4db1eb, #7acaf9);
  box-shadow: 0 4px 12px #8ed2fa;
}

.item-box-two {
  background: linear-gradient(30deg, #c7a327, #d5ba47, #e3cf65);
  box-shadow: 0 4px 12px #ece7cd;
}

.item-box-three {
  background: linear-gradient(30deg, #6365f7, #9177f1, #cd8ee9);
  box-shadow: 0 4px 12px #dcc9e6;
}

.item-box-four {
  background: linear-gradient(30deg, #ed3a60, #f1557a, #f67da0);
  box-shadow: 0 4px 12px #e7cfd6;
}

.box-card {
  height: 400px;
  margin-bottom: 12px;
  background-color: #fff;
  border-color: #ebe6f5;
}

.box-card >>> .el-card__body {
  height: 100%;
}

.card-title {
  font-weight: bold;
  height: 30px;
  display: flex;
  align-items: center;
}

.card-title::before {
  content: '';
  height: 70%;
  width: 5px;
  background: #3671e8;
  margin-right: 8px;
}

</style>
