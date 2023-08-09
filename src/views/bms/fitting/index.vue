<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float:right"
          type="primary"
          @click="handleSearchList()"
          size="small">
          查询搜索
        </el-button>
        <el-button
          style="float:right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small">
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="配件名称：">
            <el-input v-model="listQuery.fittingName" class="input-width" placeholder="配件名称"></el-input>
          </el-form-item>
          <el-form-item label="配件SN：">
            <el-input v-model="listQuery.fittingSn" class="input-width" placeholder="配件SN"></el-input>
          </el-form-item>
          <el-form-item label="配件状态：">
            <el-select v-model="listQuery.status" placeholder="全部" clearable class="input-width">
              <el-option v-for="item in statusOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button size="mini" class="btn-add" @click="handleAdd()">添加</el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="deviceTable"
                :data="list"
                style="width: 100%;"
                @selection-change="handleSelectionChange"
                v-loading="listLoading" border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="配件名称" align="center">
          <template slot-scope="scope">{{scope.row.fittingName}}</template>
        </el-table-column>
        <el-table-column label="配件SN" align="center">
          <template slot-scope="scope">{{scope.row.fittingSn}}</template>
        </el-table-column>
        <el-table-column label="配件型号" align="center">
          <template slot-scope="scope">{{scope.row.fittingModel}}</template>
        </el-table-column>
        <el-table-column label="设备状态" width="100" align="center">
          <template slot-scope="scope">{{scope.row.status | formatStatus}}</template>
        </el-table-column>
        <el-table-column label="到库日期" width="180" align="center">
          <template slot-scope="scope">{{scope.row.createTime |formatDate}}</template>
        </el-table-column>
        <el-table-column label="失效日期" width="180" align="center">
          <template slot-scope="scope">{{scope.row.expiredTime |formatDate}}</template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="text"
                       @click="handleView(scope.$index, scope.row)">查看</el-button>
            <el-button size="mini"
                       type="text"
                       @click="handleUpdate(scope.$index, scope.row)">
              编辑</el-button>
            <el-button size="mini"
                       type="text"
                       @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,15]"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import {fetchList,deleteFitting} from '@/api/fitting';
  import {formatDate} from '@/utils/date';
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    fittingName: null,
    fittingSn: null,
    status: null
  };
  const defaultStatusOptions=[
    {
      label: '报废',
      value: 0
    },
    {
      label: '已使用',
      value: 1
    },
    {
      label: '库存',
      value: 2
    }
  ];
  export default {
    name:'fittingList',
    data() {
      return {
        listQuery:Object.assign({},defaultListQuery),
        statusOptions:Object.assign({},defaultStatusOptions),
        list:null,
        total:null,
        listLoading:false,
        multipleSelection:[]
      }
    },
    created(){
      this.getList();
    },
    filters:{
      formatStatus(type){
        for(let i=0;i<defaultStatusOptions.length;i++){
          if(type===defaultStatusOptions[i].value){
            return defaultStatusOptions[i].label;
          }
        }
        return '';
      },
      formatDate(time){
        if(time==null||time===''){
          return 'N/A';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd')
      },
      /*formatStatus(endTime){
        let now = new Date().getTime();
        let endDate = new Date(endTime);
        if(endDate>now){
          return '未过期'
        }else{
          return '已过期';
        }
      }*/
    },
    methods:{
      handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery);
      },
      handleSearchList() {
        this.listQuery.pageNum = 1;
        this.getList();
      },
      handleSelectionChange(val){
        this.multipleSelection = val;
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getList();
      },
      handleAdd(){
        this.$router.push({path: '/fitting/addFitting'})
      },
      handleView(index, row) {
        this.$router.push({path: '/fitting/fittingDetail', query: {id: row.id}})
      },
      handleUpdate(index, row) {
        this.$router.push({path: '/fitting/updateFitting', query: {id: row.id}})
      },
      handleDelete(index, row) {
        this.$confirm('是否进行删除操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteFitting(row.id).then(response=>{
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getList();
          });
        })
      },
      getList(){
        this.listLoading=true;
        fetchList(this.listQuery).then(response=>{
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;
        });
      }
    }
  }
</script>
<style scoped>
  .input-width {
    width: 203px;
  }
</style>


