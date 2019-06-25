<?php
/**
 * Created by PhpStorm.
 * User: Asus
 * Date: 2018/11/21
 * Time: 19:35
 */

namespace app\api\controller\v1;

use think\Db;
use think\Validate;
class Banner
{
    public function getBanner($id){
//                echo $id;
        $result = Db::query('select * from zy where id = ?',[$id]);
        return json($result);


    }
}