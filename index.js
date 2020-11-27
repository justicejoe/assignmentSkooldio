const inquirer = require('inquirer')

let question1 = [
  {
    type: 'input',
    name: 'bet',
    message: "Please put your bet"
  }
]
let question2 = [
  {
    type: 'input',
    name: 'answer',
    message: "Wanna play more (Yes/No)?"
  }
]
const getDeck = () => {
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

const shuffle = () => {
    
    let m = deck.length, i;
  
    while (m) {
      i = Math.floor(Math.random() * m--);
  
      [deck[m], deck[i]] = [deck[i], deck[m]];
    }
    return deck
}

const getValue = (value) => {
  return value.reduce((total, current) => {
    if(current.value === 'Ace'){
      return total += 1
    }
    else if(current.value === 'King' || current.value === 'Queen'|| current.value === 'Jack' || current.value === 10){
      return total += 0
    }
    else{
     return total += current.value
    }
  }, 0)
}
const deck = getDeck()


const playCard = async () => {
  const result1 = await inquirer.prompt(question1)
  console.log(result1.bet)
  const shuffleDeck = shuffle()
  const playerHand = [shuffleDeck[0], shuffleDeck[1]]
  const dealerHand = [shuffleDeck[shuffleDeck.length-1], shuffleDeck[shuffleDeck.length-2]]
  console.log(`You got ${shuffleDeck[0].cardName}, ${shuffleDeck[1].cardName}`)
  console.log(`The dealer got ${shuffleDeck[shuffleDeck.length-1].cardName}, ${shuffleDeck[shuffleDeck.length-2].cardName}`)
  let total = 0
  if(getValue(playerHand) > getValue(dealerHand)){
    console.log(`You Won!!!, received ${result1.bet} chips`)
    total = result1.bet
  }
  else if(getValue(playerHand) < getValue(dealerHand)){
    console.log(`You lose to the dealer`)
    total = 0
  }
  else{
    console.log(`You tie with the dealer and get nothing`)
    total = 0
  }
  const wannaPlayMore = await inquirer.prompt(question2)
  if(wannaPlayMore.answer === 'Yes' || wannaPlayMore.answer === 'yes' || wannaPlayMore.answer === 'y'){
    playCard()
  }
  else{
    console.log(`You got total ${total} chips`)
  }
}

playCard()
