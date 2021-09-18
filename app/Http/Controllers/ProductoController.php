<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;
use App\Http\Requests\ProductoPost;
use App\Http\Requests\UpdateProductoPut;
use Illuminate\Support\Facades\Validator;

class ProductoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Producto::with('marca')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProductoPost $request)
    {
        $requestData = $request->validated();
        $validator = Validator::make($requestData, ProductoPost::myRules());
        if ($validator->fails()) {
            response()->json(['ok' => false]);
        }
        $producto = Producto::create($requestData);
        return response()->json(['ok' => true, 'producto' => $producto]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
          $producto = Producto::findOrFail($id);
          return response()->json(['ok' => true, 'producto' => $producto]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateProductoPut $request, $id)
    {
        $producto = Producto::findOrFail($id);
        $producto = tap($producto)->update($request->all());
        return response()->json(['ok' => true, 'producto' => $producto]);
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
