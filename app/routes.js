const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
	res.render('index',
		{
			data: {
				organisations: ''
			}
		});
});

router.get('/:organisation/', (req, res) => {
	res.render('organisation',
		{
			links: {
				'back': `${req.baseUrl}/`
			},
			data: {
				organisation: '',
				services: ''
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
				organisation: '',
				service: ''
			}
		});
});

module.exports = router
