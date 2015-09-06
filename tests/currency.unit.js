
describe('Currency', function() {

  it('is serializable', function() {
    var eur = new Currency('EUR');
    var copy = EJSON.parse(EJSON.stringify(eur));
    expect(copy.equals(eur)).to.be.true;
  });

  // =============== CONSTRUCTION ================ //

  describe('construction', function() {

    it('takes a currency code and assigns it', function() {
      var currency = new Currency('EUR');
      expect(currency.code).to.equal('EUR');
    });

    it('throws error if invalid currency code is assigned', function() {
      createInvalidCurrency = function() { new Currency('XX'); };
      expect(createInvalidCurrency).to.throw("Invalid currency code 'XX' given.");
    });

  });

  // =============== EQUALITY ================ //

  describe('equality', function() {

    it('returns true if the code is equal', function() {
      var currency1 = new Currency('EUR');
      var currency2 = new Currency('EUR');
      expect(currency1.equals(currency2)).to.be.true;
      expect(currency2.equals(currency1)).to.be.true;
    });

    it('is not equal with different codes', function() {
      var currency1 = new Currency('EUR');
      var currency2 = new Currency('USD');
      expect(currency1.equals(currency2)).to.be.false;
      expect(currency2.equals(currency1)).to.be.false;
    });

    it('only accepts other instances of Currency', function() {
      expect(new Currency('EUR').equals('EUR')).to.be.false;
    });
    
  });

  // =============== IMMUTABILITY ================ //

  describe('immutability', function() {

    it('freezes itself', function() {
      expect(Object.isFrozen(new Currency('EUR'))).to.be.true;
    });

  });
});
