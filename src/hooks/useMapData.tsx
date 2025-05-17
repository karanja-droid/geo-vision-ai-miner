
import { useState, useEffect } from 'react';
import { useGeoPoints } from '@/hooks/database/useGeoPoints';
import { useMines } from '@/contexts/MinesContext';
import { handleError } from '@/utils/errorHandler';

export interface MapPoint {
  id: string;
  latitude: number;
  longitude: number;
  name?: string;
  type?: string;
  properties?: Record<string, any>;
}

export interface MapLayer {
  id: string;
  name: string;
  type: 'point' | 'polygon' | 'line' | 'raster' | 'base';
  source: 'geopoints' | 'mines' | 'local' | 'remote';
  visible: boolean;
  opacity: number;
  data: MapPoint[] | any;
  color?: string;
}

export const useMapData = (activeDatasetId?: string | null) => {
  const [layers, setLayers] = useState<MapLayer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  
  const { getGeoPointsByDataset } = useGeoPoints();
  const { mines, loading: minesLoading } = useMines();
  
  const fetchPoints = async () => {
    if (!activeDatasetId) return [];
    
    try {
      const points = await getGeoPointsByDataset(activeDatasetId);
      return points.map(point => ({
        id: point.id,
        latitude: point.latitude,
        longitude: point.longitude,
        name: point.properties?.name || `Point ${point.id.substring(0, 6)}`,
        type: point.properties?.type || 'general',
        properties: point.properties
      }));
    } catch (err) {
      handleError(err, "Failed to load geographic points", "medium", {
        component: "useMapData",
        action: "fetchPoints",
        additionalInfo: { datasetId: activeDatasetId }
      });
      return [];
    }
  };
  
  const getMinePoints = () => {
    return mines.map(mine => ({
      id: mine.id,
      latitude: mine.location.latitude,
      longitude: mine.location.longitude,
      name: mine.name,
      type: mine.status,
      properties: {
        minerals: mine.minerals,
        owner: mine.owner,
        status: mine.status,
        country: mine.location.country
      }
    }));
  };
  
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Create base layers (always available)
        const baseLayers: MapLayer[] = [
          {
            id: 'satellite',
            name: 'Satellite',
            type: 'base',
            source: 'remote',
            visible: true,
            opacity: 1,
            data: null
          },
          {
            id: 'terrain',
            name: 'Terrain',
            type: 'base',
            source: 'remote',
            visible: false,
            opacity: 1,
            data: null
          },
          {
            id: 'roadmap',
            name: 'Road Map',
            type: 'base',
            source: 'remote',
            visible: false,
            opacity: 1,
            data: null
          }
        ];
        
        // Add data layers
        const dataLayers: MapLayer[] = [];
        
        // Add GeoPoints layer if a dataset is selected
        if (activeDatasetId) {
          const points = await fetchPoints();
          if (points.length > 0) {
            dataLayers.push({
              id: `geopoints-${activeDatasetId}`,
              name: 'Dataset Points',
              type: 'point',
              source: 'geopoints',
              visible: true,
              opacity: 0.9,
              data: points,
              color: '#3B82F6' // blue
            });
          }
        }
        
        // Add mines layer
        if (!minesLoading && mines.length > 0) {
          const minePoints = getMinePoints();
          dataLayers.push({
            id: 'mines',
            name: 'Mining Sites',
            type: 'point',
            source: 'mines',
            visible: true,
            opacity: 0.9,
            data: minePoints,
            color: '#F59E0B' // amber
          });
        }
        
        // Add Africa countries polygon layer
        dataLayers.push({
          id: 'africa-countries',
          name: 'African Countries',
          type: 'polygon',
          source: 'local',
          visible: false,
          opacity: 0.6,
          data: null
        });
        
        setLayers([...baseLayers, ...dataLayers]);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load map data'));
        handleError(err, "Failed to load map data", "medium", {
          component: "useMapData",
          action: "loadData"
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [activeDatasetId, minesLoading, mines]);
  
  const toggleLayer = (id: string) => {
    if (id === 'terrain' || id === 'satellite' || id === 'roadmap') {
      // For base layers, only one can be visible at a time
      setLayers(layers.map(layer => 
        layer.id === 'terrain' || layer.id === 'satellite' || layer.id === 'roadmap' 
          ? { ...layer, visible: layer.id === id } 
          : layer
      ));
    } else {
      // For other layers, toggle visibility
      setLayers(layers.map(layer => 
        layer.id === id ? { ...layer, visible: !layer.visible } : layer
      ));
    }
  };
  
  const updateOpacity = (id: string, opacity: number) => {
    setLayers(layers.map(layer => 
      layer.id === id ? { ...layer, opacity } : layer
    ));
  };
  
  return {
    layers,
    loading,
    error,
    toggleLayer,
    updateOpacity
  };
};
