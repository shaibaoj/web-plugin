$(function(){
	(function(){
		if($("#show_in_page").attr("checked", localStorage['show_in_page']=='1')[0].checked)
			$("#in_page_wrapper").show();

		$("#run_auto").attr("checked", localStorage['run_auto']=='1');
		$("#run_key").val(localStorage['run_key'] || "F9");
		$("#button_pr").attr("checked", (localStorage['button_pr'] || '1')=='1');

		var se_config_html='';
		for(var pkey in SE.se_config){
			var s=SE.isShow(pkey);
			se_config_html+='<div><input type="checkbox" id="cfg_'+pkey+'"'+(s?' checked="checked"':"no")+' /><label for="cfg_'+pkey+'" style=" font-weight:bold;">'+pkey+'</label><strong>:</strong>';
			for(var skey in SE.se_config[pkey]){
				if(skey!='show'){
					if(s)
						se_config_html+='<input type="checkbox" id="cfg_'+pkey+'_'+skey+'"'+(SE.isShow(pkey, skey)?' checked="checked"':"")+' /><label for="cfg_'+pkey+'_'+skey+'">'+skey+'</label> ';
					else
						se_config_html+='<input type="checkbox" id="cfg_'+pkey+'_'+skey+'" disabled="disabled" />'+skey+' ';
				}
			}
			se_config_html+="</div>";
		}
		$("#se_config").html(se_config_html);
	})();

	$("#show_in_page").click(function(){$("#in_page_wrapper").toggle();localStorage["show_in_page"]=this.checked?"1":"0";});
	$("#run_auto").click(function(){localStorage["run_auto"]=this.checked?"1":"0";});
	//ping百度
	$("#run_key").keyup(function(e){
		if(e.keyCode!=16 && e.keyCode!=17 && e.keyCode!=18){
			this.value=SE_Tool.get_keyName(e);
			localStorage['run_key']=this.value;
		}
	});
	
	$("#ping_time").val(localStorage['ping_time'] || 10)
	$("#ping_time").keyup(function(e){
		if(e.keyCode!=16 && e.keyCode!=17 && e.keyCode!=18){
			localStorage['ping_time']=this.value;
		}
	});
	$("#button_pr").click(function(){
		localStorage['button_pr']=this.checked?'1':'0'; 
		localStorage['get_pr']=this.checked?'1':'0'; 
		chrome.extension.getBackgroundPage().location.reload(true);
	});

	$("#se_config_wrapper :checkbox").filter(":first-child").click(function(){
		$(this).nextAll(":checkbox").attr("disabled", !this.checked);
	}).end().click(function(){
		var se_show_configStr='';
		var arr=[];
		for(var pkey in SE.se_config){
			var pck=$("#cfg_"+pkey)[0].checked;
			var arr1=[];
			for(var skey in SE.se_config[pkey]){
				if(skey!="show")
					arr1.push("\""+skey+"\":"+((pck && $("#cfg_"+pkey+"_"+skey)[0].checked)?1:0));
				else
					arr1.push("\"show\":"+(pck?1:0));
			}
			arr.push("\""+pkey+"\":{"+arr1.join(',')+"}");
		}
		se_show_configStr="se_show_config={"+arr.join(',')+"};";
		localStorage["SeShowConfig"]=se_show_configStr;
	});
});