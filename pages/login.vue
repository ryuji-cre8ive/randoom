<template>
  <div align="center">
    <v-card outlined max-width="600" class="ma-4 pa-3 mx-auto mt-5">
      <v-card-title>ログイン</v-card-title>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn @click="authenticate">Googleでログイン<v-icon>mdi-google</v-icon></v-btn>
        <v-spacer></v-spacer>
        <v-btn outlined rounded text>登録してログイン</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  auth: false,
  methods: {
    authenticate () {
      this.$auth.loginWith('app')
    }
  }
}
</script>
