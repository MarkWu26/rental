'use client'

import L from 'leaflet'
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'

import "leaflet/dist/leaflet.css"
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import {  memo, useRef, useMemo, useEffect, useState } from 'react'
import useZoom from '../hooks/useZoom';
import useCountries from '../hooks/useCountries'
import axios from 'axios'

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src
})

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[],
  value: string;
}

interface MapProps {
    center?: Number[];
    onChange?: (value: CountrySelectValue) => void;
    value?: CountrySelectValue;
    isDraggable?: boolean,

}

const Map: React.FC<MapProps> = ({
    center,
    value,
    onChange,
    isDraggable,
}) => {
const {zoom, setZoom} = useZoom()

const handleZoomEnd = (event:any) => {
  // Do something with the updated zoom level
  const newZoom = event.target.getZoom();
  setZoom(newZoom)
};

const MapComponent = () => {
  const map = useMap();
  
  useEffect(() => {
    // Attach the zoomend event listener to the map
    map.on('zoomend', handleZoomEnd);

    // Cleanup the event listener on component unmount
    return () => {
      map.off('zoomend', handleZoomEnd);
    };
  }, [map]);

  return null; // No need to render anything for this component
};

  const [country, setCountry] = useState<CountrySelectValue | undefined>(undefined);
  const {getByValue} = useCountries();

  const markerRef = useRef(null);
  
  const apikey = process.env.NEXT_PUBLIC_GEO_CODE_KEY
  
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker: any = markerRef.current;
        if (marker != null) {       
        
          const { lat, lng } = marker.getLatLng();
         
          const newFunction = async () => {
            try {
              const response = await axios.get(
                `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apikey}`
              );
              const countryCode =
                response.data.results[0]?.components?.country_code ||
                'Country not found';

              const newCountry = getByValue(countryCode.toUpperCase());
              setCountry(newCountry);

              const newValue = {
                ...newCountry,
                latlng: [lat, lng],
              };
              onChange?.(newValue as CountrySelectValue);
            } catch (error: any) {
              console.error('Error fetching country:', error.message);
            }
          };
          newFunction();
         
        }
      }
    }),
    [onChange, getByValue, apikey]
  );


  
  return (
    <MapContainer
        center={center as L.LatLngExpression || [51, -0.09]}
        zoom={isDraggable ? zoom : 15}
        scrollWheelZoom={true}
        className='h-[35vh] rounded-lg'
        
    >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {center && (
                <Marker 
                position={center as L.LatLngExpression}
                draggable={isDraggable}
                ref={markerRef}
                eventHandlers={eventHandlers}
                autoPan
                />
            )}
             <MapComponent />
    </MapContainer>
  )
}

export default memo(Map);