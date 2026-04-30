<?php

namespace App\Http\Controllers;

use App\Models\Balance;
use App\Models\Leave;
use Illuminate\Http\Request;
use App\Http\Requests\StoreBalanceRequest;
use App\Http\Requests\UpdateBalanceRequest;
use App\Models\AttendanceLog;
use App\Models\User;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Inertia\Inertia;

class BalanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
         /**
            * Checker soon if super-admin or not
         */

        $user = auth()->user();

        $isAdmin = $user->hasRole('admin') || $user->hasRole('employee');

        $userBalance = Balance::where('user_id', $user->id)->first();


        return Inertia::render('balance/index', ['userBalance' => $userBalance, 'isAdmin' => $isAdmin]);
    }


    public function all_balances(Request $request)
    {
        $month = $request->input('month');
        $year  = $request->input('year');

        $balances = Balance::with('user')
            ->when($month, function($q) use ($month) {
                $q->where('month', $month);
            })
            ->when($year, function($q) use ($year) {
                $q->where('year', $year);
            })
            ->latest()
            ->paginate(10);

        info($balances);


        return response()->json($balances);
    }

    public function all(Request $request)
    {

        $users = User::select('id', 'name')->get();

        return Inertia::render('balances/index', ['users' => $users]);
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
    public function store(StoreBalanceRequest $request)
    {
        Balance::create($request->validated());

        return redirect()->route("balance.store")->with("message", 'Balance created successfully');
    }

    public function carry_over(StoreBalanceRequest $request) {

        $validated = $request->validated();

        $balance = Balance::where('id', $request['id'])->where('user_id', $validated['user_id'])
                ->where('year', $validated['year'])
                ->where('month', $validated['month'])
                ->firstOrFail();

        $balance->getUndertime();

        return to_route('balance.index')->with('message', 'New balance added successfully');
    }


    /**
     * Display the specified resource.
     */
   public function show(Balance $balance)
    {
        $logs = $balance->attendanceLogs()->get();

        return Inertia::render('balances/user-balance', [
            'userBalance'    => $balance->load('user'),
            'attendanceLogs' => $logs,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Balance $balance)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBalanceRequest $request, Balance $balance)
    {
        $validated = $request->validated();

        $balance->update($validated);

        return redirect()->route('balance.show', $balance->id)
        ->with('message', 'Balance updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Balance $balance)
    {
        $balance->delete();
    }




}
