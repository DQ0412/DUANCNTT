<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class IsAdmin
{
    public function handle(Request $request, Closure $next)
    {
        if (!$request->user() || !$request->user()->isAdmin) {
            return response()->json(['error' => 'Access denied'], 403);
        }
        return $next($request);
    }
}
