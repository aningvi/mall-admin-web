<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="maintain"
             :rules="rules"
             ref="maintainFrom"
             label-width="150px"
             size="small">
      <el-form-item label="设备列表：">
        <el-select v-model="maintain.deviceId">
          <el-option
            v-for="type in deviceList"
            :key="type.id"
            :label="type.deviceName"
            :value="type.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="维修状态">
        <el-radio-group v-model="maintain.status" :disabled="isEdit">
          <el-radio :label="0">现场修复</el-radio>
          <el-radio :label="1">未修复</el-radio>
          <el-radio :label="2">后期修复</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="紧急程度">
        <el-radio-group v-model="maintain.level">
          <el-radio :label="0">一般</el-radio>
          <el-radio :label="1">加急</el-radio>
          <el-radio :label="2">特急</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="故障描述：" prop="description">
        <el-input v-model="maintain.description" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="维修单位：" prop="unit">
        <el-input v-model="maintain.unit" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="维修联系方式：" prop="telephone">
        <el-input v-model="maintain.telephone" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="报修日期：">
        <el-date-picker
          v-model="maintain.submitTime"
          type="date"
          placeholder="请选择时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('maintainFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('maintainFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createMaintain,getMaintain,updateMaintain} from '@/api/maintain';
  import {getList} from "@/api/device";

  const defaultMaintain = {
    deviceId: null,
    status: 0,
    level: 0,
    description: null,
    unit: null,
    telephone: null,
    submitTime: null
  };
  const defaultStatusOptions=[
    {
      label: '现场修复',
      value: 0
    },
    {
      label: '未修复',
      value: 1
    },
    {
      label: '后期修复',
      value: 2
    }
  ];
  const defaultLevelOptions=[
    {
      label: '一般',
      value: 0
    },
    {
      label: '加急',
      value: 1
    },
    {
      label: '特急',
      value: 2
    }
  ];
  export default {
    name: 'MaintainEdit',
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        maintain: Object.assign({}, defaultMaintain),
        levelOptions: Object.assign({}, defaultLevelOptions),
        statusOptions: Object.assign({}, defaultStatusOptions),
        deviceList:[],
        rules: {
          description: [
            {required: true, message: '请输入故障描述', trigger: 'blur'}
          ],
          unit: [
            {required: true, message: '请输入维修单位', trigger: 'blur'}
          ],
          telephone: [
            {required: true, message: '请输入维修联系方式', trigger: 'blur'}
          ]
        },
      }
    },
    created(){
      getList().then(response=>{
        this.deviceList = response.data
        if(this.deviceList.length > 0) {
          this.maintain.deviceId = this.deviceList[0].id
        }
      })
      if(this.isEdit){
        getMaintain(this.$route.query.id).then(response=>{
          this.maintain=response.data;
        });
      }
    },
    methods:{
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if(this.isEdit){
                updateMaintain(this.$route.query.id,this.maintain).then(response=>{
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              }else{
                createMaintain(this.maintain).then(response=>{
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '提交成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              }
            });
          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration:1000
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.maintain = Object.assign({},defaultMaintain);
      }
    }
  }
</script>
<style scoped>
  .input-width {
    width: 60%;
  }
</style>


