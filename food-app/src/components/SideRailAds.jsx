import React, { useEffect } from 'react';

const pushAds = () => {
  try {
    // @ts-ignore
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  } catch (e) {
    // no-op
  }
};

function SideRailAds() {
  useEffect(() => {
    pushAds();
  }, []);

  return (
    <>
      <div className="side-rail left-rail" aria-hidden="false">
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-xxxxxxxxxxxxxxxx"
          data-ad-slot="0000000001"
          data-ad-format="vertical"
          data-full-width-responsive="true"
        ></ins>
      </div>
      <div className="side-rail right-rail" aria-hidden="false">
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-xxxxxxxxxxxxxxxx"
          data-ad-slot="0000000002"
          data-ad-format="vertical"
          data-full-width-responsive="true"
        ></ins>
      </div>
    </>
  );
}

export default SideRailAds;


