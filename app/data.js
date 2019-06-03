let organisations = require('./data/organisations.json');
let services = require('./data/services.json');

let digital_maturity = ["digital-by-default","not-digital-by-default","information-site","paper-based"];

module.exports = {

	isValidOrganisation: (organisation) => {
		if (!organisation) return false;


	},

	isValidService: (service) => {
		if (!service) return false;


	},

	isValidDigitalMaturity: (maturity) => {
		if (!maturity) return false;

		return (!!~digital_maturity.indexOf(maturity));
	},

	getOrganisations: () => {
		return organisations;
	},

	getOrganisation: (organisation) => {
		if (!organisation) return null;

		let data = organisations.filter( (obj) => {
			return (obj.slug == organisation);
		});

		return data[0];
	},

	getServices: () => {
		return services;
	},

	getServicesByOrganisation: (organisation, sort_by, sort_order) => {
		if (!organisation) return null;

		let data = services.filter( (obj) => {
        return !!~obj.organisation.indexOf(organisation);
    });

		let result = [];

		let order = (sort_order == 'desc') ? true : false;

		switch(sort_by) {
			case 'id':
				result = data.sort(module.exports.sortBy('id', order, parseInt));
				break;
			case 'organisation':
				result = data.sort(module.exports.sortBy('organisation', order, (a) => {
					return a.toUpperCase();
				}));
				break;
			case 'type':
				result = data.sort(module.exports.sortBy('type', order, (a) => {
					return a.toUpperCase();
				}));
				break;
			default:
				result = data.sort(module.exports.sortBy('name', order, (a) => {
					return a.toUpperCase();
				}));
				break;
		}

		return result;
	},

	getServicesByDigitalMaturity: (maturity, sort_by, sort_order) => {
		if (!maturity) return null;

		let data = services.filter( (obj) => {
			return (obj.maturity == maturity);
		});

		let result = [];

		let order = (sort_order == 'desc') ? true : false;

		switch(sort_by) {
			case 'id':
				result = data.sort(module.exports.sortBy('id', order, parseInt));
				break;
			case 'organisation':
				result = data.sort(module.exports.sortBy('organisation', order, (a) => {
					return a.toUpperCase();
				}));
				break;
			case 'type':
				result = data.sort(module.exports.sortBy('type', order, (a) => {
					return a.toUpperCase();
				}));
				break;
			default:
				result = data.sort(module.exports.sortBy('name', order, (a) => {
					return a.toUpperCase();
				}));
				break;
		}

		return result;
	},

	getServicesByOrganisationAndDigitalMaturity: (organisation, maturity, sort_by, sort_order) => {
		if (!organisation) return null;
		if (!maturity) return null;

		let data = services.filter( (obj) => {
        return (obj.organisation == organisation && obj.maturity == maturity);
    });

    let result = [];

		let order = (sort_order == 'desc') ? true : false;

		switch(sort_by) {
			case 'id':
				result = data.sort(module.exports.sortBy('id', order, parseInt));
				break;
			case 'organisation':
				result = data.sort(module.exports.sortBy('organisation', order, (a) => {
					return a.toUpperCase();
				}));
				break;
			case 'type':
				result = data.sort(module.exports.sortBy('type', order, (a) => {
					return a.toUpperCase();
				}));
				break;
			default:
				result = data.sort(module.exports.sortBy('name', order, (a) => {
					return a.toUpperCase();
				}));
				break;
		}

		return result;
	},

	getService: (service) => {
		if (!service) return null;

		let data = services.filter( (obj) => {
			return (obj.slug == service);
		});

		return data[0];
	},

	getServicesCountByOrganisation: (organisation) => {
		if (!organisation) return 0;

		let count = 0;

		let data = services.filter( (obj) => {
	        return obj.organisation == organisation;
	    });

		count = data.length;

		return count;

	},

	getServicesCountByDigitalMaturity: (maturity) => {
		if (!maturity) return 0;

		let count = 0;

		let data = services.filter( (obj) => {
	        return obj.maturity == maturity;
	    });

		count = data.length;

		return count;
	},

	getServicesCountByOrganisationAndDigitalMaturity: (organisation, maturity) => {
		if (!organisation) return null;
		if (!maturity) return null;

		let count = 0;

		let data = services.filter( (obj) => {
			return (obj.organisation == organisation && obj.maturity == maturity);
		});

		count = data.length;

		return count;
	},

	getDigitalMaturityTitle: (maturity) => {
		if (!maturity) return null;

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
	},

	// See: Stackoverflow
	// Q: https://stackoverflow.com/questions/979256/sorting-an-array-of-javascript-objects
	// A: https://stackoverflow.com/a/979325
	sortBy: (field, reverse, primer) => {

		let key = primer ?
			(x) => { return primer(x[field]) } :
			(x) => { return x[field] };

		reverse = !reverse ? 1 : -1;

		return (a, b) => {
			return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
		}
	}

}