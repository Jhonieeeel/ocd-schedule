<?php

namespace App\Http\Controllers;

use App\Models\Leave;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $cto = Leave::where('leave_type', 'CTO')
        //     ->orWhereMonth('date_from', now()->month) // 1-12
        //     ->orWhereYear('date_from', now()->year) // 2000+
        //     ->count();


        $cto = Leave::where('leave_type', 'CTO')
            ->whereBetween('date_from', [now()->startOfMonth(), now()->endOfMOnth()])
            ->count();



        return Inertia::render('dashboard', ['cto' => $cto]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
