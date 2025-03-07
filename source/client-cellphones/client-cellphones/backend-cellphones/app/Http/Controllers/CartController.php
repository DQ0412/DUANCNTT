<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function getCart()
{
    try {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['message' => 'User not authenticated'], 401);
        }

        $cartItems = Cart::where('user_id', $user->id)
            ->with('product')
            ->get()
            ->map(function ($cartItem) {
                return [
                    'id' => $cartItem->id,
                    'product_id' => $cartItem->product_id,
                    'name' => $cartItem->product->name,
                    'image' => $cartItem->product->image 
                        ? asset('storage/' . $cartItem->product->image) // ✅ Đảm bảo đường dẫn đầy đủ
                        : asset('/default-image.png'), // Ảnh mặc định nếu không có
                    'price' => $cartItem->product->sale_price ?? $cartItem->product->price,
                    'qty' => $cartItem->qty
                ];
            });

        return response()->json(['cart' => $cartItems], 200);
    } catch (\Exception $e) {
        return response()->json(['message' => 'Error retrieving cart', 'error' => $e->getMessage()], 500);
    }
}



    public function addToCart(Request $request)
    {
        try {
            $user = Auth::user();
            if (!$user) {
                return response()->json(['message' => 'User not authenticated'], 401);
            }

            $product = Product::find($request->product_id);
            if (!$product) {
                return response()->json(['message' => 'Product not found'], 404);
            }

            $cartItem = Cart::where('user_id', $user->id)
                ->where('product_id', $request->product_id)
                ->first();

            if ($cartItem) {
                $cartItem->qty += $request->quantity ?? 1;
                $cartItem->save();
            } else {
                Cart::create([
                    'user_id' => $user->id,
                    'product_id' => $request->product_id,
                    'qty' => $request->quantity ?? 1
                ]);
            }

            return response()->json(['message' => 'Added to cart'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error adding to cart', 'error' => $e->getMessage()], 500);
        }
    }

    public function removeFromCart($id)
{
    try {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['message' => 'User not authenticated'], 401);
        }

        // ✅ Kiểm tra chính xác xem sản phẩm có trong giỏ hàng hay không
        $cartItem = Cart::where('user_id', $user->id)
                        ->where('id', $id) // 
                        ->first();

        if (!$cartItem) {
            return response()->json(['message' => 'Product not found in cart'], 404);
        }

        $cartItem->delete();
        return response()->json(['message' => 'Product removed from cart'], 200);
    } catch (\Exception $e) {
        return response()->json(['message' => 'Error removing product', 'error' => $e->getMessage()], 500);
    }
}


public function updateQuantity(Request $request, $id)
{
    try {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['message' => 'User not authenticated'], 401);
        }

        // ✅ Kiểm tra theo ID giỏ hàng thay vì product_id
        $cartItem = Cart::where('user_id', $user->id)
                        ->where('id', $id)  // ✅ Sửa từ `product_id` -> `id`
                        ->first();

        if (!$cartItem) {
            return response()->json(['message' => 'Product not found in cart'], 404);
        }

        $cartItem->qty = $request->quantity;
        $cartItem->save();

        return response()->json(['message' => 'Cart updated', 'cart' => $cartItem], 200);
    } catch (\Exception $e) {
        return response()->json(['message' => 'Error updating cart', 'error' => $e->getMessage()], 500);
    }
}


    public function emptyCart()
    {
        try {
            $user = Auth::user();
            if (!$user) {
                return response()->json(['message' => 'User not authenticated'], 401);
            }

            Cart::where('user_id', $user->id)->delete();
            return response()->json(['message' => 'Cart cleared'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error clearing cart', 'error' => $e->getMessage()], 500);
        }
    }
}
