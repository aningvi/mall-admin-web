<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="fitting"
             :rules="rules"
             ref="fittingFrom"
             label-width="150px"
             size="small">
      <el-form-item label="配件名称：" prop="fittingName">
        <el-input v-model="fitting.fittingName" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="配件型号：" prop="fittingModel">
        <el-input v-model="fitting.fittingModel" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="配件SN：" prop="fittingSn">
        <el-input v-model="fitting.fittingSn" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="配件状态：">
        <el-select v-model="fitting.status">
          <el-option
            v-for="type in statusOptions"
            :key="type.value"
            :label="type.label"
            :value="type.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('fittingFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('fittingFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createFitting,getFitting,updateFitting} from '@/api/fitting';
  const defaultFitting = {
    fittingName: null,
    fittingModel: null,
    fittingSn: null,
    status: 0
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
    name: 'FittingEdit',
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        fitting: Object.assign({}, defaultFitting),
        statusOptions: Object.assign({}, defaultStatusOptions),
        rules: {
          fittingName: [
            {required: true, message: '请输入配件名称', trigger: 'blur'}
          ],
          fittingModel: [
            {required: true, message: '请输入配件型号', trigger: 'blur'}
          ],
          fittingSn: [
            {required: true, message: '请输入配件SN', trigger: 'blur'}
          ]
        },
      }
    },
    created(){
      if(this.isEdit){
        getFitting(this.$route.query.id).then(response=>{
          this.fitting=response.data;
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
                updateFitting(this.$route.query.id,this.device).then(response=>{
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              }else{
                createFitting(this.fitting).then(response=>{
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
        this.fitting = Object.assign({},defaultFitting);
      }
    }
  }
</script>
<style scoped>
  .input-width {
    width: 60%;
  }
</style>


