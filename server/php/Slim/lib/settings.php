<?php
/**
 * Core configurations
 *
 * PHP version 5
 *
 * @category   PHP
 * @package    Base
 * @subpackage Core
 * @author     Agriya <info@agriya.com>
 * @copyright  2016 Agriya Infoway Private Ltd
 * @license    http://www.agriya.com/ Agriya Infoway Licence
 * @link       http://www.agriya.com
 */
$settings = Models\Setting::all();
foreach ($settings as $setting) {
    define($setting->name, $setting->value);
}
$upload_service_settings = Models\UploadServiceSetting::all();
foreach ($upload_service_settings as $upload_service_setting) {
    define($upload_service_setting->name, $upload_service_setting->value);
}
