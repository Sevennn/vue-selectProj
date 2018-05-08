<template>
  <div id="sel-list">
      <b-list-group v-if="items.length">
        <b-list-group-item class="flex-column align-items-start" variant="dark" v-for="item in items" :key="item.id" style="cursor:pointer;" @click="$router.push({path:'/exam', query:{id:item.id}})">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{item.title}}</h5>
          </div>
        </b-list-group-item>
      </b-list-group>
      <b-alert variant="danger"
            
             dismissible
             :show="alertshow"
             @dismissed="alertshow=false">
      Serer unavailable, please try again later!
    </b-alert>
    <b-alert variant="danger"
             dismissible
             :show="datashow"
             @dismissed="datashow=false">
      没有题目哦
    </b-alert>
  </div>
</template>


<script>
export default {
  data () {
    return {
      items : [],
      alertshow: false,
      datashow: false
      }
  },
  created() {
    this.axios.get("/api/exam/get/all").then(
      r=>{
        this.items = r.data.length > 0? r.data : [];
        this.datashow = this.items.length > 0 ? false : true;
      }
    ).catch(()=>{this.alertshow = true;});
  },
  methods:{
    
  }
}
</script>
