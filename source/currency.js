
Currency = Space.messaging.Serializable.extend('Currency', {

  Constructor: function(currency) {

    // Allow to provide another instance of Country as param
    if(currency instanceof Currency) {
      // Just use its code
      currency = currency.code;
    }

    currency = (currency && currency.code) ? currency.code : currency;

    if(!Currency.isValid(currency)) {
      throw new Error(Currency.ERRORS.invalidCurrency(currency));
    }

    this.code = currency;
    Object.freeze(this);
  },

  toString: function() {
    return this.code;
  },

  equals: function(other) {
    return (other instanceof Currency) && other.code === this.code;
  },

});

Currency.type('Currency');

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
// Data last updated 2013 Oct 1st
var VALID_CURRENCY_CODES = [
  'AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN',
  'BAM', 'BBD', 'BDT', 'BGN', 'BHD', 'BIF', 'BMD', 'BND', 'BOB', 'BOV', 'BRL',
  'BSD', 'BTN', 'BWP', 'BYR', 'BZD', 'CAD', 'CDF', 'CHE', 'CHF', 'CHW', 'CLF',
  'CLP', 'CNY', 'COP', 'COU', 'CRC', 'CUC', 'CUP', 'CVE', 'CZK', 'DJF', 'DKK',
  'DOP', 'DZD', 'EGP', 'ERN', 'ETB', 'EUR', 'FJD', 'FKP', 'GBP', 'GEL', 'GHS',
  'GIP', 'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HRK', 'HTG', 'HUF', 'IDR',
  'ILS', 'INR', 'IQD', 'IRR', 'ISK', 'JMD', 'JOD', 'JPY', 'KES', 'KGS', 'KHR',
  'KMF', 'KPW', 'KRW', 'KWD', 'KYD', 'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL',
  'LTL', 'LVL', 'LYD', 'MAD', 'MDL', 'MGA', 'MKD', 'MMK', 'MNT', 'MOP', 'MRO',
  'MUR', 'MVR', 'MWK', 'MXN', 'MXV', 'MYR', 'MZN', 'NAD', 'NGN', 'NIO', 'NOK',
  'NPR', 'NZD', 'OMR', 'PAB', 'PEN', 'PGK', 'PHP', 'PKR', 'PLN', 'PYG', 'QAR',
  'RON', 'RSD', 'RUB', 'RWF', 'SAR', 'SBD', 'SCR', 'SDG', 'SEK', 'SGD', 'SHP',
  'SLL', 'SOS', 'SRD', 'SSP', 'STD', 'SYP', 'SZL', 'THB', 'TJS', 'TMT', 'TND',
  'TOP', 'TRY', 'TTD', 'TWD', 'TZS', 'UAH', 'UGX', 'USD', 'USN', 'USS', 'UYI',
  'UYU', 'UZS', 'VEF', 'VND', 'VUV', 'WST', 'XAF', 'XAG', 'XAU', 'XBA', 'XBB',
  'XBC', 'XBD', 'XBT', 'XCD', 'XDR', 'XFU', 'XOF', 'XPD', 'XPF', 'XPT', 'XTS',
  'XXX', 'YER', 'ZAR', 'ZMW',
];
