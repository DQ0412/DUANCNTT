<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CustomCors
{
    public function handle(Request $request, Closure $next)
    {
        return $next($request)
            ->header('Access-Control-Allow-Origin', '*') // Cho phép mọi nguồn gốc
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS') // Các phương thức HTTP cho phép
            ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With'); // Các header cho phép
    }
}
