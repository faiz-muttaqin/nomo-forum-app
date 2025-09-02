const api = (() => {
  const BASE_URL = 'https://forum-api.dicoding.dev/v1';

  function putAccessToken(token) {
    localStorage.setItem('accessToken', token);
    if (token === '') {
      localStorage.setItem('nomo-user', '');
    }
  }

  function getAccessToken() {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken === '') {
      localStorage.setItem('nomo-user', '');
    }
    return accessToken;
  }
  function getCachedOwnProfile() {
    const data = localStorage.getItem('nomo-user');
    return data ? JSON.parse(data) : null;
  }

  async function _fetchWithAuth(url, options = {}) {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  }

  // Register user
  async function register({ name, email, password }) {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
    const responseJson = await response.json();
    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }
    return responseJson;
  }

  // Login user
  async function login({ email, password }) {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const responseJson = await response.json();
    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }
    return responseJson.data.token;
  }

  // Get all users
  async function getAllUsers() {
    const response = await fetch(`${BASE_URL}/users`);
    const responseJson = await response.json();
    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }
    return responseJson.data.users;
  }

  // Get own profile
  async function getOwnProfile() {
    const response = await _fetchWithAuth(`${BASE_URL}/users/me`);
    const responseJson = await response.json();
    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }
    localStorage.setItem('nomo-user', JSON.stringify(responseJson.data.user));
    return responseJson.data.user;
  }

  // Get all threads
  async function getAllThreads() {
    const response = await fetch(`${BASE_URL}/threads`);
    const responseJson = await response.json();
    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }
    return responseJson.data.threads;
  }

  // Create thread
  async function createThread({ title, body, category }) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body, category }),
    });
    const responseJson = await response.json();
    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }
    return responseJson.data.thread;
  }

  // Get thread detail
  async function getThreadDetail(threadId) {
    const response = await fetch(`${BASE_URL}/threads/${threadId}`);
    const responseJson = await response.json();
    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }
    return responseJson.data.detailThread;
  }

  // Create thread comment
  async function createThreadComment({ threadId, content }) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });
    const responseJson = await response.json();
    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }
    return responseJson.data.comment;
  }

  // Thread up-vote
  async function upVoteThread(threadId) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/up-vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: '' }),
    });
    const responseJson = await response.json();
    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }
    return responseJson.data;
  }

  // Thread down-vote
  async function downVoteThread(threadId) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/down-vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: '' }),
    });
    const responseJson = await response.json();
    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }
    return responseJson.data;
  }

  // Thread neutral-vote
  async function neutralVoteThread(threadId) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/neutral-vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: '' }),
    });
    const responseJson = await response.json();
    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }
    return responseJson.data;
  }

  // Comment up-vote
  async function upVoteComment(threadId, commentId) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: '' }),
      }
    );
    const responseJson = await response.json();
    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }
    return responseJson.data;
  }

  // Comment down-vote
  async function downVoteComment(threadId, commentId) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: '' }),
      }
    );
    const responseJson = await response.json();
    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }
    return responseJson.data;
  }

  // Comment neutral-vote
  async function neutralVoteComment(threadId, commentId) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: '' }),
      }
    );
    const responseJson = await response.json();
    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }
    return responseJson.data;
  }

  // Get leaderboards
  async function getLeaderboards() {
    const response = await fetch(`${BASE_URL}/leaderboards`);
    const responseJson = await response.json();
    if (responseJson.status !== 'success') {
      throw new Error(responseJson.message);
    }
    return responseJson.data.leaderboards;
  }

  return {
    getCachedOwnProfile,
    putAccessToken,
    getAccessToken,
    register,
    login,
    getOwnProfile,
    getAllUsers,
    getAllThreads,
    createThread,
    getThreadDetail,
    createThreadComment,
    upVoteThread,
    downVoteThread,
    neutralVoteThread,
    upVoteComment,
    downVoteComment,
    neutralVoteComment,
    getLeaderboards,
  };
})();

export default api;
