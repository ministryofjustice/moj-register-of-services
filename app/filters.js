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
    add your methods to the filters obj below this comment block:
    @example:

    filters.sayHi = function(name) {
        return 'Hi ' + name + '!'
    }

    Which in your templates would be used as:

    {{ 'Paul' | sayHi }} => 'Hi Paul'

    Notice the first argument of your filters method is whatever
    gets 'piped' via '|' to the filter.

    Filters can take additional arguments, for example:

    filters.sayHi = function(name,tone) {
      return (tone == 'formal' ? 'Greetings' : 'Hi') + ' ' + name + '!'
    }

    Which would be used like this:

    {{ 'Joel' | sayHi('formal') }} => 'Greetings Joel!'
    {{ 'Gemma' | sayHi }} => 'Hi Gemma!'

    For more on filters and how to write them see the Nunjucks
    documentation.

  ------------------------------------------------------------------ */

  /* ------------------------------------------------------------------
    keep the following line to return your filters to the app
  ------------------------------------------------------------------ */
  return filters
}
