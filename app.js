const DAY_MILLISECOND = 24 * 60 * 60 * 1000;

var getYesterDay = function (date) {
    return new Date(date.getTime() - DAY_MILLISECOND);
}
var getTomorrow = function (date){
    return new Date(date.getTime() + DAY_MILLISECOND);
}
// 获取指定日期的最后一天
var getMonthLastDate = function (date) {
    var curren_month = date.getMonth();
    var current_year = date.getFullYear();
    var next_month = curren_month + 1;
    var next_first_date = new Date(current_year, next_month);
    return getYesterDay(next_first_date);
}

var getMonthDates = function (date) {
    var month = date.getMonth();
    var year = date.getFullYear();
    var lastDate = getMonthLastDate(date);
    var dates = [];
    for (var i = 1; i <= lastDate.getDate(); i++) {
        var date = new Date(year, month, i);
        dates.push(date);
    }
    return dates;
}

var getYearDates = function (date){
    if(typeof date != 'object'){
        // 如果传入的date是一个只包含年份的数字，初始化一个当年的第一天
        date = new Date(date, 0);
    }
    var year = date.getFullYear();
    var dates = [];
    for(var i = 0; i< 12; i++){
        dates[i] = getMonthDates(new Date(year, i));
    }
    return dates;
}
var completeMonthMap = function (dates){
    if(!Array.isArray(dates)) return [];
    if(!dates.length) return [];
    var firstDate = dates[0];
    var lastDate = dates[dates.length-1];
    var firstDay = firstDate.getDay();
    var lastDay = lastDate.getDay();
    var middle = dates;
    var now = new Date();
    for(var i = 0; i< middle.length; i++){
        if(middle[i].getFullYear() == now.getFullYear() && middle[i].getMonth() == now.getMonth() && middle[i].getDate() == now.getDate()){
            middle[i].isToday = true;
        }
    }
    var front = [];
    for(var i = firstDay-1, date = firstDate; i>= 0; i--){
        var date = getYesterDay(date);
        front.unshift(date)
    }
    var end = [];
    for(var j = lastDay+1, date = lastDate; j<=6; j++){
        var date = getTomorrow(date);
        end.push(date);
    }
    var complete = {
        front: front,
        middle: middle,
        end: end
    }
    return complete;
}
