$(function(){
    $('#logout').on('tap', function(){
        $.ajax({
            type: 'get',
            url: '/user/logout',
            success: function(res){
                if(res.success){
                    location.href = './index.html';
                }
            }
        })
    })

    $.ajax({
        type: 'get',
        url: '/user/queryUserMessage',
        success: function(res){
            console.log(res)
            if(res.id){
                var html = template('temp', res);
                $('.temp').html(html);
            } else {
                location.href = './login.html'; 
            }
        }
    })
})