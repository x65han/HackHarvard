//configuration varible
//gives the state of the game (either local host or server)
var REST = window.location.href.slice(0, window.location.href.length - 1);
var socket;
//incase anything doesn't load
window.onload = function(){
    //Connect to socket io (backend)
    establishConnection();
};
