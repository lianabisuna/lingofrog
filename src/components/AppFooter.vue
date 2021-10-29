<template>
  <v-footer
    padless
    color="#E6DABD"
    class="justify-center mt-10"
  >
    <v-card
      flat
      tile
      color="transparent"
    >
      <v-card-text>
        {{ new Date().getFullYear() }} — <strong>LingoFrog</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: 'AppFooter',

  data: () => ({
    icons: []
  })
}
</script>