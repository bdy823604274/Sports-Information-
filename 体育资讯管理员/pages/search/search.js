// pages/main/main.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        topic: [],
        images: [],

        topTopic: [],
        topimages: [],


        type: ""

    },

    //评论
    talk: function (e) {
        let that = this
        let topicId = e.currentTarget.dataset.id
        console.log(e.currentTarget.dataset.id)
        wx.navigateTo({
            url: '/pages/talk/talk?id=topicId'
        })
    },

    //点赞
    zan: function (e) {
        let that = this
        let topicId = e.currentTarget.dataset.id
        let type = that.data.type
        console.log(e.currentTarget.dataset.id)
        wx.request({
            url: 'http://localhost/server/public/getZan?topId=' + topicId,
            data: {

            },
            method: 'POST',
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(res) {
                console.log(res)
                that.gettopic(type);
                that.toptopic(type);
            }
        })
    },

    //获取置顶话题
    toptopic: function (type) {
        let that = this;
        let topTopic = that.data.topic;
        let topimages = that.data.images;
        let split = split;
        wx.request({
            url: 'http://localhost/server/public/getToptopic?type=' + type,
            data: {

            },
            method: 'POST',
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(res) {
                console.log(res.data)
                for (let i = 0; i < res.data.length; i++) {
                    let a = res.data[i].topic_img.split("\\")
                    // images.push(a[0])
                    // console.log(images)
                    // let img = a[0]
                    // console.log(img)
                    // let imgs = a[1]
                    let img = a[0] + '/' + a[1]
                    topimages.push(img)

                }
                console.log(topimages)
                let topTopic = res.data
                that.setData({
                    topTopic,
                    topimages
                })
            }
        })
    },

    //取消置顶
    desTop: function (e) {
        // console.log(id)
        let that = this
        let type = that.data.type
        console.log(type, 110)
        let topicId = e.currentTarget.dataset.id
        console.log(topicId)
        wx.request({
            url: 'http://localhost/server/public/desTop?topId=' + topicId,
            data: {

            },
            method: 'POST',
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(res) {
                console.log(res)
                wx.showToast({
                    title: res.data,
                    icon: 'success',
                    duration: 2000
                })
                that.onLoad(type)
            }
        })
    },


    //获取话题
    gettopic: function (type) {
        let that = this;
        let topic = that.data.topic;
        let images = that.data.images;
        let split = split;
        wx.request({
            url: 'http://localhost/server/public/getKeytopic?type=' + type,
            data: {

            },
            method: 'POST',
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(res) {
                console.log(res.data)
                for (let i = 0; i < res.data.length; i++) {
                    let a = res.data[i].topic_img.split("\\")
                    // images.push(a[0])
                    // console.log(images)
                    // let img = a[0]
                    // console.log(img)
                    // let imgs = a[1]
                    let img = a[0] + '/' + a[1]
                    images.push(img)

                }
                console.log(images)
                let topic = res.data
                that.setData({
                    topic,
                    images
                })
            }
        })
    },


    //删除话题
    delete: function (e) {
        // console.log(id)
        let that = this
        let type = that.data.type
        console.log(type, 110)
        let topicId = e.currentTarget.dataset.id
        console.log(topicId)
        wx.request({
            url: 'http://localhost/server/public/deleteTopic?id=' + topicId,
            data: {

            },
            method: 'POST',
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(res) {
                console.log(res)
                that.gettopic(type)
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log('key', options.key)
        let type = this.data.type
        this.setData({
            type: options.key
        })
        this.gettopic(options.key);
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