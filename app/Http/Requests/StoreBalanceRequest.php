<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreBalanceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'user_id'     => ['required', 'exists:users,id'],
            'vl_balance'  => ['nullable', 'numeric', 'min:0', 'max:99999.999'],
            'vl_used'     => ['nullable', 'numeric', 'min:0', 'max:99999.999'],
            'sl_balance'  => ['nullable', 'numeric', 'min:0', 'max:99999.999'],
            'sl_used'     => ['nullable', 'numeric', 'min:0', 'max:99999.999'],
            'fl_balance'  => ['nullable', 'numeric', 'min:0'],
            'spl_balance' => ['nullable', 'numeric', 'min:0'],
            'fl_used'     => ['nullable', 'numeric', 'min:0'],
            'undertime'   => ['nullable', 'numeric', 'min:0', 'max:99999.999'],
            'month'       => ['nullable', 'integer', 'min:1', 'max:12'],
            'year'        => ['nullable', 'integer', 'min:2000', 'max:' . now()->year],
            'as_of'       => ['nullable', 'date']
        ];
    }
}
