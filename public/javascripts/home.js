window.addEventListener('load', function() {

	$('.main-image-home img').css('margin-top', '0px').css('opacity', 1);

	$(document).on("scroll", function(e){
		var scrolled = $(window).scrollTop();
		
		console.log("scrolled" + scrolled + "pixels")

		if (scrolled > 250) {
			$('.main-image-home img').css('margin-top', '-50px').css('opacity', 0)

		} else {
			$('.main-image-home img').css('margin-top', '0px').css('opacity', 1);
		}
	})


})
