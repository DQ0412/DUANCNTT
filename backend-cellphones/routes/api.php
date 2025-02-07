<?php
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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
