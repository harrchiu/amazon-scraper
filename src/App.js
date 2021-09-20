import axios from "axios";
import { useState, useEffect } from "react";

import "./App.css";

const getScrapeResults = (
  curLink,
  setTitles,
  setPrices,
  setImages,
  setIsLoading
) => {
  console.log(curLink);
  setIsLoading(true);

  axios
    .post("https://price-guesser-api1.herokuapp.com/scraperTest", {
      link: curLink,
    })
    .then((res) => {
      setTitles(res.data.titles);
      setPrices(res.data.prices);
      setImages(res.data.images);
      setIsLoading(false);
    });
};

const App = () => {
  const [titles, setTitles] = useState([]);
  const [prices, setPrices] = useState([]);
  const [images, setImages] = useState([]);

  const [curQuery, setCurQuery] = useState("office supplies");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("wow somebodys reading");
    console.log("anyway here are the links");
  }, []);

  return (
    <div className="App">
      <div className="contact">
        <a
          href="https://github.com/harrchiu/amazon-scraper"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </a>
        <a
          href="https://www.linkedin.com/in/harrchiu/"
          target="_blank"
          rel="noreferrer"
        >
          @harrchiu
        </a>
      </div>
      <div className="page-subtitle">
        This UI demonstrates the scraper that I built for <b>Price Guesser</b>.
      </div>
      <a
        className="page-PG-link"
        href="https://priceguesser.netlify.app"
        target="_blank"
        rel="noreferrer"
      >
        <i>Check it out here!</i>
      </a>
      <div className="page-title">Enter an Amazon item/category</div>
      <form className="url-form">
        <input
          className="url-form__input"
          placeholder="e.g. office supplies"
          onChange={(event) => {
            setCurQuery(event.target.value);
          }}
          type={"text"}
          defaultValue={"office supplies"}
        ></input>
        <button
          className="url-form__button"
          onClick={(event) => {
            event.preventDefault();
            const curLink = `https://www.amazon.com/s?k=${curQuery.replace(
              " ",
              "+"
            )}`;
            getScrapeResults(
              curLink,
              setTitles,
              setPrices,
              setImages,
              setIsLoading
            );
          }}
          disabled={isLoading}
        >
          Scrape!
        </button>
      </form>
      {isLoading && (
        <div className="loading">
          <i>loading...</i>
        </div>
      )}
      {!!titles && titles.length > 0 && (
        <table className="results-table">
          <tbody>
            <tr className="results-table__header">
              <th>#</th>
              <th>Products</th>
              <th>Prices</th>
              <th>Image Links</th>
            </tr>
            {titles.map((a, index) => {
              return (
                <tr className={`tr--${index % 2}`} key={index}>
                  <td>{index + 1}</td>
                  <td>{titles[index]}</td>
                  <td>{prices[index]}</td>
                  <td>
                    {
                      <a href={images[index]} target="_blank" rel="noreferrer">
                        {images[index]}
                      </a>
                    }
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default App;
