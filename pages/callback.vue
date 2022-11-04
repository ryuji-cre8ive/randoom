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
    />
  </v-sheet>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator'
@Component({
  auth: false
})
export default class Callback extends Vue {}
</script>
