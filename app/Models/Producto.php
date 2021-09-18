<?php

namespace App\Models;

use App\Models\Marca;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Producto extends Model
{
    use HasFactory;
    protected $fillable = [
        'nombreProducto',
        'marcaProducto',
        'talla',
        'marca_id',
        'observaciones',
        'cantidad',
        'fechaEmbarque',
        'imageurl',
        'activa'
    ];
    public function marca()
    {
        return $this->belongsTo(Marca::class);
    }
}
