window.addEventListener('load', function() {

    // making building blocks draggable
    $(function() {

        $(".draggable").draggable({
            helper: 'clone',
            cursor: 'move',
            revert: "valid",
        });

        $(".draggable-block").draggable({
            containment: "#builder-canvas",
            scroll: false,
            cursor: 'move',
            snap: '.draggable-block'
        });

        $(".droppable").droppable({
            accept: ".draggable",
            drop: handleDropEvent,
        });
    })

    // creating building blocks on builder canvas as they click on buttons
    function handleDropEvent(event, ui) {
        var draggable = ui.draggable;

        var windowWidth = $(window).width();
        var offsetXPos = parseInt(ui.offset.left);
        var offsetYPos = parseInt(ui.offset.top);

        var $newBlock = draggable.clone().appendTo('#builder-canvas').css({
            top: (parseInt(ui.offset.top) - 535),
            left: (parseInt(ui.offset.left) - ((0.22 * windowWidth) - 20)),
            position: 'absolute'
        }).removeClass('draggable').addClass('draggable-block').draggable({
            containment: "#builder-canvas",
            scroll: false,
            cursor: 'move',
            snap: '.draggable-block'
        }).removeClass('building-block').removeClass('margin-right-10');

        // console.log( offsetXPos + ", " + offsetYPos );
        $newBlock.find('p').attr('contenteditable', 'true').addClass('editable1')
        $newBlock.find('h4').attr('contenteditable', 'true').addClass('editable2')
        $newBlock.find('h3').attr('contenteditable', 'true').addClass('editable3')

    }


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
        $('.delete-block').addClass('hide');
        $('#builder-canvas').children().removeClass('.draggable-block ui-draggable ui-draggable-handle');
        $('.container-canvas').find('h4').attr('contenteditable', 'false').removeClass('editable2')
        $('.container-canvas').find('h3').attr('contenteditable', 'false').removeClass('editable3')
        $('.container-canvas').find('p').attr('contenteditable', 'false').removeClass('editable1')

        var $title = $('.chart-title').text()
        var $flowHthml = $('#builder-canvas').html()
        var chartInfo = {
            title: $title,
            content: $flowHthml
        };

        $.post('/savechart', chartInfo, function(data) {});

        swal("Chart Saved")
        $('.confirm').on('click', function(event) {
            window.location.href = "/charts"
        })

    })

    $('.save-edit').on('click', function(event) {
        // removing classes
        $('.delete-block').addClass('hide');
        $('#builder-canvas').children().removeClass('.draggable-block ui-draggable ui-draggable-handle');
        $('.container-canvas').find('h4').attr('contenteditable', 'false').removeClass('editable2');
        $('.container-canvas').find('h3').attr('contenteditable', 'false').removeClass('editable3');
        $('.container-canvas').find('p').attr('contenteditable', 'false').removeClass('editable1');
        $('.boxes').children().find('h3').attr('contenteditable', 'false').removeClass('editable3')

        // what we'll send to the server.
        var chart_id = window.location.pathname.split('/')[2];
        var $title = $('.chart-title').text()
        var $flowHthml = $('#builder-canvas').html()

        var chartInfo = {
            title: $title,
            content: $flowHthml
        };

        $.post('/savechart/' + chart_id, chartInfo, function(data) {});

        swal("Chart Saved")
        $('.confirm').on('click', function(event) {
            window.location.href = "/charts"
        })

    })


    // delete blocks from DOM
    $('#builder-canvas').on('click', '.delete-block', function(event) {
        $(this).parent().css({
            top: 1000,
            left: 1000,
            position: 'absolute',
        });

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


    // loading chart html into page
    var chartHTML = $.parseHTML($('.db-html').text())
    $('.load-chart').append(chartHTML)

    // all charts page, style when mouseover circle
    $('.chart-box').on('mouseover', function() {
        $(this).children().css('color', '#333')
    })

    $('.chart-box').on('mouseout', function() {
        $(this).children().css('color', 'white')
    })


}); // closing window load