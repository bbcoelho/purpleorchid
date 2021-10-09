<template>

  <nav class='nav'>CHOOSE STORE:
    <ul class='menu'>
      <li><a class='link' href='#' v-on:click='defineStore("POP")'>Panorama</a></li>
      <li><a class='link' href='#' v-on:click='defineStore("POH")'>Hollywood</a></li>
      <li><a class='link' href='#' v-on:click='defineStore("POM")'>Morningside</a></li>
      <li><a class='link' href='#' v-on:click='defineStore("POD")'>Downtown</a></li>
    </ul>
  </nav>

</template>


<script>

  export default {

    methods: {
      defineStore(choosedStore) {
        this.$emit('selectedStore', choosedStore);
      }    
    },
  }

</script>


<style scoped>

  .menu {
    background-color: rgb(100,52,116);
    font-family: 'Arial Black', Helvetica, sans-serif;
    color: white;
    display: flex;
    justify-content: space-around;
    list-style: none;
  }

  .nav {
    font-family: 'Arial Black', Helvetica, sans-serif;

  }

  .link {
    text-decoration: none;
    color: white;
    font-family: 'Arial Black', Helvetica, sans-serif;
  }

</style>
