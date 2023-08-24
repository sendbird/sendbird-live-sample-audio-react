
import React from 'react';
import { LiveEvent, SendbirdLive } from '@sendbird/live';
import SendbirdLiveProvider from '../../../lib/sendbirdLive';

import RightPanel, { RightPanelComponentType } from '..';
import { SAMPLE_APP_ID, SAMPLE_LIVE_EVENT_ID, SAMPLE_USER_ID } from '../../../components/storybookConfig';

export default { title: 'UI Components/RightPanel' };

interface LoaderProps {
  loaded: {
    liveEvent: LiveEvent;
  };
}

export const chat = (_: any, { loaded: { liveEvent } }: LoaderProps) => {
  return <SendbirdLiveProvider appId={SAMPLE_APP_ID} userId={SAMPLE_USER_ID}>
    <RightPanel liveEvent={liveEvent} />
  </SendbirdLiveProvider>;
};
export const eventInfo = (_: any, { loaded: { liveEvent } }: LoaderProps) => {
  return <SendbirdLiveProvider appId={SAMPLE_APP_ID} userId={SAMPLE_USER_ID}>
    <RightPanel
      liveEvent={liveEvent}
      initialViewStack={[
        RightPanelComponentType.CHAT,
        RightPanelComponentType.EVENT_INFO,
      ]}
      />
  </SendbirdLiveProvider>;
};
export const hosts = (_: any, { loaded: { liveEvent } }: LoaderProps) => {
  return <SendbirdLiveProvider appId={SAMPLE_APP_ID} userId={SAMPLE_USER_ID}>
    <RightPanel
      liveEvent={liveEvent}
      initialViewStack={[
        RightPanelComponentType.CHAT,
        RightPanelComponentType.EVENT_INFO,
        RightPanelComponentType.HOST_LIST,
      ]}
      />
  </SendbirdLiveProvider>;
};
export const participants = (_: any, { loaded: { liveEvent } }: LoaderProps) => {
  return <SendbirdLiveProvider appId={SAMPLE_APP_ID} userId={SAMPLE_USER_ID}>
    <RightPanel
      liveEvent={liveEvent}
      initialViewStack={[
        RightPanelComponentType.CHAT,
        RightPanelComponentType.EVENT_INFO,
        RightPanelComponentType.PARTICIPANT_LIST,
      ]}
      />
  </SendbirdLiveProvider>;
};