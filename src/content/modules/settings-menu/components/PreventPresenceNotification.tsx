import { Checkbox, Text } from '@nextui-org/react';
import React from 'react';
import { SettingIds } from '../../../../common/constants';
import useSettingState from '../../../common/hooks/useSettingState';
import styles from './Checkbox.module.css';

export default function PreventPresenceNotification() {
  const [value, setValue] = useSettingState(SettingIds.YOU_ARE_NO_LONGER_PRESENT_NOTIFICATION);

  return (
    <Checkbox isSelected={value} onChange={(boolean) => setValue(boolean)}>
      <div className={styles.checkboxLabel}>
        <Text size={14} css={{ margin: 0 }}>
          Prevent You Are No Longer Present Notification
        </Text>
        <Text size={14} color="#999" css={{ margin: 0 }}>
          Always appear active on Snapchat web.
        </Text>
      </div>
    </Checkbox>
  );
}
