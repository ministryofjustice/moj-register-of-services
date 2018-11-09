let organisations = require('./data/organisations.json');
let services = require('./data/services.json');

module.exports = {

	getOrganisations: function() {
		return organisations;
	},

	getOrganisation: function(organisation) {
		if (!organisation) return null

		let data = organisations.filter( (obj) => {
			return (obj.slug == organisation);
		})

		return data[0];
	},

	getServicesByOrganisation: function(organisation) {
		
	},

	getService: function(service) {
		
	}

}