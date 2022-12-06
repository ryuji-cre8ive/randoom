<template>
  <div align="center" class="ma-4 pa-3 mx-auto mt-10 login-page" >
    <div class="login-com">
      <Login />
    </div>
    <div class="login-google">
      <GoogleLogin />
    </div>
  </div>
</template>

<script>
import GoogleLogin from '~/components/GoogleLogin.vue'

export default {
  auth: false,
  methods: {
    authenticate () {
      this.$auth.loginWith('app')
    }
  },
  components: { GoogleLogin }
}
</script>
<style lang="scss" scoped>
.login-page{
  height: 800px;
}
.login-com {
  margin-top: 50px;
}
.login-google {
  margin-top: 50px;
}
</style>
