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
        
        <v-select :items="items" label="genre" v-model="searchWord" class="ma-8" @input="changeGenre">

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
// import { Chart, registerables } from "chart.js";
// import { PieChart } from "vue-chart-3";
// Chart.register(...registerables);

export default{
  middleware: "auth",
  components: {
    // PieChart,
  },
  data(){
    return {
      isFinishedMapping: false,
      searchWord: "",
      maplocation: { lng: 0, lat: 0 },
      zoom: 16,
      styleMap: {
        width: '100%',
        height: '400px',
      },
      items: [
        "point_of_interest",
        "cafe",
        "store",
        'meal_takeaway',
        "restaurant",
        "food",
        "supermarket",
        "place_of_worship",
        "establishment",
        "dentist",
        "health",
        "shoe_store",
        "grocery_or_supermarket",
        "meal_delivery",
      ],
      mapOptions: {
        streetViewControl: false,
        styles: [],
      },
      markers: [],
      colors: [
        "#ff7675",
        "#1e90ff",
        "#00ff7f",
        "#ffd700",
        "#ff1e1e",
        "#89ff14",
        "#0984e3",
        "#b8d200",
        "#ff00ff",
        "#ffff0a"
      ],
      choicedData: {},
      isfinishedChoice: false,
      isDecide: false
    }
  },
  async mounted() {
    const currentPosTmp = await this.getCurrentPosition()
    const currentPos = {
      lat: currentPosTmp.coords.latitude,
      lng: currentPosTmp.coords.longitude,
    }
    this.maplocation = currentPos
    console.log('maplocation',this.maplocation);

    
  },
  methods: {
    reset(){
      this.markers = [];
      this.searchWord = "";
      this.isFinishedMapping = false
    },
    changeGenre(){
      this.reset()
    },
    onClickMarker(marker) {
      this.$refs.mapRef.panTo(marker.position)
      this.infoWindowPos = marker.position
      this.marker = marker
      this.infoWinOpen = true
    },
    getCurrentPosition() {
      return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      })
    },
    randomChoice(searchPlace){
      this.setPlaceMakers(searchPlace);
      this.isFinishedMapping = true
      
    },
    getChoice(){
      console.log(this.markers)
      const numOfMarkers = this.markers.length;
      const numrandom = Math.floor(Math.random() * numOfMarkers);
      console.log(this.markers[numrandom]);
      this.choicedData = this.markers[numrandom];
      this.$refs.mapRef.panTo(this.markers[numrandom].position)
      this.isfinishedChoice = true;
      
    },

    setPlaceMakers(searchPlace) {
      let map = this.$refs.mapRef.$mapObject
      let placeService = new google.maps.places.PlacesService(map);
      
      // Places APIのnearbySearchを使用する。
      placeService.nearbySearch(
        {
          location: new google.maps.LatLng(this.maplocation.lat, this.maplocation.lng),
          radius: 500,
          type: [searchPlace]
        },
        async function(results, status) {
          
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            results.forEach(place => {
              console.log(place)
              // console.log(place)
              // console.log('isOpen',place.opening_hours.isOpen(new Date()))
              // デフォルトのアイコンが大きめなので縮小
              let icon = {
                url: place.icon, // url
                scaledSize: new google.maps.Size(30, 30), // scaled size
                origin: new google.maps.Point(0,0), // origin
                anchor: new google.maps.Point(0, 0) // anchor
              };
              let marker = {
                priceLevel: place.price_level,
                rating: place.rating,
                position: place.geometry.location,
                icon: icon,
                title: place.name,
                id: place.place_id,
                totalRatings: place.user_ratings_total,
                // isOpen: place.opening_hours.isOpen
              };
              this.markers.push(marker);
              
            });
          }
        }.bind(this)
      );
    },
    goDestination() {
      const url = `https://www.google.com/maps/dir/?api=1&origin=${this.maplocation.lat},${this.maplocation.lng}&destination=${this.choicedData.position}`;
      window.open(url, '_blank');
    }
  },
}
</script>