<?php
/**
 * EmailTemplate
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

class EmailTemplate extends AppModel
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'email_templates';
    protected $fillable = array(
        'from',
        'reply_to',
        'subject',
        'html_email_content',
        'text_email_content'
    );
    public $rules = array();
    public function scopeFilter($query, $params = array())
    {
        parent::scopeFilter($query, $params);
        if (!empty($params['q'])) {
            $query->where('name', 'like', '%' . $params['q'] . '%');
        }
    }
}
