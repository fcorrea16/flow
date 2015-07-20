$(window).on('load', function(){

	var chartHTML = $.parseHTML($('.db-html-edit').text())
		// console.log("appending.....")
		$('#builder-canvas').append(chartHTML)
		$('#builder-canvas').children().addClass('draggable-block ui-draggable ui-draggable-handle').draggable({
	            containment: "#builder-canvas",
	            scroll: false,
	            snap: true
	          })
		$('.boxes').children().attr('contenteditable', 'true').addClass('editable2').addClass('editable1')
		$('.container-canvas').find('h3').attr('contenteditable', 'true').addClass('editable3')

}