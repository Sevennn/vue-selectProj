<template>
  <div>
    <b-card no-body>
      <b-tabs pills card v-model="tabIndex">
        <b-tab title="single" active>
          <div role="tablist">
          <b-list-group>
            <b-list-item  v-for="item in single" :key="item.id">
                <b-btn block href="#" v-b-toggle="item.id" variant="info">{{item.brief}}</b-btn>

              <b-collapse :id="item.id" accordion="my-accordion" role="tabpanel" @show="UpdateMD(item.id)">
                  <b-container>
                    <b-row class="text-dec">
                      <mavon-editor :ref="item.id" :value="item.text"/>
                    </b-row>
                    <b-row class="sel-row">
                      <b-form-group>
                        <b-form-radio-group buttons stacked button-variant="outline-primary" v-model="item.answer">
                          <b-form-radio v-for="o in item.options" :disabled="o.value != item.answer" :value="o.value" :key="o.text+o.value">
                            {{o.text}}
                          </b-form-radio>
                        </b-form-radio-group>
                      </b-form-group>
                    </b-row>
                  </b-container>
              </b-collapse>
            </b-list-item>
            </b-list-group>
          </div>
        </b-tab>
        <b-tab title="multiple">
          <div role="tablist">
            <b-card no-body class="mb-1" v-for="item in multi" :key="item.id">
              <b-card-header header-tag="header" class="p-1" role="tab">
                <b-btn block href="#" v-b-toggle="item.id" variant="info">{{item.brief}}</b-btn>
              </b-card-header>
              <b-collapse :id="item.id" accordion="my-accordion" role="tabpanel">
                <b-card-body>
                  <b-container>
                    <b-row class="text-dec">
                      <b-form-textarea plaintext no-resize :value="item.text" readonly></b-form-textarea>
                    </b-row>
                    <b-row class="sel-row">
                      <b-form-group>
                        <b-form-checkbox-group buttons stacked button-variant="outline-primary" v-model="item.answer">
                          <b-form-checkbox v-for="o in item.options" :disabled="item.answer.indexOf(o.value) == -1" :value="o.value" :key="o.text+o.value">
                            {{o.text}}
                          </b-form-checkbox>
                        </b-form-checkbox-group>
                      </b-form-group>
                    </b-row>
                  </b-container>
                </b-card-body>
              </b-collapse>
            </b-card>
          </div>
        </b-tab>
      </b-tabs>
    </b-card>
    <b-button-group>
    <b-button variant="primary">
      生成试题
    </b-button>
    <b-button variant="primary" v-b-modal.update>
      修改题目
    </b-button>
    </b-button-group>
    <b-modal id="update" title="选择题目" @ok="showSelect">
      <b-form>
      <b-form-group label="Stacked  checkboxes">
        <b-form-checkbox-group buttons
                             button-variant='outline-success'
                             stacked
                             v-model="select"
                             size="lg"
                             style="width:100%"
                             >
          <b-form-checkbox v-for="item in (tabIndex == 0? single : multi)" :value="item.id" style="width:100%">{{item.brief}}</b-form-checkbox> 
        </b-form-checkbox-group>
      </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
  import bus from '../briges/bus.js'
  export default {
    data() {
      return {
        single: [{id : 1,brief:'aaa'},{id : 2,brief:'aaa'},{id : 3,brief:'aaa'}],
        multi: [],
        tabIndex: 0,
        singleGet: false,
        multiGet: false,
        select: []
      }
    },
    beforeRouteEnter(to, from, next) {
      // 在渲染该组件的对应路由被 confirm 前调用
      // 不！能！获取组件实例 `this`
      // 因为当守卫执行前，组件实例还没被创建
      bus.$emit('Prolist', true);
      next();
    },
    beforeRouteLeave(to, from, next) {
      // 导航离开该组件的对应路由时调用
      // 可以访问组件实例 `this`
      bus.$emit('Prolist', false);
      next();
    },
    created() {
      bus.$emit('Prolist', true);
      this.GetSingle();
    },
    methods: {
      GetSingle() {
        if (this.singleGet) return;
        this.axios.get("/api/single/get/all").then((response) => {
          this.single = response.data;
          this.singleGet = true;
        })
      },
      GetMulti() {
        if (this.multiGet) return;
        this.axios.get("/api/multi/get/all").then((response) => {
          this.multi = response.data
          this.multiGet = true;
          console.log(this.multi)
        })
      },
      UpdateMD(key) {
        console.log(this.$refs)
          let ind = this.single.findIndex((x) => {
            return x.id == key
          })
          for (let i of this.single[ind].images) {
            this.$refs[key][0].$imgUpdateByUrl(i.index, i.data)
          }
        
      },
      showSelect(){
        console.log(this.select)
      }
    },
    watch: {
      tabIndex(val, oldval) {
        if (val == 0) this.GetSingle();
        else this.GetMulti();
      }
    }
  }

</script>

<style scoped>
  .sel-container {
    width: 75%;
    margin: auto;
  }

  .img-div {
    margin: 10px;
  }

  .text-dec {
    margin: 1rem -15px 0;
    padding: 1.5rem;
    border: solid #f7f7f9;
  }

  h3 {
    text-align: center;
  }

  .sel-row {
    margin: 10px 0;
  }

  h4 {
    text-align: center;
    margin: 10px 0;
  }

</style>
