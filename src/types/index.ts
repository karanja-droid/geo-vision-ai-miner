
// Re-export all types from domain-specific files
export * from './layers';
export * from './analysis';
export * from './datasets';
export * from './models';
// Export everything except StakeholderOrganization from organizations
// since it's already exported from datasets.ts
export * from './organizations';
export * from './users';
export * from './tasks';
export * from './communication';
export * from './workflow';
export * from './conflicts';
export * from './risk';

// Export geo types, avoiding duplicate ShapefileValidationResult
import { GeoPoint } from './geo';
export { GeoPoint };

// Re-export everything else from geo
import type { ShapefileValidationResult } from './geo';
export type { ShapefileValidationResult };
