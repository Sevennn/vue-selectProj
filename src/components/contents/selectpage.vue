<template>
  <div>
    <h3>Title</h3>
    <div class="sel-container">
      <h4>Single</h4>
      <b-list-group>
        <b-list-group-item>
          <b-container>
            <b-row>
              <b-img src="https://lorempixel.com/300/150/" center fluid blank-color="#777" alt="img" class="img-div" />
              <!-- <b-img src="https://lorempixel.com/300/150/" center fluid blank-color="#777" alt="img" class="img-div"/> -->
            </b-row>
            <b-row class="text-dec">
              <b-form-textarea plaintext no-resize>This is some text.\nIt is read only and doesn't look like an input.</b-form-textarea>
            </b-row>
            <b-row class="sel-row">
              <b-form-group label="Button style radios">
                <b-form-radio-group buttons stacked button-variant="outline-primary" v-model="selected" :options="options" />
              </b-form-group>
            </b-row>
          </b-container>
        </b-list-group-item>
      </b-list-group>
      <h4>Multiple</h4>
      <b-list-group>
        <b-list-group-item>
          <b-container>
            <b-row>
              <b-img src="https://lorempixel.com/300/150/" center fluid blank-color="#777" alt="img" class="img-div" />
              <!-- <b-img src="https://lorempixel.com/300/150/" center fluid blank-color="#777" alt="img" class="img-div"/> -->
            </b-row>
            <b-row class="text-dec">
              <b-form-textarea plaintext no-resize>This is some text.\nIt is read only and doesn't look like an input.</b-form-textarea>
            </b-row>
            <b-row class="sel-row">
              <b-form-group label="Stacked (vertical) button style checkboxes">
                <b-form-checkbox-group buttons button-variant="outline-primary" v-model="selected" stacked :options="options">
                </b-form-checkbox-group>
              </b-form-group>
            </b-row>
          </b-container>
        </b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        input: `# Hello`,
        options: [{
            text: 'Radio 1asdasasfaf',
            value: 'radio1'
          },
          {
            text: 'Radio 2',
            value: 'radio2'
          },
          {
            text: 'Radio 3',
            value: 'radio3'
          },
          {
            text: 'Radio 4',
            value: 'radio4'
          }
        ]
      }
    },
    computed: {
      compiledMarkdown: function () {
        return marked(this.input, {
          sanitize: true
        })
      }
    },
    methods: {
      update: _.debounce(function (e) {
        this.input = e.target.value
      }, 300)
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
