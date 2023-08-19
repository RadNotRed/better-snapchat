import React from 'react';
import { createRoot } from 'react-dom/client';
import SaveButton from './components/Button';
import settings from '../../lib/settings';
import { EventTypes, SettingIds } from '../../../common/constants';
import dom from '../../observers/dom';

const CLOSE_BUTTON_SELECTOR = '[title="Close"]';

let mountedButtonRoot: any = null;

class SaveImage {
  constructor() {
    this.load();
    dom.on(CLOSE_BUTTON_SELECTOR, this.load);
    settings.on(`${SettingIds.SAVE_IMAGE_BUTTON}.${EventTypes.SETTING_UPDATE}`, this.load);
  }

  load() {
    if (!settings.getSetting(SettingIds.SAVE_IMAGE_BUTTON)) {
      if (mountedButtonRoot != null) {
        mountedButtonRoot.unmount();
        mountedButtonRoot = null;
      }

      return;
    }

    const node: HTMLElement | null = document.querySelector(CLOSE_BUTTON_SELECTOR);
    if (node == null) {
      return;
    }

    if (mountedButtonRoot != null) {
      mountedButtonRoot.unmount();
      mountedButtonRoot = null;
    }

    const imageContainer = node.parentNode as Element;
    if (imageContainer == null) {
      return;
    }

    const contentContainer = document.createElement('div');
    contentContainer.setAttribute('id', 'saveImageButton');
    imageContainer?.prepend(contentContainer);
    mountedButtonRoot = createRoot(contentContainer);
    mountedButtonRoot.render(<SaveButton parentNode={imageContainer} />);
  }
}

export default new SaveImage();
