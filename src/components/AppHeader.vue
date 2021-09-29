<template>
  <v-toolbar
    flat
    class="app-header"
  >
    <div class="d-flex align-center">
      <v-avatar
        size="30"
        class="mr-2"
      >
        <v-img
          src="https://images.buildzoom.com/api/file/u82yR3RNSwOxrHMFYjRV/convert?h=&w=1300&strip=true&fit=crop&quality=65&cache=true&compress=true"
          alt="logo"
        ></v-img>
      </v-avatar>
      <h3>LingoFrog</h3>
    </div>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>mdi-weather-sunny</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-github</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
  export default {
    name: 'AppHeader'
  }
</script>

<style scoped>
  .app-header {
    /* border-bottom: 1px solid #D7D7D7 !important; */
    padding: 0 3rem 0 3rem;
    background-color: #fff !important;
  }
</style>