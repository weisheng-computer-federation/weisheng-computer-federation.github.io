function initialization(){
    imgs = $("img");
    for (let i = 0;i < imgs.length;++ i){
        $(imgs[i]).parent().css("text-align", "center");
    }
    $(".content.post img").css("max-width", Math.min($('.post').innerWidth() - 20, 700) + 'px');
}