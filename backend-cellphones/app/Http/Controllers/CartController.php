<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;

class CartController extends Controller
{
    // Phương thức để thêm sản phẩm vào giỏ hàng
    public function addToCart(Request $request)
    {
        // Validate dữ liệu đầu vào
        $validated = $request->validate([
            'product_id' => 'required|integer',
            'quantity' => 'required|integer|min:1',
        ]);

        // Thêm sản phẩm vào giỏ hàng
        $cart = Cart::create([
            'product_id' => $request->product_id,
            'quantity' => $request->quantity,
            'user_id' => auth()->id(),
        ]);

        return response()->json($cart, 201); // Trả về sản phẩm đã thêm vào giỏ hàng
    }
}
