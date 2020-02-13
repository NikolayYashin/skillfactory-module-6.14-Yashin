const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;
let oldTarget = "";

function round() {
  $(oldTarget).removeClass("target");
  $(oldTarget).text("");
  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  console.log(hits)
  console.log(divSelector)  
  oldTarget = divSelector;

  $(divSelector).text(hits + 1);


  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {

  $("div.row").remove()

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);

  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  // FIXME: убирать текст со старых таргетов. Кажется есть .text?
  if ($(event.target).hasClass("target")) {
    hits = hits + 1; 
    round();

  }
  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
}

$("#button-start").click(function() {
    init();
    round();
    firstHitTime = getTimestamp()
    console.log(firstHitTime) 
    $("div.startbutton").remove()      
  });

function init() {

  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    location.reload();
  });
}

$(document).ready(init);
