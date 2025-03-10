<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TypeProduct;

class TypeProductController extends Controller
{
    public function getAllTypeProduct()
    {
        return response()->json(TypeProduct::all(), 200);
    }

    public function CreateNewTypeProduct(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255'
        ]);

        $typeProduct = TypeProduct::create($validated);
        return response()->json($typeProduct, 201);
    }

    public function deleteTypeProduct($id)
    {
        $typeProduct = TypeProduct::find($id);
        if (!$typeProduct) {
            return response()->json(['message' => 'Type product not found'], 404);
        }
        $typeProduct->delete();
        return response()->json(['message' => 'Deleted successfully'], 200);
    }
}
