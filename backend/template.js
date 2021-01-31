export default () => `<!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>real estate</title>
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
          <script src = "http://maps.google.com/maps/api/js?sensor=false"></script>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400">
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
          <style>
              a{
                text-decoration: none
              }
          </style>
          <link href="main.css" rel="stylesheet">
        </head>
        <body style="margin:0">
          <div id="root"></div>
          <script type="text/javascript" src="/bundle.js"></script>
        </body>
      </html>`;
