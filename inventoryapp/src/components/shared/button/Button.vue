<template>

  <button v-on:click='actionTrigger' v-bind:disabled='buttonDisabled' class='button' v-bind:class='buttonStyle' v-bind:type='buttonType'>{{ label }}</button>
    
</template>


<script>

  export default {

    props: {

      buttonType: {
        required: true,
        type: String
      },

      label: {
        required: true,
        type: String
      },

      confirmAction: Boolean,
      buttonDisabled: Boolean,
      buttonCSS: String

    },

    methods: {

      actionTrigger() {

        if(this.confirmAction) {
          if(confirm('Are you sure?')) {
            this.$emit('buttonActivated');
          }
          return;
        }
        this.$emit('buttonActivated');
      }

    },

    computed: {

      buttonStyle() {
        if(this.buttonDisabled)
          return 'disabled';
        else{
          if(this.buttonCSS == 'default' || !this.buttonCSS)
            return 'default';
          if(this.buttonCSS == 'attention')
            return 'attention';
        }
      }

    }

  }

</script>


<style scoped>

    .button {
        display: inline-block;
        padding: 10px;
        border-radius: 3px;
        margin: 10px;
        font-size: 1.2em;
    }

    .disabled {
        background: grey;
        color: black;
    }

    .attention {
        background: firebrick;
        color: white;
    }

    .default {
        background: darkcyan;
        color: white;
    }

</style>