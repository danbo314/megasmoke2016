$(function () {

    Mousetrap.bind('ctrl+alt+h+o+f', function() {
        $("body").css({ cursor: "url('../img/hoff.cur'), auto" });
    });

    Mousetrap.bind(['enter', 'return'], function() {
        validateAndSubmit();
    });

    $('#wrapper').tubular({ videoId: "NQFyzCmrXis"/*'326AdM2SfAU'*/ });

    $("#play").click(function () {
        $(this).hide();
        $("#pause").show();
    });

    $("#pause").click(function () {
        $(this).hide();
        $("#play").show();
    });

    var isMute = true,
        src;

    $("#mute").click(function () {
        isMute = !isMute;

        if (isMute) {
            src = "../img/sound-off.svg";
        }
        else {
            src = "../img/sound-on.svg";
        }

        $(this).attr({ src: src });
    }).hover(function() {
        if (isMute) {
            src = "../img/sound-on.svg";
        }
        else {
            src = "../img/sound-off.svg";
        }

        $(this).attr({ src: src });
    }, function() {
        if (isMute) {
            src = "../img/sound-off.svg";
        }
        else {
            src = "../img/sound-on.svg";
        }

        $(this).attr({ src: src });
    });

    var panelVisible = true,
        left,
        height;

    $("#toggleShow").click(function () {
        if (panelVisible) {
            height = $("#regPanel").height();

            $("#regContent").fadeOut(function () {
                $("#toggleShow").css({ background: "none", width: "0px", height: "0px", padding: "0px" }).html("<img src='../img/list-circle.svg' title='Show Form' />");

                left = $("#regPanel").offset().left;

                $("#regPanel").css({ left: left+"px", right: "auto", height: "0px" }).animate({ left: 0 });
            });

            panelVisible = false;
        }
        else {
            $("#regPanel").animate({ width: "400px", left: left+"px" }, function() {
                $(this).css({ left: "auto", right: "2%" });
                $(this).animate({ height: height+"px" });
                $("#toggleShow").css({ background: "#dcb439", width: "150px", height: "26px", padding: "5px" }).html("Hide Form");
                $("#regContent").fadeIn();
            });

            panelVisible = true;
        }
    });

    $('form[name="suggestion"]').find("input[type='text'], textarea").focus(function () {
        $submitError.fadeOut();
        $(this).removeClass("success error");
    });
});
