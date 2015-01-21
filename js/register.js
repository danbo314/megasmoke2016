$(function () {

    Mousetrap.bind('ctrl+alt+h+o+f', function() {
        $("body").css({ cursor: "url('../img/hoff.cur'), auto" });
    });

    var panelVisible = true,
        left;

    $("#toggleShow").click(function () {
        if (panelVisible) {
            $(this).text("Show Form");
            $("#regContent").fadeOut();
            $("#regPanel").animate({ height: "35px" }, function () {
                left = $(this).offset().left;

                $(this).css({ left: left+"px", right: "auto", margin: "auto" }).stop().animate({ left: 0, width: "50px", height: "50px", "border-radius": "50%" });

                $(this).find("#toggleShow").stop().html("<img src='../img/text-paragraph.svg' />").animate({ padding: 0, height: "50px", width:"50px", "border-radius": "50%" });
            });
            panelVisible = false;
        }
        else {
            $("#toggleShow").stop().animate({ "border-radius": 0, height: "26px", padding: "5px", width:"390px" }).html("Hide Form");
            $("#regPanel").stop().animate({ "border-radius": 0, width: "400px", height: "26px" }, function () {
                $(this).animate({ left: left+"px" }, function() {
                    $(this).css({ left: 0, right: 0, margin: "0 auto 0 auto" });
                    $(this).animate({ height: "400px" });
                    $("#regContent").fadeIn();
                });
            });

            panelVisible = true;
        }
    });

    var scrollTimer,
        scrollFunc = function () {
            $("#regPanel").animate({ top: $(this).scrollTop()+80+"px" });
        };

    $(window).scroll(function () {
        if (scrollTimer) {
            clearTimeout(scrollTimer);
        }

        scrollTimer = setTimeout(scrollFunc, 50);
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
