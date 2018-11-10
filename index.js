var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

<script src="https://media.twiliocdn.com/sdk/js/chat/v3.0/twilio-chat.min.js"></script>
