<?php
/**
 * Created by PhpStorm.
 * User: Asus
 * Date: 2018/11/21
 * Time: 21:45
 */

namespace app\api\validate;


use think\Validate;

class TestValidate extends Validate
{
    protected  $rule = [
        'name' => 'require|max:10',
        'email' => 'email'
    ];
}