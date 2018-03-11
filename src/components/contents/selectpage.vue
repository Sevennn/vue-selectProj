<template>
  <div id="sel-list">
      <b-list-group>
        <b-list-group-item class="flex-column align-items-start" variant="dark" v-for="item in items" :key="item.id" style="cursor:pointer;" @click="$router.push({path:'/sel/exam', query:{id:item.id}})">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{item.title}}</h5>
          </div>
        </b-list-group-item>
      </b-list-group>
  </div>
</template>


<script>
export default {
  data () {
    return {items : [
    ]}
  },
  created() {
    this.axios.get("/api/exam/get/all").then(
      r=>{
        this.items = r.data
      }
    )
  },
  methods:{
    
  }
}
</script>
