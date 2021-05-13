/***********************************************************************************
  Jeff Bezos VS. the World
  by Emily Farrow

  I chose the subject of Climate Change and Amazon's contribution to it. 
  This is an important subject because I believe it is a uniting cause that we as humans 
  should be working on together to help slow down our ecological footprint and reverse the 
  damage we have done. It is something that should be taking seriously because in our lifetimes, 
  we will have to face extreme weather conditions, extreme air pollution, ocean pollution that
  not only affects wildlife but then plastics that we consume in our food, etc.; the list goes on. 
  I am focusing on the problems of ocean and air pollution while also touching on worker's rights
  for Amazon employees. The idea of this game is to inform the user on the subject of Climate Change
  while still keeping it fun to navigate through. My game starts off introducing the NPC, the magic toad, 
  whose purpose is to guide Jeff Bezos in making changes in his company for the sake of the world 
  and his employees. The game doesn't have a "good ending" and instead Jeff Bezos wins because that
  is the reality of where we are at. There is an underlying tone of satire and humor to keep the topic
  light just because it ends so terribly.

  
------------------------------------------------------------------------------------
	To use:
	Add this line to the index.html

  <script src="p5.2DAdventure.js"></script>
***********************************************************************************/

// adventure manager global  
var adventureManager;

// p5.play
var playerSprite;
var playerAnimation;

// Clickables: the manager class
// var clickablesManager;    // the manager class
// var clickables;           // an array of clickable objects

// indexes into the clickable array (constants)
const toad1Index = 0;
const toad2Index = 1;
const toad3Index = 2;

var avatarAnimations = [];
var selectedAvatarAnimation = 0;  // default to zero



// Allocate Adventure Manager with states table and interaction tables
function preload() {
  //clickablesManager = new ClickableManager('data/clickableLayout.csv');
  adventureManager = new AdventureManager('data/adventureStates.csv', 'data/interactionTable.csv');
}

// Setup the adventure manager
function setup() {
  createCanvas(1280, 720);

  // setup the clickables = this will allocate the array
  //clickables = clickablesManager.setup();

  // create a sprite and add the 3 animations
  playerSprite = createSprite(width/2, height/2, 80, 80);
  
  playerSprite.addAnimation('walk', loadAnimation('assets/JeffBezos-1.png','assets/JeffBezos-4.png'));
  // use this to track movement from toom to room in adventureManager.draw()
  adventureManager.setPlayerSprite(playerSprite);

  adventureManager.setup();

  //setupClickables(); 
}

// Adventure manager handles it all!
function draw() {
  // draws background rooms and handles movement from one to another
  adventureManager.draw();

  // draw the p5.clickables, in front of the mazes but behind the sprites 
  // clickablesManager.draw();

  // No avatar for Splash screen or Instructions screen
  if( adventureManager.getStateName() !== "Splash" && 
      adventureManager.getStateName() !== "Introduce" &&  
      adventureManager.getStateName() !== "Introduce2" &&  
      adventureManager.getStateName() !== "Introduce3" ){ 
      //adventureManager.getStateName() !== "AvatarSelection" ) {
      
    // responds to keydowns
    moveSprite();

    // this is a function of p5.js, not of this sketch
    drawSprites();
  } 
  //clickablesManager.draw();
}

function mouseReleased() {
  adventureManager.mouseReleased();
}

//-------------- YOUR SPRITE MOVEMENT CODE HERE  ---------------//
function moveSprite() {
  if(keyIsDown(RIGHT_ARROW))
    playerSprite.velocity.x = 10;
  else if(keyIsDown(LEFT_ARROW))
    playerSprite.velocity.x = -10;
  else
    playerSprite.velocity.x = 0;

  if(keyIsDown(DOWN_ARROW))
    playerSprite.velocity.y = 10;
  else if(keyIsDown(UP_ARROW))
    playerSprite.velocity.y = -10;
  else
    playerSprite.velocity.y = 0;
}

//-------------- CLICKABLE CODE  ---------------//


// function setupClickables() {
//   // All clickables to have same effects
//   for( let i = 0; i < clickables.length; i++ ) {
//     //clickables[i].onHover = clickableButtonHover;
//    // clickables[i].onOutside = clickableButtonOnOutside;
//     clickables[i].onPress = clickableButtonPressed;
//   }
// }


// clickableButtonPressed = function() {
//   // these clickables are ones that change your state
//   // so they route to the adventure manager to do this
  
//       adventureManager.clickablePressed(this.name);


// }



//-------------- SUBCLASSES / YOUR DRAW CODE CAN GO HERE ---------------//

// Instructions screen has a backgrounnd image, loaded from the adventureStates table
// It is sublcassed from PNGRoom, which means all the loading, unloading and drawing of that
// class can be used. We call super() to call the super class's function as needed
class IntroduceScreen extends PNGRoom {
  // Constructor gets called with the new keyword, when upon constructor for the adventure manager in preload()
  constructor() {
    super();    // call super-class constructor to initialize variables in PNGRoom
  }

  // call the PNGRoom superclass's draw function to draw the background image
  // and draw our instructions on top of this
    draw() {  
      // this calls PNGRoom.draw()
      super.draw();
    }
}

class Introduce2Screen extends PNGRoom {
  // Constructor gets called with the new keyword, when upon constructor for the adventure manager in preload()
  constructor() {
    super();    // call super-class constructor to initialize variables in PNGRoom
  }

  // call the PNGRoom superclass's draw function to draw the background image
  // and draw our instructions on top of this
    draw() {
      super.draw();
      
    }
}

class Introduce3Screen extends PNGRoom {
  // Constructor gets calle with the new keyword, when upon constructor for the adventure manager in preload()
  constructor() {
    super();    // call super-class constructor to initialize variables in PNGRoom

    
  }

  // call the PNGRoom superclass's draw function to draw the background image
  // and draw our instructions on top of this
    draw() {
     
      super.draw();
      
    }
}

// Subclass of PNGRoom, also uses global variables from this
// sketch (unorthodox, but ok)
class PresentScreen extends PNGRoom {
  // Constructor gets calle with the new keyword, when upon constructor for the adventure manager in preload()
  constructor() {
    super();    // call super-class construtor

    
  }



  draw() {
      // this calls PNGRoom.draw()
      super.draw();
      
    
      let xStart = 500;
      let xDist = 150;
      let yPos = 350;
      for( let i = 0; i < avatarAnimations.length; i++ ) {
        avatarAnimations[i].draw( xStart + (i*xDist), yPos);
      }
    }

    drawSelectionTriangle() {
      selectedAvatarAnimation
    }
}
