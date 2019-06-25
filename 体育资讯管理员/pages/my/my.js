// pages/my/my.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userId:'',
        information:[]
    },

    //获取缓存中的用户Id
    getUserid: function () {
        const that = this
        wx.getStorage({
            key: 'userid',
            success: function (res) {
                console.log('用户id', res.data)
                that.setData({
                    userId: res.data
                })
                that.getUserId()
            }
        })
    },

    //获取个人信息
    getUserId:function(){
        let that = this
        let userId = that.data.userId
        wx.request({
            url: 'http://localhost/server/public/getMId?userid=' + userId,
            data: {

            },
            method: 'POST',
            header: {
                'content-type': 'application/json'
            },
            success(res) {
                console.log(res.data)
                let information = res.data
                that.setData({
                    information
                })
                console.log(information[0].userName)

            }
        })
    },

    //退出登录
    submit:function(){
        wx.showModal({
            title: '退出登录',
            content: '确认退出登录吗？',
            success(res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                    wx.navigateTo({
                        url: '/pages/log/log'
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getUserid()
        
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