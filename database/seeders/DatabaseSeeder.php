<?php

namespace Database\Seeders;

use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => 'user@gmail.com',
            'password' => '$2y$10$6FP5GmPPucLAJGtAYkz6LOO0hpvGw2M69M2X/kY/kcy3D/ie8qMUW', // password 12345678
            'role' => 'user',
            'remember_token' => Str::random(10),
        ]);

        DB::table('users')->insert([
            'name' => Str::random(10),
            'email' => 'admin@gmail.com',
            'password' => '$2y$10$6FP5GmPPucLAJGtAYkz6LOO0hpvGw2M69M2X/kY/kcy3D/ie8qMUW', // password 12345678
            'role' => 'admin',
            'remember_token' => Str::random(10),
        ]);
    }
}
