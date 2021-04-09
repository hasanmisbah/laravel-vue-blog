<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tags = Tag::all();
        return response()->json($tags, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
       $tag = Tag::create([
           'name' => $request->name,
           'slug' => Str::slug($request->slug)
       ]);
       if($tag){
           return response()->json(['messages' => 'data Successfully Added'], 200);
       }
        return response()->json(['messages' => 'Failed To add Data'], 200);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Tag $tag)
    {

       $update = $tag->update([
           'name' => $request->name,
           'slug' => Str::slug($request->slug)
       ]);
       if($update) {
           return response()->json(['messages' => 'data Successfully updated'], 200);
       }
        return response()->json(['messages' => 'Failed To update Data'], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Tag  $tag
     * @return \Illuminate\Http\Response
     */
    public function destroy(Tag $tag)
    {
       $tag->delete();
        return response()->json(['messages' => 'data Successfully Deleted'], 200);
    }
}
