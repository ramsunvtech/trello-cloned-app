export const post = async (url, payload) => {
  const post = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return post.json();
};

export const get = async (url) => {
  const get = await fetch(url);

  return get.json();
};

export const patch = async (url, payload) => {
  const post = await fetch(url, {
    method: 'PATCH',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return post.json();
};