# TiendaApp

## Installation


Install the dependencies and devDependencies.

```sh
composer install
cp .env.example .env
php artisan key:generate
```

Run migrations and install passport

```sh
php artisan migrate:fresh --seed
php artisan passport:install
```
Start the serve

```sh
php artisan serve
```

## Users

Migrations generate two users with random names. One user with an admin role and another with a user role.

```sh
user@gmail => 12345678
admin@gmail => 12345678
```
