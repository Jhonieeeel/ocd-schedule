<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateBalanceRequest extends FormRequest
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
            'user_id'     => ['required', 'integer', 'exists:users,id'],
            'vl_balance'  => ['nullable', 'numeric', 'decimal:0,3', 'min:0', 'max:99999.999'],
            'vl_used'     => ['nullable', 'numeric', 'decimal:0,3', 'min:0', 'max:99999.999'],
            'sl_balance'  => ['nullable', 'numeric', 'decimal:0,3', 'min:0', 'max:99999.999'],
            'sl_used'     => ['nullable', 'numeric', 'decimal:0,3', 'min:0', 'max:99999.999'],
            'fl_balance'  => ['nullable', 'numeric', 'decimal:0,2', 'min:0', 'max:99999999.99'],
            'fl_used'     => ['nullable', 'numeric', 'decimal:0,2', 'min:0', 'max:99999999.99'],
            'undertime'   => ['nullable', 'numeric', 'decimal:0,3', 'min:0', 'max:99999.999'],
            'month'       => ['nullable', 'integer', 'min:1', 'max:12'],
            'year'        => ['nullable', 'integer', 'min:1900', 'max:' . date('Y')],
        ];
    }
}
