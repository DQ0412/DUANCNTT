<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;

class MomoPaymentController extends Controller
{
    // Create payment request
    public function createMomoPayment(Request $request)
    {
        try {
            $amount = $request->input('amount');
            $orderId = $request->input('orderId');
            
            $partnerCode = env('MOMO_PARTNER_CODE');
            $secretKey = env('MOMO_SECRET_KEY');
            $apiUrl = env('MOMO_API_URL');
            
            // Prepare data for payment request
            $requestData = [
                "partnerCode" => $partnerCode,
                "accessKey" => "F8BBA842ECF85",
                "requestId" => uniqid(),
                "amount" => $amount,
                "orderId" => $orderId,
                "orderInfo" => "Thanh toán đơn hàng #$orderId",
                "returnUrl" => route('momo.return'),
                "notifyurl" => route('momo.notify'),
            ];
            
            // Secure data
            $secureHash = $this->generateMomoSecureHash($requestData, $secretKey);
            
            $requestData["signature"] = $secureHash;

            // Send request to Momo
            $response = Http::post($apiUrl, $requestData);
            $paymentUrl = $response->json()['payUrl'];

            return response()->json([
                'status' => 'success',
                'payment_url' => $paymentUrl
            ]);
        } catch (\Exception $e) {
            Log::error('Momo Payment Error: ' . $e->getMessage());
            return response()->json([
                'status' => 'error',
                'message' => 'Lỗi khi tạo thanh toán Momo'
            ], 500);
        }
    }

    // Handle the response from Momo after payment
    public function momoReturn(Request $request)
    {
        $signature = $request->input('signature');
        $secretKey = env('MOMO_SECRET_KEY');
        
        // Validate the response from Momo using the signature
        $secureHash = $this->generateMomoSecureHash($request->all(), $secretKey);
        
        if ($secureHash === $signature) {
            if ($request->input('resultCode') === '0') {
                // Successful payment
                Log::info('Momo Payment Success: ' . $request->all());
                return view('momo.success');
            } else {
                // Payment failed
                Log::error('Momo Payment Failed: ' . $request->all());
                return view('momo.failure');
            }
        } else {
            // Invalid signature
            Log::error('Momo Invalid Signature: ' . $request->all());
            return view('momo.failure');
        }
    }

    // Helper function to generate secure hash for Momo
    private function generateMomoSecureHash($data, $secretKey)
    {
        ksort($data); // Sort the array
        $hashString = '';
        foreach ($data as $key => $value) {
            $hashString .= "$key=$value&";
        }
        $hashString = rtrim($hashString, '&');
        
        // Return the secure hash
        return hash_hmac('sha256', $hashString, $secretKey);
    }
}
