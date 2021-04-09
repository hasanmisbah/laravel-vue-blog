<?php

use App\Http\Controllers\api\auth\AuthController;
use App\Http\Controllers\api\CategoryController;
use App\Http\Controllers\api\PostController;
use App\Http\Controllers\api\TagController;
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

Route::middleware('auth:sanctum')->get('/me', function (Request $request) {
    return $request->user();
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);

Route::get('posts', [PostController::class, 'index']);


Route::group(['middleware' => "auth:sanctum"], function(){
    Route::get('me', fn (Request $request)=> $request->user());
    Route::apiResource('category', CategoryController::class)->except(['show', 'edit']);
    Route::apiResource('tag', TagController::class)->except(['show', 'edit']);
    Route::apiResource('post', PostController::class)->except(['show', 'edit']);
});
