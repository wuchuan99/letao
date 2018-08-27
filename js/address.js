if(!sessionStorage.getItem('user')){
    location.href = './login.html';
}

$(function(){
    $.ajax({
        type: 'get',
        url: '/address/queryAddress',
        success: function(res){
            var html = template('temp', {data: res.reverse()});
            $('.table').prepend(html);
        }
    })

    var message = '确定删除吗';
    $('.table').on('tap', '.delete', function(){
        var id = $(this).data('id');
        var li = $(this).parent().parent();
        mui.confirm(message, function(res){
            if(res.index){
                $.ajax({
                    type: 'post',
                    url: '/address/deleteAddress',
                    data: {
                        id: id
                    },
                    success: function(res){
                        if(res.success){
                            li.remove();
                        }
                    }
                })
            } else {
                mui.swipeoutClose(li[0]);
            }
        })      
    })
})