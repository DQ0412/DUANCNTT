<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'price', 'sale_price', 'type_id', 'image', 'amount', 'description',
        'screen', 'technology', 'camera', 'chipset', 'ram', 'rom', 'battery'
    ];

    public function typeProduct()
    {
        return $this->belongsTo(TypeProduct::class, 'type_id');
    }
}
