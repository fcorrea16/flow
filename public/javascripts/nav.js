
window.addEventListener('load', function() {

  $('#hamburger-button').on("mouseover", expandPatties);
  $('#hamburger-button').on("mouseout", retractPatties);
  $('#hamburger-button').on("click", showMenu);
  $('#hamburger-button').on("click", animatePatties)



});

var expandPatties = function(){
  $(this).children().addClass("mouseover")
}

var retractPatties = function(){
  $(this).children().removeClass("mouseover")
}

var animatePatties = function(){
  $('#hamburger-button span:first-child').toggleClass('rotate1');
  $('#hamburger-button span:last-child').toggleClass('rotate2')
  $('#hamburger-button span:nth-child(2)').toggleClass('patty-hidden')

}

var showMenu = function(){
  $(this).parents().find($('#menu-wrapper')).toggleClass('menu-top');
  if ($('#menu').css('margin-top') === '50px') {
    $('#menu').css('margin-top', '110px');
    $('#menu').css('opacity', '1')
  } else {
    $('#menu').css('margin-top', '50px')
    $('#menu').css('opacity', '0')
  }

}

