	/*ҳ�����ʱ��*/
	window.logInfo = {};  //ͳ��ҳ�����ʱ��
	window.logInfo.openTime = performance.timing.navigationStart;
	window.logInfo.whiteScreenTime = +new Date() - window.logInfo.openTime;
	document.addEventListener('DOMContentLoaded',function (event) {
	  window.logInfo.readyTime = +new Date() - window.logInfo.openTime;
	});
	window.onload = function () {
	  window.logInfo.allloadTime = +new Date() - window.logInfo.openTime;
	  window.logInfo.nowTime = new Date().getTime();
	  var timname = {
	    whiteScreenTime: '����ʱ��',
	    readyTime: '�û��ɲ���ʱ��',
	    allloadTime: '������ʱ��',
	    mobile: 'ʹ���豸',
	    nowTime: 'ʱ��',
	  };
	  var logStr = '';
      console.info("ǰ�˿��ӻ�������£�")
	  for (var i in timname) {
	    console.info(timname[i] + ':' + window.logInfo[i] + 'ms');
	    if (i === 'mobile') {
	      logStr += '&' + i + '=' + window.logInfo[i];
	    } else {
	      logStr += '&' + i + '=' + window.logInfo[i];
	    }

	  }
	  /*(new Image()).src = '/action?' + logStr;*/
	};
	/*ͳ���û�ʹ���豸*/
	window.logInfo.mobile = mobileType();
	function mobileType() {
	  var u = navigator.userAgent, app = navigator.appVersion;
	  var type =  {// �ƶ��ն�������汾��Ϣ
	    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios�ն�
	    iPad: u.indexOf('iPad') > -1, //�Ƿ�iPad
	    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android�ն˻���uc�����
	    iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //�Ƿ�ΪiPhone����QQHD�����
	    trident: u.indexOf('Trident') > -1, //IE�ں�
	    presto: u.indexOf('Presto') > -1, //opera�ں�
	    webKit: u.indexOf('AppleWebKit') > -1, //ƻ�����ȸ��ں�
	    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //����ں�
	    mobile: !!u.match(/AppleWebKit.*Mobile/i) || !!u.match(/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/), //�Ƿ�Ϊ�ƶ��ն�
	    webApp: u.indexOf('Safari') == -1 //�Ƿ�webӦ�ó���û��ͷ����ײ�
	  };
	  var lists = Object.keys(type);
	  for(var i = 0; i < lists.length; i++) {
	    if(type[lists[i]]) {
	      return lists[i];
	    }
	  }  
	}
	/*��������ͳ��*/
	window.onload = function () {
        window.logInfo.allloadTime = +new Date() - window.logInfo.openTime;
        window.logInfo.nowTime = new Date().getTime();
        var timname = {
            whiteScreenTime: '����ʱ��',
            readyTime: '�û��ɲ���ʱ��',
            allloadTime: '������ʱ��',
            mobile: 'ʹ���豸',
            nowTime: 'ʱ��',
        };
        var logStr = '';
        console.info("ǰ�˿��ӻ�������£�")
        for (var i in timname) {
            console.info(timname[i] + ':' + window.logInfo[i] + 'ms');
            if (i === 'mobile') {
                logStr += '&' + i + '=' + window.logInfo[i];
            } else {
                logStr += '&' + i + '=' + window.logInfo[i];
            }
            
        }
       /* (new Image()).src = '/action?' + logStr;*/
    };
      
    var defaults = {
        msg:'',  // ����ľ�����Ϣ
        url:'',  // �������ڵ�url
        line:'', // �������ڵ���
        col:'',  // �������ڵ���
        nowTime: '',// ʱ��
    };
    window.onerror = function(msg,url,line,col,error) {
        col = col || (window.event && window.event.errorCharacter) || 0;

        defaults.url = url;
        defaults.line = line;
        defaults.col =  col;
        defaults.nowTime = new Date().getTime();

        if (error && error.stack){
            // ���������ж�ջ��Ϣ��ֱ��ʹ��
            defaults.msg = error.stack.toString();

        }else if (arguments.callee){
            // ����ͨ��callee�ö�ջ��Ϣ
            var ext = [];
            var fn = arguments.callee.caller;
            var floor = 3;  
            while (fn && (--floor>0)) {
                ext.push(fn.toString());
                if (fn  === fn.caller) {
                    break;
                }
                fn = fn.caller;
            }
            ext = ext.join(",");
            defaults.msg = error.stack.toString();
        }
        var str = ''
        for(var i in defaults) {
            // console.log(i,defaults[i]);
            if(defaults[i] === null || defaults[i] === undefined) {
                defaults[i] = 'null'; 
            }
            str += '&'+ i + '=' + defaults[i].toString();
        }
        srt = str.replace('&', '').replace('\n','').replace(/\s/g, '');
        /*(new Image()).src = '/error?' + srt;*/
    }