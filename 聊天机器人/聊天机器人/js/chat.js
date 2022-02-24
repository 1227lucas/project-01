$(function () {
    //初始化右侧滚动条
    //这个定义在scroll.js中
    resetui()

    //发送按钮绑定鼠标点击事件
    $('#btnSend').on('click', function () {
        var text = $('#ipt').val().trim()
        if (text.length <= 0) {
            return $('#ipt').val('')
        }
        //如果用户输入了聊天内容，则将聊天内容追加到页面上显示
        $('#talk_list').append('<li class="right_word"><img src="img/person02.png" /> <span>' + text + '</span></li>')
        $('#ipt').val('')
        //重置滚动条的位置
        resetui()
        //发起请求，获取聊天内容
        getMsg(text)
    })
    //获取聊天机器人发送回来的消息
    function getMsg(text) {
        $.ajax({
            method: 'GET',
            url: 'http://www.liulongbin.top:3006/api/robot',
            data: {
                spoken: text
            },
            success: function (res) {
                //接受聊天消息
                if (res.message === 'success') {
                    var msg = res.data.info.text
                    $('#talk_list').append('<li class="left_word"><img src="img/person01.png" /> <span>' + msg + '</span></li>')
                    //重置滚动条的位置
                    resetui()
                    //调用getVoice函数，把文本转化为语音
                    getVoice(msg)
                }
            }
        })
    }

    //把文字转化为语音进行播放
    function getVoice(text) {
        $.ajax({
            method: 'GET',
            url: 'http://www.liulongbin.top:3006/api/synthesize',
            data: {
                text: text
            },
            success: function (res) {
                // console.log(res);
                if (res.status === 200) {
                    //播放语音
                    $('#voice').attr('src', res.voiceUrl)
                }
            }
        })
    }

    //为文本框绑定keyup事件
    $('#ipt').on('keyup', function (e) {
        if (e.keyCode === 13) {
            $('#btnSend').click()
        }
    })
}) 