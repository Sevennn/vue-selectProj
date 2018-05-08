<template>
<div>
    <navbar/>
    <router-view></router-view>
</div>

</template>


<script>
import navbar from './navbar'
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
