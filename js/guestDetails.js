$(function () {
    getRegistrations(false, function(data) {
        var $table = $(' table > tbody'),
            i,
            dlen = data.length,
            attClass,
            gy,
            maxPeople = 0,
            minPeople = 0,
            maxChildren = 0,
            minChildren = 0,
            yes = 0,
            no = 0,
            maybe = 0,
            ppl,
            kids;

        $table.find("tr:not(.headers)").remove();

        for (i = 0; i < dlen; i++) {
            if (data[i].attending < 5) {
                attClass = "down";
                no++;
            }
            else if (data[i].attending < 8) {
                attClass = "mid";
                maybe++;
                maxChildren += data[i].numChildren;
                maxPeople += data[i].numPeople;
            }
            else {
                attClass = "up";
                yes++;
                maxChildren += data[i].numChildren;
                minChildren += data[i].numChildren;
                maxPeople += data[i].numPeople;
                minPeople += data[i].numPeople;
            }

            gy = "<span>'"+data[i].gradYear.toString().substring(2)+"</span>";
            $table.append("<tr><td>"+data[i].fullName+gy+"</td><td>"+data[i].nickName+"</td><td class='"+attClass+"'>"+data[i].attending+"</td><td>"+data[i].numPeople+"</td><td>"+data[i].numChildren+"</td></tr>");
        }

        $("#total").html(dlen);
        $("#yes").html(yes);
        $("#maybe").html(maybe);
        $("#no").html(no);


        ppl = minPeople === maxPeople ? minPeople : minPeople+" - "+maxPeople;
        kids = minChildren === maxChildren ? minChildren : minChildren+" - "+maxChildren;

        $("#adults").html(ppl);
        $("#children").html(kids);
    });
});