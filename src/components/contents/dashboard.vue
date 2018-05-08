<template>
  <b-container>
      <b-list-group>
        <b-list-group-item href="#" class="flex-column align-items-start" v-for="item in classlist" :key="item.id" @click.prevent="enterClass(item.id)" >
            <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{item.name}}</h5>
            <p>教师:{{item.teacher}}</p>
            </div>
            <p>角色:{{item.role}}</p>
            <small>总人数: {{item.total}}</small>
        </b-list-group-item>
      </b-list-group>
  </b-container>
</template>


<script>
export default {
  data() {
      return {
          classlist: [
              {
                  name: '教务一班',
                  total: '56',
                  teacher: '大法师',
                  role: '学生',
                  id: '666'
              }
          ]
      }
  },
  methods : {
      enterClass(id) {
          
      }
  }
}
</script>
