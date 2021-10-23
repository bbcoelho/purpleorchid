<template>

  <div>

    <div class='appHeader'>
      <img src='https://static.wixstatic.com/media/93ce36_b4d980a301654543b10472102a2cb9fc~mv2.png/v1/fill/w_80,h_80,al_c,q_85,usm_0.66_1.00_0.01/Logo%20Final-06.webp' alt='Logo'>
      <h1 v-text='appTittle'></h1>
    </div>
    <div v-show='homeVisible'>
      <appHome @selectedStore="inventoryCall($event)"/>
    </div>
    <div v-show='inventoryVisible'>
      <appInventory :store = 'workingStore'/>
    </div>
    
  </div>

</template>


<script>

import Home from './components/home/Home.vue';
import Inventory from './components/inventory/Inventory.vue';

export default {

  components: {
    'appHome': Home,
    'appInventory': Inventory
  },

  data() {

    return {
      appTittle: 'InventoryApp',
      homeVisible: true,
      inventoryVisible: false,
      workingStore: ''
    }
  },

  methods: {

    inventoryCall($event) {
      this.homeVisible = false;
      this.inventoryVisible = true;
      this.workingStore = $event;
    }
  }

}

</script>


<style>

  .appHeader {
    background-color: white;
    font-family: "Arial", Helvetica, sans-serif;
    text-align: center;
  }

</style>
