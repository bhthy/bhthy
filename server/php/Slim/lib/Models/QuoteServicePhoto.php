<?php
/**
 * QuoteServicePhoto
 *
 * PHP version 5
 *
 * @category   PHP
 * @package    Getlancer V3
 * @subpackage Model
 * @author     Agriya <info@agriya.com>
 * @copyright  2016 Agriya Infoway Private Ltd
 * @license    http://www.agriya.com/ Agriya Infoway Licence
 * @link       http://www.agriya.com
 */
namespace Models;

/*
 * QuoteServicePhoto
*/
class QuoteServicePhoto extends AppModel
{
    protected $table = 'quote_service_photos';
    protected $fillable = array(
        'quote_service_id',
        'caption'
    );
    public $rules = array(
        'quote_service_id' => 'sometimes|required',
    );
    public function quote_service()
    {
        return $this->belongsTo('Models\QuoteService', 'quote_service_id', 'id')->with('user');
        ;
    }
    public function attachment()
    {
        return $this->hasMany('Models\Attachment', 'foreign_id', 'id')->where('class', 'QuoteServicePhoto');
    }
    protected static function boot()
    {
        global $authUser;
        parent::boot();
        self::saving(function ($data) use ($authUser) {
            if (($authUser['role_id'] == \Constants\ConstUserTypes::Admin) || ($authUser['id'] == $data->quote_service->user_id)) {
                return true;
            }
            return false;
        });
        self::created(function ($data) use ($authUser) {
            QuoteService::where('id', $data->quote_service_id)->increment('quote_service_photo_count', 1);
        });
        self::deleting(function ($data) use ($authUser) {
            if (($authUser['role_id'] == \Constants\ConstUserTypes::Admin) || ($authUser['id'] == $data->quote_service->user_id)) {
                return true;
            }
            return false;
        });
        self::deleted(function ($data) use ($authUser) {
            QuoteService::where('id', $data->quote_service_id)->decrement('quote_service_photo_count', 1);
        });
    }
    public function scopeFilter($query, $params = array())
    {
        parent::scopeFilter($query, $params);
        if (!empty($params['quote_service_id'])) {
            $query->where('quote_service_id', '=', $params['quote_service_id']);
        }
        if (!empty($params['q'])) {
            $search = $params['q'];
            $query->orWhereHas('quote_service', function ($q) use ($search) {
                $q->where('caption', 'ilike', "%$search%");
            });
            $query->orWhereHas('quote_service', function ($q) use ($search) {
                $q->where('business_name', 'ilike', "%$search%");
            });
            $query->orWhereHas('quote_service.user', function ($q) use ($search) {
                $q->where('username', 'ilike', "%$search%");
            });
        }
    }
}
