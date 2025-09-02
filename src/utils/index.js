const showFormattedDate = (date) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString('id-ID', options);
};
function postedAt(date) {
  const now = new Date();
  const posted = new Date(date);
  const diff = now - posted;
  const diffSeconds = Math.floor(diff / 1000);
  const diffMinutes = Math.floor(diff / (1000 * 60));
  const diffHours = Math.floor(diff / (1000 * 60 * 60));
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths =
    now.getFullYear() * 12 + now.getMonth() - (posted.getFullYear() * 12 + posted.getMonth());
  const diffYears = now.getFullYear() - posted.getFullYear();

  if (diffYears > 0) {
    // e.g. 2 years 3 months ago
    const months = now.getMonth() - posted.getMonth();
    const displayMonths = months < 0 ? months + 12 : months;
    return `${diffYears} year${diffYears > 1 ? 's' : ''}${displayMonths > 0 ? ` ${displayMonths} month${displayMonths > 1 ? 's' : ''}` : ''} ago`;
  }
  if (diffMonths > 0) {
    return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
  }
  if (diffWeeks > 0) {
    return `${diffWeeks} week${diffWeeks > 1 ? 's' : ''} ago`;
  }
  if (diffDays > 0) {
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  }
  if (diffHours > 0) {
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  }
  if (diffMinutes > 0) {
    return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
  }
  if (diffSeconds > 0) {
    return `${diffSeconds} second${diffSeconds > 1 ? 's' : ''} ago`;
  }
  return 'just now';
}

export { showFormattedDate, postedAt };
