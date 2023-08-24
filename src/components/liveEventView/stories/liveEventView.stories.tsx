import React from 'react';
import HostView from '../hostView';
import { LiveEvent } from "@sendbird/live";
import ParticipantView from "../participantView";
import { SendbirdLive } from "@sendbird/live";
import SendbirdLiveProvider from "../../../lib/sendbirdLive"

const appId = process.env.STORYBOOK_APP_ID;
const userId = 'js1';
const liveEventId = '5d35e09a-1258-42b4-a06a-125c3bd54039';

export default { title: 'UI Components/LiveEventView' };

interface LoaderProps {
  loaded: {
    liveEvent: LiveEvent;
  };
}

export const hostView = (_: any, { loaded: { liveEvent } }: LoaderProps) => (
  <SendbirdLiveProvider appId={appId!} userId={userId}>
    <HostView liveEvent={liveEvent}></HostView>
  </SendbirdLiveProvider>
);

export const participantView = (_: any, { loaded: { liveEvent } }: LoaderProps) => (
  <SendbirdLiveProvider appId={appId!} userId={userId}>
    <ParticipantView liveEvent={liveEvent}></ParticipantView>
  </SendbirdLiveProvider>
)

hostView.loaders = [
  async () => {
    SendbirdLive.init(appId!);
    await SendbirdLive.authenticate(userId, undefined);
    const liveEvent = await SendbirdLive.createLiveEvent({
      userIdsForHost: ['js1'],
    });
    return {
      liveEvent,
    };
  },
];

participantView.loaders = [
  async () => {
    SendbirdLive.init(appId!);
    await SendbirdLive.authenticate(userId, undefined);
    const liveEvent = await SendbirdLive.getLiveEvent(liveEventId);
    return {
      liveEvent,
    };
  },
];