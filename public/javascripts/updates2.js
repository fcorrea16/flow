$(window).on('load', function() {

    var chartHTML = $.parseHTML($('.db-html-edit').text())
    $('#builder-canvas').append(chartHTML)
    $('#builder-canvas').children().addClass('draggable-block ui-draggable ui-draggable-handle').draggable({
        containment: "#builder-canvas",
        scroll: false,
        snap: true
    })
    
    $('.delete-block').removeClass('hide');
    
    $('#container-canvas').find('h4').attr('contenteditable', 'true').addClass('editable2');
    $('#container-canvas').find('h3').attr('contenteditable', 'true').addClass('editable3');
    $('#container-canvas').find('p').attr('contenteditable', 'true').addClass('editable1');
})