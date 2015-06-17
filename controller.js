var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope, $element, $http, $q) {

    $scope.getJSONFile = function () {
        return $q(function (resolve, reject) {
            $http.get('DriverList.json').success(function (data) {
                if (data != null) {
                    resolve(data);
                }
                else {
                    reject(data);
                }
            });
        });
    };
    $scope.radioValue = 'Score';
    $scope.chartType = 'linechart';
    $scope.resultset = [];
    var today = new Date();
    var date = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    var formattedate = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();

    $scope.getcheckedItem = function () {
        var selectedOption = $scope.radioValue;
        var chartData = [];

        if (selectedOption == "Rank") {
            for (i = 0; i < $scope.resultset.length; i++) {
                var dailyScoreObj = {};
                dailyScoreObj.Rank = $scope.resultset[i].Rank;
                dailyScoreObj.Name = $scope.resultset[i].Name;
                chartData.push(dailyScoreObj);
            }
        }
        for (var obj in $scope.jsonArr.Drivers) {
            for (var props in $scope.jsonArr.Drivers[obj]) {
                
                for (items in $scope.jsonArr.Drivers[obj][props]["Date"]) {
                    var dailyScoreObj = {};
                    if (selectedOption == "Score") {
                        dailyScoreObj.date = $scope.jsonArr.Drivers[obj][props]["Date"][items].date.EventDate;
                        dailyScoreObj.Score = $scope.jsonArr.Drivers[obj][props]["Date"][items].date.DailyScore;
                        dailyScoreObj.Name = $scope.jsonArr.Drivers[obj][props].name;
                        chartData.push(dailyScoreObj);
                    }
                    if (selectedOption == "Events") {
                        dailyScoreObj.date = $scope.jsonArr.Drivers[obj][props]["Date"][items].date.EventDate;
                        dailyScoreObj.Events = $scope.jsonArr.Drivers[obj][props]["Date"][items].date.DailyAllEvents;
                        dailyScoreObj.Name = $scope.jsonArr.Drivers[obj][props].name;
                        chartData.push(dailyScoreObj);
                    }
                    if (selectedOption == "hb") {
                        dailyScoreObj.date = $scope.jsonArr.Drivers[obj][props]["Date"][items].date.EventDate;
                        dailyScoreObj.HB = $scope.jsonArr.Drivers[obj][props]["Date"][items].date.DailyHB;
                        dailyScoreObj.Name = $scope.jsonArr.Drivers[obj][props].name;
                        chartData.push(dailyScoreObj);
                    }
                    if (selectedOption == "ra") {
                        dailyScoreObj.date = $scope.jsonArr.Drivers[obj][props]["Date"][items].date.EventDate;
                        dailyScoreObj.RA = $scope.jsonArr.Drivers[obj][props]["Date"][items].date.DailyRA;
                        dailyScoreObj.Name = $scope.jsonArr.Drivers[obj][props].name;
                        chartData.push(dailyScoreObj);
                    }
                    if (selectedOption == "sp") {
                        dailyScoreObj.date = $scope.jsonArr.Drivers[obj][props]["Date"][items].date.EventDate;
                        dailyScoreObj.SP = $scope.jsonArr.Drivers[obj][props]["Date"][items].date.DailySP;
                        dailyScoreObj.Name = $scope.jsonArr.Drivers[obj][props].name;
                        chartData.push(dailyScoreObj);
                    }
                    if (selectedOption == "cr") {
                        dailyScoreObj.date = $scope.jsonArr.Drivers[obj][props]["Date"][items].date.EventDate;
                        dailyScoreObj.CR = $scope.jsonArr.Drivers[obj][props]["Date"][items].date.DailyCR;
                        dailyScoreObj.Name = $scope.jsonArr.Drivers[obj][props].name;
                        chartData.push(dailyScoreObj);
                    }
                }
            }
        }
        console.log(chartData);
        drawChart(chartData);
    };
    
    var promise = $scope.getJSONFile();
    promise.then(function (data) {
        $scope.jsonArr = data;
        for (var obj in $scope.jsonArr.Drivers) {
            $scope.result = {};
            $scope.tableList = {};
            $scope.tableList.Name = "";
            $scope.tableList.Score = 0;
            $scope.tableList.AllEvents = 0;
            $scope.tableList.DailyHB = 0;
            $scope.tableList.DailyRA = 0;
            $scope.tableList.DailySP = 0;
            $scope.tableList.DailyCR = 0;
            $scope.tableList.DriveTime = 0;
            $scope.tableList.Rank = "";
            
            
            for (var props in $scope.jsonArr.Drivers[obj]) {
                $scope.tableList.Name = $scope.jsonArr.Drivers[obj][props]["name"];
                $scope.tableList.DriveTime = $scope.jsonArr.Drivers[obj][props]["DriveTime"];
                
                for (items in $scope.jsonArr.Drivers[obj][props]["Date"]) {
                    $scope.tableList.Score = $scope.tableList.Score + $scope.jsonArr.Drivers[obj][props]["Date"][items]["date"]["DailyScore"];
                    $scope.tableList.AllEvents = $scope.tableList.AllEvents + $scope.jsonArr.Drivers[obj][props]["Date"][items]["date"]["DailyAllEvents"];
                    $scope.tableList.DailyHB = $scope.tableList.DailyHB + $scope.jsonArr.Drivers[obj][props]["Date"][items]["date"]["DailyHB"];
                    $scope.tableList.DailyRA = $scope.tableList.DailyRA + $scope.jsonArr.Drivers[obj][props]["Date"][items]["date"]["DailyRA"];
                    $scope.tableList.DailySP = $scope.tableList.DailySP + $scope.jsonArr.Drivers[obj][props]["Date"][items]["date"]["DailySP"];
                    $scope.tableList.DailyCR = $scope.tableList.DailyCR + $scope.jsonArr.Drivers[obj][props]["Date"][items]["date"]["DailyCR"];
                }
            }
            $scope.result.Name = $scope.tableList.Name;
            $scope.result.Rank = $scope.tableList.Rank;
            $scope.result.Score = $scope.tableList.Score;
            $scope.result.AllEvents = $scope.tableList.AllEvents;
            $scope.result.HB = $scope.tableList.DailyHB;
            $scope.result.RA = $scope.tableList.DailyRA;
            $scope.result.SP = $scope.tableList.DailySP;
            $scope.result.CR = $scope.tableList.DailyCR;
            $scope.result.DriveTime = $scope.tableList.DriveTime;
            $scope.resultset.push($scope.result);
            $scope.resultset.sort(function (a, b) {
                return parseFloat(b.Score) - parseFloat(a.Score);
            });
            for (i = 0; i < $scope.resultset.length; i++) {
                $scope.resultset[i].Rank = i + 1;
            }
        }
        $scope.getcheckedItem(); 
    }, function (reason) {
        console.log(reason);
    });

    $scope.sort = function (obj) {
        var query = obj.target.attributes.data.value;
        var queryType = obj.target.attributes.class.value;
        
        if (query == 'Name' || query == 'DriveTime') {
            if (queryType == "icon-asec") {
                $scope.resultset.sort();
            }
            if (queryType == "icon-desc") {
                $scope.resultset.sort();
                $scope.resultset.reverse();
            }
        }
        else {
            $scope.resultset.sort(function (a, b) {
                for (props in a) {
                    if (props == query) {
                        if (queryType == "icon-desc")
                            return (a[props]) - (b[props]);
                        if (queryType == "icon-asec")
                            return (b[props]) - (a[props]);
                    }
                }
            });
        }
    }    
});

