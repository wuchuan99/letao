$(function(){
    mui('body').on('tap', 'a', function(){
        mui.openWindow({
            url: this.href
        })
    })
})