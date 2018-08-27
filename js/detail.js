$(function(){
    var str = location.href;
    var arr = str.split('?');
    var newStr = arr[1];
    var newArr = newStr.split("=");
    var id = newArr[1];
    
    var size;
    $.ajax({
        type: 'get',
        url: '/product/queryProductDetail',
        data: {
            id: id
        },
        success: function(res){
            var html = template('temp', res);
            $('.prouct').html(html);
            mui('.mui-numbox').numbox();
            var gallery = mui('.mui-slider');
            gallery.slider({
                interval: 0//自动轮播周期，若为0则不自动播放，默认为0；
            });

            $('#size').on('tap', 'span', function(){
                $(this).css('backgroundColor', 'yellow').siblings().css('backgroundColor', '');
                size = $(this).text();
            })
        }
    })

   
    $('#addCart').on('tap', function(){
        var num = $('#num').val();
        $.ajax({
            type: 'post',
            url: '/cart/addCart',
            data: {
                productId: id,
                num: num,
                size: size
            },
            success: function(res){
                if(res.success){
                    location.href = './cart.html';
                }
            }
        })
    })
})