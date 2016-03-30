/**
 * Created by 杨阵雨大人 on 2016/3/16 0016.
 */
function signup(){
    var un = $('[name=username]').val().trim();
    var pwd = $('[name = password]').val();
    var pwd2 =  $('#password1').val();
    if(!un || !pwd || !pwd2){
        warn("存在未填写的项目！");
        return;
    }
    else if(pwd!==pwd2){
        warn("两次密码填写不一致！");
        return;
    }
    else if(!emailVerifier(un)){
        warn("Email填写格式有误！");
        return;
    }
    else if(!passwordVerifier(pwd)){
        warn("密码填写格式有误！");
        return;
    }
    //jQuery.post(url, [data], [callback], [type])，第一个参数必须，其他可选
    //url:发送请求地址。
    //data:待发送 Key/value 参数。
    //callback:发送成功时回调函数。
    //type:返回内容格式，xml, html, script, json, text, _default。
    //serialize()序列化表格内容为字符串，用于 Ajax 请求

    $.post('', $('form').serialize())//$.post()方法返回一个jqXHR对象，这是从一个递延所得
        .done(function(res){
            //deferred.done(doneCallbacks[,doneCallbacks])当延迟成功时调用一个函数或者数组函数.
            //该参数可以是一个函数或一个函数的数组。当延迟成功时，doneCallbacks被调用
            //deferred.fail(failCallbacks[,failCallbacks])同理，当延迟失败时，doneCallbacks被调用
            info(res.responseText);
        })
        .fail(function(res){
            warn(res.responseText);
        });

}
/*什么是deferred对象？
 开发网站的过程中，我们经常遇到某些耗时很长的javascript操作。其中，既有异步的操作（比如ajax读取服务器数据），也有同步的操作（比如遍历一个大型数组），它们都不是立即能得到结果的。
 通常的做法是，为它们指定回调函数（callback）。即事先规定，一旦它们运行结束，应该调用哪些函数。
 但是，在回调函数方面，jQuery的功能非常弱。为了改变这一点，jQuery开发团队就设计了deferred对象。
 简单说，deferred对象就是jQuery的回调函数解决方案。在英语中，defer的意思是"延迟"，所以deferred对象的含义就是"延迟"到未来某个点再执行。
 它解决了如何处理耗时操作的问题，对那些操作提供了更好的控制，以及统一的编程接口。*/
function emailVerifier(email){
    if(!simpleVerifier(email)){
        //含有非法字符
        return false;
    }else{
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);

    }

}
function passwordVerifier(pwd){
    return simpleVerifier(pwd);

}
function simpleVerifier(str){
    var re = /[^ ',*&#%()=!]/;
    return re.test(str);

}
function warn(msg){
    $('.alert').hide();
    $('.alert-danger').html(msg).show();
}

function info(msg){
    $('.alert').hide();
    $('.alert-success').html(msg).show();
}