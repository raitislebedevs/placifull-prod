import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const LeafletMap = dynamic(() => import('components/common/LeafletMap'), {
  ssr: false,
});

const MapHeader = (props) => {
  const { t, listingItem } = props;
  const [marker, setMarker] = useState({
    lat: listingItem?.latitude || 56.946285,
    lng: listingItem?.longitude || 24.105078,
  });

  useEffect(() => {
    setMarker({
      lat: listingItem?.latitude || 56.946285,
      lng: listingItem?.longitude || 24.105078,
    });
  }, [listingItem]);

  return (
    <div className="real-estate-container__Mapheader">
      <LeafletMap
        listSearchResult={listingItem}
        currentCenter={
          marker
            ? { lat: marker.lat, lng: marker.lng }
            : listingItem?.country
            ? {
                lat: listingItem.country?.latitude,
                lng: listingItem.country?.longitude,
              }
            : listingItem?.country
            ? {
                lat: listingItem.city?.latitude,
                lng: listingItem.city?.longitude,
              }
            : { lat: 0, lng: 0 }
        }
        zoom={8}
        marker={marker}
      ></LeafletMap>
    </div>
  );
};

export default MapHeader;
