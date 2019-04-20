var imgs, slider_alarm, slider_index = 0;
function initialization(){
    $("#slider").css("height", Math.floor($("#slider")[0].offsetWidth / 3) + "px");
    imgs = $("#slider>div");
    for (let i = 0; i < imgs.length; ++ i){
        $("#slider>div>a>img").css("width", $("#slider")[0].offsetWidth + "px");
        $(imgs[i]).css("height", $("#slider")[0].offsetHeight + "px");
    }
    for (let i = 1; i < imgs.length; ++ i){
        $(imgs[i]).fadeOut(0);
    }
    slider_alarm = setInterval(() => {
        let slider_index_tmp = (slider_index + 1) % imgs.length;
        $(imgs[slider_index]).fadeOut(500);
        $(imgs[slider_index_tmp]).fadeIn(500);
        slider_index = slider_index_tmp;
    }, 3000);
}