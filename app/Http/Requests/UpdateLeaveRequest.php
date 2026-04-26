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
            'user_id'     => ['sometimes', 'exists:users,id'],
            'leave_type'  => ['sometimes', 'string'],
            'date_from'   => ['sometimes', 'date'],
            'date_to'     => ['sometimes', 'date'],
            'description' => ['nullable', 'string'],
            'is_approve' => ['nullable', 'boolean']
        ];
    }
}
