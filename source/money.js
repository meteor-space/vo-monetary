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
  Constructor: function (amount, currency) {

    // Support creation with a single object like {amount: 1, currency: 'EUR'}
    if(typeof(amount) === 'object') {
      amount = amount.amount;
      currency = amount.currency;
    }

    if(!currency) {
      currency = new Currency(Money.DEFAULT_CURRENCY);
    }
    else if(!(currency instanceof Currency)) {
      currency = new Currency(currency);
    }

    // Let the superclass check the arguments!
    Space.messaging.Serializable.call(this, {
      amount: this._roundNumber(amount),
      currency: currency
    });

    Object.freeze(this);
  },

  valueOf: function() {
    return this.amount;
  },

  fields: function() {
    return {
      amount: Number,
      currency: Currency
    }
  },

  // Rounds numbers to two decimal places
  _roundNumber: function (amount) {
    return parseFloat(amount.toFixed(2));
  }
});

// Register EJSON type
Money.type('Money');



Money.DEFAULT_CURRENCY = 'EUR';
