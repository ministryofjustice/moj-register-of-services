let organisations = require('./data/organisations.json');
let services = require('./data/services.json');

module.exports = {

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
	}

}