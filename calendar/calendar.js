 initData(cur) {
    let date = new Date(cur);
    let currentDay = date.getDate();
    let currentYear = date.getFullYear();
    let currentMonth = date.getMonth() + 1;
    let currentWeek = date.getDay();
    if (currentWeek == 0) {
      currentWeek = 7;
    };
    let str = this.formatDate(currentYear, currentMonth, currentDay);
    let days = [];
    // 今天是周日，放在第一行第7个位置，前面6个
    //初始化本周
    for (let i = currentWeek - 1; i >= 0; i--) {
      let d = new Date(str);
      d.setDate(d.getDate() - i);
      let dayobject = {}; //自定义date对象  便于以后预定功能添加属性
      dayobject.day = d;
      days.push(dayobject); //将日期放入data 中的days数组 供页面渲染使用
    }
    //其他周
    for (let i = 1; i <= 42 - currentWeek; i++) {
      let d = new Date(str);
      d.setDate(d.getDate() + i);
      let dayobject = {};
      dayobject.day = d;
      days.push(dayobject);
    };
    for (let j in days) {
      days[j].formateValue = this.formatDate(days[j].day.getFullYear(), (parseInt(days[j].day.getMonth()) + 1), days[j].day.getDate());
      days[j].dateNumber = days[j].day.getDate();
      days[j].monthNumber = days[j].day.getMonth() + 1;
    };
    this.setData({
      days: days,
      currentDay: currentDay,
      currentMonth: currentMonth,
      currentYear: currentYear,
      currentWeek: currentWeek
    });
  },
  pickPrev: function() {
    let d = new Date(this.formatDate(this.data.currentYear, this.data.currentMonth, 1));
    d.setDate(0);
    this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
  },
  pickNext: function() {
    let d = new Date(this.formatDate(this.data.currentYear, this.data.currentMonth, 1));
    d.setDate(42);
    this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
  },
  formatDate: function(year, month, day) {
    var y = year;
    var m = month;
    if (m < 10) m = "0" + m;
    var d = day;
    if (d < 10) d = "0" + d;
    return y + "/" + m + "/" + d
  }