if(!sessionStorage.getItem('user')){
    location.href = './login.html';
}

var info = null;
$.ajax({
    type: 'get',
    url: '/user/queryUserMessage',
    async: false,
    success: function(res){
        console.log(res);
        if(res.id){
            info = res;
        }
        if(!res.isDelete){
            location.href = './login.html';
            sessionStorage.removeItem('user');
            mui.toast('账号被禁用');
        }
    }
})

$(function(){
    $('#logout').on('tap', function(){
        $.ajax({
            type: 'get',
            url: '/user/logout',
            success: function(res){
                if(res.success){
                    location.href = './index.html';
                    sessionStorage.removeItem('user');
                }
            }
        })
    })
    
    var html = template('temp', info);
    $('.temp').html(html);
   
})