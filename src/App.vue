<template>
  <v-app>
    <div>
      <AppHeader />
      <SearchBar />

      <v-main>
        <router-view/>
      </v-main>

      <AppFooter />
    </div>
  </v-app>
</template>

<script>
  import AppHeader from '@/components/AppHeader'
  import SearchBar from '@/components/SearchBar'
  import AppFooter from '@/components/AppFooter'

  export default {
    name: 'App',

    components: {
      AppHeader,
      SearchBar,
      AppFooter
    },

    data: () => ({
      //
    }),
  };
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Nunito+Sans&family=Rubik:wght@500&display=swap');

  #app {
    font-family: 'Rubik', sans-serif;
    background: #FFF2D2;
    color: #161036 !important;
  }
</style>
