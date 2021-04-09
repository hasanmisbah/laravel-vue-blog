<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;


class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $categories = Category::all();
        return response()->json($categories, 200);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        if(!Auth::check()){
            return response()->json(['messages' => 'You are not authorised'], 419);
        }
        $validate = $request->validate([
            'name' => 'required|min:3',
            'slug' => 'required|unique:categories|min:3'
        ]);

        $category = Category::Create([
            'name' => $request->name,
            'slug' => Str::slug($request->slug)
        ]);
        return response()->json($category, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Category $category)
    {
        if(!Auth::check()){
            return response()->json(['messages' => 'You are not authorised'], 419);
        }
        $validate = $request->validate([
            'name' => 'required|min:3',
            'slug' => ['required', Rule::unique('categories')->ignore($category->id)]
        ]);
        $category->update([
            'name' => $request->name,
            'slug' => Str::slug($request->slug)
        ]);
        return response()->json(['messages' => 'Data Successfully Updated'], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Category $category)
    {
        if(!Auth::check()){
            return response()->json(['messages' => 'You are not authorised'], 419);
        }
        $category->delete();
        return response()->json(['messages' => 'Data Succesfully Deleted'], 200);
    }
}
