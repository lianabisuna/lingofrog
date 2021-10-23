<template>
  <div>
    <v-app-bar
      :color="scrollDown ? '#F9D45D' : 'transparent'"
      flat
      v-scroll.parent="onScroll"
      :fixed="scrollDown"
      :class="{ 'mt-10': !scrollDown }"
      height="80"
    >
      <div
        :class="[
          'search-bar-container d-flex',
          { 'search-bar-border': scrollDown }
        ]"
      >
        <div
          :class="[
            'd-flex align-center flex-grow-1',
            scrollDown ? '' : 'search-bar-input-wrapper'
          ]"
        >
          <v-text-field
            v-model="word"
            prepend-inner-icon="mdi-magnify"
            hide-details
            placeholder="Type text to translate"
            solo flat
            autofocus
            class="search-text-input text-h5 font-weight-bold pl-3"
          ></v-text-field>
        </div>
        
        <div
          :class="[
            'd-flex align-center px-5',
            scrollDown ? '' : 'search-bar-button-wrapper'
          ]"
        >
          <v-btn
            dark
            large
            depressed
            color="#51CEA4"
            class="rounded-lg text-none"
            :style="{letterSpacing: 'normal'}"
          >
            English
          </v-btn>
        </div>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
  export default {
    name: 'SearchBar',

    data: () => ({
      prevScroll: 0,
      scrollPosition: 0,
      scrollDown: false
    }),

    computed: {
      word: {
        get() { return this.$store.getters['word'] },
        set(val) { this.$store.commit('updateWord', val) }
      }
    },

    methods: {
      onScroll() {
        // Get the html tag (html is the parent scrollable)
        let app = document.getElementsByTagName('html')

        this.scrollPosition = app[0].scrollTop

        // Make the app bar smaller when scrolled down
        if (this.scrollPosition > this.prevScroll) {
          this.scrollDown = true
          return
        }
        else {
          this.scrollDown = false
        }

        this.scrollDown = false
        this.prevScroll = this.scrollPosition <= 0 ? 0 : this.scrollPosition
        return
      }
    }
  }
</script>

<style lang="scss">
  @import '~vuetify/src/styles/settings/_variables';

  .search-text-input {
    .v-input__slot {
      background-color: #F9D45D !important;
    }
    color: #161036 !important;
  }

  .search-bar-container {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
  }
  .search-bar-border {
    border-bottom: 2px solid white !important;
  }
  .search-bar-input-wrapper {
    border-radius: 0.5rem 0 0 0.5rem;
    height: 100%;
    background: #F9D45D;
  }
  .search-bar-button-wrapper {
    border-radius: 0 0.5rem 0.5rem 0;
    height: 100%;
    background: #F9D45D;
  }

  @media #{map-get($display-breakpoints, 'sm-and-down')} {
    .search-bar-container {
      padding: 0 0.5rem 0 0.5rem;
    }
  }
  @media #{map-get($display-breakpoints, 'md-only')} {
    .search-bar-container {
      padding: 0 2.5rem 0 2.5rem;
    }
  }
  @media #{map-get($display-breakpoints, 'lg-and-up')} {
    .search-bar-container {
      padding: 0 4rem 0 4rem;
    }
  }
</style>