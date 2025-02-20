<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    // Các thuộc tính có thể gán giá trị
    protected $fillable = [
        'user_id',
        'total_price',
        'status',
        
    ];

    // Quan hệ với bảng OrderItem
    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    // Quan hệ với bảng User (nếu cần)
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
