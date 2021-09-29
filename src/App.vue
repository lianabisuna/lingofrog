<template>
  <v-app>
    <AppHeader />
    <SearchBar />

    <v-main>
      <router-view/>
    </v-main>

    
  </v-app>
</template>

<script>
  import AppHeader from '@/components/AppHeader'
  import SearchBar from '@/components/SearchBar'

  export default {
    name: 'App',

    components: {
      AppHeader,
      SearchBar
    },

    data: () => ({
      //
    }),
  };
</script>
