/**
 * Currency: A ValueObject that represents a ISO 4217 currency.
 * EJSON compatible, can be transparently used in Meteor.methods and MongoDB.
 */
Currency = Space.messaging.Serializable.extend('Currency', {

  /**
   * The constructor takes an optional currency code like 'EUR' or 'USD'
   * If it is not provided the Currency.DEFAULT_CURRENCY will be used.
   */
  Constructor: function(currency) {
    // The param can be a simple string OR an object like { code: 'EUR' }
    currency = (currency && currency.code) ? currency.code : currency;

    if(!Currency.isValid(currency)) {
      throw new Error(Currency.ERRORS.invalidCurrency(currency));
    }

    this.code = currency;
    Object.freeze(this); // Make this Object immutable
  },

  toString: function() {
    return this.code;
  },

  equals: function(other) {
    return (other instanceof Currency) && other.code === this.code;
  },

});

// Register EJSON type
Currency.type('Currency');

// Defines the EJSON fields that are automatically serialized
Currency.fields = {
  code: String
};

Currency.ERRORS = {
  invalidCurrency: function(code) {
    return "Invalid currency code '" + code + "' given.";
  }
};

Currency.isValid = function(code) {
  return VALID_CURRENCY_CODES.indexOf(code) > -1;
};

// ISO 4217, http://en.wikipedia.org/wiki/ISO_4217
// Data last updated 2015 Oct 20th
var VALID_CURRENCY_CODES = [
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
