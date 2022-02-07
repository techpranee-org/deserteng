var express = require('express');
var router = express.Router();
var MachineList = require('../data/machinelist.json');
const sgMail = require('@sendgrid/mail');
var formidable = require("formidable");
// const formidable = require('express-formidable');
var fs = require("fs");
var path = require("path");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const isvalidEmail = (email) => {
	return String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
};
console.log = () => { };
// router.use(formidable());
/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', { title: 'Desert Engineering' });
});
router.get('/contact', function (req, res, next) {
	res.render('contact', { title: 'Desert Engineering', alert: false, error: true, msg: "email could not be sent" });
});
router.get('/about', function (req, res, next) {
	res.render('about', { title: 'Desert Engineering' });
});
router.get('/machines', function (req, res, next) {
	res.render('machines', { title: 'Desert Engineering' });
});
router.get('/certifications', function (req, res, next) {
	res.render('awards', { title: 'Desert Engineering' });
});

router.get('/careers', function (req, res, next) {
	res.render('careers', { title: 'Desert Engineering', alert: false, msg: "" });
});
router.get('/purchase-order', function (req, res, next) {
	res.render('purchaseorder', { title: 'Desert Engineering' });
});

router.get('/machines1', function (req, res, next) {
	res.render('machinesP1', { mlist: MachineList });
	// res.render('machinesP1', { title: 'Desert Engineering' });
});

router.post('/contactus', async (req, res, next) => {
	try {
		console.log('route called');
		let { fname, email, company, message } = req.body;
		console.log(fname, email, company, message);
		const msg = {
			to: process.env.ADMIN_EMAIL_ADDRESS,
			from: process.env.SENDER_EMAIL_ADDRESS,
			subject: `${fname} from company ${company} email : ${email} sent a message`,
			text: `${message}`,
		};
		if (isvalidEmail(email)) {
			console.log("valid email")
			const msg2 = {
				to: email,
				from: process.env.SENDER_EMAIL_ADDRESS,
				subject: "We got your enquiry ! Desert Engineering Group Inc.",
				text: `Thanks for contacting, we will get back to you soon. `,
			};
			sgMail.send(msg2)
		}

		sgMail
			.send(msg)
			.then(() => {
				console.log('email is sent')

				res.status(200).render('contact', { title: 'Desert Engineering', alert: true, error: false, msg: "email sent" })
			})
			.catch((err) => {
				console.log(err.response.body.errors)
				// res.status(500).send({ msg: 'failed' });
				// res.render('contact', { title: 'Desert Engineering', alert: true, error: true, msg: "email could not be sent" })
				res.status(500).render('contact', { title: 'Desert Engineering', alert: true, error: true, msg: "email could not be sent" })
			});
	} catch (error) {
		next(error)
	}



});

router.post('/applynow', (req, res, next) => {

	try {
		const form = new formidable.IncomingForm();
		form.parse(req, function (err, fields, files) {
			if (err) {
				console.log('err in form');
				return next(error)
			}
			let { fname, lname, email, phone, position } = fields;
			console.log(fname, lname, email, phone, position);
			console.log(files.resume);
			if (files.resume.filepath) {
				var oldPath = files.resume.filepath;
				let attachment = fs.readFileSync(oldPath).toString("base64");
				const msg = {
					// to: 'rajulapudip@gmail.com',
					to: 'cs@desertengrg.com',
					from: 'praneeth@techpranee.com',
					subject: `${fname, " ", lname} applied for : ${position} position`,
					text: `${fname, " ", lname} with email : ${email} has applied for : ${position} position.Phone : ${phone} `,
					attachments: [
						{
							content: attachment,
							filename: `${files.resume.originalFilename}`,
							type: "application/pdf",
							disposition: "attachment"
						}
					]
				};
				sgMail
					.send(msg)
					.then(() => {
						console.log('email is sent')
						res.status(200).render('careers', { title: 'Desert Engineering', alert: true, error: false, msg: "email sent" })
					})
					.catch((err) => {
						console.log(err.response.body.errors)
						res.status(500).render('careers', { title: 'Desert Engineering', alert: true, error: true, msg: "email could not be sent" })
					});
			} else {
				console.log('else block')
				res.render('careers', { title: 'Desert Engineering', alert: false, msg: "error" })
			}
		});
	} catch (error) {
		console.log(files.resume.filepath)
		next(error)
	}

});




module.exports = router;
