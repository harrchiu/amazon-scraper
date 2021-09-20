import axios from "axios";
import { useState } from "react";

import "./App.css";

const getScrapeResults = (curLink, setTitles, setPrices, setImages) => {
  console.log(curLink);
  const result = axios
    // .get("https://price-guesser-api1.herokuapp.com/scraperTest", {
    .post("http://localhost:5000/scraperTest", {
      link: curLink,
    })
    .then((res) => {
      setTitles(res.data.titles);
      setPrices(res.data.prices);
      setImages(res.data.images);
      // console.log("here", res.data);
    });
};

const App = () => {
  const [titles, setTitles] = useState([]);
  const [prices, setPrices] = useState([]);
  const [images, setImages] = useState([]);

  const [curQuery, setCurQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="App">
      <div className="page-title">Enter an Amazon item/category</div>
      <div className="url-form">
        <input
          className="url-form__input"
          placeholder="e.g. office supplies"
          onChange={(event) => {
            setCurQuery(event.target.value);
          }}
          type={"text"}
        ></input>
        <button
          className="url-form__button"
          onClick={() => {
            setIsLoading(true);
            console.log(isLoading);
            const curLink = `https://www.amazon.com/s?k=${curQuery.replace(
              " ",
              "+"
            )}`;
            getScrapeResults(curLink, setTitles, setPrices, setImages);
            setIsLoading(false);
            console.log(isLoading);
            console.log("title result", titles);
          }}
        >
          Scrape!
        </button>
      </div>
      {isLoading && <div className="loading">loading...</div>}
      {titles.length > 0 && (
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
                <tr className={`results-table__result`} key={index}>
                  <td>{index + 1}</td>
                  <td>{titles[index]}</td>
                  <td>{prices[index]}</td>
                  <td>{images[index]}</td>
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
