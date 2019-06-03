// https://www.npmjs.com/package/nunjucks-numeral-filter
let numeralFilter = require('nunjucks-numeral-filter')

module.exports = function (env) {
  /**
   * Instantiate object used to store the methods registered as a
   * 'filter' (of the same name) within nunjucks. You can override
   * gov.uk core filters by creating filter methods of the same name.
   * @type {Object}
   */
  let filters = {}

  filters.numeral = numeralFilter

  filters.organisationName = (abbreviation) => {
    let name = "";

    switch (abbreviation) {
      case 'CICA':
        name = "Criminal Injuries Compensation Authority";
        break;
      case 'HMCTS':
        name = "Her Majesty's Courts and Tribunals Service";
        break;
      case 'HMPPS':
        name = "Her Majesty's Prisons and Probation Service";
        break;
      case 'HQ':
        name = "Head Quarters";
        break;
      case 'LAA':
        name = "Legal Aid Agency";
        break;
      case 'OPG':
        name = "Office of the Public Guardian";
        break;
      case 'OPST':
        name = "Official Solicitor and Public Trustee";
        break;
      case 'YJB':
        name = "Youth Justice Board";
        break;
      case 'OTHER':
        name = "Other";
        break;
      default:
        name = abbreviation;
    }

    return name;

  }

  /* ------------------------------------------------------------------
    keep the following line to return your filters to the app
  ------------------------------------------------------------------ */
  return filters
}
