
import { DataLayer } from '@/types';

// Mock layers for demo
export const initialLayers: DataLayer[] = [
  { id: '1', name: 'Satellite Imagery', type: 'raster', visible: true, opacity: 1, data: null },
  { id: '2', name: 'Geological Map', type: 'vector', visible: true, opacity: 0.8, data: null },
  { id: '3', name: 'Soil Samples', type: 'point', visible: true, opacity: 1, data: null },
  { id: '4', name: 'Mineral Prediction', type: 'heatmap', visible: true, opacity: 0.7, data: null },
];

// African geological layers
export const africanLayers: DataLayer[] = [
  { id: 'af1', name: 'Zambia Copperbelt', type: 'vector', visible: true, opacity: 0.9, data: null },
  { id: 'af2', name: 'DRC Mineral Deposits', type: 'point', visible: true, opacity: 1, data: null },
  { id: 'af3', name: 'African Lithology', type: 'raster', visible: true, opacity: 0.7, data: null },
  { id: 'af4', name: 'Mining Concessions', type: 'vector', visible: false, opacity: 0.8, data: null },
  { id: 'af5', name: 'Geological Faults', type: 'line', visible: true, opacity: 1, data: null },
];
