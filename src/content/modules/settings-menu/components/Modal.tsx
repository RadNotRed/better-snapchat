import React from 'react';
import { Modal, Button, Text } from '@nextui-org/react';
import AllowScreenshot from './AllowScreenshot';
import PreventTypingNotification from './PreventTyping';
import SaveImage from './SaveImage';
import PreventPresenceNotification from './PreventPresenceNotification';
import styles from './Modal.module.css';

export default function App({ visible, closeHandler }: { visible: boolean; closeHandler: () => void }) {
  return (
    <Modal closeButton aria-labelledby="modal-title" open={visible} onClose={closeHandler}>
      <Modal.Header>
        <Text id="modal-title" size={18}>
          Better Snapchat
        </Text>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.checkboxColumn}>
          <AllowScreenshot />
          <PreventTypingNotification />
          <PreventPresenceNotification />
          <SaveImage />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button flat auto onPress={closeHandler}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
