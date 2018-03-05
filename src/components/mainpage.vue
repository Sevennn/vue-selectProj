<template>
<div>
    <navbar :prolist="prolist"/>
    <router-view></router-view>
</div>

</template>


<script>
import navbar from './navbar'
import bus from './briges/bus.js'
export default {
  data() {
      return {
          prolist: false
      }
  },
  components : {
      navbar,
  },
  methods : {
      inAndoutProlist(flag) {
          this.prolist=flag;
          console.log(flag);
      },
  },
  created() {
      bus.$on('Prolist', this.inAndoutProlist);
  }
}
</script>
