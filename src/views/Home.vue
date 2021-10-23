<template>
  <main class="app-home px-4 mt-8">
    <v-row>
      <v-col
        cols="3"
        v-if="drawer"
      >
        <v-card
          flat
          dark
          class="rounded-lg"
          color="#EC6691"
        >
          <span style="position: absolute; right: -0.75rem; top: -0.75rem; z-index: 1;">
            <v-btn
              fab
              x-small
              depressed
              color="#EC6691"
              :style="{ border: '2px solid white !important' }"
              @click="drawer = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </span>
          
          <v-row no-gutters :style="{ borderBottom: '2px solid white' }">
            <v-text-field
              dark
              placeholder="Search language"
              hide-details
              solo flat
              class="py-1 search-language-input"
            >
            </v-text-field>
          </v-row>
          <v-row no-gutters class="pa-3">
            <v-col
              cols="12"
              class="py-1"
              v-for="(language, i) in languages"
              :key="i"
            >
              <v-btn
                depressed
                block
                class="text-none font-weight-regular justify-start rounded-lg"
                :style="{letterSpacing: 'normal'}"
                :color="isSelected(language.language) ? 'pink darken-2' : 'transparent'"
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
        </v-card>
      </v-col>

      <v-col>
        <div class="d-flex align-center mb-5">
          <v-btn
            v-if="!drawer"
            dark
            large
            depressed
            color="#EC6691"
            :style="{letterSpacing: 'normal'}"
            class="text-none rounded-lg"
            @click="drawer = !drawer"
          >
            Languages
            <v-icon right>mdi-chevron-right</v-icon>
          </v-btn>

          <span :class="{ 'ml-5': !drawer }">6 of 120 languages</span>

          <v-spacer></v-spacer>

          <v-btn-toggle
            dark
            background-color="#5F4DA1"
            borderless
            class="rounded-lg"
          >
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
      </v-col>
    </v-row>
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
      drawer: true,
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

<style lang="scss">
  .search-language-input {
    .v-input__slot {
      background-color: #EC6691 !important;
    }
  }

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