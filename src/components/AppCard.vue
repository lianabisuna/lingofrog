<template>
  <v-hover v-slot="{ hover }">
    <v-sheet
      :class="[
        'rounded-lg flex-grow-1 d-flex flex-column',
        hover ? 'card-outline': ''
      ]"
    >
      <v-card
        dark
        color="#5F4DA1"
        class="rounded-lg flex-grow-1 d-flex flex-column"
        flat
        border-colo
      >
        <div>
          <v-toolbar
            dense
            flat
            class="rounded-lg"
            color="transparent"
          >
            <v-row
              align="center"
              no-gutters
            >
              <v-avatar
                class="mr-2"
                size="20"
              >
                <img
                  :src="src"
                  alt="John"
                >
              </v-avatar>
              <span>{{ language }}</span>

              <span v-if="hover" style="position: absolute; right: -0.75rem; top: -0.75rem;">
                <v-btn
                  fab
                  x-small
                  depressed
                  color="#5F4DA1"
                  :style="{ border: '2px solid #EC6691 !important' }"
                  @click="removeTranslation"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </span>
            </v-row>
          </v-toolbar>
        </div>

        <v-card-text
          class="text-h2 white--text"
          :style="{ minHeight: '25vh' }"
        >
          {{ translation }}
        </v-card-text>

        <v-spacer></v-spacer>
        
        <v-card-actions>
          <v-btn
            text
            icon
          >
            <v-icon>mdi-volume-high</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-sheet>
  </v-hover>
</template>

<script>
  export default {
    name: 'AppCard',

    props: {
      index: { type: Number, default: null },
      src: { type: String, default: '' },
      language: { type: String, default: '' },
      translation: { type: String, default: '' }
    },

    methods: {
      removeTranslation() {
        this.$store.commit('removeSelected', this.index)
      }
    }
  }
</script>

<style scoped>
  .card-outline {
    outline: 2px solid #EC6691;
  }
</style>