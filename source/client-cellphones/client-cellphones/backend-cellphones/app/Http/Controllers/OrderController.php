<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Http;

class OrderController extends Controller
{
    // Lấy danh sách đơn hàng của user
    public function getAllOrders()
    {
        try {
            $user = Auth::user();
            if (!$user) {
                return response()->json(['message' => 'User not authenticated'], 401);
            }

            $orders = Order::where('user_id', $user->id)->with('items')->get();

            return response()->json(['orders' => $orders], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error retrieving orders',
                'error'   => $e->getMessage()
            ], 500);
        }
    }
    public function store(Request $request) {
        $order = Order::create($request->all());
        \Log::info('Dữ liệu nhận từ Frontend:', $request->all());
\Log::error('Lỗi khi lưu đơn hàng:', ['order' => $order]);

        if (!$order) {
            return response()->json(['message' => 'Lưu đơn hàng thất bại!'], 400);
        }
    
        return response()->json(['message' => 'Order created successfully', 'order' => $order], 201);
    }
    
    // Tạo đơn hàng mới
    public function createOrder(Request $request)
    {
        try {
            // Kiểm tra nếu user chưa đăng nhập
            $user = Auth::user();
            if (!$user) {
                return response()->json(['message' => 'User not authenticated'], 401);
            }

            // Lấy dữ liệu từ request
            $data = $request->input('request', $request->all());
            \Log::info('Request data:', ['request' => $data]);

            // Nếu không có orderItems hoặc bị rỗng
            if (empty($data['orderItems']) || !is_array($data['orderItems'])) {
                return response()->json(['message' => 'Danh sách sản phẩm không hợp lệ'], 422);
            }
            $data['orderItems'] = array_map(function($item) {
                return [
                    'product_id' => $item['product_id'] ?? $item['id'] ?? null, // Ưu tiên product_id nếu có
                    'price'      => $item['salePrice'] ?? $item['price'],
                    'qty'        => $item['qty']
                ];
            }, $data['orderItems']);
            
            // Chuẩn hóa dữ liệu nếu client gửi camelCase
            $data['payment_method'] = $data['paymentMethod'] ?? $data['payment_method'] ?? 'COD';
            $data['payment_status'] = $data['paymentStatus'] ?? $data['payment_status'] ?? 'pending';

            // Validate dữ liệu đầu vào
            $validator = Validator::make($data, [
                'totalPrice'         => 'required|numeric|min:1',
                'province'           => 'required|string',
                'district'           => 'required|string',
                'ward'               => 'required|string',
                'name'               => 'required|string',
                'phone'              => 'required|string',
                'orderItems'         => 'required|array|min:1',
                'orderItems.*.product_id'    => 'required|integer|exists:products,id', // Kiểm tra product_id
                'orderItems.*.qty'   => 'required|integer|min:1',
                'orderItems.*.price' => 'required|numeric|min:0',
                'payment_method'     => 'required|string',
                'payment_status'     => 'required|string',
            ]);

            if ($validator->fails()) {
                \Log::error('Order creation validation failed', ['errors' => $validator->errors()]);
                return response()->json([
                    'message' => 'Validation failed',
                    'errors'  => $validator->errors()
                ], 422);
            }

            // Tạo đơn hàng
            $order = Order::create([
                'user_id'        => $user->id,
                'total_price'    => $data['totalPrice'],
                'status'         => 'pending',
                'province'       => $data['province'],
                'district'       => $data['district'],
                'ward'           => $data['ward'],
                'custom_address' => $data['customAddress'] ?? null,
                'name'           => $data['name'],
                'phone'          => $data['phone'],
            ]);

            // Lưu các sản phẩm trong đơn hàng
            foreach ($data['orderItems'] as $item) {
                OrderItem::create([
                    'order_id'   => $order->id,
                    'product_id' => $item['product_id'], // ✅ Sử dụng product_id đúng
                    'quantity'   => $item['qty'],
                    'price'      => $item['salePrice'] ?? $item['price'],
                ]);
            }

            // Lưu thông tin thanh toán
            Payment::create([
                'order_id'       => $order->id,
                'payment_method' => $data['payment_method'],
                'payment_status' => $data['payment_status'],
                'payment_date'   => now(),
            ]);

            return response()->json([
                'message' => 'Order and payment created successfully',
                'order'   => $order
            ], 201);
        } catch (\Exception $e) {
            \Log::error('Error creating order', ['error' => $e->getMessage()]);
            return response()->json([
                'message' => 'Error creating order',
                'error'   => $e->getMessage()
            ], 500);
        }
    }
    public function getPaidOrders($userId)
    {
        $orders = Order::where('user_id', $userId)->where('status', 'paid')->get();

        if ($orders->isEmpty()) {
            return response()->json(['message' => 'No paid orders found.'], 404);
        }

        return response()->json($orders);
    }

    // Fetch shipping orders for a user
    public function getShippingOrders($userId)
    {
        $orders = Order::where('user_id', $userId)->where('status', 'shipping')->get();

        if ($orders->isEmpty()) {
            return response()->json(['message' => 'No shipping orders found.'], 404);
        }

        return response()->json($orders);
    }

    // Fetch all orders for a user (optional)
    public function getAllOrdersByUser($userId)
    {
        // Fetch orders by the user ID
        $orders = Order::where('user_id', $userId)->get();

        // Return response with orders data
        return response()->json($orders, 200);
    }
    public function createOrderGhn($orderId)
    {
        $order = Order::find($orderId);
        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        // Lấy thông tin sản phẩm trong đơn hàng
        $items = $order->items->map(function ($item) {
            return [
                'name' => $item->product->name,
                'code' => $item->product->id,
                'quantity' => $item->quantity,
                'price' => $item->price,
                'length' => 10,
                'width' => 10,
                'height' => 10,
                'weight' => 500
            ];
        });

        // Gửi request đến GHN
        $response = Http::withHeaders([
            'Token' => env('GHN_API_TOKEN'), // Lấy Token từ .env
            'Content-Type' => 'application/json'
        ])->post(env('GHN_BASE_URL') . '/v2/shipping-order/create', [
            "payment_type_id" => 2,
            "note" => "Giao hàng nhanh",
            "from_name" => "Cửa hàng ABC",
            "from_address" => "Hà Nội",
            "from_province_name" => "Hà Nội",
            "from_district_name" => "Cầu Giấy",
            "from_ward_name" => "Dịch Vọng Hậu",
            "from_phone" => "0901234567",
            "required_note" => "CHOXEMHANGKHONGTHU",
            "to_name" => $order->name,
            "to_phone" => $order->phone,
            "to_address" => $order->custom_address,
            "to_ward_name" => $order->ward,
            "to_district_name" => $order->district,
            "to_province_name" => $order->province,
            "cod_amount" => $order->total_price,
            "content" => "Giao hàng đơn hàng #" . $order->id,
            "weight" => 500,
            "length" => 10,
            "width" => 10,
            "height" => 10,
            "service_type_id" => 2,
            "service_id" => 53320,
            "shop_id" => env('GHN_SHOP_ID'),
            "items" => $items
        ]);

        $data = $response->json();

        if ($response->failed()) {
            return response()->json([
                'message' => 'Lỗi khi tạo đơn hàng GHN',
                
            ], 400);
        }

        return response()->json([
            'message' => 'Đơn hàng GHN tạo thành công',
            'data' => $data
        ], 200);
    }
    public function shippingOrder($id) {
        $order = Order::find($id);
        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }
    
        $order->status = 'shipping';
        $order->save();
    
        return response()->json(['message' => 'Order status updated to shipping', 'order' => $order], 200);
    }
    public function updateOrder(Request $request, $id) {
        $order = Order::find($id);
    
        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }
    
        // Cập nhật các trường dữ liệu từ request
        $order->update($request->all());
    
        return response()->json([
            'message' => 'Order updated successfully',
            'order' => $order
        ], 200);
    }
    
}
