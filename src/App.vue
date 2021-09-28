<template>
  <v-app>
    <v-app-bar
      app
    >
      <div>Translator</div>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>

    <v-footer>
      <div>Footer</div>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
