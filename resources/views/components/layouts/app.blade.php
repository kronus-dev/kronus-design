<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="dark">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ $title ?? config('app.name') }}</title>

    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=inter:400,500,600,700" rel="stylesheet" />

    @vite(['resources/css/app.css', 'resources/js/app.js'])
    {{-- The design is dark only. Flux follows the OS theme by default and drops
         the `dark` class on light systems, so Flux parts would render light.
         Saving 'dark' before @fluxAppearance runs makes Flux keep it. --}}
    <script>try { localStorage.setItem('flux.appearance', 'dark') } catch (e) {}</script>
    @fluxAppearance
</head>

@php
    // TODO: point each item at a real route. Only the dashboard exists for now.
    $nav = [
        ['label' => 'Dashboard',        'icon' => 'home',          'href' => route('dashboard'), 'current' => request()->routeIs('dashboard')],
        ['label' => 'Employees',        'icon' => 'users',         'href' => '#'],
        ['label' => 'Sites & crews',    'icon' => 'building-office','href' => '#'],
        ['label' => 'Attendance',       'icon' => 'clock',         'href' => '#'],
        ['label' => 'Leave & absences', 'icon' => 'calendar-days', 'href' => '#'],
        ['label' => 'Certifications',   'icon' => 'check-badge',   'href' => '#'],
        ['label' => 'Health & safety',  'icon' => 'shield-check',  'href' => '#'],
        ['label' => 'Timesheets',       'icon' => 'document-text', 'href' => '#'],
        ['label' => 'Recruitment',      'icon' => 'briefcase',     'href' => '#'],
    ];
@endphp

{{-- `side` is the floating menu: collapsed rail (false) or expanded (true). --}}
<body class="min-h-screen bg-[#303136] font-sans text-sm text-zinc-200 antialiased" x-data="{ side: false }">

    {{-- Backdrop: click to close the open menu --}}
    <button type="button" x-show="side" x-cloak @click="side = false" aria-label="Close menu"
            class="fixed inset-0 z-40 cursor-default bg-zinc-900/45"></button>

    {{-- Floating menu. It overlays the page and never pushes the content. --}}
    <aside
        :class="side ? 'flex w-64 shadow-2xl shadow-black/40' : 'hidden w-20 lg:flex'"
        class="fixed inset-y-0 left-0 z-50 flex-col gap-1 overflow-y-auto overflow-x-hidden bg-[#222327] px-3 pb-4 pt-6 transition-[width] duration-200">

        <div class="flex min-h-9 items-center px-2 pb-6" :class="side ? 'justify-between' : 'justify-center'">
            <span x-show="side" class="text-2xl font-bold tracking-tight text-white">Kronos</span>
            <button type="button" @click="side = !side" :aria-expanded="side"
                    :aria-label="side ? 'Collapse menu' : 'Expand menu'"
                    class="flex size-9 shrink-0 items-center justify-center rounded-lg text-zinc-400 hover:bg-white/5">
                <flux:icon.chevron-left class="size-[18px]" x-show="side" />
                <flux:icon.chevron-right class="size-[18px]" x-show="!side" />
            </button>
        </div>

        <nav aria-label="Main" class="flex flex-1 flex-col gap-1">
            @foreach ($nav as $item)
                <a href="{{ $item['href'] }}" aria-label="{{ $item['label'] }}"
                   @if ($item['current'] ?? false) aria-current="page" @endif
                   :class="side ? '' : 'justify-center'"
                   class="flex items-center gap-3 rounded-lg px-3 py-2.5 font-medium {{ ($item['current'] ?? false) ? 'bg-[#1b3f40] text-teal-200' : 'text-zinc-400 hover:bg-white/5' }}">
                    <flux:icon :name="$item['icon']" class="size-[18px] shrink-0" />
                    <span x-show="side" class="whitespace-nowrap">{{ $item['label'] }}</span>
                </a>
            @endforeach

            <form method="POST" action="{{ route('logout') }}" class="mt-auto">
                @csrf
                <button type="submit" aria-label="Log out" :class="side ? '' : 'justify-center'"
                        class="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 font-medium text-zinc-400 hover:bg-white/5">
                    <flux:icon.arrow-right-start-on-rectangle class="size-[18px] shrink-0" />
                    <span x-show="side" class="whitespace-nowrap">Log Out</span>
                </button>
            </form>
        </nav>
    </aside>

    {{-- Top bar: phones and tablets only. Opens the same floating menu. --}}
    <div class="flex items-center justify-between bg-[#222327] px-4 py-3 lg:hidden">
        <span class="text-[22px] font-bold tracking-tight text-white">Kronos</span>
        <flux:button size="sm" icon="bars-3" @click="side = true" x-bind:aria-expanded="side">Menu</flux:button>
    </div>

    {{-- Header: sticky, aligned to the centred content column --}}
    <header class="sticky top-0 z-30 border-b border-zinc-700 bg-[#303136] px-4 sm:px-6 lg:px-24">
        <div class="mx-auto flex h-16 max-w-7xl items-center justify-end gap-3">
            <div class="hidden md:block">
                <flux:input type="search" icon="magnifying-glass" placeholder="Search…" class="w-70"
                            aria-label="Search processes, clients and employees" />
            </div>

            <flux:button variant="subtle" icon="bell" aria-label="Notifications" />

            <flux:dropdown position="bottom" align="end">
                <flux:profile :name="auth()->user()->name" :initials="auth()->user()->initials()" circle />

                <flux:menu>
                    <div class="px-3 py-2">
                        <div class="text-sm font-semibold">{{ auth()->user()->name }}</div>
                        <div class="text-xs text-zinc-400">{{ auth()->user()->email }}</div>
                    </div>
                    <flux:menu.separator />
                    <flux:menu.item icon="cog-6-tooth" :href="route('settings.profile')">Settings</flux:menu.item>
                    <form method="POST" action="{{ route('logout') }}">
                        @csrf
                        <flux:menu.item as="button" type="submit" icon="arrow-right-start-on-rectangle">Log out</flux:menu.item>
                    </form>
                </flux:menu>
            </flux:dropdown>
        </div>
    </header>

    {{-- Content stays centred; side padding clears the collapsed rail on desktop --}}
    <main class="px-4 py-8 sm:px-6 lg:px-24">
        <div class="mx-auto max-w-7xl">
            {{ $slot }}
        </div>
    </main>

    @fluxScripts
</body>
</html>
