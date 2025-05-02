
export interface GeoPoint {
  id: string;
  latitude: number;
  longitude: number;
  elevation?: number;
  properties?: Record<string, any>;
}
