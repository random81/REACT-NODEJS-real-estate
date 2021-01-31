import React, { Component } from 'react';
import {
  Form, Label, Input,
} from 'reactstrap';
import PropTypes from 'prop-types';

export default class AddressForm extends Component {
  constructor(props) {
    // The super keyword is used to access and call functions on an object's parent.
    super(props);
    // Inside the constructor we’re setting the initial state of the component
    // Initializing local state by assigning an object to this.state.
    this.state = {
      address: '',
      city: '',
      state: '',
      zip: '',
    };
    // Binding event handler methods to an instance.
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangeState = this.onChangeState.bind(this);
    this.onChangeZip = this.onChangeZip.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleRequest = this.handleRequest.bind(this);
  }

  handleRequest(res) {
    /*
        This function gets the data for the map tab.
        It initilizes the google map and then calls the saveXmlComparisons
        for the zillow data from parent wrapper
        */
    const { textToXML, saveXmlComparisons, saveHtmlMap } = this.props;
    // covert responseText to an xml object.
    let xml = res.data;
    // convert it to xml data so you can insert into html
    xml = textToXML(xml);
    const errormaptest = document.getElementsByClassName('errorMap');
    /// this is where the display error style should be implemented if a error in zillow data occurs
    const testerror = xml.getElementsByTagName('text');// grab the text from the zillow xml
    if (testerror[0].textContent === 'Error: no exact match found for Input address') {
      return; // end the function now.
    }
    const latitude = xml.getElementsByTagName('latitude');
    const longitude = xml.getElementsByTagName('longitude');
    // zpid is required for the data from zillow
    const zpid = xml.getElementsByTagName('zpid');
    const zpidNum = (zpid[0].innerHTML);
    const latitudeNum = Number(latitude[0].textContent);// turn in to a number
    const longitudeNum = Number(longitude[0].textContent);
    // sending back to wrapper the long and lat data,
    // so that it can create map, set refreash to true
    saveHtmlMap(latitudeNum, longitudeNum);
    // get the data from zillow
    this.axiosRequest('/rest', saveXmlComparisons, zpidNum);
  }

  onChangeAddress(e) {
    this.setState({
      // the object onto which the event was dispatched.
      address: e.target.value,
    });
  }

  onChangeCity(e) {
    this.setState({
      city: e.target.value,
    });
  }

  onChangeState(e) {
    this.setState({
      state: e.target.value,
    });
  }

  onChangeZip(e) {
    this.setState({
      zip: e.target.value,
    });
  }

  onSubmit(e) {
    // prevent form activity from normal behavior 
    e.preventDefault();
    const {
      address, city, state, zip,
    } = this.state;
    const postData = {
      address,
      city,
      state,
      zip,
    };
    const map = { address1: postData.address, city1: postData.city, state1: postData.state };
    const mapString = JSON.stringify(map);

    if ((address) && (city) && (state) && (zip)) {
      // call map here to avoid being on wrong tab :
      $('#Map').trigger('click');
      this.axiosRequest('/restmap', this.handleRequest, mapString);
    }
    // reset state
    this.setState({
      address: '',
      city: '',
      state: '',
      zip: '',
    });
  }

  axiosRequestOld(axios, url, callback, postData) {
    // if we received the data, send it to the callback to populate the comparison tab or map
    axios.post(`${url}`, { gajax: `${postData}` })
      .then((response) => {
        // handle success
        if (postData) {
          console.log(response.data);
          callback(response);
        }
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }

  axiosRequest(url, callback, postData) {
    // dynamic load for lower bundle size
    import('axios').then(({ default: axios }) => this.axiosRequestOld(axios, url, callback, postData));
  }

  render() {
    const {
      address, city, state, zip,
    } = this.state;
    return (
      <div>
        <div id="googleMap" />
        <fieldset>
          <legend>Enter Property Address:</legend>
          <Form onSubmit={this.onSubmit}>
            <Label>
              Address:
              <Input
                type="text"
                required
                name="address"
                size="25"
                id="address"
                value={address}
                onChange={this.onChangeAddress}
              />
            </Label>
            <Label>
              City:
              <Input
                type="text"
                required
                name="city"
                size="25"
                id="city"
                value={city}
                onChange={this.onChangeCity}
              />
            </Label>
            <Label>
              State:
              <Input
                type="text"
                required
                name="state"
                size="25"
                id="state"
                value={state}
                onChange={this.onChangeState}
              />
            </Label>
            <Label>
              Zip:
              <Input
                type="text"
                required
                name="zip"
                size="25"
                id="zip"
                value={zip}
                onChange={this.onChangeZip}
              />
            </Label>
            <br />
            <br />
            <Input type="submit" id="submitBtn" value="submit" />
          </Form>
        </fieldset>
      </div>
    );
  }
}

AddressForm.propTypes = {
  textToXML: PropTypes.func.isRequired,
  saveXmlComparisons: PropTypes.func.isRequired,
  saveHtmlMap: PropTypes.func.isRequired,
};
