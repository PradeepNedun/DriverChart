function drawChart(chartData) {
    var rowData = [];
    var rowHeader = [];
    rowHeader.push(getnames(chartData));
    rowHeader[0].push("Date");
    console.log(chartData);

    var lastItem = rowHeader[0].pop();
    rowHeader[0].splice(0, 0, lastItem);
    rowData.push(rowHeader[0]);

    var arrOfArr = [];
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
            var existing = false;
            var arrayLength = arrOfArr.length;
            for (j = 0; j < arrayLength; j++) {
                if (arrOfArr[j][0] == dt) {
                    console.log(arrOfArr);

                    arrOfArr[j].push(SelectedItemVal);
                    existing = true;
                    break;
                }
                
            }
            if (!existing){
                console.log(arrobj);
                arrOfArr.push(arrobj);
            }
        }
    }
    for (i = 0; i < arrOfArr.length; i++) {
        rowData[i + 1] = arrOfArr[i];
    }
    
    console.log(JSON.stringify(rowData));
    var data = google.visualization.arrayToDataTable(rowData);
    
    // get the range of dates
    var range = data.getColumnRange(0);
    // pull back the start just a bit so the first axis label will show
    range.min = new Date(range.min);
    range.min.setMilliseconds(-1);
    
    // format the dates
    var dateFormatter = new google.visualization.DateFormat({ pattern: 'MMM-yy' });
    dateFormatter.format(data, 0);
    
    var options = {
        legend: {
            position: 'bottom'
        },
        height: 320,
        width: 'col-lg-9',
        interpolateNulls: true,
        pointSize: 5,
        vAxis: {
            minValue: 1000,
        },
        hAxis: {
            format: 'MMM-yy'
        }
    };
    
    var chart = new google.visualization.LineChart(document.getElementById('chart_area'));
    chart.draw(data, options);
}
google.load("visualization", "1", { packages: ["corechart"]});

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


