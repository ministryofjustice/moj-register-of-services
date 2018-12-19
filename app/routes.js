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

		res.render('maturity',
			{
				links: {
					back: `${req.baseUrl}/`
				},
				data: {
					title: data.getDigitalMaturityTitle(req.params.maturity),
					list_type: 'department',
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

		// Total number of providers
		let count = data.getServicesCountByOrganisation(organisation.code);

		// Prevent users putting in a limit not in the pre-defined set: 10, 25, 50, 100
		let limit = 100;
		if ([10,25,50,100].indexOf(parseInt(req.query.limit)) !== -1) {
			let limit = (req.query.limit) ? parseInt(req.query.limit) : 100;
		}

		let sort_by = (req.query.sort) ? req.query.sort : 'name';
		let sort_order = (req.query.order) ? req.query.order : 'asc';

		// Current page
		let page = (req.query.page) ? parseInt(req.query.page) : 1;

		// Total number of pages
		let page_count = Math.ceil(count / limit);

		let start_page = 1;
		let end_page = 5;

		// First five pages
		if (page > 3) {
			start_page = page - 2;
			end_page = page + 2;
		}

		// Last five pages
		if (page > (page_count - 3)) {
			start_page = page_count - 4;
			end_page = page_count;
		}

		let prev_page = page - 1;
		let next_page = page + 1;

		let start_item = (page == 1) ? page : ((page*limit)-limit)+1;
		let end_item = (page == 1) ? (page*limit) : ((start_item+limit)-1);

		res.render('organisation',
			{
				links: {
					back: `${req.baseUrl}/`,
					types: {
						'digital_by_default': `${req.baseUrl}/${req.params.organisation}/maturity/digital-by-default`,
						'not_digital_by_default': `${req.baseUrl}/${req.params.organisation}/maturity/not-digital-by-default`,
						'information_site': `${req.baseUrl}/${req.params.organisation}/maturity/information-site`,
						'paper_based': `${req.baseUrl}/${req.params.organisation}/maturity/paper-based`
					}
				},
				data: {
					organisation: organisation,
					services: data.getServicesByOrganisation(organisation.code, sort_by, sort_order, limit, page),
					counts: {
						digital_by_default: data.getServicesCountByOrganisationAndDigitalMaturity(organisation.code, 'digital-by-default'),
						not_digital_by_default: data.getServicesCountByOrganisationAndDigitalMaturity(organisation.code, 'not-digital-by-default'),
						information_site: data.getServicesCountByOrganisationAndDigitalMaturity(organisation.code, 'information-site'),
						paper_based: data.getServicesCountByOrganisationAndDigitalMaturity(organisation.code, 'paper-based')
					}
				},
				pagination: {
					total_count: count,
					start_item: start_item,
					end_item: end_item,
					page_count: page_count,
					current_page: page,
					start_page: start_page,
					end_page: end_page,
					prev_page: prev_page,
					next_page: next_page,
					limit: limit,
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

		res.render('maturity',
			{
				links: {
					back: `${req.baseUrl}/${req.params.organisation}/`
				},
				data: {
					title: data.getDigitalMaturityTitle(req.params.maturity),
					list_type: 'organisation',
					organisation: organisation,
					services: data.getServicesByOrganisationAndDigitalMaturity(organisation.code, req.params.maturity)
				}
			});
	}

});

module.exports = router;
