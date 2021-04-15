var imgs, slider_alarm, slider_index = 0;
function initialization() {
    //获取元素
    var leftBtn = document.querySelector('.leftBtn'); //左按钮
    var rightBtn = document.querySelector('.rightBtn'); //右按钮
    var box = document.querySelector('.box'); //最大的盒子
    var boxWidth = box.offsetWidth; //盒子宽=图片宽度
    //1-鼠标落在div上显示左右按钮
    //mouseenter事件为鼠标经过大盒子时显示左右两个按钮
    box.addEventListener('mouseenter', function () {
        leftBtn.style.display = 'block';
        rightBtn.style.display = 'block';
        clearInterval(timer);
        timer = null;
    })
    //2-鼠标离开div上显示左右按钮
    //mouseleave事件为鼠标离开左右两个按钮隐藏
    box.addEventListener('mouseleave', function () {
        leftBtn.style.display = 'none';
        rightBtn.style.display = 'none';
        timer = setInterval(function () {
            rightBtn.click();
        }, 2000);
    })
    //3-动态获取图片张数来展示小球个数
    var ul = box.querySelector('ul'); //获取大盒子box里的ul标签
    var ol = box.querySelector('.circle') //获取大盒子box里的ol标签
    //for循环根据图片创建小球个数
    for (var i = 0; i < ul.children.length; i++) {
        //创建一个小li标签
        var li = document.createElement('li');
        //记录当前小圆圈的索引号 通过自定义属性来做  为第5步做准备
        li.setAttribute('index', i);
        //把小li插入到ol里面
        ol.appendChild(li);
        //4-小圆圈的排他思想 可以在生成小圆圈的同时直接绑定点击事件
        li.addEventListener('click', function () {
            //把所有小li清除current样式类名
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            //留下自己获取current类名的样式
            this.className = 'current';
            //使用动画函数的前提 该元素必须有定位
            //注意  移动的是ul而不是li
            //滚动图片核心算法 点击某个小圆圈 就让图片滚动 
            // 5-点击小圆圈 移动图片
            //ul移动距离 小圆圈的索引号乘以图片的宽度作为ul运动的距离
            //当我们点击了某个小li 就拿到当前小li的索引号
            var index = this.getAttribute('index');
            //当我们点击了某个小li 就把这个小li的索引给num
            num = index;
            //当我们点击了某个小li 就把这个小li的索引给circle
            circle = index;
            //调用动画函数
            animate(ul, -index * boxWidth)
        })
    }
    //把ol里面的第一个小li设置名为current
    ol.children[0].className = 'current';
    //6-克隆第一张图片放到ul最后
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    //7-点击右侧按钮 图片滚动一张功能
    //右侧按钮点击事件
    var num = 0; //声明一个变量 
    var circle = 0;
    // circle控制小圆圈播放

    rightBtn.addEventListener('click', function () {
        //如果走到了最后一张复制的图片 此时我们的ul要快速的复原left为0
        //无缝滚动，
        if (num == ul.children.length - 1) {
            ul.style.left = 0;
            num = 0;
        }
        num++;
        animate(ul, -num * boxWidth);
        circle++;
        //若果circle=4 说明走到了我们克隆的图片了
        if (circle == ol.children.length) {
            circle = 0;
        }
        //调用函数
        circleChange();
    })

    //8-左侧按钮点击事件
    leftBtn.addEventListener('click', function () {
        //如果走到了最后一张复制的图片 此时我们的ul要快速的复原left为0
        //无缝滚动，
        if (num == 0) {
            num = ul.children.length - 1;
            ul.style.left = -num * boxWidth + 'px';

        }
        num--;
        animate(ul, -num * boxWidth);
        circle--;
        //若果circle<0 说明走到了我们克隆的图片了
        // if (circle <0) {
        //   circle = ol.children.length-1;
        // }
        //上面注释的代码改为三元表达式
        circle = circle < 0 ? ol.children.length - 1 : circle;

        //调用函数
        circleChange();
    });

    function circleChange() {
        //先清除其余小圆圈的类名
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        //留下当前的小圆圈的类名
        ol.children[circle].className = 'current';
    }

    //9-自动播放功能
    var timer = setInterval(function () {
        //手动调用点击事件
        rightBtn.click();
    }, 2000);
    ///
    //动画函数
    function animate(obj, target, callback) {
        //先清除以前的定时器 只保留当前的一个定时器
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            //步长值写到定时器的里面
            //把我们歩长值改为整数 不要出现小数点
            var step = (target - obj.offsetLeft) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (obj.offsetLeft == target) {
                //停止动画 本质是停止定时器
                clearInterval(obj.timer);
                //回调函数写到定时器结束里面
                if (callback) {
                    //调回函数
                    callback();
                }
            }
            obj.style.left = obj.offsetLeft + step + 'px';
        }, 15)
    }
}
