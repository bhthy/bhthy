<?php
/**
 * OauthRefreshToken
 *
 * PHP version 5
 *
 * @category   PHP
 * @package    Base
 * @subpackage Model
 * @author     Agriya <info@agriya.com>
 * @copyright  2016 Agriya Infoway Private Ltd
 * @license    http://www.agriya.com/ Agriya Infoway Licence
 * @link       http://www.agriya.com
 */
namespace Models;

class OauthRefreshToken extends AppModel
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'oauth_refresh_tokens';
    public function user()
    {
        return $this->belongsTo('Models\User', 'user_id', 'username')->select('id', 'role_id');
    }
}
