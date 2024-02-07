import React, { useRef, useEffect } from "react";

import "./Map.css";

const Map = (props) => {
  //console.log(props);
  const mapRef = useRef();

  const { center, zoom } = props;

  useEffect(() => {
    //console.log(mapRef.current);
    let map;
    const receivedMap = async () => {
      map = await new window.google.maps.Map(mapRef.current, {
        center: center,
        zoom: zoom,
      });
      await new window.google.maps.Marker({ position: center, map: map });
    };
    receivedMap();
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
};

export default Map;
