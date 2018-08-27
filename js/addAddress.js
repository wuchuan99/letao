if(!sessionStorage.getItem('user')){
    location.href = './login.html';
}
$(function(){
    var cityPicker = new mui.PopPicker({layer:3});
    cityPicker.setData(cityData);
	var showCityPickerButton = document.getElementById('showCityPicker');
	showCityPickerButton.addEventListener('tap', function(event) {
		cityPicker.show(function(items) {
			$('[name="address"]').val((items[0] || {}).text + (items[1] || {}).text + (items[2] || {}).text);
		});

    }, false);
    
    $('#ok').on('tap', function(){
        var recipients = $('#recipients').val();
        var postcode = $('#postcode').val();
        var showCityPicker = $('#showCityPicker').val();
        var addressDetail = $('#addressDetail').val();
        if(!recipients.trim() || !postcode.trim() || !showCityPicker.trim() || !addressDetail.trim()){
            mui.toast('内容不能为空');
            return;
        }

        $.ajax({
            type: 'post',
            url: '/address/addAddress',
            data: {
                address: showCityPicker,
                addressDetail: addressDetail,
                recipients: recipients,
                postcode: postcode 
            },
            success: function(res){
                if(res.success){
                    mui.toast('添加成功');
                    setTimeout(function(){
                        location.href = './address.html';
                    },2000)
                }
            }
        })
    })

   
}) 
    