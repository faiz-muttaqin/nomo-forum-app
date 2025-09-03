import { asyncPopulateThreads } from './action';
import { recieveThreadsActionCreator } from '../threads/action';
import { describe, beforeEach, afterEach, it, vi, expect } from 'vitest';
import api from '../../utils/api';
import { asyncPopulateLeaderBoards } from './action';
import { recieveLeaderboardsActionCreator } from '../leaderboard/action';
import { getCachedUsers, setCachedThreads, getCachedThreads } from '../../utils/local-data';

// Mock localStorage for Node.js
global.localStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

// Mock getCachedUsers for each test case
vi.mock('../../utils/local-data', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    getCachedUsers: vi.fn(),
  };
});

const fakeLeaderboardsResponse = [{ user: { id: 'user-1', name: 'User Test 1' }, score: 10 }];
const fakeErrorResponse = new Error('Ups, something went wrong');

const fakeUsers = [
  {
    id: 'user-1arruYipuS9PIhPm',
    name: 'surya16',
    email: 'surya16@gmail.com',
    avatar: 'https://ui-avatars.com/api/?name=surya16&background=random',
  },
  {
    id: 'user-2',
    name: 'budi',
    email: 'budi@gmail.com',
    avatar: 'https://ui-avatars.com/api/?name=budi&background=random',
  },
];

const fakeThreads = [
  {
    id: 'thread-Np47p4jhUXYhrhRn',
    title: 'Bagaimana pengalamanmu belajar Redux?',
    body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
    category: 'redux',
    createdAt: '2023-05-29T07:55:52.266Z',
    ownerId: 'user-1arruYipuS9PIhPm',
    totalComments: 1,
    upVotesBy: ['user-1arruYipuS9PIhPm'],
    downVotesBy: [],
  },
  {
    id: 'thread-91KocEqYPRz68MhD',
    title: 'Halo! Selamat datang dan silakan perkenalkan diri kamu',
    body: 'Perkenalan',
    category: 'perkenalan',
    createdAt: '2023-05-29T07:54:35.746Z',
    ownerId: 'user-2',
    totalComments: 1,
    upVotesBy: ['user-2'],
    downVotesBy: [],
  },
];

const fakeThreadDetail = {
  id: 'thread-Np47p4jhUXYhrhRn',
  title: 'Bagaimana pengalamanmu belajar Redux?',
  body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
  createdAt: '2023-05-29T07:55:52.266Z',
  owner: {
    id: 'user-1arruYipuS9PIhPm',
    name: 'surya16',
    avatar: 'https://ui-avatars.com/api/?name=surya16&background=random',
  },
  category: 'redux',
  comments: [],
  upVotesBy: [],
  downVotesBy: [],
};

describe('asyncPopulateThreads thunk', () => {
  beforeEach(() => {
    api._getAllThreads = api.getAllThreads;
    api._getThreadDetail = api.getThreadDetail;
  });

  afterEach(() => {
    api.getAllThreads = api._getAllThreads;
    api.getThreadDetail = api._getThreadDetail;
    delete api._getAllThreads;
    delete api._getThreadDetail;
    vi.restoreAllMocks();
  });

  it('should handle empty users and threads', async () => {
    getCachedUsers.mockReturnValue([]);
    api.getAllThreads = () => Promise.resolve([]);
    api.getThreadDetail = () => Promise.resolve({});
    const dispatch = vi.fn();

    await asyncPopulateThreads()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(recieveThreadsActionCreator([]));
  });

  it('should handle users and threads with data, and thread details', async () => {
    getCachedUsers.mockReturnValue(fakeUsers);
    api.getAllThreads = () => Promise.resolve(fakeThreads);
    api.getThreadDetail = (id) => Promise.resolve(fakeThreadDetail);
    const dispatch = vi.fn();

    await asyncPopulateThreads()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(
      recieveThreadsActionCreator([
        {
          ...fakeThreads[0],
          comments: fakeThreadDetail.comments,
          user: fakeUsers[0],
        },
        {
          ...fakeThreads[1],
          comments: fakeThreadDetail.comments,
          user: fakeUsers[1],
        },
      ])
    );
  });

  it('should handle error when data fetching failed', async () => {
    getCachedUsers.mockReturnValue(fakeUsers);
    api.getAllThreads = () => Promise.reject(fakeErrorResponse);
    api.getThreadDetail = () => Promise.reject(fakeErrorResponse);
    const dispatch = vi.fn();
    vi.spyOn(console, 'log').mockImplementation(() => {});

    await asyncPopulateThreads()(dispatch);

    expect(console.log).toHaveBeenCalledWith(fakeErrorResponse.message);
    console.log.mockRestore();
  });
});

describe('asyncPopulateLeaderBoards thunk', () => {
  beforeEach(() => {
    api._getLeaderboards = api.getLeaderboards;
  });
  afterEach(() => {
    api.getLeaderboards = api._getLeaderboards;
    delete api._getLeaderboards;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    api.getLeaderboards = () => Promise.resolve(fakeLeaderboardsResponse);
    const dispatch = vi.fn();

    await asyncPopulateLeaderBoards()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(
      recieveLeaderboardsActionCreator(fakeLeaderboardsResponse)
    );
  });

  it('should handle error when data fetching failed', async () => {
    api.getLeaderboards = () => Promise.reject(fakeErrorResponse);
    const dispatch = vi.fn();
    vi.spyOn(console, 'error').mockImplementation(() => {});

    await asyncPopulateLeaderBoards()(dispatch);

    expect(console.error).toHaveBeenCalledWith(fakeErrorResponse.message);
    console.error.mockRestore();
  });
});
