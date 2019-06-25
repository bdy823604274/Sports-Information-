<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006~2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------


    use think\Route;
    //路由
    Route::rule('upImages','index.php/talk/Images/upImages','GET|POST');//上传图片
    Route::post('log','index.php/talk/Log/getlog'); //登录
    Route::post('register','index.php/talk/Log/register');//注册
    Route::post('getUserId','index.php/talk/Log/getUserId');   //根据Id获取用户个人信息
    Route::post('logs','index.php/talk/Log/getlogs'); //管理员登录
    Route::post('getMId','index.php/talk/Log/getMId');   //根据Id获取管理员个人信息
    Route::post('deleteUser','index.php/talk/Log/deleteUser');//删除用户
    Route::post('getAlluser','index.php/talk/Log/getAlluser');//获取所有用户
    Route::post('getuser','index.php/talk/Log/getuser');//根据id获取用户
    Route::post('topic','index.php/talk/Log/topic');//发布话题
    Route::post('deleteTopic','index.php/talk/Log/deleteTopic');//删除话题
    Route::post('gettopic','index.php/talk/Log/gettopic');//获取话题
    Route::post('getIdtopic','index.php/talk/Log/getIdtopic');//根据ID获取话题
    Route::post('getKeytopic','index.php/talk/Log/getKeytopic');//根据关键字获取话题
    Route::post('getTptopic','index.php/talk/Log/getTptopic');//根据type获取话题
    Route::post('getToptopic','index.php/talk/Log/getToptopic');//根据type获取置顶话题
    Route::post('comment','index.php/talk/Log/comment'); //发布评论
    Route::post('getAllComment','index.php/talk/Log/getAllComment'); //获取所有评论
    Route::post('getZan','index.php/talk/Log/getZan'); //点赞
    Route::post('top','index.php/talk/Log/top'); //推荐
    Route::post('desTop','index.php/talk/Log/desTop'); //取消推荐
    Route::post('updateComment','index.php/talk/Log/updateComment'); //更新所有评论
    Route::post('deleteComment','index.php/talk/Log/deleteComment'); //删除评论