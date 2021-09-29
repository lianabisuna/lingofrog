<template>
  <v-hover v-slot="{ hover }">
    <v-card
      class="rounded-lg flex-grow-1 d-flex flex-column"
      :flat="!hover"
      :style="{ border: '1px solid lightgrey !important' }"
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
                color="white"
                :style="{ border: '1px solid lightgrey !important' }"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </span>
          </v-row>
        </v-toolbar>
      </div>

      <v-card-text
        class="text-h2 black--text"
        :style="{ minHeight: '20vh' }"
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
  </v-hover>
</template>

<script>
  export default {
    name: 'AppCard',

    props: {
      src: { type: String, default: '' },
      language: { type: String, default: '' },
      translation: { type: String, default: '' }
    }
  }
</script>