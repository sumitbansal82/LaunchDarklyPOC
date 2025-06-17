import React from "react";
import { useFlags } from 'launchdarkly-react-client-sdk';
import NoImages from "./NoImages";
import Image from "./Image";
import Pagination from "./Pagination";
import SiteDown from "./SiteDown";


const Gallery = props => {
  const results = props.data;
  const numPages = props.numPages;
  const setPageNumber = props.setPageNumber;
  const pageNumber = props.pageNumber;
  let images;
  let noImages;

  const handlePageChange = (page) => {
    console.log("Current Page:", page);
    setPageNumber(page);
  };

  const showPaginationBar = useFlags().showPagination ? 
       <Pagination totalPages={numPages} onPageChange={handlePageChange} /> :
       <span />

  const isSiteDown = useFlags().siteDown;

  // map variables to each item in fetched image array and return image component
  if (results.length > 0) {
    console.log(props);
    images = results.map(image => {
      let farm = image.farm;
      let server = image.server;
      let id = image.id;
      let secret = image.secret;
      let title = image.title;
      let url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_m.jpg`;
      return <Image url={url} key={id} alt={title} />;
    });
  } else {
    noImages = <NoImages />; // return 'not found' component if no images fetched
  }
  return (
    
    <div>
      { 
        isSiteDown ? <SiteDown /> :
          <>
            <ul>{images}</ul>
            <span>Current Page: {pageNumber}</span>
            <span>{showPaginationBar}</span>
            {noImages}
          </>
      }
    </div>
  );
};

export default Gallery;
