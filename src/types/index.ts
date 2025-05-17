
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

// Export geo types properly with export type syntax
export type { GeoPoint } from './geo';

// Re-export ShapefileValidationResult with export type to fix isolatedModules error
export type { ShapefileValidationResult } from './geo';
