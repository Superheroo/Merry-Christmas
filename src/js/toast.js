function mToast() {
    //默认设置
    var options = {
        msg: "提示信息",
        postion: "top",
        time: 1000
    };

    //参数处理
    if (arguments.length > 0) {
        options.msg = arguments[0];

        if (/(top|bottom)/i.test(arguments[1])) {
            options.postion = arguments[1];
        }

        if (parseInt(arguments[2])) {
            options.time = arguments[2];
        }
    }

    if ($('.m_toast').length > 0) {
        $('.m_toast').remove();
    }

    $('<div/>').addClass('m_toast').appendTo($('body'));

    var $toast = $('.m_toast');
    $toast.html(options.msg);
    $toast.show(400);

    setTimeout(function() {
        $toast.remove();
    }, options.time);

}
function testInfo1(){
    var _phone1 = $("#phone").val();    
    var fname = $("#username").val();   
    if(fname==""){
        mToast("请输入您的姓名");
        return false;
    }
    var phone = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    if(_phone1==""){
        mToast("手机号不能为空");
        return false;
    }else if(!phone.test(_phone1)||!phone.test(_phone1)){
        mToast("请输入正确的手机号");
        return false;
    }    
    return true;   
}

var data1 = {
    siteid:1820127,
    pageid:1819805,
    merchantid:6168545,
    prod:4,
    type:1
};
$("#fBtn").click("click",function(){
    if(testInfo1()==true){
        var fname = $("#username").val();
        var phone = $("#phone").val();    
        var form = [ 
            {
                name:'姓名：',
                value:fname
            },
            {
                name:'手机：',
                value:phone
            }
        ];
        data1.jsonval = form;
        $.ajax({
            url:'https://isite.baidu.com/feedflow/form/submit',      
            data:data1,
            dataType:'jsonp',
            jsonp:'callback',
            jsonpCallback:'callback_method',
            success:function (res) {
                if (res.status == 0) {
                    
                    $("#form")[0].reset();
                    $(".backBg").show();
                    $(".stoast0").show();
                }
                else {
                    alert(res.statusInfo);
                }
            }
        });
    }
});

$("#backBtn").bind("click",function(){
    $(".backBg").hide();
    $(".stoast0").hide();
});
// 规则
$(".rule").bind("click",function(){
    $(".backBg").show();
    $(".ruleImg").show();
});
$(".closeImgSize").bind("click",function(){
    $(".backBg").hide();
    $(".ruleImg").hide();
});
$('.closebtn').bind("click",function(){
    $(".backBg").hide();
    $(".alertForm").hide();
});
$('.formshow').bind("click",function(){
    $(".backBg").show();
    $(".alertForm").show();
});


