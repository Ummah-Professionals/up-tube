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
  await wait(700);

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


