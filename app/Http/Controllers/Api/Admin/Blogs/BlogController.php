<?php

namespace App\Http\Controllers\Api\Admin\Blogs;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class BlogController extends Controller
{
    // GET /api/admin/blogs
    public function index()
    {
        return response()->json(Blog::orderBy('created_at', 'desc')->get());
    }

    // GET /api/admin/blogs/{id}
    public function show($id)
    {
        $blog = Blog::findOrFail($id);
        return response()->json($blog);
    }

    // POST /api/admin/blogs
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:blogs,slug',
            'content' => 'required|string',
            'image' => 'nullable|string',
            'author' => 'required|string|max:255',
            'category' => 'required|string|max:255',
        ]);

        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($data['title']) . '-' . Str::random(6);
        }

        $blog = Blog::create($data);
        return response()->json($blog, 201);
    }

    // PUT /api/admin/blogs/{id}
    public function update(Request $request, $id)
    {
        $blog = Blog::findOrFail($id);

        $data = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'slug' => [
                'sometimes','required','string','max:255',
                Rule::unique('blogs')->ignore($blog->id),
            ],
            'content' => 'sometimes|required|string',
            'image' => 'nullable|string',
            'author' => 'sometimes|required|string|max:255',
            'category' => 'sometimes|required|string|max:255',
        ]);

        $blog->update($data);
        return response()->json($blog);
    }

    // DELETE /api/admin/blogs/{id}
    public function destroy($id)
    {
        $blog = Blog::findOrFail($id);
        $blog->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
