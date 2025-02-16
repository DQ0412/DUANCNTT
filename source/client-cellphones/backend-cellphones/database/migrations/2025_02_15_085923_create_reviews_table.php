<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
            $table->integer('rating'); // Số sao đánh giá
            $table->text('comment')->nullable(); // Nội dung đánh giá
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('reviews');
    }
};
