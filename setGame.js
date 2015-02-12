// this is my first real coding project!
// Thanks to David W for introducing me to canvas & to some great canvas drawing tutorials
// Thanks to David F for showing me how to do something key-indexy as in the card generator code


// code to generate cards:

var clr;
var shp;
var fll;
var num;
var ttl = 100;

var colors = ["color1", "color2", "color3"];
var shapes = ["shape1", "shape2", "shape3"];
var fills = ["fill1", "fill2", "fill3"];
var numbers = [1, 2, 3];

var cards = [];

for (var clr = 0; clr < colors.length; ++clr) {
    for  (var shp = 0; shp < shapes.length; ++shp) {
        for (var fll = 0; fll < fills.length; ++fll) {
            for (var num = 0; num < numbers.length; ++num) {
                ttl += 1;
                cards.push({
                    card:ttl,
                    color:colors[clr],
                    shape:shapes[shp],
                    fill:fills[fll],
                    number:numbers[num]
                });
}; }; }; };

// console.log(cards);


var errMsg = function(message) {
    console.log("Eroor! "+message);
};

var plyrMsg = function(message) {
    boxMsg(message);
};

var boxMsg = function(message) {
    var canvas = document.getElementById("message");
    if (canvas.getContext) { // to overwrite any previous message
         var ctx = canvas.getContext('2d');
         ctx.clearRect(0, 0, 400, 50);
    };
    if (canvas.getContext) { // to write the new message
        var ctx = canvas.getContext('2d');
        ctx.font = ".8em Verdana";
        ctx.fillText(message, 10, 15, 380);
    };
};


// code to 'generate' & shuffle deck, then draw 12 cards

var protoDeck = [];
var deck = [];
var table = [];


var shuffleDeck = function() {
    // create unshuffled deck
    for (var i = 0; i < cards.length; ++i) {
        protoDeck.push(i);
    };

    // shuffle deck
    // deck.sort(function() {return 0.5 - Math.random()}); // is this random enough?
    // DavidF said this type of sorting will eventually causes errors & to not use this

    while (protoDeck.length > 0) {
        var ohPickMe = Math.floor(Math.random()*protoDeck.length);
        var card = protoDeck.splice(ohPickMe,1);
        deck.push(card[0]);
    };

    // draw 12 cards to the table
    for (var i = 0; i < 12; ++i) {
        table.push(deck.shift()); };
};
/*
var drawThree = function(noSetsAvailable) {
    noSetsAvailable = (typeof noSetsAvailable === "undefined") ? false: noSetsAvailable;
    if (noSetsAvailable === true) {
        
    } else if (noSetsAvailable === false) {
        
    } else {
        errMsg("drawThree() if noSetsAvailable else");
    };
};*/

var color1 = "rgb(200,0,255)"; // purple
//var color1 = "rgb(20,20,255)"; // royal blue
//var color2 = "rgb(20,255,0)"; // green
var color2 = "rgb(20,200,255)"; // lightish blue
//var color3 = "rgb(255,0,0)"; // red
var color3 = "rgb(220,200,0)"; // goldy yellow
var grady = "rgb(60,60,60)"; // dark gray

var solid = function(card,ctx) {
    if (card.color==="color1") {
        ctx.fillStyle = color1;
    } else if (card.color==="color2") {
        ctx.fillStyle = color2;
    } else if (card.color==="color3") {
        ctx.fillStyle = color3;
    } else {
        errMsg("solid() else");
    };
};

var gradient = function(card,ctx) {
    var half = ctx.createLinearGradient(0,0,150,100);
    if (card.color==="color1") {
        half.addColorStop(0,color1);
    } else if (card.color==="color2") {
        half.addColorStop(0,color2);
    } else if (card.color==="color3") {
        half.addColorStop(0,color3);
    } else {
        errMsg("gradient() else");
    };
    half.addColorStop(1,grady);
    ctx.fillStyle = half;
};

var outline = function(card,ctx) {
    if (card.color==="color1") {
        ctx.strokeStyle = color1;
    } else if (card.color==="color2") {
        ctx.strokeStyle = color2;
    } else if (card.color==="color3") {
        ctx.strokeStyle = color3;
    } else {
        errMsg("outline() else");
    };
};

var x = 10;
var y = 60;
var width = 80;
var height = 30;

var drawRectangle = function(card,id,ctx) {
    if (card.number===1) {
        if (card.fill==="fill1") {
            solid(card,ctx);
            ctx.fillRect(x,y,width,height);
        } else if (card.fill==="fill2") {
            gradient(card,ctx);
            ctx.fillRect(x,y,width,height);
        } else if (card.fill==="fill3") {
            outline(card,ctx);
            ctx.strokeRect(x,y,width,height);
        } else {
            errMsg("drawRect() if num 1");
        };
    } else if (card.number===2) {
        if (card.fill==="fill1") {
            solid(card,ctx);
            ctx.fillRect(x,y-25,width,height);
            ctx.fillRect(x,y+25,width,height);
        } else if (card.fill==="fill2") {
            gradient(card,ctx);
            ctx.fillRect(x,y-25,width,height);
            ctx.fillRect(x,y+25,width,height);
        } else if (card.fill==="fill3") {
            outline(card,ctx);
            ctx.strokeRect(x,y-25,width,height);
            ctx.strokeRect(x,y+25,width,height);
        } else {
            errMsg("drawRect() if num 2");
        };
    } else if (card.number===3) {
        if (card.fill==="fill1") {
            solid(card,ctx);
            ctx.fillRect(x,y-50,width,height);
            ctx.fillRect(x,y,width,height);
            ctx.fillRect(x,y+50,width,height);
        } else if (card.fill==="fill2") {
            gradient(card,ctx);
            ctx.fillRect(x,y-50,width,height);
            ctx.fillRect(x,y,width,height);
            ctx.fillRect(x,y+50,width,height);
        } else if (card.fill==="fill3") {
            outline(card,ctx);
            ctx.strokeRect(x,y-50,width,height);
            ctx.strokeRect(x,y,width,height);
            ctx.strokeRect(x,y+50,width,height);
        } else {
            errMsg("drawRect() if num 3");
        };
    } else {
        errMsg("drawRect() if num");
    };
};

var diamond = function(dx,dy,dwidth,dheight,ctx,card) {
    ctx.beginPath();
    ctx.moveTo(dx+40,dy); // top point
    ctx.lineTo(dwidth+dx,dy+15); // right point
    ctx.lineTo(dx+40,dy+dheight); // bottom point
    ctx.lineTo(dx,dy+15); // left point
    ctx.lineTo(dx+40,dy); // back to top
    if (card.fill==="fill3") {
        ctx.stroke();
    } else {
        ctx.fill();
    };
};

var drawDiamond = function(card,id,ctx) {
    if (card.number===1) {
        if (card.fill==="fill1") {
            solid(card,ctx);
            diamond(x,y,width,height,ctx,card);
        } else if (card.fill==="fill2") {
            gradient(card,ctx);
            diamond(x,y,width,height,ctx,card);        
} else if (card.fill==="fill3") {
            outline(card,ctx);
            diamond(x,y,width,height,ctx,card);
        } else {
            errMsg("drawRect() if num 1");
        };
    } else if (card.number===2) {
        if (card.fill==="fill1") {
            solid(card,ctx);
            diamond(x,y-25,width,height,ctx,card);
            diamond(x,y+25,width,height,ctx,card);
        } else if (card.fill==="fill2") {
            gradient(card,ctx);
            diamond(x,y-25,width,height,ctx,card);
            diamond(x,y+25,width,height,ctx,card);
        } else if (card.fill==="fill3") {
            outline(card,ctx);
            diamond(x,y-25,width,height,ctx,card);
            diamond(x,y+25,width,height,ctx,card);
        } else {
            errMsg("drawRect() if num 2");
        };
    } else if (card.number===3) {
        if (card.fill==="fill1") {
            solid(card,ctx);
            diamond(x,y-50,width,height,ctx,card);
            diamond(x,y,width,height,ctx,card);
            diamond(x,y+50,width,height,ctx,card);
        } else if (card.fill==="fill2") {
            gradient(card,ctx);
            diamond(x,y-50,width,height,ctx,card);
            diamond(x,y,width,height,ctx,card);
            diamond(x,y+50,width,height,ctx,card);
        } else if (card.fill==="fill3") {
            outline(card,ctx);
            diamond(x,y-50,width,height,ctx,card);
            diamond(x,y,width,height,ctx,card);
            diamond(x,y+50,width,height,ctx,card);
        } else {
            errMsg("drawRect() if num 3");
        };
    } else {
        errMsg("drawRect() if num");
    };
};

var semicircles = function(dx,dy,dwidth,dheight,ctx,card) {
    ctx.beginPath();
        ctx.moveTo(dx,dy+15);
        ctx.arc(dheight,dy+15,dheight-dx,0,Math.PI,false);
        ctx.moveTo(dwidth+dx,dy+15);
        ctx.arc(dwidth-dx,dy+15,dheight-dx,0,Math.PI,true);
        ctx.lineTo(dwidth+dx,dy+15);
    if (card.fill==="fill3") {
        ctx.stroke();
    } else {
        ctx.fill();
    };
};


var drawSemicircles = function(card,id,ctx) {
    if (card.number===1) {
        if (card.fill==="fill1") {
            solid(card,ctx);
            semicircles(x,y,width,height,ctx,card);
        } else if (card.fill==="fill2") {
            gradient(card,ctx);
            semicircles(x,y,width,height,ctx,card);        
} else if (card.fill==="fill3") {
            outline(card,ctx);
            semicircles(x,y,width,height,ctx,card);
        } else {
            errMsg("drawRect() if num 1");
        };
    } else if (card.number===2) {
        if (card.fill==="fill1") {
            solid(card,ctx);
            semicircles(x,y-25,width,height,ctx,card);
            semicircles(x,y+25,width,height,ctx,card);
        } else if (card.fill==="fill2") {
            gradient(card,ctx);
            semicircles(x,y-25,width,height,ctx,card);
            semicircles(x,y+25,width,height,ctx,card);
        } else if (card.fill==="fill3") {
            outline(card,ctx);
            semicircles(x,y-25,width,height,ctx,card);
            semicircles(x,y+25,width,height,ctx,card);
        } else {
            errMsg("drawRect() if num 2");
        };
    } else if (card.number===3) {
        if (card.fill==="fill1") {
            solid(card,ctx);
            semicircles(x,y-50,width,height,ctx,card);
            semicircles(x,y,width,height,ctx,card);
            semicircles(x,y+50,width,height,ctx,card);
        } else if (card.fill==="fill2") {
            gradient(card,ctx);
            semicircles(x,y-50,width,height,ctx,card);
            semicircles(x,y,width,height,ctx,card);
            semicircles(x,y+50,width,height,ctx,card);
        } else if (card.fill==="fill3") {
            outline(card,ctx);
            semicircles(x,y-50,width,height,ctx,card);
            semicircles(x,y,width,height,ctx,card);
            semicircles(x,y+50,width,height,ctx,card);
        } else {
            errMsg("drawRect() if num 3");
        };
    } else {
        errMsg("drawRect() if num");
    };
};

var drawMe = function(card,id) {
    var canvas = document.getElementById(id);
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        if (card.shape==="shape1") {
            drawRectangle(card,id,ctx);
        } else if (card.shape==="shape2") {
            drawDiamond(card,id,ctx);
        } else if (card.shape==="shape3") {
            drawSemicircles(card,id,ctx);
        } else {
            errMsg("drawMe()");
        };
    };
};

var matchCount = 0;
//var matchesCount = "yes";
//var messages = ["Nice work!", "Good catch!", "Yes, sir. We have a match.", "Go ahead, Captain.", "Your match count has been increased.", "BLEEEEP.", "Match received.", "I'm just gonna put these cards in my box.", "STARFISH!", "Matchy McMatcherson. Yup.", "So many caaaards. Gotta match 'em all!"];
//console.log(messages.length);
//console.log(Math.floor(Math.random()*messages.length));

var drawEveryone = function() {
    for (var i = 0; i < table.length; i++) {
        drawMe(cards[table[i]],"table"+(i+1));
    };
    var canvas = document.getElementById("playerMatch");
    if (canvas.getContext) {
        var matchString = "Matches found: " + matchCount + ".";
        var ctx = canvas.getContext('2d');
        ctx.font = "1em Verdana";
        ctx.fillText(matchString, 10, 25, 180);
    };
/*    var canvas = document.getElementById("availableMatch");
    if (canvas.getContext) {
        var matchesString = "Available matches: " + matchesCount + "";
        var ctx = canvas.getContext('2d');
        ctx.font = "1m Verdana";
        ctx.fillText(matchesString, 10, 15, 380);
    };*/
/*    var canvas = document.getElementById("message");
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        ctx.font = ".8em Verdana";
        ctx.fillText(messages[Math.floor(Math.random()*messages.length)], 10, 15, 380);
    };*/
};

var resetEveryone = function() {
    toggleNoSelected();
    for (var i = 0; i < table.length+3; i++) {
        var canvas = document.getElementById("table"+(i+1));
        if (canvas.getContext) {
            var ctx = canvas.getContext('2d');
            // ctx.setTransform(0, 0, 0, 0, 0, 0);
            // makes some weird black rectangle; does not work as expected
            ctx.clearRect(0, 0, 100, 150); //(0, 0, canvas.width, canvas.height);
        };
    };
     var canvas = document.getElementById("playerMatch");
     if (canvas.getContext) {
         var ctx = canvas.getContext('2d');
         ctx.clearRect(0, 0, 200, 50);
    };
     var canvas = document.getElementById("availableMatch");
     if (canvas.getContext) {
         var ctx = canvas.getContext('2d');
         ctx.clearRect(0, 0, 400, 50);
    };
     var canvas = document.getElementById("message");
     if (canvas.getContext) {
         var ctx = canvas.getContext('2d');
         ctx.clearRect(0, 0, 400, 50);
    };
    hintCount=0;
    availableSets = [];
    availableSetsLocs = [];
    availableSetsHints = [];
    if (deck.length===0) {
        plyrMsg("Hey, there are no cards left in the deck! You've almost won!");
    };
};

var startNewGame = function() {
    alert("Hey! I just wanted to warn you that I haven't worked on making the right sort of stripey card that the original game has. When you see a card that looks darker, that's the the third shade. It's a gradient.");
    shuffleDeck();
    resetEveryone();
    drawEveryone();
    var button = document.getElementById("startNewGame");
        removeClass(button,"yes");
        addClass(button,"no");
    button = document.getElementById("set");
        removeClass(button,"no");
        addClass(button,"yes");
    button = document.getElementById("deselectAll");
        removeClass(button,"no");
        addClass(button,"yes");
    button = document.getElementById("hint");
        removeClass(button,"no");
        addClass(button,"yes");
};

var userSelectColors = function() {
    color1 = prompt("Test color1: ");
    color2 = prompt("Test color2: ");
    color3 = prompt("Test color3: ");
    resetEveryone();
    drawEveryone();
};

// NOW LET'S START INTERACTING WITH THE PLAYER! :)

var addClass = function(id, classToAdd) {
    var currentClassValue = id.className;
    if (currentClassValue.indexOf(classToAdd) == -1) {
        if ((currentClassValue == null) || (currentClassValue === "")) {
            id.className = classToAdd;
        } else {
            id.className += " " + classToAdd;
        }
    }
}
 
var removeClass = function(id, classToRemove) {
    var currentClassValue = id.className;
 
    if (currentClassValue == classToRemove) {
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
    if (player===true) {
        if (toggleMe.className === "playerSelected") {
            removeClass(toggleMe,"playerSelected");
            addClass(toggleMe,"notSelected");
        } else if (toggleMe.className === "notSelected") {
            removeClass(toggleMe,"notSelected");
            addClass(toggleMe,"playerSelected");
        } else {
            errMsg("toggle player");
        };
    } else if (player===false) {
        if (toggleMe.className === "compySelected") {
            removeClass(toggleMe,"compySelected");
            addClass(toggleMe,"notSelected");
        } else if (toggleMe.className === "notSelected") {
            removeClass(toggleMe,"notSelected");
            addClass(toggleMe,"compySelected");
        } else {
            errMsg("toggle !player/compy");
        };
    };
};

var toggleNoSelected = function() {
    for (var id=1; id<=table.length; id++) {
        var toggleMe = document.getElementById("table"+id);
        if (toggleMe.className === "playerSelected") {
            removeClass(toggleMe,"playerSelected");
        } else if (toggleMe.className === "compySelected") {
            removeClass(toggleMe,"compySelected");
        } else if (toggleMe.className==="hidden") {
            removeClass(toggleMe,"hidden");
        };
        addClass(toggleMe,"notSelected");
    };
    for (var id=18; id>table.length; id--) {
        var toggleMe = document.getElementById("table"+id);
        if (toggleMe.className != "hidden") {
            removeClass(toggleMe,"playerSelected");
            removeClass(toggleMe,"compySelected");
            removeClass(toggleMe,"notSelected");
            addClass(toggleMe,"hidden");
        } else {
            errMsg("toggleNoSelected toggle >deck.length hidden");
        };
    };
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

    if (cd1.color===cd2.color && cd2.color===cd3.color) {
        availableSetsHints.push("The colors in this set are all the same.");
        isFill(cd1,cd2,cd3,just,a,b,c);
    } else if (cd1.color!=cd2.color && cd2.color!=cd3.color && cd3.color!=cd1.color) {
        availableSetsHints.push("The colors in this set are all different.");
        isFill(cd1,cd2,cd3,just,a,b,c);
    } else if (just===false) {
        noSet("colors");
    } else if (just===true) {
        availableSetsHints = [];
    } else {
        errMsg("isSet");
    };
};

var isFill = function(cd1,cd2,cd3,just,a,b,c) {
    if (cd1.fill===cd2.fill && cd2.fill===cd3.fill) {
        availableSetsHints.push("The shadings in this set are all the same.");
        isShape(cd1,cd2,cd3,just,a,b,c);
    } else if (cd1.fill!=cd2.fill && cd2.fill!=cd3.fill && cd3.fill!=cd1.fill) {
        availableSetsHints.push("The shadings in this set are all different.");
        isShape(cd1,cd2,cd3,just,a,b,c);
    } else if (just===false) {
        noSet("fill");
    } else if (just===true) {
        availableSetsHints = [];
    } else {
        errMsg("isFill");
    };
};

var isShape = function(cd1,cd2,cd3,just,a,b,c) {
    if (cd1.shape===cd2.shape && cd2.shape===cd3.shape) {
        availableSetsHints.push("The shapes in this set are all the same.");
        isNumber(cd1,cd2,cd3,just,a,b,c);
    } else if (cd1.shape!=cd2.shape && cd2.shape!=cd3.shape && cd3.shape!=cd1.shape) {
        availableSetsHints.push("The shapes in this set are all different.");
        isNumber(cd1,cd2,cd3,just,a,b,c);
    } else if (just===false) {
        noSet("shapes");
    } else if (just===true) {
        availableSetsHints = [];
    } else {
        errMsg("isShape");
    };
};

var isNumber = function(cd1,cd2,cd3,just,a,b,c) {
    if (cd1.number===cd2.number && cd2.number===cd3.number) {
        availableSetsHints.push("The numbers of shapes in this set are all the same.");
        isFinal(cd1,cd2,cd3,just,a,b,c);
   } else if (cd1.number!=cd2.number && cd2.number!=cd3.number && cd3.number!=cd1.number) {
        availableSetsHints.push("The numbers of shapes in this set are all different.");
        isFinal(cd1,cd2,cd3,just,a,b,c);
    } else if (just===false) {
        noSet("number");
    } else if (just===true) {
        availableSetsHints = [];
    } else {
        errMsg("isNumber");
    };
};

var isFinal = function(cd1,cd2,cd3,just,a,b,c) {
    if (just===false) {
        yesSet();
    } else /*if (just===true)*/ { // whhhyyy doesn't this work as an if cond???
        yesAvailable(cd1,cd2,cd3,a,b,c);
//    } else {
//        console.log("Eroor! isFinal");
    };
};

var yesSet = function() {
    if (table.length<=12) {
        if (deck.length>0) {
            for (var i=maybeSet.length; i>0; --i) {
                table.splice(maybeSet[i-1].location,1,deck.shift());
            };
        } else if (deck.length===0) {
            for (var i=maybeSet.length; i>0; --i) {
                table.splice(maybeSet[i-1].location,1);
            };
        };
    } else if (table.length>12) {
        for (var i=maybeSet.length; i>0; --i) {
            table.splice(maybeSet[i-1].location,1);
        };
    } else {
        errMsg("yesSet");
    };
    matchCount++;
    resetEveryone();
    drawEveryone();
};

var availableSets = [];
var availableSetsLocs = [];
var availableSetsHints = [];

var yesAvailable = function(cd1,cd2,cd3,a,b,c) {
    availableSets.push([cd1,cd2,cd3]);
    availableSetsLocs.push(a,b,c);
};

var set = function() {
    for (var i = 0; i < table.length; ++i) {
        var j = document.getElementById("table"+(i+1));
        if (j.className === "playerSelected") {
            maybeSet.push({card:table[i], location:i});
            console.log("card:table[" + i + "], location: [" + i + "]");
        };
    };
    console.log("maybeSet.length:");
    console.log(maybeSet.length);
    console.log(maybeSet);
    if (maybeSet.length != 3) {
        plyrMsg("That doesn't look like three cards to me! A set must have three cards.");
        maybeSet = [];
    } else {
        var card1 = cards[maybeSet[0].card];
        var card2 = cards[maybeSet[1].card];
        var card3 = cards[maybeSet[2].card];
        isSet(card1,card2,card3);
        maybeSet = [];
    };
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
            errMsg("toggleHidden!");
        };
    };
};

var hintCount = 0;

var hint = function() {
    if (deck===0 && table===0) {
        plyrMsg("You need to start a game before I can give you hints!");
        return;
    };
    if (hintCount===0) {
        for (var i=0; i < table.length-3; i++) {
            for (var j=i+1; j < table.length; j++) {
                for (var k=j+1; k < table.length; k++) {
                    var card1 = cards[table[i]];
                    var card2 = cards[table[j]];
                    var card3 = cards[table[k]];
                    var a = i+1, b = j+1, c = k+1;
                    isSet(card1,card2,card3,true,a,b,c);
                    if (availableSets.length > 0) break;
                };
                if (availableSets.length > 0) break;
            };
            if (availableSets.length > 0) break;
        };
        if (availableSets.length === 0) {
            if (deck===0 && table>0) {
                plyrMsg("There are no sets remaining. You win the game!");
            } else {
                plyrMsg("There are no sets! I will add three cards to the table for you.");
                for (var i=3; i > 0; i--) {
                    table.push(deck.shift());
                };
                toggleHidden();
                resetEveryone();
                drawEveryone();
            };
        } else if (availableSets.length > 0) {
            var hint1 = Math.floor(Math.random()*availableSetsLocs.length);
            toggle("table"+availableSetsLocs[hint1],true);
            availableSetsLocs.splice(hint1,1);
            hintCount ++;
        } else {
            errMsg("hint() availableSets .length else");
        };
    } else if (hintCount===1) {
        if (availableSetsHints.length>0) {
            var hint2 = Math.floor(Math.random()*availableSetsHints.length);
            plyrMsg(availableSetsHints[hint2]);
            availableSetsHints.splice(hint2,1);
        } else if (availableSetsLocs.length>0) {
            var hint3 = Math.floor(Math.random()*availableSetsLocs.length);
            toggle("table"+availableSetsLocs[hint3],true);
            availableSetsLocs.splice(hint3,1);
        } else {            
            plyrMsg("Hey, I've already selected a set for you!");
        };
    };
};

// This has been a Dr. Vonn Jerry XLII Production.
