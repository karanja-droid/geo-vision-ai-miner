
import { useToast } from "@/components/ui/use-toast";
import { GeoAnalysisResult } from '@/types/datasets';

/**
 * Creates a toast notification for completed analyses
 */
export const showAnalysisCompletionToast = (
  toast: ReturnType<typeof useToast>["toast"],
  analysisType: string,
  params: Record<string, any>
) => {
  console.log("Showing analysis completion toast", { analysisType, params });
  
  let description = "";
  
  switch (analysisType) {
    case "buffer":
      description = `Buffer analysis completed with ${params.distance}${params.unit} distance`;
      break;
    case "intersection":
      description = "Intersection analysis completed successfully";
      break;
    case "union":
      description = "Union analysis completed successfully";
      break;
    case "query":
      description = `Query analysis completed with ${params.expression || "custom expression"}`;
      break;
    default:
      description = "Analysis completed successfully";
  }
  
  toast({
    title: "Analysis Complete",
    description,
  });
};

export const validateAnalysisParameters = (
  analysisType: string, 
  params: Record<string, any>
): { isValid: boolean; message?: string } => {
  console.log("Validating analysis parameters", { analysisType, params });
  
  switch (analysisType) {
    case "buffer":
      if (!params.distance || params.distance <= 0) {
        return { isValid: false, message: "Buffer distance must be greater than 0" };
      }
      if (!params.unit) {
        return { isValid: false, message: "Buffer unit is required" };
      }
      break;
      
    case "query":
      if (!params.expression || params.expression.trim() === "") {
        return { isValid: false, message: "Query expression is required" };
      }
      break;
  }
  
  return { isValid: true };
};
