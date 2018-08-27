if(!sessionStorage.getItem('user')){
    location.href = './login.html';
}

$(function(){
    $('#register').on('tap', function(){
        var oldPassword = $('#oldPassword').val();
        var newPassword = $('#newPassword').val();
        var newPasswordi = $('#newPasswordi').val();
        var vCode = $('#rz').val();
        if(!oldPassword.trim() || !newPassword.trim() || !newPasswordi.trim()){
            mui.toast('密码不能为空');
            return;
        }
        if(newPassword != newPasswordi){
            mui.toast('两次输入的密码不一样');
            return;
        }
        if(!/^\d{6}$/.test(vCode)){
			mui.toast('验证码的格式不符合要求');
			return;
		}
        $.ajax({
            type: 'post',
            url: '/user/updatePassword',
            data: {
                oldPassword: oldPassword,
                newPassword: newPassword,
                vCode: vCode
            },
            success: function(res){
                console.log(res)
                if(res.success){
                    mui.toast('修改成功');
                    setTimeout(function(){
                        sessionStorage.removeItem('user');
                        location.href = './login.html';
                    },2000) 
                } else {
                    mui.toast(res.message);
                }
            }
        })
    })
   
   

    $('#btn').on('tap', function(){
        $.ajax({
            type: 'get',
            url: '/user/vCodeForUpdatePassword',
            success: function(res){
                console.log(res.vCode);
                info = res.vCode;
            }
        })
    })
})