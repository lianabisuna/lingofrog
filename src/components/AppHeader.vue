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

<style lang="scss" scoped>
  @import '~vuetify/src/styles/settings/_variables';

  .app-header {
    /* border-bottom: 1px solid #D7D7D7 !important; */
    background-color: #fff !important;
  }

  @media #{map-get($display-breakpoints, 'sm-and-down')} {
    .app-header {
      margin: 0;
    }
  }
  @media #{map-get($display-breakpoints, 'md-only')} {
    .app-header {
      margin: 0 1.5rem 0 1.5rem;
    }
  }
  @media #{map-get($display-breakpoints, 'lg-and-up')} {
    .app-header {
      margin: 0 3rem 0 3rem;
    }
  }
</style>