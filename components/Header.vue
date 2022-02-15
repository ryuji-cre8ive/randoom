<template>
  <div class="mb-10">
    <v-app-bar floating app color="yellow" elevation="4">
      <v-app-bar-title class="bar-title">Randoom</v-app-bar-title>
      <v-row justify="end" >
        <v-btn v-if="!this.$auth.loggedIn" class="ml-auto" @click="goLogin"> ログイン</v-btn>
        <v-btn v-if="this.$auth.loggedIn" class="ml-auto" @click="$auth.logout()">ログアウト</v-btn>
      </v-row>
      
    </v-app-bar>
  </div>
</template>

<script setup>
  export default{
    methods:{
      goLogin(){
        this.$router.push('/login')
      },
    },
  }
  
</script>

<style lang="scss">
  .bar-title{
    color: black;
    width: 200px;
  }
</style>