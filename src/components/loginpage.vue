<template>
  <div class="custom-form-control">
      <b-container fluid class="container">
        <b-row class="form-row">
        <b-form-input v-model="form.username"
                  type="text"
                  placeholder="Enter your username"></b-form-input>

        </b-row>
        <b-row  class="form-row">
        <b-button class="custom-btn" variant="primary" @click="()=>onSubmit()">Submit</b-button>
        </b-row>
      </b-container>
  </div>
</template>

<style scoped>
.custom-form-control {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
}
.custom-btn {
    width: 100%;
}
.container {
    background-color: #ffffff;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    max-width: 300px;
}
.form-row {
    margin-bottom: 15px;
}
.form-row:nth-of-type(1) {
    margin-top: 20px;
}
</style>

<script>
export default {
  data() {
      return {
          form : {
              username : null,
          }
      }
  },
  methods : {
    onSubmit () {
        console.log(this.form,"hhh")
        this.axios.post('/api/user/login', this.form).then(r=>{
            this.$store.commit("SetTokenRole", r.data);
            console.log(this.$store.state.role,this.$store.state.token)
            this.$cookies.set('token', r.data.token)
            this.$cookies.set('role',r.data.role)
            this.$router.push({path:'/sel/selectlist'})
      }).catch(err=>{
          alert(err)
      });
    },
  }
}
</script>


