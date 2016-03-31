//设备型号检测
var browser = {
   versions: function() {
     var u = navigator.userAgent,
     var app = navigator.appVersion;
     return { //移动终端浏览器版本信息
       trident: u.indexOf('Trident') > -1, //IE内核
       presto: u.indexOf('Presto') > -1, //opera内核
       webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
       gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
       mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
       ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
       android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
       iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
       iPad: u.indexOf('iPad') > -1, //是否iPad
       webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
     };
   }(),
   language: (navigator.browserLanguage || navigator.language).toLowerCase()
};

//执行android跳转方式
var furl = function(typename, id) {
  if (browser.versions.android) {
   window.androidactivity.runOnAndroidJavaScript(typename, id);
  }
};

//获取浏览器类型检测
function getliulanqi() {
  if (browser.versions.ios) {
    alert("IOS")
  } else if (browser.versions.android) {
    alert("ANDROID")
  } else {
    alert("其它浏览器")
  }
}

//微信访问类型验证
var getQueryString = function(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
   return unescape(r[2]);
  }
  return null;
}

/**
 *@fun 跳转到详情页面
 *@txt 链接文本[可选]
 *@typename 跳转类型为固定写法[productDetail]
 *@id 产品ID
 *@css 类名[可选]
 */
var getaDetail = function(txt,typename,id,css){
  var str="";
  var isWeixin = getQueryString("openId");
  var openId = '{$openId}';

  if(isWeixin){
    str+="<a class='"+ css +"' href='/product/Detail/index?productId="+id+"&openId="+openId+"&platform=1&transform_from=5'>"+txt+"</a>";
    return str;
  }else{
    if (browser.versions.ios){
      str+="<a class='"+ css +"' href='app://"+typename+"."+id+"'>"+txt+"</a>";
    }else{
      str+="<a class='"+ css +"' href=\"javascript:furl('"+typename+"','"+id+"')\">"+txt+"</a>";
    }
    return str;
  }
};

/**
 *@fun 跳转到列表页
 *@txt 链接文本[可选]
 *@typename 跳转类型为固定写法[productList]
 *@id 产品类型[1信托,2资管,3阳光私募,4其它]
 *@css 类名[可选]
 */
var getaList = function(txt,typename,id,css){ 
  var str="";
  var isWeixin = getQueryString("openId");
  var openId = '{$openId}';

  if(isWeixin){
    str+="<a class='"+ css +"' href='/weixin/Weixin/allList?openId="+openId+"&platform=1&transform_from=4&typeId="+id+"'>"+txt+"</a>";
    return str;
  }else{
    if (browser.versions.ios){
      str+="<a class='"+ css +"' href='app://"+typename+"."+id+"'>"+txt+"</a>";
    }else{
      str+="<a class='"+ css +"' href=\"javascript:furl('"+typename+"','"+id+"')\">"+txt+"</a>";
    }
    return str;
  }
};


/**调用方法:
  $(function(){
    $('#d1').append(geta('产品详情','productDetail',65536));//产品id
    $('#d1').append(geta('订单详情','orderDetail',1));//订单id
    $('#d1').append(geta('预约列表','reservationList',1));//1待确认,2成功,3失败
    $('#d1').append(geta('订单列表','orderList',1));//1 在途订单,2交易完成,3交易失败
    $('#d1').append(geta('产品列表','productList',1));// 1信托,2资管,3阳光私募,4其它
    $('#d1').append(geta('搜索页','search','keyword'));//搜索关键词
    $('#d1').append(geta('订阅列表','favoriteList',0));
    $('#d1').append(geta('编辑资料','editProfile',0));
    $('#d1').append(geta('交易设置','tradeSet',0));
    $('#d1').append(geta('优惠券','coupon',0));
    $('#d1').append(geta('佣金钱包','wallet',0));
    $('#d1').append(geta('身份认证','businessCard',0));
    $('#d1').append(geta('登录后查看','login',0));
    $('#d1').append(geta('webview','webview','https://www.baidu.com/'));
  })
 */



