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
    var str = location.href;
    var arr = str.split('?');
    var newStr = arr[1];
    var newArr = newStr.split("=");
    var id = newArr[1];
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
            url: '/address/updateAddress',
            data: {
                id: id,
                address: showCityPicker,
                addressDetail: addressDetail,
                recipients: recipients ,
                postcode: postcode
            },
            success: function(res){
                if(res.success){
                    location.href = './address.html';
                }
            }
        })
    })

    $.ajax({
        type: 'get',
        url: '/address/queryAddress',
        success: function(res){
            console.log(res);
            $(res).each(function(index, value){
                if(value.id == id){
                    $('#recipients').val(this.recipients);
                    $('#postcode').val(this.postCode);
                    $('#showCityPicker').val(this.address);
                    $('#addressDetail').val(this.addressDetail);
                    $('.mui-input-group').css('color', '#888');
                }
            })
        }
    })
})