<template>
  <div>
    <b-container class="content-area">
      <b-row>
        <h1 style="text-align:center;width:100%;">{{exam.title}}</h1>
      </b-row>
      <b-row>
        <h3 style="text-align:center;width:100%;">Single</h3>
        <b-container>
          <b-row v-for="i in exam.single" :key="i.id">
            <b-container :class="{ 'text-dec':true, 'wrong-answer': !i.bingo }">
              <b-row>
                <mavon-editor :value="i.text" :subfield="false" :defaultOpen="'preview'" :toolbarsFlag="false" class="mk-area" :ref="i.id"
                  @change="UpdateMD(i)"></mavon-editor>
              </b-row>
              <b-row class="sel-row">
                <b-form-group  class="btn-beautify">
                  <b-form-radio-group buttons stacked button-variant="outline-primary" v-model="i.examAnswer" :options="i.options" />
                </b-form-group>
              </b-row>
              <b-row class="check-row" v-if="i.check">
                <b-alert show :variant="i.bingo?'primary':'danger'">Answer: {{i.answer}}</b-alert>
              </b-row>
            </b-container>
          </b-row>
        </b-container>
      </b-row>
      <b-row v-if="this.exam.multi">
        <h3>Multi</h3>
        <b-container>
          <b-row v-for="i in exam.multi" :key="i.id">
            <b-container :class="{ 'text-dec':true, 'wrong-answer': !i.bingo }">
              <b-row>
                <mavon-editor :value="i.text" :subfield="false" :defaultOpen="'preview'" :toolbarsFlag="false" class="mk-area" :ref="i.id"
                  @change="UpdateMD(i)"></mavon-editor>
              </b-row>
              <b-row class="sel-row">
                <b-form-group  class="btn-beautify">
                  <b-form-checkbox-group buttons stacked button-variant="outline-primary" v-model="i.examAnswer" :options="i.options" />
                </b-form-group>
              </b-row>
              <b-row class="check-row" v-if="i.check">
                <b-alert show :variant="i.bingo?'primary':'danger'">Answer: {{i.answer}}</b-alert>
              </b-row>
            </b-container>
          </b-row>
        </b-container>
      </b-row>
    </b-container>
    <div  class="judge-control">
        <b-button @click.prevent="CheckAnswer" size="lg" variant="outline-success">{{check?'重做':'批改'}}</b-button>
        <b-button @click="$router.go(-1)" size="lg" variant="outline-warning">返回</b-button>
    </div>
  </div>
</template>




<script>
  export default {
    data() {
      return {
        exam: {},
        check: false,
      }
    },
    created() {
      this.FetchData()
    },
    methods: {
      FetchData() {
        console.log("Send Get")
        this.axios.get("/api/exam/get/" + this.$route.query.id).then(
          (r) => {
            this.exam = r.data
            this.InitExam()
          })
      },
      InitExam() {
        if (this.exam.single) {
          for (let item of this.exam.single) {
            item.examAnswer = ""
            item.bingo = true;
            item.check = false;
          }
        }
        if (this.exam.multi) {
          for (let item of this.exam.multi) {
            item.examAnswer = []
            item.bingo = true;
            item.check = false;
          }
        }
      },
      UpdateMD(item) {
        if (item.answertype == "single") {
          let ind = this.exam.single.findIndex((x) => {
            return x.id == item.id
          })
          let mk = this.$refs[item.id][0];
          for (let i of this.exam.single[ind].images) {
            mk.$imgUpdateByUrl(i.index, i.data)
          }
        } else {
          let ind = this.exam.multi.findIndex((x) => {
            return x.id == item.id
          })
          let mk = this.$refs[item.id][0];
          for (let i of this.exam.multi[ind].images) {
            mk.$imgUpdateByUrl(i.index, i.data)
          }
        }
      },
      CheckAnswer() {
        if (this.check) {
          this.check = false;
          this.InitExam();
          return;
        }
        if (this.exam.single) {
          for (let item of this.exam.single) {
            item.bingo = (item.answer == item.examAnswer);
            item.check = true;
          }
        }
        if (this.exam.multi) {
          for (let item of this.exam.multi) {
            item.bingo = (item.answer.sort().toString() == item.examAnswer.sort().toString());
  
            item.check = true;
          }
        }
        this.check = true;
      }
    }
  }

</script>

<style scoped>
 .btn-beautify, .btn-beautify *{
   width: 100%
 }
  .sel-container {
    width: 75%;
    margin: auto;
  }

  .img-div {
    margin: 10px;
  }

  .float-control {
    text-align: left;
  }
  .content-area {
    padding-bottom:30px;
  }
  .text-dec {
    margin: 1rem -15px 0;
    padding-top: 30px;
    border: solid #f7f7f9;
  }

  .sel-row {
    margin-top: 30px;
    padding-top: 30px;
    border-top: 2px solid gray;
  }

  .check-row {
    padding-bottom: 30px;
    border-bottom: 2px solid gray;
  }

  h3 {
    text-align: center;
  }

  h4 {
    text-align: center;
    margin: 10px 0;
  }

  .mk-area {
    margin: 0 auto;
    z-index: 0
  }

  .judge-control {
    position: fixed;
    bottom: 20px;
    right: 20px;
  }

  .wrong-answer {
    border: 2px solid red;
  }

</style>
