
    $(document).ready(function () {

        $(".icon-desc").click(function () {
            var search = $(this).parent().text();

            $("#driverTable thead tr th").each(function () {
                if (($(this).text()) == search) {
                    var $t = $(this);
                    $t.children('span').toggleClass("icon-desc");
                    $t.children('span').toggleClass("icon-asec");
                }
            });

            $("#driverTable tfoot tr th").each(function () {
                if (($(this).text()) == search) {
                    var $t = $(this);
                    $t.children('span').toggleClass("icon-desc");
                    $t.children('span').toggleClass("icon-asec");
                }
            });

        });

        $(".icon-asec").click(function () {
            var searchRank = $(this).parent().text();
            if (searchRank == 'RANK') {
                $(this).toggleClass("icon-asec");
                $(this).toggleClass("icon-desc");
                $("#driverTable tfoot tr th").each(function () {
                    if ($(this).text() == searchRank) {
                        var $t = $(this);
                        $t.children('span').toggleClass("icon-asec");
                        $t.children('span').toggleClass("icon-desc");
                    }
                });
            }
    });
    });

