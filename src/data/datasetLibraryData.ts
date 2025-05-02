// Dataset constants for the library

// Zambian Copperbelt specific datasets
export const ZAMBIAN_COPPERBELT_DATASETS = [
  {
    id: 'zm-cb1',
    name: 'Copperbelt Mineral Survey 2023',
    format: 'GeoJSON',
    source: 'Zambia Geological Survey Department',
    size: '42.8 MB',
    date: '2023-09-15',
    description: 'Comprehensive geological survey data from the Zambian Copperbelt region with detailed mineral distribution mapping and structural features. Includes core samples analysis and geochemical data from Kitwe, Ndola, and Chingola areas.',
    tags: ['Copper', 'Cobalt', 'Minerals', 'Survey', 'Copperbelt'],
    country: 'Zambia',
    coordinates: [-12.8159, 28.2401],
    relatedDocs: [
      { id: 'doc1', name: 'Copperbelt Technical Report', type: 'PDF', size: '15.2 MB' },
      { id: 'doc2', name: 'Mineral Grade Analysis', type: 'Excel', size: '8.4 MB' }
    ]
  },
  {
    id: 'zm-cb2',
    name: 'Konkola Deep Mining Project Data',
    format: 'Shapefile',
    source: 'Konkola Copper Mines',
    size: '38.3 MB',
    date: '2023-11-10',
    description: 'Geological and mining data from the Konkola Deep Mining Project, featuring stratigraphic columns, ore body models, and groundwater data. Includes technical specifications for mining operations below 1500m level.',
    tags: ['Deep Mining', 'Copper', 'Hydrogeology', 'Konkola'],
    country: 'Zambia',
    coordinates: [-12.5977, 27.8535],
    relatedDocs: [
      { id: 'doc3', name: 'Konkola Deep Mining Feasibility Study', type: 'PDF', size: '24.6 MB' },
      { id: 'doc4', name: 'Groundwater Management Plan', type: 'PDF', size: '12.8 MB' }
    ]
  },
  {
    id: 'zm-cb3',
    name: 'Mufulira Copper Mine Historical Data',
    format: 'CSV',
    source: 'Mopani Copper Mines',
    size: '17.5 MB',
    date: '2023-07-22',
    description: 'Historical production and geological records from Mufulira Mine (1933-present) including core samples, production statistics and geological cross-sections. Features detailed ore grade variations across different mining zones.',
    tags: ['Historical', 'Mining', 'Copper', 'Mufulira'],
    country: 'Zambia',
    coordinates: [-12.5490, 28.2406],
    relatedDocs: [
      { id: 'doc5', name: 'Mufulira Mine Historical Records (1933-1980)', type: 'PDF', size: '35.2 MB' },
      { id: 'doc6', name: 'Ore Grade Analysis (1980-Present)', type: 'Excel', size: '9.7 MB' }
    ]
  },
  {
    id: 'zm-cb4',
    name: 'Nchanga Open Pit Survey',
    format: 'GeoTIFF',
    source: 'Konkola Copper Mines',
    size: '56.7 MB',
    date: '2024-01-18',
    description: 'High-resolution survey of the Nchanga Open Pit with drone photogrammetry, structural geology mapping, and ore body modeling. Includes detailed stratigraphy and fault mapping with 3D visualization data.',
    tags: ['Open Pit', 'Copper', 'Survey', 'Nchanga'],
    country: 'Zambia',
    coordinates: [-12.5148, 27.8501],
    relatedDocs: [
      { id: 'doc7', name: 'Nchanga Open Pit Expansion Plan', type: 'PDF', size: '18.3 MB' },
      { id: 'doc8', name: 'Drone Survey Technical Specifications', type: 'PDF', size: '5.6 MB' }
    ]
  },
  {
    id: 'zm-cb5',
    name: 'Chambishi Geochemical Analysis',
    format: 'Excel',
    source: 'NFC Africa Mining',
    size: '12.2 MB',
    date: '2023-12-05',
    description: 'Comprehensive geochemical analysis of ore samples from Chambishi Mine with trace element composition and mineralogical studies. Features detailed analysis of cobalt and other critical minerals associated with copper deposits.',
    tags: ['Geochemical', 'Copper', 'Cobalt', 'Chambishi'],
    country: 'Zambia',
    coordinates: [-12.6621, 28.0539],
    relatedDocs: [
      { id: 'doc9', name: 'Chambishi Technical Report 2023', type: 'PDF', size: '22.1 MB' },
      { id: 'doc10', name: 'Critical Minerals Assessment', type: 'PowerPoint', size: '7.3 MB' }
    ]
  }
];

// Enhanced DRC datasets
export const DRC_DATASETS = [
  {
    id: 'drc1',
    name: 'Katanga Copper Deposits',
    format: 'GeoTIFF',
    source: 'DRC Ministry of Mines',
    size: '45.8 MB',
    date: '2024-01-10',
    description: 'High-resolution survey of the Katanga copper deposits with mineral grading and geological cross-sections. Includes soil sampling data and detailed structural mapping from Kolwezi and Tenke-Fungurume areas.',
    tags: ['Copper', 'Mining', 'Deposits', 'Katanga'],
    country: 'Democratic Republic of Congo',
    coordinates: [-10.7222, 25.5488],
    relatedDocs: [
      { id: 'doc11', name: 'Katanga Province Mineral Report', type: 'PDF', size: '28.6 MB' },
      { id: 'doc12', name: 'Copper-Cobalt Association Analysis', type: 'Excel', size: '12.8 MB' }
    ]
  },
  {
    id: 'drc2',
    name: 'Tenke-Fungurume Mine Data',
    format: 'Shapefile',
    source: 'Tenke Fungurume Mining',
    size: '36.7 MB',
    date: '2023-10-18',
    description: 'Detailed mining and geological data from the Tenke-Fungurume operations, including ore body models, grade distribution, and structural controls on mineralization. Features comprehensive cobalt distribution maps.',
    tags: ['Copper', 'Cobalt', 'Mine', 'Tenke'],
    country: 'Democratic Republic of Congo',
    coordinates: [-10.5775, 26.1692],
    relatedDocs: [
      { id: 'doc13', name: 'Tenke-Fungurume Technical Report 2023', type: 'PDF', size: '32.1 MB' },
      { id: 'doc14', name: 'Cobalt Resources Assessment', type: 'PDF', size: '15.7 MB' }
    ]
  },
  {
    id: 'drc3',
    name: 'Kolwezi Tailings Project',
    format: 'CSV',
    source: 'Metalkol RTR',
    size: '24.5 MB',
    date: '2024-02-08',
    description: 'Comprehensive data on the Kolwezi Tailings Reclamation Project, including grade distribution, processing techniques, and environmental monitoring. Features detailed recovery estimates and processing methodologies.',
    tags: ['Tailings', 'Reclamation', 'Copper', 'Cobalt', 'Kolwezi'],
    country: 'Democratic Republic of Congo',
    coordinates: [-10.7147, 25.4706],
    relatedDocs: [
      { id: 'doc15', name: 'Tailings Reclamation Technical Study', type: 'PDF', size: '26.3 MB' },
      { id: 'doc16', name: 'Environmental Impact Assessment', type: 'PDF', size: '18.9 MB' }
    ]
  }
];

// Other African datasets
export const OTHER_AFRICAN_DATASETS = [
  // Updated South Africa datasets
  {
    id: 'za1',
    name: 'Witwatersrand Gold Basin Analysis',
    format: 'GeoJSON',
    source: 'South African Geological Survey',
    size: '38.5 MB',
    date: '2024-02-15',
    description: 'Comprehensive structural and stratigraphic analysis of the Witwatersrand gold basin formations and deposits. Includes historical mining data, production statistics, and remaining reserve estimates from major mines.',
    tags: ['Gold', 'Mining', 'Basin Analysis', 'Witwatersrand'],
    country: 'South Africa',
    coordinates: [-26.2041, 28.0473],
    relatedDocs: [
      { id: 'doc17', name: 'Witwatersrand Basin Technical Report', type: 'PDF', size: '31.2 MB' },
      { id: 'doc18', name: 'Historical Gold Production Data', type: 'Excel', size: '8.6 MB' }
    ]
  },
  
  // Added Ghana datasets
  {
    id: 'gh1',
    name: 'Ashanti Gold Belt Survey',
    format: 'Shapefile',
    source: 'Ghana Geological Survey',
    size: '32.7 MB',
    date: '2024-01-25',
    description: 'Detailed mapping and survey data from the Ashanti Gold Belt including structural controls, mineralization styles, and exploration targets. Features comprehensive data from Obuasi, Tarkwa, and Ahafo mining districts.',
    tags: ['Gold', 'Mining', 'Structural Geology', 'Ashanti'],
    country: 'Ghana',
    coordinates: [6.6885, -1.6244],
    relatedDocs: [
      { id: 'doc19', name: 'Ashanti Gold Belt Exploration Guide', type: 'PDF', size: '27.3 MB' },
      { id: 'doc20', name: 'Ghana Mining Investment Report', type: 'PDF', size: '15.8 MB' }
    ]
  }
];

// Original datasets
export const ORIGINAL_DATASETS = [
  {
    id: '1',
    name: 'Sierra Nevada Survey',
    format: 'GeoJSON',
    source: 'USGS',
    size: '24.5 MB',
    date: '2023-10-15',
    description: 'Comprehensive geological survey data from Sierra Nevada region',
    tags: ['Geological', 'Survey', 'Mountains'],
    country: 'United States',
    coordinates: [38.9543, -120.1244],
    relatedDocs: [] // Adding empty array to ensure type consistency
  },
  {
    id: '2',
    name: 'Satellite Images 2023',
    format: 'GeoTIFF',
    source: 'DigitalGlobe',
    size: '156 MB',
    date: '2023-12-02',
    description: 'High-resolution satellite imagery of target exploration areas',
    tags: ['Remote Sensing', 'Satellite', 'Imagery'],
    country: 'Global',
    coordinates: [0, 0],
    relatedDocs: [] // Adding empty array to ensure type consistency
  },
  {
    id: '5',
    name: 'Mineral Distribution Map',
    format: 'GeoJSON',
    source: 'Research Team',
    size: '17.3 MB',
    date: '2024-03-05',
    description: 'Detailed mapping of mineral distributions across the survey area',
    tags: ['Minerals', 'Distribution', 'Mapping'],
    country: 'Canada',
    coordinates: [53.9333, -116.5765],
    relatedDocs: [] // Adding empty array to ensure type consistency
  },
];

// Combine all African datasets
export const AFRICAN_DATASETS = [
  ...ZAMBIAN_COPPERBELT_DATASETS,
  ...DRC_DATASETS,
  ...OTHER_AFRICAN_DATASETS
];

// Combined datasets
export const ALL_DATASETS = [...AFRICAN_DATASETS, ...ORIGINAL_DATASETS];

// Define the dataset type
export interface RelatedDocument {
  id: string;
  name: string;
  type: string;
  size: string;
}

export interface Dataset {
  id: string;
  name: string;
  format: string;
  source: string;
  size: string;
  date: string;
  description: string;
  tags: string[];
  country: string;
  coordinates: number[];
  relatedDocs: RelatedDocument[];
}
