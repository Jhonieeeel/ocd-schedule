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

        $cto = Leave::where('leave_type', 'CTO')
            ->where('is_approve', true)
            ->whereBetween('start', [now()->startOfMonth(), now()->endOfMOnth()])
            ->get();

        info($cto);

        $auto_offset = Leave::where('leave_type', 'Auto Offset')
            ->where('is_approve', true)
            ->whereBetween('start', [now()->startOfMonth(), now()->endOfMOnth()])
            ->get();


        $on_leave_not_filled = Leave::where('leave_type', 'On Leave (not filled)')
            ->where('is_approve', true)
            ->whereBetween('start', [now()->startOfMonth(), now()->endOfMOnth()])
            ->get();

        $auto_offset_not_filled = Leave::where('leave_type', 'Auto Offset (not filled)')
            ->where('is_approve', true)
            ->whereBetween('start', [now()->startOfMonth(), now()->endOfMOnth()])
            ->get();

        $leaveTypes = ['CTO', 'Auto Offset', 'On Leave (not filled)', 'Auto Offset (not filled)'];

        $leaves = Leave::whereNotIn('leave_type', $leaveTypes)->get();

        return Inertia::render('dashboard', ['cto' => $cto, 'auto_offset' => $auto_offset, 'leaves' => $leaves]);
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
