$(function () {

    Mousetrap.bind('ctrl+alt+h+o+f', function() {
        $("body").css({ cursor: "url('../img/hoff.cur'), auto" });
    });

    var panelVisible = true;

    $("#toggleShow").click(function () {
        if (panelVisible) {
            $(this).text("Show Panel").css({ opacity: .6 });
            $("#regContent").fadeOut();
            $("#regPanel").animate({ height: "35px" });
            panelVisible = false;
        }
        else {
            $(this).text("Hide Panel").css({ opacity: 1 });
            $("#regPanel").animate({ height: "600px" });
            $("#regContent").fadeIn();
            panelVisible = true;
        }
    });

    $(window).scroll(function () {
        $("#regPanel").css({ top: $(this).scrollTop()+80+"px" });
    });

    var imgCount,
        numImages = 88,
        $collage = $("#collage"),
        path;

    for (imgCount = 0; imgCount < numImages; imgCount++) {
        path = "../img/collage/"+imgCount+".jpg";
        $collage.append("<img src='"+path+"'/>");
    }

    var collage = function () {
            $collage.collagePlus({
                targetHeight: 150
            });

            $collage.find("img").each(function () {
                $(this).wrap("<a class='fancybox' href='"+$(this).attr("src")+"'></a>");
            });

            $('.fancybox').fancybox({
                padding: 0
            });
        },
        resizeTimer;

    $(window).load(function () {
        collage();
    }).resize(function () {
        // hide all the images until we resize them
        // set the element you are scaling i.e. the first child nodes of ```.Collage``` to opacity 0
        $('#collage .Image_Wrapper').css("opacity", 0);

        // set a timer to re-apply the plugin
        if (resizeTimer) {
            clearTimeout(resizeTimer);
        }

        resizeTimer = setTimeout(collage, 200);
    });
});
