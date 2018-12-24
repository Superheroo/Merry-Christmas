shang = 0;
var wyaward = "";
var localshang = localStorage.getItem("keyshang"); //获取本地数据a
var loaclaward = localStorage.getItem("keyaward"); //获取本地数据keyaward
var aa = "";
console.log(localshang)
if (loaclaward == "二等奖 800元") {
    $('.img100').show();
    $('.img18').hide();
} else if (loaclaward == "海参 5头") {
    $('.img100').hide();
    $('.img18').show();
}
$("#lotteryBtn").click(function() {
    if (localshang == 1 || shang == 1) {
        mToast("您还有最后1次机会");
        var num = parseInt(Math.random() * (100 - 0 + 0) + 0);
        if (num >= 0 && num < 50) {
            rotateFunc(1, -110, "二等奖 800元"); //
            var award2 = "二等奖 800元";
            wyaward = award2;
            $('.img100').show();
            $('.img18').hide();
        }
        if (num >= 50 && num < 100) {
            rotateFunc(1, -20, "海参 5头"); //
            var award2 = "海参 5头";
            wyaward = award2;
            $('.img100').hide();
            $('.img18').show();
        }
        localStorage.setItem("keyaward", wyaward);
        setTimeout(function() {
            alertshow1();
        }, 3000)
    } else if (localshang > 10 || shang > 10) {
        mToast("机会已经用完了");
        return false;
    } else {
        var num = parseInt(Math.random() * (100 - 0 + 0) + 0);
        console.log(num);
        if (num >= 0 && num < 50) {
            rotateFunc(1, -110, "二等奖 800元"); //
            var award2 = "二等奖 800元";
            wyaward = award2;
            $('.img100').show();
            $('.img18').hide();
        }
        if (num >= 50 && num < 100) {
            rotateFunc(1, -20, "海参 5头"); //
            var award2 = "海参 5头";
            wyaward = award2;
            $('.img100').hide();
            $('.img18').show();
        }
        setTimeout(function() {
            alertshow1();
        }, 3000)
    }
});
$('#fBtn1').click(function() {
    var cjUsername = $('#inputmy2').val(); //姓名
    var cjPhone5 = $('#tell2').val(); //电话
    var username = /^[\u4E00-\u9FA5A-Za-z]+$/;
    var re = /^(13[0-9]{9})|(15[0-9][0-9]{8})|(18[0-9][0-9]{8})|(17[0][0-9]{8})|(14[7][0-9]{8})$/;
    if (localshang > 2 || shang > 2) {
        $('.number').html("0");
        mToast("您没有抽奖机会了");
        return false;
    }
    if (username.test(cjUsername) == "") {
        mToast("姓名不正确");
        return false;
    }
    if (re.test(cjPhone5) == "") {
        mToast("手机号不正确");
        return false;
    } else {
        var form = [{
            name: '姓名：',
            value: cjUsername
        }, {
            name: '手机：',
            value: cjPhone5
        }, {
            name: '奖品：',
            value: wyaward
        }];
        data1.jsonval = form;
		console.log(data1.jsonval)
        $.ajax({
            url: 'http://order.kowadon.com/index.php?a=form',
			type: 'post',
            jsonp: 'callback',
            jsonpCallback: 'callback_method',
            data: "name="+data1.jsonval[0].value+"&mobile="+data1.jsonval[1].value+"&content="+data1.jsonval[2].value,
            success: function(response) {
                mToast("领取成功");
				$(".input1").val('');
				$(".input2").val('');
				$('.boxform').css('display','none');
				$('.backBg').css('display','none');
            }
        });
    }
})
var rotateFunc = function(awards, angle, text) { //awards:奖项，angle:奖项对应的角度
    shang++;
    localStorage.setItem("keyshang", shang);
    $('#yuanpan').stopRotate();
    $("#yuanpan").rotate({
        angle: 0,
        duration: 4000,
        animateTo: angle + 1440, //angle是图片上各奖项对应的角度，1440是我要让指针旋转4圈。所以最后的结束的角度就是这样子^^
        callback: function() {}
    });
};

function alertshow1() {
    $('.award1').html(wyaward);
    $('.backBg').show();
    $('.box01').show();
}
$('.clodeImg').click(function() {
    if($('#inputmy2').val()!=""&&$('#tell2').val()!=""){
        $('.backBg').hide();
        $('.box01').hide();
    }else{
        mToast("填写内容不能为空");   
    }   
})
$('.close5').click(function() {
    $('.backBg').hide();
    $('.guaka5').hide();
})