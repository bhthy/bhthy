<?php
/**
 * SkillsProjects
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
 * SkillsProjects
*/
class SkillsProjects extends AppModel
{
    protected $table = 'skills_projects';
    public $timestamps = false;
    public function skills()
    {
        return $this->belongsTo('Models\Skill', 'skill_id', 'id');
    }
}
