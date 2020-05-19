<template>
  <div id="app">
    <TasksTable/>
  </div>
</template>

<script>
import TasksTable from './components/TasksTable.vue'

export default {
  name: 'App',
  components: {
    TasksTable
  }
}
</script>

<style lang="scss">
@import "vue-select/src/scss/vue-select.scss";

body {
  font-family: Tahoma;
  font-size: 11px;
  line-height: 13px;
  color: #222222;
}
</style>
