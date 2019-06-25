<?php
/**
 * Created by PhpStorm.
 * User: Asus
 * Date: 2019/3/30
 * Time: 15:47
 */

namespace app\talk\validate;


use think\Validate;

class CkeckValidate extends Validate
{
    protected $rule = [
        'username' => '/^1[34578]{1}[0-9]{9}$/',
        'password' => 'chsDash|max:10',
        'password2' => 'chsDash|max:10',

    ];
}