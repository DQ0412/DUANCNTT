<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    
    protected $fillable = [
        'user_id',
        'total_price',
        'status',
        'province',
        'district',
        'ward',
        'custom_address',
        'name',
        'phone'
    ];

    
    protected $with = ['items', 'payment'];

    
    public function items()
    {
        return $this->hasMany(OrderItem::class, 'order_id'); 
    }

    
    public function payment()
    {
        return $this->hasOne(Payment::class, 'order_id');
    }

    
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
