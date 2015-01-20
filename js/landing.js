$(function() {
    $.stellar({
        horizontalScrolling: false,
        verticalOffset: 40
    });

    Mousetrap.bind('ctrl+alt+h+o+f', function() {
        $("body").css({ cursor: "url('../img/hoff.cur'), auto" });
    });

    $(".pimg:not(#fourBG)").height($(window).height());
    $("#fourBG").height($(window).height()-100);

    $(window).resize(function () {
        $(".pimg:not(#fourBG)").height($(window).height());
        $("#fourBG").height($(window).height()-100);
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
