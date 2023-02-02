import React from 'react'
import quotes from '../../json/quotes.json'

const Quotes = () => {

        const indexRandom = Math.floor(Math.random() * quotes.length)
  return (
    <div>
    <h5 className="card-title" style={{borderBottom: 'solid 1px #000', marginBottom:'5px'}}>{quotes[indexRandom].author}</h5>
    <p className="card-text"> 
    <i className="fas fa-quote-left quotes"></i>
        {quotes[indexRandom].quote}
    <i className="fas fa-quote-right quotes"></i>
    </p>
    </div>
  )
}

export default Quotes