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
    var flag = 0;
    for (var i = range[0];i <= range[1];++ i){
        if (vis[i] != 1){
            flag = 1;
            break;
        }
    }
    if (flag == 0){
        alert("stop!");
        return ;
    }
    alarm = setInterval(function(){
        var res = Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
        while(vis[res] == 1)
            res = Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
        document.getElementById("number_").innerHTML = res;
    },30);
}
function stop_(){
    status_ = 0;
    player.src = "music/2.mp3";
    player.load();
    player.play();
    clearInterval(alarm);
    vis[Number(document.getElementById("number_").innerHTML)] = 1;
}
function click_(){
    if (status_)
        return stop_();
    else
        return begin_();
}
