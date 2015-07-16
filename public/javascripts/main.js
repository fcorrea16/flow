
window.addEventListener('load', function(){

	$(function() {
	  $(".draggable-block").draggable({
	    containment: "#builder-canvas", 
			scroll: false,
			snap: true
	  });
	})


	$('.building-block').on('click', function(event){
		var $newBlock = $(this).clone().addClass('.draggable-block').draggable({ containment: "#builder-canvas", scroll: false, snap: true, grid: [50, 50]}).appendTo('#builder-canvas').removeClass('building-block').removeClass('margin-right-10');
		
		if ($newBlock.hasClass('question')){
			console.log($newBlock.find('p'))
			$newBlock.find('p').attr('contenteditable', 'true').addClass('editable1')
		}

		 if ($newBlock.hasClass('answer')){
			$newBlock.find('h4').attr('contenteditable', 'true').addClass('editable2')
		}

		if ($newBlock.hasClass('start-question')){
			$newBlock.find('h3').attr('contenteditable', 'true').addClass('editable3')
		}
	});


 	$('#builder-canvas').on('mouseover', 'p', function(event){
 		$(this).parent().draggable('disable');
	});

	 $('#builder-canvas').on('mouseout', 'p', function(event){
 		$(this).parent().draggable('enable');
	});

 	$('#builder-canvas').on('mouseover', 'h4', function(event){
 		$(this).parent().draggable('disable');
	});

	 $('#builder-canvas').on('mouseout', 'h4', function(event){
 		$(this).parent().draggable('enable');
	});

 	$('#builder-canvas').on('mouseover', 'h3', function(event){
 		$(this).parent().parent().draggable('disable');
	});

	 $('#builder-canvas').on('mouseout', 'h3', function(event){
 		$(this).parent().parent().draggable('enable');
	});


 
 $('.save').on('click', function(event){
 		// probably what we'll send to the server.
 		var flowHthml = $('#builder-canvas').html()
 		console.log(flowHthml)
 })


  $('.clear-container').on('click', function(event){
	 	window.alert("Are you sure you want to delete your canvas?")
 		$('#builder-canvas').empty()

 })








});




	// $('#builder-canvas').on('click', '.hort-yes', function(event){
	//  	console.log('clicking on hort-yes')

	//  })

	// $('#builder-canvas').on('click', '.hort-no', function(event){
	//  	console.log('clicking on hort-no')

	//  })

	// $('#builder-canvas').on('click', '.vert-yes', function(event){
	//  	console.log('clicking on vert-yes')

	//  })

	// $('#builder-canvas').on('click', '.vert-no', function(event){
	//  	console.log('clicking on vert-no')

	//  })




	// $('#builder-canvas').on('dblclick', '.question p', function(event){
	//  	console.log('clicking on question')
	//  	console.log($(this).text())
	//  	console.log($(this).parent().find('.question-form'))
	// 	$(this).hide();
	// 	var $question = $(this).text();
	// 	$(this).parent().find('.question-form').val($question);
	// 	$(this).parent().find('.question-form').show();
	 	


	//  })


	// $('#builder-canvas').on('click', '.start-question', function(event){
	//  	console.log('clicking on start question')
	//  	console.log($(this).find('text').text())
	//  	$(this).find('text').text("clicked")

	//  })



	// $('#builder-canvas').on('click', '.answer', function(event){
	//  	console.log('clicking on answer')

	//  })

 