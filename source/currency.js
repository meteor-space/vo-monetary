/**
 * Currency: A ValueObject that represents a ISO 4217 currency.
 * EJSON compatible, can be transparently used in Meteor.methods and MongoDB.
 */
Currency = Space.domain.ValueObject.extend('Currency', {

  /**
   * The constructor takes an optional currency code like 'EUR' or 'USD'
   * If it is not provided the Currency.DEFAULT_CURRENCY will be used.
   */
  Constructor(currency) {

    let currencyCode;

    // The param can be a simple string OR an object like { code: 'EUR' }
    if (typeof currency === 'object') {
      if (currency.code === undefined) {
        throw new Error(Currency.ERRORS.invalidCurrencyObject(currency));
      } else {
        currencyCode = currency.code;
      }
    } else {
      currencyCode = currency;
    }

    if (!Currency.isValid(currencyCode)) {
      throw new Error(Currency.ERRORS.invalidCurrency(currencyCode));
    }

    this.code = currencyCode;
    Object.freeze(this); // Make this Object immutable
  },

  // Defines the EJSON fields that are automatically serialized
  fields() {
    return {
      code: String
    };
  },

  toString() {
    return this.code;
  }

});

Currency.ERRORS = {
  invalidCurrency(code) {
    return `Invalid currency code '${code}' given.`;
  },
  invalidCurrencyObject() {
    return `Invalid currency object, currency object does not have code attribute.`;
  }
};

// ISO 4217, http://en.wikipedia.org/wiki/ISO_4217
// Data last updated 2015 Oct 20th
const VALID_CURRENCY_CODES = [
  'AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN', 'BAM',
  'BBD', 'BDT', 'BGN', 'BHD', 'BIF', 'BMD', 'BND', 'BOB', 'BOV', 'BRL', 'BSD',
  'BTN', 'BWP', 'BYR', 'BZD', 'CAD', 'CDF', 'CHE', 'CHF', 'CHW', 'CLF', 'CLP',
  'CNY', 'COP', 'COU', 'CRC', 'CUC', 'CUP', 'CVE', 'CZK', 'DJF', 'DKK', 'DOP',
  'DZD', 'EGP', 'ERN', 'ETB', 'EUR', 'FJD', 'FKP', 'GBP', 'GEL', 'GHS', 'GIP',
  'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HRK', 'HTG', 'HUF', 'IDR', 'ILS',
  'INR', 'IQD', 'IRR', 'ISK', 'JMD', 'JOD', 'JPY', 'KES', 'KGS', 'KHR', 'KMF',
  'KPW', 'KRW', 'KWD', 'KYD', 'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'LYD',
  'MAD', 'MDL', 'MGA', 'MKD', 'MMK', 'MNT', 'MOP', 'MRO', 'MUR', 'MVR', 'MWK',
  'MXN', 'MXV', 'MYR', 'MZN', 'NAD', 'NGN', 'NIO', 'NOK', 'NPR', 'NZD', 'OMR',
  'PAB', 'PEN', 'PGK', 'PHP', 'PKR', 'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB',
  'RWF', 'SAR', 'SBD', 'SCR', 'SDG', 'SEK', 'SGD', 'SHP', 'SLL', 'SOS', 'SRD',
  'SSP', 'STD', 'SYP', 'SZL', 'THB', 'TJS', 'TMT', 'TND', 'TOP', 'TRY', 'TTD',
  'TWD', 'TZS', 'UAH', 'UGX', 'USD', 'USN', 'USS', 'UYI', 'UYU', 'UZS', 'VEF',
  'VND', 'VUV', 'WST', 'XAF', 'XAG', 'XAU', 'XBA', 'XBB', 'XBC', 'XBD', 'XCD',
  'XDR', 'XFU', 'XOF', 'XPD', 'XPF', 'XPT', 'XSU', 'XTS', 'XUA', 'XXX', 'YER',
  'ZAR', 'ZMW'
];

Currency.isValid = function(code) {
  return VALID_CURRENCY_CODES.indexOf(code) > -1;
};


