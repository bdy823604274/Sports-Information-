// pages/content/content.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        title: '',
        content: '',
        id: '',
        pingContent: '',
        userid: '',
        comment: [],
        name: '',
        imgs: "",
        img: ""
    },

    //获取用户Id
    getUserid: function () {
        const that = this
        wx.getStorage({
            key: 'userid',
            success: function (res) {
                console.log('用户id', res.data)
                that.setData({
                    userid: res.data
                })
                that.getuser()           //获取用户name
            }
        })
    },

    //根据id获取话题详情
    getcontent: function () {
        const that = this
        let id = that.data.id
        // let id = that.data.id
        let title = that.data.title
        let content = that.data.content
        let img = that.data.img
        let imgs = that.data.imgs
        wx.request({
            url: 'http://localhost/server/public/getIdtopic?id=' + id,
            data: {

            },
            method: 'POST',
            success(res) {
                // console.log(res)

                console.log(res.data)
                // id = res.data[0].id
                title = res.data[0].title
                content = res.data[0].content
                console.log(res.data[0].title, "5.5")
                console.log(res.data[0].topic_img)
                let a = res.data[0].topic_img.split("\\")
                let img = a[0]
                console.log(img)
                let imgs = a[1]
                // for (let i = 0; i < res.data.length; i++) {
                //     imgurls.push(res.data.values[i].imgAddress.slice(15))
                // }
                // let privewUrl = []
                // for (let i = 0; i < imgurls.length; i++) {
                //     privewUrl.push('localhost/' + that.data.imgurls[i])
                // }
                // console.log(privewUrl)
                // console.log(imgurls)
                that.setData({
                    title,
                    content,
                    img,
                    imgs
                    // id,
                    // imgurls,
                    // privewUrl
                })
            }
        })
    },

    //输入评论
    inputPing: function (e) {
        console.log(e)
        let that = this
        let id = e.currentTarget.dataset.id  //话题id
        let pingContent = e.detail.value   //评论内容
        // let userid = 1             //用户ID
        that.setData({
            id,
            pingContent,
            // userid
        })

    },

    //删除评论
    delete: function (e) {
        // console.log(id)
        let that = this
        let commentId = e.currentTarget.dataset.id
        console.log(commentId)
        wx.request({
            url: 'http://localhost/server/public/deleteComment?id=' + commentId,
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

    //置顶
    top: function (e) {
        // console.log(id)
        let that = this
        let topicId = e.currentTarget.dataset.id
        console.log(topicId)
        wx.request({
            url: 'http://localhost/server/public/top?topId=' + topicId,
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
                that.onReady()
            }
        })
    },


    
    



    //获取评论
    getAllComment: function () {
        let that = this
        let comment = that.data.comment
        let id = that.data.id
        console.log("获取评论的id0.0", id)
        wx.request({
            url: 'http://localhost/server/public/getAllComment?id=' + id,
            data: {

            },
            method: 'POST',
            success(res) {
                console.log(res.data)
                let comment = res.data
                that.setData({
                    comment,
                })
            }
        })
    },

    //根据userid获取用户
    getuser: function () {
        let that = this
        let userid = that.data.userid
        console.log("用户ID", userid)
        wx.request({
            url: 'http://localhost/server/public/getMId?userid=' + userid,
            data: {

            },
            method: 'POST',
            success(res) {
                console.log("用户", res)
                console.log(res.data[0].name, 1111)
                let name = res.data[0].name
                console.log(name)
                that.setData({
                    name,
                })
                // wx.setStorage({
                //     key: 'name',
                //     data: res.data[0].name
                // })

            }
        })
    },

    //发布评论
    pingTap: function () {
        let that = this
        let id = that.data.id //话题id
        console.log("评论的话题id", id)
        let pingContent = that.data.pingContent   //评论内容
        // let userid = that.data.userid            //用户ID
        let name = that.data.name
        console.log("评论的name", name)
        wx.request({
            url: 'http://localhost/server/public/comment?topicId='+id + '&username=' +name+'&content=' + pingContent,
            data: {

            },
            method: 'POST',
            success(res) {
                console.log(res)
                if(res.data = 1){
                    wx.showModal({
                        title: '评论成功',
                        content: '恭喜评论你，评论成功',
                        success(res) {
                            if (res.confirm) {
                                console.log('用户点击确定')
                            } else if (res.cancel) {
                                console.log('用户点击取消')
                            }
                        }
                    })
                    that.onReady()
                }
                
            }
        })

    },

    //图片预览
    previewImage: function (e) {
        wx.previewImage({
            current: e.currentTarget.id, // 当前显示图片的http链接
            urls: this.data.privewUrl // 需要预览的图片http链接列表
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getUserid()
        console.log('话题ID', options.id)
        let id = options.id
        this.setData({
            id:id
        })
        this.getcontent()    //调用获取话题详情的方法
       
        // this.getuser()           //获取用户name
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.getAllComment()    //调用获取评论的方法
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