// pages/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        
        topic: [],
        imgUrls: [
            'https://resource.ttplus.cn/publish/app/data/2019/05/26/243163/392940f2-c0b4-466d-a0b1-9ce24527cf1c.jpg@!img01',
            'https://resource.ttplus.cn/publish/app/data/2019/05/27/243224/4e93b670-4a0f-4be0-8288-ec066f178b83.jpg@!img02',
            'https://resource.ttplus.cn/publish/app/data/2019/05/27/243231/65f94987-b78e-4dbc-8144-e219df8886f9.jpg@!img02'
        ],
        indicatorDots: true,
        autoplay: true,
        interval: 2000,
        duration: 1000,
        images: [],
        inputShowed: false,
        inputVal: ""
    },
    
    showInput: function () {
        this.setData({
            inputShowed: true
        });
    },
    hideInput: function () {
        this.setData({
            inputVal: "",
            inputShowed: false
        });
    },
    clearInput: function () {
        this.setData({
            inputVal: ""
        });
    },
    inputTyping: function (e) {
        console.log(e.detail.value)
        this.setData({
            inputVal: e.detail.value
        });
        wx.navigateTo({
            url: '/pages/search/search?key=' + e.detail.value
        })
    },

    //点赞
    zan: function (e) {
        let that = this
        let topicId = e.currentTarget.dataset.id
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
                that.onReady()
            }
        })
    },

    //获取话题
    gettopic: function () {
        let that = this;
        let topic = that.data.topic;
        let images = that.data.images
        wx.request({
            url: 'http://localhost/server/public/gettopic',
            data: {

            },
            method: 'POST',
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(res) {
                // console.log(res.data)
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
                that.onReady()
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */

    onLoad: function (options) {
        this.gettopic()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.gettopic()
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.gettopic()
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