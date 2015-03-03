// This is my first real coding project!
// Thanks to David W/Vinietskyzilla for introducing me to canvas & to some great canvas drawing tutorials.
// Thanks to David F/Davidfstr for showing me how to do something key-indexy as in the card generator code.
// Thanks to John for teaching me some better coding practices, like ALLCAPSing global variables and adding documentation-y notes for readers & my future self.
// To any readers: if you see a little mark like this: !Q !W !R -- those are to make notes to myself easier to find.

var CARDS = []; // global variable to store all the cards

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


var DECK = []; // global variable to store card indexes for cards in the deck
var TABLE = []; // global variable to store card indexes for cards on the table/board

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
var gradyLight = "rgb(255,255,255)"; // white
var gradyDark = "rgb(60,60,60)"; // dark gray
var grady = gradyDark;

var changeColors = function(whichScheme) { // !R maybe it's time to learn case/switch if javascript has?
    var dark = false;
    if (whichScheme === "Jeri") { // my preferrored color scheme
        if (dark) {
            removeClass("body","dark");
        }
        color1 = "rgb(200,0,255)"; // purple
        color2 = "rgb(20,200,255)"; // lightish blue
        color3 = "rgb(220,200,0)"; // goldy yellow
        grady = gradyDark;
    } else if (whichScheme === "classic") { // the original Set color scheme
        if (dark) {
            removeClass("body","dark");
        }
        color1 = "rgb(200,0,255)"; // purple
        color2 = "rgb(20,255,0)"; // green
        color3 = "rgb(255,0,0)"; // red
        grady = gradyDark;
    } else if (whichScheme === "colorBlind") { // a scheme for colorblindness
        if (dark) {
            removeClass("body","dark");
        }
        color1 = "rgb(230,159,0)"; // orange / pink
        color2 = "rgb(0,144,178)"; // blue / still blue
        color3 = "rgb(0,0,0)"; // ALLES IST SCHWARZ
        grady = gradyLight;
    } else if (whichScheme === "monochrome") { // ooohhhh, this is hard to play; TIME TO LEARN HOW TO STRIPES
        grady = gradyLight;
        color1 = "rgb(200,200,200)"; // dark grey
        color2 = "rgb(135,135,135)"; // light grey
        color3 = "rgb(0,0,0)"; // white
    } else if (whichScheme === "darkGrad") {
        grady = gradyDark;
    } else if (whichScheme === "lightGrad") {
        grady = gradyLight;
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
var gradient = function(card,ctx) {
    var half = ctx.createLinearGradient(0,0,150,100);
    if (card.color === "color1") {
        half.addColorStop(0,color1);
    } else if (card.color === "color2") {
        half.addColorStop(0,color2);
    } else if (card.color === "color3") {
        half.addColorStop(0,color3);
    } else {
        errorMessage("gradient() else");
    }
    half.addColorStop(1,grady);
    ctx.fillStyle = half;
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

var X = 10; // global variable for card shape locations
var Y = 60; // global variable for card shape locations
var WIDTH = 80; // global variable for card shape locations
var HEIGHT = 30; // global variable for card shape locations

/** drawRectangle() takes a card index and a canvas context. It first unpacks the number
 *  (x) from the card, and then it unpacks the fill type. Armed with those, it calls
 *  the fill type drawing function and the actual shape drawing function. Actually, there
 *  is already a built in canvas rectangle shape, so it just calls that.
 *  takes: card index, board context
 *  goes to: solid(), gradient(), outline()
 *  then: draws rectangle x times
 */
var drawRectangle = function(card,ctx) {
    if (card.number === 1) {
        if (card.fill === "fill1") {
            solid(card,ctx);
            ctx.fillRect(X,Y,WIDTH,HEIGHT);
        } else if (card.fill === "fill2") {
            gradient(card,ctx);
            ctx.fillRect(X,Y,WIDTH,HEIGHT);
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
            gradient(card,ctx);
            ctx.fillRect(X,Y-25,WIDTH,HEIGHT);
            ctx.fillRect(X,Y+25,WIDTH,HEIGHT);
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
            gradient(card,ctx);
            ctx.fillRect(X,Y-50,WIDTH,HEIGHT);
            ctx.fillRect(X,Y,WIDTH,HEIGHT);
            ctx.fillRect(X,Y+50,WIDTH,HEIGHT);
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
    if (card.fill === "fill3") {
        ctx.stroke();
    } else {
        ctx.fill();
    }
};


/** drawDiamond() takes a card index and a canvas context. It first unpacks the number
 *  (x) from the card, and then it unpacks the fill type. Armed with those, it calls
 *  the fill type drawing function and the actual shape drawing function.
 *  takes: card index, board context
 *  goes to: solid(), gradient(), outline()
 *  then goes to: diamond() x times
 */
var drawDiamond = function(card,ctx) {
    if (card.number === 1) {
        if (card.fill === "fill1") {
            solid(card,ctx);
            diamond(X,Y,WIDTH,HEIGHT,ctx,card);
        } else if (card.fill === "fill2") {
            gradient(card,ctx);
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
            gradient(card,ctx);
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
            gradient(card,ctx);
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
    if (card.fill === "fill3") {
        ctx.stroke();
    } else {
        ctx.fill();
    }
};


/** drawSemicircles() takes a card index and a canvas context. It first unpacks the number
 *  (x) from the card, and then it unpacks the fill type. Armed with those, it calls
 *  the fill type drawing function and the actual shape drawing function.
 *  takes: card index, board context
 *  goes to: solid(), gradient(), outline()
 *  then goes to: semicircles() x times
 */
var drawSemicircles = function(card,ctx) {
    if (card.number === 1) {
        if (card.fill === "fill1") {
            solid(card,ctx);
            semicircles(X,Y,WIDTH,HEIGHT,ctx,card);
        } else if (card.fill === "fill2") {
            gradient(card,ctx);
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
            gradient(card,ctx);
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
            gradient(card,ctx);
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

var MATCH_COUNT = 0;

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

    hintCount=0; // reset hint function
    availableSets = [];
    availableSetsLocs = [];
    availableSetsHints = [];

    if (DECK.length === 0) { // reward player for geting close to end of game
        playerMessage("Hey, there are no cards left in the deck! You've almost won!");
    }
};

var startNewGame = function() {
    alert("Hey! I just wanted to warn you that I haven't worked on making the right sort of stripey card that the original game has. When you see a card that looks darker, that's the the third shade. It's a gradient.");
    shuffleDeck();
    resetEveryone();
    drawEveryone();
    toggleVisible("startNewGame","yes","no");
    toggleVisible("set","no","yes");
    toggleVisible("hint","no","yes");
    toggleVisible("colors","no","yes");
    toggleVisible("deselectAll","no","yes");
};

var youWin = function() {
    alert("You won the game! I hope you enjoyed it. You are welcome to play again. :)");
    resetEveryone();
    for (var i = 18; i > 0; --i) {
        var toggleMe = document.getElementById("table"+(i));
        if (toggleMe.className === "notSelected") {
            removeClass(toggleMe,"notSelected");
            addClass(toggleMe,"hidden");
        }
    }
    toggleVisible("startNewGame","no","yes");
    toggleVisible("set","yes","no");
    toggleVisible("hint","yes","no");
    toggleVisible("colors","yes","no");
    toggleVisible("deselectAll","yes","no");
};

var toggleColors = function() {
    toggleVisible("colors","yes","no");
    toggleVisible("colorSelections","no","yes");
};

var toggleVisible = function(id, classToRemove, classToAdd) {
    var makeChangeTo = document.getElementById(id);
    removeClass(makeChangeTo,classToRemove);
    addClass(makeChangeTo,classToAdd);
};

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

var toggleNoSelected = function() {
    for (var id = 1; id <= TABLE.length; id++) {
        var toggleMe = document.getElementById("table"+id);
        if (toggleMe.className === "playerSelected") {
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

var maybeSet = [];

var noSet = function(word) {
    alert("Sorry! That is not a set. There is something off about the " + word + ".");
};

var isSet = function(cd1,cd2,cd3,just,a,b,c) { // just = justChecking if set
    just = (typeof just === "undefined") ? false: just;
    a = (typeof a === "undefined") ? false : a;
    b = (typeof b === "undefined") ? false : b;
    c = (typeof c === "undefined") ? false : c;

    if (cd1.color === cd2.color && cd2.color === cd3.color) {
        availableSetsHints.push("The colors in this set are all the same.");
        isFill(cd1,cd2,cd3,just,a,b,c);
    } else if (cd1.color != cd2.color && cd2.color != cd3.color && cd3.color != cd1.color) {
        availableSetsHints.push("The colors in this set are all different.");
        isFill(cd1,cd2,cd3,just,a,b,c);
    } else if (just === false) {
        noSet("colors");
    } else if (just === true) {
        availableSetsHints = [];
    } else {
        errorMessage("isSet");
    }
};

var isFill = function(cd1,cd2,cd3,just,a,b,c) {
    if (cd1.fill === cd2.fill && cd2.fill === cd3.fill) {
        availableSetsHints.push("The shadings in this set are all the same.");
        isShape(cd1,cd2,cd3,just,a,b,c);
    } else if (cd1.fill != cd2.fill && cd2.fill != cd3.fill && cd3.fill != cd1.fill) {
        availableSetsHints.push("The shadings in this set are all different.");
        isShape(cd1,cd2,cd3,just,a,b,c);
    } else if (just === false) {
        noSet("fill");
    } else if (just === true) {
        availableSetsHints = [];
    } else {
        errorMessage("isFill");
    }
};

var isShape = function(cd1,cd2,cd3,just,a,b,c) {
    if (cd1.shape === cd2.shape && cd2.shape === cd3.shape) {
        availableSetsHints.push("The shapes in this set are all the same.");
        isNumber(cd1,cd2,cd3,just,a,b,c);
    } else if (cd1.shape != cd2.shape && cd2.shape != cd3.shape && cd3.shape != cd1.shape) {
        availableSetsHints.push("The shapes in this set are all different.");
        isNumber(cd1,cd2,cd3,just,a,b,c);
    } else if (just === false) {
        noSet("shapes");
    } else if (just) {
        availableSetsHints = [];
    } else {
        errorMessage("isShape");
    }
};

var isNumber = function(cd1,cd2,cd3,just,a,b,c) {
    if (cd1.number === cd2.number && cd2.number === cd3.number) {
        availableSetsHints.push("The numbers of shapes in this set are all the same.");
        isFinal(cd1,cd2,cd3,just,a,b,c);
   } else if (cd1.number != cd2.number && cd2.number != cd3.number && cd3.number != cd1.number) {
        availableSetsHints.push("The numbers of shapes in this set are all different.");
        isFinal(cd1,cd2,cd3,just,a,b,c);
    } else if (just === false) {
        noSet("number");
    } else if (just) {
        availableSetsHints = [];
    } else {
        errorMessage("isNumber");
    }
};

var isFinal = function(cd1,cd2,cd3,just,a,b,c) {
    if (just===false) {
        yesSet();
    } else /*if (just===true)*/ { // !Q whhhyyy doesn't this work as an if cond???
        yesAvailable(cd1,cd2,cd3,a,b,c);
//    } else {
//        console.log("Eroor! isFinal");
    }
};

var yesSet = function() {
    if (TABLE.length <= 12) {
        if (DECK.length>0) {
            for (var i = maybeSet.length; i>0; --i) {
                TABLE.splice(maybeSet[i-1].location,1,DECK.shift());
            }
        } else if (DECK.length === 0) {
            for (var i = maybeSet.length; i>0; --i) {
                TABLE.splice(maybeSet[i-1].location,1);
            }
        }
    } else if (TABLE.length>12) {
        for (var i = maybeSet.length; i>0; --i) {
            TABLE.splice(maybeSet[i-1].location,1);
        }
    } else {
        errorMessage("yesSet");
    }
    MATCH_COUNT++;
    resetEveryone();
    drawEveryone();
};

var availableSets = [];
var availableSetsLocs = [];
var availableSetsHints = [];

var yesAvailable = function(cd1,cd2,cd3,a,b,c) {
    availableSets.push([cd1,cd2,cd3]);
    availableSetsLocs.push(a,b,c);
}

var set = function() {
    for (var i = 0; i < TABLE.length; ++i) {
        var j = document.getElementById("table"+(i+1));
        if (j.className === "playerSelected") {
            maybeSet.push({card:TABLE[i], location:i});
        }
    }
    if (maybeSet.length != 3) {
        playerMessage("That doesn't look like three cards to me! A set must have three cards.");
        maybeSet = [];
    } else {
        var card1 = CARDS[maybeSet[0].card];
        var card2 = CARDS[maybeSet[1].card];
        var card3 = CARDS[maybeSet[2].card];
        isSet(card1,card2,card3);
        maybeSet = [];
    }
};

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

var hintCount = 0;

var hint = function() {
    if (hintCount === 0) {
        for (var i = 0; i < TABLE.length-3; i++) {
            for (var j = i+1; j < TABLE.length; j++) {
                for (var k = j+1; k < TABLE.length; k++) {
                    var card1 = CARDS[TABLE[i]];
                    var card2 = CARDS[TABLE[j]];
                    var card3 = CARDS[TABLE[k]];
                    var a = i+1, b = j+1, c = k+1;
                    isSet(card1,card2,card3,true,a,b,c);
                    if (availableSets.length > 0) break;
                }
                if (availableSets.length > 0) break;
            }
            if (availableSets.length > 0) break;
        }
        if (availableSets.length === 0) {
            if (DECK.length === 0) {
                youWin();
                return;
            } else {
                playerMessage("There are no sets! I will add three CARDS to the TABLE for you.");
                for (var i = 3; i > 0; i--) {
                    TABLE.push(DECK.shift());
                }
                toggleHidden();
                resetEveryone();
                drawEveryone();
            }
        } else if (availableSets.length > 0) {
            var hint1 = Math.floor(Math.random()*availableSetsLocs.length);
            toggle("table"+availableSetsLocs[hint1],true);
            availableSetsLocs.splice(hint1,1);
            hintCount ++;
        } else {
            errorMessage("hint() availableSets .length else");
        }
    } else if (hintCount === 1) {
        if (availableSetsHints.length>0) {
            var hint2 = Math.floor(Math.random()*availableSetsHints.length);
            playerMessage(availableSetsHints[hint2]);
            availableSetsHints.splice(hint2,1);
        } else if (availableSetsLocs.length>0) {
            var hint3 = Math.floor(Math.random()*availableSetsLocs.length);
            toggle("table"+availableSetsLocs[hint3],true);
            availableSetsLocs.splice(hint3,1);
        } else {            
            playerMessage("Hey, I've already selected a set for you!");
            hintCount++;
        }
    } else if (hintCount === 2) {
        playerMessage("No, really. I have already selected a set for you.");
        hintCount++;
    } else {
        set();
    }
};

// This has been a Dr. Vonn Jerrory XLII Production.
