
<template>
  <div>
    <v-app-bar
      color="deep-purple accent-4"
      dense
      dark
    >
      <v-toolbar-title @click="goHome">Randoom</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="!this.$auth.loggedIn" class="ml-auto" @click="goLogin"> ログイン</v-btn>
      <v-btn v-if="this.$auth.loggedIn" class="ml-auto" @click="$auth.logout()">ログアウト</v-btn>
      <v-menu
        left
        bottom
      >
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  methods: {
    goLogin () {
      this.$router.push('/login')
    },
    goHome () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss">
  .bar-title{
    color: black;
    width: 200px;
  }
</style>
