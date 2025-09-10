<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash; // jangan lupa ini
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        

        // admin user
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'artini.artalia501@gmail.com',
            'password' => Hash::make('merahputih'), // password harus di-hash
           
        ]);
    }
}
