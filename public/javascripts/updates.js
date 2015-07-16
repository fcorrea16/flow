$(window).on('load', function(){

	$('.btn-edit').on('click', openEditBox);
	$('.btn-update').on('click', updateProfile);


})

var openEditBox = function(event){
	event.preventDefault();
	$(this).parents().find($('.container')).find($('.profile-box-edit')).show()
	$(this).parent().hide()
}

var updateProfile = function(event){


}	







// event.preventDefault();
	// console.log($(this).parent().serialize())
	// $.ajax({
	// 	context: this,
	// 	url: $(this).parent().attr('action'),
	// 	type: 'post',
	// 	data: $(this).parent().serialize()
	// }).done(function(){
	// 	console.log('updating')

	// })