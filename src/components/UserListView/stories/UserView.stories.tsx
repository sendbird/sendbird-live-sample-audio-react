
import React from 'react';
import UserView from '../userView';

export default { title: 'UI Components/UserView' };

export const simple = () => (
  <UserView
    key='test-key'
    userId='test-user-id'
    nickname='Nickname'
    profileUrl='https://dxstmhyqfqr1o.cloudfront.net/symbol/Sendbird_Symbol_SVG/Sendbird_Symbol_RGB.svg'
  />
);

export const defaultProfile = () => (
  <UserView
    key='test-key'
    userId='test-user-id'
    nickname='Nickname'
  />
);