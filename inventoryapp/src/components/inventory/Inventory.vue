<template>
  <div>

    <div class='store'>
      <h3 v-if='store == "POP"'>Purple Orchid Panorama</h3>
      <h3 v-if='store == "POM"'>Purple Orchid Morningside</h3>
      <h3 v-if='store == "POH"'>Purple Orchid Hollywood</h3>
      <h3 v-if='store == "POD"'>Purple Orchid Downtown</h3>
    </div>

    <h1 class='item' v-text='inventoryItems[1].item'></h1>

    <form>
      <div class='fields'>
        <label for='qty'>QUANTITY</label>
        <input id='qty' autocomplete='off'>
      </div>

      <div class='fields'>
        <label for='toorder'>TO ORDER</label>
        <input id='toorder' autocomplete='off'>
      </div>

      <div class='fields'>
        <label for='obs'>OBS.:</label>
        <textarea id='obs' autocomplete='off'></textarea>
      </div>

      <div class='centralized'>
        <appButton buttonType='button' label='< PREV. ITEM'/>
        <appButton buttonType='button' label='NEXT ITEM >'/>

      </div>

    </form>

    <appButton 
      buttonType='button' 
      label='RE-START' 
      v-on:buttonActivated='restart'
      v-bind:confirmAction='true'
      buttonCSS='attention'
      />

  </div>
</template>


<script>

  import Button from '../shared/button/Button.vue';

  export default {

    components: {
      'appButton': Button
    },

    methods: {

      restart() {
        window.location = '/';
      },

    },

    data() {

      return {
        inventoryItems: [],
      };

    },

    props: {

      store: {
        type: String,
        default: '',
      }

    },

    created() {
      this.$http.get('http://localhost:3000/inventory/')
        .then(res => res.json())
        .then(res2 => this.inventoryItems = res2, err => console.log(err));
    }

  }

</script>


<style scoped>

  .store {
    background-color: rgb(100,52,116);
    font-family: 'Arial Black', Helvetica, sans-serif;
    color: white;
    text-align: center;
  }

  .item {
    margin-top: 50px;
    margin-bottom: 50px;
    background-color: white;
    font-family: 'Arial', Helvetica, sans-serif;
    text-align: center;
  }

  .centralized {
    text-align: center;
  }

  .fields {
    font-family: 'Arial', Helvetica, sans-serif;
    font-size: 1.2em;
    margin-bottom: 20px;
    text-align: center;
  }

  .fields label {
    display: block;
    font-weight: bold;
  }

 .fields label + input, .fields textarea {
    width: 50%;
    font-size: inherit;
    border-radius: 5px
  }

</style>
