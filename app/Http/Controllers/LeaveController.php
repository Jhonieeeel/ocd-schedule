<?php

namespace App\Http\Controllers;

use App\Models\Leave;
use App\Models\User;
use App\Http\Requests\StoreLeaveRequest;
use App\Http\Requests\UpdateLeaveRequest;
use Inertia\Inertia;

class LeaveController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::select(['id', 'name'])->get();

        $leaves = Leave::with('user')->get()->map(function ($leave) {
            return [
                'id' => (string) $leave->id,
                'calendarId' => $leave->leave_type,
                'title' => $leave->leave_type,
                'user' => $leave->user->name,
                'description' => $leave->description,
                'start' => $leave->date_from->toDateString(),
                'end' => $leave->date_to->toDateString()
            ];
        });

        return Inertia::render("leave/index", ['users' => $users, 'leaves' => $leaves]);
    }

    /**
     * Show the form for creating  a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLeaveRequest $request)
    {
       Leave::create($request->validated());

       return redirect()->route('leave.index')->with('message', 'Leave created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Leave $leave)
    {
        return Inertia::render("", ['leave' => $leave]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Leave $leave)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLeaveRequest $request, Leave $leave)
    {
        $leave->update($request->validated());

        return redirect()->route("leave.index")->with('message', 'Leave updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Leave $leave)
    {
        $leave->delete();

        return redirect()->route('leave.index')->with('message', 'Leave deleted successfully.');
    }
}
