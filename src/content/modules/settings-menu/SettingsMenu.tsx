import React from 'react';
import { createRoot } from 'react-dom/client';
import ModalButton from './components/Button';
import dom from '../../observers/dom';

const CLOSE_BUTTON_SELECTOR = '[title="Close Chat"]';

let mountedButtonRoot: any = null;

class SettingsMenu {
  constructor() {
    this.load();
    dom.on(CLOSE_BUTTON_SELECTOR, this.load);
  }

  load() {
    const node: HTMLElement | null = document.querySelector(CLOSE_BUTTON_SELECTOR);

    if (node == null) {
      return;
    }

    if (mountedButtonRoot != null) {
      mountedButtonRoot.unmount();
    }

    const buttonsContainer = node.parentNode;
    const contentContainer = document.createElement('div');
    contentContainer.setAttribute('id', 'modalOpenButton');
    buttonsContainer?.append(contentContainer);

    mountedButtonRoot = createRoot(contentContainer);

    mountedButtonRoot.render(<ModalButton />);
  }
}

export default new SettingsMenu();
