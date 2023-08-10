<template> 
  <div class="app-container">
    <div style="margin-top: 20px">
      <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
      <span class="font-small">设备基本信息</span>
    </div>
    <div class="table-layout">
      <el-row>
        <el-col :span="4" class="table-cell-title">设备名称</el-col>
        <el-col :span="4" class="table-cell-title">设备SN</el-col>
        <el-col :span="4" class="table-cell-title">设备位置</el-col>
        <el-col :span="4" class="table-cell-title">设备型号</el-col>
        <el-col :span="4" class="table-cell-title">设备状态</el-col>
        <el-col :span="4" class="table-cell-title">创建时间</el-col>
      </el-row>
      <el-row>
        <el-col :span="4" class="table-cell">{{device.deviceName}}</el-col>
        <el-col :span="4" class="table-cell">{{device.deviceSn }}</el-col>
        <el-col :span="4" class="table-cell">{{device.deviceLocation}}</el-col>
        <el-col :span="4" class="table-cell">{{device.model}}</el-col>
        <el-col :span="4" class="table-cell">{{device.status | formatDeviceStatus}}元</el-col>
        <el-col :span="4" class="table-cell">{{device.createTime | formatTime}}</el-col>
      </el-row>
    </div>
    <div style="margin-top: 20px">
      <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
      <span class="font-small">设备配件信息</span>
    </div>
    <div class="table-container">
      <el-table ref="couponHistoryTable"
                :data="list"
                style="width: 100%;"
                :v-loading="listLoading" border>
        <el-table-column label="配件名称" align="center">
          <template slot-scope="scope">{{scope.row.fittingName}}</template>
        </el-table-column>
        <el-table-column label="配件SN" align="center">
          <template slot-scope="scope">{{scope.row.fittingSn}}</template>
        </el-table-column>
        <el-table-column label="配件型号" align="center">
          <template slot-scope="scope">{{scope.row.fittingModel}}</template>
        </el-table-column>
        <el-table-column label="能效等级" align="center">
          <template slot-scope="scope">{{scope.row.fittingType | formatFittingType}}</template>
        </el-table-column>
        <el-table-column label="配件状态" align="center">
          <template slot-scope="scope">{{scope.row.status | formatStatus}}</template>
        </el-table-column>
        <el-table-column label="到库日期" align="center">
          <template slot-scope="scope">{{scope.row.createTime | formatTime}}</template>
        </el-table-column>
        <el-table-column label="失效日期" align="center">
          <template slot-scope="scope">{{scope.row.expiredTime | formatTime}}</template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
  import {formatDate} from '@/utils/date';
  import {getDevice, getFittingList} from '@/api/device';

  export default {
    name: 'deviceHistoryList',
    data() {
      return {
        device: {},
        deviceId: null,
        list:null,
        listLoading:false
      }
    },
    created() {
      getDevice(this.$route.query.id).then(response => {
        this.device = response.data;
      });
      this.deviceId=this.$route.query.id;
      this.getList();
    },
    filters: {
      formatDeviceStatus(type) {
        if (type === 0) {
          return '禁用';
        } else if (type === 1) {
          return '可用';
        } else if (type === 2){
          return '报修';
        } else {
          return '未报修';
        }
      },
      formatFittingType(type) {
        if (type === 0) {
          return '低效';
        } else if (platform === 1) {
          return '中效';
        } else {
          return '高效';
        }
      },
      formatStatus(type) {
        if (type === 0) {
          return '报废';
        } else if (type === 1) {
          return '已使用';
        } else {
          return '库存';
        }
      },
      formatTime(time) {
        if (time == null || time === '') {
          return 'N/A';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      },
    },
    methods: {
      getList(){
        this.listLoading=true;
        getFittingList(this.deviceId).then(response=>{
          this.listLoading=false;
          this.list=response.data;
        });
      }
    }
  }
</script>
<style scoped>
  .app-container {
    width: 80%;
    margin: 20px auto;
  }

  .filter-container {
    margin-top: 20px;
  }

  .table-layout {
    margin-top: 20px;
    border-left: 1px solid #DCDFE6;
    border-top: 1px solid #DCDFE6;
  }

  .table-cell {
    height: 60px;
    line-height: 40px;
    border-right: 1px solid #DCDFE6;
    border-bottom: 1px solid #DCDFE6;
    padding: 10px;
    font-size: 14px;
    color: #606266;
    text-align: center;
    overflow: hidden;
  }

  .table-cell-title {
    border-right: 1px solid #DCDFE6;
    border-bottom: 1px solid #DCDFE6;
    padding: 10px;
    background: #F2F6FC;
    text-align: center;
    font-size: 14px;
    color: #303133;
  }
</style>


