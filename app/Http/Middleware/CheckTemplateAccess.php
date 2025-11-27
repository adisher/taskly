<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckTemplateAccess
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = auth()->user();

        // Only allow superadmin and company users to access templates
        if (!$user || !in_array($user->type, ['superadmin', 'company'])) {
            if ($request->expectsJson()) {
                return response()->json([
                    'message' => __('Access denied. Templates are only available to company administrators.')
                ], 403);
            }

            abort(403, __('Access denied. Templates are only available to company administrators.'));
        }

        return $next($request);
    }
}
