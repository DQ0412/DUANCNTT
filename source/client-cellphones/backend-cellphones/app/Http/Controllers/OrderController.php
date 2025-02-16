<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    // ✅ Lấy danh sách đơn hàng của user
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

    // ✅ Tạo đơn hàng mới
    public function createOrder(Request $request)
    {
        try {
            $user = Auth::user();
            if (!$user) {
                return response()->json(['message' => 'User not authenticated'], 401);
            }

            $order = Order::create([
                'user_id' => $user->id,
                'total_price' => $request->totalPrice,
                'status' => 'pending',
                'shipping_address' => json_encode($request->shippingAddress),
            ]);

            foreach ($request->orderItems as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item['id'],
                    'quantity' => $item['qty'],
                    'price' => $item['salePrice'] ?? $item['price'],
                ]);
            }

            return response()->json(['message' => 'Order created successfully', 'order' => $order], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error creating order', 'error' => $e->getMessage()], 500);
        }
    }

    // ✅ Cập nhật đơn hàng
    public function updateOrder(Request $request, $id)
    {
        try {
            $order = Order::find($id);
            if (!$order) {
                return response()->json(['message' => 'Order not found'], 404);
            }

            $order->update([
                'status' => $request->status ?? $order->status,
                'shipping_address' => json_encode($request->shippingAddress ?? json_decode($order->shipping_address)),
            ]);

            return response()->json(['message' => 'Order updated successfully', 'order' => $order], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error updating order', 'error' => $e->getMessage()], 500);
        }
    }

    // ✅ Xóa đơn hàng
    public function deleteOrder($id)
    {
        try {
            $order = Order::find($id);
            if (!$order) {
                return response()->json(['message' => 'Order not found'], 404);
            }

            $order->delete();

            return response()->json(['message' => 'Order deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error deleting order', 'error' => $e->getMessage()], 500);
        }
    }
}
