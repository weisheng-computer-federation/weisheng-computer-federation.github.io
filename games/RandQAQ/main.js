var status_ = 0,vis = [];
var alarm;
function begin_(){
    status_ = 1;
    player.src = "music/1.mp3";
    player.load();
    player.play();
    var range = [];
    range[0] = Number(document.getElementById("range_low").value);
    range[1] = Number(document.getElementById("range_high").value);
    alarm = setInterval(function(){
        var res = Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
        while(vis[res] == 1){
            res = Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
            vis[res] = 1;
        }
        document.getElementById("number_").innerHTML =
            res;
    },100);
}
function stop_(){
    status_ = 0;
    player.src = "music/2.mp3";
    player.load();
    player.play();
    clearInterval(alarm);
}
function click_(){
    if (status_)
        return stop_();
    else
        return begin_();
}