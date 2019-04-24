import React from 'react';
import express from 'express';
import morgan from 'morgan';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';

import App from './components/App';
import injectEnv from './inject.env';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST as string);

export default express()
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR as string))
  .use(morgan('dev'))
  .get('/*', (req, res) => {
    const context: { [field: string]: any } = {};

    let markup = renderToString(
      <StaticRouter context={context} location={req.url}>
        <App />
      </StaticRouter>
    );

    if (context.url) {
      res.redirect(context.url);
    } else {
      res.status(200).end(`
        <!doctype html>
        <html lang="">
          <head>
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta charset="utf-8" />
            <title>Infura Explorer</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="apple-touch-icon" sizes="180x180" href="/favicon.png">
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
            <script>
              window.env = ${JSON.stringify(injectEnv)};
            </script>
            <link rel="stylesheet" href="/fonts.css">
            <style>
              .nav-link span,
              .headerfield-container h2,
              .explorerviewcontent-show-newer-container,
              .explorerviewcontent-load-more-container {
                color: transparent;
              }
              body {
                margin: 0;
                padding: 0;
                background: linear-gradient(89.77deg, #584E9A 0.23%, #3A307C 99.77%);
              }
              .nav-header,
              .nav-link {
                opacity: 0;
              }
            </style>
            ${
              assets.client.css
                ? `<link rel="stylesheet" href="${assets.client.css}">`
                : ''
            }
            ${
              process.env.NODE_ENV === 'production'
                ? `<script src="${assets.client.js}" defer></script>`
                : `<script src="${assets.client.js}" defer crossorigin></script>`
            }
          </head>
          <body>
              <div id="root">${markup}</div>
          </body>
        </html>
      `);
    }
  });
