/*
 * 统计注入代码，用于霓裳等外部站点注入
 * 需要有全局配置window.statConf = { guid: 'guid', siteid: 'siteid', pageid: 'pageid' };
 *
 * @Author:             jiangsongfang
 * @Date:               2017-01-11 16:32:57
 * @Last Modified by:   jiangsongfang
 * @Last Modified time: 2017-02-10 11:55:33
 */
(function() {
    var logStart = new Date().getTime();
    var pvid = logStart + '' + getRandom();
    var pvTrace = 0;
    var bsmlChannel = null;
    var bsmlCuid = '';
    var host = 'https://isite.baidu.com/v.gif';
    var barTypes = {
        tel: 1,
        sms: 1,
        msg: 1,
        book: 1
    };

    /**
     * 获取channel_id
     *
     * @return {string}
     */
    function getChannel() {
        if (bsmlChannel) {
            return bsmlChannel;
        }

        bsmlChannel = '';
        var qs = location.search.replace('?', '').split('&');
        qs.forEach(function(q, i) {
            var param = q.split('=');
            if (param[0] === 'channel_id') {
                bsmlChannel = param[1];
                return false;
            }
        });
        return bsmlChannel;
    }

    /**
     * 设置cookie值
     * @var name {string}
     * @var value {string}
     */
    function setCookie(name, value) {
        var days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + days * 24 * 3600 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    }

    /**
     * 获取cookie值
     *
     * @var name {string}
     * @return {string}
     */
    function getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) {
            return unescape(arr[2]);
        }
        return null;
    }

    /**
     *
     * 异步请求
     * @param {Object} parm 请求参数
     * @param {string} url 接口url
     * @param {string} type 请求方式
     */
    function jsonpFun (url){
        try{
            var script = document.createElement('script');
            var done = false;
            script.type = 'text/javascript';
            script.onload = script.onreadystatechange = function() {
                if ( !done && (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') ) {
                    done = true;
                    script.onload = script.onreadystatechange = null;
                    if ( script && script.parentNode ) {
                        script.parentNode.removeChild( script );
                    }
                }
            };
            script.src = url;
            document.getElementsByTagName('head')[0].appendChild(script);

        }
        catch (e) {}
    }

    /**
     *
     * 初始化cookie信息
     */
    function initCookie() {
        var pageinfo = window.statConf || {};
        var referrer = document.referrer;
        var siteid = pageinfo.siteid;
        //jsonpFun(''
        //    + 'https://isite.baidu.com/feedflow/page/setPageClickInfo?'
        //    + 'siteid=' + siteid
        //    + '&referer=' + encodeURIComponent(referrer)
        //);
    }
    /**
     *
     * 异步请求
     * @param {number} intProdId 系统分配的值。2：店铺装修团队；3：nichang团队
     * @param {number} intClueType 线索类型，其值由系统分配。 1：表单提交 0：拨打电话 2：在线咨询
     * @param {object} objJsonValue 提交数据
     * @param {function} 回调函数
     * @return {boolean} true 请求成功 ，false 请求失败
     */
    function addClue(intProdId, intClueType, objJsonValue, fn) {
        var pageinfo = window.statConf || {};
        var jsonval = '';
        if (intClueType === 1) {
            var arr = [];
            var i = 0;
            for (var p in objJsonValue) {
                arr.push('jsonval['+ i + '][name]=' + encodeURIComponent(p));
                arr.push('jsonval['+ i + '][value]=' + (encodeURIComponent(objJsonValue[p]) === 'undefined' ? '' : encodeURIComponent(objJsonValue[p])));
                i++;
            }
            jsonval = arr.join('&');
        }
        else if (intClueType === 0)
        {
            jsonval = 'jsonval[phone_num]=' + objJsonValue.phone_num;
        }
        else if (intClueType === 2)
        {
            jsonval = 'jsonval[contact_url]=' + encodeURIComponent(objJsonValue.contact_url);
        }
        jsonpFun(''
            + 'https://isite.baidu.com/feedflow/form/submit?callback=callback'
            + '&siteid=' + pageinfo.siteid
            + '&pageid=' + pageinfo.pageid
            + '&merchantid=' + pageinfo.ucid
            + '&prod=' + intProdId
            + '&type=' + intClueType
            + '&clkid=' + pvid
            + '&' + jsonval
        );
        function callback (data) {
            fn(data.data);
        }
        window.callback = callback;
    }
    window.addClue = addClue;


    /**
     * 获取cuid
     *
     * @return {string}
     */
    function getCuid() {
        if (bsmlCuid) {
            return bsmlCuid;
        }

        var cuid = getCookie('bsmlCuid');
        if (!cuid) {
            cuid = getCookie('BAIDUID');
            var code = 0;
            if (cuid) {
                cuid = getCode(cuid);
            } else {
                cuid = getRandom();
            }
            cuid = '' + new Date().getTime() + cuid;
            setCookie('bsmlCuid', cuid);
        }
        bsmlCuid = cuid;
        return bsmlCuid;
    }

    /**
     * 获取cuid标识码
     *
     * @var cuid {string}
     * @return {number}
     */
    function getCode(cuid) {
        if (!cuid || (typeof cuid !== 'string')) {
            return getRandom();
        }

        var min = 10000000;
        var code = 1;
        for (var i = 0; i < cuid.length; i++) {
            code = (code << 8) + cuid.charCodeAt(i);
            if (code > min) {
                break;
            }
        }
        if (code < min) {
            code = getRandom();
        }
        return code;
    }

    /**
     * 获取随机数
     * @return {number}
     */
    function getRandom() {
        var min = 10000000;
        var code = Math.random() * min;
        while (code < min) {
            code = code << 1;
        }
        return code;
    }

    /**
     * 获取url参数
     *
     * @param {string} name 要获取的参数名称
     * @return {string}
     */
    function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    }

    /**
     * 日志打点
     *
     * @param {string} data 打点数据
     */
    function addLog(data) {
        if (!data) {
            return;
        }
        var extraInfo = getQueryString('extra_info');
        if (extraInfo) {
            extraInfo = extraInfo.split('&');
        }
        var objPar = {};
        if (extraInfo) {
            for (var i = 0; i < extraInfo.length; i++) {
                objPar[extraInfo[i].split('=')[0]] = extraInfo[i].split('=')[1];
            }
        }
        if (typeof data === 'string') {
            data = JSON.parse(data);
        }

        var extra = data.extra ? data.extra : {};

        var pageinfo = window.statConf || {};
        var log = {
            'action_id': data.action_id ? data.action_id : 'site_comp_click',
            'action_name': data.action_name ? data.action_name : '普通组件点击',
            'guid': pageinfo.guid,
            'ucid': pageinfo.ucid || '',
            'site_id': pageinfo.siteid,
            'channel_id': getChannel(),
            'time_stamp': Math.round(new Date().getTime() / 1000),
            'page_name': pageinfo.pagename,
            'page_type': pageinfo.pagetype,
            'refer': encodeURIComponent(document.referrer),
            'url': encodeURIComponent(location.href),
            'cuid': getCuid(),
            'extra': extra,
            'page_id': pageinfo.pageid,
            'group_id': objPar['group_id'] || '',
            'idea_id': getQueryString('IDEA_ID') || '',
            'extra_idea_id': objPar['idea_id'] || ''
        };

        if (log.action_id === 'site_bar_click') {
            log.extra.type = data.type;
            if (data.id) {
                log.extra.comp_id = data.id;
            }
        } else if (log.action_id === 'site_comp_click') {
            assignCompInfo(log.extra, data);
        } else if (log.action_id === 'site_page_quit') {
            log.extra = {
                'stayed_millisecond': new Date().getTime() - logStart
            };
        }

        log.extra.pvid = pvid;
        log.extra.pvtrace = ++pvTrace;
        log.extra.micro_time = new Date().getTime();
        log.extra = JSON.stringify(log.extra);

        var params = [];
        for (var key in log) {
            params.push(key + '=' + log[key]);
        }
        var src = host + '?' + params.join('&');
        var img = new Image();
        img.src = src;
    }

    /**
     * 附加组件的信息
     *
     * @var extra {object}
     * @var data {object}
     */
    function assignCompInfo(extra, data) {
        var keys = ['comp_name', 'comp_type'];
        keys.forEach(function(key) {
            if (data[key]) {
                extra[key] = data[key];
            }
        });
    }

    /**
     * 进行转化打点
     *
     * @var type {string}
     * @var id {string}
     */
    function barLog(type, id) {
        var data = {
            'type': type,
            'id': id,
            'action_id': 'site_bar_click',
            'action_name': '转化组件点击'
        };

        addLog(data);
    }

    /**
     * check element是否有data-click埋点
     *
     * @var element {object}
     */
    function checkAttr(element) {
        if (!element) {
            return;
        }

        var data = element.getAttribute('data-click');

        if (!data) {
            return;
        }

        try {
            data = JSON.parse(data);
            var type = data.type;
            var id = data.id;
            if (type && barTypes[type]) {
                if (type === 'book') {
                    type = 'form';
                }
                barLog(type, id);
            }
        } catch(e) {
            console.log(e);
        }
    }

    // 进行pv打点
    var pv = {
        'action_id': 'site_page_show',
        'action_name': '页面渲染'
    };
    addLog(pv);
    initCookie();
    window.onunload = function () {
        var log = '{"action_id":"site_page_quit","action_name":"页面退出打点"}';
        addLog(log);
    };

    if (!window.jQuery) {
        document.addEventListener('click', function(event) {
            var elem = (event.target) ? event.target : event.srcElement;
            checkAttr(elem);
            while (elem.parentElement) {
                elem = elem.parentElement;
                checkAttr(elem);
            }
        }, false);
    }
    else {
        jQuery('[data-click]').on('click', function () {
            var me = this;
            checkAttr(me);
        });
    }

    // 对外暴露打点接口
    window.bdLogger = {
        click: function(extra) {
            var data = {
                extra: extra
            };

            addLog(data);
        }
    }
})();
