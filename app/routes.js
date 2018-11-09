const express = require('express');
const router = express.Router();

const data = require('./data');

router.get('/', (req, res) => {
	
	console.log(data.getOrganisations());

	res.render('index',
		{
			data: {
				organisations: data.getOrganisations()
			}
		});
});

router.get('/:organisation/', (req, res) => {

	console.log(data.getOrganisation(req.params.organisation));

	res.render('organisation',
		{
			links: {
				'back': `${req.baseUrl}/`
			},
			data: {
				organisation: data.getOrganisation(req.params.organisation),
				services: data.getServicesByOrganisation(req.params.organisation)
			}
		});
});

router.get('/:organisation/:service/', (req, res) => {
	res.render('service',
		{
			links: {
				'back': `${req.baseUrl}/${req.params.organisation}/`
			},
			data: {
				organisation: data.getOrganisation(req.params.organisation),
				service: data.getService(req.params.service)
			}
		});
});

module.exports = router
