function initialization(){
    imgs = $("img");
    for (let i = 0;i < imgs.length;++ i){
        $(imgs[i]).parent().css("text-align", "center");
    }
}