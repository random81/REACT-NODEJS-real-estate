import {
  Tabs, Tab,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import MapComp from './MapComp';
import Comp from './Comp';
import Calculator from './Calculator';

const BootTabs = (props) => {
  // eslint-disable-next-line react/prop-types
  const { dataRequested, htmlMap, xmlTable } = props;
  console.log(`htmlMap ${htmlMap}`);

  useEffect(() => { }, [xmlTable, htmlMap, dataRequested]);

  return (
    <div>
      <Tabs>
        <Tab eventKey="Map" title="Map">
          <MapComp htmlMap={htmlMap} dataRequested={dataRequested}>
            <div id="mapObj" />
          </MapComp>
        </Tab>
        <Tab eventKey="Comp" title="Comp">
          <Comp xmlTable={xmlTable} dataRequested={dataRequested}>
            <div id="tableObj" />
          </Comp>
        </Tab>
        <Tab eventKey="Calculator" title="Calculator">
          <Calculator>
            <div id="calc" />
          </Calculator>
        </Tab>
      </Tabs>
    </div>
  );
};

BootTabs.propTypes = {
  dataRequested: PropTypes.bool.isRequired,
};
export default BootTabs;
