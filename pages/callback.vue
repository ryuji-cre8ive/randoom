<template>
  <v-sheet
    color="black"
    class="pa-3"
    align="center"
  >
    <v-skeleton-loader
      class="mx-auto"
      max-width="600"
      height="700"
      type="card"
    ></v-skeleton-loader>
  </v-sheet>
</template>

<script>
export default {
  auth: false
}
</script>
