<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
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
            'firstname' => ['required', 'string', 'max:255'],
            'lastname'  => ['required', 'string', 'max:255'],
            'sex'       => ['required', 'string'],
            'email'     => ['required', 'string', 'email', 'max:255'],
            'employee_number'     => ['required', 'string', 'max:255'],
            'password'  => ['required', 'string', 'min:6', 'confirmed'],
        ];
    }
}
