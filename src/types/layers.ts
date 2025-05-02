
export interface DataLayer {
  id: string;
  name: string;
  type: 'raster' | 'vector' | 'point' | 'heatmap' | 'line';
  visible: boolean;
  opacity: number;
  data: any;
}
