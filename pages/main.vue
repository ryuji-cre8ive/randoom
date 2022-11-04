<template>
  <v-app align="center">
    <v-main >
      <v-card height="700" width="600">
        <GmapMap map-type-id="roadmap"
          :center="maplocation"
          :zoom="zoom"
          :style="styleMap"
          :options="mapOptions"
          ref="mapRef">
          <GmapMarker
            v-for="(m, index) in markers"
            :key="index"
            :title="m.title"
            :position="m.position"
            :clickable="true"
            :draggable="false"
            :icon="m.pinicon"
            @click="onClickMarker(m)"
          />
        </GmapMap>

       <!-- カードコピペ -->
        <v-overlay :value="this.isfinishedChoice" absolute>
          <v-card
          class="mx-auto my-12 pa-3"
          width="400"
        >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-card-title>{{this.choicedData.title}}</v-card-title>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
        <v-rating
          :value="this.choicedData.rating"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>
        <div class="grey--text ms-4">
          {{this.choicedData.rating}} ({{this.choicedData.totalRatings}})
        </div>
      </v-row>
      <v-row
        align="center"
        class="mx-0"
      >
        <div class="grey--text ms-4" v-if="this.choicedData.priceLevel">
          値段帯: {{this.choicedData.priceLevel}}
        </div>
      </v-row>
      <v-row
        align="center"
        class="mx-0"
      >
        <div class="grey--text ms-4" >
          今の時間でやってるか: {{this.choicedData.isOpen ? "やってる" : "やってない"}}
        </div>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="isfinishedChoice = !isfinishedChoice" color="error"><v-icon>mdi-close</v-icon></v-btn>
      <v-spacer></v-spacer>
      <v-btn @click="goDestination" color="primary">ルートを表示する</v-btn>
    </v-card-actions>
  </v-card>
        </v-overlay>
        <v-select
          :items="items"
          label="genre"
          v-model="searchWord"
          class="ma-8"
          @input="changeGenre"
          item-text="showLabel"
          item-value="selectedValue"
          return-object>
        </v-select>
        <v-card-actions class="pa-8">
          <v-btn v-if="!this.isFinishedMapping" @click="randomChoice(searchWord)" color="primary">検索する</v-btn>
          <v-btn @click="getChoice" v-if="this.isFinishedMapping" color="success">抽選!</v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="reset" color="error">結果をリセット</v-btn>
        </v-card-actions>
        <!-- <PieChart v-if="isFinishedMapping" :chartData="pieData"></PieChart> -->
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
// import { Chart, registerables } from "chart.js"
// import { PieChart } from "vue-chart-3"
// Chart.register(...registerables)
import { gmapApi } from 'vue2-google-maps'

export default {
  middleware: 'auth',
  components: {
    // PieChart,
  },
  computed: {
    google: gmapApi
  },
  data () {
    return {
      isFinishedMapping: false,
      searchWord: '',
      maplocation: { lng: 0, lat: 0 },
      zoom: 16,
      styleMap: {
        width: '100%',
        height: '400px'
      },
      items: [
        { selectedValue: 'point_of_interest', showLabel: '興味深い場所' },
        { selectedValue: 'cafe', showLabel: 'カフェ' },
        { selectedValue: 'store', showLabel: 'お店' },
        { selectedValue: 'meal_takeaway', showLabel: 'テイクアウト' },
        { selectedValue: 'restaurant', showLabel: 'レストラン' },
        { selectedValue: 'food', showLabel: '食料' },
        { selectedValue: 'supermarket', showLabel: 'スーパー' },
        { selectedValue: 'place_of_worship', showLabel: '礼拝所' },
        { selectedValue: 'dentist', showLabel: '歯医者' },
        { selectedValue: 'health', showLabel: '健康' },
        { selectedValue: 'shoe_store', showLabel: '靴屋さん' },
        { selectedValue: 'grocery_or_supermarket', showLabel: '日用雑貨店' },
        { selectedValue: 'meal_delivery', showLabel: 'デリバリー' }
      ],
      mapOptions: {
        streetViewControl: false,
        styles: []
      },
      markers: [],
      colors: [
        '#ff7675',
        '#1e90ff',
        '#00ff7f',
        '#ffd700',
        '#ff1e1e',
        '#89ff14',
        '#0984e3',
        '#b8d200',
        '#ff00ff',
        '#ffff0a'
      ],
      choicedData: {},
      isfinishedChoice: false,
      isDecide: false
    }
  },
  async mounted () {
    const currentPosTmp = await this.getCurrentPosition()
    const currentPos = {
      lat: currentPosTmp.coords.latitude,
      lng: currentPosTmp.coords.longitude
    }
    this.maplocation = currentPos
    console.log('maplocation', this.maplocation)
  },
  methods: {
    reset () {
      this.markers = []
      this.searchWord = ''
      this.isFinishedMapping = false
    },
    changeGenre (event) {
      this.reset()
      this.searchWord = event.selectedValue
    },
    onClickMarker (marker) {
      this.$refs.mapRef.panTo(marker.position)
      this.infoWindowPos = marker.position
      this.marker = marker
      this.infoWinOpen = true
    },
    getCurrentPosition () {
      return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      })
    },
    randomChoice () {
      this.setPlaceMakers()
      this.isFinishedMapping = true
    },
    getChoice () {
      console.log(this.markers)
      const numOfMarkers = this.markers.length
      const numrandom = Math.floor(Math.random() * numOfMarkers)
      console.log(this.markers[numrandom])
      this.choicedData = this.markers[numrandom]
      this.$refs.mapRef.panTo(this.markers[numrandom].position)
      this.isfinishedChoice = true
    },

    setPlaceMakers () {
      const map = this.$refs.mapRef.$mapObject
      const placeService = new this.google.maps.places.PlacesService(map)
      // Places APIのnearbySearchを使用する。
      placeService.nearbySearch(
        {
          location: new this.google.maps.LatLng(this.maplocation.lat, this.maplocation.lng),
          radius: 500,
          type: [this.searchWord]
        },
        async function (results, status) {
          if (status === this.google.maps.places.PlacesServiceStatus.OK) {
            results.forEach(place => {
              console.log(place)
              // console.log(place)
              // console.log('isOpen',place.opening_hours.isOpen(new Date()))
              // デフォルトのアイコンが大きめなので縮小
              const icon = {
                url: place.icon, // url
                scaledSize: new this.google.maps.Size(30, 30), // scaled size
                origin: new this.google.maps.Point(0, 0), // origin
                anchor: new this.google.maps.Point(0, 0) // anchor
              }
              const marker = {
                priceLevel: place.price_level,
                rating: place.rating,
                position: place.geometry.location,
                icon,
                title: place.name,
                id: place.place_id,
                totalRatings: place.user_ratings_total
                // isOpen: place.opening_hours.isOpen
              }
              this.markers.push(marker)
            })
          }
        }.bind(this)
      )
    },
    goDestination () {
      const url = `https://www.google.com/maps/dir/?api=1&origin=${this.maplocation.lat},${this.maplocation.lng}&destination=${this.choicedData.position}`
      window.open(url, '_blank')
    }
  }
}
</script>
