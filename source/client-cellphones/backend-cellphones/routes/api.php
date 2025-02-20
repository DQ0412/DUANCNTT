<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\TypeProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\OrderController;
/* 
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::get('/config/paypal', function () {
    return response()->json([
        'paypal_client_id' => env('PAYPAL_CLIENT_ID'),
    ]);
});
// In routes/api.php
Route::get('products/{name}', [ProductController::class, 'getProductsByName']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/cart', [CartController::class, 'getCart']);  // Lấy giỏ hàng
    Route::post('/cart/add', [CartController::class, 'addToCart']); // Thêm vào giỏ hàng
    Route::put('/cart/update-quantity/{id}', [CartController::class, 'updateQuantity']); // ✅ Thêm route này

    Route::delete('/cart/remove/{id}', [CartController::class, 'removeFromCart']); // Xóa sản phẩm
    Route::delete('/cart/empty', [CartController::class, 'emptyCart']); // Xóa toàn bộ giỏ hàng
});
//Route::post('/cart/add', [CartController::class, 'addToCart']);
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/orders', [OrderController::class, 'getAllOrders']); // ✅ Lấy tất cả đơn hàng
    Route::post('/orders', [OrderController::class, 'createOrder']);
    Route::put('/order/update/{id}', [OrderController::class, 'updateOrder']); // ✅ Cập nhật đơn hàng
    Route::delete('/order/delete/{id}', [OrderController::class, 'deleteOrder']); // ✅ Xóa đơn hàng
});
//Route::post('/orders', [OrderController::class, 'createOrder']);
Route::post('user/register', [AuthController::class, 'register']);
Route::post('user/login', [AuthController::class, 'login']);
Route::post('user/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::get('/users', [UserController::class, 'index']);
Route::delete('/user/delete/{id}', [UserController::class, 'delete']);

Route::get('/products', [ProductController::class, 'getAllProducts']);
Route::get('/detail/{id}', [ProductController::class, 'getProductById']);
Route::post('/products/create', [ProductController::class, 'createProduct']);
Route::put('/products/update/{id}', [ProductController::class, 'updateProduct']);
Route::delete('/products/delete/{id}', [ProductController::class, 'deleteProduct']);
Route::get('/products/search', [ProductController::class, 'searchProduct']);
Route::post('/products/filter/random', [ProductController::class, 'filterProductByRandomField']);
Route::get('/products/pagination/{page}', [ProductController::class, 'paginationProduct']);

Route::get('/typeList', [TypeProductController::class, 'getAllTypeProduct']);
Route::post('/typeList/create', [TypeProductController::class, 'CreateNewTypeProduct']);
Route::delete('/typeList/delete/{id}', [TypeProductController::class, 'deleteTypeProduct']);
