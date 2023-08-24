import App from "../index";
import React from "react";
import { App as SendbirdLiveApp } from '../../../../dist/index';

const appId = process.env.STORYBOOK_APP_ID ?? '';
const userId = process.env.STORYBOOK_USER_ID ?? 'js1';

export default { title: 'UI Components/App' };

export const app = () => (
  <App userId={userId} appId={appId} nickname={userId}/>
)

export const distApp = () => {
  return <SendbirdLiveApp userId={userId} appId={appId}/>
};