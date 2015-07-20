$(window).on('load', function(){

	$('.btn-edit').on('click', openEditBox);
	// $('.db-html-edit').on('load', appendToBuilder)

	$('.btn-copy-code').on('click', copyToClipboard);

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

	// $("#link").click(function(){
	//   var holdtext = $("#clipboard").innerText;
	//   Copied = holdtext.createTextRange();
	//   Copied.execCommand("Copy");
	// });

})

var openEditBox = function(event){
	event.preventDefault();
	$(this).parents().find($('.container')).find($('.profile-box-edit')).show()
	$(this).parent().hide()
}

var copyToClipboard = function(){
	var htmlTextCopy = ($('.db-html')).text();
	console.log(htmlTextCopy)
// htmlTextCopy.select();
// document.execCommand('copy')

}

