
/*//////////////////////////// WFORDERJSFGX ////////////////////////////*/

function postcheck(){

	var ifname=/^[\u4e00-\u9fa5]{2,6}$/;

	var ifmob=/^1[3,4,5,7,8]\d{9}$/;

    var ifqq=/^\d{5,15}$/;

	var ifemail=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

	try{

		var flag1=0;

		var radio1=document.getElementsByName("bdproduct");		

		for(var i=0;i<radio1.length;i++){

			if(radio1.item(i).checked==true){

				flag1=1;

				break;

			}

		}

		if(!flag1&&radio1.item(0).getAttribute("type")=="radio"){

			alert('请选择您要订购的产品！');

			return false;

		}

    }catch(ex){}

	try{		

		var cbxs=document.getElementsByName("bdproduct[]");

		var flag2=0;

		for(var i=0;i<cbxs.length;i++){

			if(cbxs[i].checked){

				flag2+=1;

			}

		}

		if(flag2<1&&cbxs[0].getAttribute("type")=='checkbox'){

			alert('请选择您要订购的产品！');

			return false;

		}

	}catch(ex){}	

	try{

		if(document.wfform.bdproduct.value==""){

			alert('请选择您要订购的产品！');

			document.wfform.bdproduct.focus();

			return false;

		}

    }catch(ex){}	

	try{

		if(document.wfform.bdname.value==""){

			alert('请填写姓名！');

			document.wfform.bdname.focus();

			return false;

		}

		if(!ifname.test(document.wfform.bdname.value)){

			alert('姓名格式不正确，请重新填写！');

			document.wfform.bdname.focus();

			return false;

		}

    }catch(ex){}

    try{

		if(document.wfform.bdmob.value==""){

			alert('请填写手机号码！');

			document.wfform.bdmob.focus();

			return false;

		}

		if(!ifmob.test(document.wfform.bdmob.value)){

			alert('手机号码格式不正确，请重新填写！');

			document.wfform.bdmob.focus();

			return false;

		}

    }catch(ex){}

    try{

		if(document.wfform.bdprovince.value==""){

			alert('请选择所在地区！');

			document.wfform.bdprovince.focus();

			return false;

		}

    }catch(ex){}

    try{

		if(document.wfform.bdaddress.value==""){

			alert('请填写详细地址！');

			document.wfform.bdaddress.focus();

			return false;

		}

    }catch(ex){}

    try{

		if(document.wfform.bdqq.value==""){

			alert('请填写QQ号码！');

			document.wfform.bdqq.focus();

			return false;

		}

		if(!ifqq.test(document.wfform.bdqq.value)){

			alert('QQ号码格式不正确，请重新填写！');

			document.wfform.bdqq.focus();

			return false;

		}

    }catch(ex){}

    try{

		if(document.wfform.wfemail.value==""){

			alert('请填写E-MAIL！');

			document.wfform.wfemail.focus();

			return false;

		}

		if(!ifemail.test(document.wfform.wfemail.value)){

			alert('E-MAIL格式不正确，请重新填写！');

			document.wfform.wfemail.focus();

			return false;

		}

    }catch(ex){}

    try{

		if(document.wfform.wfcode.value==""){

			alert('请填写验证码！');

			document.wfform.wfcode.focus();

			return false;

		}

    }catch(ex){}

    try{

		var onbdpay=document.getElementsByName("bdpay"); 

		for(var i=0;i<onbdpay.length;i++){

			if(onbdpay[i].checked){

			var bdpay=onbdpay[i].value;

			}

		}

		if(bdpay=="alipay"||bdpay=="ebank"){

			document.wfform.bdsubmit.value="重新提交";

		}

		else{

			document.wfform.bdsubmit.value="正在提交，请稍等 >>";

		}

		return true;

    }catch(ex){}

}

/*//////////////////////////// WFORDERJSFGX ////////////////////////////*/

try{

	new PCAS("bdprovince","bdcity","bdarea");

}catch(ex){}

try{

	var thissrc=document.getElementById("wfcode").src;

	function refreshCode(){

		document.getElementById("wfcode").src=thissrc+"temp="+Math.random(); 

	}

}catch(ex){}

/*//////////////////////////// WFORDERJSFGX ////////////////////////////*/
function pricea(){
	var bdproduct = document.wfform.bdproduct.alt;
	for(var i=0;i<document.wfform.bdproduct.length;i++){
		if(document.wfform.bdproduct[i].checked==true){
			var bdproduct = document.wfform.bdproduct[i].alt;
			break;
		}
	}
    if(document.wfform.bdnum.value=="" || document.wfform.bdnum.value==0){	
		var bdnum=1;
	}
	else{
		var bdnum=document.wfform.bdnum.value;
	}	
	var bdprice=bdproduct*bdnum;
	document.wfform.bdprice.value=bdprice;
	document.getElementById("showprice").innerHTML=bdprice;
}

function priceb(){

    var wfcpxljg=document.getElementById("bdproduct");

    var bdproduct=wfcpxljg.options[document.getElementById("bdproduct").options.selectedIndex].title; 

    if(document.wfform.bdnum.value==""||document.wfform.bdnum.value==0){	

		var bdnum=1;

	}

	else{

		var bdnum=document.wfform.bdnum.value;

	}	

	var bdprice=bdproduct*bdnum;

	document.wfform.bdprice.value=bdprice;

	document.getElementById("showprice").innerHTML=bdprice;

}

function pricec(){

	var bdnum=0;

	var bdprice=0;	

	var obj=document.getElementsByName("bdproduct[]");

    for(var i=0;i<obj.length;i++){

		if(obj[i].checked){

			bdnum++;

			bdprice+=parseInt(obj[i].alt);

		}

	}

	document.wfform.bdnum.value=bdnum;

	document.wfform.bdprice.value=bdprice;

	document.getElementById("showmun").innerHTML=bdnum;

	document.getElementById('showprice').innerHTML=bdprice;

}

/*//////////////////////////// WFORDERJSFGX ////////////////////////////*/

function changeItem(i){

    var k=3;

	for(var j=0;j<k;j++){

	    if(j==i){

		    document.getElementById("paydiv"+j).style.display="block";

		}

		else{		

		    document.getElementById("paydiv"+j).style.display="none";

		}

	}

}

function opay(){

	document.getElementById("wfform").target="_parent";

}

function opay2(){

    document.getElementById("wfform").target="_blank";

}

