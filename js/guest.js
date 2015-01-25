$(function() {

    Mousetrap.bind('ctrl+alt+h+o+f', function() {
        $("body").css({ cursor: "url('../img/hoff.cur'), auto" });
    });

    Mousetrap.bind('z', function () {
        window.location.href = "rua.html";
    });

    // initial load of all guests
	refreshGuests(false);

    $("#tableCont").css({ "max-height": $("#guestTable").height()-$("#yearTabs").height()+"px" });

    $(window).resize(function () {
        $("#tableCont").css({ "max-height": $("#guestTable").height()-$("#yearTabs").height()+"px" });
    });

    // load all available graduation years
    getAllYears(function(years) {
        var i,
            ylen = years.length,
            $currTab,
            cc = "green";

        for (i = 0; i < ylen; i++) {
            cc = (cc === "green") ? "blue" : "green";
            $('#yearTabs').append("<span class='tab "+cc+"'>"+years[i]+"</span>");
        }

        var filter;

        $("span.tab").on("click", function () {
            $(".tab.selected").removeClass("selected");
            $(this).addClass("selected");

            filter = ($(this).html() === "All") ? false : { gradYear: parseInt($(this).html()) };

            refreshGuests(filter);
        });
    });

});

function refreshGuests(filter) {
    getRegistrations(filter, function(data) {
        var $table = $('#tableCont > table'),
            i,
            dlen = data.length,
            attClass,
            gy;

        $table.find("tr:not(.headers)").remove();

        for (i = 0; i< dlen; i++) {
            //data[i].attending = Math.floor(Math.random() * 10) + 1;
            if (data[i].attending < 5) {
                attClass = "down";
            }
            else if (data[i].attending < 8) {
                attClass = "mid";
            }
            else {
                attClass = "up";
            }

            gy = !filter ? "<span>'"+data[i].gradYear.toString().substring(2)+"</span>" : "";

            $table.append("<tr><td>"+data[i].fullName+gy+"</td><td>"+data[i].nickName+"</td><td class='"+attClass+"'>"+data[i].attending+"</td></tr>");
        }
    });
}
