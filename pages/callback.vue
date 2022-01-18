<template>
  <v-row justify="center">
    <v-col cols="12" md="8">
      <v-skeleton-loader
        class="mx-auto mt-12"
        type="card,list-item-three-line,list-item-three-line,list-item-three-line,actions"
      ></v-skeleton-loader>
    </v-col>
  </v-row>
</template>

<script>
export default {
  auth: false,
}
</script>