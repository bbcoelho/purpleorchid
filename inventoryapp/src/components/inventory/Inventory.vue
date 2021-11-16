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
        <input id='qty' autocomplete='off' v-on:input='inventoryItems[lastFoundItemIndex].iteminventory = $event.target.value' v-bind:value='shownItem.quantity'>
      </div>

      <div class='fields'>
        <label for='toorder'>TO ORDER</label>
        <input id='toorder' autocomplete='off' v-on:input='inventoryItems[lastFoundItemIndex].toorder = $event.target.value' v-bind:value='shownItem.toorder'>
      </div>

      <div class='fields'>
        <label for='obs'>OBS.:</label>
        <textarea id='obs' autocomplete='off' v-on:input='inventoryItems[lastFoundItemIndex].obs = $event.target.value' v-bind:value='shownItem.obs'></textarea>
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
    
    data() {

      return {
        inventoryItems: [],
        countingItem: "",
        inventoryItemIndex: 0,
        lastFoundItemIndex: 0,
        shownItem: {
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

      showFirstItem() {
        while (this.inventoryItemIndex < this.inventoryItems.length && this.inventoryItems[this.inventoryItemIndex].store != this.store) {
          this.inventoryItemIndex++;
        }
        if (this.inventoryItemIndex < this.inventoryItems.length) {                      // updates "countingItem" just when exiting from WHILE by an item found
          this.lastFoundItemIndex = this.inventoryItemIndex;
          this.countingItem = this.inventoryItems[this.inventoryItemIndex].item;
                                                                                         // updates values shown in form
          this.shownItem.quantity = this.inventoryItems[this.lastFoundItemIndex].iteminventory;
          this.shownItem.toorder = this.inventoryItems[this.lastFoundItemIndex].toorder;
          this.shownItem.obs = this.inventoryItems[this.lastFoundItemIndex].obs;
        }
        else {
          this.inventoryItemIndex--;                                                     // avoids index reference error when exiting from WHILE by reaching array's end
        }
      },

      nextItem() {
        this.inventoryItemIndex = this.lastFoundItemIndex + 1;       
        while (this.inventoryItemIndex < this.inventoryItems.length && this.inventoryItems[this.inventoryItemIndex].store != this.store) {
          this.inventoryItemIndex++;
        }
        if (this.inventoryItemIndex < this.inventoryItems.length) {                     // updates "countingItem" just when exiting from WHILE by an item found
          this.lastFoundItemIndex = this.inventoryItemIndex;
          this.countingItem = this.inventoryItems[this.inventoryItemIndex].item;
                                                                                         // updates values shown in form
          this.shownItem.quantity = this.inventoryItems[this.lastFoundItemIndex].iteminventory;
          this.shownItem.toorder = this.inventoryItems[this.lastFoundItemIndex].toorder;
          this.shownItem.obs = this.inventoryItems[this.lastFoundItemIndex].obs;

        }
        else {
          this.inventoryItemIndex--;                                                    // avoids index reference error when exiting from WHILE by exceeding array's end
        }
        
      },

      previousItem() {
        this.inventoryItemIndex = this.lastFoundItemIndex - 1;
        while (this.inventoryItemIndex >= 0 && this.inventoryItems[this.inventoryItemIndex].store != this.store) {
          this.inventoryItemIndex--;
        }
        if (this.inventoryItemIndex >= 0) {                                             // updates "countingItem" just when exiting from WHILE by an item found
          this.lastFoundItemIndex = this.inventoryItemIndex;
          this.countingItem = this.inventoryItems[this.inventoryItemIndex].item;
                                                                                         // updates values shown in form
          this.shownItem.quantity = this.inventoryItems[this.lastFoundItemIndex].iteminventory;
          this.shownItem.toorder = this.inventoryItems[this.lastFoundItemIndex].toorder;
          this.shownItem.obs = this.inventoryItems[this.lastFoundItemIndex].obs;
        }
        else {
          this.inventoryItemIndex++;                                                    // avoids index reference error when exiting from WHILE by exceeding array's beginning
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
            i = 0;
          }
          else {
            i++;
          }
        }
        console.log(this.inventoryItems);
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
