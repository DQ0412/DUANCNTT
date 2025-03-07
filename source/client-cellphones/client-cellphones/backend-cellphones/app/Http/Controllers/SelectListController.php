<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SelectList;
use Illuminate\Support\Facades\Validator;

class SelectListController extends Controller
{
    // 🟢 Lấy tất cả danh sách SelectList
    public function index()
    {
        try {
            $selectLists = SelectList::all();
            return response()->json($selectLists, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Lỗi khi lấy danh sách', 'error' => $e->getMessage()], 500);
        }
    }

    // 🟢 Lấy thông tin SelectList theo ID
    public function show($id)
    {
        try {
            $selectList = SelectList::find($id);
            if (!$selectList) {
                return response()->json(['message' => 'Không tìm thấy danh sách'], 404);
            }
            return response()->json($selectList, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Lỗi khi lấy thông tin', 'error' => $e->getMessage()], 500);
        }
    }

    // 🟢 Tạo mới SelectList
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'options' => 'required|array'
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Dữ liệu không hợp lệ', 'errors' => $validator->errors()], 400);
        }

        try {
            $selectList = SelectList::create([
                'name' => $request->name,
                'options' => json_encode($request->options),
            ]);

            return response()->json(['message' => 'Tạo danh sách thành công', 'data' => $selectList], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Lỗi khi tạo danh sách', 'error' => $e->getMessage()], 500);
        }
    }

    // 🟢 Cập nhật SelectList
    public function update(Request $request, $id)
    {
        try {
            $selectList = SelectList::find($id);
            if (!$selectList) {
                return response()->json(['message' => 'Không tìm thấy danh sách'], 404);
            }

            $selectList->update([
                'name' => $request->name ?? $selectList->name,
                'options' => isset($request->options) ? json_encode($request->options) : $selectList->options,
            ]);

            return response()->json(['message' => 'Cập nhật thành công', 'data' => $selectList], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Lỗi khi cập nhật', 'error' => $e->getMessage()], 500);
        }
    }

    // 🟢 Xóa SelectList
    public function destroy($id)
    {
        try {
            $selectList = SelectList::find($id);
            if (!$selectList) {
                return response()->json(['message' => 'Không tìm thấy danh sách'], 404);
            }

            $selectList->delete();
            return response()->json(['message' => 'Xóa danh sách thành công'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Lỗi khi xóa', 'error' => $e->getMessage()], 500);
        }
    }
}
