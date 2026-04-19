<?php

namespace App\Http\Controllers;

use App\Models\Balance;
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

    public function all()
    {
        return Inertia::render('balances/index', [
            'balances' => Balance::with('user')->latest()->get(),
        ]);
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
        return response()->json([
            'data' => $balance->getVL()
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
        $balance->update($request->validated());
        return redirect()->route('balance.index')->with('message', 'Balance updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Balance $balance)
    {
        $balance->delete();
    }
}
