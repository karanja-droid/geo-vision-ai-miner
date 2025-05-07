
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { ShapefileValidationResult } from '@/types/datasets';

interface ValidationResultProps {
  validationResult: ShapefileValidationResult;
}

const ValidationResult: React.FC<ValidationResultProps> = ({ validationResult }) => {
  console.log("Rendering ValidationResult component", validationResult);
  
  if (!validationResult) return null;
  
  return (
    <Alert className={validationResult.isValid ? "bg-success/20" : "bg-destructive/20"}>
      <AlertTitle className={validationResult.isValid ? "text-success" : "text-destructive"}>
        {validationResult.isValid ? "Validation Successful" : "Validation Failed"}
      </AlertTitle>
      <AlertDescription>
        <div className="text-sm">
          {validationResult.features !== undefined && <p>Features: {validationResult.features}</p>}
          {validationResult.crs && <p>CRS: {validationResult.crs}</p>}
          {validationResult.warnings && validationResult.warnings.length > 0 && (
            <div className="mt-2">
              <p className="font-medium text-amber-600">Warnings:</p>
              <ul className="list-disc pl-5">
                {validationResult.warnings.map((warning, i) => (
                  <li key={i} className="text-amber-600 text-xs">{warning}</li>
                ))}
              </ul>
            </div>
          )}
          {validationResult.errors && validationResult.errors.length > 0 && (
            <div className="mt-2">
              <p className="font-medium text-destructive">Errors:</p>
              <ul className="list-disc pl-5">
                {validationResult.errors.map((error, i) => (
                  <li key={i} className="text-destructive text-xs">{error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default ValidationResult;
