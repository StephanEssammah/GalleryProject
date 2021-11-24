import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Search from './components/Search';
import SearchResult from './components/SearchResult';
import Splash from './components/Splash';
import About from './components/About';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/search', { state: { firstSearch: inputValue } });
    setInputValue('');
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={
          <>
            <Splash />
            <Search 
              handleSubmit={handleSubmit}
              inputValue={inputValue}
              handleChange={handleChange}/>
          </>
        }/>
        <Route path="/search" element={ <SearchResult /> } />
        <Route path="/about" element={ <About /> } />
      </Routes>
      <Footer />
    </>
  )
}

export default App
