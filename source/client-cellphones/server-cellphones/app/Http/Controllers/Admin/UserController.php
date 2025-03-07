<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    // Lấy tất cả người dùng
    public function getAllUser()
    {
        $users = User::all();
        return response()->json($users);
    }

    // Sửa thông tin người dùng
    public function updateUser(Request $request, $id)
    {
        $user = User::find($id);
        
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Xác thực dữ liệu đầu vào
        $validator = Validator::make($request->all(), [
            'name' => 'string|max:255',
            'email' => 'email|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:6|confirmed', // password_confirmation phải khớp (nếu có)
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        // Cập nhật thông tin người dùng
        $user->name = $request->name ?: $user->name;
        $user->email = $request->email ?: $user->email;
        
        // Nếu có mật khẩu mới, mã hóa và cập nhật
        if ($request->has('password')) {
            $user->password = Hash::make($request->password);
        }

        $user->save();

        return response()->json(['message' => 'User updated successfully', 'user' => $user]);
    }

    // Xóa người dùng
    public function deleteUser($id)
    {
        $user = User::find($id);

        if ($user) {
            $user->delete();
            return response()->json(['message' => 'User deleted successfully'], 200);
        }

        return response()->json(['message' => 'User not found'], 404);
    }
}
