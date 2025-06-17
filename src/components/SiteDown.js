import React from "react";
import { useFlags } from 'launchdarkly-react-client-sdk';
import dompurify from 'dompurify';



const SiteDown = () => {
const bannerText = useFlags().siteDownBanner;
  return (
     <div dangerouslySetInnerHTML={{__html: dompurify.sanitize(bannerText)}} />
  );
};

export default SiteDown;