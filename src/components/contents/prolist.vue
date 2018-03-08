<template>
  <div>
    <b-card no-body>
      <b-tabs pills card v-model="tabIndex">
        <b-tab title="single" active>
          <template>
            <b-container>
              <b-table show-empty stacked="md" :items="single" :fields="fields" :current-page="currentPage" :per-page="perPage">
                <template slot="actions" slot-scope="row">
                  <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
                  <b-button size="sm" @click.stop="row.toggleDetails();">
                    {{ row.detailsShowing ? 'Hide' : 'Show'}} details
                  </b-button>
                  <b-button size="sm" variant="primary" @click="SetUpdate(row.item)" v-b-modal.update>
                    Update
                  </b-button>
                  <b-button size="sm" variant="danger">
                    Delete
                  </b-button>
                  <b-button size="sm" :variant="examselect.single.indexOf(row.item.id) == -1 ? 'outline-warning' : 'warning'" @click="AddSingleAsExam(row.item.id)">
                    作为题目
                  </b-button>
                </template>
                <template slot="row-details" slot-scope="row">
                  <b-card no-body class="mb-1">
                    <b-card-body>
                      <b-container>
                        <b-row class="text-dec">
                          <mavon-editor :ref="row.item.id" :value="row.item.text" :subfield="false" :defaultOpen="'preview'" :toolbarsFlag="false"
                            class="mk-area" @change="UpdateMD(row.item)"></mavon-editor>
                        </b-row>
                        <b-row class="sel-row">
                          <b-form-group>
                            <b-form-checkbox-group buttons stacked button-variant="outline-primary" v-model="row.item.answer">
                              <b-form-checkbox v-for="o in row.item.options" :disabled="row.item.answer.indexOf(o.value) == -1" :value="o.value" :key="o.text+o.value">
                                {{o.text}}
                              </b-form-checkbox>
                            </b-form-checkbox-group>
                          </b-form-group>
                        </b-row>
                      </b-container>
                    </b-card-body>
                  </b-card>
                </template>
              </b-table>
              <b-row>
                <b-col md="6" class="my-1">
                  <b-pagination :total-rows="single.length" :per-page="perPage" v-model="currentPage" class="my-0" />
                </b-col>
                <b-col md="6" class="my-1">
                  <b-form-group horizontal label="Per page" class="mb-0">
                    <b-form-select :options="pageOptions" v-model="perPage" />
                  </b-form-group>
                </b-col>
              </b-row>
            </b-container>
          </template>
        </b-tab>
        <b-tab title="multiple">
          <div role="tablist">
          </div>
        </b-tab>
      </b-tabs>
    </b-card>
    <b-button-group>
      <b-button variant="primary" v-b-modal.create :disabled="!examselect.single.length">
        生成试题
      </b-button>
    </b-button-group>
    <b-modal id="update" title="修改题目" @ok="showSelect" class="modal-index" @shown="UpdateMD(updateitem)">
      <b-form class="form-border" v-if="updateitem != null">
        <b-form-group>
          <mavon-editor :ref="updateitem.id" v-model="updateitem.text" @imgDel="(pos)=>{updateitem.images.splice(updateitem.images.findIndex((x)=>{return x.ind == pos}))}"
            @imgAdd="(pos,file)=>{updateitem.images.push({name:file.name, data:file.miniurl, index:pos}); }" />
        </b-form-group>
        <b-form-group>
          <b-form-textarea placeholder="请为此题提供有效的简介, 如考点, 类型等" :rows="3" :max-rows="6" v-model="updateitem.brief">
          </b-form-textarea>

        </b-form-group>
        <b-form-group label="请选择题目类型">
          <b-form-radio-group id="radios1" v-model="updateitem.type" :options="types" name="radioOpenions">
          </b-form-radio-group>
        </b-form-group>
        <b-form-group>
          <b-list-group>
            <b-list-group-item v-for="(o,inde) in updateitem.options" :key="o.id">
              <b-container>
                <b-row>
                  <b-col>
                    <b-textarea v-model="o.text"></b-textarea>
                  </b-col>
                  <b-col>
                    <b-button variant="danger" @click="()=>DelSingleOpt(ind,inde)">Delete</b-button>
                  </b-col>
                </b-row>
              </b-container>
            </b-list-group-item>
          </b-list-group>
        </b-form-group>
        <b-form-group>
          <b-button variant="primary" @click.prevent="()=>AddSingleOpt(ind)">
            添加一个选项
          </b-button>
        </b-form-group>
        <b-form-group label="请选中正确答案">
          <b-form-radio-group buttons stacked button-variant="outline-primary" v-model="updateitem.answer" :options="updateitem.options"
          />
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
        single: [],
        multi: [],
        tabIndex: 0,
        singleGet: false,
        multiGet: false,
        select: [],
        updateitem: null,
        types: [{
            value: 'C++',
            text: 'C++'
          },
          {
            value: 'C',
            text: 'C'
          },
        ],
        examselect:{
          single : [],
          multi : []
        },
        currentPage: 1,
        perPage: 5,
        pageOptions: [3, 5, 10],
        fields: [{
            key: 'brief',
            sortable: true
          },
          {
            key: 'answer',
            sortable: false
          },
          {
            key: 'type',
            sortable: true
          },
          {
            key: 'actions',
            sortable: false
          }
        ],
        sortBy: null,
        sortDesc: false,
        filter: null,

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
      SetUpdate(x) {
        this.updateitem = x;
      },
      GetMulti() {
        if (this.multiGet) return;
        this.axios.get("/api/multi/get/all").then((response) => {
          this.multi = response.data
          this.multiGet = true;
          console.log(this.multi)
        })
      },
      UpdateMD(item) {
        let ind = this.single.findIndex((x) => {
          return x.id == item.id
        })
        let mk = this.$refs[item.id];
        for (let i of this.single[ind].images) {
          mk.$imgUpdateByUrl(i.index, i.data)
        }

      },
      showSelect() {
        this.$store.commit('getupdate', this.select)
        this.$router.push('/sel/update/pro')
      },
      AddSingleAsExam(id) {
        if (this.examselect.single.indexOf(id) == -1) {
          this.examselect.single.push(id)
        } else {
          this.examselect.single.splice(this.examselect.single.indexOf(id),1);
        }
      },
      SubmitExam() {
        this.axios.all(this.axios.post('/api/exam/create/single', this.examselect.single), this.axios.post('/api/exam/create/multi', this.examselect.multi)).then(
          (response)=>{
            console.log(response);
          }
        )
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

  .mk-area {
    margin: 0 auto;
    z-index: 0
  }

  .modal-index {
    z-index: 1000000
  }

</style>
