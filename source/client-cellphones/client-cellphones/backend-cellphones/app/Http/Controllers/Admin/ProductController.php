<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\TypeProduct;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        //Log::info("📌 API /admin/products được gọi!");
        $products = Product::with('typeProduct')->get();
        return response()->json($products);
    }

    public function store(Request $request)
{
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'price' => 'required|numeric',
        'sale_price' => 'nullable|numeric',
        'type_id' => 'required|exists:type_products,id',
        'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048', // Thêm kiểm tra file ảnh
        'amount' => 'nullable|integer',
        'description' => 'nullable|string',
        'screen' => 'nullable|string',
        'technology' => 'nullable|string',
        'camera' => 'nullable|string',
        'chipset' => 'nullable|string',
        'ram' => 'nullable|string',
        'rom' => 'nullable|string',
        'battery' => 'nullable|string',
    ]);

    // Nếu có ảnh, lưu vào storage và lấy đường dẫn
    if ($request->hasFile('image')) {
        $imagePath = $request->file('image')->store('products', 'public');
        $validated['image'] = $imagePath;
    }

    $product = Product::create($validated);
    return response()->json($product, 201);
}


    public function show($id)
    {
        $product = Product::with('typeProduct')->findOrFail($id);
        return response()->json($product);
    }

    public function update(Request $request, $id)
{
    $product = Product::find($id);

    if (!$product) {
        \Log::error("❌ [DEBUG] Không tìm thấy sản phẩm với ID: " . $id);
        return response()->json(['message' => 'Product not found'], 404);
    }

    \Log::info("📌 [DEBUG] Dữ liệu nhận được từ React:", $request->all());

    $validated = $request->validate([
        'name' => 'sometimes|required|string|max:255',
        'price' => 'sometimes|required|numeric',
        'sale_price' => 'sometimes|nullable|numeric',
        'type_id' => 'sometimes|required|exists:type_products,id',
        'image' => 'sometimes|nullable|string',
        'amount' => 'sometimes|nullable|integer',
        'description' => 'sometimes|nullable|string',
        'screen' => 'sometimes|nullable|string',
        'technology' => 'sometimes|nullable|string',
        'camera' => 'sometimes|nullable|string',
        'chipset' => 'sometimes|nullable|string',
        'ram' => 'sometimes|nullable|string',
        'rom' => 'sometimes|nullable|string',
        'battery' => 'sometimes|nullable|string',
    ]);

    if ($request->hasFile('image')) {
        $imagePath = $request->file('image')->store('products', 'public');
        $validated['image'] = $imagePath;
        \Log::info("📌 [DEBUG] Ảnh đã upload: " . $imagePath);
    }

    $product->update($validated);
    \Log::info("✅ [DEBUG] Cập nhật thành công sản phẩm ID: " . $id);

    return response()->json($product);
}

    public function destroy($id)
{
    $product = Product::find($id);

    if (!$product) {
        return response()->json(['message' => 'Product not found'], 404);
    }

    $product->delete();
    return response()->json(['message' => 'Product deleted successfully']);
}

}
