<template>
  <div align="center">
    <v-card outlined max-width="600" class="ma-4 pa-3 mx-auto mt-5">
      <v-card-title>ログイン</v-card-title>
      <v-divider />
      <v-card-actions>
        <v-btn @click="authenticate">
          Googleでログイン<v-icon>mdi-google</v-icon>
        </v-btn>
        <v-spacer />
        <v-btn outlined rounded text>
          登録してログイン
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { Vue, Component } from 'nuxt-property-decorator'
@Component({
  auth: false
})

export default class login extends Vue {
  authenticate () {
    this.$auth.loginWith('app')
  }
}
</script>
