import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const MapComp = (props) => {
  // eslint-disable-next-line react/prop-types
  const { dataRequested, htmlMap } = props;
  let mapCopy = '';
  function loadMap() {
    const googleMapOut = $('#mapCopy');
    if (dataRequested) {
      mapCopy = Object.assign(htmlMap[0]);
      googleMapOut[0].append(mapCopy);
      $('#mapCopy').css('position', 'relative');
    }
  }
  useEffect(() => {
    loadMap();
  });
  return (
    <div id="mapCopy" />
  );
};

MapComp.propTypes = {
  dataRequested: PropTypes.bool.isRequired,
};
export default MapComp;
