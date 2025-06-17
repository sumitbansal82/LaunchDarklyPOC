import React, { createContext, useState } from "react";
import axios from "axios";
import { apiKey } from "../api/config";
export const PhotoContext = createContext();

const PhotoContextProvider = props => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(1);

  const runSearch = (query, pageNumber) => {
    axios
      .get(
        `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&page=${pageNumber}&per_page=48&format=json&nojsoncallback=1`
      )
      .then(response => {
        console.log(response.data.photos.pages);
        setImages(response.data.photos.photo);
        setLoading(false);
        setNumPages(response.data.photos.pages);
      })
      .catch(error => {
        console.log(
          "Encountered an error with fetching and parsing data",
          error
        );
      });
  };
  return (
    <PhotoContext.Provider value={{ images, loading, numPages, pageNumber, setPageNumber, runSearch }}>
      {props.children}
    </PhotoContext.Provider>
  );
};

export default PhotoContextProvider;
