<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Comment;
class ProductController extends Controller
{
    public function getAllProducts()
    {
        return response()->json(Product::all(), 200);
    }
    public function search(Request $request)
{
    $name = $request->input('name');
    $products = Product::where('name', 'like', '%' . $name . '%')->get();
    return response()->json($products);
}

    public function getProductById($id)
{
    $product = Product::where('id', $id)->first();

    if (!$product) {
        return response()->json(['message' => 'Sản phẩm không tồn tại'], 404);
    }

    return response()->json([
        'id' => $product->id,
        'name' => $product->name,
        'price' => $product->price,
        'sale_price' => $product->sale_price,
        'image' => url('storage/' . $product->image),
        'description' => $product->description,
        'screen' => $product->screen,
        'chipset' => $product->chipset,
        'camera' => $product->camera,
        'ram' => $product->ram,
        'rom' => $product->rom,
        'battery' => $product->battery,
    ]);
}
public function createProduct(Request $request)
{
    // ✅ Kiểm tra `type_id` trước khi truy vấn
    if (!$request->type_id) {
        return response()->json(['error' => 'Thiếu type_id'], 400);
    }

    // ✅ Validate dữ liệu đầu vào
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'price' => 'required|numeric',
        'sale_price' => 'nullable|numeric',
        'description' => 'nullable|string',
        'screen' => 'nullable|string',
        'chipset' => 'nullable|string',
        'camera' => 'nullable|string',
        'ram' => 'nullable|string',
        'rom' => 'nullable|string',
        'battery' => 'nullable|string',
        'type_id' => 'required|exists:type_products,id',
        'image' => 'nullable|file|mimes:jpg,jpeg,png|max:2048',
    ]);

    // ✅ Lấy tên loại sản phẩm từ `type_products`
    $typeName = \App\Models\TypeProduct::where('id', $request->type_id)->value('name');

    // ✅ Kiểm tra nếu có ảnh
    if ($request->hasFile('image')) {
        $imagePath = $request->file('image')->store('public'); // Lưu vào storage/public/products
        $validated['image'] = basename($imagePath); // Lưu chỉ tên file ảnh
    } else {
        $validated['image'] = null;
    }

    // ✅ Tạo sản phẩm trong database
    $product = Product::create(array_merge($validated, ['type' => $typeName]));

    // ✅ Trả về JSON với đường dẫn ảnh chính xác
    return response()->json([
        'id' => $product->id,
        'name' => $product->name,
        'price' => $product->price,
        'sale_price' => $product->sale_price,
        'image' => $product->image ? asset("storage/{$product->image}") : null, // ✅ Đảm bảo ảnh có URL chính xác
        'description' => $product->description,
        'screen' => $product->screen,
        'chipset' => $product->chipset,
        'camera' => $product->camera,
        'ram' => $product->ram,
        'rom' => $product->rom,
        'battery' => $product->battery,
    ], 201);
}


    public function getProductsByCategory($type)
{
    //\Log::info("Fetching products for type: " . $type); // Log kiểm tra

    $products = Product::where('type', 'LIKE', "%{$type}%")->get();

    if ($products->isEmpty()) {
        return response()->json(['message' => 'No products found for this category'], 404);
    }

    return response()->json($products);
}

    public function updateProduct(Request $request, $id)
    {
        $product = Product::find($id);
    if (!$product) {
        return response()->json(['message' => 'Sản phẩm không tồn tại'], 404);
    }

    $product->name = $request->name;
    $product->price = $request->price;
    $product->sale_price = $request->sale_price;
    $product->amount = $request->amount;
    $product->type_id = $request->type_id;

    if ($request->hasFile('image')) {
        $imagePath = $request->file('image')->store('products', 'public');
        $product->image = "/storage/" . $imagePath;
    }

    $product->save();
    return response()->json($product);
    }
    public function filter(Request $request)
    {
        // Lấy các điều kiện lọc từ request
        $type = $request->input('type');
        $minPrice = $request->input('min_price');
        $maxPrice = $request->input('max_price');

        // Bắt đầu truy vấn với điều kiện mặc định
        $query = Product::query();

        // Lọc theo loại sản phẩm (hãng)
        if ($type) {
            $query->where('type', $type);
        }

        // Lọc theo khoảng giá nếu có
        if ($minPrice) {
            $query->where('price', '>=', $minPrice);
        }

        if ($maxPrice) {
            $query->where('price', '<=', $maxPrice);
        }

        // Lấy danh sách sản phẩm đã lọc
        $products = $query->get();

        // Trả về kết quả dạng JSON
        return response()->json($products);
    }
    public function deleteProduct($id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
        $product->delete();
        return response()->json(['message' => 'Product deleted'], 200);
    }

    public function searchProduct(Request $request)
    {
        $query = $request->query('name');
        $products = Product::where('name', 'LIKE', "%{$query}%")->get();
        return response()->json($products, 200);
    }
    

}
