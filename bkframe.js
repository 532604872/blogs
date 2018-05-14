/*  bkframe.js
*   version: 2.0
*   This is common fram
*	  Create person : s.m
*   contributors: nemo
*   update time: 2015-9-3
*/

/*
*	NO1: Jquery-utils.js
*/

(function($){
    $.extend({
        queryString:function (id) {
            var e = {};
            try {
                var qs = document.URL.split('?')[1].split('&');
            }
            catch (ex) {
                return null;
            }
            if (!isNaN(id)) return e[qs[id].split('=')[1]];
            for (var i = 0; i < qs.length; i++) {
                e[qs[i].split('=')[0].toLowerCase()] = qs[i].split('=')[1];
            }
            if (id) {
                return e[id.toLowerCase()];
            }
            return e;
        },
        breakEvent : function (e) {
            if (e.preventDefault) {
                e.preventDefault();
            } else {
                e.cancelBubble = true
                e.returnValue = false;
            }
            e.stopPropagation();
        },
        tag: function (tagName, props) {
            var tag = document.createElement(tagName);
            if (typeof (props) == "string") {
                tag.className = props;
            }
            else {
                if (props != undefined) {
                    if(props.style) {
                        $.updateObject(props.style, tag.style);
                        delete props.style;
                    }
                    $.updateObject(props, tag);
                }
            }
            tag.append = function (tagName, props) {
                return tag.appendChild($.tag(tagName, props));
            }
            return tag;
        },
        updateObject: function (inputValue, defalutValue) {
            if (defalutValue === null || defalutValue === undefined) {
                defalutValue = inputValue;
            }
            else {
                for (var property in inputValue) {
                    if (inputValue[property] && inputValue[property].constructor == Object && typeof defalutValue[property] != "array") {
                        defalutValue[property] = this.updateObject(inputValue[property], defalutValue[property]);
                    }
                    else if (inputValue[property] != undefined) {
                        defalutValue[property] = inputValue[property];
                    }
                }
            }
            return defalutValue;
        },
        valid: function (type, text, options) {
            options = options || "";
            var min, max;
            var types = {
                nickname: function () {
                    min = options.min || 4, max = options.max || 30;
                    return "^([\\w\\u4e00-\\u9fa5]\\-*[\\w\\u4e00-\\u9fa5]*){" + min + "," + max + "}$";
                },
                email: function () {
                    return "^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\.\\w+([-.]\\w+)*$";
                },
                phone: function () {
                    min = options.min - 2 || 3, max = options.max - 2 || 14;
                    return "(^\\d[(\\d*-?\\d+)*]{" + min + "," + max + "}\\d$)";
                },
                password: function () {
                    min = options.min || 6, max = options.max || 32;
                    return "^[\\w\\W]{" + min + "," + max + "}$";
                },
                input: function () {
                    min = options.min || 2, max = options.max || 50;
                    return "^[\\w\\W]{" + min + "," + max + "}$";
                },
                text: function () {
                    min = options.min || 1, max = options.max || 3000;
                    return "^[\\w\\W]{" + min + "," + max + "}$";
                },
                website: function () {
                    min = options.min || 1, max = options.max || 150;
                    return "^([A-Za-z]+://)?[A-Za-z0-9-_]+\\.[A-Za-z0-9-_%&\?\/.=]+$";
                },
                powerPassword: function () {
                    min = options.min || 8, max = options.max || 16;
                    return "^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\\d)(?=.*?[`~!@#$%^&*()_\\-+={}\\[\\]\\\|:;\"\'<>,.?/])[a-zA-Z\\d`~!@#$%^&*()_\\-+={}\\[\\]\\\|:;\"\'<>,.?/]{" + min + "," + max + "}$"
                },
                inviteCode: function () {
                    return "^[a-z0-9]{16}$";
                },
                none: function () {
                    return true;
                }
            }
            var reg = new RegExp(options.reg || types[type]());
            reg.global = true;
            if (typeof (text) == "string") {
                return reg.test(text.replace(/^ *| *$/g, ""));
            }
            else {
                var input = [];
                if (!text) {
                    text = this;
                    this.each(function () {
                        input.push(this.value || this.innerHTML);
                    })
                }
                else {
                    input = text;
                }
                var output = [];
                for (var key in input) {
                    output.push(reg.test(input[key].replace(/^ *| *$/g, "")));
                }
                return output;
            }
        },
        browser: {
            IE: (navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0),
            Firefox: /firefox/.test(navigator.userAgent.toLowerCase()),
            Opera:  /opera/.test(navigator.userAgent.toLowerCase()),
            IE6: (navigator.userAgent.indexOf('Opera') < 0) && !window.XMLHttpRequest,
            IE10: (navigator.userAgent.indexOf('MSIE') >= 0) && (function () {
                "use strict";
                return this === undefined;
            }()),
            weChat: (/MicroMessenger/i).test(navigator.userAgent),
            iphone: navigator.userAgent.indexOf('iPhone') > -1 || navigator.userAgent.indexOf('Mac') > -1,
            android: navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Linux') > -1
        }
    });
    $.fn.extend({
        applyAttr:function() {
            for(var j = 0; j < this.length; j++) {
                var me = this[j];
                for (var i = 0; i < me.attributes.length; i++) {
                    me[me.attributes[i].name.replace(/-([a-zA-Z]{1})/g, function ($1) {
                        return $1.substr(1, 1).toUpperCase()
                    })] = me.attributes[i].value;
                }
            }
            return this;
        }
    })
})(jQuery);

/*
*	NO2: fun.js
*/

/*function loged(id) {
    if (window.profile || id) {
        if (id === 'userNameModile') {
            $("#userNameModile").each(function () {
                var o = this;
                if (!o.menu) {
                    o.menu = createUserDropMenu({'screenisPC': !1});
                    o.offsetY = 13;
                    o.parentNode.parentNode.appendChild(o.menu);
                    if (o.menu)
                        Menu(o);
                }
            });
        } else {
            $("#userName").each(function () {
                var o = this.parentNode;
                if (!o.menu) {
                    o.menu = createUserDropMenu({'screenisPC': !0});
                    o.appendChild(o.menu);
                    o.offsetY = 13;
                    if (o.menu)
                        Menu(o);
                }
            });
        }
    }
}*/

window.screenType = (function () {
    var doc = document.body || document.documentElement;
    if (doc.clientWidth <= 767) {
        return { level: 0, type: "phone" };
    }
    else if (doc.clientWidth <= 991) {
        return { level: 1, type: "pad" };
    }
    else if (doc.clientWidth <= 1200) {
        return { level: 2, type: "pc" };
    }
    else {
        return { level: 3, type: "pc" };
    }
})();

window.now = parseInt(new Date / 1000);

var format = {
    size: function (size) {
        var unit = ["B", "KB", "MB", "GB"];
        for (var i = 0; i < unit.length; i++) {
            if (size < Math.pow(1024, i + 1)) {
                return parseInt(size / Math.pow(1024, i) * 10) / 10 + unit[i];
            }
        }
    },
    uid: function (uid) {
        uid = (uid)? uid.toString() : '00000';
        while (uid.length < 5) {
            uid = "0" + uid;
        }
        return uid;
    },
    elapsedTime: function (time) {
        if (time >= 30 * 86400) {
            if (time < 365 * 86400) {
                return parseInt(time / 86400 / 30) + "月前";
            }
            else {
                return parseInt(time / 86400 / 365) + "年前";
            }
        }
        else {
            if (time >= 86400) {
                return parseInt(time / 86400) + "天前";
            }
            else if (time >= 3600) {
                return parseInt(time / 3600) + "小时前";
            }
            else if (time >= 60) {
                return parseInt(time / 60) + "分钟前";
            }
            else {
                return "刚刚";
            }
        }
    },
    date: function (time) {
        var date = new Date();
        time && date.setTime(time);
        var d = date.getFullYear() + "-" + numFormat(date.getMonth() + 1) + "-" + numFormat(date.getDate());
        var t = numFormat(date.getHours()) + ":" + numFormat(date.getMinutes());
        var monthday = numFormat(date.getMonth() + 1) + '/' +  numFormat(date.getDate());
        return ({ date: d, time: t, full: d + " " + t ,monthday: monthday});
    },
    time: function (time) {
        var date = new Date();
        time && date.setTime(time);
        var Week = ['日','一','二','三','四','五','六'];
        var Y = date.getFullYear(),
            M = numFormat(date.getMonth() + 1),
            D = numFormat(date.getDate()),
            W = Week[date.getDay()],
            h = numFormat(date.getHours()),
            m = numFormat(date.getMinutes()),
            s = numFormat(date.getSeconds());
        // 默认时间格式
        var timeDetault = function () {
            return Y + "/" + M + "/" + D + " " + h + ":" + m + ":" + s;
        };
        // 自定义日期格式
        // 例如：
        // YYYY/yyyy/YY/yy 表示年份
        // MM/M 月份
        // dd/DD/d/D 日期
        // W/w 星期
        // hh/HH/h/H 时间
        // mm/m 分钟
        // ss/SS/s/S 秒
        var userDefined = function (form) {
            if (!form || typeof form !== 'string') return this.default;
            form = form.replace(/YYYY|yyyy|YY|yy/, Y);
            form = form.replace(/MM|M/, M);
            form = form.replace(/dd|DD|d|D/, D);
            form = form.replace(/W|w/, W);
            form = form.replace(/hh|HH|h|H/, h);
            form = form.replace(/mm|m/, m);
            form = form.replace(/ss|SS|s|S/, s);
            return form;
        };
        return ({
            default: timeDetault(),
            userDefined: userDefined
        });
    },
    //计算今天昨天或更早日期
    /**
     * md:月日
     * ms:分秒
     * nd:当前时间
     * bd:传入时间
     * */
    subTime : function(time){
        time = (time.length === 13)? time: time * 1000;
        var md,ms,
            nd = format.date(new Date()).date,
            bd = format.date(time);
        var subtimes = (nd.substr(-2)) - (bd.date.substr(-2));
        var subyaermonth = (nd.substr(0,7)) == (bd.date.substr(0,7));

        if (subtimes == 1 && subyaermonth) {
            md =  '昨天';
            ms = bd.time;
        } else if(subtimes == 0 && subyaermonth ) {
            md =  '今天';
            ms = format.elapsedTime(Math.floor(new Date() /1000) - time/1000);
        }else{
            md = bd.monthday;
            ms = bd.time;
        }

        return {date1: md,date2: ms}
    }
};

function transEditor(value, removeNBSP) {
    removeNBSP = removeNBSP || false;

    if (!window.trans) {
        window.trans = $.tag("div", {
            display: "none"
        })
    }
    window.trans.innerHTML = value;
    return window.trans.innerHTML.replace(/(&lt;\/br&gt;)|(&lt;)|(&gt;)|(&nbsp;)/g, function ($1, $2, $3, $4, $5) {
        if ($5) {
            return (removeNBSP) ? " " : $5;
        }
        else if ($3) {
            return (removeNBSP) ? "<" : $3;
        }
        else if ($4) {
            return (removeNBSP) ? ">" : $4;
        }
        else if ($2) {
            return (removeNBSP) ? "\n" : "</br>";
        }

    });
}

function countdown(time) {
    /*var hour = parseInt(time / 3600);
    time -= hour * 3600;
    var min = parseInt(time / 60);
    var sec = time - min * 60;
    return numFormat(hour) + ":" + numFormat(min) + ":" + numFormat(sec);*/


    var sub=time;
    var str="";

    if(sub<=0) return '已过期';

    if(sub>=24*60*60){
        var d=parseInt(sub/(24*60*60));
        str = str + d + "天";
        sub = sub-d*(24*60*60);
    }
    if(sub>=60*60){
        var h=parseInt(sub/(60*60));
        str = str + h + "时";
        sub = sub-h*(60*60);
    }
    if(sub>=60){
        var m=parseInt(sub/60);
        str = str + m + "分";
        sub = sub-m*60;
    }

    str = str + sub + "秒";

    return str;
}

/*function createUserDropMenu(option, callback) {//生成顶部用户名处下拉global菜单
    option = $.updateObject(option, {
        screenisPC: !0
    });

    var menu = $.tag("div", "e-user");
    if (window.profile.type !== undefined) {
        if (option.screenisPC) {
            var card = menu.append('div', 'card-arrow').append('div', {
                className: 'e-user-card',
                id: 'userMenu'
            });
        } else {
            var card = menu.append('div', {
                className: 'e-user-card',
                id: 'userMenuModile'
            });
        }
        var head = card.append("div", "card-header");
        head.append('a', {
            title: window.profile.name,
            className: 'u',
            href: global.host.hacker + window.profile.name
        }).append("img", {
            alt: window.profile.name,
            src: window.profile.avatar
        });
        var info = head.append('div', 'profile-info');
        info.append("h3", "name").append('a', {
            innerHTML: window.profile.name,
            title: window.profile.name,
            href: global.host.hacker + window.profile.name
        });
        info.append("p", {
            className: "headline",
            innerHTML: "<a href=\"" + global.host.root + "user/bill.html\">BK币 <b>" + window.profile.balance + "</b></a>"
        });

        var stats = info.append('div', 'profile-stats');
        stats.append('a', {
            href: '/u/'+window.profile.name+'/following',
            className: 'stat followers',
            innerHTML: '<div class="fa fa-heart-o">' + window.profile.followees + '</div><div class="p_label">关 注</div>'
        });
        stats.append('a', {
            href: '/u/'+window.profile.name+'/follower',
            className: 'stat following',
            innerHTML: '<div class="fa fa-user-o">' + window.profile.followers + '</div><div class="p_label">粉 丝</div>'
        });

        var profile = info.append('div', 'profile-button').append('a', {
            className: 'btn',
            innerHTML: '个人中心',
            href: global.host.root + 'user/'
        });

        $(profile).click(function (e) {

        });

        card.append('div', 'divider');

        var footer = card.append("div", "card-footer").append('ul', 'bottom-menu menu-list');
        footer.append('li').append("a", {
            innerHTML: "信息设置",
            href: global.host.root + "user/infor.html"
        });
        footer.append('li').append("a", {
            innerHTML: "退出",
            href: "javascript:logout()"
        });
    }

    return menu;
}

function Header(id) {
    // if(window.layout.available.header) {
        // 手机版
        if (!window.topbar) {
            window.topbar = $("#topbar")[0];
        }
        if (window.profile && window.profile != null && window.profile.type !== undefined) {
            $("#topbarFun").css("display", "none");
            var userName = $("#" + id);
            userName[0].href = (window.screenType.level == 0 || window.screenType.level == 1)? 'javascript: void(0);' : global.host.hacker + window.profile.name;
            userName.html("<img src=\"" + window.profile.avatar + "\"/>");
            /!*if (window.profile.type == 0) {
                var msg = window.profile.unread.msg + window.profile.unread.apply;
                if (msg > 0) {
                    userName.append($.tag("span", {className: "message-badge", innerHTML: msg}));
                }
            }*!/
        }
        else {
            $("#userName").css("display", "none");
            $("#topbarFun").css("display", "");
        }
        /!*var search = $("#search").mouseover(function () {
            search.over = true;
            search.timer = setTimeout(function () {
                search.parentNode.className = "search focus";
                setTimeout(function () {
                    input.select();
                }, 200);
            }, 200);
        }).click(function () {
            clearTimeout(search.timer);
            search.parentNode.className = "search focus";
            setTimeout(function () {
                input.select();
            }, 200);
        }).mouseout(function () {
            search.over = false;
            clearTimeout(search.timer);
        })[0];

        if (search != undefined) {
            var input = $("input", search.parentNode).blur(function () {
                if (!search.over)
                    search.parentNode.className = "search";
            })[0];
            $([search, $("#phoneSearch")[0]]).each(function () {
                var o = this;
                o.input = $("input", o.parentNode).applyAttr()[0];
                $(o.input).keypress(function (e) {
                    e = e || window.event;
                    o.input.value = $.trim(o.input.value);
                    if (e.keyCode == 13 && o.input.value != "") {
                        if(o.input.value.length < 2){
                            tips.show({text: '输入字符不得少于2个'});
                        } else {
                            window.location = o.input.href + "?value=" + o.input.value;
                        }
                    }
                });
            }).click(function () {
                var o = this;
                o.input.value = $.trim(o.input.value);
                if (o.input.value != "") {
                    if(o.input.value.length < 2){
                        tips.show({text: '输入字符不得少于2个'});
                    } else {
                        window.location = o.input.href + "?value=" + o.input.value;
                    }
                }
                else {
                    o.input.focus();
                }
            });
        }*!/
    // }
}

function Menu(id) { //menu
    var src = $(id).applyAttr()
        .css({ "position": "relative" })
        .each(function () {
            var o = this;
            o.hideMenu = function (e) {
                //                o.menu.animate({ opacity: 0, "margin-top": -10 }, 200, 0, 0, function () {
                //                    o.menu.css("display", "none");
                //                });
                /!*if (e)
                    $.breakEvent(e);*!/
                o.menu.hide();
                $(window).unbind("click", src[0].hideMenu);
            }
            if (typeof (o.menu) == "string") o.menu = "#" + o.menu;
            o.menu = $(o.menu).hide();
            //var top = o.offsetHeight;
            //if (o.offsetY) {
            //    top += 1 * o.offsetY;
            //}
            //o.menu.css({ "display": "none", position: "absolute", left: "auto", top: top, "margin-top": -10 }).css("z-index", "100");
            // o.menu.css({ "display": "none", position: "absolute", left: "auto","zIndex": "100" });
        });
    src[0].triggerType = src[0].triggerType || "click";
    var trigger = {
        click: function () {
            src.click(function (e) {
                var o = this;
                headerMnueRadio.judge(o, src[0].hideMenu);
                if (o.menu[0].style.display == "none") {
                    // o.appendChild(o.menu[0]);
                    //                    o.menu.css({ "display": "block", "top": o.offsetHeight }).animate({ opacity: 1, "margin-top": 0 }, 200, 0, 0, function () {
                    //                        $(window).bind("click", o.hideMenu, 1);
                    //                    });
                    //o.menu.show().css({ "display": "block" });
                    o.menu.show();
                    e = e || window.event;
                    $.breakEvent(e);
                    $(window).bind("click", src[0].hideMenu);
                }
            })
        },
        hover: function () {
            src.mouseover(function () {
                var o = this;
                clearTimeout(src.timer);
                src[0].appendChild(src[0].menu[0]);
                o.menu.show();
                //src[0].menu.css({ "display": "block" }).animate({ opacity: 1}, 200);
            }).mouseout(function () {
                clearTimeout(src.timer);
                src.timer = setTimeout(this.hideMenu, 200);
            })
            src[0].menu.mouseover(function (e) {
                e = e || window.event;
                $.breakEvent(e);
                clearTimeout(src.timer);
            }).mouseout(function (e) {
                clearTimeout(src.timer);
                src.timer = setTimeout(src[0].hideMenu, 200);

            })
        }
    }
    trigger[src[0].triggerType]();

}*/

function numFormat(num) {
    return (Math.abs(num) < 10) ? "0" + parseInt(num) : num;
}

function checkbox(options) {
    var config = {
        container: "",
        name: "",
        data: [{ title: "", value: 1, checked: true}],
        callback: {
            check: function () { }
        }
    }
    $.updateObject(options, config);
    var root = $(config.container)[0];
    root.box = {};
    root.item = {};
    var check = root.check = function (item) {
        item.checked = !item.checked;
        item.box.className = "la-crbox" + (item.checked ? " sel" : "");
        item.input.disabled = !item.checked;
    }
    function createCheckBox(d) {
        var item = $.tag("li", "fl p10");
        root.item[d.title] = item;
        item.checked = d.checked;

        var main = item.append("div", "check-box");
        main.title = d.title;

        item.input = main.append("input");
        item.input.value = (d.value === undefined) ? "" : d.value;
        item.input.disabled = !d.checked;
        item.input.type = "hidden";
        item.input.name = config.name;
        root.box[d.title] = item.input;

        item.box = main.append("span", "la-crbox" + (d.checked ? " sel" : ""));
        main.append("text", "", d.title);
        $(item).click(function () {
            check(item);
            config.callback.check(item, root);
        })
        return item;
    }
    var frag = document.createDocumentFragment();
    for (var i = 0; i < config.data.length; i++) {
        frag.appendChild(createCheckBox(config.data[i]));
    }
    root.appendChild(frag);
    return root;
}

function selector(id) {
    var defaultType = {
        year: function (o) {
            var output = {};
            o.start = o.start || "now";
            if (o.start.indexOf("now") >= 0) {
                o.start = eval(o.start.replace("now", (new Date()).getFullYear()));
            }
            o.end = o.end || "now";
            if (o.end.indexOf("now") >= 0) {
                o.end = eval(o.end.replace("now", (new Date()).getFullYear()));
            }
            var step = (o.end - o.start) / Math.abs(o.end - o.start);
            for (var i = 0; i <= Math.abs(o.end - o.start); i++) {
                output["#" + (o.start + step * i)] = o.start + step * i;
            }
            return output;
        },
        month: function (o) {
            var output = {};
            o.start = o.start || "now";
            if (o.start.indexOf("now") >= 0) {
                o.start = eval(o.start.replace("now", (new Date()).getMonth()));
            }

            var month;
            for (var i = 0; i < 12; i++) {
                month = (o.start + i) % 12 + 1
                output["#" + month] = month;
            }
            return output;
        },
        number: function (o) {
            var output = {};
            o.start = eval(o.start);
            o.end = eval(o.end);
            var step = (o.end - o.start) / Math.abs(o.end - o.start);
            for (var i = 0; i <= Math.abs(o.end - o.start); i++) {
                output["#" + (o.start + step * i)] = o.start + step * i;
            }
            return output;
        }
    }
    var id = $(id).applyAttr().each(function (o) {
		var o = this;
        o.suffix = o.suffix || "";
        o.maxlength = o.maxlength || 8;
        o.options = [];
        o.append = function (tag, className, innerHTML){
            return o.appendChild($.tag(tag, {className: className, innerHTML: innerHTML}))
        }
        o.style.position = "relative";
        o.text = o.append("p", "");
        var title = o.value;
        if (o.value == "" || !o.value) {
            title = o.title;
            o.text.innerHTML = o.placeholder;
        }
        else {
            o.title = o.value;
        }



        o.append("div", "dlr");

        var defaultValue = o.value;
        o.value = o.append("input");
        o.value.name = o.name;
        o.value.type = "hidden";
        o.value.value = defaultValue;

        o.append("div", "input");

        o.list = o.append("div", "drop-box drop-box-list");
        o.list.style.cssText += "position: absolute; left: -1px; display: none;";
        o.list.style.width = $(o).css("width")[0] + "px";

        o.selectOptions = function (key) {
            var option = o.optionsJson[key];
            if (o.checked) {
                o.checked.className = "";
            }
            o.checked = option;
            option.className = "sel";
            o.value.value = option.value;
            o.title = option.innerHTML;
            o.text.innerHTML = option.innerHTML;
            if (o.select)
                eval(o.select)(o);
        }
        o.resetType = function (type) {
            o.setOptions(defaultType[type](o));
        }
        o.setOptions = function (inputs) {
            o.options = [];
            o.optionsJson = {};
            o.list.innerHTML = "";
            for (var key in inputs) {
                var option = o.list.append("div", "", key + o.suffix);
                option.value = inputs[key];
                option.title = option.innerHTML;
                o.options.push(option);
                o.optionsJson[key.replace(/^#/, "")] = option;
                if (key.replace(/^#/, "") == o.key || inputs[key] == o.value.value) {
                    o.title = option.title;
                    o.text.innerHTML = option.title;
                    option.className = "sel"
                    o.checked = option;
                }
            }
            $(o.options).bind("click", function () {
				var option = this;
                if (o.checked) {
                    o.checked.className = "";
                }
                o.checked = option;
                option.className = "sel";
                o.value.value = option.value;
                o.title = option.innerHTML;
                o.text.innerHTML = option.innerHTML;
                o.close = true;
                if (o.select)
                    eval(o.select)(o);
                closeOptions();
            })
        }
        if (defaultType[o.type]) {
            var inputs = defaultType[o.type](o);
            o.setOptions(inputs);
        }


    }).bind("click", function (o) {
		var o = this;
        if (window.activedSelecter) {
            window.activedSelecter.list.style.display = "none";
        }

        window.activedSelecter = o;
        o.list.style.top = o.offsetHeight - 1 + "px";
        o.list.style.display = "block";
        if (o.options.length > o.maxlength) {
            o.list.style.overflowY = "scroll";
            o.list.style.height = o.maxlength * o.options[0].offsetHeight + "px";
        }

        $(window).bind("click", closeOptions);
    }).bind("mouseover", function () {
        this.close = false;
    }).bind("mouseout", function () {
        this.close = true;
    })

    function closeOptions() {
        if (window.activedSelecter.close) {
            window.activedSelecter.list.style.display = "none";
            $(window).unbind("click", closeOptions);
        }
    }
    return id;
}

function radiobox(id) {
    return $(id).applyAttr().each(function (o) {
		var o = this
        var items = $("item", o).applyAttr();
        o.innerHTML = "";
        var outer = o.appendChild($.tag("div", "ctl-bar")).append("div", "check-group");
        o.value = outer.append("input");
        o.value.name = o.name;
        o.value.type = "hidden";

        o.items = [];
        for (var i = 0; i < items.length; i++) {
            var item = outer.append("div", "radio-box");
            o.items.push(item);
            item.title = items[i].text;
            item.value = items[i].value;
            item.operator = item.append("span", "la-crbox");
            item.text = item.append("text", "", item.title);
            if (items[i].selected) {
                item.operator.className += " sel";
                o.checked = item;
            }
        }
        o.check = function (item) {
            if (o.checked) {
                o.checked.operator.className = "la-crbox";
            }
            o.checked = item;
            item.operator.className += " sel";
            o.value.value = item.value;
        }
        $(o.items).bind("click", function () {
            o.check(this);
        })
    })[0];
}

function textarea(id) {
    var eventInput = "input";
    if ($().is.IE) {
        eventInput = "propertychange"
    }
    $(id).applyAttr().each(function (o) {
        var input = o.innerHTML;
        o.innerHTML = "";
        o.value = o.appendChild($.tag("div", "ctl-bar"))
                    .append("div", "edit-textarea")
                    .append("textarea", "wbox");
        o.value.value = input;
        o.value.name = o.name;
        o.count = o.appendChild($.tag("div", { className: "main-mail-bottomreply-info-submit-num", innerHTML: input.length + "/" + o.maxlength }));
        $(o.value).bind(eventInput, function (e) {
            if (o.value.value.length > o.maxlength) {
                e = e || window.event;
                if (e.preventDefault) {
                    e.preventDefault();
                } else {
                    e.returnValue = false;
                }
                o.value.value = o.value.value.substring(0, o.maxlength);
            }
            o.count.innerHTML = o.value.value.length + "/" + o.maxlength;
        });

    })
}

/* maomao
*
*功能：当body高度小于窗口高度，调整最底部样式
*
*/
function minWindowHeight() {
    if(!window.footer)
        window.footer = $('footer')[0];
    var footer = window.footer;
    if (!footer) return false;
    var page = getPageSize();
    page.ShowH = (!footer.style['position'] && !footer.style['bottom'] && !footer.style['width'])? page.ShowH : page.ShowH + footer.offsetHeight;
    if (page.ShowH < page.WinH) {
            footer.style.cssText += "bottom:0px;position: absolute;width: 100%;";
    }
    else {
        footer.style.cssText = "";
    }
};
//$(window).resize(minWindowHeight);

function tipsing(str, me, type) {
    var tipsClass = 'alert-warn';
    if (typeof (type) != 'undefined') tipsClass = 'alert-' + type;
    if (!me.tips) {
        var tips = me.tips = $.tag('div', tipsClass);
        me.parentNode.appendChild(tips);
        tips.style.cssText = 'position:absolute;right:0;';
    }
    me.tips.style.display = "block";
    if (str.indexOf("<i></i>") != 0) {
        str = "<i></i>" + str;
    }
    me.tips.className = tipsClass;
    me.tips.innerHTML = str;
}

function search(callback, options) {
    options = $.updateObject(options, {//new
        url: '',
        callback: {
            done: function () {},
            success: function () {},
            error: function () {}
        }
    })
    $("#searchBar").each(function (i, search) {
        var input = $("input", search);
        var tips = $("ul.search-result", search).mouseover(function () {
            input.open = true;
        }).mouseout(function () {
            input.open = false;
        }); ;
        $(".search-button", search).click(function () {
            callback($.trim(input[0].value));
        });
        var timer, frag = document.createDocumentFragment();
        function getTips(key) {//new
            if (key == '') return false;
            $.ajax({
                url: options.url,
                // data: {key: key, p: 1},
                data: {keyword: key},
                success: function(data) {
                    tips[0].innerHTML = "";
                    tips.data = [];
                    tips.active = undefined;
                    if (input[0].value == "") {
                        data.data = window.data.tips;
                    }
                    if (data && data.data.length > 0) {
                        tips.show();
                        for (var i = 0; i < data.data.length; i++) {
                            tips.data.push(frag.appendChild($.tag("li", { innerHTML: data.data[i].firmName })));
                        }
                        $(tips.data).click(function () {
                            input.val(this.innerHTML);
                            tips.hide();
                            tips.data = [];
                            tips.active = undefined;
                            callback(this.value);
                        })
                        tips.append(frag);
                    }
                    else {
                        tips.hide();
                    }
                    options.callback.success(data);
                },
                complete: function (data) {
                    options.callback.done(data);
                },
                error: function (data) {
                    options.callback.error(data);
                }
            });
        }
        input.focus(function () {
			var o = this;
            if (o.value == "" && data.tips.length) {
                tips[0].innerHTML = "";
                tips.data = [];
                tips.show();
                for (var i = 0; i < data.tips.length; i++) {
                    tips.data.push(frag.appendChild($.tag("li", { innerHTML: data.tips[i].firmName })));
                }
                $(tips.data).mousedown(function () {
					var o = this
                    input.val(o.innerHTML);
                    tips.hide();
                    tips.data = [];
                    tips.active = undefined;
                    callback($.trim(o.value));
                });
                tips.append(frag);
            }
        }).blur(function () {
            if (!input.open) {
                tips.hide();
                tips.data = [];
                tips.active = undefined;
            }
        }).bind("keydown", function (e) {
			e = e || window.event;
            clearTimeout(timer);
            if (e.keyCode == 38 || e.keyCode == 40) {
                if (input.val().length == 0) return false;

                if (!tips.data || tips.data.length == 0) {
                    return false;
                }
                e = e || window.event;
                if (tips.active !== undefined) {
                    tips.data[tips.active].className = "";
                }
                if (e.keyCode == 38) {
                    if (tips.active === undefined) {
                        tips.active = 0;
                    }
                    tips.active = (--tips.active + tips.data.length) % tips.data.length;
                }
                else if (e.keyCode == 40) {
                    if (tips.active === undefined) {
                        tips.active = 0;
                    }
                    else {
                        tips.active = ++tips.active % tips.data.length;
                    }
                }
                tips.data[tips.active].className = "on";
                input.val(tips.data[tips.active].innerHTML);
                $.breakEvent(e);
                return false;
            }
            else if (e.keyCode == 108 || e.keyCode == 13) {
                if (input.val().length == 0) return false;

                callback($.trim(input[0].value));
                tips.hide();
                $.breakEvent(e)
            }
            else if (target.value == 'company') {// 控制只有企业才有输入提示
                clearTimeout(timer);
                timer = setTimeout(function () {
                    getTips($.trim(input[0].value));
                }, 350);
            }

        });

    })
}
function photoShow() {
    window.photoShow = $.tag("div", "pop");

    photoShow = $(photoShow);
    photoShow.mask = photoShow[0].append("div", "pop-backdrop fade in");
    photoShow.main = photoShow[0].append("div", "photoShowOutline");

	photoShow.each(function (i) {
        var main = photoShow.main.append("div", "photoShow");
        var close = main.append("div", "photoShowClosed");
        $([close, photoShow.mask]).click(function () {
            photoShow.fadeOut(150);
            document.body.style.overflow = "";
        })
        photoShow.img = main.append("div", "photoShow-photoBox").append("img", { src: "" });
        var img = $(photoShow.img);
        img.ready(function () {
            img.show(1);
        })
        img.hide();
        main.append("div", "cb");
    }).hide();
    document.body.appendChild(photoShow[0]);
}
function getPageSize() {
    var scrW, scrH;
    if (window.innerHeight && !isNaN(window.scrollMaxY)) {
        // Mozilla
        scrW = window.innerWidth + window.scrollMaxX;
        scrH = window.innerHeight + window.scrollMaxY;
    } else if (document.body.scrollHeight > document.body.offsetHeight) {
        // all but IE Mac
        scrW = document.body.scrollWidth;
        scrH = document.body.scrollHeight;
    } else if (document.body) { // IE Mac
        scrW = document.body.offsetWidth;
        scrH = document.body.offsetHeight;
    }

    var winW, winH;
    if (window.innerHeight) { // all except IE
        winW = window.innerWidth;
        winH = window.innerHeight;
    } else if (document.documentElement
        && document.documentElement.clientHeight) {
        // IE 6 Strict Mode
        winW = document.documentElement.clientWidth;
        winH = document.documentElement.clientHeight;
    } else if (document.body) { // other
        winW = document.body.clientWidth;
        winH = document.body.clientHeight;
    }

    // for small pages with total size less then the viewport
    var pageW = (scrW < winW) ? winW : scrW;
    var pageH = (scrH < winH) ? winH : scrH;

    var showW = document.body.offsetWidth;
    var showH = document.body.offsetHeight;

    return { PageW: pageW, PageH: pageH, WinW: winW, WinH: winH, ShowW: showW, ShowH: showH };
}

// 清洗跨站
// 个性签名、
function transInnerHTML(innerHTML) {
    var div = $.tag("div");
    div.appendChild(document.createTextNode(innerHTML.replace(/^ *| *$/g, "")));
    return div.innerHTML;
}

/*
*	NO3: win.js
*/

/**
 * 基础窗口对象，包括mask,x,标题,关闭和打开方法
 * @param option
 * content:需要放在窗体中的内容对象
 * title:窗体标题
 * footer: 放在页脚中的内容
 * @returns win窗体
 * win.show()显示窗体 win.hide()隐藏窗体
 */
function baseWin(option) {
    var win = $.tag("div", "pop hack-pop");
    var mask = win.append("div", "pop-backdrop fade in");
    win.mask = mask;
    var main = win.append("div", "pop-dialog pop-form").append("div", "pop-modal-content");
    var head = main.append("div", "pop-modal-header");
    var close = head.append("button", "close");
    close.append("i", "fa fa-close");
    close.append("span", {
        className: "sr-only",
        innerHTML: "Close"
    });
    var title = head.append("h4", {className: "modal-title", innerHTML: option.title || ""});
    var content = main.append("div", "pop-form-horizontal");
    if (option.content) {
        win.content = content.appendChild(option.content);
    }
    if (option.footer) {
        win.footer = main.append("div", "pop-modal-footer");
        win.footer.appendChild(option.footer);
    }
    if (typeof option.close === 'function') {
        win.close = option.close;
    }
    win.config = function (option) {
        title.innerHTML = option.title;
        content.innerHTML = "";
        content.appendChild(option.content);
    };
    win.u = $(win);

    document.body.appendChild(win);
    win.show = function (time, callback) {
        //win.preventDefault.init(document.body, !0);
        document.body.style.overflow = 'hidden';
        win.u.fadeIn(time || 200, callback);
    };
    win.hide = function (time, callback) {
        //win.preventDefault.init(document.body, !1);
        document.body.style.overflow = 'auto';
        win.u.fadeOut(time || 200, callback);
    };
    win.u.hide();
    if(option.stay){
        $(close).click(function () {
            win.hide();
            win.close && win.close();
        });
    }else {
        $([mask, close]).click(function () {
            win.hide();
            win.close && win.close();
        });
    }

    // Preven Default Event. 2017年2月14日 maomao
    win.preventDefault = {
        ie: function(){
            //计算鼠标滚轮滚动的距离
            //一格3行，每行40像素，所以除以120
            // var v = event.wheelDelta/120;
            // dom.innerHTML = dom.innerHTML*1+v;
            //阻止浏览器默认方法
            return false;
        },
        ff: function(e){
            //计算鼠标滚轮滚动的距离
            // var v = e.wheelDelta/120;
            // dom.innerHTML = dom.innerHTML*1+v;
            //阻止浏览器默认方法
            e.preventDefault();
        },
        other: function(e){
            //计算鼠标滚轮滚动的距离
            //一格是3行，但是要注意，这里和像素不同的是它是负值
            // var v = -e.detail/3;
            // dom.innerHTML=dom.innerHTML*1+v;
            //阻止浏览器默认方法
            e.preventDefault();
        },
        init: function (dom, bool) {
            //判断浏览器
            var isIE = navigator.userAgent.match(/MSIE (\d)/i);
            isIE = isIE? isIE[1]: undefined;
            var isFF = /FireFox/i.test(navigator.userAgent);
            if (bool) { // apply
                //鼠标滚轮事件
                if(isIE < 9) { //传统浏览器使用MouseWheel事件
                    dom.attachEvent("onmousewheel", win.preventDefault.ie);
                } else if(!isFF) { //除火狐外的现代浏览器也使用MouseWheel事件
                    dom.addEventListener("mousewheel", win.preventDefault.ff, false);
                } else {//奇葩的火狐使用DOMMouseScroll事件
                    dom.addEventListener("DOMMouseScroll", win.preventDefault.other, false);
                }
            } else { // close
                //鼠标滚轮事件
                if(isIE < 9) { //传统浏览器使用MouseWheel事件
                    dom.detachEvent("onmousewheel", win.preventDefault.ie);
                } else if(!isFF) { //除火狐外的现代浏览器也使用MouseWheel事件
                    dom.removeEventListener("mousewheel", win.preventDefault.ff, false);
                } else {//奇葩的火狐使用DOMMouseScroll事件
                    dom.removeEventListener("DOMMouseScroll", win.preventDefault.other, false);
                }
            }
        },
    };
    return win;
}
/**
 * 由基础窗体生产的表单框
 * @param option
 * data:
 [
 {title: "aa", attr: {}, type: "input", name: "a", value: "2",necessary: true},
 {type: "customize", item: obj},
 {title: "aa", type: "select", name: "a", selected: 1, value: [{title: "a", value:"1"}]}
 ],
 *
 * @returns {win窗体}
 */
function formWin(option) {
    option = $.extend(true, {
        title: "",
        data: null,
        confirm: "确定",
        cancel: "取消",
        callback: {
            confirm: function () {
            },
            cancel: function () {
            }
        }
    }, option);

    var content = $.tag("div", "pop-group");
    var main = content.append("div", "form-group");
    //表单类型工厂
    var factory = {
        input: function (d) {
            var item = $.tag("div", "input-group");
            item.label = item.append("label", {
                className: "label-control",
                innerHTML: d.title
            });
            item.value = item.append("input", {
                type: "text",
                name: d.name,
                value: d.value,
                className: "input-control"
            });
            item.value.tips = $(item.append("p", "form-tips-waring")).hide();
            $.updateObject(d.attr, item.value);
            return item;
        },
        textarea: function (d) {
            var item = $.tag("div", "textarea-group");
            item.label = item.append("label", {
                className: "label-control",
                innerHTML: d.title
            });
            item.value = item.append("textarea", {
                name: d.name,
                value: d.value,
                className: "textarea-control"
            });
            item.value.tips = $(item.append("p", "form-tips-waring")).hide();
            $.updateObject(d.attr, item.value);
            return item;
        },
        select: function (d) {
            var item = $.tag("div", "select-group");
            item.label = item.append("label", {
                className: "label-control",
                innerHTML: d.title
            });
            var outer = item.append("div", "select-control-02");
            item.text = outer.append("p", {
                innerHTML: d.data[d.selected] ? d.data[d.selected].title : "请选择"
            });
            outer.append("span", "dlr fa fa-angle-down fa-lg");
            $(outer).click(function (e) {
                $.breakEvent(e);
                menu.show();
                $(document.body).bind("click", hideMenu);
            });
            item.value = outer.append("input", {
                type: "hidden",
                name: d.name
            });
            var menu = outer.append("ul", "drop-box");
            item.option = [];
            item.menu = menu;
            for (var i = 0; i < d.data.length; i++) {
                item.option.push(menu.append("li", {
                    className: "result-option",
                    innerHTML: d.data[i].title,
                    value: d.data[i].value
                }));
            };
            function hideMenu(){
                menu.hide();
            }
            function selectOption(o) {
                if(item.selected) {
                    $(item.selected).removeClass("on");
                }
                item.text.innerHTML = o.innerHTML;
                item.value.value = o.value;
                $(o).addClass("on");
                item.selected = o;
                hideMenu();
            }
            menu = $(menu).hide().delegate("li", "click", function(e){
                $(document.body).unbind("click", hideMenu);
                selectOption(this);
                $.breakEvent(e);
            });
            if(item.option[d.selected])
                selectOption(item.option[d.selected]);
            return item;
        },
        customize: function (d) { //自定义节点
            return d.item;
        }
    };
    var module = {}; //所有生成之后的交互对象，会绑定到窗体对象
    for (var key in factory) { //根据交互对象类型进行分类
        module[key] = {};
    }

    for (var i = 0; i < option.data.length; i++) {
        var d = option.data[i];
        var item = factory[d.type](d);
        if(item.label && d.necessary) {
            item.label.className += " necessary";
        }
        item.value.root = item;
        module[d.type][d.name] = item.value;
        main.appendChild(item);
    }

    var footer = document.createDocumentFragment();
    if (option.confirm) {
        var confirm = footer.appendChild($.tag("button", {
            className: "btn btn-primary",
            innerHTML: option.confirm
        }));
        $(confirm).click(function () {
            if (option.callback.confirm() !== false) {
                win.hide();
            }

        });
    }
    if (option.cancel) {
        var cancel = footer.appendChild($.tag("button", {
            className: "btn btn-default",
            innerHTML: option.cancel
        }));
        $(cancel).click(function () {
            if (option.callback.cancel() !== false) {
                win.hide();
            }
        });
    }

    var win = baseWin({
        title: option.title,
        content: content,
        footer: footer
    });
    win.module = module;
    return win;
}
/**
 * 由基础窗体生产的提示框
 * @param option
 * @returns {win窗体}
 */
function tipsWin(option) {
    option = $.extend(true, {
        title: "",
        text: "",
        confirm: "确定",
        cancel: "取消",
        callback: {
            confirm: function () {
            },
            cancel: function () {
            }
        }
    }, option);
    var content = $.tag('div', {
        className: 'm100 tc',
        innerHTML: option.text,
        style: {
            lineHeight: '100px',
            fontSize: '16px'
        }
    });

    var footer = document.createDocumentFragment();
    if (option.confirm) {
        var confirm = footer.appendChild($.tag("button", {
            className: "btn btn-primary",
            innerHTML: option.confirm
        }));
        $(confirm).click(function () {
            if (option.callback.confirm() !== false) {
                win.hide();
            }

        });
    }
    if (option.cancel) {
        var cancel = footer.appendChild($.tag("button", {
            className: "btn btn-default",
            innerHTML: option.cancel
        }));
        $(cancel).click(function () {
            if (option.callback.cancel() !== false) {
                win.hide();
            }
        });
    }
    var win = baseWin({
        title: option.title,
        content: content,
        footer: footer
    });
    return win;
}
/**
 * 由基础窗体生产的删除框
 * @param option
 * @returns {win窗体}
 */
function delWin(option) {
    option = $.updateObject(option, {
        title: "",
        content: "",
        key: "delete",
        del: {
            text: "", //删除按钮上的文字
            placeholder: ""
        },
        callback: {
            del: function () {
            }
        }
    });
    var module = {};
    var content = document.createDocumentFragment().appendChild($.tag("div", "pop-group row"));
    content.append("div", "form-group ng-scope")
        .append("label", "col-sm-12 control-label tl")
        .append("span", {
            className: "ng-binding",
            innerHTML: option.content
        });
    content.append("div", "pop-imgReplace");
    var footer = document.createDocumentFragment();
    var btnDel = footer.appendChild($.tag("button", {
        className: "btn btn-danger",
        innerHTML: option.del.text
    }));
    $(btnDel).click(function () {
        var o = this;
        if (!o.ready) {
            o.ready = true;
            win.footer.className = "pop-modal-footer delete-control";
        }
        else {
            del();
        }
    });

    var input = footer.appendChild($.tag("input", {
        placeholder: option.del.placeholder
    }));
    module.input = input;
    $(input).bind("keydown", function (e) {
        if (e.keyCode == 13)
            del();
    });
    function del() {
        var reg = new RegExp("^ *" + option.key + " *$", "ig");
        if (reg.test(input.value)) {
            option.callback.del();
        }
        else {
            input.select();
        }
    }

    var win = baseWin({
        title: option.title,
        content: content,
        footer: footer
    });
    win.footer.className += " delete-control allow";
    win.module = module;
    return win;
}
/**
 * 由基础窗体生产的搜索框
 * @param option
 * @returns {win窗体}
 */
function searchWin(option) {
    option = $.updateObject(option, {
        input: {
            label: "",  //输入框标题
            placeholder: ""
        },
        callback: {
            keydown: function () {
            },
            search: function () {
            } //回车与点击搜索都会触发
        }
    });
    var search = $.tag("div", "pop-group");
    var item = search.append("div", "search-group pop-search");
    var title = item.append("div", "input-group");
    var searchBtn = title.append("i", "fa fa-search");
    $(searchBtn).click(function () {
        if (!win.loading) {
            win.loading = true;
            option.callback.search({result: result, value: value.value});
        }
    })
    var value = title.append("input", {
        type: "text",
        className: "input-control",
        placeholder: option.input.placeholder,
        maxLength: 30
    });
    $(value).keydown(function (e) {
        option.callback.keydown({event: e, result: result, value: value.value});
        if (e.keyCode == 13 && !win.loading) {
            win.loading = true;
            option.callback.search({result: result, value: value.value});
        }
    });
    var result = item.append("ul", {
        className: "drop-box",
        style: {
            display: "none"
        }
    });
    var win = baseWin({
        title: option.input.label,
        content: search
    });
    return win;
}

/*
*	NO4: tips.js
*
*   update Name: wangjun
*   update Time: 2016-8-9
*   tips.show 确定和取消按钮逻辑错误
*
*/

var Tips = function () {
    var root = this;
    var outer = $.tag("div");
    $(outer).hide();
    outer.style.position = "fixed";
    // document.body.appendChild(outer);//new
    $(document.body).append(outer);
    var main = outer.append("div");
    var control = outer.append("div","tc mt10");
    this.close = function () {
        $(outer).fadeOut(200);
    }

    this.show = function (config, callback) {
        var options = {
            type: "tips",
            outer: "tipspop",
            pop: "popshow-", //
            img: "<span class=\"mr5\"></span>", //
            text: "",
            autoHide: true,
            confirm: false,
            cancel: false,
            callback: {
                confirm: function () {
                    return true;
                },
                cancel: function () {
                }
            }
        }
        $.updateObject(config, options);
        outer.className = options.outer;
        //main.className = "popchoice-" + options.type;
        main.className = options.pop + options.type; //
        //main.innerHTML = options.text;
        main.innerHTML = options.img + options.text; //
        $(outer).show()
        .css({ left: ($(window).width() - outer.offsetWidth) / 2, top: ($(window).height() - outer.offsetHeight) / 2 })
        .hide()
        .fadeIn(200);
        outer.style.zIndex = 2000;

        if (options.autoHide) {
            setTimeout(function () {
                root.close();
                if(callback)callback();
            }, 2000)
        }
        if (options.confirm !== false) {
            //outer.className += " pop-big pop-temporary"//临时
            if (!outer.confirm) {
                var confirm = outer.confirm = control.append("div", "btn-primary btn btn-sm mr10");
                confirm.innerHTML = options.confirm;
                $(confirm).click(function () {
                    if (options.callback.confirm() !== false) {
                        root.close();
                    }
                })
            }
        }
        else {
            if (outer.confirm) {
                control.removeChild(outer.confirm);
                outer.confirm = null;
            }
        }
        if (options.cancel !== false) {
            if (!outer.cancel) {
                var cancel = outer.cancel = control.append("div", "btn btn-default btn-sm");
                cancel.innerHTML = options.cancel;
                $(cancel).click(function () {
                    options.callback.cancel();
                    root.close();
                })
            }
        }
        else {
            if (outer.cancel) {
                control.removeChild(outer.cancel);
                outer.cancel = null;
            }
        }
    }
}

var Dialog = function () {
    var root = this;
    this.dialog = { confirm: null, input: null };
    var createValue = {
        input: function (value) {
            var input = $.tag("input", "form-control ng-pristine ng-invalid ng-invalid-required ng-valid-pattern");
            input.type = "text";
            input.value = value;
            return input;
        },
        textarea: function (value) {
            var textarea = $.tag("textarea", "form-control ng-pristine ng-invalid ng-invalid-required");
            textarea.style.height = "100px";
            textarea.value = value;
            return textarea;
        },
        label: function (value) {
            var label = $.tag("label", {
                className: "control-label ng-binding",
                innerHTML: value
            });
            label.style.cssText += "text-indent:2em;text-align:left;";
            return label;
        },
        bool: function (value) {
            //value = {"true": {title:"aa", vlaue: 1, checked: true}, false: {title: "bb", value:0}}
            var checked = value["true"].checked ? "true" : "false";
            var t = $.tag("div", {
                className: "btn btn-default",
                innerHTML: value["true"].title
            });
            t.name = "true";
            t.value = value["true"].value;
            var f = $.tag("div", {
                className: "btn btn-default",
                innerHTML: value["false"].title
            });
            f.value = value["false"].value;
            f.name = "false";
            var data = {
                "true": t,
                "false": f,
                value: $.tag("input")
            }
            data.value.type = "hidden";
            data.value.value = value[checked].value;
            data[checked].className = "btn btn-primary";
            $([t, f]).click(function () {
                data[checked].className = "btn btn-default";
                checked = this.name;
                data[checked].className = "btn btn-primary";
                data.value.value = this.value;
            })
            return data;
        },
        select: function (value) {
            //value = [{title:"aa", value: "11", checked: true}]
            var select = $.tag("select", "form-control ng-pristine ng-valid");
            for (var i = 0; i < value.length; i++) {
                var option = select.append("option", { className: "ng-binding", innerHTML: value[i].title });
                option.value = value[i].value;
                if (value[i].selected) {
                    option.selected = value[i].selected;
                    select.selectedIndex = i;
                }
            }
            return select;
        }

    }
    var dialog = {
        confirm: function (options) {
            if (root.dialog.confirm)
                document.body.removeChild(root.dialog.confirm);
            var win = createOuter(options);
            win._text = win.body.append("div", "form-group ng-scope").append("div", "col-sm-12")
            .append("span", "ng-binding");
            root.dialog.confirm = win;
        },
        input: function (options) {
            if (root.dialog.input)
                document.body.removeChild(root.dialog.input);
            var win = createOuter(options);
            win.data = {};
            win.titles = {};
            for (var i = 0; i < options.data.length; i++) {
                var item = win.body.append("div", "simple-form-field ng-scope ng-isolate-scope")
                .append("div", "form-group ng-scope");

                var title = item.append("div", "col-sm-3 control-label");
                if (options.data[i].nesscery) {
                    title.append("span", { className: "text-danger ng-binding", innerHTML: "*" });
                }
                title.append("span", { className: "ng-binding", innerHTML: options.data[i].title });
                win.titles[options.data[i].name] = options.data[i].title;

                var body = item.append("div", "col-sm-8");
                options.data[i].value = options.data[i].value || "";
                var value = createValue[options.data[i].type](options.data[i].value);
                if (value.tagName == undefined) {
                    for (var key in value) {
                        body.appendChild(value[key]);
                    }
                    value = value.value;
                }
                else {
                    body.appendChild(value);
                    body.style.position = "realative";
                    value.error = body.appendChild($.tag("div", "errorTips"));
                    value.error.style.cssText += 'position:absolute;right:0;display:block';
                    for (var key in options.data[i].callback) {
                        value["on" + key] = options.data[i].callback[key];
                    }
                }

                if (options.data[i].name) {
                    value.name = options.data[i].name;
                    win.data[value.name] = value;
                }


                if (options.data[i].tips) {
                    body.append("div", { className: "help-block ng-scope ng-binding ng-hide", innerHTML: options.data[i].tips });
                }
            }
            root.dialog.input = win;
        }
    }
    function createOuter(options) {
        var win = $.tag("div", "w-pop-wrap");
        win.options = {
            confirm: "确定",
            cancel: "取消",
            title: "",
            text: "",
            callback: {
                confirm: function () { },
                build: function () { },
                cancel: function () { }
            },
            hiddenData: [], //[{name:"aaa", value:""}]
            data: []//[{ title: "aa", nesscery: true, name: "aa", tips: "bbb", type:"input", value: ""}]
        }
        options = $().updateObject(options, win.options);
        win.closeTrigger = [];

        win.mask = win.append("div", "w-pop-alpha");
        win.closeTrigger.push(win.mask);

        var main = win.append("div", "w-pop");
        win.head = main.append("div", "w-pop-hd");
        win.x = win.head.append("span", "w-pop-close fa fa-close J_btnClose");
        win.closeTrigger.push(win.x);
        win._title = win.head.append("text");
        win.body = main.append("div", "w-pop-bd form-horizontal ng-invalid ng-invalid-required");
        if (options.hiddenData.length > 0) {
            win.hiddenData = {};
            for (var i = 0; i < options.hiddenData.length; i++) {
                var hidden = win.body.append("input");
                hidden.type = "hidden";
                hidden.name = options.hiddenData[i].name;
                hidden.value = options.hiddenData[i].value || "";
                win.hiddenData[hidden.name] = hidden;
            }
        }

        var foot = main.append("div", "w-pop-ft w-pop-btn");
        win.confirm = foot.append("a", { className: "btn btn-primary", innerHTML: win.options.confirm });
        if (options.cancel !== false) {
            win.cancel = foot.append("a", { className: "btn btn-default", innerHTML: win.options.cancel });
            win.closeTrigger.push(win.cancel);
        }
        document.body.appendChild(win);
        win.utils = $(win).opacity(0).css("display", "none");
        appendCloseEvent(win);
        win.close = function (o) {
            o = o || win;
            o.utils.hide(200);
            document.body.style.overflow = "";
        }
        return win;
    }
    function appendCloseEvent(win) {
        $(win.closeTrigger).click(function () {
            win.close(win);
            win.options.callback.cancel();
        })
    }
    function confirmEvent(win) {
        if (win.options.callback.confirm() !== false) {
            win.close(win);
        }
    }
    this.confirm = function (options, reload) {
        if (!root.dialog.confirm || reload !== false) {
            dialog.confirm(options);
            if (options.callback) {
                root.dialog.confirm.confirm.onclick = function () {
                    confirmEvent(root.dialog.confirm);
                };
            }
            root.dialog.confirm._title.innerHTML = root.dialog.confirm.options.title;
            root.dialog.confirm._text.innerHTML = root.dialog.confirm.options.text;
            root.dialog.confirm.options.callback.build(root.dialog.confirm);
        }
        root.dialog.confirm.utils.fadeIn(200);
    }
    this.input = function (options, reload) {
        if (!root.dialog.input || reload !== false) {
            dialog.input(options);
            if (options.callback) {
                root.dialog.input.confirm.onclick = function () {
                    confirmEvent(root.dialog.input);
                }
            }
            root.dialog.input._title.innerHTML = root.dialog.input.options.title;
            root.dialog.input.options.callback.build(root.dialog.input);
        }
        root.dialog.input.utils.fadeIn(200);
    }
}

function SrcDialog() {
    var root = this;
    this.dialog = { confirm: null, input: null };
    var createValue = {
        input: function (value, placeholder) {
            var input = $.tag("input", "form-control");
            input.type = "text";
            input.value = value;
            if (placeholder) input.placeholder = placeholder;
            return input;
        },
        password: function (value, placeholder) {
            var input = $.tag("input", "form-control");
            input.type = "password";
            input.value = value;
            if (placeholder) input.placeholder = placeholder;
            return input;
        },
        textarea: function (value, placeholder) {
            var textarea = $.tag("textarea", "form-control");
            //textarea.style.height = "300px";
            textarea.value = value;
            if (placeholder) textarea.placeholder = placeholder;
            return textarea;
        },
        tips: function (value) {
            //value = {type: success, text: ""}
            var type = {
                success: function (text) {
                    var tips = $.tag("div", "alert alert-success");
                    tips.append("div", "clearfix").append("div", { className: "console-global-notice-content ng-binding", innerHTML: text });
                    return tips;
                }
            }
            return type[value.type](value.text);
        },
        label: function (value) {
            var label = $.tag("label", {
                className: "control-label ng-binding",
                innerHTML: value
            });
            label.style.cssText += "text-indent:2em;text-align:left;";
            return label;
        },
        captcha: function (value) {
            //value = {src: "", value:"", Captcha:""}
            var row = $.tag("div", "row");
            var code = row.append("span", "col-xs-6 col-sm-2").append("input", {
                className: "form-control",
                value: value.value,
                type: "text"
            });
            $(code).blur(function () {
                data.value.value = code.value;
            })
            var img = row.append("span", "col-xs-6 col-sm-3").append("img", {
                border: 0,
                src: value.Captcha + "?" + Math.random()
            });
            $(img).click(function () {
                img.refresh();
                //                (new Ajax).get(value.Captcha, "", function (data) {
                //                    data = eval("(" + data + ")");
                //                    img.src = data.Captcha;
                //                })


            });
            img.refresh = function () {
                (new Ajax).get(value.Captcha, "", function (data) {
                    data = eval("(" + data + ")");
                    img.src = data.Captcha;
                })
            }
            img.refresh();
            var data = {
                value: $.tag("input", {
                    type: "hidden"
                }),
                row: row
            };
            data.value.img = img;
            return data;
        },
        radio: function (value) {
            //value = [{title:"aa", vlaue: 1, checked: true}, {title: "bb", value:0}]
            var data = {}, radio = [];
            var checked;
            for (var i = 0; i < value.length; i++) {
                var item = $.tag("div", {
                    className: "radio-box fl",
                    title: value[i].title
                });
                item.radio = item.append("span", "la-crbox");
                item.append("text", { innerHTML: value[i].title });
                item.value = value[i].value;
                data[i] = item;
                item.i = i;
                radio.push(item);
            }
            radio = $(radio).click(function () {
                var i = this.i, o = this;
                if (radio.checked != i) {
                    radio[radio.checked].radio.className = "la-crbox";
                    radio.checked = i;
                    radio[radio.checked].radio.className = "la-crbox sel";
                    data.value.value = o.value;
                }
            })
            for (var i = 0; i < value.length; i++) {
                if (value[i].checked) {
                    radio.checked = i;
                    break;
                }
            }
            radio.checked = radio.checked || 0;
            radio[radio.checked].radio.className = "la-crbox sel";

            data.value = $.tag("input", {
                value: radio[radio.checked].value,
                type: "hidden"
            });
            return data;
        },
        select: function (value) {
            var select = $.tag("div", "select-simple drop-list update-p");
            select.value = 0;
            var options = {};
            for (var i = 0; i < value.length; i++) {
                if (value[i].checked) {
                    select.value = i;
                }
                options[value[i].title] = value[i].value;
            }
            selector(select)[0].setOptions(options);
            return select;
        }
    }
    var operate = {
        typeInConfirm: function (win) {
            var foot = win.foot;
            var options = win.options;
            foot.className = "pop-modal-footer delete-control allow";
            win.operate["typeInConfirm"] = {};
            win.operate["typeInConfirm"]["btn"] = foot.append("button", {
                className: options.operate.typeInConfirm["className"],
                innerHTML: options.operate.typeInConfirm["title"]
            });
            win.operate["typeInConfirm"]["input"] = foot.append("input", {
                placeholder: "请输入“" + options.operate.typeInConfirm["input"] + "”以确认"
            });
            $(win.operate["typeInConfirm"]["btn"]).click(function () {
                var o = this;
                if (!o.checked) {
                    o.checked = true;
                    foot.className = "pop-modal-footer delete-control";
                }
                else {
                    if (win.operate["typeInConfirm"]["input"].value.toLowerCase() == options.operate.typeInConfirm["input"].toLowerCase()) {
                        if (options.callback.confirm() != false) {
                            win.close(win);
                        }
                    }
                }
            })
        }
    }
    var dialog = {
        confirm: function (options) {
            if (root.dialog.confirm)
                document.body.removeChild(root.dialog.confirm);
            var win = createOuter(options);
            win._text = win.body.append("div", "form-group ng-scope").append("div", "col-sm-12 control-label tl")
            .append("span", "ng-binding");
            root.dialog.confirm = win;
        },
        input: function (options) {
            if (root.dialog.input)
                document.body.removeChild(root.dialog.input);
            var win = createOuter(options);
            win.data = {};
            win.titles = {};

            for (var i = 0; i < options.data.length; i++) {
                var item = win.body.append("div", "pop-form-input col-xs-12");

                var title = item.append("div", "pop-group-left col-sm-2");
                if (options.data[i].nesscery) {
                    title.append("span", {
                        className: "text-danger",
                        innerHTML: "*"
                    });
                }
                title.append("span", { innerHTML: options.data[i].title });
                win.titles[options.data[i].name] = options.data[i].title;

                var body = item.append("div", "pop-group-right ctl-bar col-sm-10");
                if (options.data[i].showOnly) {
                    body.className = "pop-group-right col-sm-10";
                }
                options.data[i].value = options.data[i].value || "";
                var value = createValue[options.data[i].type](options.data[i].value, options.data[i].placeholder);
                if (value.tagName == undefined) {
                    for (var key in value) {
                        body.appendChild(value[key]);
                    }
                    value = value.value;

                }
                else {
                    body.appendChild(value);
                    body.style.position = "realative";

                    for (var key in options.data[i].callback) {
                        value["on" + key] = options.data[i].callback[key];
                    }
                }
                value.error = body.appendChild($.tag("div", "alert-warn"));
                value.error.style.cssText += 'position:absolute;right:0;display:block';
                if (options.data[i].name) {
                    value.name = options.data[i].name;
                    win.data[value.name] = value;
                }


                if (options.data[i].tips) {
                    body.append("div", {
                        className: "help-block ng-scope ng-binding ng-hide",
                        innerHTML: options.data[i].tips
                    });
                }
            }
            root.dialog.input = win;
        }
    }
    function createOuter(options) {


        options = $.updateObject(options, {
            confirm: "确定",
            cancel: "取消",
            title: "",
            text: "",
            type: "",
            callback: {
                confirm: function () { return true },
                build: function () { }
            },
            operate: {
                typeInConfirm: undefined
            },
            hiddenData: [], //[{name:"aaa", value:""}]
            data: []//[{ title: "aa", nesscery: true, name: "aa", tips: "bbb", type:"input", value: ""}]
        });
        var win = $.tag("div", "pop " + options.type);
        win.options = options;
        win.closeTrigger = [];

        win.mask = win.append("div", "pop-backdrop fade in");
        win.closeTrigger.push(win.mask);


        var main = win.append("div", "pop-dialog pop-form").append("div", "pop-modal-content");
        $(main).bind("touchstart", function (e) {
            e = e || window.event;
            main.Y = e.touches[0].clientY;
            main.y = parseInt(main.style.marginTop || 0);
        }).bind("touchmove", function (e) {
            e = e || window.event;
            var Y = main.y - main.Y + e.touches[0].clientY
            if (Y >= 0) {
                Y = 0
            }
            else if (Y <= getPageSize().WinH - main.offsetHeight - 26) {
                Y = getPageSize().WinH - main.offsetHeight - 26;
            }
            main.style.marginTop = Y + "px";
        });
        win.head = main.append("div", "pop-modal-header");
        win.x = win.head.append("button", "close");
        win.x.append("i", "fa fa-close");
        win.x.append("span", {
            className: "sr-only",
            innerHTML: "Close"
        });
        win.closeTrigger.push(win.x);
        win._title = win.head.append("h4", "modal-title");
        var bodyOuter = main.append("div", "pop-form-horizontal");
        win.body = bodyOuter.append("div", "pop-group row")
        if (options.hiddenData.length > 0) {
            win.hiddenData = {};
            for (var i = 0; i < options.hiddenData.length; i++) {
                var hidden = win.body.append("input");
                hidden.type = "hidden";
                hidden.name = options.hiddenData[i].name;
                hidden.value = (options.hiddenData[i].value !== undefined ? options.hiddenData[i].value : "");
                win.hiddenData[hidden.name] = hidden;
            }
        }
        bodyOuter.append("div", "pop-imgReplace");

        var foot = main.append("div", "pop-modal-footer");
        win.foot = foot;
        win.operate = {};
        if (options.operate.typeInConfirm) {
            for (var key in options.operate) {
                if (operate[key]) {
                    operate[key](win);
                }
            }
        }
        else {
            if (options.confirm != false) {
                win.confirm = foot.append("button", {
                    className: "btn btn-primary",
                    innerHTML: win.options.confirm
                });
            }
            if (options.cancel != false) {
                win.cancel = foot.append("button", {
                    className: "btn btn-default",
                    innerHTML: win.options.cancel
                });
                win.closeTrigger.push(win.cancel);
            }
        }
        document.body.appendChild(win);
        win.utils = $(win).hide();
        appendCloseEvent(win);
        win.close = function (o) {
            o = o || win;
            o.utils.fadeOut(200);
            document.body.style.overflow = "";
        }
        return win;
    }
    function appendCloseEvent(win) {
        $(win.closeTrigger).click(function () {
            win.close(win);
        })
    }
    function confirmEvent(win) {
        if (win.options.callback.confirm() !== false) {
            win.close(win);
        }
    }
    this.confirm = function (options, reload) {
        if (!root.dialog.confirm || reload !== false) {
            dialog.confirm(options);
            if (root.dialog.confirm.confirm) {
                root.dialog.confirm.confirm.onclick = function () {
                    confirmEvent(root.dialog.confirm);
                };
            }
            root.dialog.confirm._title.innerHTML = root.dialog.confirm.options.title;
            root.dialog.confirm._text.innerHTML = root.dialog.confirm.options.text;
            root.dialog.confirm.options.callback.build(root.dialog.confirm);
        }
        root.dialog.confirm.utils.fadeIn(200);
    }
    this.input = function (options, reload) {
        if (!root.dialog.input || reload !== false) {
            dialog.input(options);
            if (options.callback) {
                root.dialog.input.confirm.onclick = function () {
                    confirmEvent(root.dialog.input);
                }
            }
            root.dialog.input._title.innerHTML = root.dialog.input.options.title;
            root.dialog.input.options.callback.build(root.dialog.input);
        }
        document.body.style.overflow = "hidden";
        root.dialog.input.utils.fadeIn(200);
    }
}

$().ready(function () {
    if (!window.tips) {
    window.tips = new Tips();
    }
    if (!window.srcDialog) {
    window.srcDialog = new SrcDialog();
    }
    if (!window.dialog) {
    window.dialog = new Dialog();
    }
});

/*
 * 服务器报错提示
 */
function netError(xhr){
    if(xhr.responseJSON){
        tips.show({text:'['+xhr.status+']'+xhr.responseJSON.err_name+"："+xhr.responseJSON.err_msg});
    }
    else{
        tips.show({text:'['+xhr.status+']服务器异常'});
    }
}
//直播间房间号
function rid(callback){
    var rid = $.queryString('id');
    rid && ( rid = rid.substr( 0, 6 ) );
    $.ajax({
        type: 'GET',
        url: '/api/bklive/rid',
        dataType: 'json',
        data: {
            rid: rid
        },
        success: function ( data, textStatus, xhr ) {
            if ( xhr.status == 200 ) {
                if(callback && typeof callback == 'function'){
                    callback(data.id);
                }
                return data.id;
            }
        },
        error: function ( xhr, textStatus, errorThrown ) {
            if ( xhr.status == 406 ) {
                tips.show( {
                    text: xhr.responseJSON.err_msg
                } );
                setTimeout(function(){
                    location.href = '/';
                },2000)
            }
            return '';
        }
    });
}
/*直播间addHeader*/
function addLiveHeader(request){
    request.setRequestHeader("x-client-id","user-web");
    if($.cookie("LIVEAUTH")!=null)
        request.setRequestHeader("authorization-live","Bearer "+$.cookie("LIVEAUTH"));
}
