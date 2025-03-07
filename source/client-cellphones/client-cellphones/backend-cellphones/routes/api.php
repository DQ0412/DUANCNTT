<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\TypeProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\Admin\OrderController as AdminOrderController;
use App\Http\Controllers\SelectListController;
use App\Http\Controllers\Admin\ProductController as AdminProductController;


/* ----------------------------------- */
/*  API ĐĂNG KÝ, ĐĂNG NHẬP, XÁC THỰC */
/* ----------------------------------- */
Route::post('/user/register', [AuthController::class, 'register']); // Đăng ký tài khoản
Route::post('/user/login', [AuthController::class, 'login']); // Đăng nhập
Route::post('/user/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum'); // Đăng xuất

/* -------------------------- */
/*  API QUẢN LÝ NGƯỜI DÙNG */
/* -------------------------- */
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/users', [UserController::class, 'index']); // Lấy danh sách người dùng
    //Route::delete('/user/delete/{id}', [UserController::class, 'delete']); // Xóa người dùng
});

/* -------------------------- */
/*  API QUẢN LÝ SẢN PHẨM   */
/* -------------------------- */
Route::get('/products', [ProductController::class, 'getAllProducts']); // Lấy danh sách sản phẩm
Route::get('/products/{id}', [ProductController::class, 'getProductById']); // Lấy thông tin sản phẩm
Route::post('/products/create', [ProductController::class, 'createProduct']); // Thêm sản phẩm mới
Route::put('/products/update/{id}', [ProductController::class, 'updateProduct']); // Cập nhật sản phẩm
Route::delete('/products/delete/{id}', [ProductController::class, 'deleteProduct']); // Xóa sản phẩm
Route::get('/products/search', [ProductController::class, 'searchProduct']); // Tìm kiếm sản phẩm
Route::get('/products/pagination/{page}', [ProductController::class, 'paginationProduct']); // Phân trang
Route::get('/products/category/{type}', [ProductController::class, 'getProductsByCategory']);
Route::post('/products/filter', [ProductController::class, 'filter']);

// Route phân trang sản phẩm
//Route::get('/products/pagination', [ProductController::class, 'paginationProduct']);
// Trong routes/api.php
//Route::get('/products/search', [ProductController::class, 'search']);
Route::middleware('auth:api')->post('/products/comment/{id}', [ProductController::class, 'comment']);
Route::middleware('auth:api')->get('/orders/paid/{userId}', [OrderController::class, 'getPaidOrders']);
Route::middleware('auth:api')->get('/orders/all/{userId}', [OrderController::class, 'getAllOrdersByUser']);

// Route to fetch shipping orders
Route::middleware('auth:api')->get('/orders/shipping/{userId}', [OrderController::class, 'getShippingOrders']);

// Route to fetch all orders (optional)
Route::middleware('auth:api')->get('/orders/all/{userId}', [OrderController::class, 'getAllOrders']);
Route::get('/selectList', [SelectListController::class, 'index']);
Route::get('/selectList/{id}', [SelectListController::class, 'show']);
Route::post('/selectList/create', [SelectListController::class, 'store']);
Route::put('/selectList/update/{id}', [SelectListController::class, 'update']);
Route::delete('/selectList/delete/{id}', [SelectListController::class, 'destroy']);

/* --------------------------- */
/*  API QUẢN LÝ LOẠI SẢN PHẨM */
/* --------------------------- */
Route::get('/typeList', [TypeProductController::class, 'getAllTypeProduct']); // Lấy danh sách loại sản phẩm
Route::post('/typeList/create', [TypeProductController::class, 'CreateNewTypeProduct']); // Thêm loại sản phẩm
Route::delete('/typeList/delete/{id}', [TypeProductController::class, 'deleteTypeProduct']); // Xóa loại sản phẩm

/* -------------------------- */
/*  API GIỎ HÀNG           */
/* -------------------------- */
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/cart', [CartController::class, 'getCart']); // Lấy giỏ hàng
    Route::post('/cart/add', [CartController::class, 'addToCart']); // Thêm vào giỏ hàng
    Route::put('/cart/update-quantity/{id}', [CartController::class, 'updateQuantity']); // Cập nhật số lượng sản phẩm
    Route::delete('/cart/remove/{id}', [CartController::class, 'removeFromCart']); // Xóa sản phẩm khỏi giỏ hàng
    Route::delete('/cart/empty', [CartController::class, 'emptyCart']); // Xóa toàn bộ giỏ hàng
});

/* -------------------------- */
/*  API QUẢN LÝ ĐƠN HÀNG   */
/* -------------------------- */
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/orders', [OrderController::class, 'getAllOrders']); // Lấy danh sách đơn hàng
    Route::post('/orders', [OrderController::class, 'createOrder']); // Tạo đơn hàng mới
    Route::put('/order/update/{id}', [OrderController::class, 'updateOrder']); // Cập nhật đơn hàng
    Route::delete('/order/delete/{id}', [OrderController::class, 'deleteOrder']); // Xóa đơn hàng
    Route::put('/order/shipping/{id}', [OrderController::class, 'shippingOrder']);
    Route::post('/order/ghn/{id}', [OrderController::class, 'createOrderGhn']); // Gửi đơn hàng lên GHN

});

/* -------------------------- */
/*  API THANH TOÁN         */
/* -------------------------- */
Route::post('/payment/createVNPayPayment', [PaymentController::class, 'createVNPayPayment']);
Route::get('payment/vnpay-return', [PaymentController::class, 'vnpayReturn'])->name('vnpay.success');
Route::get('/vnpay-success', function () {
    return view('vnpay.success');
})->name('vnpay.success');

Route::post('payment/create-momo-payment', [MomoPaymentController::class, 'createMomoPayment']);
Route::get('payment/momo-return', [MomoPaymentController::class, 'momoReturn'])->name('momo.return');
Route::post('payment/momo-notify', [MomoPaymentController::class, 'momoNotify'])->name('momo.notify');

/* -------------------------- */
/*  API CHO ADMIN          */
/* -------------------------- */
Route::prefix('admin')->group(function () {
    // QUẢN LÝ SẢN PHẨM
    Route::get('/products', [AdminProductController::class, 'index']); // Lấy tất cả sản phẩm
    Route::get('/products/{id}', [AdminProductController::class, 'show']); // Lấy 1 sản phẩm
    Route::post('/products', [AdminProductController::class, 'store']); // Tạo sản phẩm mới
    Route::put('/products/{id}', [AdminProductController::class, 'update']); // Cập nhật sản phẩm
    Route::delete('/products/delete/{id}', [AdminProductController::class, 'destroy']); // Xóa sản phẩm
    

    // QUẢN LÝ ĐƠN HÀNG
    Route::get('/orders', [AdminOrderController::class, 'index']); // Xem danh sách đơn hàng
    Route::get('/orders/{id}', [AdminOrderController::class, 'show']);
    Route::put('/orders/{id}', [AdminOrderController::class, 'update']); // Cập nhật đơn hàng
    Route::delete('/orders/{id}', [AdminOrderController::class, 'destroy']); // Xóa đơn hàng

    // QUẢN LÝ NGƯỜI DÙNG
    Route::get('/users', [AdminUserController::class, 'getAllUser']); // Lấy danh sách user
    Route::put('/users/{id}', [AdminUserController::class, 'updateUser']); // Cập nhật user
    Route::delete('/users/delete/{id}', [AdminUserController::class, 'deleteUser']);
});

/* -------------------------- */
/*  API XỬ LÝ LỖI ĐĂNG NHẬP */
/* -------------------------- */
Route::get('/login', function () {
    return response()->json(['message' => 'Unauthorized'], 401);
})->name('login');
