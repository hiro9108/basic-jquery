function updateOutput(){
    $('iframe').contents().find('html').html(`
        <html>
        <head>
        <style type="text/css">
        ${$('#cssPanel').val()}
        </style>
        </head>
        <body>
        ${$('#htmlPanel').val()}
        </body>
        </html>
    `)

    document.getElementById('outputPanel').contentWindow.eval($('#javascriptPanel').val())
}

//the following methods is invoked by different events by the buttons
$('.toggleButton').on('mouseenter', function(){

    $(this).addClass('highlightedButton')

}).on('mouseleave', function(){

    $(this).removeClass('highlightedButton')

}).on('click', function(){

    $(this).toggleClass('active')
    $(this).removeClass('highlightedButton')

    //get the id of the button that was clicked
    let panelId = $(this).attr('id') + 'Panel'
    //select the class of the selected panel
    $('#' + panelId).toggleClass('hidden')

    //count the number of elements with a certain class
    //count the number that are hidden
    let numberOfActivePanels = 4 - $('.hidden').length
    $('.panel').width($(window).width() / numberOfActivePanels - 10)
})

//=====================================================================
// The code below will be evaluated first when page loads/renders
//=====================================================================

//subtracts the window's height with the header's height and apply to the panel's height
$('.panel').height($(window).height() - $('#header').height() - 15)

//evenly split the panels' width into 2
$('.panel').width($(window).width() / 2)

//this is what will be displayed on the output when the page first renders
updateOutput()

//iframe contents wont update immediately without this code
$('textarea').on('change keyup paste', function(){
    updateOutput()
})