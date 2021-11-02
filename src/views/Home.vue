<template>
  <main class="app-home px-4 mt-8">
    <v-row>
      <v-col
        cols="12" sm="4" md="3"
        v-if="drawer"
      >
        <v-card
          flat
          dark
          :class="[
            'rounded-lg ',
            searchFocus ? 'language-card-focus' : 'language-card-blur'
          ]"
          color="#EC6691"
          min-height="80vh"
        >
          <span style="position: absolute; right: -0.75rem; top: -0.75rem; z-index: 1;">
            <v-btn
              fab
              x-small
              depressed
              color="#EC6691"
              :class="[
                searchFocus ? 'close-button-focus' : 'close-button-blur'
              ]"
              @click="drawer = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </span>
          
          <v-row no-gutters :style="{ borderBottom: '2px solid white' }">
            <v-text-field
              v-model="search"
              dark
              placeholder="Search language"
              hide-details
              solo flat
              clearable
              class="py-1 search-language-input"
              @focus="searchFocus = true"
              @blur="searchFocus = false"
              id="search"
            >
            </v-text-field>
          </v-row>
          <v-row no-gutters class="pa-3">
            <v-col
              cols="12"
              class="py-1"
              v-for="(language, i) in search ? filteredLanguages : languages"
              :key="i"
            >
              <v-btn
                depressed
                block
                class="text-none font-weight-regular justify-start rounded-lg"
                :style="{letterSpacing: 'normal'}"
                :color="isSelected(language.code) ? '#5F4DA1' : 'transparent'"
                @click="toggleLanguage(language)"
                :loading="isLoading && currentLanguage === language.code"
              >
                <v-icon
                  left
                  v-if="isSelected(language.code)"
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

          <span
            v-if="$vuetify.breakpoint.mdAndUp"
            :class="{ 'ml-5': !drawer }"
          >
            {{ translations.length }} of {{ languages.length }} languages
          </span>

          <v-spacer></v-spacer>

          <v-btn-toggle
            dark
            background-color="#5F4DA1"
            borderless
            class="rounded-lg"
            v-model="layout"
          >
            <v-btn text value="grid">
              <v-icon>mdi-view-module-outline</v-icon>
            </v-btn>

            <v-btn text value="list">
              <v-icon>mdi-view-sequential-outline</v-icon>
            </v-btn>
          </v-btn-toggle>
        </div>

        <div :style="{ minHeight: '75vh' }">
          <v-row>
            <v-col
              v-for="(item,key) in translations"
              :key="key"
              cols="12"
              :md="layout === 'grid' ? '6' : '12'"
              :lg="layout === 'grid' ? '4' : '12'"
              :xl="layout === 'grid' ? '3' : '12'"
              class="d-flex"
            >
              <AppCard
                :index="key"
                :language="item.language"
                :code="item.target"
                :translation="item.translation"
              />
            </v-col>
            
            <v-col
              cols="12"
              :md="layout === 'grid' ? '6' : '12'"
              :lg="layout === 'grid' ? '4' : '12'"
              :xl="layout === 'grid' ? '3' : '12'"
              class="d-flex"
            >
              <ButtonCard @open="focusDrawer" />
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>

    <v-snackbar
      v-model="snackbar"
      timeout="5000"
      color="#161036"
      min-height="60"
      rounded="lg"
    >
      {{ message }}

      <template v-slot:action="{ attrs }">
        <v-btn
          small
          v-bind="attrs"
          @click="snackbar = false"
          icon
        >
          <v-icon small>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
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
      storedLanguages: JSON.parse(localStorage.getItem('languages')),
      isLoading: false,
      currentLanguage: null,
      searchFocus: false,
      layout: 'grid',
      search: ''
    }),

    computed: {
      text: {
        get() { return this.$store.getters['text'] },
        set(val) { this.$store.commit('updateText', val) }
      },
      drawer: {
        get() { return this.$store.getters['drawer'] },
        set(val) { this.$store.commit('toggleDrawer', val) }
      },
      languages() { return this.$store.getters['languages'] },
      translations() { return this.$store.getters['translations'] },
      detected() { return this.$store.getters['detected'] },
      filteredLanguages() {
        return this.languages.filter(el => {
          return el.name.toLowerCase().includes(this.search.toLowerCase())
        })
      },
      snackbar: {
        get() { return this.$store.getters['snackbar'] },
        set(val) { this.$store.commit('toggleSnackbar', val) }
      },
      message() { return this.$store.getters['message'] },
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
        if (this.translations.find(el => code === el.target)) {
          return true 
        }
        return
      },
      async toggleLanguage(language) {
        let data = {
          text: this.text,
          source: this.detected.code,
          target: language.code,
          translation: '',
          language: language.name
        }
        // Determine the index position if language is toggled
        let index = this.translations.findIndex(el => language.code === el.target)
        if (index >= 0) {
          this.$store.commit('removeSelected', index)
        }
        else {
          if (this.text) {
            // Fetch text translation from API
            this.currentLanguage = language.code
            this.isLoading = true
            this.$store.commit('addSelected', data)
            
            await this.$store.dispatch('translateSelected')
            this.isLoading = false
            this.currentLanguage = null
          }
          else {
            // Add data to selected language
            this.$store.commit('addSelected', data)
          }
        }
      },
      focusDrawer() {
        this.drawer = true
        this.$nextTick(() => {
          document.getElementById('search').focus()
        })
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
  
  .language-card-focus {
    outline: 2px solid #5F4DA1;
  }
  .language-card-blur {
    outline: 2px solid white;
  }

  .close-button-focus {
    border: 2px solid #5F4DA1 !important;
  }

  .close-button-blur {
    border: 2px solid white !important;
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