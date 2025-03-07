<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id(); // BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY
            $table->unsignedBigInteger('user_id'); // Khóa ngoại tới bảng users
            $table->decimal('total_price', 10, 2); // Tổng giá trị đơn hàng
            $table->string('status')->default('pending'); // Trạng thái đơn hàng (pending, shipped, etc)
            $table->string('province')->nullable()->change(); // Nếu không cần giá trị mặc định
            $table->string('district')->nullable()->change();
            $table->string('ward')->nullable()->change();
            $table->timestamps(); // created_at, updated_at

            // Tạo khóa ngoại liên kết với bảng users
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}