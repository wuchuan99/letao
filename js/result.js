$(function(){
    var str = location.href;
    var arr = str.split('?');
    var newStr = arr[1];
    var newArr = newStr.split("=");
    var proName = newArr[1];
    var page = 1;
    var pageSize = 2;
    var data = {};
    var products = {};
    var num = 1;
    var price = 1;
    var flag = false;
    var that;
    
    data.page = page;
    data.pageSize = pageSize;
    data.proName = proName;
    data.num = num;
    data.price = price;

    mui.init({
        pullRefresh : {
          container: document.querySelector('#refresh'),//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
          up : {
            height:50,//可选.默认50.触发上拉加载拖动距离
            auto:true,//可选,默认false.自动上拉加载一次
            contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
            contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
            callback: gt //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
          }
        }
    })

    $('#price').on('tap', function(){
        data.price = (data.price == 1 ? 2 :1);
        data.page = 1;
        flag = false;
        products = {};
        mui('#refresh').pullRefresh().refresh(true);
        gt();
    })
    
    $('#num').on('tap', function(){
        data.num = (data.num == 1 ? 2 :1);
        data.page = 1;
        flag = false;
        products = {};
        mui('#refresh').pullRefresh().refresh(true);
        gt();
    })

    function gt(){
        if(!that){
            that = this; 
        }
        if(!flag){ 
            $.ajax({
                type: 'get',
                url: '/product/queryProduct',
                data: data,
                success: function(res){
                    for(var k in res){
                        if(k == 'data'){
                            if(!products.data){
                                products[k] = res[k];
                            } else {
                                $(res[k]).each(function(index, value){
                                    products.data.push(value);
                                })
                            }    
                        }
                    }
                    var html = template('temp', products);
                    $('.pro').html(html);
                    var total = Math.ceil(res.count / pageSize);
                    data.page++;
                    if(data.page > total) {
                        flag = true;     
                    }
                    that.endPullupToRefresh(flag);
                }   
            })
        }   
    }  
})