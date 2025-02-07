<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart; // Đảm bảo đã khai báo model Cart
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    // Thêm sản phẩm vào giỏ hàng
    public function addToCart(Request $request)
    {
        // Thêm sản phẩm vào giỏ hàng
        $cart = Cart::create([
            'product_id' => $request->product_id,
            'quantity' => $request->quantity,
            'user_id' => auth()->id(),  // Lấy user ID hiện tại
        ]);

        return response()->json($cart);
    }

    // Xóa sản phẩm khỏi giỏ hàng
    public function deleteFromCart($id)
    {
        // Tìm sản phẩm trong giỏ hàng của người dùng
        $cart = Cart::where('product_id', $id)->where('user_id', auth()->id())->first();

        if ($cart) {
            $cart->delete(); // Xóa sản phẩm
            return response()->json(['message' => 'Product deleted']);
        }

        return response()->json(['message' => 'Product not found'], 404);
    }

    // Cập nhật số lượng sản phẩm trong giỏ hàng
    public function updateQuantity(Request $request, $id)
    {
        // Tìm sản phẩm trong giỏ hàng của người dùng
        $cart = Cart::where('product_id', $id)->where('user_id', auth()->id())->first();

        if ($cart) {
            // Cập nhật số lượng sản phẩm
            $cart->update(['quantity' => $request->quantity]);
            return response()->json($cart);
        }

        return response()->json(['message' => 'Product not found'], 404);
    }
}
