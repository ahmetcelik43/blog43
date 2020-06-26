<template>
<div class="error">
  <prism-editor lineNumbers="true" emitEvents="true" :code="code" language="js"></prism-editor>
</div>


</template>

<script lang="ts">
import Vue from 'vue';
import PrismEditor from 'vue-prism-editor'

export default Vue.extend({
  name: 'error',
   components: {
    PrismEditor
  },
 data()
{
   return {code:'function var int string sxssssasdasd'}
 
}
});
</script>

<style scoped>


</style>