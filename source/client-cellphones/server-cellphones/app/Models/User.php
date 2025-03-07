<?php

// app/Models/User.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'isAdmin', 
    ];

    protected $hidden = [
        'password', // Ẩn mật khẩu khi trả về response
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

}

