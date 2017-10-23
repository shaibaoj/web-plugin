var currentversion=115;
var currentPage=1;
var timeStr=new Date().getTime();
var loadStr='http://list.tongjii.us/list/simi/list.php?type=home&ver='+currentversion+'&v='+timeStr+'&p=';
$.get(loadStr+currentPage, function(data)
{
	$("#listarea").append(data);
	$("#loading").hide();
	$("#loadmore").show();
	initstyle();
	currentPage++;
});


var loadMaxid='http://list.tongjii.us/list/simi/max.php';
$.get(loadMaxid, function(data)
{
	localStorage.maxCnDealId=data;
	chrome.browserAction.setBadgeBackgroundColor({color:[255, 68, 68, 255]});
	chrome.browserAction.setBadgeText({text:""});
	chrome.browserAction.setTitle({title:"里面条目您都看过了，等有更新了我立马儿通知您！"});
});


$("#loadmore").click(function(){
		$("#loadmore").hide();
		$("#loading").show();
		$.get(loadStr+currentPage, function(data){
			$("#listarea").append(data);
			$("#loading").hide();
			$("#loadmore").show();
			initstyle();
			currentPage++;
		});
	});

$("#loadmore").hover(function(){
		$(this).css("background-color","#47a745");
　　},function(){
		$(this).css("background-color","#5db95b");
　　});

$("#abroadtab").click(function(){
		loadStr='http://list.tongjii.us/list/simi/list.php?type=all&ver='+currentversion+'&c=us&v='+timeStr+'&p=';
		currentPage=1;
		$("#loadmore").hide();
		$("#loading").show();
		$.get(loadStr+currentPage, function(data){
			$('body,html').animate({scrollTop:0},0);
			$("#abroadtab").removeClass("othertab");
			$("#abroadtab").addClass("currenttab");
			$("#hometab").removeClass("currenttab");
			$("#hometab").addClass("othertab");
			$("#ranktab").removeClass("currenttab");
			$("#ranktab").addClass("othertab");
			$("#fenleitab").removeClass("currenttab");
			$("#fenleitab").addClass("othertab");
			$("#listarea").html(data);
			$("#loading").hide();
			initstyle();
			currentPage++;
		});
　　});

$("#hometab").click(function(){
		loadStr='http://list.tongjii.us/list/simi/list.php?type=home&ver='+currentversion+'&v='+timeStr+'&p=';
		currentPage=1;
		$("#loadmore").hide();
		$("#loading").show();
		$.get(loadStr+currentPage, function(data){
			$('body,html').animate({scrollTop:0},0);
			$("#hometab").removeClass("othertab");
			$("#hometab").addClass("currenttab");
			$("#abroadtab").removeClass("currenttab");
			$("#abroadtab").addClass("othertab");
			$("#ranktab").removeClass("currenttab");
			$("#ranktab").addClass("othertab");
			$("#fenleitab").removeClass("currenttab");
			$("#fenleitab").addClass("othertab");
			$("#listarea").html(data);
			$("#loading").hide();
			initstyle();
			currentPage++;
		});
　　});

$("#ranktab").click(function(){
		loadStr='http://list.tongjii.us/list/simi/list.php?type=rank&ver='+currentversion+'&v='+timeStr+'&p=';
		currentPage=1;
		$("#loadmore").hide();
		$("#loading").show();
		$.get(loadStr+currentPage, function(data){
			$('body,html').animate({scrollTop:0},0);
			$("#ranktab").removeClass("othertab");
			$("#ranktab").addClass("currenttab");
			$("#abroadtab").removeClass("currenttab");
			$("#abroadtab").addClass("othertab");
			$("#hometab").removeClass("currenttab");
			$("#hometab").addClass("othertab");
			$("#fenleitab").removeClass("currenttab");
			$("#fenleitab").addClass("othertab");
			$("#listarea").html(data);
			$("#loading").hide();
			initrankstyle();
			currentPage++;
		});
　　});


$("#fenleitab").click(function(){
	loadStr='http://list.tongjii.us/list/simi/list.php?type=feilei&ver='+currentversion+'&v='+timeStr+'&p=';
	currentPage=1;
	$("#loadmore").hide();
	$("#loading").show();
	$.get(loadStr+currentPage, function(data){
		$('body,html').animate({scrollTop:0},0);
		$("#fenleitab").removeClass("othertab");
		$("#fenleitab").addClass("currenttab");
		$("#ranktab").removeClass("currenttab");
		$("#ranktab").addClass("othertab");
		$("#abroadtab").removeClass("currenttab");
		$("#abroadtab").addClass("othertab");
		$("#hometab").removeClass("currenttab");
		$("#hometab").addClass("othertab");
		$("#listarea").html(data);
		$("#loading").hide();
		initrankstyle();
		currentPage++;
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

