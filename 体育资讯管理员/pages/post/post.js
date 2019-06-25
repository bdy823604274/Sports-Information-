// pages/post/post.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //用户ID
        userid: "",

        //作业标题
        title: "",

        //话题内容输入字符串长度
        textlen: 0,
        // textarea输入字符串内容
        content: "",

        topic: {},


        //上传图表
        uploadIcon: false,
        //上传最大图片数量
        imgUploadNumMax: 9,
        // 上传图片本地路径
        files: [],
        cloudfiles: [],
        src:"",

        imgUrls: "",
        array: ['综合', '篮球', '足球', '乒乓球'],
        index: 0,
        type:""

    },
    bindPickerChange: function (e) {
        let that = this
        let array = that.data.array
        // let type = that.data.type
        // console.log('picker发送选择改变，携带值为', e.detail.value)
        let type = array[e.detail.value]
        this.setData({
            // index: e.detail.value,
            // type: array[e.detail.value]
            type
        })
        console.log('picker发送选择值为', type)
    },

    //获取用户Id
    getUserid: function () {
        const that = this
        wx.getStorage({
            key: 'userid',
            success: function (res) {
                console.log(res.data)
                that.setData({
                    userid: res.data
                })
            }
        })
    },

    // 话题内容
    taskContent: function (e) {
        //获取文本字数,最多输入1000字
        var textlen = e.detail.value.length

        this.setData({
            "textlen": textlen,
            "content": e.detail.value
        })
    },

    //话题标题
    getTitle: function (e) {
        var title = e.detail.value

        this.setData({
            "title": e.detail.value
        })
    },


    //选择图片
    chooseImage: function (e) {
        var that = this;
        wx.showModal({
            title: '选择图像',
            content: '',
            confirmText: "打开相册",
            cancelText: "打开相机",
            success: function (res) {
                // console.log(res);
                if (res.confirm) {
                    console.log('用户点击主操作,打开相册选择图片')
                    wx.chooseImage({
                        sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
                        sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
                        success: function (res) {
                            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                            that.data.files = that.data.files.concat(res.tempFilePaths)
                            if (that.data.files.length > that.data.imgUploadNumMax) {
                                that.data.files = that.data.files.slice(0, that.data.imgUploadNumMax)
                            }
                            that.setData({
                                files: that.data.files
                            });
                            that.imgUploadmax(that.data.files.length)
                        }
                    })

                } else {
                    console.log('用户点击辅助操作，打开相机拍照')
                    wx.chooseImage({
                        sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
                        sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
                        success: function (res) {
                            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                            that.data.files = that.data.files.concat(res.tempFilePaths)
                            if (that.data.files.length > that.data.imgUploadNumMax) {
                                that.data.files = that.data.files.slice(0, that.data.imgUploadNumMax)
                            }
                            that.setData({
                                files: that.data.files
                            });
                            that.imgUploadmax(that.data.files.length)
                        }
                    })
                }
            }
        });
    },

    //图片预览
    previewImage: function (e) {
        wx.previewImage({
            current: e.currentTarget.id, // 当前显示图片的http链接
            urls: this.data.files // 需要预览的图片http链接列表
        })
    },



    //图片长按删除
    deleteImage: function (e) {
        var that = this;
        var images = that.data.files;
        var index = e.currentTarget.dataset.index;//获取当前长按图片下标
        wx.showModal({
            title: '提示',
            content: '确定要删除此图片吗？',
            success: function (res) {
                if (res.confirm) {
                    console.log('点击确定了');
                    images.splice(index, 1);
                    if (that.data.files.length < that.data.imgUploadNumMax) {
                        that.setData({
                            uploadIcon: false
                        })
                    }
                } else if (res.cancel) {
                    console.log('点击取消了');
                    return false;
                }
                that.setData({
                    files: images
                });
            }
        })
    },



    //提交按钮
    submit: function () {
        var textlen = this.data.textlen;
        var content = this.data.content;
        var files = this.data.files;
        let type = this.data.type;
        let topic = {};

        //判断是否有话题内容
        if (textlen > 0 || files.length > 0) {
            //如果有话题内容，赋值给topic
            if (textlen > 0) {
                topic.contents = content
            }
            if (files.length > 0) {
                this.uploadImage()
                topic.files = this.data.cloudfiles
            }

        } else {
            //如果没有内容，提醒
            wx.showModal({
                content: '请输入话题内容或图片',
                showCancel: false,
                success: function (res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    }
                }
            });
            
        }
        this.setData({
            topic
        })
        this.Countdown()
    },

    //定时器
    Countdown: function () {
        let timer, that = this
        if (this.data.cloudfiles.length != this.data.files.length) {
            timer = setTimeout(function () {
                console.log("----Countdown----")
                that.Countdown();
            }, 500)
            wx.showLoading({
                title: '上传中',
                mask: true
            })
        } else {
            this.releaseTopic()
            this.setData({
                title: "",
                content: "",
                files: [],
                uploadIcon: false
            })
            clearTimeout(timer)
            wx.hideLoading()
            // wx.showToast({
            //   title: '上传成功',
            //   icon: 'success',
            //   duration: 3000
            // });
            wx.switchTab({
                url: '/pages/index/index',
            })
        }
    },

    //上传图片
    uploadImage: function () {
        const that = this;
        let cloudfiles = that.data.cloudfiles;
        let files = that.data.files;
        let imgUrls = that.data.imgUrls;
        let src = that.data.src;
        for (var i = 0, lenI = files.length; i < lenI; ++i) {
            wx.uploadFile({
                url: 'http://localhost/server/public/upImages',
                filePath: files[i],
                name: 'file',
                method: 'POST',
                success(res) {
                    let src = res.data       //获取服务器上的图片地址
                    console.log(src,"图片路径");
                    cloudfiles.push(src)     //将服务器上的图片地址放入cloundfiles中
                    //do something
                    // console.log(res)
                    // console.log('.............')
                    console.log(cloudfiles)
                    imgUrls = cloudfiles[0]       
                    for (let i = 1; i < cloudfiles.length; ++i) {
                        imgUrls = imgUrls + "," + cloudfiles[i]
                    }                              //将所有图片的地址拼接放入imgUrls中

                    that.setData({
                        imgUrls,
                        src
                    })
                }
            })
        }
        this.data.cloudfiles = cloudfiles
    },

    //最大上传图片数量
    imgUploadmax: function (len) {
        const that = this
        let fileSnum = len;
        let imgUploadNumMax = this.data.imgUploadNumMax;
        if (fileSnum >= imgUploadNumMax) {
            if (that.data.files.length > that.data.imgUploadNumMax) {
                that.data.files.slice(0, that.data.imgUploadNumMax)
            }
            this.setData({
                uploadIcon: true
            })

        }
    },

    //发布话题
    releaseTopic: function () {
        const that = this;
        let title = that.data.title;
        // console.log(title, "title1111111111111111111")
        let content = that.data.content;
        let img = that.data.imgUrls;
        let src = that.data.src;
        let topic = that.data.topic;
        let userid = that.data.userid;
        let type = that.data.type
        console.log(type);
        console.log(userid)
        wx.request({
            url: 'http://localhost/server/public/topic?userId='+userid+'&content=' + content + '&title=' + title + '&type='+type +'&pics=' + src,
            data: {

            },
            method: 'POST',
            success(res) {
                wx.switchTab({
                    url: '/pages/index/index'
                })
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