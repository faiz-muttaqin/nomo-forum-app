/**
 * skenario testing
 *
 * - ThreadList component
 *   - should render loading skeletons when threads is empty
 *   - should render threads when threads is not empty
 * - ThreadItem component
 *   - should render thread item with correct props
 */

import React from 'react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import ThreadList from './ThreadList';
import ThreadItem from './ThreadItem';
import LanguageContext, { LanguageProvider } from '../contexts/LanguageContext';
import { Provider } from 'react-redux';
import store from '../states';
import { ThemeProvider } from '../contexts/ThemeContext';

expect.extend(matchers);

const threads = [
  {
    id: 'thread-Zc92VjWiqJfU-fyD',
    title: 'Halo Teman-teman semua, Selamat Datang di dicoding',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    category: 'test',
    createdAt: '2025-09-03T09:08:21.072Z',
    ownerId: 'user-P08rM5-2ttcPlXvi',
    totalComments: 0,
    upVotesBy: [],
    downVotesBy: [],
    comments: [],
    user: { name: 'User 1', avatar: 'avatar-url', email: 'user1@mail.com' },
  },
  {
    id: 'thread-Np47p4jhUXYhrhRn',
    title: 'Bagaimana pengalamanmu belajar Redux?',
    body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
    category: 'redux',
    createdAt: '2023-05-29T07:55:52.266Z',
    ownerId: 'user-mQhLzINW_w5TxxYf',
    totalComments: 1,
    upVotesBy: ['user-mQhLzINW_w5TxxYf'],
    downVotesBy: [],
    comments: [],
    user: { name: 'User 2', avatar: 'avatar-url', email: 'user2@mail.com' },
  },
  {
    id: 'thread-91KocEqYPRz68MhD',
    title: 'Halo! Selamat datang dan silakan perkenalkan diri kamu',
    body: '<div>Bagaimana kabarmu? Semoga baik-baik saja ya. Sekali lagi saya ucapkan selamat datang semuanya!</div><div><br></div><div>Seperti yang sudah disampaikan sebelumnya, pada diskusi ini kamu bisa memperkenalkan diri kamu dan juga berkenalan dengan teman sekelas lainnya.</div><div><br></div><div>Berhubungan baik dengan teman sekelas dan instruktur merupakan bagian penting dari pembelajaran di kelas ini, karena mereka dapat membantu jika kamu mengalami kendala dalam mempelajari dan memahami materi.&nbsp;&nbsp;</div><div><br></div><div>Oleh karena itu, luangkanlah waktumu untuk saling mengenal dan mencairkan suasana. Membangun interaksi dengan siswa lain akan membuat pengalaman belajar kamu jauh lebih menyenangkan dan menarik.&nbsp;</div><div><br></div><div>Beberapa hal yang dapat kamu tulis pada perkenalan diri:</div><div><br></div><div>- Siapa kamu dan dari mana kamu berasal?</div><div>- Apa pekerjaan atau pendidikan kamu saat ini?</div><div>- Kenapa kamu mengambil pelatihan ini? Apakah mungkin karena kamu sedang mengejar perubahan dalam karir, atau lainnya?</div>',
    category: 'perkenalan',
    createdAt: '2023-05-29T07:54:35.746Z',
    ownerId: 'user-aROWej8yYA1sOfHN',
    totalComments: 1,
    upVotesBy: ['user-mQhLzINW_w5TxxYf'],
    downVotesBy: [],
    comments: [],
    user: { name: 'User 3', avatar: 'avatar-url', email: 'user3@mail.com' },
  },
];

const changeLanguage = () => {};
const toggleTheme = () => {};
const language = 'id';
const theme = 'light';

describe('ThreadList component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render loading skeletons when threads is empty', () => {
    // Arrange
    render(
      <LanguageProvider value={{ language, changeLanguage }}>
        <ThemeProvider value={{ theme, toggleTheme }}>
          <Provider store={store}>
            <LanguageContext.Provider value={{ language: 'id' }}>
              <ThreadList threads={[]} />
            </LanguageContext.Provider>
          </Provider>
        </ThemeProvider>
      </LanguageProvider>
    );

    // Assert
    // expect(screen.getAllByTestId('loading-skeleton')).toBeDefined();
    const placeholderElements = document.querySelectorAll('.placeholder-glow');
    expect(placeholderElements.length).toBeGreaterThan(0);
  });

  it('should render threads when threads is not empty', () => {
    // Arrange
    render(
      <LanguageProvider value={{ language, changeLanguage }}>
        <ThemeProvider value={{ theme, toggleTheme }}>
          <Provider store={store}>
            <LanguageContext.Provider value={{ language: 'id' }}>
              <ThreadList threads={threads} />
            </LanguageContext.Provider>
          </Provider>
        </ThemeProvider>
      </LanguageProvider>
    );

    // Assert
    expect(
      screen.getByText('Halo Teman-teman semua, Selamat Datang di dicoding')
    ).toBeInTheDocument();
    expect(screen.getByText('Bagaimana pengalamanmu belajar Redux?')).toBeInTheDocument();
    expect(
      screen.getByText('Halo! Selamat datang dan silakan perkenalkan diri kamu')
    ).toBeInTheDocument();
  });
});
