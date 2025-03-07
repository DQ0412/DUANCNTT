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
            'image' => 'nullable|string',
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
        $product = Product::findOrFail($id);

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

        $product->update($validated);

        return response()->json($product);
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return response()->json(['message' => 'Product deleted successfully']);
    }
}
