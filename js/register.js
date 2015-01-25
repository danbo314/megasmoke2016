$(function () {

    Mousetrap.bind('ctrl+alt+h+o+f', function() {
        $("body").css({ cursor: "url('../img/hoff.cur'), auto" });
    });

    Mousetrap.bind(['enter', 'return'], function() {
        validateAndRegister();
    });

    $('#wrapper').tubular({ videoId: 'NQFyzCmrXis', mute: false });

    $("#play").click(function () {
        $(this).hide();
        $("#pause").show();
    });

    $("#pause").click(function () {
        $(this).hide();
        $("#play").show();
    });

    var isMute = false,
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

                $("#regPanel").css({ left: left+"px", right: "auto", margin: "auto" }).animate({ left: 0 });
            });

            panelVisible = false;
        }
        else {
            $("#regPanel").animate({ width: "400px", left: left+"px" }, function() {
                $(this).css({ left: 0, right: 0, margin: "0 auto 0 auto" });
                $(this).animate({ height: height+"px" });
                $("#toggleShow").css({ background: "#dcb439", width: "150px", height: "26px", padding: "5px" }).html("Hide Form");
                $("#regContent").fadeIn();
            });

            panelVisible = true;
        }
    });

    $form.find("input[type='text']").focus(function () {
        $submitError.fadeOut();
        $(this).removeClass("success error");
    });

    var keyupHandler = function(target, validFunc, $statusNode, validText, invalidText) {
            var $self = $(target),
                currText = $self.val();

            if (currText.length > 0) {
                if (validFunc(currText)) {
                    $statusNode.text(validText).removeClass("invalid").addClass("valid");
                }
                else {
                    $statusNode.text(invalidText).removeClass("valid").addClass("invalid");
                }

                $self.css({ "border-radius": "3px 3px 0 0" });
                $statusNode.fadeTo("slow", 1);
            }
            else {
                $statusNode.fadeTo("slow", 0);
                $self.css({ "border-radius": "3px" });
            }
        };

    $email.on({
        keyup: function() {
            keyupHandler(this, isValidEmailAddress, $emailStatus, "Valid email format", "Invalid email format");
        }
    });

    $gradYear.on({
        keyup: function() {
            keyupHandler(this, checkGradYear, $gradYearStatus, "Grad year is valid", "Grad Year is out of bounds");
        }
    });
});
