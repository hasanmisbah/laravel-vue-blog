<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $posts = Post::all();
        return response()->json($posts, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $post = Post::Create([
            'title' => $request->title,
            'slug' => Str::slug($request->slug),
            'posts' => $request->posts,
            'user_id' => auth()->user()->id
        ]);
        $post->categories()->sync($request->category);
        $post->tags()->sync($request->tag);
        return response($post, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Post $post)
    {
        $post->Update([
            'title' => $request->title,
            'slug' => Str::slug($request->slug),
            'posts' => $request->posts,
        ]);
        $post->categories()->sync($request->category);
        $post->tags()->sync($request->tag);
        return response($post, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
       $post->delete();
       return response($post, 200);
    }
}
