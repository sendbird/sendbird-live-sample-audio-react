
import React from 'react';
import { SendBirdProvider } from '@sendbird/uikit-react';

import CreateEventView from '..';
import DimBackground from '../../../ui/DimBackground';
import { SAMPLE_APP_ID, SAMPLE_USER_ID } from '../../../components/storybookConfig';

export default { title: 'UI Components/CreateEventView' };

export const simple = () => (
  <SendBirdProvider appId={SAMPLE_APP_ID} userId={SAMPLE_USER_ID}>
    <DimBackground body={<CreateEventView
      onClose={() => console.log('CreateEventView closed.')} />} />
  </SendBirdProvider>
);

export const noACL = () => (
  <SendBirdProvider appId={SAMPLE_APP_ID} userId={SAMPLE_USER_ID}>
    <DimBackground body={<CreateEventView
      disableAcl={true}
      onClose={() => console.log('CreateEventView closed.')} />} />
  </SendBirdProvider>
);