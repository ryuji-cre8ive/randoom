<template>
  <v-card outlined max-width="600" class="ma-4 pa-3 mx-auto mt-5">
    <v-card-title>ログイン</v-card-title>
    <v-card-text>
      <v-form class="pt-7">
        <v-text-field label="メールアドレス" prepend-icon="mdi-account-circle" v-model="name" />
        <v-text-field :type="showPassword ? 'text' : 'password'" label="パスワード" prepend-icon="mdi-lock" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" v-model="password" @click:append="showPassword = !showPassword" />
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn @click="login">ログイン</v-btn>
      <v-spacer></v-spacer>
      <v-btn>登録してログイン</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  data () {
    return {
      showPassword: false,
      name: '',
      password: ''
    }
  },
  methods: {
    login () {
      if (this.name === process.env.TEST_NAME && this.password === process.env.TEST_PASSWORD) {
        this.$auth.setUser(this.name)
        this.$router.push('/main')
      } else {
        alert(`emailもしくはpasswordが違います。\nemail:${this.name}\npassword:${this.password}`)
      }
    }
  }
}
</script>
