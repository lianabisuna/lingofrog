<template>
  <!-- <v-app-bar
    height="75"
    color="white"
    class="search-bar search-bar-border"
    flat
    outlined
  >
    <v-text-field
      prepend-inner-icon="mdi-magnify"
      hide-details
      flat solo
      placeholder="Search"
    ></v-text-field>
    
    <v-btn icon>
      <v-icon>mdi-translate</v-icon>
    </v-btn>
  </v-app-bar> -->
  <v-app-bar
    height="75"
    color="white"
    class="search-bar"
    flat
    outlined
  >
    <div class="search-bar-input-wrapper d-flex align-center flex-grow-1">
      <v-text-field
        prepend-inner-icon="mdi-magnify"
        hide-details
        solo flat
        placeholder="Search"
        autofocus
      ></v-text-field>
    </div>
    
    <div class="search-bar-button-wrapper d-flex align-center px-3">
      <v-btn icon>
        <v-icon>mdi-translate</v-icon>
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script>
  export default {
    name: 'SearchBar'
  }
</script>

<style scoped>
  .search-bar {
    padding: 0 3rem 0 3rem;
  }
  .search-bar-border {
    border-top: 1px solid #D7D7D7 !important;
    border-bottom: 1px solid #D7D7D7 !important;
  }
  .search-bar-input-wrapper {
    border-radius: 0.5rem 0 0 0.5rem;
    border-top: 1px solid #D7D7D7;
    border-left: 1px solid #D7D7D7;
    border-bottom: 1px solid #D7D7D7;
    height: 100%;
  }
  .search-bar-button-wrapper {
    border-radius: 0 0.5rem 0.5rem 0;
    border: 1px solid #D7D7D7;
    height: 100%;
  }
</style>