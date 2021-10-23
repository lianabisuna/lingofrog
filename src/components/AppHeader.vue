<template>
  <v-toolbar
    flat
    class="app-header"
    height="70"
  >
    <div class="d-flex align-center">
      <h3>LingoFrog</h3>
      <v-icon color="#808080">mdi-circle-small</v-icon>
      <span :style="{ color: '#808080' }">Translate text to 100+ languages</span>
    </div>

    <v-spacer></v-spacer>

    <v-btn icon color="#161036">
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
    // border-bottom: 2px solid #D7D7D7 !important;
    background-color: #e6dabd !important;
    color: #161036 !important;
  }

  @media #{map-get($display-breakpoints, 'sm-and-down')} {
    .app-header {
      padding: 0;
    }
  }
  @media #{map-get($display-breakpoints, 'md-only')} {
    .app-header {
      padding: 0 1.5rem 0 1.5rem;
    }
  }
  @media #{map-get($display-breakpoints, 'lg-and-up')} {
    .app-header {
      padding: 0 3rem 0 3rem;
    }
  }
</style>