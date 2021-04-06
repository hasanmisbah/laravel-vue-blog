<?php

namespace App\Http\Controllers\api\auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);
        return response($user, 200);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        if (Auth::attempt($credentials)) {
            $token = Auth::user()->createToken('application');
            return response()->json(['token' => $token->plainTextToken], 200);
        }
        return response()->json(['data' => 'User Name or email incorrect'], 401);

    }

    public function logout(Request $request)
    {
        if(Auth::check()){
            Auth::logout();
        }
        return response()->json('Successfully Logout');
    }
}
