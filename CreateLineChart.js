function drawChart(chartData) {
    var rowData = [];
    var rowHeader = [];
    var arrOfArr = [];

    if (chartData[0].Rank) {
        rowHeader.push(getnames(chartData));
        rowData.push(rowHeader[0]);
        var arrobj = [];
        console.log(rowHeader);
        for (i = 0; i < chartData.length; i++) {
            var SelectedRank = chartData[i].Rank;
            arrobj.push(SelectedRank);
        }
        arrOfArr.push(arrobj);
        console.log(arrOfArr);
    }
    else { 
        rowHeader.push(getnames(chartData));
        rowHeader[0].push("Date");
        console.log(chartData);
        
        var lastItem = rowHeader[0].pop();
        rowHeader[0].splice(0, 0, lastItem);
        rowData.push(rowHeader[0]);
    
        for (i = 0; i < chartData.length; i++) {
            var dt = chartData[i].date;
            if (chartData[i].Score) {
                var SelectedItemVal = chartData[i].Score;
            }
            if (chartData[i].Events) {
                var SelectedItemVal = chartData[i].Events;
            }
            if (chartData[i].HB) {
                var SelectedItemVal = chartData[i].HB;
            }
            if (chartData[i].RA) {
                var SelectedItemVal = chartData[i].RA;
            }
            if (chartData[i].SP) {
                var SelectedItemVal = chartData[i].SP;
            }
            if (chartData[i].CR) {
                var SelectedItemVal = chartData[i].CR;
            }
            
            if (SelectedItemVal == null || SelectedItemVal == undefined) {
                SelectedItemVal = 0;
            }
            var arrobj = [dt, SelectedItemVal];
            if (arrOfArr.length == 0) {
                arrOfArr.push(arrobj);
            }
            else {
                var pushed = false;
                var arrayLength = arrOfArr.length;
                for (j = 0; j < arrayLength; j++) {
                    if (arrOfArr[j][0] == dt) {
                        arrOfArr[j].push(SelectedItemVal);
                        pushed = true;
                    }
                }
                if (!pushed) {
                    arrOfArr.push(arrobj);
                }
            }
        }
    
    }

    for (i = 0; i < arrOfArr.length; i++) {
        rowData[i + 1] = arrOfArr[i];
    }
    console.log(JSON.stringify(rowData));
    var data = google.visualization.arrayToDataTable(rowData);

    var options = {
        displayExactValues: true,
        pointSize:8,
        width: 1000,
        height: 320,
        axes: {
            x: {
                0: { side: 'top' },
                format:'medium'
            }
        }
    };
    
    var chart = new google.charts.Line(document.getElementById('chart_area'));
    chart.draw(data, options);
}
google.load('visualization', '1.1', { packages: ['line'] });

function getnames(chartData) {
    var names = [];
    var temp = null;
    for (i = 0; i < chartData.length; i++) {
        if (names.length > 0) {
            if (names.indexOf(chartData[i].Name) > -1) {
                names = names;
            }
            else {
                names.push(chartData[i].Name);
            }
        }
        else {
            names.push(chartData[i].Name);
        }
    }
    return names;
}


