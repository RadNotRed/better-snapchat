import { DynamicRuleIds, PayloadNames, SettingIds } from '../../../common/constants';
import type { RuntimeMessage } from '../../../common/types';

const TYPING_NOTIFICATION_RULE = {
  id: DynamicRuleIds.BLOCK_PREVENT_TYPING_NOTIFICATION,
  priority: 1,
  action: { type: chrome.declarativeNetRequest.RuleActionType.BLOCK },
  condition: {
    urlFilter: 'messagingcoreservice.MessagingCoreService/SendTypingNotification',
    domains: ['snapchat.com'],
    resourceTypes: [chrome.declarativeNetRequest.ResourceType.XMLHTTPREQUEST],
  },
};

const PRESENCE_NOTIFICATION_RULE = {
  id: DynamicRuleIds.BLOCK_YOU_ARE_NO_LONGER_PRESENT_NOTIFICATION,
  priority: 2,
  action: { type: chrome.declarativeNetRequest.RuleActionType.BLOCK },
  condition: {
    urlFilter: 'web-analytics-v2/web/events',
    domains: ['web.snapchat.com'],
    resourceTypes: [chrome.declarativeNetRequest.ResourceType.XMLHTTPREQUEST],
  },
};

chrome.runtime.onMessage.addListener((message: RuntimeMessage) => {
  if (message.payloadName !== PayloadNames.SETTING_UPDATE) {
    return;
  }

  if (message.settingId === SettingIds.PREVENT_TYPING_NOTIFICATION) {
    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: [DynamicRuleIds.BLOCK_PREVENT_TYPING_NOTIFICATION],
      addRules: [TYPING_NOTIFICATION_RULE],
    });
  } else if (message.settingId === SettingIds.YOU_ARE_NO_LONGER_PRESENT_NOTIFICATION) {
    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: [DynamicRuleIds.BLOCK_YOU_ARE_NO_LONGER_PRESENT_NOTIFICATION],
      addRules: [PRESENCE_NOTIFICATION_RULE],
    });
  }
});
