<?php

namespace App\Http\Requests\v1;

use App\Helpers\AppHelpers;
use Illuminate\Foundation\Http\FormRequest;

class ComuneItalianoUpdateRequest extends ComuneItalianoStoreRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        $rules = parent::rules();
        return AppHelpers::aggiornaRegoleHelper($rules);
    }
}