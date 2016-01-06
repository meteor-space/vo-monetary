/**
 * Money: A ValueObject that represents an amount of a certain Currency.
 * EJSON compatible, can be transparently used in Meteor.methods and MongoDB.
 */
Money = Space.domain.ValueObject.extend('Money', {

  /**
   * To create a Money VO you need to provide at least an amount.
   * If no currency is given the Currency.DEFAULT_CURRENCY is taken.
   * Supports currency as instances of Currency or simple strings like 'EUR'
   */
  Constructor(amount, currency = Money.DEFAULT_CURRENCY) {
    let data = {};
    // Creation with a single object like {amount: 1, currency: 'EUR'}
    if (arguments.length === 1 && typeof(arguments[0]) === 'object') {
      data = amount;
      // Calculate amount from base to avoid rounding issues
      if (data.base !== undefined && data.decimals !== undefined) {
        this.amount = data.base / Math.pow(10, data.decimals);
      } else {
        check(data.amount, Number);
        this.amount = data.amount;
        delete data.amount;
      }
    } else {
    // Creation with a params: amount, currency
      check(amount, Number);
      this.amount = amount;
      data.currency = currency;
    }
    // Allow currency strings like 'EUR'
    if (!(data.currency instanceof Currency)) {
      data.currency = new Currency(data.currency || Money.DEFAULT_CURRENCY);
    }
    data.decimals = this._decimalPlaces(this.amount);
    data.base = this.amount * Math.pow(10, data.decimals);
    // Let the superclass check the data!
    Space.domain.ValueObject.call(this, data);
    Object.freeze(this);
  },

  valueOf() {
    return this.amount;
  },

  fields() {
    return {
      base: Match.Integer,
      decimals: Match.Integer,
      currency: Currency
    };
  },

  /**
   * Returns the number of decimal places of given number.
   * http://stackoverflow.com/questions/9539513/is-there-a-reliable-way-in-javascript-to-obtain-the-number-of-decimal-places-of
   */
  _decimalPlaces(n) {
    let a = Math.abs(n);
    let c = a;
    let count = 1;
    while (!this._isInteger(c) && isFinite(c)) {
      c = a * Math.pow(10, count++);
    }
    return count - 1;
  },

  _isInteger(n) {
    return (typeof n === 'number') && parseFloat(n) === parseInt(n, 10) && !isNaN(n);
  }
});

// Register EJSON type
Money.type('Money');
Money.DEFAULT_CURRENCY = 'EUR';
