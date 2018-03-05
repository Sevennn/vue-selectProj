<template>
  <div id="sel-list">
      <b-list-group>
        <b-list-group-item class="flex-column align-items-start" variant="dark" v-for="item in items" :href="item.href" :key="item.id">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{item.title}}</h5>
            <small>{{item.since}}</small>
          </div>
          <p class="mb-1">
            {{item.intro}}
          </p>
        </b-list-group-item>
      </b-list-group>
  </div>
</template>


<script>
export default {
  data () {
    return {items : [
      {href:"/123456", id:1, title: "hhh", intro:"fff", since:"2018-2-8"},
      {href:"#", id:2, title: "hhh", intro:"fff", since:"2018-2-8"},
    ]}
  }
}
</script>
