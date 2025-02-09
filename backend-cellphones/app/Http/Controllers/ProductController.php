<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function getAllProducts()
    {
        return response()->json(Product::all(), 200);
    }

    public function getProductById($id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
        return response()->json($product, 200);
    }

    public function createProduct(Request $request)
    {
        $product = Product::create($request->all());
        return response()->json($product, 201);
    }

    public function updateProduct(Request $request)
    {
        $product = Product::find($request->id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
        $product->update($request->all());
        return response()->json($product, 200);
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

    public function filterProductByRandomField(Request $request)
    {
        $products = Product::where($request->field, $request->value)->get();
        return response()->json($products, 200);
    }

    public function paginationProduct($page)
    {
        $products = Product::paginate(10, ['*'], 'page', $page);
        return response()->json($products, 200);
    }
}
