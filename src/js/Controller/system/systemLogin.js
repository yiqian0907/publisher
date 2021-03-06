require.config({
  paths: {
    jquery: '../../../lib/jquery.min',
    sh1: '../../../lib/sha1',
    easyui: '../../../lib/jquery-easyui/jquery.easyui.min',
    ajaxSetup: '../../../js/student/ajaxSetup',
    cookie: '../../../lib/js.cookie'
  }
});

require(['jquery', 'sh1', 'easyui', 'cookie'], function($, sh1, easyui, Cookies) {
  $(function() {
    $('#submitBtn').on('click', function() {
      var dataArr = $('#login').serializeArray();
      // console.log(dataArr);
      /* eslint-disable-next-line */
      dataArr[1].value = b64_sha1(dataArr[1].value);
      // console.log(dataArr);
      $.ajax({
        url: 'http://localhost:45550/authorize',
        type: 'POST',
        data: dataArr,
        dataType: 'json',
        success: function(resData) {
          if (resData.code === 1) {
            // console.log('登录成功');
            // $.messager.alert('消息标题', '登录成功', 'info');
            Cookies.set('Authorization', dataArr[1].value);
            window.location.href = 'http://localhost:30000/api/view/system/admin.html';
          } else {
            // console.log('fail');
            $.messager.alert('消息标题', '登录失败，用户名和密码不匹配', 'error');
          }
        }
      });
    });
  });
});
