
import React from 'react';
import EventHostSearchedUserView from '../eventHostSearchedUserView';

export default { title: 'UI Components/EventHostSearchedUserView' };

export const simple = () => (
  <EventHostSearchedUserView
    key='test-key'
    userId='test-user-id'
    nickname='Nickname'
    profileUrl='https://dxstmhyqfqr1o.cloudfront.net/symbol/Sendbird_Symbol_SVG/Sendbird_Symbol_RGB.svg'
    onClick={() => console.log('click.')}
  />
);