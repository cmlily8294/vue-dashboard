export default {

    install(Vue, options) {
        Vue.prototype.$itzUtils = this;
    },
    //数字转千分位
    thousands(num){
        var s = String(num).split('.');
        var reg=/(?=(?!\b)(\d{3})+$)/g;
        var a =  String(s[0]).replace(reg, ',');
        if (s[1]) {
            a+= '.'+s[1];
        } 
        return a;  
    }
}


Date.prototype.format = function(format) {
    var date = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
}
