
import React from 'react';
import { LiveEvent, SendbirdLive } from '@sendbird/live';

import EventDetailView from '..';
import { SAMPLE_APP_ID, SAMPLE_LIVE_EVENT_ID, SAMPLE_USER_ID } from '../../../components/storybookConfig';

export default { title: 'UI Components/EventDetailView' };

interface LoaderProps {
  loaded: {
    liveEvent: LiveEvent;
  };
}

export const simple = (_: any, { loaded: { liveEvent } }: LoaderProps) => {
  return <EventDetailView
    liveEvent={liveEvent}
    onHostsClick={() => console.log('Open host list.')}
    onParticipantsClick={() => console.log('Open participents list.')}
    onClose={() => console.log('EventDetailView closed.')} />;
};
simple.loaders = [
  async () => {
    SendbirdLive.init(SAMPLE_APP_ID);
    await SendbirdLive.authenticate(SAMPLE_USER_ID, undefined);
    const liveEvent = await SendbirdLive.getLiveEvent(SAMPLE_LIVE_EVENT_ID);
    return {
      liveEvent,
    };
  },
];