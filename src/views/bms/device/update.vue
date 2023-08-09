<template> 
  <device-edit :isEdit="true"></device-edit>
</template>
<script>
  import DeviceEdit from './components/deviceEdit'
  export default {
    name: 'updateDevice',
    components: { DeviceEdit }
  }
</script>
<style scoped>
</style>


