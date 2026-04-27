<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAttendanceLogRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
   public function rules(): array
    {
        return [
            'user_id'  => ['required', 'exists:users,id'],
            'balance_id' => ['required', 'exists:balances,id'],
            'date'     => ['required', 'date', 'before_or_equal:today'],
            'hours'    => ['required', 'integer', 'min:0', 'max:23'],
            'minutes'  => ['required', 'integer', 'min:0', 'max:59'],
            'is_tardy' => ['required', 'boolean'],
        ];
    }
}
