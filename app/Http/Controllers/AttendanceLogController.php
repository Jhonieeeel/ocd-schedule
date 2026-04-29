<?php

namespace App\Http\Controllers;

use App\Models\AttendanceLog;
use App\Http\Requests\StoreAttendanceLogRequest;
use App\Http\Requests\UpdateAttendanceLogRequest;
use App\Models\Balance;
use Carbon\Carbon;

class AttendanceLogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(StoreAttendanceLogRequest $request)
    {
        $validated = $request->validated();
        $date = Carbon::parse($validated['date']);

        $attendance = AttendanceLog::create([
            ...$validated,
            'month'         => $date->month,
            'year'          => $date->year,
            'cutoff'        => $date->day <= 15 ? 1 : 2,
            'total_minutes' => ($validated['hours'] * 60) + $validated['minutes'],
        ]);

        $balance = Balance::where('id',$attendance->balance_id)
            ->where('user_id', $attendance->user_id)
            ->where('month', $attendance->month)
            ->where('year', $attendance->year)
            ->firstOrFail();

        $freshBalance = $balance->fresh();
        $freshBalance->updateUndertime();

        return redirect()->route('balance.show', $balance->id)
                ->with('message', 'Attendance Log added!');
    }

    /**
     * Display the specified resource.
     */
    public function show(AttendanceLog $attendanceLog)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(AttendanceLog $attendanceLog)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAttendanceLogRequest $request, AttendanceLog $attendanceLog)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AttendanceLog $attendanceLog)
    {
        //
    }
}
