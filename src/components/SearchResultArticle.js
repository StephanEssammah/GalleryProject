import React from 'react';

const SearchResultArticle = ({image}) => {
  const toggleActive = (e) => {
    e.target.closest('.result-card').classList.toggle('active');
  }
  return (
    <article className="result-card" onClick={(e) => toggleActive(e)}>
      <div className="result-card__front" data-likes={image.likes}>
        <div className="result-card__img-wrap">
          <img className="result-card__img" src={image.imgSmallURL} alt={image.imgAlt}/>
        </div>
      </div>
      <div className="result-card__back">
        Photo by: {image.name}
      </div>
    </article>
  )
}

export default SearchResultArticle;