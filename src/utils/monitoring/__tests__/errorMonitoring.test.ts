
import { handleWindowError, handleUnhandledRejection, handleConsoleWarning } from "../handlers/errorHandlers";
import * as errorAlerts from "../alerts/errorAlerts";

// Mock necessary functions
jest.mock("../../slack/config", () => ({
  getSlackConfig: jest.fn(() => ({
    enabled: true,
    monitoringSettings: {
      errorMonitoring: true,
      monitorWarnings: true
    }
  }))
}));

jest.mock("../alerts/errorAlerts", () => ({
  sendErrorAlert: jest.fn(() => Promise.resolve(true))
}));

// Helper to create mock error events
const createMockErrorEvent = (message: string): ErrorEvent => {
  return {
    message,
    filename: 'test.ts',
    lineno: 10,
    colno: 20,
    error: new Error(message),
  } as ErrorEvent;
};

// Helper to create mock promise rejection events
const createMockPromiseRejectionEvent = (reason: any): PromiseRejectionEvent => {
  return {
    reason,
    promise: Promise.resolve(),
    preventDefault: () => {},
  } as PromiseRejectionEvent;
};

describe("Error Monitoring", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("handleWindowError processes error events", () => {
    const mockEvent = createMockErrorEvent("Test error");
    handleWindowError(mockEvent);
    
    expect(errorAlerts.sendErrorAlert).toHaveBeenCalledWith(
      "Test error",
      "error",
      expect.objectContaining({
        filename: "test.ts",
      })
    );
  });

  test("handleUnhandledRejection processes Error objects", () => {
    const error = new Error("Test rejection");
    const mockEvent = createMockPromiseRejectionEvent(error);
    
    handleUnhandledRejection(mockEvent);
    
    expect(errorAlerts.sendErrorAlert).toHaveBeenCalledWith(
      "Test rejection",
      "error",
      expect.objectContaining({
        stack: expect.any(String)
      })
    );
  });

  test("handleUnhandledRejection processes string rejections", () => {
    const mockEvent = createMockPromiseRejectionEvent("String rejection");
    handleUnhandledRejection(mockEvent);
    
    expect(errorAlerts.sendErrorAlert).toHaveBeenCalledWith(
      "String rejection",
      "error",
      expect.any(Object)
    );
  });

  test("handleConsoleWarning processes warning messages", () => {
    handleConsoleWarning("Test warning", { detail: "More information" });
    
    expect(errorAlerts.sendErrorAlert).toHaveBeenCalledWith(
      "Console Warning: Test warning",
      "warning",
      expect.objectContaining({
        arguments: expect.any(String)
      })
    );
  });
});
