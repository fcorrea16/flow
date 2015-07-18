
window.addEventListener('load', function() {

function animateHamburger(e) {
  // toggles the open class on the hamburger when clicked
  $('#hamburger-button').children().first().toggleClass('rotate2')

  $('#hamburger-button').children().first().next().toggleClass('hidden')
  
	$('#hamburger-button').children().last().toggleClass('rotate1')
  // $(e.target).addClass("rotate")

}


function mouseoverAnimation() {
  console.log($(this).children())
  console.log("hi")
  $(this).children().addClass("mouseover")
}

function mouseoutAnimation() {
  console.log($(this).children())
  $(this).children().removeClass("mouseover")
}



$('#hamburger-button').on("click", animateHamburger)
$('#hamburger-button').on("mouseover", mouseoverAnimation)
$('#hamburger-button').on("mouseout", mouseoutAnimation)

});