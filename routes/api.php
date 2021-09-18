<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'auth'], function () {
    Route::post('login', [App\Http\Controllers\AuthController::class, 'login']);
    Route::post('signup', [App\Http\Controllers\AuthController::class, 'signUp']);
    Route::group(['middleware' => 'auth:api'], function () {
        Route::get('logout', [App\Http\Controllers\AuthController::class, 'logout']);
        Route::get('user', [App\Http\Controllers\AuthController::class, 'user']);
    });
});


Route::get('getProductos', [App\Http\Controllers\ProductoController::class, 'index']);
Route::get('getMarcas', [App\Http\Controllers\MarcaController::class, 'index']);
Route::get('getProducto/{id}', [App\Http\Controllers\ProductoController::class, 'show']);
Route::get('getMarca/{id}', [App\Http\Controllers\MarcaController::class, 'show']);

Route::group(['middleware' => 'auth:api'], function () {
    Route::apiResource('producto', App\Http\Controllers\ProductoController::class)->except(['index', 'show']);;
    Route::apiResource('marca', App\Http\Controllers\MarcaController::class)->except(['index', 'show']);
    Route::post('productoImg', [App\Http\Controllers\ProductoController::class, 'uploadImage']); 
});
