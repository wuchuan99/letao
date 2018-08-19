$(function(){ 
    $('#btn').on('click', function(){
        var word = $('#search').val();
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
        $('.mui-table-view').html(html);
    }
    $('.remove').on('click', function(){
        localStorage.removeItem('words');
        $('.mui-table-view').html('');
    })
})