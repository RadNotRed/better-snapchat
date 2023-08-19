import { EventTypes, SettingIds } from '../../../common/constants';
import settings from '../../lib/settings';

const originalHasFocus = document.hasFocus;

class PreventPresence {
  constructor() {
    this.load();
    settings.on(`${SettingIds.YOU_ARE_NO_LONGER_PRESENT_NOTIFICATION}.${EventTypes.SETTING_UPDATE}`, this.load);
  }

  load() {
    const enabled = settings.getSetting(SettingIds.YOU_ARE_NO_LONGER_PRESENT_NOTIFICATION);

    if (enabled) {
      document.hasFocus = () => true;
    } else {
      document.hasFocus = originalHasFocus;
    }
  }
}

export default new PreventPresence();
