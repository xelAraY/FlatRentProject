import { useState } from "react";
import { Map, Placemark, YMaps, ZoomControl } from "@pbe/react-yandex-maps";
import React from "react";

interface MapInfo {
  coordinates: [number, number];
  houseNumber: string;
}

export const SingleObjectMap = ({ coordinates, houseNumber }: MapInfo) => {
  const [mapData, _setMapData] = useState({
    center: coordinates,
    zoom: 12,
  });

  return (
    <YMaps
      query={{
        load: "package.full",
        apikey: "9b519c88-ed0c-45e5-934a-7132b8bc1451",
      }}
    >
      <Map defaultState={mapData} options={{ minZoom: 5 }}>
        <Placemark
          geometry={coordinates}
          properties={{
            iconContent: `д. ${houseNumber}`,
          }}
          options={{
            preset: "islands#violetStretchyIcon",
          }}
        />
        <ZoomControl />
      </Map>
    </YMaps>
  );
};
