<?php

namespace App\Http\Controllers;

use App\Models\Balance;
use App\Models\Leave;
use Illuminate\Http\Request;
use App\Http\Requests\StoreBalanceRequest;
use App\Http\Requests\UpdateBalanceRequest;
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

        $isAdmin = $user->hasRole('admin') || $user->hasRole('gip');

        $balances = Balance::where('user_id', $user->id)->latest()->get();

        return Inertia::render('balance/index', ['balances' => $balances, 'isAdmin' => $isAdmin]);
    }


  public function all_balances(Request $request)
    {
        $month = $request->input('month');
        $year  = $request->input('year');

        info($year);

        $balances = Balance::with('user')
            ->when($month, function($q) use ($month) {
                $q->where('month', $month);
            })
            ->when($year, function($q) use ($year) {
                $q->where('year', $year);
            })
            ->latest()
            ->get();

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

        return redirect()->route("balance.store")->with("message", 'Balance created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Balance $balance)
    {
        return Inertia::render('balances/user-balance', ['userBalance' => $balance->load('user')]);
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
        // validated['field_name;]
        $validated = $request->validated();





        return redirect()->route('balance.update', $request['id'])
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
