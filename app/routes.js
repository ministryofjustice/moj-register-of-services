const express = require('express');
const router = express.Router();

const data = require('./data');

router.get('/', (req, res) => {

	res.render('index',
		{
			links: {
				types: {
					'digital_by_default': `${req.baseUrl}/maturity/digital-by-default`,
					'not_digital_by_default': `${req.baseUrl}/maturity/not-digital-by-default`,
					'information_site': `${req.baseUrl}/maturity/information-site`,
					'paper_based': `${req.baseUrl}/maturity/paper-based`
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
					'digital_by_default': `${req.baseUrl}/${req.params.organisation}/maturity/digital-by-default`,
					'not_digital_by_default': `${req.baseUrl}/${req.params.organisation}/maturity/not-digital-by-default`,
					'information_site': `${req.baseUrl}/${req.params.organisation}/maturity/information-site`,
					'paper_based': `${req.baseUrl}/${req.params.organisation}/maturity/paper-based`
				}
			},
			data: {
				organisation: organisation,
				services: data.getServicesByOrganisation(organisation.code)
			}
		});

});

router.get('/maturity/:maturity/', (req, res) => {

	res.render('maturity',
		{
			links: {
				'back': `${req.baseUrl}/`
			},
			data: {
				title: data.getServiceMaturityTitle(req.params.maturity)
			}
		});

});

router.get('/:organisation/maturity/:maturity/', (req, res) => {

	res.render('maturity',
		{
			links: {
				'back': `${req.baseUrl}/${req.params.organisation}/`
			},
			data: {
				title: data.getServiceMaturityTitle(req.params.maturity),
				organisation: data.getOrganisation(req.params.organisation),
				services: data.getServiceByMaturity(req.params.maturity)
			}
		});

});

module.exports = router
