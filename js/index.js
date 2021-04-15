var imgs, slider_alarm, slider_index = 0;
function initialization() {
    //��ȡԪ��
    var leftBtn = document.querySelector('.leftBtn'); //��ť
    var rightBtn = document.querySelector('.rightBtn'); //�Ұ�ť
    var box = document.querySelector('.box'); //���ĺ���
    var boxWidth = box.offsetWidth; //���ӿ�=ͼƬ���
    //1-�������div����ʾ���Ұ�ť
    //mouseenter�¼�Ϊ��꾭�������ʱ��ʾ����������ť
    box.addEventListener('mouseenter', function () {
        leftBtn.style.display = 'block';
        rightBtn.style.display = 'block';
        clearInterval(timer);
        timer = null;
    })
    //2-����뿪div����ʾ���Ұ�ť
    //mouseleave�¼�Ϊ����뿪����������ť����
    box.addEventListener('mouseleave', function () {
        leftBtn.style.display = 'none';
        rightBtn.style.display = 'none';
        timer = setInterval(function () {
            rightBtn.click();
        }, 2000);
    })
    //3-��̬��ȡͼƬ������չʾС�����
    var ul = box.querySelector('ul'); //��ȡ�����box���ul��ǩ
    var ol = box.querySelector('.circle') //��ȡ�����box���ol��ǩ
    //forѭ������ͼƬ����С�����
    for (var i = 0; i < ul.children.length; i++) {
        //����һ��Сli��ǩ
        var li = document.createElement('li');
        //��¼��ǰСԲȦ�������� ͨ���Զ�����������  Ϊ��5����׼��
        li.setAttribute('index', i);
        //��Сli���뵽ol����
        ol.appendChild(li);
        //4-СԲȦ������˼�� ����������СԲȦ��ͬʱֱ�Ӱ󶨵���¼�
        li.addEventListener('click', function () {
            //������Сli���current��ʽ����
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            //�����Լ���ȡcurrent��������ʽ
            this.className = 'current';
            //ʹ�ö���������ǰ�� ��Ԫ�ر����ж�λ
            //ע��  �ƶ�����ul������li
            //����ͼƬ�����㷨 ���ĳ��СԲȦ ����ͼƬ���� 
            // 5-���СԲȦ �ƶ�ͼƬ
            //ul�ƶ����� СԲȦ�������ų���ͼƬ�Ŀ����Ϊul�˶��ľ���
            //�����ǵ����ĳ��Сli ���õ���ǰСli��������
            var index = this.getAttribute('index');
            //�����ǵ����ĳ��Сli �Ͱ����Сli��������num
            num = index;
            //�����ǵ����ĳ��Сli �Ͱ����Сli��������circle
            circle = index;
            //���ö�������
            animate(ul, -index * boxWidth)
        })
    }
    //��ol����ĵ�һ��Сli������Ϊcurrent
    ol.children[0].className = 'current';
    //6-��¡��һ��ͼƬ�ŵ�ul���
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    //7-����Ҳఴť ͼƬ����һ�Ź���
    //�Ҳఴť����¼�
    var num = 0; //����һ������ 
    var circle = 0;
    // circle����СԲȦ����

    rightBtn.addEventListener('click', function () {
        //����ߵ������һ�Ÿ��Ƶ�ͼƬ ��ʱ���ǵ�ulҪ���ٵĸ�ԭleftΪ0
        //�޷������
        if (num == ul.children.length - 1) {
            ul.style.left = 0;
            num = 0;
        }
        num++;
        animate(ul, -num * boxWidth);
        circle++;
        //����circle=4 ˵���ߵ������ǿ�¡��ͼƬ��
        if (circle == ol.children.length) {
            circle = 0;
        }
        //���ú���
        circleChange();
    })

    //8-��ఴť����¼�
    leftBtn.addEventListener('click', function () {
        //����ߵ������һ�Ÿ��Ƶ�ͼƬ ��ʱ���ǵ�ulҪ���ٵĸ�ԭleftΪ0
        //�޷������
        if (num == 0) {
            num = ul.children.length - 1;
            ul.style.left = -num * boxWidth + 'px';

        }
        num--;
        animate(ul, -num * boxWidth);
        circle--;
        //����circle<0 ˵���ߵ������ǿ�¡��ͼƬ��
        // if (circle <0) {
        //   circle = ol.children.length-1;
        // }
        //����ע�͵Ĵ����Ϊ��Ԫ���ʽ
        circle = circle < 0 ? ol.children.length - 1 : circle;

        //���ú���
        circleChange();
    });

    function circleChange() {
        //���������СԲȦ������
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        //���µ�ǰ��СԲȦ������
        ol.children[circle].className = 'current';
    }

    //9-�Զ����Ź���
    var timer = setInterval(function () {
        //�ֶ����õ���¼�
        rightBtn.click();
    }, 2000);
    ///
    //��������
    function animate(obj, target, callback) {
        //�������ǰ�Ķ�ʱ�� ֻ������ǰ��һ����ʱ��
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            //����ֵд����ʱ��������
            //�����ǚi��ֵ��Ϊ���� ��Ҫ����С����
            var step = (target - obj.offsetLeft) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (obj.offsetLeft == target) {
                //ֹͣ���� ������ֹͣ��ʱ��
                clearInterval(obj.timer);
                //�ص�����д����ʱ����������
                if (callback) {
                    //���غ���
                    callback();
                }
            }
            obj.style.left = obj.offsetLeft + step + 'px';
        }, 15)
    }
}
