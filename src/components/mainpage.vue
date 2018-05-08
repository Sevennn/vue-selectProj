<template>
<div>
    <navbar/>
    <router-view></router-view>
</div>

</template>


<script>
import navbar from './navbar'
import bus from './briges/bus.js'
export default {
  components : {
      navbar,
  },
  methods : {

  },
  created() {

  }
}
</script>
