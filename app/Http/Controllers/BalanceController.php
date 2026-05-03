<?php

namespace App\Http\Controllers;

use App\Models\Balance;
use App\Models\Leave;
use Illuminate\Http\Request;
use App\Http\Requests\StoreBalanceRequest;
use App\Http\Requests\UpdateBalanceRequest;
use App\Models\AttendanceLog;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
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
            ->where('month', $month)
            ->where('year', $year)
            ->when($request->search, fn($q) =>
                $q->whereHas('user', fn($q) =>
                    $q->where('name', 'like', "%{$request->search}%")
                )
            )
            ->paginate(10);


        return response()->json($balances);
    }

    public function all(Request $request)
    {
        return Inertia::render('balances/index', []);
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

        return to_route("balance.store")->with("message", 'Balance created successfully');
    }

    public function carry_over(StoreBalanceRequest $request) {

        $validated = $request->validated();

        $balance = Balance::where('id', $request['id'])->where('user_id', $validated['user_id'])
                ->where('year', $validated['year'])
                ->where('month', $validated['month'])
                ->first();

        if (!$balance) {
            return back()->withErrors(['errors', 'Balance not found']);
        }

        $balance->updateUndertime();
        $balance->checkBalance($balance->month, $balance->year);

        return to_route('balance.show', $balance->id)->with('message', 'New balance added to next month successfully');
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

        return to_route('balance.show', $balance->id)
        ->with('message', 'Balance updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Balance $balance)
    {
        $balance->delete();

        return to_route('balance.index')->with('message', 'Data for this month deleted successfully');
    }





}
