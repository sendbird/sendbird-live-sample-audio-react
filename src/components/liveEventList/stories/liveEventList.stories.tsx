import React from "react";
import LiveEventList from "../index";
import SendbirdLiveProvider from "../../../lib/sendbirdLive";

export default { title: 'UI Components/LiveEventListView' };

const appId = process.env.STORYBOOK_APP_ID ?? '';
const userId = process.env.STORYBOOK_USER_ID ?? 'js1';

export const liveEventListView = () => (
  <SendbirdLiveProvider userId={userId} appId={appId}>
    <LiveEventList
      onClickElem={ () => console.log('onClickElem') }
      onClickCreate={ () => console.log('onClickCreate') }
    />
  </SendbirdLiveProvider>
);