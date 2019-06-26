$(document).ready(function(){
$.ajaxSetup({ cache: false });

var currentMainColor = "";
   
function setRandomColor() {  
  document.body.style.setProperty('background-color', currentMainColor );//set 
  $(".new-quote-button").css('background-color', currentMainColor );//set 
}
  
function getNewQuote() {
  $.getJSON("https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=", function(json) {
    var quote = $( json[0].content ).text();
    var author =json[0].title;
    var twitterURL = "https://twitter.com/home/?status=" + author + "-" + quote;
   
    var quoteItem = $("#quote, #quote-icon, #person-quoted");
    $("#twitter-quote").attr("href", twitterURL);
    
    quoteItem.fadeOut(500, function() {
      $("#quote").html(quote);
      $("#person-quoted").html("- " + author);
      quoteItem.css('color', currentMainColor );
      quoteItem.fadeIn(500);
    });
  });  
}

function generateRandomColor() {
  var r = Math.floor(Math.random()*255);  
  var g = Math.floor(Math.random()*255);  
  var b = Math.floor(Math.random()*255);
  var strColor = "rgb(" + r + "," + g  + "," + b + ")";
  currentMainColor = strColor;  
}  
  
$("#new-quote").on("click", generateRandomColor);
$("#new-quote").on("click", setRandomColor);
$("#new-quote").on("click", getNewQuote);
  
generateRandomColor();
setRandomColor();
getNewQuote();
});