import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

const App = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [bgColor, setBgColor] = useState('#282c34'); // Initial background color

  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const fetchQuote = useCallback(async () => {
    const response = await fetch('https://api.quotable.io/random');
    const data = await response.json();
    setQuote(data.content);
    setAuthor(data.author);
    setBgColor(generateRandomColor()); // Update background color
  }, []); // Empty array means this function is stable and won't change

  useEffect(() => {
    fetchQuote();
  }, [fetchQuote]);

  return (
    <div className="App" style={{ backgroundColor: bgColor, transition: 'background-color 0.5s ease' }}>
      <QuoteBox quote={quote} author={author} fetchQuote={fetchQuote} />
    </div>
  );
};

const QuoteBox = ({ quote, author, fetchQuote }) => {
  return (
    <div id="quote-box" style={{ backgroundColor: 'white' }}>
      <div id="text">{quote}</div>
      <div id="author">{author}</div>
      <div className="button-container">
        <a
          id="tweet-quote"
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote}" - ${author}`)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Tweet Quote
        </a>
        <button id="new-quote" onClick={fetchQuote}>New Quote</button>
      </div>
    </div>
  );
};

export default App;






