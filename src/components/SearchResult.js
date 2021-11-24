import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import Search from './Search'
import SearchResultArticle from './SearchResultArticle'
import { fetchData } from '../utils';
import PaginationButtons from './PaginationButtons';


const SearchResult = () => {
  const stateLoc = useLocation();
  const [images, setImages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchValue, setSearchValue] = useState(stateLoc.state?.firstSearch || '');
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSearchValue(inputValue);
    setPageNumber(1);
    setInputValue('');
  }
  
  const handleButtonClick = (value) => {
    if (pageNumber + value < 1) return;

    setPageNumber((prevState) => {
      return prevState + value;
    });
  }

  useEffect(() => {
    const abortController = new AbortController();
    const data = async () => {
      try {
        const results = await fetchData(searchValue, pageNumber, abortController);
        setImages(results);
      } catch (err) {
        console.log(err.message);
      }
    }
    if (searchValue !== '') {
      data();
    }

    return () => {
      abortController.abort();
    }
  }, [searchValue, pageNumber]);

  return (
    <>
      <Search handleSubmit={handleSubmit} inputValue={inputValue} handleChange={handleChange} />
      <div className="search-result">
        {images && images.images.map(image => <SearchResultArticle key={image.imgSmallURL} image={image}/>)}
      </div>
      {images && <PaginationButtons pageNumber={pageNumber} pageCount={images.pageCount} handleButtonClick={handleButtonClick}/> }
    </>
  )
}

export default SearchResult
