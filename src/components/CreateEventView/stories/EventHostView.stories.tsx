
import React from 'react';
import EventHostView from '../eventHostView';

export default { title: 'UI Components/EventHostView' };

export const simple = () => (
  <EventHostView
    key='test-key'
    userId='test-user-id'
    nickname='Nickname'
    profileUrl='https://dxstmhyqfqr1o.cloudfront.net/symbol/Sendbird_Symbol_SVG/Sendbird_Symbol_RGB.svg'
    onRemove={(userId: string) => console.log(`${userId} removed.`)}
  />
);

export const defaultProfile = () => (
  <EventHostView
    key='test-key'
    userId='test-user-id'
    nickname='Nickname'
    profileUrl=''
    onRemove={(userId: string) => console.log(`${userId} removed.`)}
  />
);

export const hiddenProfile = () => (
  <EventHostView
    key='test-key'
    userId='test-user-id'
    nickname='Nickname'
    profileUrl='https://dxstmhyqfqr1o.cloudfront.net/symbol/Sendbird_Symbol_SVG/Sendbird_Symbol_RGB.svg'
    hideProfile={true}
    onRemove={(userId: string) => console.log(`${userId} removed.`)}
  />
);