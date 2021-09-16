<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MarcaPost extends FormRequest
{
    public static function myRules(){
        return [
            'nombre' => 'required|min:5|max:200',
            'referencia' => 'required|min:3|max:150',
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
