<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SelectList extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'options'];

    protected $casts = [
        'options' => 'array', // Tự động convert JSON sang array khi lấy dữ liệu
    ];
}
