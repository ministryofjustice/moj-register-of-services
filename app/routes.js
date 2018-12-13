const express = require('express');
const router = express.Router();

const data = require('./data');

router.get('/', (req, res) => {

	res.render('index',
		{
			links: {
				types: {
					'digital_by_default': `${req.baseUrl}/type/digital-by-default`,
					'not_digital_by_default': `${req.baseUrl}/type/not-digital-by-default`,
					'information_site': `${req.baseUrl}/type/information-site`,
					'paper_based': `${req.baseUrl}/type/paper-based`
				}
			},
			data: {
				organisations: data.getOrganisations()
			}
		});

});

router.get('/:organisation/', (req, res) => {

	let organisation = data.getOrganisation(req.params.organisation);

	res.render('organisation',
		{
			links: {
				'back': `${req.baseUrl}/`,
				types: {
					'digital_by_default': `${req.baseUrl}/${req.params.organisation}/type/digital-by-default`,
					'not_digital_by_default': `${req.baseUrl}/${req.params.organisation}/type/not-digital-by-default`,
					'information_site': `${req.baseUrl}/${req.params.organisation}/type/information-site`,
					'paper_based': `${req.baseUrl}/${req.params.organisation}/type/paper-based`
				}
			},
			data: {
				organisation: organisation,
				services: data.getServicesByOrganisation(organisation.code)
			}
		});

});

router.get('/type/:type/', (req, res) => {

	res.render('type',
		{
			links: {
				'back': `${req.baseUrl}/`
			},
			data: {
				
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

router.get('/:organisation/type/:type/', (req, res) => {

	res.render('type',
		{
			links: {
				'back': `${req.baseUrl}/${req.params.organisation}/`
			},
			data: {
				
			}
		});

});

module.exports = router
