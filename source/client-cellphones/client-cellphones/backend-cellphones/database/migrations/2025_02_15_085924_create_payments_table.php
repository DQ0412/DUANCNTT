<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained('orders')->onDelete('cascade'); // Liên kết đơn hàng
            $table->string('method'); // Phương thức thanh toán (VNPAY, MoMo,...)
            $table->string('status'); // Trạng thái thanh toán (pending, completed, failed)
            $table->string('transaction_id')->nullable(); // Mã giao dịch từ bên thứ ba
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('payments');
    }
};
