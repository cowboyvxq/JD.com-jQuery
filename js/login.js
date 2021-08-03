$(function() {
    timer = null;
    // 点击让图片显示 2秒后自动隐藏
    $('.head_left').click(function() {
        clearInterval(timer);
        $('.show_pic').show(300);
       timer = setInterval(() => {
        $('.show_pic').hide(300);
        }, 2000);
    })

    $('.head_right').click(function() {
        $('.qr_code_right').show(200);
        $('.qr_code_left').hide(200);
        $(this).css('color','#f00').siblings().css('color','#999');
        // $('.head_left').css('color','#999');
    })

     $('.head_left').click(function() {
        $('.qr_code_left').show(200);
        $('.qr_code_right').hide(200);
         $(this).css('color','#f00').siblings().css('color','#999');
        // $('.head_right').css('color','#999');
    })

    // 鼠标移入让图片显示，移出让图片隐藏
    $('.left_pic').hover(function() {
        clearInterval(timer);
        $('.show_pic').show(300);
    },
    function() {
        $('.show_pic').hide(300);
    })
})