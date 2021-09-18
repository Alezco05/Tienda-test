<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;
use App\Http\Requests\ProductoPost;
use App\Http\Requests\UpdateProductoPut;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;

class ProductoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Producto::where('activa', '=' ,'1')->with('marca')->get();
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
          $producto = Producto::findOrFail($id)->with('marca')->first();
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
        $requestData = $request->validated();
        $validator = Validator::make($requestData, UpdateProductoPut::myRules());
        if ($validator->fails()) {
            response()->json(['ok' => false]);
        }
        $producto = Producto::findOrFail($id);
        $producto = tap($producto)->update($requestData);
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
        $producto = Producto::findOrFail($id);
        return tap($producto)->update(['activa' => 0]);
       
    }
    public function uploadImage(Request $request)
    {
        $producto = Producto::findOrFail($request->id);
        if ($request->image) {
            if ($producto->imageurl != ''  && $producto->imageurl != null) {
                File::delete($producto->imageurl);
            }
            $file      = $request->file('image');
            $extension = $file->getClientOriginalExtension();
            $picture   = $request->nombreProducto . time() . '.' . $extension;
            $file->move(public_path('img/productos'), $picture);
            $path = 'img/productos/' . $picture;
            return tap($producto)->update(['imageurl' => $path]);
        } else {
            return response()->json(["message" => "Select Image First"]);
        }
    }
}
