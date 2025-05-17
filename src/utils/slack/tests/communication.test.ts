
import { assertEquals, assertExists } from "https://deno.land/std/testing/asserts.ts";
import { sendDirectMessage, sendUserMessage, shareInsightsToSlack } from "../communication";
import { getSlackConfig, saveSlackConfig, defaultSlackConfig } from "../config";
import * as sender from "../sender";
import { SlackIntegration } from "@/types";

// Mock the sendToSlack function
const mockSendToSlack = async () => true;
sender.sendToSlack = mockSendToSlack as any;

// Mock toast notifications
globalThis.toast = () => {};

Deno.test("getSlackConfig returns default config when no saved config exists", () => {
  // Mock localStorage
  globalThis.localStorage = {
    getItem: () => null,
    setItem: () => {},
  } as any;

  const config = getSlackConfig();
  assertEquals(config, defaultSlackConfig);
});

Deno.test("saveSlackConfig correctly stores config in localStorage", () => {
  let storedData = "";
  
  // Mock localStorage
  globalThis.localStorage = {
    getItem: () => storedData,
    setItem: (key: string, value: string) => {
      if (key === 'slackIntegration') {
        storedData = value;
      }
    },
  } as any;

  const testConfig: SlackIntegration = {
    webhookUrl: 'https://test.slack.com/webhook',
    enabled: true,
    channelMappings: [],
    notificationPreferences: [],
    monitoringSettings: {
      errorMonitoring: true,
      performanceMonitoring: true,
      apiMonitoring: false,
      errorThreshold: 5,
      performanceThreshold: 1000,
      alertChannel: 'alerts',
      alertFrequency: 'immediate',
      monitorWarnings: true
    }
  };

  saveSlackConfig(testConfig);
  
  // Verify saved data
  const savedConfig = JSON.parse(storedData);
  assertEquals(savedConfig.webhookUrl, testConfig.webhookUrl);
  assertEquals(savedConfig.enabled, testConfig.enabled);
  assertEquals(savedConfig.monitoringSettings?.errorMonitoring, testConfig.monitoringSettings?.errorMonitoring);
});

Deno.test("sendDirectMessage sends message with correct parameters", async () => {
  // Mock localStorage to return enabled config
  globalThis.localStorage = {
    getItem: () => JSON.stringify({
      webhookUrl: 'https://test.slack.com/webhook',
      enabled: true,
      channelMappings: [],
      notificationPreferences: []
    }),
    setItem: () => {},
  } as any;
  
  // Create spy for sendToSlack
  let sentMessage = "";
  let sentChannel = "";
  let sentAttachments: any[] = [];
  
  sender.sendToSlack = async (message: string, channelId?: string, attachments?: any[]) => {
    sentMessage = message;
    sentChannel = channelId || '';
    sentAttachments = attachments || [];
    return true;
  };
  
  const result = await sendDirectMessage("Test message", "general", undefined, { notifyUser: false });
  
  assertEquals(result, true);
  assertEquals(sentMessage, "Test message");
  assertEquals(sentChannel, "general");
});

Deno.test("sendUserMessage formats user messages correctly", async () => {
  // Mock sendToSlack to capture the message
  let capturedMessage = "";
  
  sender.sendToSlack = async (message: string) => {
    capturedMessage = message;
    return true;
  };
  
  await sendUserMessage(
    "Hello team",
    "John Doe",
    "Geologist",
    "geological-team",
    { notifyUser: false, includeTimestamp: true }
  );
  
  // Check that message contains expected parts
  assertEquals(capturedMessage.includes("John Doe"), true);
  assertEquals(capturedMessage.includes("Geologist"), true);
  assertEquals(capturedMessage.includes("Hello team"), true);
});

Deno.test("shareInsightsToSlack formats insights correctly", async () => {
  // Mock sendToSlack to capture the message
  let capturedMessage = "";
  
  sender.sendToSlack = async (message: string) => {
    capturedMessage = message;
    return true;
  };
  
  const insights = [
    "Anomaly detected in northern region",
    "Potential mineral deposit found",
    "Correlation between satellite data and ground samples confirmed"
  ];
  
  await shareInsightsToSlack(insights, "Weekly Analysis Summary", "analysis-team");
  
  // Check that message contains all insights in bullet point format
  for (const insight of insights) {
    assertEquals(capturedMessage.includes(insight), true);
    assertEquals(capturedMessage.includes("•"), true);
  }
  
  assertEquals(capturedMessage.includes("Weekly Analysis Summary"), true);
});
