<template>
  <div>

    <div class='store'>
      <h3 v-if='store == "POP"'>Purple Orchid Panorama</h3>
      <h3 v-if='store == "POM"'>Purple Orchid Morningside</h3>
      <h3 v-if='store == "POH"'>Purple Orchid Hollywood</h3>
      <h3 v-if='store == "POD"'>Purple Orchid Downtown</h3>
    </div>

    <h1 class='item' v-text='shownItem.item'></h1>
    
    <ValidationObserver v-slot='{ invalid }'>
      <form>
        <ValidationProvider name='QUANTITY' rules='required|numeric' v-slot='{ errors }'>
          <div class='fields'>
            <label for='quantity'>QUANTITY</label>
            <input id='quantity' autocomplete='off' v-model='shownItem.quantity'><br>
            <span class='error'>{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <ValidationProvider name='TO ORDER' rules='required|numeric' v-slot='{ errors }'>
          <div class='fields'>
            <label for='toorder'>TO ORDER</label>
            <input id='toorder' autocomplete='off' v-model='shownItem.toorder'><br>
            <span class='error'>{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <div class='fields'>
          <label for='obs'>OBS.:</label>
          <textarea id='obs' autocomplete='off' v-model='shownItem.obs'></textarea>
        </div>

        <div class='centralized'>
          <appButton buttonType='button' label='< PREV. ITEM' v-on:buttonActivated='previousItem' v-bind:buttonDisabled='invalid'/>
          <appButton buttonType='button' label='NEXT ITEM >' v-on:buttonActivated='nextItem' v-bind:buttonDisabled='invalid'/>
        </div>

      </form>
    </ValidationObserver>

    <div class='restartsavebuttons'>
      <appButton 
        buttonType='button' 
        label='RE-START'
        v-show='true'
        v-on:buttonActivated='restart'
        v-bind:confirmAction='true'
        buttonCSS='attention'
      />

      <appButton 
        buttonType='button' 
        label='SAVE'
        v-show='this.inventoryItemIndex == this.inventoryItems.length - 1'                  
        v-on:buttonActivated='save'
        v-bind:confirmAction='true'
        buttonCSS='attention'
      />
    </div>

  </div>
</template>


<script>

  import Button from '../shared/button/Button.vue';
  import moment from 'moment';

  export default {
    
    data() {

      return {
        inventoryItems: [],
        inventoryItemIndex: 0,
        shownItem: {
          item: "",
          quantity: "",
          toorder: "",
          obs: ""
        }
      };

    },

    props: {

      store: {
        type: String,
        default: '',
      },

    },

    components: {
      'appButton': Button
    },

    methods: {

      restart() {
        window.location = '/';
      },

      showItem() {
        if (this.inventoryItems.length > 0) {
          this.shownItem.item = this.inventoryItems[this.inventoryItemIndex].item;
          this.shownItem.quantity = this.inventoryItems[this.inventoryItemIndex].iteminventory;
          this.shownItem.toorder = this.inventoryItems[this.inventoryItemIndex].toorder;
          this.shownItem.obs = this.inventoryItems[this.inventoryItemIndex].obs;
        }
      },

      nextItem() {
        this.inventoryItems[this.inventoryItemIndex].item = this.shownItem.item;
        this.inventoryItems[this.inventoryItemIndex].iteminventory = this.shownItem.quantity;
        this.inventoryItems[this.inventoryItemIndex].toorder = this.shownItem.toorder;
        this.inventoryItems[this.inventoryItemIndex].obs = this.shownItem.obs;

        if (this.inventoryItemIndex < this.inventoryItems.length - 1) {
          this.inventoryItemIndex++;
          this.showItem();   
        }
      },

      previousItem() {
        this.inventoryItems[this.inventoryItemIndex].item = this.shownItem.item;
        this.inventoryItems[this.inventoryItemIndex].iteminventory = this.shownItem.quantity;
        this.inventoryItems[this.inventoryItemIndex].toorder = this.shownItem.toorder;
        this.inventoryItems[this.inventoryItemIndex].obs = this.shownItem.obs;

        if (this.inventoryItemIndex > 0) {
          this.inventoryItemIndex--;
          this.showItem();
        }
      },

      save() {
        for (let i = 0; i < this.inventoryItems.length; i++) {
          this.inventoryItems[i].iteminventory = parseFloat(this.inventoryItems[i].iteminventory);
          this.inventoryItems[i].toorder = parseFloat(this.inventoryItems[i].toorder);
          this.inventoryItems[i].inventorydate = moment().format('YYYY-MM-DD HH:mm:ss');

          this.$http.patch('http://localhost:3000/inventory/' + this.inventoryItems[i].id, {iteminventory: this.inventoryItems[i].iteminventory, toorder: this.inventoryItems[i].toorder, obs: this.inventoryItems[i].obs, inventorydate: this.inventoryItems[i].inventorydate})
            .then(res => console.log(res.body));
        }
      }

    },

    created() {
      this.$http.get('http://localhost:3000/inventory/')
        .then(res => res.json())
        .then(res2 => this.inventoryItems = res2, err => console.log(err));
      },

    watch: {
      store(newValue) {
        let i = 0;
        while (i < this.inventoryItems.length) {
          if (this.inventoryItems[i].store != newValue) {
            this.inventoryItems.splice(i, 1);
//            i = 0;
          }
          else {
            i++;
          }
        }
        this.showItem();
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

  .restartsavebuttons {
    display: flex;
    justify-content: space-between;
  }

  .error {
    color: red;
    font-style: italic;
  }

</style>
