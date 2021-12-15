const apiKey = process.env.REACT_APP_APIKEY

const parseData = data => ({
  imgAlt: data.alt_description,
  imgSmallURL: data.urls.small,
  name: data.user.name,
  likes: data.likes
});

const fetchData = (input, pageNumber = 1, abortController) => new Promise((resolve, reject) => {
  fetch(`https://api.unsplash.com/search/photos?page=${pageNumber}&query=${input}&client_id=${apiKey}`, { signal: abortController.signal })
    .then(response => response.json())
    .then(data => {
      const parsedData = data.results.map(parseData);
      resolve({images: parsedData, pageCount: data.total_pages});
    })
    .catch(err => reject(err));
});

const updateLocalStorage = (inputValue) => {
  const storageLocal = localStorage.getItem('recentSearches');
    if (!storageLocal) {
      localStorage.setItem('recentSearches', JSON.stringify([inputValue]));
      return [inputValue];
    }
    const storage = JSON.parse(storageLocal);
    if (storage.length < 3) {
      storage.unshift(inputValue);
    } else {
      storage.pop()
      storage.unshift(inputValue);
    }
  localStorage.setItem('recentSearches', JSON.stringify(storage));
  return storage;
}

export {
  fetchData,
  updateLocalStorage
}