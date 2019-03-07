<?php
/**
 * Attachment
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

class Attachment extends AppModel
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'attachments';
	protected $fillable = array(
        'id',
        'filename',
        'width',
        'height',
        'dir',
        'foreign_id',
		'class',
		'mimetype'
    );
    public function foreigns()
    {
        return $this->morphMany('Models\Activity', 'foreign');
    }
    public function foreign_models()
    {
        return $this->morphMany('Models\Activity', 'foreign_model');
    }
    public function project()
    {
        return $this->belongsTo('Models\Project', 'foreign_id', 'id');
    }
    public function activity()
    {
        return $this->belongsTo('Models\Attachment', 'id', 'id')->with('project');
    }
}
