<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('productos', function (Blueprint $table) {
            $table->id();
            $table->string('nombreProducto',200)->nullable();
            $table->foreignId('marca_id')
            ->references('id')->on('marcas')
            ->onDelete('cascade');
            $table->string('talla',5)->nullable();
            $table->string('observaciones',255)->nullable();
            $table->integer('cantidad')->nullable();
            $table->date('fechaEmbarque')->nullable();
            $table->string('imgurl',255)->nullable();
            $table->tinyInteger('activa')->nullable()->default('1');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('productos');
    }
}
