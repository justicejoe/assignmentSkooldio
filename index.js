const inquirer = require('inquirer')
const getDeck = require('./deck')

const question = async (questionInstance) => {
  const result1 = await inquirer.prompt(questionInstance)
  return result1[questionInstance[0].name]
}

const shuffle = (deck) => {
    
    let m = deck.length, i;
    const shuffledDeck = [...deck]
    while (m) {
      i = Math.floor(Math.random() * m--);
  
      [shuffledDeck[m], shuffledDeck[i]] = [shuffledDeck[i], shuffledDeck[m]];
    }
    return shuffledDeck
}

const getHandValue = (value) => {
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

const getResultAndDetermineWinner = (dealerHandValue, playerHandValue, bet, total ) => {
  if(playerHandValue > dealerHandValue){
    console.log(`You Won!!!, received ${bet} chips`)
    total =  total + Number(bet)
  }
  else if(playerHandValue < dealerHandValue){
    console.log(`You lose to the dealer`)
    total = total - Number(bet)
  }
  else{
    console.log(`You tie with the dealer and get nothing`)
  }
  return total
}


const playCard = async (total = 0) => {
  const result1 = await question([{
    type: 'input',
    name: 'bet',
    message: "Please put your bet"
  }])
  if(!result1.match(/^\d+$/)){
    console.log('Your bet is not a number. Please start new game.')
    return null  
  }
  console.log(result1)
  const shuffleDeck = shuffle(getDeck())
  const playerHand = [shuffleDeck[0], shuffleDeck[1]]
  const dealerHand = [shuffleDeck[shuffleDeck.length-1], shuffleDeck[shuffleDeck.length-2]]
  console.log(`You got ${shuffleDeck[0].cardName}, ${shuffleDeck[1].cardName}`)
  console.log(`The dealer got ${shuffleDeck[shuffleDeck.length-1].cardName}, ${shuffleDeck[shuffleDeck.length-2].cardName}`)
  total = getResultAndDetermineWinner(getHandValue(dealerHand), getHandValue(playerHand), Number(result1), total)
  const wannaPlayMore = await question([
    {
      type: 'input',
      name: 'answer',
      message: "Wanna play more (Yes/No)?"
    }
  ])
  if(wannaPlayMore === 'Yes' || wannaPlayMore === 'yes' || wannaPlayMore === 'y'){
    playCard(total)
  }
  else{
    console.log(`You got total ${total} chips`)
  }
}

playCard()
