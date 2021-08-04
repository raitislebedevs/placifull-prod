import 'leaflet/dist/leaflet.css';
import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css';
import 'leaflet/dist/leaflet.js';
import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder.js';

import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import * as ELG from 'esri-leaflet-geocoder';
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  useMapEvents,
  Popup
} from 'react-leaflet';
import {
  OpenStreetMapProvider,
  AlgoliaProvider,
  EsriProvider
} from 'leaflet-geosearch';

//Change icon Marker, because icon from the library broken
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png'
});

//set up search provider
const provider = new EsriProvider();

/**
* LeafletMap should be immported using next/dynamic with ssr:false
* Example:

const LeafletMap = dynamic(() => import('components/common/LeafletMap'), {
  ssr: false
});
*/

/**
 * @param {id} String id of the MapContainer
 * @param {children} Component children component
 * @param {currentCenter} { lat: Number, lng: Number } current center position
 * @param {zoom} Number zoom level
 * @param {currentPosition} { position: {lat: Number, lng: Number}, popUp: Component } Current position of the marker
 * @param {markers} [{ position: {lat: Number, lng: Number}, popUp: Component }] A list of markers
 * @param {setCurrentPosition} (position, popUp) => { position, popUp } Set current position of the marker
 */
export default function LeafletMap(props) {
  const {
    id,
    children,
    currentCenter,
    zoom,
    markers,
    marker,
    setCurrentCenter,
    currentPosition,
    setCurrentPosition,
    searchText,
    handleSearchResult,
    setIsLoadingSearch,
    listSearchResult
  } = props;
  const [map, setMap] = useState(null);
  useEffect(() => {
    if (map) {
      map.setView(currentCenter, zoom);
    }
  }, [currentCenter]);

  useEffect(() => {
    if (searchText) {
      handlesearch();
    }
  }, [searchText]);

  const handlesearch = async () => {
    setIsLoadingSearch(true);
    let results = [];
    if (searchText) {
      results = await provider.search({ query: searchText });
    }
    handleSearchResult(results || []);
    setIsLoadingSearch(false);
  };

  return (
    <>
      <MapContainer
        style={{ height: '100%', width: '100%' }}
        id={id}
        center={currentCenter}
        whenCreated={setMap}
        zoom={zoom || 10}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {setCurrentPosition && (
          <MapComponent
            currentPosition={currentPosition}
            setCurrentPosition={setCurrentPosition}
          />
        )}
        {currentPosition && (
          <Marker position={currentPosition.position}>
            {currentPosition?.popUp && <Popup>{currentPosition?.popUp}</Popup>}
          </Marker>
        )}
        {listSearchResult &&
          listSearchResult.length > 0 &&
          listSearchResult.map((item, idx) => (
            <Marker
              position={{ lat: item.latitude, lng: item.longitude }}
              key={idx}
            >
              {item.popup && <Popup>{item.popup}</Popup>}
            </Marker>
          ))}
        {marker && (
          <Marker position={{ lat: marker.lat, lng: marker.lng }}></Marker>
        )}
        {children}
      </MapContainer>
    </>
  );
}

//Map component using hooks. This component is meant for Ersi Leaflet, which enables address search
//See more: https://react-leaflet.js.org/docs/api-map#hooks
function MapComponent({ setCurrentPosition, currentPosition }) {
  const map = useMap();
  const mapEvent = useMapEvents({
    click: e => {
      setCurrentPosition({ ...currentPosition, position: e.latlng });
    }
  });
  useEffect(() => {
    //Resize the view
    setTimeout(() => {
      map.invalidateSize();
    }, 250);

    //Add search to map
    const searchControl = new ELG.Geosearch().addTo(map);
    const results = new L.LayerGroup().addTo(map);

    //Handle search
    searchControl.on('results', function(data) {
      results.clearLayers();
      for (let i = data.results.length - 1; i >= 0; i--) {
        results.addLayer(L.marker(data.results[i].latlng));
      }
      setSearchTextResult(data.text || []);
      //Return lat and lng to the parent component
      setCurrentPosition({ ...currentPosition, position: data.latlng });
    });
  }, [map]);

  return null;
}
