var output = [], cnt = 0;
function submit(){
    var arr = document.getElementsByClassName("readin");
    var alpha = "";
    var beta = arr[arr.length - 1].value;
    if (beta != "A" && beta != "B" && beta != "C" && beta != "D"){
        alert("答案必须为A, B, C, D(大写字母)中的一个");
        return ;
    }
    for (var i = 0;i < arr.length;++ i)
        alpha += arr[i].value + ",";
    output[cnt ++] = alpha;
    updateHTML();
    for (var i = 0;i < arr.length;++ i)
        arr[i].value = "";
}
function withdraw(){
    if (cnt == 0){
        alert("你根本还没录入题目啊喂!!");
        return ;
    }
    output.pop();
    -- cnt;
    updateHTML();
}
function updateHTML(){
    var counter = document.getElementById("count");
    counter.innerHTML = "已录入 " + cnt + "题";
    var outputData = document.getElementById("output");
    outputData.innerHTML = "";
    for (i in output){
        outputData.innerHTML += output[i] + "</br>";
    }
}