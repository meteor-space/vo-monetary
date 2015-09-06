describe "Money", ->

  it 'is serializable', ->
    euro = new Money 10, 'EUR'
    copy = EJSON.parse EJSON.stringify(euro)
    expect(copy.equals(euro)).to.be.true

  # =============== CONSTRUCTION ================ #

  describe 'construction', ->

    it 'takes a currency and value for construction', ->
      euro = new Currency 'EUR'
      amount = 5.50
      price = new Money amount, euro
      expect(price.currency.code).to.equal 'EUR'
      expect(price.value).to.equal amount

    it 'assumes euro as the default currency if none is given', ->
      expect(new Money(5).currency.code).to.equal 'EUR'

    it 'requires a value for construction', ->
      euro = new Currency 'EUR'
      expect(-> new Money(euro)).to.throw Error

    it 'ensures that the value is a number', ->
      expect(-> new Money('20')).to.throw Error

    it 'the value can be positive and negative', ->
      expect(-> new Money(999)).not.to.throw()
      expect(-> new Money(-1213.40)).not.to.throw()

    it 'allows to provide currency as string', ->
      expect(-> new Money(5, 'EUR')).not.to.throw Error

    it 'rounds numbers to two floating point precision', ->
      money = new Money(1.15555555)
      expect(money.value).to.equal 1.16

  # ================== VALUE OF ================== #

  describe 'using value in calculations', ->

    it 'returns its value correctly', ->
      money = new Money 5
      expect(money + 5).to.equal 10

  # =============== EQUALITY ================ #

  describe 'equality', ->

    it 'is equal when value and currency are the same', ->
      money1 = new Money(5, new Currency('EUR'))
      money2 = new Money(5, new Currency('EUR'))

      expect(money1.equals(money2)).to.be.true

    it 'is not equal if value and currency are not the same', ->
      money1 = new Money(5, new Currency('EUR'))
      money2 = new Money(5, new Currency('USD'))
      money3 = new Money(3, new Currency('EUR'))

      expect(money1.equals(money2)).to.be.false
      expect(money1.equals(money3)).to.be.false
      expect(money2.equals(money3)).to.be.false

  # =============== IMMUTABILITY ================ #

  describe 'immutability', ->

    it 'freezes itself', -> expect(Object.isFrozen(new Money 5)).to.be.true
