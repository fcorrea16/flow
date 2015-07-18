

window.addEventListener('load', function() {

    // making building blocks draggable
    $(function() {
        $(".draggable-block").draggable({
            containment: "#builder-canvas",
            scroll: false,
            snap: true
        });
    })


    // creating building blocks on builder canvas as they click on buttons
    $('.building-block').on('click', function(event) {
        var $newBlock = $(this).clone().addClass('.draggable-block').draggable({
            containment: "#builder-canvas",
            scroll: false,
            snap: true,
            grid: [50, 50]
        }).appendTo('#builder-canvas').removeClass('building-block').removeClass('margin-right-10');

        $newBlock.find('p').attr('contenteditable', 'true').addClass('editable1')
        $newBlock.find('h4').attr('contenteditable', 'true').addClass('editable2')
        $newBlock.find('h3').attr('contenteditable', 'true').addClass('editable3')

    });


    // making block only draggable if it's not being edited
    $('#builder-canvas').on('mouseover', 'p', function(event) {
        $(this).parent().draggable('disable');
    });

    $('#builder-canvas').on('mouseout', 'p', function(event) {
        $(this).parent().draggable('enable');
    });


    $('#builder-canvas').on('mouseover', 'h4', function(event) {
        $(this).parent().draggable('disable');
    });

    $('#builder-canvas').on('mouseout', 'h4', function(event) {
        $(this).parent().draggable('enable');
    });


    $('#builder-canvas').on('mouseover', 'h3', function(event) {
    	console.log($(this).parents().find('start-question'))
        $(this).parent().parent().parent().draggable('disable');
    });

    $('#builder-canvas').on('mouseout', 'h3', function(event) {
        $(this).parent().parent().parent().draggable('enable');
    });


    // save functionality
    $('.save').on('click', function(event) {
        // what we'll send to the server.
        $('.delete-block').remove();
        $('#builder-canvas').children().removeClass('.draggable-block ui-draggable ui-draggable-handle');
        $('.boxes').children().attr('contenteditable', 'false').removeClass('editable2').removeClass('editable1')
        $('.container-canvas').find('h3').attr('contenteditable', 'false').removeClass('editable3')
        
        var $title = $('.chart-title').text()
        var $flowHthml = $('#builder-canvas').html()
        var chartInfo = { title: $title, content: $flowHthml };

        $.post( '/savechart', chartInfo , function(data) {
        });

        swal("Chart Saved")
        $('.confirm').on('click', function(event){
            window.location.href = "/charts"
        })
       
    })

    // delete blocks from DOM
    $('#builder-canvas').on('click', '.delete-block', function(event) {
        $(this).parent().remove()
    });

    // clearing canvas
    $('.clear-container').on('click', function(event) {
        swal({
            title: "Delete your canvas?",
            text: "You will not be able to recover it.",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#1AE68C",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: true
        }, function() {
             $('#builder-canvas').empty()
        });
    })


    var chartHTML = $.parseHTML($('.db-html').text())
    $('.load-chart').append(chartHTML)
}); // closing window load


