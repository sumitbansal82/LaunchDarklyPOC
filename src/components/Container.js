import React, { useContext, useEffect } from "react";
import { PhotoContext } from "../context/PhotoContext";
import Gallery from "./Gallery";
import Loader from "./Loader";

const Container = ({ searchTerm }) => {
  const { images, loading, numPages, pageNumber, setPageNumber, runSearch } = useContext(PhotoContext);
  useEffect(() => {
    runSearch(searchTerm, pageNumber);
    // eslint-disable-next-line
  }, [searchTerm, pageNumber]);

  return (
    <div className="photo-container">
      {loading ? <Loader /> : <Gallery data={images} numPages={numPages} setPageNumber={setPageNumber} pageNumber={pageNumber}/>}
    </div>
  );
};

export default Container;
