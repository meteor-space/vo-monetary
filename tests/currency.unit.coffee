
describe 'Currency', ->

  it 'is serializable', ->
    eur = new Currency 'EUR'
    copy = EJSON.parse EJSON.stringify(eur)
    expect(copy.equals(eur)).to.be.true

  # =============== CONSTRUCTION ================ #

  describe 'construction', ->

    it 'takes a currency code and assigns it', ->
      currency = new Currency 'EUR'
      expect(currency.code).to.equal 'EUR'

    it 'throws error if invalid currency code is assigned', ->
      expect(-> new Currency 'XX').to.throw "Invalid currency code 'XX' given."

  # =============== EQUALITY ================ #

  describe 'equality', ->

    it 'returns true if the code is equal', ->
      currency1 = new Currency 'EUR'
      currency2 = new Currency 'EUR'

      expect(currency1.equals(currency2)).to.be.true
      expect(currency2.equals(currency1)).to.be.true

    it 'is not equal with different codes', ->
      currency1 = new Currency 'EUR'
      currency2 = new Currency 'USD'

      expect(currency1.equals(currency2)).to.be.false
      expect(currency2.equals(currency1)).to.be.false

    it 'only accepts other instances of Currency', ->
      expect(new Currency('EUR').equals('EUR')).to.be.false

  # =============== IMMUTABILITY ================ #

  describe 'immutability', ->

    it 'freezes itself', ->
      expect(Object.isFrozen(new Currency 'EUR')).to.be.true
