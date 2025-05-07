
// Sample markers for geological sites
export const sampleMarkers = [
  { lng: -74.0060, lat: 40.7128, name: "Sample Site A", type: "Gold Deposit" },
  { lng: -118.2437, lat: 34.0522, name: "Sample Site B", type: "Copper Mine" },
  { lng: 2.3522, lat: 48.8566, name: "Sample Site C", type: "Iron Ore" },
  { lng: 139.6917, lat: 35.6895, name: "Sample Site D", type: "Rare Earth Elements" },
  { lng: -43.1729, lat: -22.9068, name: "Sample Site E", type: "Lithium Field" },
  { lng: 27.8493, lat: -13.1339, name: "Zambia Mine", type: "Copper Deposit" },
  { lng: 23.6566, lat: -2.8766, name: "DRC Site", type: "Cobalt Mine" },
];

// Simplistic Africa country polygons for demonstration
export const zambiaPolygon = [
  { lat: -8.2, lng: 22.0 }, { lat: -8.2, lng: 33.0 }, 
  { lat: -18.0, lng: 33.0 }, { lat: -18.0, lng: 22.0 }
];

export const drcPolygon = [
  { lat: 5.4, lng: 12.2 }, { lat: 5.4, lng: 31.3 }, 
  { lat: -13.5, lng: 31.3 }, { lat: -13.5, lng: 12.2 }
];

// Default map layers
export const defaultLayers = [
  { id: 'terrain', name: 'Terrain', type: 'terrain', visible: false, opacity: 0.7 },
  { id: 'satellite', name: 'Satellite', type: 'satellite', visible: true, opacity: 1 },
  { id: 'roadmap', name: 'Streets', type: 'roadmap', visible: false, opacity: 0.8 },
  { id: 'africa-countries', name: 'Africa Countries', type: 'polygon', visible: false, opacity: 0.8 },
];

// Sample locations to fly to
export const mapLocations = {
  'usa': { lat: 37.0902, lng: -95.7129, zoom: 4 },
  'europe': { lat: 54.5260, lng: 15.2551, zoom: 4 },
  'africa': { lat: 5.7832, lng: 19.4326, zoom: 3 },
  'asia': { lat: 34.0479, lng: 103.8198, zoom: 3 },
  'australia': { lat: -25.2744, lng: 133.7751, zoom: 4 }
};
