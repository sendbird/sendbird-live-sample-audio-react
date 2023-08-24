
import React, { useState } from 'react';

import UserListView, { UserQueryResult } from '..';
import { UserProfile } from 'src/types';

export default { title: 'UI Components/UserListView' };

const generateTestUsers = (count: number, offset = 0) => {
  const users: UserProfile[] = [];
  for (let i = offset; i < offset + count; i++) {
    users.push({
      userId: `test-user-${i + 1}`,
      nickname: `Test user ${i + 1}`,
      profileUrl: (i % 2 === 0) ? 'https://dxstmhyqfqr1o.cloudfront.net/symbol/Sendbird_Symbol_SVG/Sendbird_Symbol_RGB.svg' : '',
    });
  }
  return users;
};

const syncQuery = async () => {
  return {
    result: generateTestUsers(4),
    hasNext: false,
  };
};
const asyncQuery = () => {
  return new Promise<UserQueryResult>((resolve) => {
    setTimeout(() => {
      resolve({
        result: generateTestUsers(4),
        hasNext: false,
      });
    }, 100);
  });
};
const asyncQueryByPage = (page: number) => {
  return new Promise<UserQueryResult>((resolve) => {
    setTimeout(() => {
      resolve({
        result: generateTestUsers(24, page * 24),
        hasNext: page === 0,
      });
    }, 100);
  });
};

export const syncList = () => {
  return <UserListView
    title='Hosts'
    count={1}
    query={syncQuery}
    onClose={() => console.log('UserListView closed.')} />;
};
export const asyncList = () => {
  return <UserListView
    title='Hosts'
    count={1}
    query={asyncQuery}
    onClose={() => console.log('UserListView closed.')} />;
};
export const asyncListPaginated = () => {
  const [page, setPage] = useState(0);
  return <UserListView
    title='Hosts'
    count={1}
    query={async () => {
      const result = await asyncQueryByPage(page);
      setPage(page + 1);
      return result;
    }}
    onClose={() => console.log('UserListView closed.')} />;
};