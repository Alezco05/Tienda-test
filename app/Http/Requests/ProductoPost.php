<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductoPost extends FormRequest
{

    public static function myRules(){
        return [
            'nombreProducto' => 'required|min:5|max:500',
            'marca_id' => 'required',
            'talla' => 'required|max:5',
            'observaciones' => 'max:500',
            'cantidad' => 'required',
            'fechaEmbarque' => 'required',
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
        return $this->myRules();
    }
}
