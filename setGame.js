// To any readers:
// If you see a little mark like this: !Q !W !R !T !F -- they're mostly to make notes to myself easier to find.
// I'm very open to feedback, especially about best/better coding practises as I am still very new to this.
// Thanks! drvonnjerryxlii[AT]gmail.com -[AT] +@

// Massive thanks to my supporters:
// To Vinietskyzilla for introducing me to canvas & to some great canvas drawing tutorials. And for writing out literally every git command I needed to throw into shell to get the live version up and running! https://drvonnjerryxlii.github.io/setGame
// To Davidfstr for showing me how to do something key-indexy as in the card generator code. And for repeated encouragement and testing of colors!
// To John for introducing me to the wonder and magic of brutal code reviews and in so doing teaching me a bunch of better coding practices, like ALLCAPSing global variables and adding documentation-y notes for both readers & my future self.
// To Sergey also for repeated encouragement.
// To Kim, Debs, Tamar, Jen, and countless other ladies for inspiring me with their awesomeness.
// And to Sergey (again) and Chris-- also inspiration. Not also ladies.




// global variables for cards
var CARDS = []; // to store all the cards
var DECK = []; // to store card indexes for cards in the deck
var TABLE = []; // to store card indexes for cards on the table/board

// global variables for drawing functions
var HEIGHT = 30; // for card shape locations
var WIDTH = 80; // for card shape locations
var X = 10; // for card shape locations
var Y = 60; // for card shape locations

// global variables for set & hint functions
var HINT_COUNT = 0; // to store how deep into hint function
var MATCH_COUNT = 0; // to store # matches found this game
var POSSIBLE_SET = []; // to store possible sets
var AVAILABLE_SETS = []; // to store definite sets !W maybe I can combine available w/ possible?
var AVAILABLE_SETS_HINTS = []; // to store definite set hints
var AVAILABLE_SETS_LOCATIONS = []; // to store definite set card indexes !W see 23 re: simplifying set checking functions / reduce params

// global colors for drawing functions
// var PURPLE = "rgb(200,0,255)"; // for default & classic
// var LIGHT_BLUE = "rgb(20,200,255)"; // for default
// var GOLD = "rgb(220,200,0)"; // for default
// var GREEN = "rgb(20,255,0)"; // for classic
// var RED = "rgb(255,0,0)"; // for classic
// var ORANGE_PINK = "rgb(230,159,0)"; // for tritan/deutan/protan colorblind; regular color -> colorblind color
// var BLUE_BLUE = "rgb(0,144,178)"; // for tritan/deutan/protan colorblind; regular color -> colorblind color
// var BLACK_BLACK = "rgb(0,0,0)"; // for tritan/deutan/protan colorblind; regular color -> colorblind color
// var DARK_GREY = "rgb(200,200,200)"; // for monochrome colorblind
// var LIGHT_GREY = "rgb(135,135,135)"; // for monochrome colorblind
// var WHITE = "rgb(0,0,0)"; // for monochrome colorblind

//var COLOR_SCHEMES = {
//    Classic: PURPLE, GREEN, RED
//    Colorblind: ORANGE_PINK, BLUE_BLUE, BLACK_BLACK
//    Jeri: PURPLE, LIGHT_BLUE, GOLD
//    Monochrome: BLACK_BLACK, DARK_GREY, LIGHT_GREY
//};

//var changeColors = function(whichScheme) {
//
//};

/** createCards(): does what it says on the tin.
 */
var createCards = function() {
    var colors = ["color1", "color2", "color3"];
    var shapes = ["shape1", "shape2", "shape3"];
    var fills = ["fill1", "fill2", "fill3"];
    var numbers = [1, 2, 3];
    var total = 100;

    for (var c = 0; c < colors.length; ++c) {
        for  (var s = 0; s < shapes.length; ++s) {
            for (var f = 0; f < fills.length; ++f) {
                for (var n = 0; n < numbers.length; ++n) {
                    total += 1;
                    CARDS.push({
                        card:total,
                        color:colors[c],
                        shape:shapes[s],
                        fill:fills[f],
                        number:numbers[n]
                    });
                }
            }
        }
    }
};

createCards();


/** These next several functions (errorMessage(), playerMessage(), mobileMessage(),
 *  boxMessage()) are for posting messages to different places. John says some of
 *  these are unnecessarily complicated or sort of deprecated, so this is
 *  something I still need to work on. boxMessage() in particular is on hold until
 *  I have a chance to delve more deeply into HTML/CSS positioning & hiding of
 *  elements. !W !R
 */
var errorMessage = function(message) {
    console.log("Eroor! "+message);
};


var playerMessage = function(message) {
    boxMessage(message);
};


var mobileMessage = function(message) {
    alert(message);
};


/** boxMessage() deletes any previous message from the message box by drawing
 *  a clear rectangle over it. It then takes the message passed to it and
 *  writes that new message in the box. !W
 */
var boxMessage = function(message) {
    var canvas = document.getElementById("message");
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 400, 50);  // overwrite any previous message
    ctx = canvas.getContext('2d'); // !T I wonder if this line is necessary. test.
    ctx.font = ".8em Verdana";
    ctx.fillText(message, 10, 15, 380); // to write the new message
};


/** shuffleDeck() creates an interim deck and adds cards in order from the CARDS stack.
 *  It then uses Math.random to pick cards from the interim deck and move them into DECK.
 *  Last, it pulls 12 cards from the DECK to the TABLE, where the player will see them.
 *  Actually, it is moving card locations (indexes) around. The cards in the CARDS stack
 *  are entirely unchanged.
 */
var shuffleDeck = function() {
    var protoDeck = [];

    for (var i = 0; i < CARDS.length; ++i) { // create the list of card locations
        protoDeck.push(i);
    }

    while (protoDeck.length > 0) {
        var ohPickMe = Math.floor(Math.random()*protoDeck.length);
        var card = protoDeck.splice(ohPickMe,1);
        DECK.push(card[0]);
    }

    for (var i = 0; i < 12; ++i) { // draws 12 cards to the table
        TABLE.push(DECK.shift());
    }
};


// set default colors & gradients:
// !! John said I am using variables for something that should just be data & to use objects instead. !W

var color1 = "rgb(200,0,255)"; // purple
var color2 = "rgb(20,200,255)"; // lightish blue
var color3 = "rgb(220,200,0)"; // goldy yellow
//var gradyLight = "rgb(255,255,255)"; // white
//var gradyDark = "rgb(60,60,60)"; // dark gray
//var grady = gradyDark;

var changeColors = function(whichScheme) { // !R maybe it's time to learn case/switch if javascript has?
    var dark = false;
    if (whichScheme === "Jeri") { // my preferrored color scheme
        if (dark) {
            removeClass("body","dark");
        }
        color1 = "rgb(200,0,255)"; // purple
        color2 = "rgb(20,200,255)"; // lightish blue
        color3 = "rgb(220,200,0)"; // goldy yellow
//        grady = gradyDark;
    } else if (whichScheme === "classic") { // the original Set color scheme
        if (dark) {
            removeClass("body","dark");
        }
        color1 = "rgb(200,0,255)"; // purple
        color2 = "rgb(20,255,0)"; // green
        color3 = "rgb(255,0,0)"; // red
  //      grady = gradyDark;
    } else if (whichScheme === "colorBlind") { // a scheme for colorblindness
        if (dark) {
            removeClass("body","dark");
        }
        color1 = "rgb(230,159,0)"; // orange / pink
        color2 = "rgb(0,144,178)"; // blue / still blue
        color3 = "rgb(0,0,0)"; // ALLES IST SCHWARZ
    //    grady = gradyLight;
    } else if (whichScheme === "monochrome") { // ooohhhh, this is hard to play; TIME TO LEARN HOW TO STRIPES
        grady = gradyLight;
        color1 = "rgb(200,200,200)"; // dark grey
        color2 = "rgb(135,135,135)"; // light grey
        color3 = "rgb(0,0,0)"; // white
    } else if (whichScheme === "darkGrad") {
      //  grady = gradyDark;
    } else if (whichScheme === "lightGrad") {
    //    grady = gradyLight;
    } else if (whichScheme === "dark") { // a dark color scheme
        addClass("body","dark") // body background #444
        // card background #000
        // card grady = #200,200,200
    } else { // the user can pick colors
        color1 = prompt("Test color1: ");
        color2 = prompt("Test color2: ");
        color3 = prompt("Test color3: ");
    }
    toggleVisible("colors","no","yes");
    toggleVisible("colorSelections","yes","no");
    resetEveryone();
    drawEveryone();
};


/** solid() takes a card index and a canvas context. It unpacks the color from the
 *  card and then sets the shape style as the relevant color.
 */
var solid = function(card,ctx) {
    if (card.color === "color1") {
        ctx.fillStyle = color1;
    } else if (card.color === "color2") {
        ctx.fillStyle = color2;
    } else if (card.color === "color3") {
        ctx.fillStyle = color3;
    } else {
        errorMessage("solid() else");
    }
};


/** gradient() takes a card index and a canvas context. It unpacks the color from the
 *  card, sets a gradient, and then sets the shape style as the relevant color.
 */
var stripe = function(card,ctx) {
  //  var half = ctx.createLinearGradient(0,0,150,100);
    if (card.color === "color1") {
    //    half.addColorStop(0,color1);
        ctx.strokeStyle = color1;
    } else if (card.color === "color2") {
      //  half.addColorStop(0,color2);
        ctx.strokeStyle = color2;
    } else if (card.color === "color3") {
   //     half.addColorStop(0,color3);
        ctx.strokeStyle = color3;
    } else {
        errorMessage("gradient() else");
    }

    var x1 = 20;
    var y1 = 0;
    var x2 = 0;
    var y2 = 20;

    ctx.beginPath();
    
    while (x1 < 100) { // draw first 4 stripes until top right corner
        ctx.moveTo(x1,y1);
        ctx.lineTo(x2,y2);
        x1 += 25;
        y2 += 25;
    }

    x1 = 100;
    y1 = 20;

    while (y1 < 150) { // begin rest of the stripes
        ctx.moveTo(x1,y1);
        ctx.lineTo(x2,y2);
        y1 += 25;
        if (y2 < 150) { // when hit bottom left corner
            y2 += 25;
            if (y2 > 150) {
                y2 = 150;
                x2 = 20;
            }
        } else {
            x2 += 25;
        }
    }

    ctx.stroke();

    //half.addColorStop(1,grady);
    //ctx.fillStyle = half;
};


/** outline() takes a card index and a canvas context. It unpacks the color from the
 *  card and then sets the line style as the relevant color.
 */
var outline = function(card,ctx) {
    if (card.color === "color1") {
        ctx.strokeStyle = color1;
    } else if (card.color === "color2") {
        ctx.strokeStyle = color2;
    } else if (card.color === "color3") {
        ctx.strokeStyle = color3;
    } else {
        errorMessage("outline() else");
    }
};


/** drawRectangle() takes a card index and a canvas context. It first unpacks the number
 *  (x) from the card, and then it unpacks the fill type. Armed with those, it calls
 *  the fill type drawing function and the actual shape drawing function. Actually, there
 *  is already a built in canvas rectangle shape, so it just calls that.
 *  takes: card index, board context
 *  goes to: solid(), stripe(), outline()
 *  then: draws rectangle x times
 */
var drawRectangle = function(card,ctx) {
    if (card.number === 1) {
        if (card.fill === "fill1") {
            solid(card,ctx);
            ctx.fillRect(X,Y,WIDTH,HEIGHT);
        } else if (card.fill === "fill2") {
            stripe(card,ctx);
            ctx.strokeRect(X,Y,WIDTH,HEIGHT);
        } else if (card.fill === "fill3") {
            outline(card,ctx);
            ctx.strokeRect(X,Y,WIDTH,HEIGHT);
        } else {
            errorMessage("drawRect() if number 1");
        }
    } else if (card.number === 2) {
        if (card.fill === "fill1") {
            solid(card,ctx);
            ctx.fillRect(X,Y-25,WIDTH,HEIGHT);
            ctx.fillRect(X,Y+25,WIDTH,HEIGHT);
        } else if (card.fill === "fill2") {
            stripe(card,ctx);
            ctx.strokeRect(X,Y-25,WIDTH,HEIGHT);
            ctx.strokeRect(X,Y+25,WIDTH,HEIGHT);
        } else if (card.fill === "fill3") {
            outline(card,ctx);
            ctx.strokeRect(X,Y-25,WIDTH,HEIGHT);
            ctx.strokeRect(X,Y+25,WIDTH,HEIGHT);
        } else {
            errorMessage("drawRect() if number 2");
        }
    } else if (card.number === 3) {
        if (card.fill === "fill1") {
            solid(card,ctx);
            ctx.fillRect(X,Y-50,WIDTH,HEIGHT);
            ctx.fillRect(X,Y,WIDTH,HEIGHT);
            ctx.fillRect(X,Y+50,WIDTH,HEIGHT);
        } else if (card.fill === "fill2") {
            stripe(card,ctx);
            ctx.strokeRect(X,Y-50,WIDTH,HEIGHT);
            ctx.strokeRect(X,Y,WIDTH,HEIGHT);
            ctx.strokeRect(X,Y+50,WIDTH,HEIGHT);
        } else if (card.fill === "fill3") {
            outline(card,ctx);
            ctx.strokeRect(X,Y-50,WIDTH,HEIGHT);
            ctx.strokeRect(X,Y,WIDTH,HEIGHT);
            ctx.strokeRect(X,Y+50,WIDTH,HEIGHT);
        } else {
            errorMessage("drawRect() if number 3");
        }
    } else {
        errorMessage("drawRect() if number");
    }
};


/** diamond() takes some location info, a card index, and a context and draws a
 *  diamond at the specified location and context. It unpacks the fill type from
 *  the card to verify what type of line to draw.
 */
var diamond = function(dx,dy,dwidth,dheight,ctx,card) {
    ctx.beginPath();
    ctx.moveTo(dx+40,dy); // top point
    ctx.lineTo(dwidth+dx,dy+15); // right point
    ctx.lineTo(dx+40,dy+dheight); // bottom point
    ctx.lineTo(dx,dy+15); // left point
    ctx.lineTo(dx+40,dy); // back to top
    if (card.fill === "fill1") {
        ctx.fill();
    } else {
        ctx.stroke();
    }
};


/** drawDiamond() takes a card index and a canvas context. It first unpacks the number
 *  (x) from the card, and then it unpacks the fill type. Armed with those, it calls
 *  the fill type drawing function and the actual shape drawing function.
 *  takes: card index, board context
 *  goes to: solid(), stripe(), outline()
 *  then goes to: diamond() x times
 */
var drawDiamond = function(card,ctx) {
    if (card.number === 1) {
        if (card.fill === "fill1") {
            solid(card,ctx);
            diamond(X,Y,WIDTH,HEIGHT,ctx,card);
        } else if (card.fill === "fill2") {
            stripe(card,ctx);
            diamond(X,Y,WIDTH,HEIGHT,ctx,card);        
} else if (card.fill==="fill3") {
            outline(card,ctx);
            diamond(X,Y,WIDTH,HEIGHT,ctx,card);
        } else {
            errorMessage("drawRect() if number 1");
        }
    } else if (card.number === 2) {
        if (card.fill === "fill1") {
            solid(card,ctx);
            diamond(X,Y-25,WIDTH,HEIGHT,ctx,card);
            diamond(X,Y+25,WIDTH,HEIGHT,ctx,card);
        } else if (card.fill === "fill2") {
            stripe(card,ctx);
            diamond(X,Y-25,WIDTH,HEIGHT,ctx,card);
            diamond(X,Y+25,WIDTH,HEIGHT,ctx,card);
        } else if (card.fill === "fill3") {
            outline(card,ctx);
            diamond(X,Y-25,WIDTH,HEIGHT,ctx,card);
            diamond(X,Y+25,WIDTH,HEIGHT,ctx,card);
        } else {
            errorMessage("drawRect() if number 2");
        }
    } else if (card.number === 3) {
        if (card.fill === "fill1") {
            solid(card,ctx);
            diamond(X,Y-50,WIDTH,HEIGHT,ctx,card);
            diamond(X,Y,WIDTH,HEIGHT,ctx,card);
            diamond(X,Y+50,WIDTH,HEIGHT,ctx,card);
        } else if (card.fill === "fill2") {
            stripe(card,ctx);
            diamond(X,Y-50,WIDTH,HEIGHT,ctx,card);
            diamond(X,Y,WIDTH,HEIGHT,ctx,card);
            diamond(X,Y+50,WIDTH,HEIGHT,ctx,card);
        } else if (card.fill === "fill3") {
            outline(card,ctx);
            diamond(X,Y-50,WIDTH,HEIGHT,ctx,card);
            diamond(X,Y,WIDTH,HEIGHT,ctx,card);
            diamond(X,Y+50,WIDTH,HEIGHT,ctx,card);
        } else {
            errorMessage("drawRect() if number 3");
        }
    } else {
        errorMessage("drawRect() if number");
    }
};


/** semicircles() takes some location info, a card index, and a context and draws
 *  semicircles at the specified location and context. It unpacks the fill type
 *  from the card to verify what type of line to draw.
 */
var semicircles = function(dx,dy,dwidth,dheight,ctx,card) {
    ctx.beginPath();
        ctx.moveTo(dx,dy+15);
        ctx.arc(dheight,dy+15,dheight-dx,0,Math.PI,false);
        ctx.moveTo(dwidth+dx,dy+15);
        ctx.arc(dwidth-dx,dy+15,dheight-dx,0,Math.PI,true);
        ctx.lineTo(dwidth+dx,dy+15);
    if (card.fill === "fill1") {
        ctx.fill();
    } else {
        ctx.stroke();
    }
};


/** drawSemicircles() takes a card index and a canvas context. It first unpacks the number
 *  (x) from the card, and then it unpacks the fill type. Armed with those, it calls
 *  the fill type drawing function and the actual shape drawing function.
 *  takes: card index, board context
 *  goes to: solid(), stripe(), outline()
 *  then goes to: semicircles() x times
 */
var drawSemicircles = function(card,ctx) {
    if (card.number === 1) {
        if (card.fill === "fill1") {
            solid(card,ctx);
            semicircles(X,Y,WIDTH,HEIGHT,ctx,card);
        } else if (card.fill === "fill2") {
            stripe(card,ctx);
            semicircles(X,Y,WIDTH,HEIGHT,ctx,card);        
        } else if (card.fill === "fill3") {
            outline(card,ctx);
            semicircles(X,Y,WIDTH,HEIGHT,ctx,card);
        } else {
            errorMessage("drawRect() if number 1");
        }
    } else if (card.number === 2) {
        if (card.fill === "fill1") {
            solid(card,ctx);
            semicircles(X,Y-25,WIDTH,HEIGHT,ctx,card);
            semicircles(X,Y+25,WIDTH,HEIGHT,ctx,card);
        } else if (card.fill === "fill2") {
            stripe(card,ctx);
            semicircles(X,Y-25,WIDTH,HEIGHT,ctx,card);
            semicircles(X,Y+25,WIDTH,HEIGHT,ctx,card);
        } else if (card.fill === "fill3") {
            outline(card,ctx);
            semicircles(X,Y-25,WIDTH,HEIGHT,ctx,card);
            semicircles(X,Y+25,WIDTH,HEIGHT,ctx,card);
        } else {
            errorMessage("drawRect() if number 2");
        }
    } else if (card.number === 3) {
        if (card.fill === "fill1") {
            solid(card,ctx);
            semicircles(X,Y-50,WIDTH,HEIGHT,ctx,card);
            semicircles(X,Y,WIDTH,HEIGHT,ctx,card);
            semicircles(X,Y+50,WIDTH,HEIGHT,ctx,card);
        } else if (card.fill === "fill2") {
            stripe(card,ctx);
            semicircles(X,Y-50,WIDTH,HEIGHT,ctx,card);
            semicircles(X,Y,WIDTH,HEIGHT,ctx,card);
            semicircles(X,Y+50,WIDTH,HEIGHT,ctx,card);
        } else if (card.fill === "fill3") {
            outline(card,ctx);
            semicircles(X,Y-50,WIDTH,HEIGHT,ctx,card);
            semicircles(X,Y,WIDTH,HEIGHT,ctx,card);
            semicircles(X,Y+50,WIDTH,HEIGHT,ctx,card);
        } else {
            errorMessage("drawRect() if number 3");
        }
    } else {
        errorMessage("drawRect() if number");
    }
};


/** The drawCard() function takes a card index and an HTML element ID. It unpacks shape
 *  from the card (CARDS[index]) and begins the drawing process for the given element
 *  ID. It then triggers the next level of drawing function based on the unpacked shape.
 *  (to drawRectangle(), drawDiamond(), & drawSemicircles().)
 */
var drawCard = function(card,id) {
    var canvas = document.getElementById(id);
    var ctx = canvas.getContext('2d');
    if (card.shape === "shape1") {
        drawRectangle(card,ctx);
    } else if (card.shape === "shape2") {
        drawDiamond(card,ctx);
    } else if (card.shape === "shape3") {
        drawSemicircles(card,ctx);
    } else {
        errorMessage("drawCard()");
    }
};


/** drawEveryone() sets all the drawing functions into motion. First, it triggers the card
 *  drawing function / drawCard() for each card on the table, and then it draws the updated
 *  number of matches found by the player. It passes the card location in the CARDS stack
 *  as well as on the board itself to the drawCard() function.
 */
var drawEveryone = function() {
    for (var i = 0; i < TABLE.length; i++) { // update the cards
        drawCard(CARDS[TABLE[i]],"table"+(i+1));
    }
    var canvas = document.getElementById("playerMatch"); // update the # of matches found
    var matchString = "Matches found: " + MATCH_COUNT + ".";
    var ctx = canvas.getContext('2d');
    ctx.font = "1em Verdana";
    ctx.fillText(matchString, 10, 25, 180);
};


/** resetEveryone() writes over all the cards and message boxes with clear rectangles to
 *  delete their old content. It also resets hint-related counts to zero and deselects
 *  all cards. Finally, it checks to see if there are still cards left in the deck and
 *  sends a message to the player to announce the end of the game approaching.
 */
var resetEveryone = function() {
    toggleNoSelected();
    var canvas = document.getElementById("playerMatch"); // reset player match box
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 200, 50);
    canvas = document.getElementById("availableMatch"); // reset available match box
    ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 400, 50);
    canvas = document.getElementById("message"); // reset general message box
    ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 400, 50);

    for (var i = 0; i < TABLE.length+3; i++) { // reset cards on table
        canvas = document.getElementById("table"+(i+1));
        ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, 100, 150); // (0, 0, canvas.width, canvas.height);
    }

    HINT_COUNT=0; // reset hint function
    AVAILABLE_SETS = [];
    AVAILABLE_SETS_LOCATIONS = [];
    AVAILABLE_SETS_HINTS = [];

    if (DECK.length === 0) { // reward player for geting close to end of game :)
        playerMessage("Hey, there are no cards left in the deck! You've almost won!");
    }
};


/** startNewGame() calls several functions to start the game, hides itself, and then
 *  displays the options buttons.
 */
var startNewGame = function() {
    shuffleDeck();
    resetEveryone();
    drawEveryone();
    toggleVisible("startNewGame","yes","no");
    toggleVisible("set","no","yes");
    toggleVisible("hint","no","yes");
    toggleVisible("colors","no","yes");
    toggleVisible("deselectAll","no","yes");
};


/** youWin() alerts the player that they have won the game and reloads the webpage.
 */
var youWin = function() {
    alert("You won the game! I hope you enjoyed it. You are welcome to play again. :)");
    location.reload();
};


/** toggleColors() switches the visisbility of HTML element IDs: colors and
 *  colorSections.
 */
var toggleColors = function() {
    toggleVisible("colors","yes","no");
    toggleVisible("colorSelections","no","yes");
};


/** addClass() takes an HTML element ID and a class name. It checks for the class name,
 *  and if it is not already present adds the class to the given element.
 */
var addClass = function(id, classToAdd) {
    var currentClassValue = id.className;
    if (currentClassValue.indexOf(classToAdd) === -1) {
        if ((currentClassValue === null) || (currentClassValue === "")) {
            id.className = classToAdd;
        } else {
            id.className += " " + classToAdd;
        }
    }
}


/** removeClass() takes an HTML element ID and a class name. It checks for the class
 *  name, and if it is already present removes the class from the given element.
 */
var removeClass = function(id, classToRemove) {
    var currentClassValue = id.className;
 
    if (currentClassValue === classToRemove) {
        id.className = "";
        return;
    }
 
    var classValues = currentClassValue.split(" ");
    var filteredList = [];
 
    for (var i = 0 ; i < classValues.length; i++) {
        if (classToRemove != classValues[i]) {
            filteredList.push(classValues[i]);
        }
    }
 
    id.className = filteredList.join(" ");
}


/** toggle() takes an HTML element ID and an optional player variable. It then removes
 *  a class from the given element and adds a new one, swapping between selected and
 *  not selected values. The optional parameter should allow for the computer player's
 *  selected cards to be toggled through this same function, but I have not yet tested
 *  this functionality. !W !T
 */
var toggle = function(id,player) {
    player = (typeof player === "undefined") ? true: player;

    var toggleMe = document.getElementById(id);
    if (player) {
        if (toggleMe.className === "playerSelected") {
            removeClass(toggleMe,"playerSelected");
            addClass(toggleMe,"notSelected");
        } else if (toggleMe.className === "notSelected") {
            removeClass(toggleMe,"notSelected");
            addClass(toggleMe,"playerSelected");
        } else {
            errorMessage("toggle player");
        }
    } else {
        if (toggleMe.className === "compySelected") {
            removeClass(toggleMe,"compySelected");
            addClass(toggleMe,"notSelected");
        } else if (toggleMe.className === "notSelected") {
            removeClass(toggleMe,"notSelected");
            addClass(toggleMe,"compySelected");
        } else {
            errorMessage("toggle !player/compy");
        }
    }
};


/** toggleNoSelected() cycles through the available card regions on the table and swaps
 *  out any selected or hidden classes and replaces them with the not selected class.
 *  not selected values.
 */
var toggleNoSelected = function() {
    for (var id = 1; id <= TABLE.length; id++) {
        var toggleMe = document.getElementById("table"+id);
        if (toggleMe.className === "playerSelected") { // !W this is calling the error
            removeClass(toggleMe,"playerSelected");
        } else if (toggleMe.className === "compySelected") {
            removeClass(toggleMe,"compySelected");
        } else if (toggleMe.className === "hidden") {
            removeClass(toggleMe,"hidden");
        }
        addClass(toggleMe,"notSelected");
    }
    for (var id = 18; id>TABLE.length; id--) {
        var toggleMe = document.getElementById("table"+id);
        if (toggleMe.className != "hidden") {
            removeClass(toggleMe,"playerSelected");
            removeClass(toggleMe,"compySelected");
            removeClass(toggleMe,"notSelected");
            addClass(toggleMe,"hidden");
        }
    }
};


/** toggleHidden() is activated when the hint function checks for available sets and
 *  finds none. It swaps between the classes hidden and not selected.
 */
var toggleHidden = function() {
    for (var i = 3; i > 0; --i) {
        var toggleMe = document.getElementById("table"+(12+i));
        if (toggleMe.className === "hidden") {
            removeClass(toggleMe,"hidden");
            addClass(toggleMe,"notSelected");
        } else if (toggleMe.className === "notSelected") {
            removeClass(toggleMe,"notSelected");
            addClass(toggleMe,"hidden");
        } else {
            errorMessage("toggleHidden!");
        }
    }
};


/** toggleVisible() take an HTML element ID, a class name to remove, and a class name
 *  to add. It removes the class name from the given element ID and adds the new class.
 */
var toggleVisible = function(id, classToRemove, classToAdd) {
    var makeChangeTo = document.getElementById(id);
    removeClass(makeChangeTo,classToRemove);
    addClass(makeChangeTo,classToAdd);
};


/** noSet() takes a word as a parameter and alerts the player with a canned phrase
 *  that their set is disqualified on the grounds of said word.
 */ // I should maybe expand this into more specific messages for each scenario.
var noSet = function(word) {
    alert("Sorry! That is not a set. There is something off about the " + word + ".");
};


/** yesSet() removes a verified set of cards from the table, increases the match count,
 *  pulls three new cards from the deck, and then calls resetEveryone() & drawEveryone()
 *  to draw the new cards. It is the last step in checking for a set.
 */ //Okay, it is more like a bonus step after the last verification step. How say? !F
var yesSet = function() {
    if (TABLE.length <= 12) {
        if (DECK.length>0) {
            for (var i = POSSIBLE_SET.length; i>0; --i) {
                TABLE.splice(POSSIBLE_SET[i-1].location,1,DECK.shift());
            }
        } else if (DECK.length === 0) {
            for (var i = POSSIBLE_SET.length; i>0; --i) {
                TABLE.splice(POSSIBLE_SET[i-1].location,1);
            }
        }
    } else if (TABLE.length>12) {
        for (var i = POSSIBLE_SET.length; i>0; --i) {
            TABLE.splice(POSSIBLE_SET[i-1].location,1);
        }
    } else {
        errorMessage("yesSet");
    }
    MATCH_COUNT++;
    resetEveryone();
    drawEveryone();
};


/** yesAvailable() takes a verified set of cards and pushes location info to
 *  global variables for use by the hint() function.
 */
var yesAvailable = function(cd1,cd2,cd3,a,b,c) {
    AVAILABLE_SETS.push([cd1,cd2,cd3]);
    AVAILABLE_SETS_LOCATIONS.push(a,b,c);
}


/** isFinal() is the next step after isNumber() in checking whether a possible set
 *  is a real set. The first of the optional hint variables is finally used for
 *  branching here, and it calls either yesSet() or yesAvailable() accordingly. !F
 */
var isFinal = function(cd1,cd2,cd3,just,a,b,c) {
    if (just===false) {
        yesSet();
    } else /*if (just)*/ { // !T !R why doesn't this work as an if cond?
        yesAvailable(cd1,cd2,cd3,a,b,c);
//    } else {
//        errorMessage("isFinal");
    }
};

/** isNumber() is the next step after isShape() in checking whether a possible set
 *  is a real set. It takes three cards as parameters, unpacks the number from them,
 *  checks whether they are all the same or all different, and then passes on to
 *  noSet() or the next step / isFinal() accordingly. isNumber() takes four
 *  additional parameters when the hint function calls it, but they are otherwise
 *  ignored. !F
 */
var isNumber = function(cd1,cd2,cd3,just,a,b,c) {
    if (cd1.number === cd2.number && cd2.number === cd3.number) {
        AVAILABLE_SETS_HINTS.push("The numbers of shapes in this set are all the same.");
        isFinal(cd1,cd2,cd3,just,a,b,c);
   } else if (cd1.number != cd2.number && cd2.number != cd3.number && cd3.number != cd1.number) {
        AVAILABLE_SETS_HINTS.push("The numbers of shapes in this set are all different.");
        isFinal(cd1,cd2,cd3,just,a,b,c);
    } else if (just === false) {
        noSet("number");
    } else if (just) {
        AVAILABLE_SETS_HINTS = [];
    } else {
        errorMessage("isNumber");
    }
};


/** isShape() is the next step after isFill() in checking whether a possible set
 *  is a real set. It takes three cards as parameters, unpacks the shape type
 *  from them, checks whether they are all the same or all different, and then
 *  passes on to noSet() or the next step / isNumber() accordingly. isShape() takes
 *  four additional parameters when the hint function calls it, but they are
 *  otherwise ignored. !F
 */
var isShape = function(cd1,cd2,cd3,just,a,b,c) {
    if (cd1.shape === cd2.shape && cd2.shape === cd3.shape) {
        AVAILABLE_SETS_HINTS.push("The shapes in this set are all the same.");
        isNumber(cd1,cd2,cd3,just,a,b,c);
    } else if (cd1.shape != cd2.shape && cd2.shape != cd3.shape && cd3.shape != cd1.shape) {
        AVAILABLE_SETS_HINTS.push("The shapes in this set are all different.");
        isNumber(cd1,cd2,cd3,just,a,b,c);
    } else if (just === false) {
        noSet("shapes");
    } else if (just) {
        AVAILABLE_SETS_HINTS = [];
    } else {
        errorMessage("isShape");
    }
};


/** isFill() is the next step after isSet() in checking whether a possible set
 *  is a real set. It takes three cards as parameters, unpacks the fill type
 *  from them, checks whether they are all the same or all different, and then
 *  passes on to noSet() or the next step / isShape() accordingly. isFill() takes
 *  four additional parameters when the hint function calls it, but they are
 *  otherwise ignored. !F
 */
var isFill = function(cd1,cd2,cd3,just,a,b,c) {
    if (cd1.fill === cd2.fill && cd2.fill === cd3.fill) {
        AVAILABLE_SETS_HINTS.push("The shadings in this set are all the same.");
        isShape(cd1,cd2,cd3,just,a,b,c);
    } else if (cd1.fill != cd2.fill && cd2.fill != cd3.fill && cd3.fill != cd1.fill) {
        AVAILABLE_SETS_HINTS.push("The shadings in this set are all different.");
        isShape(cd1,cd2,cd3,just,a,b,c);
    } else if (just === false) {
        noSet("fill");
    } else if (just === true) {
        AVAILABLE_SETS_HINTS = [];
    } else {
        errorMessage("isFill");
    }
};


/** isSet() is the first step in checking whether a possible set is a real set.
 *  It takes three cards as parameters, unpacks color from them, checks whether
 *  the colors are all the same or all different, and then passes on to noSet()
 *  or the next step / isFill() accordingly. isSet() takes four additional
 *  parameters when the hint function calls it, but they are otherwise ignored. 
 *  !F
 */
var isSet = function(cd1,cd2,cd3,just,a,b,c) { // just = justChecking if set
    just = (typeof just === "undefined") ? false: just;
    a = (typeof a === "undefined") ? false : a;
    b = (typeof b === "undefined") ? false : b;
    c = (typeof c === "undefined") ? false : c;

    if (cd1.color === cd2.color && cd2.color === cd3.color) {
        AVAILABLE_SETS_HINTS.push("The colors in this set are all the same.");
        isFill(cd1,cd2,cd3,just,a,b,c);
    } else if (cd1.color != cd2.color && cd2.color != cd3.color && cd3.color != cd1.color) {
        AVAILABLE_SETS_HINTS.push("The colors in this set are all different.");
        isFill(cd1,cd2,cd3,just,a,b,c);
    } else if (just === false) {
        noSet("colors");
    } else if (just === true) {
        AVAILABLE_SETS_HINTS = [];
    } else {
        errorMessage("isSet");
    }
};


/** set() is the function that sets off the set verification cascade. It checks
 *  whether a possible set meets the most basic requirement -- three cards -- and
 *  then posts the set to a global variable and calls the first verification
 *  function, isSet(). Or it prompts the user to try selecting three cards first.
 */
var set = function() {
    for (var i = 0; i < TABLE.length; ++i) {
        var j = document.getElementById("table"+(i+1));
        if (j.className === "playerSelected") {
            POSSIBLE_SET.push({card:TABLE[i], location:i});
        }
    }
    if (POSSIBLE_SET.length != 3) {
        playerMessage("That doesn't look like three cards to me. A set must have three cards! :)");
        POSSIBLE_SET = [];
    } else {
        var card1 = CARDS[POSSIBLE_SET[0].card];
        var card2 = CARDS[POSSIBLE_SET[1].card];
        var card3 = CARDS[POSSIBLE_SET[2].card];
        isSet(card1,card2,card3);
        POSSIBLE_SET = [];
    }
};


/** hint() checks the board for possible sets, and when it finds one begins posting
 *  hints to the player message box and selecting cards for the player. If it does
 *  not find a set, it adds three cards to the board, calls toggleHidden(), and then
 *  calls reset&drawEveryone to re-draw the board.
 */ // my masterpiece-- this magical button <3
var hint = function() {
    if (HINT_COUNT === 0) {
        for (var i = 0; i < TABLE.length-3; i++) {
            for (var j = i+1; j < TABLE.length; j++) {
                for (var k = j+1; k < TABLE.length; k++) {
                    var card1 = CARDS[TABLE[i]];
                    var card2 = CARDS[TABLE[j]];
                    var card3 = CARDS[TABLE[k]];
                    var a = i+1, b = j+1, c = k+1;
                    isSet(card1,card2,card3,true,a,b,c);
                    if (AVAILABLE_SETS.length > 0) break;
                }
                if (AVAILABLE_SETS.length > 0) break;
            }
            if (AVAILABLE_SETS.length > 0) break;
        }
        if (AVAILABLE_SETS.length === 0) {
            if (DECK.length === 0) {
                youWin();
                return;
            } else {
                playerMessage("There are no sets! I will add three cards to the table for you.");
                for (var i = 3; i > 0; i--) {
                    TABLE.push(DECK.shift());
                }
                toggleHidden();
                resetEveryone();
                drawEveryone();
            }
        } else if (AVAILABLE_SETS.length > 0) {
            var hint1 = Math.floor(Math.random()*AVAILABLE_SETS_LOCATIONS.length);
            toggle("table"+AVAILABLE_SETS_LOCATIONS[hint1],true);
            AVAILABLE_SETS_LOCATIONS.splice(hint1,1);
            HINT_COUNT ++;
        } else {
            errorMessage("hint() AVAILABLE_SETS .length else");
        }
    } else if (HINT_COUNT === 1) {
        if (AVAILABLE_SETS_HINTS.length>0) {
            var hint2 = Math.floor(Math.random()*AVAILABLE_SETS_HINTS.length);
            playerMessage(AVAILABLE_SETS_HINTS[hint2]);
            AVAILABLE_SETS_HINTS.splice(hint2,1);
        } else if (AVAILABLE_SETS_LOCATIONS.length>0) {
            var hint3 = Math.floor(Math.random()*AVAILABLE_SETS_LOCATIONS.length);
            toggle("table"+AVAILABLE_SETS_LOCATIONS[hint3],true);
            AVAILABLE_SETS_LOCATIONS.splice(hint3,1);
        } else {            
            playerMessage("Hey, I've already selected a set for you!");
            HINT_COUNT++;
        }
    } else if (HINT_COUNT === 2) {
        playerMessage("No, really. I have already selected a set for you.");
        HINT_COUNT++;
    } else {
        set();
    }
};

// This has been a Dr. Vonn Jerry XLII Production.
