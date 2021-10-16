const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => {
        setTimeout(() => {
          selectOption(option)
        }, 1700)
      })
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'The story begins in a magical forrest near a Castle of Dragon Aiden. You start your journey as you see a jar of green magical potion near you.',
    options: [
      {
        text: 'Take the potion',
        setState: { blueGoo: true },
        nextText: 2
      },
      {
        text: 'Leave the potion',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: 'You venture forth in search of the mystical Dragon Aiden when you come across a merchant.',
    options: [
      {
        text: 'Trade the potion for a sword',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, sword: true },
        nextText: 3
      },
      {
        text: 'Trade the potion for a shield',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, shield: true },
        nextText: 3
      },
      {
        text: 'Ignore the merchant',
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: 'After leaving the merchant you start to feel tired and stumble upon a small town next to a Castle of Dragon Aiden.',
    options: [
      {
        text: 'Explore the castle',
        nextText: 4
      },
      {
        text: 'Find a room to sleep at in the town',
        nextText: 5
      },
      {
        text: 'Find some hay in a stable to sleep in',
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: 'You are so tired that you fall asleep while exploring the castle and some terrible monster kills you while you where sleeping.',
    options: [
      {
        text: 'Restart the jurney',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'Without any money to buy a room you break into the nearest inn and fall asleep. After a few hours of sleep the owner of the inn finds you and has the town guard lock you in a cell.',
    options: [
      {
        text: 'Restart the jurney',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: 'You wake up well rested and full of energy ready to explore the Castle.',
    options: [
      {
        text: 'Explore the castle',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: 'While exploring the Castle you come across Dragon Aiden.',
    options: [
      {
        text: 'Try to run',
        nextText: 8
      },
      {
        text: 'Attack it with your sword',
        requiredState: (currentState) => currentState.sword,
        nextText: 9
      },
      {
        text: 'Hide behind your shield',
        requiredState: (currentState) => currentState.shield,
        nextText: 10
      },
      {
        text: 'Throw the green potion at it',
        requiredState: (currentState) => currentState.blueGoo,
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: 'Your attempts to run are in vain and the Dragon Aiden easily catches you.',
    options: [
      {
        text: 'Restart the jurney',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'You foolishly thought this Dragon could be slain with a single sword.',
    options: [
      {
        text: 'Restart the jurney',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'The Dragon Aiden laughed as you hid behind your shield and ate you.',
    options: [
      {
        text: 'Restart the jurney',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'You threw your green magical potion at the Dragon Aiden and it exploded. After the dust settled, you saw the Dragon was destroyed. Seeing your victory, you decide to claim his castle as your own and live out the rest of your days there.',
    options: [
      {
        text: 'Congratulations. Play the jurney again.',
        nextText: -1
      }
    ]
  }
]

startGame()





options = {
  "cursorOuter": "circle-basic",
  "hoverEffect": "circle-move",
  "hoverItemMove": false,
  "defaultCursor": false,
  "outerWidth": 30,
  "outerHeight": 30
}
magicMouse(options);
            