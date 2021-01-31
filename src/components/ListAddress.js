import PropTypes from 'prop-types';
import {
  Label, Input,
} from 'reactstrap';
import React, { useEffect } from 'react';

const ListAddress = (props) => {
  function axiosRequestOld(axios, url, callback, postData) {
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

  function axiosRequest(url, callback, postData) {
    //dynamic load for lower bundle size
    import('axios').then(({ default: axios }) => axiosRequestOld(axios, url, callback, postData));
  }

  function handleRequest(res) {
    /*
        This function gets the data for the map tab.
        It initilizes the google map and then calls the handelReqComp for the zillow data.
        */
    // here we use  req.responseText and then
    // covert it to an xml object.
    const { textToXML, saveXmlComparisons, saveHtmlMap } = props;
    let xml = res.data;
    xml = textToXML(xml);
    const testerror = xml.getElementsByTagName('text');// grab the text from the zillow xml
    if (testerror[0].textContent === 'Error: no exact match found for input address') {
      return;
    }

    // display the map then next automatic ajax call for comparison data.
    const latitude = xml.getElementsByTagName('latitude');
    const longitude = xml.getElementsByTagName('longitude');
    // zpid is required for the data from zillow
    const zpid = xml.getElementsByTagName('zpid');
    const zpidNum = (zpid[0].innerHTML);
    const latitudeNum = Number(latitude[0].textContent);// turn in to a number
    const longitudeNum = Number(longitude[0].textContent);
    // set tha lat and long from the xml data, prepare to sent to context.
    // sending back to wrapper the long and lat data, so that it can create the map
    saveHtmlMap(latitudeNum, longitudeNum);
    axiosRequest('/rest', saveXmlComparisons, zpidNum);
  }

  function getFormAddress() {
    /*
            Returns object literal address from the form of data
        */
    return {
      zip: $('#zip'),
      address: $('#address'),
      city: $('#city'),
      state: $('#state'),
    };
  }

  function viewRow() {
    /*
        A function to view in the map one of the properties stored in the list
        */
    const x = event.target;

    // grab stored propertes list data you wish to view
    const city = x.parentNode.getElementsByClassName('city1');
    const citytext = city[0].innerHTML;
    const address = x.parentNode.getElementsByClassName('address1');
    const addresstext = address[0].innerHTML;
    const state = x.parentNode.getElementsByClassName('state1');
    const stateText = state[0].innerHTML;
    const zip = x.parentNode.getElementsByClassName('zip1');
    const zipText = zip[0].innerHTML;

    // populate into the form
    const formObject = getFormAddress();
    formObject.zip.val(zipText);
    formObject.address.val(addresstext);
    formObject.city.val(citytext);
    formObject.state.val(stateText);
    const map = { address1: addresstext, city1: citytext, state1: stateText };
    const mapString = JSON.stringify(map);
    axiosRequest('/restmap', handleRequest, mapString);
  }

  function deleterow() {
    /*
        A function to delete one of the stored real estate properties from the users list
        */

    // grab the target of the event
    const x = event.target;
    // remove the targe and parentnode of the target
    x.parentNode.remove();
    const strngview = document.getElementById('addListProp').innerHTML;
    // grab inner html of the entire list of perpreties
    sessionStorage.setItem('view', strngview.toString());
    // store into sessionStorage the list
    // clear the storage if spliing on id of state1 results in array shorter than 1 indexes
    if (strngview.split('state1').length < 1) {
      sessionStorage.clear();
    }
    if (sessionStorage.view === undefined) {
      // if sessionsStorage is undefined wipe the list clear with "" string
      document.getElementById('addListProp').innerHTML = '';
    } else {
      document.getElementById('addListProp').innerHTML = sessionStorage.view;
    }

    // IF THE LIST IS NOT EMPY then store the view storage data into the addListprop HTML elemeent
    // restore the events
    $('.view').on('click', viewRow);
    $('.remove').on('click', deleterow);
  }

  function addListEvents() {
    //  add event listeners to the list of save real-estate
    $('.view').on('click', viewRow);
    $('.remove').on('click', deleterow);
  }

  function propList() {
    /*
        A function to store the address to the list of real-estate properties
        */
    // get the address from the form
    const formObject = getFormAddress();
    const zip = formObject.zip.val();
    const address = formObject.address.val();
    const city = formObject.city.val();
    const state = formObject.state.val();
    if ((zip === '') && (address === '') && (city === '') && (state === '')) {
      return;
    }
    // get the storage list target elements for storing the list
    // is session storage view variable not empty
    if (sessionStorage.view !== undefined && sessionStorage.view !== '') {
      const testCity1 = $('.city1').text();
      const testAddress1 = $('.address1').text();
      const testState1 = $('.state1').text();
      const testZip1 = $('.zip1').text();
      //  here we deny a dupicate add request!
      if ((zip === testZip1) && (address === testAddress1) && (city === testCity1) && (state === testState1)) {
        return;
      }
    }
    // undefined here means the storage is empty.
    if (sessionStorage.view === undefined) {
      sessionStorage.view = `<p>[<span class='remove'>remove</span>][<span class='view'>view</span>] <span class='city1'>${city}</span> <span class='address1'>${address}</span> <span class='state1'>${state}</span> <span class='zip1'>${zip}</span></p>`;
    } else {
      sessionStorage.view += `<p>[<span class='remove'>remove</span>][<span class='view'>view</span>] <span class='city1'>${city}</span> <span class='address1'>${address}</span> <span class='state1'>${state}</span> <span class='zip1'>${zip}</span></p>`;
    }
    // assign the stored list to the element
    document.getElementById('addListProp').innerHTML = sessionStorage.view;
    // grab and color font for add properties if a list exists
    if (document.getElementsByClassName('remove')) {
      $('.remove').css('color', 'blue');
      $('.view').css('color', 'blue');
    }
    // add the event listeners
    addListEvents();
    // empty the fields, prep for next data input..
    formObject.zip.val('');
    formObject.address.val('');
    formObject.city.val('');
    formObject.state.val('');
    const addressfocus = document.getElementById('address');
    addressfocus.focus();
  }
  useEffect(() => {
    if (sessionStorage.view === undefined) {
      // if sessionsStorage is undefined wipe the list clear with "" string
      document.getElementById('addListProp').innerHTML = '';
    } else {
      document.getElementById('addListProp').innerHTML = sessionStorage.view;
      addListEvents();
    }
  });

  return (
    <div className="add_property">
      <Input type="submit" onClick={propList} value="Add Property To List" id="AddBtn" />
      <Label>My Properties List</Label>
      <div id="addListProp" />
    </div>
  );
};

ListAddress.propTypes = {
  textToXML: PropTypes.func.isRequired,
  saveXmlComparisons: PropTypes.func.isRequired,
  saveHtmlMap: PropTypes.func.isRequired,
};
export default ListAddress;
