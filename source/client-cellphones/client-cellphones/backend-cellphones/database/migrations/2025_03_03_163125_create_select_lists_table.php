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
    Schema::create('select_lists', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->json('options'); // Lưu danh sách lựa chọn dưới dạng JSON
        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('select_lists');
    }
};
