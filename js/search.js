$(function(){ 
    $('#btn').on('click', function(){
        var word = $('#searchs').val();
        if(!word.trim()){
            alert('搜索内容不能为空');
            return;
        }
        if(localStorage.getItem('words')){
            var words = JSON.parse(localStorage.getItem('words'));
            var flag = true;
            $(words).each(function(index,value){
                if(value == word) {
                    flag = false;
                }
            })
            if(flag){
                words.unshift(word);
            } 
            localStorage.setItem('words', JSON.stringify(words));
        } else {
            localStorage.setItem('words', JSON.stringify([word]));
        }
        location.href = '/m/result.html?key=' + word;
    }) 
    if(localStorage.getItem('words')) {
        var words = JSON.parse(localStorage.getItem('words'));
        var html = template('temp', {data: words});
        $('.cun .mui-table-view').html(html);
    }
    $('.remove').on('click', function(){
        localStorage.removeItem('words');
        $('.cun .mui-table-view').html('');
    })

    var page = 1;
    var pageSize = 6;
    $('#searchs').on('keyup',function(){
        var proName = $(this).val();
        console.log(proName);
        $.ajax({
            type: 'get',
            url: '/product/queryProduct',
            data: {
                proName: proName,
                page: page,
                pageSize: pageSize 
            },
            success: function(res){
                if(proName.length > 0 && res.data.length > 0){
                    var html = template('tem', res);
                    $('.view').html(html);
                } else {
                    $('.view').html('');
                }    
            }
        })
    })
})