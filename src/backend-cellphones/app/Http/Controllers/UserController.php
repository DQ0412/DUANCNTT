<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    // Phương thức để lấy danh sách người dùng
    public function index(Request $request)
    {
        $users = User::all();
        return response()->json($users);
    }

    // Phương thức để xóa người dùng
    public function delete($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->delete();
        return response()->json(['message' => 'User deleted']);
    }
}
