
Money = Space.messaging.Serializable.extend('Money', {

  Constructor: function (value, currency) {

    if(typeof(value) === 'object') {
      value = value.value;
      currencty = value.currency;
    }

    if(!currency) {
      currency = new Currency(Money.DEFAULT_CURRENCY);
    }
    else if(!(currency instanceof Currency)) {
      currency = new Currency(currency);
    }

    // Let Space.messaging.Struct check the arguments!
    Space.messaging.Serializable.call(this, {
      value: this._roundNumber(value),
      currency: currency
    });

    Object.freeze(this);
  },

  equals: function (other) {
    var isMoney = other instanceof Money;
    var isEqual = other.value === this.value && other.currency.equals(this.currency);
    return isMoney && isEqual;
  },

  valueOf: function() {
    return this.value;
  },

  _roundNumber: function (value) {
    return parseFloat(value.toFixed(2));
  }
});

Money.type('Money');

Money.fields = {
  value: Number,
  currency: Currency
};

Money.DEFAULT_CURRENCY = 'EUR';
