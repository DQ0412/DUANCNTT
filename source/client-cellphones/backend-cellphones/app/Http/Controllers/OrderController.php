<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

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
            return response()->json(['message' => 'Error retrieving orders', 'error' => $e->getMessage()], 500);
        }
    }

    // Tạo đơn hàng mới
    // Tạo đơn hàng mới
public function createOrder(Request $request)
{
    try {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['message' => 'User not authenticated'], 401);
        }
        \Log::info('Request data:', ['request' => $request->all()]);

        // Validate incoming request
       // Validate incoming request
$validator = Validator::make($request->all(), [
    'totalPrice' => 'required|numeric|min:1',
    'province' => 'required|string',
    'district' => 'required|string',
    'ward' => 'required|string',
    'name' => 'required|string',
    'phone' => 'required|string',
    'orderItems' => 'required|array|min:1',
    'orderItems.*.id' => 'required|integer|exists:products,id',
    'orderItems.*.qty' => 'required|integer|min:1',
    'orderItems.*.price' => 'required|numeric|min:0',  // Ensure 'price' is included
]);

// Log the errors if validation fails
if ($validator->fails()) {
    \Log::error('Order creation validation failed', ['errors' => $validator->errors()]);
    return response()->json(['message' => 'Validation failed', 'errors' => $validator->errors()], 422);
}

// Proceed with creating the order
$order = Order::create([
    'user_id' => $user->id,
    'total_price' => $request->totalPrice,
    'status' => 'pending',
    'province' => $request->province,
    'district' => $request->district,
    'ward' => $request->ward,
]);

// Add the items to the order
foreach ($request->orderItems as $item) {
    OrderItem::create([
        'order_id' => $order->id,
        'product_id' => $item['id'],
        'quantity' => $item['qty'],
        'price' => $item['salePrice'] ?? $item['price'],  // Use 'price' from the request
    ]);
}


        return response()->json(['message' => 'Order created successfully', 'order' => $order], 201);
    } catch (\Exception $e) {
        // Log the exception details for easier debugging
        \Log::error('Error creating order', ['error' => $e->getMessage()]);
        return response()->json(['message' => 'Error creating order', 'error' => $e->getMessage()], 500);
    }
}




}
