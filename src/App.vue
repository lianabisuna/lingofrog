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
