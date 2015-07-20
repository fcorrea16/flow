$(window).on('load', function(){

	$('.btn-edit').on('click', openEditBox);
	$('.btn-update').on('click', updateProfile);

})

var openEditBox = function(event){
	event.preventDefault();
	$(this).parents().find($('.container')).find($('.profile-box-edit')).show()
	$(this).parent().hide()
}

