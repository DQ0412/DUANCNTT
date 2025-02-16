<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->decimal('price', 10, 2);
            $table->decimal('sale_price', 10, 2);
            $table->foreignId('type_id')->constrained('type_products')->onDelete('cascade'); // Khóa ngoại
            $table->string('image')->nullable();
            $table->integer('amount')->nullable();
            $table->text('description')->nullable();
            $table->string('screen')->nullable();  
            $table->string('technology')->nullable();  
            $table->string('camera')->nullable();  
            $table->string('chipset')->nullable();  
            $table->string('ram')->nullable();  
            $table->string('rom')->nullable();  
            $table->string('battery')->nullable();  
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('products');
    }
};
