$(function(){
    $('#register').on('tap', function(){
        var name = $('#name').val();
        var phone = $('#phone').val();
        var password = $('#password').val();
        var passwordi = $('#passwordi').val();
        var vCode = $('#rz').val();
        if(!name.trim()){
            mui.toast('用户名不能为空');
            return;
        }
        if(phone.length != 11){
            mui.toast('请输入正确的手机号');
            return;
        }
        if(password != passwordi || !password.trim() || !passwordi.trim()){
            mui.toast('两次密码不一样或密码不能为空');
            return;
        }
        if(!/^\d{6}$/.test(vCode)){
			mui.toast('验证码的格式不符合要求');
			return;
		}
        $.ajax({
            type: 'post',
            url: '/user/register',
            data: {
                username: name,
                password: password,
                mobile: phone,
                vCode: vCode
            },
            success: function(res){
                console.log(res);
                if(res.success){
                    mui.toast('注册成功');
                    setTimeout(function(){
                        location.href = './login.html';
                    },200)
                } else {
                    mui.toast(res.message);
                }
            }
        })
    })

    $('#btn').on('tap', function(){
        $.ajax({
            type: 'get',
            url: '/user/vCode',
            success: function(res){
                console.log(res.vCode);       
            }
        })
    })
})