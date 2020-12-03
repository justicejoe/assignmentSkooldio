
const generateDeck = () => {
  const deck = []
  const suits = ['Hearts', 'Spades', 'Clubs', 'Diamonds'];
    const values = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];

    for (let suit in suits) {
      for (let value in values) {
        deck.push({cardName: `${suits[suit]}-${values[value]}` , value: values[value]});
      }
    }
    return deck
}

const deck = generateDeck()

module.exports = function getDeck () {
  return deck
}