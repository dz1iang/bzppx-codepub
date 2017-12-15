$(function() {

    function errorMsg(msg) {
        $(".error-box h1").text("登录出错："+msg);
        $(".error-box").show();
    }
    var refreshCode = function() {
        $(".captcha")[0].src = "/login/captcha?_=" + (Math.random() + "").substring(1)
    };
    $(".captcha").click(refreshCode);
    $("#login-button").click(function(event) {
        event.preventDefault();
        var u = $("[name='username']").val();
        var p = $("[name='password']").val();
        var c = $("[name='captcha']").val();
        if (!u) {
            errorMsg("用户名不能为空！");
            return
        }
        if (!p) {
            errorMsg("密码不能为空！");
            return
        }
        if (!c) {
            errorMsg("验证码不能为空！");
            return
        }
        $.post("", {
            "username": u,
            "password": p,
            "captcha": c,
        }, function(data) {
            if (data.code) {
                $(".error-box").hide();
                $('form').fadeOut(500, function() {
                    setTimeout(function() {
                        location = data.redirect.url;
                    }, data.redirect.sleep);
                });
                $('.welcome-text').show();
            } else {
                errorMsg(data.message);
                // alert(data.message);
                $("[name='captcha']").val("");
                refreshCode();
            }
        }, "json");
        return
    });
});