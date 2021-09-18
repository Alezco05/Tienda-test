<?php

namespace App\Http\Controllers;

use App\Models\Marca;
use Illuminate\Http\Request;
use App\Http\Requests\MarcaPost;
use App\Http\Requests\UpdateMarcaPut;
use Illuminate\Support\Facades\Validator;

class MarcaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Marca::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(MarcaPost $request)
    {
        $requestData = $request->validated();
        $validator = Validator::make($requestData, MarcaPost::myRules());
        if ($validator->fails()) {
            response()->json(['ok' => false]);
        }
        $marca = Marca::create($requestData);
        return response()->json(['ok' => true, 'marca' => $marca]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
          $producto = Marca::findOrFail($id);
          return response()->json(['ok' => true, 'producto' => $producto]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateMarcaPut $request, $id)
    {
        $marca = Marca::findOrFail($id);
        $marca = tap($marca)->update($request->all());
        return response()->json(['ok' => true, 'marca' => $marca]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
