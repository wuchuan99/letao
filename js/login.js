$(function(){
    $('#btn').on('tap', function(){
        var name = $('#name').val();
        var password = $('#password').val();
        if(!name.trim()){
            mui.toast('用户名不能为空');
            return;
        }
        if(!password.trim()){
            mui.toast('用户名不能为空');
            return;
        }

        $.ajax({
            type: 'post',
            url: '/user/login',
            data: {
                username: name,
                password: password
            },
            beforeSend: function(){
                $('#btn').val('正在登录...');
            },
            success: function(res){
                if(res.success){
                    mui.toast('登陆成功');
                    setTimeout(function(){
                        location.href = 'user.html';
                    },2000)
                } else {
                    mui.toast(res.message);
                    $('#btn').val('登录');
                }
            }
        })
    })
    
})