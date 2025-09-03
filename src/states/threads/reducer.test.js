import { describe, it, expect, vi, beforeEach } from 'vitest';
import threadsReducer from './reducer';
import { ActionType } from './action';

// Mock getCachedThreads agar tidak error saat import reducer
vi.mock('../../utils/local-data', () => ({
  getCachedThreads: () => [],
}));

describe('threadsReducer', () => {
  it('should return initial state when given by unknown action', () => {
    // arrange
    const initialState = [
      { id: 'thread-1', title: 'Thread 1' },
      { id: 'thread-2', title: 'Thread 2' },
    ];
    const action = { type: 'UNKNOWN' };

    // act
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return threads when given RECEIVE_THREADS action', () => {
    // arrange
    const initialState = [];
    const threads = [
      { id: 'thread-1', title: 'Thread 1' },
      { id: 'thread-2', title: 'Thread 2' },
    ];
    const action = {
      type: ActionType.RECEIVE_THREADS,
      payload: { threads },
    };

    // act
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(threads);
  });

  it('should add thread to the beginning when given ADD_THREAD action', () => {
    // arrange
    const initialState = [{ id: 'thread-1', title: 'Thread 1' }];
    const newThread = { id: 'thread-2', title: 'Thread 2' };
    const action = {
      type: ActionType.ADD_THREAD,
      payload: { thread: newThread },
    };

    // act
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([newThread, ...initialState]);
  });
});
