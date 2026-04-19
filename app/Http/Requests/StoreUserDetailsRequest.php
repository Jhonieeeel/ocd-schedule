<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserDetailsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'user_id'             => ['required', 'exists:users,id'],
            'appointment_number'  => ['required', 'string',  'max:255'],
            'first_name'          => ['sometimes', 'string', 'max:255'],
            'last_name'           => ['sometimes', 'string', 'max:255'],
            'middle_name'         => ['nullable', 'string', 'max:255'],
            'sex'                 => ['nullable', 'string', 'in:male,female'],
            'avatar'              => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ];
    }

    public function messages(): array {
        return [];
    }
}
