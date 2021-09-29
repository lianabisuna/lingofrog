<template>
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
        <v-btn icon>
          <v-icon>mdi-translate</v-icon>
        </v-btn>
      </div>
    </div>
  </v-app-bar>
</template>

<script>
  export default {
    name: 'SearchBar',

    data: () => ({
      prevScroll: 0,
      scrollPosition: 0,
      scrollDown: false
    }),

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
</style>