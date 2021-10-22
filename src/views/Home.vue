<template>
  <main class="app-home px-4">
    <div class="d-flex align-center py-5">
      <span>6 of 120 languages</span>

      <v-spacer></v-spacer>

      <v-btn-toggle>
        <v-btn text>
          <v-icon>mdi-view-module-outline</v-icon>
        </v-btn>

        <v-btn text>
          <v-icon>mdi-view-sequential-outline</v-icon>
        </v-btn>
      </v-btn-toggle>
    </div>

    <div :style="{ minHeight: '75vh' }">
      <v-row>
        <v-col
          v-for="(item,key) in translations"
          :key="key"
          cols="12" md="6" lg="4" xl="3"
          class="d-flex"
        >
          <AppCard
            :language="item.language"
            :translation="item.translation"
          />
        </v-col>
        
        <v-col
          cols="12" md="6" lg="4" xl="3"
          class="d-flex"
        >
          <ButtonCard />
        </v-col>
      </v-row>
    </div>
  </main>
</template>

<script>
  import AppCard from '../components/AppCard'
  import ButtonCard from '../components/ButtonCard'

  export default {
    name: 'Home',

    components: {
      AppCard,
      ButtonCard
    },

    data: () => ({
      //
    }),
    computed: {
      translations() { return this.$store.getters['translations'] }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~vuetify/src/styles/settings/_variables';

  @media #{map-get($display-breakpoints, 'sm-and-down')} {
    .app-home {
      margin: 0;
    }
  }
  @media #{map-get($display-breakpoints, 'md-only')} {
    .app-home {
      margin: 0 1.5rem 0 1.5rem;
    }
  }
  @media #{map-get($display-breakpoints, 'lg-and-up')} {
    .app-home {
      margin: 0 3rem 0 3rem;
    }
  }
</style>