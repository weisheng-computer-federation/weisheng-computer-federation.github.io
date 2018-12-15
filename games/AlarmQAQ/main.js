var c_bottom = 0,c_opacity = 1,num = 60;
function alarm_(){
    var c = document.getElementById("continue_1s");
    c.style.bottom = (c_bottom += 10) + "px";
    c.style.opacity = (c_opacity -= 0.04);
}