
document.addEventListener('DOMContentLoaded', function () {
    chrome.extension.sendMessage({greeting: "add_all_js"});
});