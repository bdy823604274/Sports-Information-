//logs.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        phone: '',
        password: '',

    },

    formSubmit(e) {
        var that = this
        console.log(e.detail.value)
        that.setData({
            phone: e.detail.value.phone,
            password: e.detail.value.password,
        })
        that.log()
    },
    //登陆
    log: function () {
        var that = this
        let phone = that.data.phone
        let password = that.data.password
        wx.request({
            url: 'http://localhost/server/public/logs?username=' + phone
                + '&password=' + password,
            data: {

            },
            method: 'POST',
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(res) {
                console.log(res)
                // let userid = res.data.id
                wx.setStorage({
                    key: 'userid',
                    data: res.data[0].id
                })
                // wx.getStorage({
                //     key: 'userid',
                //     success: function (res) {
                //         console.log(res.data)
                //     }
                // })
              if (res.data != '数据输入有误！') {
                    wx.showModal({
                        title: '登录成功',
                        content: '欢迎使用资讯系统，请点击确认登录！',
                        success(res) {
                            if (res.confirm) {
                                console.log('用户点击确定')
                                wx.switchTab({
                                    url: '/pages/index/index'
                                })
                            } else if (res.cancel) {
                                console.log('用户点击取消')
                            }
                        }
                    })
                }
                else {
                    wx.showModal({
                        title: '登录失败',
                        content: '登录失败，请点击重新登录！',
                        success(res) {
                            if (res.confirm) {
                                console.log('用户点击确定')
                                wx.switchTab({
                                    url: '/pages/log/log'
                                })
                            } else if (res.cancel) {
                                console.log('用户点击取消')
                            }
                        }
                    })
                }
            }
        })

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
