$(function() {
    $.stellar({
        horizontalScrolling: false,
        verticalOffset: 40
    });

    Mousetrap.bind('ctrl+alt+h+o+f', function() {
        $("body").css({ cursor: "url('../img/hoff.cur'), auto" });
    });

    $(".pimg").height($(window).height());

    $(window).resize(function () {
        $(".pimg").height($(window).height());
    });

    var oldT;

    $("#guestList").hover(function () {
        oldT = $(this).text();
        $(this).text("Coming Soon");
    },
    function () {
        $(this).text(oldT);
    });
});
