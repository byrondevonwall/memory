//this project would not be possible in its' current form without a great amount of collaboration with Matt Everhart and Tori Hedden

$(document).ready(function(){
  "use strict";
  //global variables
  var boxAmt = 0
  //this function populates the game body with a user selected # of -=RANDOM=- cards, starts the timer, and adds lives
  $(".submit").on("click", function(){
    //hides submit ribbon aand shows reset button
    $(".header").hide();
    $(".ribbon").hide()
    $(".return-to-menu").show();
    //comparison clock needed for timer
    var start = new Date().getTime();
    //user input #of boxes, rounded for functionality
    boxAmt = 2 * Math.round(parseInt($(".boxNum").val())/2);
    //this section creates an array of the approriate length consisting of randomly selected icons
    var boxArrayCounter = boxAmt/2;
    var iconArray = [];
    for (var i = 0 ; i <= boxArrayCounter-1; i++) {
        iconArray[i] = iconChoices[Math.floor(Math.random()*(200-0+1))+0];
    }
    var newArray = $.merge([], iconArray);
    var finalArray = $.merge(newArray, iconArray);
    //this section shuffles that array so that placement is random in the document
    function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;
      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
      }
      return array;
    }
    shuffle(finalArray);
    //this section puts the shuffled array on the page
    for (var b = 1; b <= boxAmt; b++){
      $(".game-body").append("<span class='card'><i class='fa "+ finalArray[b-1] +" fa-4x'></i></span>")}
    //this section insures that the grid of cards is always a rectangle(no ragged bottom)(currently not working with media queries)
    if(boxAmt%6 === 0){
      $(".game-body").css({marginLeft : "15%", marginRight : "15%"});
    }
    else if(boxAmt%5 === 0){
      $(".game-body").css({marginLeft : "20%", marginRight : "20%"});
    }
    else if(boxAmt%4 === 0){
      $(".game-body").css({marginLeft : "28%", marginRight : "20%"});
    }

    // this section puts lives on the page.
      for (var l = 0; l<= boxAmt-1; l++){
        $(".lives").append("<i class='fa fa-heart'></i>");
      }
      console.log($(".lives i").last());

    //this section starts a timer when the game parameters are submitted.  With thanks to Andrew and Dennis
    setInterval(function() {
      var counter = Math.round((new Date().getTime() - start) / 1000);
      var hours = Math.floor(counter / 3600);
      counter = counter % 3600;
      var minutes = Math.floor(counter / 60);
      counter = counter % 60;
      var seconds = Math.floor(counter);
      if (seconds<10){
        seconds = "0" + seconds;
      }
      if (minutes<10){
        minutes = "0" + minutes;
      }
      if (hours<10){
        hours = "0" + hours;
      }
      var timer = hours + ":" + minutes + ":" + seconds;
      $('.timer').text(timer);
  }, 1000);

  });

  //this function provides matching functionality and tracks/removes lives
    var cards = []
    var count = 0
    var clickDisabled = false;

    $(".game-body").on("click", ".card", function(){
      //this counts clicks and sets a click timeout to discourage cheating while items match
      if (clickDisabled){
        return;
      }
      count += 1;
      //this section flips cards
      $(this).addClass("fliparoo");
      $(this).children().addClass("game-icon");
      //this section tracks card icon class info on each click and pushes those classes to an array
      function trackCards(input){
        cards.push(input);
      }
      trackCards($(this).children().prop('outerHTML'));
      //this section compares the currently clicked card and the previously clicked card based upon the placement of their class value in the array 'cards'
       var card1Counter = cards.length-1;
       var card2Counter = cards.length-2;
      //this section removes flipped status if the two cards flipped don't match
       if(count%2 === 0 && cards[card1Counter] != cards[card2Counter]){
         clickDisabled = true;
         setTimeout(function(){
           clickDisabled = false;
           $(".game-body").find(".fliparoo").removeClass("fliparoo");
           $(".game-body").find(".game-icon").removeClass("game-icon");
           $(".lives i").last().remove();
           $(".lost-lives").append("<i class='fa fa-heart-o'></i>");

         }, 1500);
       }
       //this section adds matched status and removes flipped status if the two flipped cards match
       else if(count%2 === 0 && cards[card1Counter] === cards[card2Counter]){
         clickDisabled = true;
        setTimeout(function(){
          clickDisabled = false;
         $(".game-body").find(".fliparoo").addClass("match-card");
         $(".game-body").find(".game-icon").addClass("match-icon");
         $(".game-body").find(".fliparoo").removeClass("fliparoo");
         $(".game-body").find(".game-icon").removeClass("game-icon");

       }, 200);
       }
      //  var lifeCount = $(".lives i").length;
      //  var matchCount = $(".game-body").find(".match-card").length;

       else if($(".lives i").length === 0 || $(".game-body").find(".match-card").length === boxAmt){
         $('.modal-container').addClass('showing');
         $(".timer").remove();
         $(".timer-finished").show();
       }

    });

    $(".return-to-menu").on("click", function(){
      location.reload();
    })

    $(".refresh-page").on("click", function(){
      location.reload();
    });

    $('.modal-close, .modal-container').on('click', function () {
      $('.modal-container').removeClass('showing');
    });

    $('.modal').click(function (e) {
      e.stopPropagation();
    });




  //this is a list of icons
  var iconChoices = ["fa-glass", "fa-music", "fa-arrow-circle-o-down", "fa-search", "fa-envelope-o", "fa-heart", "fa-star", "fa-user", "fa-film", "fa-th", "fa-search-plus", "fa-search-minus", "fa-power-off", "fa-signal", "fa-gear", "fa-trash-o", "fa-home", "fa-file-o", "fa-clock-o", "fa-volume-off", "fa-arrow-circle-o-down", "fa-play-circle-o", "fa-refresh", "fa-list-alt", "fa-lock", "fa-flag", "fa-headphones",  "fa-volume-off", "fa-qrcode", "fa-barcode", "fa-tag", "fa-book", "fa-bookmark", "fa-print", "fa-camera", "fa-font", "fa-bold", "fa-italic", "fa-text-height", "fa-text-width", "fa-align-left", "fa-align-center", "fa-align-right", "fa-align-justify", "fa-list", "fa-dedent", "fa-indent", "fa-video-camera", "fa-photo", "fa-pencil", "fa-map-marker", "fa-adjust", "fa-tint", "fa-edit", "fa-share-square-o", "fa-check-square-o", "  fa-arrows", "fa-step-backward", "fa-fast-backward", "fa-backward", "fa-play", "fa-pause", "fa-stop", "fa-forward", "fa-fast-forward", "fa-step-forward", "fa-eject", "fa-chevron-left", "fa-chevron-right", "fa-plus-circle", "fa-minus-circle", "fa-times-circle", "fa-check-circle", "fa-question-circle", "fa-info-circle", "fa-crosshairs", "fa-times-circle-o", "fa-check-circle-o", "fa-ban", "fa-arrow-left", "fa-arrow-right", "fa-arrow-up", "fa-arrow-down", "fa-mail-forward", "fa-expand", "fa-compress", "fa-plus", "fa-minus", "fa-asterisk", "fa-exclamation-circle", "fa-gift", "fa-leaf", "fa-fire", "fa-eye", "fa-eye-slash", "fa-warning", "fa-plane", "fa-calendar", "fa-random", "fa-comment", "fa-magnet", "fa-chevron-up", "fa-chevron-down", "fa-retweet", "fa-shopping-cart", "fa-folder", "fa-folder-open", "fa-arrows-v", "fa-arrows-h", "fa-bar-chart-o", "fa-twitter-square",  "fa-facebook-square", "fa-camera-retro", "fa-key", "fa-comments", "fa-thumbs-o-up", "fa-thumbs-o-down", "fa-star-half", "fa-heart-o", "fa-sign-out", "fa-linkedin-square", "fa-thumb-tack", "fa-external-link", "fa-sign-in", "fa-trophy", "fa-github-square", "fa-upload", "fa-lemon-o", "fa-phone", "fa-square-o", "fa-bookmark-o", "fa-phone-square", "fa-twitter", "fa-facebook-f", "fa-unlock", "fa-credit-card", "fa-feed", "fa-hdd-o", "fa-bullhorn", "fa-bell", "fa-certificate", "fa-hand-o-right", "fa-hand-o-left", "fa-hand-o-up", "fa-hand-o-down", "fa-arrow-circle-left", "fa-arrow-circle-right", "fa-arrow-circle-up", "fa-arrow-circle-down", "fa-globe", "fa-wrench", "fa-tasks", "fa-filter", "fa-briefcase", "fa-arrows-alt", "fa-group", "fa-chain", "fa-cloud", "fa-flask", "fa-cut", "fa-copy", "fa-paperclip", "fa-save", "fa-square", "fa-navicon", "fa-list-ul", "fa-list-ol", "fa-strikethrough", "fa-underline", "fa-table", "fa-magic", "fa-truck", "fa-pinterest", "fa-pinterest-square", "fa-google-plus-square", "fa-money", "fa-caret-down", "fa-caret-up", "fa-caret-left", "fa-caret-right", "fa-columns", "fa-unsorted", "fa-sort-down", "fa-sort-up", "fa-legal", "fa-dashboard", "fa-flash", "fa-sitemap", "fa-umbrella", "fa-paste", "fa-lightbulb-o", "fa-exchange", "fa-cloud-download", "fa-cloud-upload", "fa-user-md", "fa-stethoscope", "fa-suitcase", "fa-bell-o", "fa-coffee", "fa-cutlery"]

});//close js




//theoretical and non-working hard/easy mode implementation
//  console.log(cards)
//this section counts and subtracts lives and is experimental
// var lives = [];
// function countLives(input){
//   lives.push(input);
// }
// var livesCounter = $(".match-card").length;
// countLives(livesCounter);
// console.log(lives);
