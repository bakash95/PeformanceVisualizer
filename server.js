const express = require('express');
const favicon = require('express-favicon');
const compression = require('compression')
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
app.use(compression())
app.use(favicon(__dirname + '/build/favicon.png'));
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.use(function (request, response, nextCall) {
  if (request.secure) {
    nextCall();
  } else {
      response.redirect('https://' + request.headers.host + request.url);
  }
})
app.get('/ping', function (req, res) {
  return res.send('pong');
});
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(port);