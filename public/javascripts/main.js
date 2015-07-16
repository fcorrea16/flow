
window.addEventListener('load', function(){
 $(function() {
	  $(".draggable").draggable({
	    snap: true
	  });

	  $(".draggable-grid").draggable({
	    grid: [50, 50]
	  });
	});


 $('.building-block').on('click', function(event){
 	$(this).clone().addClass('draggable draggable-grid').draggable({snap: true, grid: [50, 50]}).appendTo('#snaptarget');
 })

 var snapTargetToJson = function(){
 	 	var blocks = $('#snaptarget').find('.building-block').map(function(index, node){
 	 		var $node = $(node);
 	 		return {
 	 			positon: $node.position(), 
 	 			text: $node.text(), 
 	 			classList: $node.attr('class') 
 	 		}
 	 	});
 	 	return blocks.toArray();
 }

 $('.save').on('click', function(event){
 	// probably what we'll send to the server.
 	blocks = snapTargetToJson()
 })

// what we'll probably get back from the server
	dummyData = JSON.stringify([{"positon":{"top":557,"left":31},"text":"\n      This is the answer box\n    ","classList":"building-block answer boxes f-left click-cursor draggable draggable-grid ui-draggable ui-draggable-handle"},{"positon":{"top":557,"left":151},"text":"\n      \n        \n          \n          \n          YES\n        \n      \n    ","classList":"building-block hort-yes f-left click-cursor  draggable draggable-grid ui-draggable ui-draggable-handle"}])
})

var buildBlocks = function(data){
	// recreate the blocks
}


