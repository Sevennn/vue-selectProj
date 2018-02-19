<template>
  <div id="app">
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import navbar from '@/components/navbar'
export default {
  name: 'app',
  components: {
    navbar,
  }
}
</script>

<style>
#app {

}
</style>
