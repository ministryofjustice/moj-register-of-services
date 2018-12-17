let organisations = require('./data/organisations.json');
let services = require('./data/services.json');

let digital_maturity = ["digital-by-default","not-digital-by-default","information-site","paper-based"];

module.exports = {

	isValidOrganisation: (organisation) => {
		if (!organisation) return false


	},

	isValidService: (service) => {
		if (!service) return false

			
	},

	isValidMaturity: (maturity) => {
		if (!maturity) return false

		return (!!~digital_maturity.indexOf(maturity));
	},

	getOrganisations: () => {
		return organisations;
	},

	getOrganisation: (organisation) => {
		if (!organisation) return null

		let data = organisations.filter( (obj) => {
			return (obj.slug == organisation);
		})

		return data[0];
	},

	getServicesByOrganisation: (organisation) => {
		if (!organisation) return null

		let data = services.filter( (obj) => {
	        return !!~obj.organisation.indexOf(organisation);
	    });

		return data;
	},

	getService: (service) => {
		if (!service) return null

		let data = services.filter( (obj) => {
			return (obj.slug == service);
		})

		return data[0];
	},

	getServicesByMaturity: (maturity) => {
		if (!maturity) return null

		let data = services.filter( (obj) => {
			return (obj.maturity == maturity);
		})

		return data[0];
	},

	getServiceMaturityTitle: (maturity) => {
		if (!maturity) return null

		let title = "Hello world!";

		switch (maturity) {
			case 'digital-by-default':
				title = "Digital by default";
				break;
			case 'not-digital-by-default':
				title = "Not digital by default";
				break;
			case 'information-site':
				title = "Information site";
				break;
			case 'paper-based':
				title = "Paper based";
				break;
			default:
				title = "";
		}

		return title;
	}

}