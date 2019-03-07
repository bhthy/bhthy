<?php
/**
 * ZazPaymentGateway
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

class ZazpayPaymentGateway extends AppModel
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'zazpay_payment_gateways';
    public function zazpay_group()
    {
        return $this->belongsTo('Models\ZazpayPaymentGroup', 'zazpay_payment_group_id', 'id');
    }
    public function zazpayCallGetGateways($zazpay)
    {
        $s = getZazPayObject();
        return $s->callGetGateways();
    }
}
