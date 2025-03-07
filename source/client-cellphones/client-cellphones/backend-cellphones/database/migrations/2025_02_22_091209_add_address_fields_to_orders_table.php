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
    Schema::table('orders', function (Blueprint $table) {
        $table->string('province')->nullable();
        $table->string('district')->nullable();
        $table->string('ward')->nullable();
        $table->string('custom_address')->nullable();
    });
}

public function down()
{
    Schema::table('orders', function (Blueprint $table) {
        $table->dropColumn(['province', 'district', 'ward', 'custom_address']);
    });
}

};
