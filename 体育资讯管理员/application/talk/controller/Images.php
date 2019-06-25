<?php
/**
 * Created by PhpStorm.
 * User: Asus
 * Date: 2019/4/4
 * Time: 9:39
 */

namespace app\talk\controller;


class Images
{
    public function upImages()
    {
        $file = request()->file('file');
        $info = $file->move(ROOT_PATH . 'public' . DS . 'uploads/images');
        if ($info) {
            echo $info->getSaveName();
            die();
        } else {
            echo $file->getError();
            die();
        }
    }
}
