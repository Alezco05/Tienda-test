<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductoPut extends FormRequest
{
    public function attributes(){
        return [
            'nombreProducto' => "Nombre del producto"
        ];
    }

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */

    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'nombreProducto' => 'min:5|max:500',
            'talla' => 'max:5',
            'observaciones' => 'max:500',
            'cantidad' => 'number',
        ];
    }
}
