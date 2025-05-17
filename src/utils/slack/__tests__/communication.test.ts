
import { sendDirectMessage, sendUserMessage, shareInsightsToSlack } from "../communication";
import * as config from "../config";
import * as sender from "../sender";
import { toast } from "@/hooks/use-toast";

// Mock toast function
jest.mock("@/hooks/use-toast", () => ({
  toast: jest.fn()
}));

// Mock the sendToSlack function
jest.mock("../sender", () => ({
  sendToSlack: jest.fn().mockResolvedValue(true)
}));

// Mock getSlackConfig
jest.mock("../config", () => ({
  getSlackConfig: jest.fn().mockReturnValue({
    webhookUrl: "https://test.slack.com/webhook",
    enabled: true
  })
}));

describe("Slack Communication", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("sendDirectMessage sends message with correct parameters", async () => {
    const result = await sendDirectMessage("Test message", "general");
    
    expect(sender.sendToSlack).toHaveBeenCalledWith("Test message", "general", undefined);
    expect(result).toBe(true);
  });

  test("sendDirectMessage handles notifications", async () => {
    await sendDirectMessage("Test message", "general", undefined, { notifyUser: true });
    
    expect(toast).toHaveBeenCalled();
  });

  test("sendDirectMessage handles disabled Slack", async () => {
    jest.spyOn(config, "getSlackConfig").mockReturnValueOnce({
      webhookUrl: "",
      enabled: false,
      channelMappings: [],
      notificationPreferences: []
    });
    
    const result = await sendDirectMessage("Test message", "general");
    
    expect(result).toBe(false);
    expect(sender.sendToSlack).not.toHaveBeenCalled();
  });

  test("sendUserMessage formats user messages correctly", async () => {
    await sendUserMessage(
      "Hello team",
      "John Doe",
      "Geologist",
      "geological-team",
      { notifyUser: false, includeTimestamp: true }
    );
    
    expect(sender.sendToSlack).toHaveBeenCalledWith(
      expect.stringContaining("*John Doe* (Geologist)"),
      "geological-team",
      expect.any(Array),
      expect.any(Object)
    );
  });

  test("shareInsightsToSlack formats insights correctly", async () => {
    const insights = [
      "Anomaly detected in northern region",
      "Potential mineral deposit found"
    ];
    
    await shareInsightsToSlack(insights, "Weekly Analysis Summary", "analysis-team");
    
    expect(sender.sendToSlack).toHaveBeenCalledWith(
      expect.stringContaining("• Anomaly detected in northern region"),
      "analysis-team",
      expect.any(Array),
      expect.any(Object)
    );
  });
});
