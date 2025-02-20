<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;

    // Các thuộc tính có thể gán giá trị
    protected $fillable = [
        'order_id',
        'product_id',
        'quantity',
        'price',
    ];

    // Quan hệ với bảng Order
    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
