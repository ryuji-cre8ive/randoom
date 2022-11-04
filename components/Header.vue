<template>
  <div class="mb-10">
    <v-app-bar floating app color="yellow" elevation="4">
      <v-app-bar-title class="bar-title">
        random food
      </v-app-bar-title>
      <v-row justify="end">
        <v-btn v-if="!$auth.loggedIn" class="ml-auto" @click="$router.push('/login')">
          ログイン
        </v-btn>
        <v-btn v-if="$auth.loggedIn" class="ml-auto" @click="$auth.logout()">
          ログアウト
        </v-btn>
      </v-row>
    </v-app-bar>
  </div>
</template>

<script lang="ts">
import { Vue } from 'nuxt-property-decorator'
export default class Header extends Vue {
  goLogin = () => {
    return this.$router.push('/login')
  }
}
</script>

<style lang="scss">
  .bar-title{
    color: black;
    width: 200px;
  }
</style>
