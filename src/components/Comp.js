import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const Comp = (props) => {
  // eslint-disable-next-line react/prop-types
  const { dataRequested, xmlTable } = props;
  // run after render
  function loadTable() {
    // we will test is dataRequested and tableGenerated
    if (dataRequested) {
      const response = document.getElementById('tableCopy');
      // retrive from the request object the response with the data from the server
      // eslint-disable-next-line react/prop-types
      const items = xmlTable.getElementsByTagName('address');
      // eslint-disable-next-line react/prop-types
      const amount = xmlTable.getElementsByTagName('amount');
      // get the length of the path same as title
      const len = items.length;
      let output = '<table><thead><tr><th>Address</th><th>City</th><th>State</th><th>Zip</th><th>Amount</th></tr></thead><tbody>';
      for (let i = 0; i < len; i += 1) {
        output += '<tr>';
        // get data of elements
        output += `<td>${items[i].getElementsByTagName('street')[0].firstChild.nodeValue}</td>`;
        output += `<td>${items[i].getElementsByTagName('city')[0].firstChild.nodeValue}</td>`;
        output += `<td>${items[i].getElementsByTagName('state')[0].firstChild.nodeValue}</td>`;
        output += `<td>${items[i].getElementsByTagName('zipcode')[0].firstChild.nodeValue}</td>`;
        output += '<td>';
        output += amount[i].textContent > 0 ? `${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount[i].textContent)}</td>` : 'no data available </td>';
        output += '</tr>';
      }
      output += '</tbody></table>';
      response.innerHTML = output;
    }
  }
  useEffect(() => {
    loadTable();
  }, [xmlTable]);

  return (
    <div id="tableCopy" />
  );
};

Comp.propTypes = {
  dataRequested: PropTypes.bool.isRequired,
};
export default Comp;
