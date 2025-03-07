<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Exception;

class PaymentController extends Controller
{
    /**
     * Tạo URL thanh toán VNPay.
     */
    public function createVNPayPayment(Request $request)
{
    try {
        Log::info("📥 Nhận yêu cầu thanh toán VNPay:", $request->all());

        $validated = $request->validate([
            'amount' => 'required|numeric|min:1',
            'orderId' => 'required|integer',
        ]);

        // Các giá trị cần thiết cho thanh toán VNPay
        $vnp_TmnCode = env('VNPAY_TMN_CODE', 'LZP3OOG9'); // Mã Merchant ID
        $vnp_HashSecret = env('VNPAY_HASH_SECRET', '7CCVDF88DR6GGCM4P4OAAHLWW7CBGOER'); // Chuỗi bí mật
        $vnp_Url = env('VNPAY_URL', 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html'); // URL Sandbox

        $vnp_TxnRef = $validated['orderId'];
        $vnp_Amount = (int) ($validated['amount'] * 100); // Chuyển thành số nguyên
        $vnp_Locale = 'vn';
        $vnp_IpAddr = request()->ip();
        $vnp_ReturnUrl = route('vnpay.success');

        // Tạo dữ liệu gửi lên VNPay
        $inputData = [
            "vnp_Version" => "2.1.0",
            "vnp_TmnCode" => $vnp_TmnCode,
            "vnp_Amount" => $vnp_Amount,
            "vnp_Command" => "pay",
            "vnp_CreateDate" => date('YmdHis'),
            "vnp_CurrCode" => "VND",
            "vnp_IpAddr" => $vnp_IpAddr,
            "vnp_Locale" => $vnp_Locale,
            "vnp_OrderInfo" => "Thanh toán đơn hàng #$vnp_TxnRef",
            "vnp_OrderType" => "billpayment",
            "vnp_ReturnUrl" => $vnp_ReturnUrl,
            "vnp_TxnRef" => $vnp_TxnRef,
        ];

        // Sắp xếp các tham số theo thứ tự
        ksort($inputData);

        // Tạo query string
        $query = '';
        foreach ($inputData as $key => $value) {
            $query .= urlencode($key) . "=" . urlencode($value) . '&';
        }
        $query = rtrim($query, '&'); // Loại bỏ dấu & cuối cùng

        // Tính toán SecureHash
        $vnp_SecureHash = hash_hmac('sha512', $query, $vnp_HashSecret);

        // Tạo URL thanh toán
        $vnp_Url .= "?" . $query . "&vnp_SecureHash=" . $vnp_SecureHash;

        Log::info("📤 URL thanh toán VNPay:", ['url' => $vnp_Url]);

        return response()->json(['code' => "00", 'data' => $vnp_Url]);

    } catch (Exception $e) {
        Log::error("❌ Lỗi tạo thanh toán VNPay:", ['error' => $e->getMessage()]);
        return response()->json(['code' => "01", 'message' => 'Lỗi khi tạo thanh toán VNPay'], 500);
    }
}

    /**
     * Xử lý kết quả thanh toán VNPay.
     */
    public function vnpayReturn(Request $request)
{
    // Ghi lại thông tin nhận được từ VNPay
    //Log::info("📥 Kết quả thanh toán VNPay:", $request->all());

    // Chuyển hướng người dùng đến trang thành công
    return redirect()->route('vnpaysuccess.js'); // Hoặc bạn có thể thay 'vnpay.success' bằng URL cụ thể
}

}
