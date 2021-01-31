import axios from 'axios';
import Template from '../template';
// make http calls. It supports HTTPS and follows redirects by default.
const restCallMap = (req, res) => {
  /*
    Stage 1/2 of ajax request. Grab the map data from zillow.
    */
  const address = req.body.gajax;
  const addressparsed = JSON.parse(address);
  const street = addressparsed.address1;
  const city = addressparsed.city1;
  const state = addressparsed.state1;

  // replaced '' for api key from zillow here:
  const apiKeyZillow = '';
  const map = `https://www.zillow.com/webservice/GetSearchResults.htm?zws-id=${apiKeyZillow}&address=${street}&citystatezip=${city}%2C${state}`;
  axios.get(map)
    .then((response) => {
      // zillow server response
      res.send(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
const restCall = (req, res) => {
  /*
    Stage 2/2 of ajax request. get comparison data for real estate
    */
  // replaced '' for api key from zillow here:
  const apiKeyZillow = '';
  const zpid = req.body.gajax;
  const url = `https://www.zillow.com/webservice/GetComps.htm?zws-id=${apiKeyZillow}&zpid=${zpid}&count=25`;
  axios.get(url)
    .then((response) => {
      // zillow server body of response
      res.send(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

// Create a new 'render' controller method.
const getContent = (req, res) => {
  res.status(200).send(Template({
  }));
};

export default {
  getContent,
  restCall,
  restCallMap,
};
