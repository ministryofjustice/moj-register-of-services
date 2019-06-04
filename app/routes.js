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
					digital_by_default: data.getServicesCountByDigitalMaturity('digital-by-default'),
					not_digital_by_default: data.getServicesCountByDigitalMaturity('not-digital-by-default'),
					information_site: data.getServicesCountByDigitalMaturity('information-site'),
					paper_based: data.getServicesCountByDigitalMaturity('paper-based')
				}
			}
		});

});

router.get('/maturity/:maturity/', (req, res) => {

	if (!data.isValidDigitalMaturity(req.params.maturity)) {

		res.redirect('/');

	}
	else {

		// Total number of providers
		let count = data.getServicesCountByDigitalMaturity(req.params.maturity);

		let sort_by = (req.query.sort) ? req.query.sort : 'name';
		let sort_order = (req.query.order) ? req.query.order : 'asc';

		res.render('maturity',
			{
				links: {
					back: `${req.baseUrl}/`,
					list: `${req.baseUrl}/maturity/${req.params.maturity}/`
				},
				data: {
					title: data.getDigitalMaturityTitle(req.params.maturity),
					list_type: 'department',
					services: data.getServicesByDigitalMaturity(req.params.maturity, sort_by, sort_order)
				},
				pagination: {
					sort_by: sort_by,
					sort_order: sort_order
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

		let sort_by = (req.query.sort) ? req.query.sort : 'name';
		let sort_order = (req.query.order) ? req.query.order : 'asc';

		res.render('organisation',
			{
				links: {
					back: `${req.baseUrl}/`,
					list: `${req.baseUrl}/${req.params.organisation}/`,
					types: {
						'digital_by_default': `${req.baseUrl}/${req.params.organisation}/maturity/digital-by-default`,
						'not_digital_by_default': `${req.baseUrl}/${req.params.organisation}/maturity/not-digital-by-default`,
						'information_site': `${req.baseUrl}/${req.params.organisation}/maturity/information-site`,
						'paper_based': `${req.baseUrl}/${req.params.organisation}/maturity/paper-based`
					}
				},
				data: {
					organisation: organisation,
					services: data.getServicesByOrganisation(organisation.code, sort_by, sort_order),
					counts: {
						digital_by_default: data.getServicesCountByOrganisationAndDigitalMaturity(organisation.code, 'digital-by-default'),
						not_digital_by_default: data.getServicesCountByOrganisationAndDigitalMaturity(organisation.code, 'not-digital-by-default'),
						information_site: data.getServicesCountByOrganisationAndDigitalMaturity(organisation.code, 'information-site'),
						paper_based: data.getServicesCountByOrganisationAndDigitalMaturity(organisation.code, 'paper-based')
					}
				},
				pagination: {
					sort_by: sort_by,
					sort_order: sort_order
				}
			});

	}

});

router.get('/:organisation/maturity/', (req, res) => {
	res.redirect('/' + req.params.organisation + '/');
});

router.get('/:organisation/maturity/:maturity/', (req, res) => {

	if (!data.isValidDigitalMaturity(req.params.maturity)) {

		res.redirect('/' + req.params.organisation + '/');

	}
	else {

		let organisation = data.getOrganisation(req.params.organisation);

		let sort_by = (req.query.sort) ? req.query.sort : 'name';
		let sort_order = (req.query.order) ? req.query.order : 'asc';

		res.render('maturity',
			{
				links: {
					back: `${req.baseUrl}/${req.params.organisation}/`,
					list: `${req.baseUrl}/${req.params.organisation}/maturity/${req.params.maturity}/`
				},
				data: {
					title: data.getDigitalMaturityTitle(req.params.maturity),
					list_type: 'organisation',
					organisation: organisation,
					services: data.getServicesByOrganisationAndDigitalMaturity(organisation.code, req.params.maturity, sort_by, sort_order)
				},
				pagination: {
					sort_by: sort_by,
					sort_order: sort_order
				}
			});
	}

});

module.exports = router;
