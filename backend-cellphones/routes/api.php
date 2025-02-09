<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\TypeProductController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::post('/cart/add', [CartController::class, 'addToCart']);
Route::delete('/cart/delete/{id}', [CartController::class, 'deleteFromCart']);
Route::put('/cart/update-quantity/{id}', [CartController::class, 'updateQuantity']);

Route::post('user/register', [AuthController::class, 'register']);
Route::post('user/login', [AuthController::class, 'login']);
Route::post('user/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::get('/users', [UserController::class, 'index']);
Route::delete('/user/delete/{id}', [UserController::class, 'delete']);
Route::options('/{any}', function () {
    return response()->json([]);
})->where('any', '.*');

Route::get('/products', [ProductController::class, 'getAllProducts']);
Route::get('/products/{id}', [ProductController::class, 'getProductById']);
Route::post('/products/create', [ProductController::class, 'createProduct']);
Route::put('/products/update', [ProductController::class, 'updateProduct']);
Route::delete('/products/delete/{id}', [ProductController::class, 'deleteProduct']);
Route::get('/products/search', [ProductController::class, 'searchProduct']);
Route::post('/products/filter/random', [ProductController::class, 'filterProductByRandomField']);
Route::get('/products/pagination/{page}', [ProductController::class, 'paginationProduct']);

Route::get('/typeList', [TypeProductController::class, 'getAllTypeProduct']);
Route::post('/typeList/create', [TypeProductController::class, 'CreateNewTypeProduct']);
Route::delete('/typeList/delete/{id}', [TypeProductController::class, 'deleteTypeProduct']);

