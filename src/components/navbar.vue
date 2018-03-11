<template>
<div>
  <b-navbar toggleable="md" type="dark" variant="dark">
    <div class="container-fluid">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="#">Main</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav>
          <b-nav-item to="/sel/selectlist" tag="b-nav-item">选择题试卷</b-nav-item>
          <b-nav-item to="/sel/prolist" tag="b-nav-item">题库</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-if="prolist">
          <b-nav-item to="/sel/create/pro" tag="b-nav-item">添加题目</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </div>
  </b-navbar>

</div>
</template>

<script>

export default {
  props: ['prolist']
}
</script>
