describe("Money", function() {

  it('is serializable', function() {
    var euro = new Money(10, 'EUR');
    var copy = EJSON.parse(EJSON.stringify(euro));
    expect(copy.equals(euro)).to.be.true;
  });

  describe('construction', function() {

    it('takes a currency and value for construction', function() {
      var euro = new Currency('EUR');
      var amount = 5.50;
      var price = new Money(amount, euro);
      expect(price.currency.code).to.equal('EUR');
      expect(price.amount).to.equal(amount);
    });

    it('assumes euro as the default currency if none is given', function() {
      expect(new Money(5).currency.code).to.equal('EUR');
    });

    it('requires a value for construction', function() {
      var euro = new Currency('EUR');
      expect(function() { new Money(euro); }).to.throw(Error);
    });

    it('ensures that the value is a number', function() {
      expect(function() { new Money('20'); }).to.throw(Error);
    });

    it('the value can be positive and negative', function() {
      expect(function() { new Money(999); }).not.to.throw();
      expect(function() { new Money(-1213.40); }).not.to.throw();
    });

    it('allows to provide currency as string', function() {
      expect(function() { new Money(5, 'EUR'); }).not.to.throw(Error);
    });

    it('rounds numbers to two floating point precision', function() {
      var money = new Money(1.15555555);
      expect(money.amount).to.equal(1.16);
    });
  });

  describe('using value in calculations', function() {

    it('returns its value correctly', function() {
      var money = new Money(5);
      expect(money + 5).to.equal(10);
    });

  });

  describe('equality', function() {

    it('is equal when value and currency are the same', function() {
      var money1 = new Money(5, new Currency('EUR'));
      var money2 = new Money(5, new Currency('EUR'));
      expect(money1.equals(money2)).to.be.true;
    });

    it('is not equal if value and currency are not the same', function() {
      var money1, money2, money3;
      money1 = new Money(5, new Currency('EUR'));
      money2 = new Money(5, new Currency('USD'));
      money3 = new Money(3, new Currency('EUR'));
      expect(money1.equals(money2)).to.be.false;
      expect(money1.equals(money3)).to.be.false;
      expect(money2.equals(money3)).to.be.false;
    });

  });

  describe('immutability', function() {
    it('freezes itself', function() {
      expect(Object.isFrozen(new Money(5))).to.be.true;
    });
  });
});
