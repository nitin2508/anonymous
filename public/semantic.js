$("#signUp").click(function() {
    $('.ui.small.modal')
        .modal('show');
});
$('.ui.sticky')
    .sticky();
$(window).trigger('scroll');
$(window).bind('scroll', function() {
    var pixels = 600; //number of pixels before modifying styles
    if ($(window).scrollTop() > pixels) {
        $('#header').addClass('scroll');
    } else {
        $('#header').removeClass('scroll');
    }
});
