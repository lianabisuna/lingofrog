<template>
  <v-hover v-slot="{ hover }">
    <v-sheet
      outlined
      color="lightgrey"
      class="rounded-lg flex-grow-1 d-flex flex-column"
      :style="{ minHeight: '35vh' }"
    >
      <v-card
        class="rounded-lg flex-grow-1 align-center d-flex"
        hover
        flat
        :color="hover ? 'grey lighten-5' : ''"
        :ripple="hover"
      >
        <v-card-text class="text-center">
          <v-icon x-large>mdi-plus</v-icon>
        </v-card-text>
      </v-card>
    </v-sheet>
  </v-hover>
</template>

<script>
  export default {
    name: 'ButtonCard'
  }
</script>