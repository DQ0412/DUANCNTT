<?php

use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\UserController;

// API routes cho Product, Order, và User không cần login
Route::prefix('admin')->group(function () {
    // API cho products
    Route::apiResource('products', ProductController::class);
    
    // API cho orders
    Route::apiResource('orders', OrderController::class);
    
    // API cho users
    Route::apiResource('users', UserController::class);
});

