<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TypeProduct extends Model
{
    use HasFactory;

    protected $table = 'type_products'; // Đảm bảo đúng tên bảng

    protected $fillable = ['name'];

    // Quan hệ 1-n với Product
    public function products()
    {
        return $this->hasMany(Product::class, 'type_id', 'id');
    }
}
