import React from 'react'

const PaginationButtons = ({ pageNumber, pageCount, handleButtonClick }) => {
  
  const pageNumberChecker = () => {
    if (pageNumber === 1 && pageCount === 1) return;
    if (pageNumber > 1 && pageNumber < pageCount) {
      return <>
        <button id="btn-prev" className="btn-prev" onClick={() => handleButtonClick(-1)}>‹ PREV</button>
        <button id="btn-next" className="btn-next" onClick={() => handleButtonClick(1)}>NEXT ›</button>
        </>
    }
    if (pageNumber < 2) {
      return <button id="btn-next" className="btn-next" onClick={() => handleButtonClick(1)}>NEXT ›</button>
    }
    return <button id="btn-prev" className="btn-prev" onClick={() => handleButtonClick(-1)}>‹ PREV</button>
  }

  return (
    <div className="btn-wrap">
      {pageNumberChecker()}
    </div>
  )
}

export default PaginationButtons
