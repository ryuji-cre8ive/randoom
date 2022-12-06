<template>
  <v-btn @click="authenticate" color="#B2DFDB">Googleでログイン<v-icon>mdi-google</v-icon></v-btn>
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
