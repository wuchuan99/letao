$(function(){
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005, 
        indicators: false
    });
    $.ajax({
        type: 'get',
        url: '/category/queryTopCategory',
        success: function(result){
            var html = template('temp-1', result);
            $('.cate-l').html(html);
        }
    })


    function gt(id){
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategory',
            data: {
                id: id
            },
            success: function(result){
                var html = template('temp-2', result);
                $('.cate-r').html(html);
            }   
        })
    }
    gt(1);
    $('.cate-l').on('tap', 'a', function(){
        $(this).parent().addClass('active').siblings().removeClass('active');
        var id = $(this).attr('data-id');
        gt(id);
    })
})
