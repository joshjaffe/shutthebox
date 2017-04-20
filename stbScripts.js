// global variables initiated
var rand, rand2, total, selectCount=0, player=1, games=0, previousTotal;

//making new arrays to hold total tile value and score of leftover tiles
tileTotal = new Array();
currentTiles = new Array(1,2,3,4,5,6,7,8,9);
//this function will keep track of what tiles have been selected 
// and only allow user to select correct total based on dice
    
function select(obj) {

    //add this to the first action inside select() function
// exit this function if the tempTotal is already equal to dice total
    if (tempTotal==total ||  total==0){
        // unless the total is the previous total
        if (previousTotal==total){
        }
        else {
            alert("You need to roll the dice.");
            return;
        }
    } 

    // sum current tiles
    var tempTotal=0;
    var img = document.getElementById(obj);
    tileTotal[selectCount]=obj;
    for (var i=0; i<tileTotal.length; i++) {
        tempTotal += tileTotal[i];
    }

    if (tempTotal<total) {
        img.style.visibility="hidden";

        //change the array holding current tiles
        // to input a zero for the original value
        currentTiles.splice(obj-1,1,0);
        
        //increase selectCount which tracks how many tiles are selected
        selectCount ++;
    }


     else if (tempTotal==total) {
        //show roll button in leftside div.
        document.getElementById("leftside").style.visibility="visible";
        img.style.visibility="hidden";

        //change the array holding current tiles
        // to input a zero for the original value
        currentTiles.splice(obj-1,1,0);

        //make our temporary tileTotal back to empty and reset selectCount to zero.  tileTotal = Array();
        selectCount=0;

        $("#dicestart1").toggleClass("spin");
        $("#dicestart2").toggleClass("spinLong");

    }




    else    {alert(tempTotal+" is a total beyond your roll.")}
    getScore();

}  //close select


    // get the current score, make sure we add 'score' to var list at top!
    function getScore() {
        score=0;
    
    //loops through array and adds each element
    for (var i = 0; i < currentTiles.length; i++) {
        score += currentTiles[i];
    };

    //place the score in a paragraph with jquery command
    $("#score1").text(score);
}

           



//rolling the dice
function roll(){
    previousTotal = total;
    // randomly choose dice
    tileTotal = new Array();
    selectCount=0;
    rand = Math.floor((Math.random() * 6) + 1);
    rand2 = Math.floor((Math.random() * 6) + 1);
    
    //img = document.getElementById("die1")
    path='images/dice/'+rand+'.PNG';
    path2='images/dice/'+rand2+'.PNG';
    document.images["dicestart1"].src = path;
    document.images["dicestart2"].src = path2;
    
        $("#dicestart1").toggleClass("spin");
        $("#dicestart2").toggleClass("spinLong");

    //get new totals of dice
    total = rand+rand2;
    console.log(total, path, path2);

    $("#leftside").hide();
    $("#reset").show();
    $("#endBtn").show();

}
         

         //reset tiles and clear array
function reset(){
    for (var i = 0; i < tileTotal.length; i++) {
        c=tileTotal[i];
        document.getElementById(c).style.visibility="visible";
        currentTiles.splice(c-1,1,c);
    };
    tileTotal = Array();
    selectCount=0;
    getScore();
};


//player scores will be kept in scoreboard div using new arrays
allScoresP1 = new Array();
allScoresP2 = new Array();
function endGame () {
    //put score in games paragraph depending on player 0 or 1
    //add player to var list at top set to 1 to start
    if (player==1){
        games ++;
        allScoresP1[games-1]=score;
        $("#p1Games").text(allScoresP1);
        player=2;
    }
    else {
        allScoresP2[games-1]=score;
        $("#p2Games").text(allScoresP2);
        player=1;
    }
        
    // hid the reset button and end button and show all tiles
    $("#reset").hide();
    $("#endBtn").hide();
    currentTiles = Array(1,2,3,4,5,6,7,8,9);

    for (var i = 0; i < currentTiles.length; i++) {
        c=currentTiles[i];
        document.getElementById(c).style.visibility="visible";
    }

    //reset temporary tile total array and show roll button div
    tileTotal = Array();
    document.getElementById("leftside").style.visibility="visible";

    //I suggest to reset total to 0 and score to 45

    // as well as the dice images and #score text for new player

    reset();

}  // end of endGame()
