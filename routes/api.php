<?php

use App\Http\Resources\BlogResource;
use App\Models\Blog;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Route;
// use App\Http\Controllers\Api\BlogController;
use Illuminate\Http\Request;
// use App\Http\Controllers\Api\Admin\Blogs\BlogController;
use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\Blogs\BlogController; // <-- bukan admin
use App\Http\Controllers\Api\Admin\Blogs\BlogController as AdminBlogController;


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

// Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route::get('/blogs', [BlogController::class, 'index']);
// Route::get('/blogs/{slug}', [BlogController::class, 'show']);

Route::get('/admin/blogs', function() {
    return response()->json(Blog::all());
});

Route::get('/blogs', [BlogController::class, 'index']);
Route::get('/blogs/{slug}', [BlogController::class, 'show']);

Route::post('/login', [AuthController::class, 'login']);
Route::prefix('admin')->middleware('auth:sanctum')->group(function () {
    Route::get('blogs', [AdminBlogController::class, 'index']);
    Route::get('blogs/{id}', [AdminBlogController::class, 'show']);
    Route::post('blogs', [AdminBlogController::class, 'store']);
    Route::put('blogs/{id}', [AdminBlogController::class, 'update']);
    Route::delete('blogs/{id}', [AdminBlogController::class, 'destroy']);
    Route::get('/admin/blogs', [AdminBlogController::class, 'index']);

     Route::post('/logout', [AuthController::class, 'logout']);
});