
let menu = document.createElement("script");
menu.type="text/javascript";
menu.src="https://static.youdanhui.com/static/js/popup.js?p="+getdatetime('H');
document.body.appendChild(menu);

//获取当前时间
function getdatetime(typename = "") {
	let myDate = new Date();
	let gettime;
	var tf = function(i){return (i < 10 ? '0' : '') + i}; 
	if (typename == "D") {
		gettime = myDate.getFullYear().toString() + tf((myDate.getMonth() + 1).toString()) + tf(myDate.getDate().toString());
	} else if (typename == "H") {
		gettime = myDate.getFullYear().toString() + tf((myDate.getMonth() + 1).toString()) + tf(myDate.getDate().toString()) + tf(myDate.getHours().toString());
	} else {
		gettime = myDate.getFullYear().toString() + tf((myDate.getMonth() + 1).toString()) + tf(myDate.getDate().toString()) + tf(myDate.getHours().toString()) + tf(myDate.getMinutes().toString());
	}

	return gettime;
}