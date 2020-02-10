$(document).ready(function(){
$.ajaxSetup({ cache: false });

var currentMainColor = "";
   
function setRandomColor() {  
  document.body.style.setProperty('background-color', currentMainColor );//set 
  $(".new-quote-button").css('background-color', currentMainColor );//set 
}
  
function getNewQuote() {
  $.getJSON("https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand&per_page=1", function(json) {
    var quote = json[0].content.rendered;
    var author =json[0].title.rendered;
    var twitterURL = "https://twitter.com/home/?status=" + author + "-" + quote;
   
    var quoteItem = $("#quote, #quote-icon1, #quote-icon2, #person-quoted");
    // $("#twitter-quote").attr("href", twitterURL);
    
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