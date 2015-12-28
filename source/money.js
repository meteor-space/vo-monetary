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
    } else {
    // Creation with a params: amount, currency
      data.amount = this._roundNumber(amount);
      data.currency = currency;
    }
    // Allow currency strings like 'EUR'
    if (!(data.currency instanceof Currency)) {
      data.currency = new Currency(data.currency);
    }
    // Let the superclass check the arguments!
    Space.domain.ValueObject.call(this, data);
    Object.freeze(this);
  },

  valueOf() {
    return this.amount;
  },

  fields() {
    return {
      amount: Number,
      currency: Currency
    };
  },

  // Rounds numbers to two decimal places
  _roundNumber(amount) {
    return parseFloat(amount.toFixed(2));
  }
});

// Register EJSON type
Money.type('Money');
Money.DEFAULT_CURRENCY = 'EUR';
