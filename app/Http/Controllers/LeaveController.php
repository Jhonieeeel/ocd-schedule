<?php

namespace App\Http\Controllers;

use App\Models\Leave;
use App\Models\User;
use App\Models\Balance;
use App\Http\Requests\StoreLeaveRequest;
use App\Http\Requests\UpdateLeaveRequest;
use Carbon\Carbon;
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
                'user_id' => $leave->user->id,
                'description' => $leave->description,
                'start' => $leave->start->toDateString(),
                'end' => $leave->end->toDateString(),
                'is_approve' => $leave->is_approve
            ];
        });

        return Inertia::render("leave/index", ['users' => $users, 'leaves' => $leaves]);
    }

    /**1
     * Show the form for creating  a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */

    public function store(StoreLeaveRequest $request) {

        $validated = $request->validated();

        $start = Carbon::parse($validated['start']);
        $end = Carbon::parse($validated['end']);
        $totalLeaveDays = $start->diffInDays($end) + 1;


        // check balance first
        $balance = Balance::forBalance($validated['user_id'], $start->month, $start->year);

        if (!$balance) {
            return back()->withErrors(['errors' => 'This user doesnt have balance yet. ']);
        }

        // check if theres a leave for the date range
        if (Leave::checkDateRange($validated['user_id'], $start, $end)) {
            return back()->withErrors(['leave_type' => 'This user still has a leave for this date range.']);
        }


        $result = $balance->checkLeaveType($validated['leave_type'], $balance);

        if ($result) return $result;

        // create if no errors at all
        Leave::create($validated);

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
        $validated = $request->validated();
        // slicing the date
        $start = Carbon::parse($request['start']);
        $end = Carbon::parse($request['end']);
        $totalLeaveDays = $start->diffInDays($end) + 1;

        // query ang balance utro para mo deduct
        $balance = Balance::forBalance($validated['user_id'], $start->month, $start->year);

        if (!$balance) {
            return back()->withErrors(['balance', 'No balances record found for this period.']);
        }

        $isApprove = $leave->is_approve;

        // deduct balance, if first time ang pag approve
        if (!$isApprove && $validated['is_approve']) {
            $balance->checkLeaveType($validated['leave_type'], $totalLeaveDays);
        }

        // restore the balance if mo e cancel balik

        // if ($isApprove && !$validated['is_approve']) {
        //     match ($validated['leave_type']) {
        //         'Sick Leave'  => $balance->restoreSLBalance($totalLeaveDays),
        //         'Special Privilege Leave'  => $balance->restoreSPLBalance(($totalLeaveDays)),
        //         default => null
        //     };
        // }

        // if no errors then update
        $leave->update($validated);

        return redirect()->route('leave.index')->with('message', 'Leave updated.');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Leave $leave)
    {
        $leave->delete();

        // dapat json, kaso dimo reload akoa kuan
        return redirect()->route('leave.index')->with('message', 'Leave deleted successfully.');
    }
}
