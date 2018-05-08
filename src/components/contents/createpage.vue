<template>
  <div>
    <b-container class="margin-ctr">
      <b-form class="form-border" v-for="(i,ind) in pros.Single" :key="i.id">
        <label class="sel-type">Single</label>
        <b-form-group>
          <mavon-editor :ref="'v'+i.id" v-model="i.text" @imgDel="(pos)=>{i.images.splice(i.images.findIndex((x)=>{return x.ind == pos}))}" @imgAdd="(pos,file)=>{i.images.push({name:file.name, data:file.miniurl, index:pos}); }"/>
        </b-form-group>
        <b-form-group>
          <b-form-textarea placeholder="请为此题提供有效的简介, 如考点, 类型等" :rows="3" :max-rows="6" v-model="i.brief">
          </b-form-textarea>

        </b-form-group>
        <b-form-group label="请选择题目类型">
          <b-form-radio-group v-model="i.type" :options="types" name="radioOpenions">
          </b-form-radio-group>
        </b-form-group>
        <b-form-group>
          <b-list-group>
            <b-list-group-item v-for="(o,inde) in pros.Single[ind].options" :key="o.id">
              <b-container>
                <b-row>
                  <b-col>
                    <b-textarea v-model="o.text" @input="o.value=o.text"></b-textarea>
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
          <b-button variant="primary"  @click.prevent="()=>AddSingleOpt(ind)">
            添加一个选项
          </b-button>
        </b-form-group>
        <b-form-group label="请选中正确答案">
          <b-form-radio-group buttons stacked button-variant="outline-primary" v-model="pros.Single[ind].answer" :options="pros.Single[ind].options" />
        </b-form-group>
        <b-form-group>
          <b-button variant="danger" @click="()=>DelSinglePro(ind)">
            删除此题
          </b-button>
        </b-form-group>
      </b-form>
      <b-form class="form-border" v-for="(i,ind) in pros.Multi" :key="i.id">
        <label class="sel-type">Multi</label>
        <b-form-group>
          <mavon-editor :ref="'v'+i.id" v-model="i.text" @imgDel="(pos)=>{i.images.splice(i.images.findIndex((x)=>{return x.ind == pos}))}" @imgAdd="(pos,file)=>{i.images.push({name:file.name, data:file.miniurl, index:pos}); }"/>
        </b-form-group>
        <b-form-group>
          <b-form-textarea placeholder="请为此题提供有效的简介, 如考点, 类型等" :rows="3" :max-rows="6" v-model="i.brief">
          </b-form-textarea>

        </b-form-group>
        <b-form-group label="请选择题目类型">
          <b-form-radio-group  v-model="i.type" :options="types" name="radioOpenions">
          </b-form-radio-group>
        </b-form-group>
        <b-form-group>
          <b-list-group>
            <b-list-group-item v-for="(o,inde) in pros.Multi[ind].options" :key="o.id">
              <b-container>
                <b-row>
                  <b-col>
                    <b-textarea v-model="o.text" @input="o.value=o.text"></b-textarea>
                  </b-col>
                  <b-col>
                    <b-button variant="danger" @click="()=>DelMultiOpt(ind,inde)">Delete</b-button> 
                  </b-col>
                </b-row>
              </b-container>
            </b-list-group-item>
          </b-list-group>
       </b-form-group>
        <b-form-group>
          <b-button variant="primary"  @click.prevent="()=>AddMultiOpt(ind)">
            添加一个选项
          </b-button>
        </b-form-group>
        <b-form-group label="请选中正确答案">
          <b-form-checkbox-group buttons stacked button-variant="outline-primary" v-model="pros.Multi[ind].answer" :options="pros.Multi[ind].options" />
        </b-form-group>
        <b-form-group>
          <b-button variant="danger" @click="()=>DelMultiPro(ind)">
            删除此题
          </b-button>
        </b-form-group>
      </b-form>

      <b-button-group class="margin-ctr">
        <b-button variant="primary" @click.prevent="()=>AddSinglePro()">增加一道单选</b-button>
        <b-button variant="primary" @click.prevent="()=>AddMultiPro()">增加一道多选</b-button>
        <b-button variant="success" @click="()=>UploadPros()">提交</b-button>
      </b-button-group>
    </b-container>
  </div>
</template>


<script>

  export default {
    data() {
      return {
        pros: {
          Single: [],
          Multi: []
        },
        count: 0,
        types: [
          { value: 'C++', text: 'C++' },
          { value: 'C', text: 'C' },
        ]
      }
    },

    methods: {
      AddSinglePro() {
        this.pros.Single.push({
          text: ``,
          options: [],
          answer: ``,
          brief: ``,
          id: this.count++,
          type: ``,
          images: [],
          answertype:`single`
        })
      },
      DelSinglePro(x) {
        this.pros.Single.splice(x, 1);
      },
      AddSingleOpt(ind) {
        this.pros.Single[ind].options.push({text:``, value:``,id: this.count++});
      },
      DelSingleOpt(ind, x) {
        this.pros.Single[ind].options.splice(x, 1);
      },
      AddMultiPro() {
        this.pros.Multi.push({
          text: ``,
          options: [],
          answer: [],
          brief: ``,
          id: this.count++,
          type: ``,
          images: [],
          answertype:`multi`
        })
      },
      DelMultiPro(x) {
        this.pros.Multi.splice(x, 1);
      },
      AddMultiOpt(ind) {
        this.pros.Multi[ind].options.push({text:``, value: ``, id:this.count++});
      },
      DelMultiOpt(ind, x) {
        this.pros.Multi[ind].options.splice(x, 1);
      },
      UploadSingle() {
        console.log(this.pros.Single)
        return this.axios.post("/api/create/single", this.pros.Single)
      },
      UploadMulti() {
        return this.axios.post("/api/create/multi", this.pros.Multi)
      },
      UploadPros() {
        this.axios.all(
          [this.UploadSingle(),this.UploadMulti()]
        ).then(
          (response)=>{
            console.log(response)
            alert("Success!")
            this.$router.push({path:'/sel/selectlist'})
          }
        ).catch(e=>alert(e))
      },
      $imgAdd(pos, $file) {
        return pos
      },
      
    }
  }

</script>


<style scoped>
  .margin-ctr {
    margin-top: 1em;
  }

  .form-border {
    border: solid #f7f7f9;
  }
  .sel-type {
    display: inline-block;
    font-size: 2em;
    text-align: center;
    width:100%
  }

</style>
