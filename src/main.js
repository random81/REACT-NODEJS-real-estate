import React from 'react';
import { AppContainer } from 'react-hot-loader';
import ReactDOM from 'react-dom';
import App from './App';

const render = (App) => {
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById('root')
  );
};

render(App);
if (module.hot) {
  module.hot.accept('./App.js', () => {
    const NextApp = require('./App.js').default;
    render(NextApp);
  });
}
