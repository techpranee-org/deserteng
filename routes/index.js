var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', { title: 'Express' });
});

router.post('/contactus', async (req, res, next) => {
	console.log('route called');
	let fname = req.body.fname;
	let lname = req.body.lname;
	let email = req.body.email;
	let message = req.body.message;

	// let response = await sendEmail({
	// 	email: 'sateeshreddy.y@byovet.com',
	// 	subject: `${(fname, lname)} with email : ${email} has contacted Byovet`,
	// 	text: message,
	// });
	if (response.status === 200) {
		res.status(200).send({ msg: 'OK' });
	} else {
		console.log('could not send email');
		// res.status(200).send({ msg: 'OK' });
	}
});

module.exports = router;
