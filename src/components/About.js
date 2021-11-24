import React, { useState, useEffect } from 'react';

const About = () => {
  const [aboutInfo, setAboutInfo] = useState();

  useEffect(() => {
    const abortController = new AbortController();
    fetch('/about.json', { signal: abortController.signal })
      .then(res => res.json())
      .then(data => setAboutInfo(data))

    return () => {
      abortController.abort();
    }
  }, [setAboutInfo])
  return (
    <>
      {aboutInfo && 
        <div className="about">
          <h1 className="about__heading">{aboutInfo.title}</h1>
          <p className="about__paragraph">{aboutInfo.text}</p>
        </div>
      }
    </>
  )  
}
export default About;