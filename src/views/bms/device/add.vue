<template> 
  <device-edit :isEdit="false"></device-edit>
</template>
<script>
  import DeviceEdit from './components/deviceEdit'
  export default {
    name: 'addDevice',
    components: { DeviceEdit }
  }
</script>
<style scoped>
</style>


