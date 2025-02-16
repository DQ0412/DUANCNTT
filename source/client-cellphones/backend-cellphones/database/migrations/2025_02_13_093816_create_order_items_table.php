<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::create('order_items', function (Blueprint $table) {
        $table->id(); // BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY
        $table->unsignedBigInteger('order_id'); // Chắc chắn kiểu dữ liệu là UNSIGNED
        $table->unsignedBigInteger('product_id'); // Chắc chắn kiểu dữ liệu là UNSIGNED
        $table->integer('quantity');
        $table->decimal('price', 10, 2);
        $table->timestamps();

        // Tạo khóa ngoại
        $table->foreign('order_id')->references('id')->on('orders')->onDelete('cascade');
        $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_items');
    }
};
