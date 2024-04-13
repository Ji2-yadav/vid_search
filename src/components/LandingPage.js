import React, { useState } from 'react';
import s from '../css/landingPage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import loadingGif from '../loaders/loading-fast.gif';

function LandingPage() {
    const [inputValue, setInputValue] = useState('');
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(false);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setLinks([])
  
      try {
        const response = await fetch('https://54.153.96.167:5000/get-links', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: inputValue }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch links');
        }
  
        const data = await response.json();
        setLinks(data.links);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div className={s.mainHome}>
        <form onSubmit={handleSubmit} className={s.Form}>
          <input
            type="text"
            placeholder="Search query..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            required
            className={s.searchBox}
          />
          <button type="submit" disabled={loading}>
            <FontAwesomeIcon className={s.icons} icon={faSearch} />
          </button>
        </form>
        {loading && (
          <div className={s.loaderContainer}>
            <img src={loadingGif} alt="Loading" className={s.loader} />
          </div>
        )}
        <div className={s.embeddedVideos}>
          {links.map((link, index) => (
            <iframe
              key={index}
              title={`Embedded YouTube Video ${index}`}
              width="560"
              height="315"
              src={link.replace('watch?v=', 'embed/')}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ))}
        </div>
      </div>
    );
  }
  
  export default LandingPage;