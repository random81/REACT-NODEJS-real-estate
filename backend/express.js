import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import webpack from 'webpack';
import webpackDevMiddle from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import Template from './template';
import routes from './routes/index.routes';
// uncomment per instructed below for webpack analysis:
// import webpackConfig from '../webpack.config.front.production';
import webpackConfigDev from '../webpack.config';

const env = process.env.NODE_ENV || 'development';

const app = express();

if (env === 'development') {
  const compiler = webpack(webpackConfigDev);
  app.use((webpackDevMiddle)(compiler, {
    publicPath: webpackConfigDev.output.publicPath,
  }));
  app.use((webpackHotMiddleware)(compiler));
} else {
  console.log(`${env} this is env in express production mode, uncomment in express.js for webpack analysis`);
  /* uncomment for webpack analysis:
  const compiler = webpack(webpackConfig);
  app.use((webpackDevMiddle)(compiler, {
    publicPath: webpackConfig.output.publicPath,
  }));
  */
}
app.use(cors());
// changing to dist folder of webpack
app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', routes);
app.get('*', (req, res) => {
  res.status(200).send(Template({
  }));
});

export default app;
