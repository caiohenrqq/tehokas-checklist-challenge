<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Consultor Tehokas',
            'email' => 'consultor@tehokas.com',
            'password' => Hash::make('password'),
        ]);
    }
}
