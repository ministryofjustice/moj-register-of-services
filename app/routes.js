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
				organisations: data.getOrganisations(),
				counts: {
					digital_by_default: data.getDigitalMaturityCount('digital-by-default'),
					not_digital_by_default: data.getDigitalMaturityCount('not-digital-by-default'),
					information_site: data.getDigitalMaturityCount('information-site'),
					paper_based: data.getDigitalMaturityCount('paper-based')
				}
			}
		});

});

router.get('/maturity/:maturity/', (req, res) => {

	if (!data.isValidMaturity(req.params.maturity)) {
	
		res.redirect('/');
	
	}
	else {

		res.render('maturity',
			{
				links: {
					'back': `${req.baseUrl}/`
				},
				data: {
					title: data.getDigitalMaturityTitle(req.params.maturity),
					services: data.getServicesByDigitalMaturity(req.params.maturity)
				}
			});

	}

});

router.get('/:organisation/', (req, res) => {

	if (req.params.organisation == 'maturity') {
	
		res.redirect('/');
	
	}
	else {

		let organisation = data.getOrganisation(req.params.organisation);

		console.log(organisation);

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
					services: data.getServicesByOrganisation(organisation.code),
					counts: {
						digital_by_default: data.getDigitalMaturityCountByOrganisation(organisation.code,'digital-by-default'),
						not_digital_by_default: data.getDigitalMaturityCountByOrganisation(organisation.code,'not-digital-by-default'),
						information_site: data.getDigitalMaturityCountByOrganisation(organisation.code,'information-site'),
						paper_based: data.getDigitalMaturityCountByOrganisation(organisation.code,'paper-based')
					}
				}
			});

	}

});

router.get('/:organisation/maturity/', (req, res) => {
	res.redirect('/' + req.params.organisation + '/');
});

router.get('/:organisation/maturity/:maturity/', (req, res) => {

	if (!data.isValidMaturity(req.params.maturity)) {

		res.redirect('/' + req.params.organisation + '/');

	}
	else {

		let organisation = data.getOrganisation(req.params.organisation);

		res.render('maturity',
			{
				links: {
					'back': `${req.baseUrl}/${req.params.organisation}/`
				},
				data: {
					title: data.getDigitalMaturityTitle(req.params.maturity),
					organisation: organisation,
					services: data.getServicesByOrganisationAndDigitalMaturity(organisation.code,req.params.maturity)
				}
			});
	}

});

module.exports = router
