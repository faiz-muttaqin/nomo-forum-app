// Users
export function getCachedUsers() {
  const data = localStorage.getItem('users');
  return data ? JSON.parse(data) : [];
}
export function setCachedUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

// Threads
export function getCachedThreads() {
  const data = localStorage.getItem('threads');
  return data ? JSON.parse(data) : [];
}
export function setCachedThreads(threads) {
  localStorage.setItem('threads', JSON.stringify(threads));
}
// Leaderboards
export function getCachedLeaderboards() {
  const data = localStorage.getItem('leaderboards');
  return data ? JSON.parse(data) : [];
}

export function setCachedLeaderboards(leaderboards) {
  localStorage.setItem('leaderboards', JSON.stringify(leaderboards));
}
