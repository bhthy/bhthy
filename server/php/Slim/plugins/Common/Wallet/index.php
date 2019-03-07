<?php
/**
 *
 * @package         Getlancer
 * @copyright   Copyright (c) 2012 {@link http://www.agriya.com/ Agriya Infoway}
 * @license         http://www.agriya.com/ Agriya Infoway Licence
 * @since       2017-01-02
 *
 */
/**
 * GET walletsGet
 * Summary: Fetch all wallets
 * Notes: Returns all wallets from the system
 * Output-Formats: [application/json]
 */
$app->GET('/api/v1/wallets', function ($request, $response, $args) {
    $queryParams = $request->getQueryParams();
    $results = array();
    try {
        $count = !empty($queryParams['limit']) ? $queryParams['limit'] : PAGE_LIMIT;
        $enabledIncludes = array(
            'user',
            'payment_gateway'
        );
        $wallets = Models\Wallet::with($enabledIncludes)->Filter($queryParams)->paginate($count)->toArray();
        $data = $wallets['data'];
        unset($wallets['data']);
        $results = array(
            'data' => $data,
            '_metadata' => $wallets
        );
        return renderWithJson($results);
    } catch (Exception $e) {
        return renderWithJson($results, $message = 'No record found', $fields = '', $isError = 1);
    }
})->add(new ACL('canListWallet'));
/**
 * POST walletsPost
 * Summary: Creates a new wallet
 * Notes: Creates a new wallet
 * Output-Formats: [application/json]
 */
$app->POST('/api/v1/wallets', function ($request, $response, $args) {
    global $authUser;
    global $_server_domain_url;
    $result = array();
    $args = $request->getParsedBody();
    $amount = $args['amount'];
    if ($amount > 0) {
        $wallet = new Models\Wallet;
        $wallet->user_id = $authUser['id'];
        $wallet->amount = $args['amount'];
        $wallet->payment_gateway_id = $args['payment_gateway_id'];
        $wallet->gateway_id = !empty($args['gateway_id']) ? $args['gateway_id'] : '0';
        $wallet->is_payment_completed = 0;
        $wallet->save();
        $payment = new Models\Payment;
        $args['user_id'] = $authUser['id'];
        $args['description'] = $args['name'] = "Amount add to " . SITE_NAME . " Wallet";
        $args['id'] = $wallet->id;
        $args['notify_url'] = $_server_domain_url . '/ipn/process_ipn/Wallet/' . $wallet->id . '/' . md5(SECURITY_SALT . $wallet->id . SITE_NAME);
        $args['success_url'] = $_server_domain_url . '/wallets?error_code=0';
        $args['cancel_url'] = $_server_domain_url . '/wallets?error_code=512';
        $result = $payment->processPayment($wallet->id, $args, 'Wallet');
        return renderWithJson($result);
    } else {
        return renderWithJson($result, 'Amount should be greater than 0.', '', 1);
    }
})->add(new ACL('canCreateWallet'));
