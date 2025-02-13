<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CorsMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        // Xử lý request OPTIONS trước khi tiếp tục
        if ($request->isMethod('OPTIONS')) {
            return response()->json('CORS Preflight OK', 200, [
                'Access-Control-Allow-Origin' => '*',
                'Access-Control-Allow-Methods' => 'POST, GET, OPTIONS, PUT, DELETE',
                'Access-Control-Allow-Headers' => 'Content-Type, Authorization, X-Requested-With'
            ]);
        }

        // Tiếp tục xử lý các request khác
        $response = $next($request);

        // Thêm headers vào response
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->headers->set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

        return $response;
    }
}
