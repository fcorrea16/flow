$(window).on('load', function(){

	$('.btn-edit').on('click', openEditBox);
	
	$('.btn-copy-code').on('click', copyToClipboard);

	$('.load-chart').children().removeClass('.draggable-block ui-draggable ui-draggable-handle');

  $('.load-chart').find('p').attr('contenteditable', 'false').removeClass('editable1')
  $('.load-chart').find('h4').attr('contenteditable', 'false').removeClass('editable2')
  $('.load-chart').find('h3').attr('contenteditable', 'false').removeClass('editable3')

  
})

var openEditBox = function(event){
	event.preventDefault();
	$(this).parents().find($('.container')).find($('.profile-box-edit')).show()
	$(this).parent().hide()
}

var copyToClipboard = function(){
	var htmlTextCopy = ($('.db-html')).text();
	console.log(htmlTextCopy)

}

