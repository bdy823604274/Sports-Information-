<?php
/**
 * Created by PhpStorm.
 * User: Asus
 * Date: 2019/3/21
 * Time: 20:48
 */

namespace app\talk\controller;


use app\talk\validate\CkeckValidate;
use think\Db;

class Log
{
    //登录
    public function getlog($username,$password){
        $data = [
            'username' => $username, //账号
            'password' => $password  //密码
        ];
        $validate = new CkeckValidate();   //引入validate验证输入
        $result1 = $validate ->batch()
            ->check($data);
        if($result1){
            $result = Db::query("select * from login_user 
            where  userName = $username and password = $password and status = 1 ");
            if($result){
                return json($result);
            }else{
                return '数据输入有误！';
            }
        }
        else{
            return '数据输入有误！';
        }

    }

    //管理员登录
    public function getlogs($username,$password){
        $data = [
            'username' => $username, //账号
            'password' => $password  //密码
        ];
        $validate = new CkeckValidate();   //引入validate验证输入
        $result1 = $validate ->batch()
            ->check($data);
        if($result1){
            $result = Db::query("select * from manager 
            where  userName = $username and password = $password ");
            if($result){
                return json($result);
            }else{
                return '数据输入有误！';
            }
        }
        else{
            return '数据输入有误！';
        }

    }

    //注册
    public function register($username,$password,$password2,$name){
        $data = [
            'username' => $username,   //账号
            'password' => $password,   //密码
            'password2' => $password2,  //第二次输入的密码
        ];
        $validate = new CkeckValidate();
        $result1 = $validate ->batch()
            ->check($data);
        if ($password2 == $password){
            if($result1){
                $result3 = Db::query("select * from login_user 
            where  userName = $username ");
                if(!$result3){
                    $result = Db::execute('insert into login_user ( userName, password, name) 
            values ( ?, ?, ?)',[$username,$password,$name]);
                    if($result){
                        return '注册成功！';
                    }else{
                        return '注册失败！';
                    }
                }
                else{
                    return '该账号已注册！';
                }
            }
            else{
                return '数据输入有误！';
            }
        }
        else{
            return '两次输入密码不一致！';
        }
    }

    //删除用户
    public function deleteUser($id){
        $result = Db::table('login_user')->where('id', $id)->update(['status' => 0]);
        if($result){
            return '删除成功！';
        }else{
            return '删除失败！';
        }
    }

    //获取所有用户
    public function getAlluser(){
        $result = Db::name('login_user')->where('status',1)->select();
        if($result){
            return json($result);
        }else{
            return '获取失败！';
        }

    }

    //根据id获取用户
    public function getuser($userid){
        $result = Db::name('login_user')->where('id',$userid)->select();
        if($result){
            return json($result);
        }else{
            return '获取失败！';
        }

    }

    //根据id获取管理员
    public function getMId($userid){
        $result = Db::name('manager')->where('id',$userid)->select();
        if($result){
            return json($result);
        }else{
            return '获取失败！';
        }

    }


    //发布话题
    public function topic($userId,$title,$content,$pics,$type){
        $time = date("Y-m-d H:i:s");
        $data=[
            'user_id' => $userId,  //管理员id
            'title' =>$title,     //主题
            'content' => $content,  //文本消息
            'topic_img'=>$pics,  //图片
            'time' => $time,    //发布时间
            'type'=> $type          //类型
//            'pics' => $pics        图片位置
        ];
        $validate = new CkeckValidate();//引入Validate验证
        $result1 = $validate ->batch()
            ->check($data);
        if($result1){
//            $pic = explode(',',$pics); //将多个图片位置分割成数组
            Db::name('topic')->insert($data);//tp5查询构造器
//            $topic_id = Db::name('topic')->getLastInsID();//返回新添加数据的自增值
//            echo $topic_id;
//            for($i=0;$i<count($pic);$i++){
//                $results = Db::execute('insert into picture (topic_id, pic )
//                      values ( ?, ?)',[$topic_id, $pic[$i]]);
////                return $results;
//            };
            return '发布成功';

        }else{
            return '数据输入有误！';
        }
    }


    //获取所有话题
    public function gettopic(){
        $result = Db::query('select * from topic 
                where status = 1 order by id desc');
        if($result){
            return json($result);
        }else{
            return '获取失败！';
        }
    }

    //根据id获取话题
    public function getIdtopic($id){
        $result = Db::query("select * from topic where id = $id ");
        if($result){
            return json($result);
        }else{
            return '获取失败！';
        }
    }

    //根据type获取话题
    public function getTptopic($type){
        $result = Db::query("select * from topic 
                where status = 1 and type = '$type' order by id desc");
        if($result){
            return json($result);
        }else{
            return '获取失败！';
        }
    }

    //根据type获取置顶话题
    public function getToptopic($type){
        $result = Db::query("select * from topic 
                where status = 1 and type = '$type' and top = 1");
        if($result){
            return json($result);
        }else{
            return '获取失败！';
        }
    }

    //根据key获取话题
    public function getKeytopic($type){
        $result = Db::query("select * from topic 
                where status = 1 and content like '%$type%' order by id desc");
        if($result){
            return json($result);
        }else{
            return '获取失败！';
        }
    }

    //删除话题
    public function deleteTopic($id){
        $result = Db::table('topic')->where('id', $id)->update(['status' => 0]);
        if($result){
            return '删除成功！';
        }else{
            return '删除失败！';
        }
    }

    //发布评论
    public function comment($topicId,$username,$content){
        $time = date("Y-m-d H:i:s");
        $data = [
            'topic_id' => $topicId,  //话题id
            'username' => $username,   //用户id
            'content' =>$content,  //文本消息
            'time' => $time        //发布时间
        ];
//        $validate = new CkeckValidate();
//        $result1 = $validate ->batch()
//            ->check($data);
        if (true){
            $result = Db::name('comment')->insert($data);
            if($result){
                return json($result);
            }
            else{
                return '发布失败！';
            }

        }else{
            return '数据输入有误！';
        }
    }


    //获取所有评论
    public function getAllcomment($id){
        $result =  Db::query("select * from comment where topic_id = $id and status=1 order by id desc ");

//        $result = Db::name('comment')->where('status,topic_id',1,$id)->order('id desc')->select();
        if($result){
            return json($result);
        }
        else{
            return '获取失败！';
        }
    }

    //删除评论
    public function deleteComment($id){
        $result = Db::table('comment')->where('id', $id)->update(['status' => 0]);
        if($result){
            return '删除成功！';
        }else{
            return '删除失败！';
        }
    }

    //点赞
    public function getZan($topId){


        $result = Db::table('topic')->where('id',$topId)->setInc('zan');
       if($result){
           return '点赞成功！';
       }else{
          return '点赞失败！';
       }
    }
    //推荐
    public function top($topId){


        $result = Db::table('topic')->where('id', $topId)->update(['top' => 1]);
        if($result){
            return '推荐成功！';
        }else{
            return '推荐失败！';
        }
    }

    //取消推荐
    public function desTop($topId){


        $result = Db::table('topic')->where('id', $topId)->update(['top' => 0]);
        if($result){
            return '取消成功！';
        }else{
            return '取消失败！';
        }
    }



    //根据Id获取用户个人信息
    public function getUserId($userId){
        $result = Db::name('login_user')->where('id',$userId)->select();
        if($result){
            return json($result);
        }else{
            return '获取失败！';
        }
    }

}