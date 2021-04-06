<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'SPA Blog') }}</title>
</head>
<body>
    <div id="app"></div>
    <script src="{{asset('js/main.js')}}"></script>
    @env('local')
        <script src="http://localhost:35729/livereload.js"></script>
    @endenv
</body>
</html>
