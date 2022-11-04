<template>
  <v-app align="center">
    <v-main>
      <v-card height="700" width="600">
        <GmapMap
          ref="mapRef"
          map-type-id="roadmap"
          :center="maplocation"
          :zoom="zoom"
          :style="styleMap"
          :options="mapOptions"
        >
          <GmapMarker
            v-for="(m, index) in markers"
            :key="index"
            :title="m.title"
            :position="m.position"
            :clickable="true"
            :draggable="false"
            :icon="m.icon"
            @click="onClickMarker(m)"
          />
        </GmapMap>

        <!-- カードコピペ -->
        <v-overlay :value="isfinishedChoice" absolute>
          <v-card
            class="mx-auto my-12 pa-3"
            width="400"
          >
            <template slot="progress">
              <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
              />
            </template>

            <v-card-title>{{ choicedData.title }}</v-card-title>

            <v-card-text>
              <v-row
                align="center"
                class="mx-0"
              >
                <v-rating
                  :value="choicedData.rating"
                  color="amber"
                  dense
                  half-increments
                  readonly
                  size="14"
                />
                <div class="grey--text ms-4">
                  {{ choicedData.rating }} ({{ choicedData.totalRatings }})
                </div>
              </v-row>
              <v-row
                align="center"
                class="mx-0"
              >
                <div v-if="choicedData.priceLevel" class="grey--text ms-4">
                  値段帯: {{ choicedData.priceLevel }}
                </div>
              </v-row>
              <v-row
                align="center"
                class="mx-0"
              >
                <div class="grey--text ms-4">
                  今の時間でやってるか: {{ choicedData.isOpen ? "やってる" : "やってない" }}
                </div>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-btn color="error" @click="isfinishedChoice = !isfinishedChoice">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-spacer />
              <v-btn color="primary" @click="goDestination">
                ルートを表示する
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-overlay>
        <v-select
          :items="items"
          item-text="showLabel"
          item-value="selectedValue"
          label="genre"
          class="ma-8"
          return-object
          @input="changeGenre"
        />
        <v-card-actions class="pa-8">
          <v-btn v-if="!isFinishedMapping" color="primary" @click="randomChoice">
            検索する
          </v-btn>
          <v-btn v-if="isFinishedMapping" color="success" @click="getChoice">
            抽選!
          </v-btn>
          <v-spacer />
          <v-btn color="error" @click="reset">
            結果をリセット
          </v-btn>
        </v-card-actions>
        <!-- <PieChart v-if="isFinishedMapping" :chartData="pieData"></PieChart> -->
      </v-card>
    </v-main>
  </v-app>
</template>

<script lang="ts">
// import { Chart, registerables } from "chart.js"
// import { PieChart } from "vue-chart-3"
// Chart.register(...registerables)
import { Component, Vue } from 'nuxt-property-decorator'
import gmapApi from '../plugins/vue2-google-maps'
import { Item, MapOptions, Marker, Position } from '../components/main'

@Component({
  middleware: 'auth'
})

export default class Main extends Vue {
  searchWord = ''
  isFinishedMapping = false
  maplocation = { lng: 0, lat: 0 }
  zoom = 16
  styleMap = {
    width: '100%',
    height: '400px'
  }

  infoWinOpen = false
  marker = null
  infoWindowPos = null

  get refs (): any {
    return this.$refs
  }

  items: Item[] = [
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
  ]

  mapOptions: MapOptions = {
    streetViewControl: false,
    styles: []
  }

  markers: Marker[] = []
  colors = [
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
  ]

  choicedData = {} as Marker
  isfinishedChoice = false
  isDecide = false

  get google () {
    return gmapApi
  }

  async beforeMount () {
    const currentPosTmp: any = await this.getCurrentPosition()
    const currentPos: Position = {
      lat: currentPosTmp.coords.latitude,
      lng: currentPosTmp.coords.longitude
    }
    this.maplocation = currentPos
  }

  reset () {
    this.markers = []
    this.searchWord = ''
    this.isFinishedMapping = false
  }

  changeGenre (event: any) {
    this.reset()
    this.searchWord = event.selectedValue
  }

  onClickMarker (marker: any) {
    if (this.$refs.mapRef) {
      (this as any).$refs.mapRef.panTo(marker.position)
      this.infoWindowPos = marker.position
      this.marker = marker
      this.infoWinOpen = true
    }
  }

  getCurrentPosition () {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    })
  }

  randomChoice () {
    this.setPlaceMakers()
    this.isFinishedMapping = true
  }

  getChoice () {
    const numOfMarkers = this.markers.length
    const numrandom = Math.floor(Math.random() * numOfMarkers)
    this.choicedData = this.markers[numrandom];
    (this as any).$refs.mapRef.panTo(this.markers[numrandom].position)
    this.isfinishedChoice = true
  }

  setPlaceMakers () {
    if (this.$refs.mapRef) {
      const map = (this as any).$refs.mapRef.$mapObject
      const placeService = new (this as any).google.maps.places.PlacesService(map)
      // Places APIのnearbySearchを使用する。
      placeService.nearbySearch(
        {
          location: new (this as any).google.maps.LatLng(this.maplocation.lat, this.maplocation.lng),
          radius: 500,
          type: [this.searchWord]
        },
        (results: any, status: any) => {
          if (status === (this as any).google.maps.places.PlacesServiceStatus.OK) {
            results.forEach((place: any) => {
              // デフォルトのアイコンが大きめなので縮小
              const icon = {
                url: place.icon, // url
                scaledSize: new (this as any).google.maps.Size(30, 30), // scaled size
                origin: new (this as any).google.maps.Point(0, 0), // origin
                anchor: new (this as any).google.maps.Point(0, 0) // anchor
              }
              const marker: Marker = {
                priceLevel: place.price_level,
                rating: place.rating,
                position: place.geometry.location,
                icon,
                title: place.name,
                id: place.place_id,
                totalRatings: place.user_ratings_total,
                isOpen: place.opening_hours.isOpen ? place.opening_hours.isOpen : false
              }
              this.markers.push(marker)
            })
          }
        }
      )
    }
  }

  goDestination () {
    const url = `https://www.google.com/maps/dir/?api=1&origin=${this.maplocation.lat},${this.maplocation.lng}&destination=${this.choicedData.position}`
    window.open(url, '_blank')
  }
}
</script>
