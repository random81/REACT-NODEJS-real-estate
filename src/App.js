import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { FaBusinessTime } from 'react-icons/fa';
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import AddressForm from './components/AddressForm';
import BootTabs from './components/BootTabs';
import ListAddress from './components/ListAddress';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataRequested: false,
      xmlTable: {},
      htmlMap: {},
    };

    this.saveXmlComparisons = this.saveXmlComparisons.bind(this);
    this.saveHtmlMap = this.saveHtmlMap.bind(this);
    this.textToXML = this.textToXML.bind(this);
  }

  saveHtmlMap(latitude, longitude) {
    // change this to receive the address instead decouple from zillow api.
    const googleMapOut = $('#expr');
    googleMapOut.width('100%');
    googleMapOut.height('400px');
    const mapObj = new google.maps.Map(googleMapOut[0], {
      zoom: 15,
      center: {
        lng: longitude,
        lat: latitude,
      },
      myTypeId: window.google.maps.MapTypeId.ROADMAP,
    });
    const divChild = $('#expr');
    this.setState({ htmlMap: divChild });
    this.setState({ dataRequested: true });
  }

  textToXML(text) {
    try {
      let xml = null;
      if (window.DOMParser) {
        const parser = new DOMParser();
        xml = parser.parseFromString(text, 'text/xml');
        const found = xml.getElementsByTagName('parsererror');
        if (!found || !found.length || !found[0].childNodes.length) {
          return xml;
        }
        return null;
      }
      xml = new window.ActiveXObject('Microsoft.XMLDOM');
      xml.async = false;
      xml.loadXML(text);
      return xml;
    } catch (e) {
      return e;
    }
  }

  saveXmlComparisons(req) {
    let xml = req.data;
    xml = this.textToXML(xml);
    this.setState({ xmlTable: xml });
  }

  render() {
    const { xmlTable, htmlMap, dataRequested } = this.state;
    return (
      <div>
        <div id="wrapper">
          <Container>
            <Row>
              <Col md="12">
                <header>
                  <FaBusinessTime />
                  <h1> Real Estate App</h1>
                  <p>
                    Attention
                    <br />
                    You need to assign 'apiKeyZillow' variable a zillow-api key for the app to work
                  </p>
                </header>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <article>
                  <AddressForm
                    textToXML={this.textToXML}
                    saveXmlComparisons={this.saveXmlComparisons}
                    saveHtmlMap={this.saveHtmlMap}
                  />
                  <ListAddress
                    textToXML={this.textToXML}
                    saveXmlComparisons={this.saveXmlComparisons}
                    saveHtmlMap={this.saveHtmlMap}
                  />
                </article>
              </Col>
              <Col md="6">
                <article>
                  <BootTabs
                    xmlTable={xmlTable}
                    htmlMap={htmlMap}
                    dataRequested={dataRequested}
                  />
                </article>
              </Col>
              <div className="clear" />
            </Row>
          </Container>
          <Row>
            <Col md="6" id="endExpr">
              <div id="expr" />
            </Col>
            <Col md="6" id="filler" />
          </Row>
        </div>
      </div>
    );
  }
}
