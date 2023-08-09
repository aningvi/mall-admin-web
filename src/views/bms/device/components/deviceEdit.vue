<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="device"
             :rules="rules"
             ref="deviceFrom"
             label-width="150px"
             size="small">
      <el-form-item label="设备名称：" prop="deviceName">
        <el-input v-model="device.deviceName" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="设备SN：" prop="deviceSn">
        <el-input v-model="device.deviceSn" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="设备型号：" prop="model">
        <el-input v-model="device.model" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="设备位置：" prop="deviceLocation">
        <el-input v-model="device.deviceLocation" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="设备状态：">
        <el-select v-model="device.status">
          <el-option
            v-for="type in typeOptions"
            :key="type.value"
            :label="type.label"
            :value="type.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('deviceFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('deviceFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createDevice,getDevice,updateDevice} from '@/api/device';
  const defaultDevice = {
    deviceName: null,
    deviceSn: null,
    deviceLocation: null,
    model: null,
    status: 0
  };
  const defaultTypeOptions=[
    {
      label: '禁用',
      value: 0
    },
    {
      label: '可用',
      value: 1
    },
    {
      label: '报修',
      value: 2
    },
    {
      label: '未报修',
      value: 3
    }
  ];
  export default {
    name: 'DeviceEdit',
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        device: Object.assign({}, defaultDevice),
        typeOptions: Object.assign({}, defaultTypeOptions),
        rules: {
          deviceName: [
            {required: true, message: '请输入设备名称', trigger: 'blur'}
          ],
          deviceSn: [
            {required: true, message: '请输入设备SN', trigger: 'blur'}
          ],
          deviceLocation: [
            {required: true, message: '请输入设备位置', trigger: 'blur'}
          ],
          model: [
            {required: true, message: '请输入设备型号', trigger: 'blur'}
          ]
        },
      }
    },
    created(){
      if(this.isEdit){
        getDevice(this.$route.query.id).then(response=>{
          this.device=response.data;
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
                updateDevice(this.$route.query.id,this.device).then(response=>{
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              }else{
                createDevice(this.device).then(response=>{
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
        this.device = Object.assign({},defaultDevice);
      }
    }
  }
</script>
<style scoped>
  .input-width {
    width: 60%;
  }
</style>


