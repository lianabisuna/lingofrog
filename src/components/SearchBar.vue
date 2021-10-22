<template>
  <div>
    <v-app-bar
      height="75"
      color="white"
      flat
      v-scroll.parent="onScroll"
      :fixed="scrollDown"
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
            solo flat
            placeholder="Search"
            autofocus
          ></v-text-field>
        </div>
        
        <div
          :class="[
            'search-bar-button-divider d-flex align-center px-3',
            scrollDown ? '' : 'search-bar-button-wrapper'
          ]"
        >
          <v-btn
            icon
            @click="drawer = !drawer"
          >
            <v-icon>mdi-translate</v-icon>
          </v-btn>
        </div>
      </div>
    </v-app-bar>

    <div
      v-if="drawer"
      class="menu-bar-container mt-5"
    >
      <v-row>
        <v-col
          cols="12" sm="6" md="4" lg="2"
          class="py-1"
          v-for="(language, i) in languages"
          :key="i"
        >
          <v-btn
            depressed
            block
            class="text-none font-weight-regular justify-start"
            :style="{letterSpacing: 'normal'}"
            rounded
            :color="isSelected(language.language) ? 'blue lighten-5' : 'transparent'"
            @click="toggleLanguage(language)"
            :loading="isLoading && currentLanguage === language.language"
          >
            <v-icon
              left
              v-if="isSelected(language.language)"
            >
              mdi-check
            </v-icon>
            <v-icon
              left
              v-else
            >
              mdi-checkbox-blank-circle-outline
            </v-icon>
            {{ language.name }}
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SearchBar',

    data: () => ({
      prevScroll: 0,
      scrollPosition: 0,
      scrollDown: false,
      drawer: false,
      storedLanguages: JSON.parse(localStorage.getItem('languages')),
      isLoading: false,
      currentLanguage: null
    }),

    computed: {
      word: {
        get() { return this.$store.getters['word'] },
        set(val) { this.$store.commit('updateWord', val) }
      },
      languages() { return this.$store.getters['languages'] },
      selected() { return this.$store.getters['selected'] },
      translations() { return this.$store.getters['translations'] }
    },

    mounted() {
      this.getStoredLanguages()
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
      },
      getStoredLanguages() {
        if (this.storedLanguages?.length)
          this.$store.commit('setLanguages', this.storedLanguages)
        else
          this.$store.dispatch('getLanguages')
      },
      isSelected(code) {
        // Traverse the array to see if language code is included
        if (this.selected.find(el => code === el.language)) {
          return true 
        }
        return
      },
      async toggleLanguage(language) {
        // Determine the position if language is toggled
        let index = this.selected.findIndex(el => language.language === el.language)
        if (index >= 0) {
          this.$store.commit('removeSelected', index)
        }
        else {
          if (this.word) {
            // Fetch word translation from API
            this.currentLanguage = language.language
            this.isLoading = true
            this.$store.commit('addSelected', language)
            const payload = {
              q: this.word,
              source: 'en',
              target: language.language
            }
            await this.$store.dispatch('translateText', {payload: payload, language: language.name})
            this.isLoading = false
            this.currentLanguage = null
          }
          else {
            // Add data to selected language
            this.$store.commit('addSelected', language)
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~vuetify/src/styles/settings/_variables';

  .search-bar-container {
    background-color: #fff !important;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
  }
  .search-bar-border {
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
    border-top: 1px solid #D7D7D7;
    border-right: 1px solid #D7D7D7;
    border-bottom: 1px solid #D7D7D7;
    height: 100%;
  }
  .search-bar-button-divider {
    border-left: 1px solid #D7D7D7;
  }

  @media #{map-get($display-breakpoints, 'sm-and-down')} {
    .search-bar-container {
      padding: 0 0.5rem 0 0.5rem;
    }
    .menu-bar-container {
      padding: 0 0.5rem 0 0.5rem;
    }
  }
  @media #{map-get($display-breakpoints, 'md-only')} {
    .search-bar-container {
      padding: 0 2.5rem 0 2.5rem;
    }
    .menu-bar-container {
      padding: 0 2.5rem 0 2.5rem;
    }
  }
  @media #{map-get($display-breakpoints, 'lg-and-up')} {
    .search-bar-container {
      padding: 0 4rem 0 4rem;
    }
    .menu-bar-container {
      padding: 0 4rem 0 4rem;
    }
  }
</style>