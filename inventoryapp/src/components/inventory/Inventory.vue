<template>
  <div>

    <div class='store'>
      <h3 v-if='store == "POP"'>Purple Orchid Panorama</h3>
      <h3 v-if='store == "POM"'>Purple Orchid Morningside</h3>
      <h3 v-if='store == "POH"'>Purple Orchid Hollywood</h3>
      <h3 v-if='store == "POD"'>Purple Orchid Downtown</h3>
    </div>

    <h1 class='item' v-text='countingItem'></h1>

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
        <appButton buttonType='button' label='< PREV. ITEM' v-on:buttonActivated='previousItem'/>
        <appButton buttonType='button' label='NEXT ITEM >' v-on:buttonActivated='nextItem'/>

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

      showFirstItem() {
        while (this.inventoryItems[this.i].store != this.store && this.i < this.inventoryItems.length) {
          this.i++;
          alert(this.i);
        }
        if (this.i < this.inventoryItems.length) {                       // saiu pq encontrou um item; evitar referencia a indice alem do array
          this.countingItem = this.inventoryItems[this.i].item;
        }
        else {
          this.i = this.inventoryItems.length - 1;                       // saiu pq chegou ao final e avancou alem do final; volta pro final
          alert(this.i);
        }
      },

      nextItem() {
        this.i++;       
        alert(this.i);                                                 // incrementa 1
        if (this.i < this.inventoryItems.length) {                       // verificar se nao estava no final
          while (this.i < this.inventoryItems.length && this.inventoryItems[this.i].store != this.store) {
            this.i++;
            alert(this.i);
          }
          if (this.i < this.inventoryItems.length) {                     // saiu pq encontrou um item; evitar referencia a indice alem do array
            alert('testando2');
            this.countingItem = this.inventoryItems[this.i].item;
          }
          else {
            alert('testando');
            this.i--;                     // saiu pq chegou ao final e avancou alem do final; volta pro final
            alert(this.i);
          }
        }
        else {
          this.i--;                       // ja estava no final e avancou alem do final; volta pro final
          alert(this.i);
        }
      },

      previousItem() {
        this.i--;                                                        // decrementa 1
        alert(this.i);
        if (this.i >= 0) {                                               // verificar se nao estava no comeco
          while (this.i >= 0 && this.inventoryItems[this.i].store != this.store) {
            this.i--;
            alert(this.i);
          }
          if (this.i >= 0) {                                             // saiu pq encontrou um item; evitar referencia a indice negativo
            this.countingItem = this.inventoryItems[this.i].item;
          }
          else {
            this.i++;                     // saiu pq chegou ao inicio e avancou alem do inicio; volta pro inicio
            alert(this.i);
          }
        }
        else {
          this.i++;                       // ja estava no inicio e avancou alem do inicio; volta pro inicio
          alert(this.i);
        }
      }

    },

    data() {

      return {
        inventoryItems: [],
        countingItem: '',
        i: 0,
        forward: true,
        backward: false
      };

    },

    props: {

      store: {
        type: String,
        default: '',
      },

    },

    created() {
      this.$http.get('http://localhost:3000/inventory/')
        .then(res => res.json())
        .then(res2 => this.inventoryItems = res2, err => console.log(err));
    },

    watch: {
      store(newValue) {
        this.showFirstItem();
      }
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
