import { formatDistanceToNow } from "date-fns";

/**
 * Fetches JSON from any endpoint. Includes basic error handling.
 */
export const fetchJson = (...params) =>
  fetch(...params).then((res) => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return res.json();
  });

/**
 * Makes a fetch call, but with an artifical delay.
 * Useful if you want to test out loading screens, or general user experience when
 * there's latency.
 */
export const slowFetchJson = async (...params) => {
  await wait(1000);

  return fetchJson(...params).then((json) => {
    return json;
  });
};

/**
 * Waits the specified number of milliseconds.
 * @param {number} timeout
 */
export const wait = (ms) => {
  return new Promise((resolve) => setTimeout(() => resolve(), ms));
};

/**
 *
 * @param {string} date
 * @returns {string}
 *
 * Returns a timestamp formatted as a relative date
 * (e.g. "10 days ago")
 */
export const toRelativeTime = (date) => {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
};

/**
 *
 * @param {number} number
 * @returns {string}
 * Formats a number to YouTube-style view count (e.g. 1.3M views)
 */
export const formatVideoViews = (number) => {
  if (number >= 1_000_000_000) {
    return (number / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
  } else if (number >= 1_000_000) {
    return (number / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  } else if (number >= 1_000) {
    return (number / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  } else {
    return number.toString();
  }
};
