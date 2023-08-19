import { PayloadNames, SettingIds } from '../../../common/constants';
import type { RuntimeMessage } from '../../../common/types';

const overrideHasFocusScript = `
  document.hasFocus = () => true;
`;

chrome.runtime.onMessage.addListener((message: RuntimeMessage) => {
  if (message.payloadName !== PayloadNames.SETTING_UPDATE) {
    return;
  }

  if (message.settingId === SettingIds.YOU_ARE_NO_LONGER_PRESENT_NOTIFICATION) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0] && tabs[0].id !== undefined) {
        chrome.tabs.executeScript(tabs[0].id, {
          code: overrideHasFocusScript,
        });
      }
    });
  }
});
