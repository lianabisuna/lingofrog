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
          cols="2"
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
            :color="isSelectedLanguage(language.language) ? 'blue lighten-5' : 'transparent'"
            @click="toggleLanguage(language)"
          >
            <v-icon
              left
              v-if="isSelectedLanguage(language.language)"
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
  import axios from 'axios'

  export default {
    name: 'SearchBar',

    data: () => ({
      prevScroll: 0,
      scrollPosition: 0,
      scrollDown: false,
      drawer: false,
      languages: null,
      isFetching: false,
      selectedItem: [],
      selectedLanguages: [
        { language: "en", name: "English" }
      ]
    }),

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
      fetchLanguages() {
        let options = {
          method: 'GET',
          url: 'https://deep-translate1.p.rapidapi.com/language/translate/v2/languages',
          headers: {
            'x-rapidapi-host': 'deep-translate1.p.rapidapi.com',
            'x-rapidapi-key': '3edc4281f5msh7f023170c4a1bf0p13f5f2jsn7699bb9495fe'
          }
        }

        axios.request(options)
        .then((response) => {
          console.log('[response]', response.data.languages);
          localStorage.setItem('languages', JSON.stringify(response.data.languages))
          this.languages = response.data.languages
        })
        .catch((error) => {
          console.log('[error]', error);
        })
      },
      getStoredLanguages() {
        let storedLanguages = JSON.parse(localStorage.getItem('languages'))

        if (storedLanguages?.length) {
          console.log('[stored langauges available]');
          this.languages = storedLanguages
        }
        else {
          console.log('[no stored languages found]', );
          this.fetchLanguages()
        }
      },
      isSelectedLanguage(code) {
        // Traverse the object to see if language code is included
        if (this.selectedLanguages.find(el => code === el.language)) {
          return true
        }
        return
      },
      toggleLanguage(language) {
        if (this.isSelectedLanguage(language.language)) {
          let index = this.selectedLanguages.findIndex(el => language.language === el.language)
          this.selectedLanguages.splice(index, 1)
        }
        else {
          this.selectedLanguages.push(language)
        }
      }
    }
  }
</script>

<style scoped>
  .search-bar-container {
    padding: 0 4rem 0 4rem;
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

  .menu-bar-container {
    padding: 0 4rem 0 4rem;
  }

  @media (min-width: 1264px) and (max-width: 1903px) {
  .cols-5 {
    width: 20%;
    max-width: 20%;
    flex-basis: 20%;
  }
}
</style>