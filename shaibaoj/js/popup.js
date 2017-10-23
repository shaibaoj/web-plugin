var minId=null;
var ctx_path = "http://www.shaibaoj.com";
var loadStr='/common/zhushou.do?action=listCategoryTuan';
var option = {maxId:minId,_format:'html',json_:'category_tuan'};
list();
	function list() {
		var timeStr=new Date().getTime();
		if(minId==null){minId="";}
		option = $.extend({},option, {maxId:minId});
	    $.getJSON(ctx_path + loadStr,option, function(data){
	    	data = data.result.map;
	    	var html ="";
	    	if(data.items.length>0){
	    		$.each(data.items, function(i,item){
	    			html = html+item.content;
	    			if(minId==null||minId==""||minId>parseInt(item.feedId)){minId=parseInt(item.feedId);}
	    		});	
	    	}
	    	$("#listarea").append(html);
	    	$("#loading").hide();
	    	$("#loadmore").show();
	    	initstyle();
		});
	}	

	$("#loadmore").click(function(){
		$("#loadmore").hide();
		$("#loading").show();
		list();
　　});

	$("#loadmore").hover(function(){
		$(this).css("background-color","#47a745");
　　},function(){
		$(this).css("background-color","#5db95b");
　　});

	$(".navtab").click(function(){
		var $this = $(this);
		if($this.attr("id")=='zhidetab'){			
			loadStr='/common/zhushou.do?action=listDeal';
			minId=null;if(minId==null){minId="";}
			option = {maxId:minId,_format:'html',json_:'deal'};
		}
		else if($this.attr("id")=='abroadtab'){			
			loadStr='/common/zhushou.do?action=listDealAbroad';
			minId=null;if(minId==null){minId="";}
			option = {maxId:minId,_format:'html',json_:'deal_abroad'};
		}
		else if($this.attr("id")=='ranktab'){			
			loadStr='/common/zhushou.do?action=listTop';
			minId=null;if(minId==null){minId="";}
			option = {maxId:minId,_format:'html',json_:'top'};
		}
		else{			
			loadStr='/common/zhushou.do?action=listCategoryTuan';
			minId=null;if(minId==null){minId="";}
			option = {maxId:minId,_format:'html',json_:'category_tuan'};
		}
		$('body,html').animate({scrollTop:0},0);
		$(".navtab").removeClass("othertab").removeClass("currenttab").addClass("othertab");
		$this.removeClass("othertab").addClass("currenttab");
		$("#listarea").html("");
		$("#loadmore").hide();
		$("#loading").show();
		var timeStr=new Date().getTime();
		if(minId==null){minId="";}
	    $.getJSON(ctx_path + loadStr,option, function(data){
	    	data = data.result.map;
	    	var html ="";
	    	if(data.items.length>0){
	    		$.each(data.items, function(i,item){
	    			html = html+item.content;
	    			if(minId==null||minId==""||minId>parseInt(item.feedId)){minId=parseInt(item.feedId);}
	    		});	
	    	}
	    	$("#listarea").append(html);
	    	$("#loading").hide();
	    	$("#loadmore").show();
	    	initstyle();
		});
　　});

	function initstyle()
	{
		$("#loadmore").show();
		$(".loadmorearea").show();
		$(".item").hover(function(){
			$(this).find("div.itemmask").show();
			$(this).find("div.title").css("color","#444");
			$(this).find("div.iteminfo").css("color","#999");
	　　},function(){
			$(this).find("div.itemmask").hide();
			$(this).find("div.title").css("color","#666");
			$(this).find("div.iteminfo").css("color","#aaaaaa");
	　　});
	}
	
	function initrankstyle()
	{
		$(".item").hover(function(){
			$(this).find("div.itemmask").show();
			$(this).find("div.title").css("color","#444");
			$(this).find("div.iteminfo").css("color","#999");
	　　},function(){
			$(this).find("div.itemmask").hide();
			$(this).find("div.title").css("color","#666");
			$(this).find("div.iteminfo").css("color","#aaaaaa");
	　　});
	}

