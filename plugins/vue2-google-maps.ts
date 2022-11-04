import Vue from 'vue'
import * as VueGoogleMaps from '~/node_modules/vue2-google-maps'

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY


Vue.use(VueGoogleMaps, {
  load: {
    key: GOOGLE_API_KEY,
    libraries: 'places'
  }
})

export default Vue