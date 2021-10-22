var express = require('express');
var router = express.Router();
var MachineList = require('../data/machinelist.json');

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', { title: 'Express' });
});
router.get('/contact', function (req, res, next) {
	res.render('contact', { title: 'Express' });
});
router.get('/about', function (req, res, next) {
	res.render('about', { title: 'Express' });
});
router.get('/machines', function (req, res, next) {
	res.render('machines', { title: 'Express' });
});
router.get('/awards', function (req, res, next) {
	res.render('awards', { title: 'Express' });
});
router.get('/careers', function (req, res, next) {
	res.render('careers', { title: 'Express' });
});
router.get('/purchase-order', function (req, res, next) {
	res.render('purchaseorder', { title: 'Express' });
});

router.get('/machines1', function (req, res, next) {
	res.render('machinesP1', { mlist: MachineList });
	// res.render('machinesP1', { title: 'Express' });
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
