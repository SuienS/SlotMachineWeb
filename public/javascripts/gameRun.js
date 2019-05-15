//adding firebase realtime JSON based database
window.onload = hideGame;
var config = {
    apiKey: "AIzaSyAdfCkUPaQeusrSfMWnGKs2gU6Ww1MelMo",
    authDomain: "loginslotmachine.firebaseapp.com",
    databaseURL: "https://loginslotmachine.firebaseio.com",
    projectId: "loginslotmachine",
    storageBucket: "loginslotmachine.appspot.com",
    messagingSenderId: "631188158210"
};

var reel0Spinning;
var reel1Spinning;
var reel2Spinning;
var curCoin=10;
var curBet=0;
var playCountWin = 0;
var playCountLose = 0;
var creditsEarnCount = 0;
var totalEarnCount = 0;
var checkedWin = false;

//reel spinning pause speed
var speed=150;

var showAvg=0;

var indexArr = [0,1,2,3,4,5];
var values = [6,2,3,4,7,5];
var imageIndex0 = 0;
var imageIndex1 = 0;
var imageIndex2 = 0;

//timers
var timerR0;
var timerR1;
var timerR2;

//shuffling the array
var r0Arr=shuffle(indexArr);
var r1Arr=shuffle(indexArr);
var r2Arr=shuffle(indexArr);

//setting temp browser storage
sessionStorage.setItem('win',playCountWin);
sessionStorage.setItem('lose',playCountLose);


var stats;


//funtions for spinning reels
function runReel0() {
    reel0Spinning=true;
    var i;
    var reelImages = document.getElementsByClassName("reel0");
    for (i = 0; i < reelImages.length; i++) {
        reelImages[i].style.display = "none";
    }
    imageIndex0++;
    if (imageIndex0 > reelImages.length) {imageIndex0 = 1}

    reelImages[r0Arr[imageIndex0-1]].style.display = "block";
    timerR0 = setTimeout(runReel0, speed); // Change image every 2 seconds

}
//stoping function
function stopR0(){
    reel0Spinning=false;
    clearTimeout(timerR0);
    checkWin();
}

function runReel1() {
    reel1Spinning=true;
    var i;
    var reelImages = document.getElementsByClassName("reel1");
    for (i = 0; i < reelImages.length; i++) {
        reelImages[i].style.display = "none";
    }
    imageIndex1++;
    if (imageIndex1 > reelImages.length) {imageIndex1 = 1}

    reelImages[r1Arr[imageIndex1-1]].style.display = "block";
    timerR1 = setTimeout(runReel1, speed); // Change image every 2 seconds
}

function stopR1(){
    reel1Spinning=false;
    clearTimeout(timerR1);
    checkWin();
}
function runReel2() {
    reel2Spinning=true;
    var i;
    var reelImages = document.getElementsByClassName("reel2");
    for (i = 0; i < reelImages.length; i++) {
        reelImages[i].style.display = "none";
    }
    imageIndex2++;
    if (imageIndex2 > reelImages.length) {imageIndex2 = 1}

    reelImages[r2Arr[imageIndex2-1]].style.display = "block";
    timerR2 = setTimeout(runReel2, speed); // Change image every 2 seconds
}
function stopR2(){
    reel2Spinning=false;
    clearTimeout(timerR2);
    checkWin();
}

//executing all three reels at once
function execReel(){
    if(curBet!=0){
        if(!(reel0Spinning||reel1Spinning||reel2Spinning)){
            checkedWin=false;
            runReel0();
            runReel1();
            runReel2();
        }
    }else{
        alert("BET to play!!");
    }

}

//adding coin
function addCoin() {
    curCoin++;
    document.getElementById('lblcurCredit').innerHTML=curCoin.toString();

}

//betting method
function bet(betIn) {
    if(betIn==3 && curBet!=0){

    }else{
        if(curCoin>betIn){
            curCoin-=betIn;
            curBet+=betIn;
            document.getElementById('lblcurCredit').innerHTML=curCoin.toString();
            document.getElementById('lblcurBet').innerHTML=curBet.toString();
        }else{
            alert("Add more coins to bet more!!");
        }
    }


}


//setting up event listeners when page loads up
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("btn").addEventListener('click',login);
    document.getElementById("signOut").addEventListener('click',logout);
    document.getElementById('SPIN').addEventListener('click', execReel);
    document.getElementById('addC').addEventListener('click', addCoin);
    document.getElementById('betM').addEventListener('click', function() { bet(3) } );
    document.getElementById('bet').addEventListener('click', function() { bet(1) } );
    document.getElementById('statShow').addEventListener('click', statShow );

    var imgs0 = document.getElementsByClassName('reel0');
    var imgs1 = document.getElementsByClassName('reel1');
    var imgs2 = document.getElementsByClassName('reel2');
    for (var i = 0; i < imgs0.length; i++) {
        imgs0[i].addEventListener("click",stopR0);
        imgs1[i].addEventListener("click",stopR1);
        imgs2[i].addEventListener("click",stopR2);
    }
    document.getElementById("welcome").innerHTML="Welcome "+sessionStorage.getItem("playerName")+" to the game !!!";
});


//function for shuffling the reel image array indexes
function shuffle (arrayIN) {
    array=arrayIN.slice();
    var e1 = 0
    var e2 = 0
    var eT = null

    for (e1 = array.length - 1; e1 > 0; e1 -= 1) {
        e2 = Math.floor(Math.random() * (e1 + 1))
        eT = array[e1]
        array[e1] = array[e2]
        array[e2] = eT
    }
    return array;
}

//check for win
function checkWin() {
    if(!(reel0Spinning||reel1Spinning||reel2Spinning||checkedWin)){
        var winPrize=0;
        var won=false;
        checkedWin=true;
        if(r0Arr[imageIndex0-1]===r1Arr[imageIndex1-1]){
            winPrize = values[ r0Arr[imageIndex0-1] ]*curBet;
            won=true;
        }else if(r0Arr[imageIndex0-1]===r2Arr[imageIndex2-1]){
            winPrize = values[ r0Arr[imageIndex0-1] ]*curBet;
            won=true;
        }else if(r2Arr[imageIndex2-1]===r1Arr[imageIndex1-1]){
            winPrize = values[ r1Arr[imageIndex1-1] ]*curBet;
            won=true;
        }
        if(won){
            //won
            playCountWin++;
            creditsEarnCount+=winPrize;
            totalEarnCount+=winPrize;
            curCoin+=winPrize;
            curBet=0;
            document.getElementById('lblcurCredit').innerHTML=curCoin.toString();
            document.getElementById('lblcurBet').innerHTML=curBet.toString();
            wonAnim();
            calAvg();
            //writing to the database
            writeNewPost(sessionStorage.getItem('playerUid'),sessionStorage.getItem('playerName'),playCountWin,playCountLose,showAvg);
            alert("YOU WON "+winPrize+" credits!!!!");
        }else{
            //lost
            playCountLose++;
            creditsEarnCount-=curBet;
            calAvg();
            //writing to the database
            writeNewPost(sessionStorage.getItem('playerUid'),sessionStorage.getItem('playerName'),playCountWin,playCountLose,showAvg);
            alert("YOU LOOSE "+curBet+" credits!!!!");
            curBet=0;
            document.getElementById('lblcurCredit').innerHTML=curCoin.toString();
            document.getElementById('lblcurBet').innerHTML=curBet.toString();
        }
        var cUID = sessionStorage.getItem('playerUid');
        firebase.database().ref("players/"+cUID).once('value').then(function(snapshot) {
            var playerData={};
            var  i=0;
            snapshot.forEach(function(playerSnapshot) {
                playerData[i] = playerSnapshot.val().toString();
                i++;
            });
            //retrieving new data
            sessionStorage.setItem('win',parseFloat(playerData[4]));
            sessionStorage.setItem('lose',parseFloat(playerData[1]));
        });

    }

}

//winning animation
function wonAnim(){
    var wonDiv = document.getElementById("mainDiv");

    wonDiv.style.display = "block";
    setTimeout(function(){
        wonDiv.style.display = "none";
    }, 3000); // 3 seconds

}

//opening stat window
function statShow(){
    window.open("stats");

}



// Initializing Firebase login
firebase.initializeApp(config);
// Get a reference to the database service
var database = firebase.database();

//login
function login() {
    function newLogin(player) {
        if(player){
            play(player);
        }else{
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithRedirect(provider);
        }
    }
    //check for log state
    firebase.auth().onAuthStateChanged(newLogin);
}

function play(player) {
    sessionStorage.setItem('playerName', player.displayName);
    sessionStorage.setItem('playerUid', player.uid);
    document.getElementById("welcome").innerHTML="Welcome "+sessionStorage.getItem("playerName")+" to the game!!!";
    var cUID = sessionStorage.getItem('playerUid');
    firebase.database().ref("players/"+cUID).once('value').then(function(snapshot) {
        var playerData={};
        var  i=0;
        snapshot.forEach(function(playerSnapshot) {
            playerData[i] = playerSnapshot.val().toString();
            i++;
        });
        //checking wheather the user is new to game
        if(isNaN(playerData[4])){
            alert("Welcome our new player "+player.displayName);
            firebase.database().ref('players/' + player.uid).set({
                player: player.displayName,
                uid: player.uid,
                win: 0,
                lose: 0,
                avg: 0
            });
            sessionStorage.win=0;
            sessionStorage.lose=0;
            playCountWin=0;
            playCountLose=0;
            showAvg=0;
        }else{
            sessionStorage.win=parseFloat(playerData[4]);
            sessionStorage.lose=parseFloat(playerData[1]);
            playCountWin=sessionStorage.getItem('win');
            playCountLose=sessionStorage.getItem('lose');
            showAvg=parseFloat(playerData[0]);

        }
    });

    //hiding login page and showing game if login succeeded
    document.getElementById('signPage').style.display = "none";
    document.getElementById('load').style.display = "block";
    setTimeout(function () {
        document.getElementById('load').style.display = "none";
        document.getElementById('game').style.display = "block";
    },5000);

}

//logout
function logout() {
    sessionStorage.setItem('win',0);
    sessionStorage.setItem('lose',0);
    playCountWin=0;
    playCountLose=0;
    firebase.auth().signOut().then(function () {
        //signout successful
        alert("Successfully Signed out!")
    }).catch(function (error) {
        alert("ERROR!")
    });
}



//method for writing data to the database
function writeNewPost(uid, username, winCount,loseCount,avg) {
    var userId = firebase.auth().currentUser.uid;

    var postData = {
        player: username,
        uid: uid,
        win: parseFloat(winCount),
        lose: parseFloat(loseCount),
        avg: avg
    };
    var updates = {};
    //updating the fields
    updates['/players/' + uid] = postData;
    alert('Writing to Database...');
    return firebase.database().ref().update(updates);
}

//calculating the avg
function calAvg(){
    var sign = creditsEarnCount;
    var count = playCountWin*1+playCountLose;
    var avg = totalEarnCount/count;
    var show=0;
    if(parseFloat(sign)<0){
        show=parseFloat(-avg);
    }else{
        show=parseFloat(avg);
    }
    showAvg+=show;
    showAvg/=2;
    sessionStorage.setItem('showAvg',showAvg);
}
//showing login and hiding game
function hideGame() {
    document.getElementById('game').style.display = "none";
    document.getElementById('load').style.display = "none";
}
