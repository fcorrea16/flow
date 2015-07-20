$(window).on('load', function(){

	$('.btn-edit').on('click', openEditBox);
	// $('.db-html-edit').on('load', appendToBuilder)


	// var appendToBuilder = function(event) {
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


})

var openEditBox = function(event){
	event.preventDefault();
	$(this).parents().find($('.container')).find($('.profile-box-edit')).show()
	$(this).parent().hide()
}

// var appendToBuilder = function(event) {
// 	var chartHTML = $.parseHTML($('.db-html').text())
// 	console.log("appending.....")
// 	$('#builder-canvas').append(chartHTML)
// 	$('#builder-canvas').children().addClass('.draggable-block ui-draggable ui-draggable-handle');
// 	$('.boxes').children().attr('contenteditable', 'true').addClass('editable2').addClass('editable1')
// 	$('.container-canvas').find('h3').attr('contenteditable', 'true').addClass('editable3')
// }

 // ('.delete-block').remove();

