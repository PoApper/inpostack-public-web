import React, { useState, useEffect } from 'react';

const StoreMap = (props) => {
    const [mapLoaded, setMapLoaded] = useState(false);
    const [address1, setAddress1] = useState(props.address1);
    const [name, setName] = useState(props.name);

    useEffect(() => {
      const $script = document.createElement("script");
      $script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_KEY}&autoload=false&libraries=services`;
      $script.addEventListener("load", () => setMapLoaded(true));
      document.head.appendChild($script);
    }, []);

    useEffect(() => {
      if (!mapLoaded) return;
      
      kakao.maps.load(() => {
        var container = document.getElementById('map');
          var options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 4
          };
        
          var map = new kakao.maps.Map(container, options);
          var geocoder = new kakao.maps.services.Geocoder();

          geocoder.addressSearch(address1, (result, status) => { 
            if (status === kakao.maps.services.Status.OK) {
              var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
              var marker = new kakao.maps.Marker({
                map: map,
                position: coords
              });
              map.setCenter(coords);
              marker.setMap(map);
            } 
          });
      }
      )
    }, [mapLoaded]);

    return(
      <div id="map" style={{width: "100%", height: "100px", borderRadius: "8px"}}></div>
    );
}

export default StoreMap;