<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateLeaveRequest extends FormRequest
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
            'leave_type'  => ['required', 'string'],
            'date_from'   => ['required', 'date'],
            'date_to'     => ['required', 'date'],
            'description' => ['nullable', 'string'],
            'is_approve' => ['nullable', 'boolean']
        ];
    }
}
