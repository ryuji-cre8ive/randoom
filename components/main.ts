export interface Item {
  showLabel: string,
  selectedValue: string
}

export interface MapOptions {
  streetViewControl: boolean,
  styles: []
}

export interface Icon {
  url: string, // url
  scaledSize: number, // scaled size
  origin: number, // origin
  anchor: number
}

export interface Marker {
  priceLevel: number
  rating: number,
  position: number,
  icon: Icon
  title: string,
  id: number,
  totalRatings: number,
  isOpen: boolean
}

export interface Position {
  lat: number,
  lng: number
}