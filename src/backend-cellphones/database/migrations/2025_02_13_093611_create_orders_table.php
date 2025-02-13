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
    Schema::create('orders', function (Blueprint $table) {
        $table->id(); // BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY
        $table->unsignedBigInteger('user_id'); // Chắc chắn kiểu dữ liệu là UNSIGNED
        $table->decimal('total_price', 10, 2);
        $table->string('status')->default('pending');
        $table->text('shipping_address');
        $table->timestamps();

        // Tạo khóa ngoại
        $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
