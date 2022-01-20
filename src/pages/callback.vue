<template>
  <v-sheet
    :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
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
  auth: false,
  inject: {
      theme: {
        default: { isDark: false },
      },
    },
}
</script>