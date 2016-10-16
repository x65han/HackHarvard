//configuration varible
var REST = window.location.href.slice(0, window.location.href.length - 1);
var socket;
window.onload = function(){
    //Connect to socket io
    establishConnection();
};
