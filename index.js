const express = require('express');
const bodyParser = require('body-parser');
const InfiniteMailer = require('infinite-mailer');
const config = require('./config');
const app = express();

let infiniteMailer = new InfiniteMailer(config);
infiniteMailer.on('sent', (data) => console.log('sent', data));
infiniteMailer.on('error', (error) => console.log('error', error));

app.use(bodyParser.json());

app.post('/send', (req, res) => {
	infiniteMailer.send(req.body, (error) => {
		if(error) {
			return res.json(error, 500);
		}
		res.json({success: true});
	});
});

app.listen(5000, () => {
  console.log('Example app listening on port 5000!');
});