import React, { useEffect, useState } from 'react'
import { updateLocalStorage } from '../utils'

const Search = (props) => {
  const { handleSubmit, inputValue, handleChange } = props;
  const [prevSearch, setPrevSearch] = useState([]);


  const handleSubmitSearch = (e) => {
    handleSubmit(e);
    const ls = updateLocalStorage(inputValue);
    setPrevSearch(ls);
  }

  useEffect(() => {
    setPrevSearch(JSON.parse(localStorage.getItem('cs')));
  }, [setPrevSearch]);
  
  return (
    <section>
      <form className="search-form" onSubmit={handleSubmitSearch}>
        <input 
          className="search-form__input" 
          id="search"
          type="text"
          autoComplete="off" 
          name="search" 
          placeholder="Search"
          list="search-input"
          value={inputValue}
          onChange={e => handleChange(e)}
        />
        <datalist id="search-input">
          {prevSearch && prevSearch.map((i, index) => <option key={index}>{i}</option>)}
        </datalist>
      </form>
    </section>
  )
}

export default Search;
