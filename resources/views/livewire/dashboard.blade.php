<div class="flex flex-col gap-6">

    {{-- Hero: company logo and name --}}
    <section aria-label="Company" class="flex min-w-0 items-center gap-4 rounded-lg bg-[#222327] p-5 sm:gap-6 sm:p-8">
        {{-- Replace with the company logo: <img src="{{ asset('images/logo.svg') }}" ... /> --}}
        <span aria-hidden="true" class="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-teal-200 text-zinc-900 sm:size-[72px]">
            <flux:icon.building-office class="size-7 sm:size-9" />
        </span>
        <div class="min-w-0">
            <h1 class="break-words text-[26px] font-bold tracking-tight text-white sm:text-4xl">{{ $company }}</h1>
            <p class="mt-1 text-sm text-zinc-400">Human resources dashboard</p>
        </div>
    </section>

    {{-- Overview --}}
    <div class="-mb-2">
        <h2 class="text-xl font-bold text-white">Overview</h2>
        <p class="mt-1.5 text-[13px] text-zinc-400">Workforce at a glance</p>
    </div>

    <section aria-label="Key figures" class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        @foreach ($this->kpis as $kpi)
            <div class="min-w-0 rounded-lg bg-[#222327] px-6 py-5">
                <div class="flex items-center justify-between gap-2 text-[13px] text-zinc-400">
                    <span>{{ $kpi['label'] }}</span>
                    <flux:icon.chevron-right class="size-4 shrink-0 text-zinc-200" />
                </div>
                <div class="mt-1.5 flex items-end justify-between gap-2">
                    <span class="text-3xl font-bold leading-tight text-white">{{ $kpi['value'] }}</span>
                    <span class="text-[13px] {{ $kpi['up'] ? 'text-emerald-300' : 'text-red-300' }}">{{ $kpi['delta'] }}</span>
                </div>
            </div>
        @endforeach
    </section>

    {{-- Processes --}}
    <div class="-mb-2">
        <h2 class="text-xl font-bold text-white">Processes</h2>
        <p class="mt-1.5 text-[13px] text-zinc-400">{{ $this->processes->total() }} processes</p>
    </div>

    <section class="min-w-0 rounded-lg bg-[#222327] p-4 sm:p-6">

        {{-- Table: tablets and up --}}
        <div class="hidden md:block">
            <flux:table>
                <flux:table.columns>
                    <flux:table.column>Process number</flux:table.column>
                    <flux:table.column align="center">Client name</flux:table.column>
                    <flux:table.column align="center">Process type</flux:table.column>
                    <flux:table.column align="center">Process owner</flux:table.column>
                    <flux:table.column align="center">Est. delivery date</flux:table.column>
                    <flux:table.column
                        align="end"
                        sortable
                        :sorted="$sortBy === 'status'"
                        :direction="$sortDirection"
                        wire:click="sort('status')"
                    >Status</flux:table.column>
                </flux:table.columns>

                <flux:table.rows>
                    @foreach ($this->processes as $process)
                        <flux:table.row :key="$process->id">
                            <flux:table.cell variant="strong" class="whitespace-nowrap tabular-nums">{{ $process->internal_code }}</flux:table.cell>
                            <flux:table.cell align="center" class="whitespace-normal">{{ $process->client?->name }}</flux:table.cell>
                            <flux:table.cell align="center" class="whitespace-normal">{{ $process->type?->name }}</flux:table.cell>
                            <flux:table.cell align="center" class="whitespace-normal">{{ $process->owner?->name }}</flux:table.cell>
                            <flux:table.cell align="center" class="whitespace-nowrap tabular-nums">{{ $process->preview_end_date?->format('Y-m-d') }}</flux:table.cell>
                            {{-- Colour on a span: Flux's own cell colour would override it on the cell. --}}
                            <flux:table.cell align="end" class="font-medium">
                                <span class="{{ \App\Livewire\Dashboard::statusClass($process->state?->name) }}">{{ $process->state?->name }}</span>
                            </flux:table.cell>
                        </flux:table.row>
                    @endforeach
                </flux:table.rows>
            </flux:table>
        </div>

        {{-- Cards: phones --}}
        <div class="md:hidden">
            <div class="mb-3 flex justify-end">
                <flux:button size="sm" variant="ghost" wire:click="sort('status')" icon-trailing="chevron-up-down">
                    Sort by status
                </flux:button>
            </div>

            <div class="flex flex-col gap-3">
                @foreach ($this->processes as $process)
                    <article wire:key="card-{{ $process->id }}" class="grid grid-cols-2 gap-x-4 gap-y-2.5 rounded-lg border border-zinc-700 p-4 text-sm">
                        <div>
                            <div class="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Process number</div>
                            <div class="font-semibold tabular-nums text-white">{{ $process->internal_code }}</div>
                        </div>
                        <div>
                            <div class="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Status</div>
                            <div class="font-medium {{ \App\Livewire\Dashboard::statusClass($process->state?->name) }}">{{ $process->state?->name }}</div>
                        </div>
                        <div class="col-span-2">
                            <div class="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Client name</div>
                            <div class="text-white">{{ $process->client?->name }}</div>
                        </div>
                        <div>
                            <div class="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Process type</div>
                            <div>{{ $process->type?->name }}</div>
                        </div>
                        <div>
                            <div class="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Process owner</div>
                            <div>{{ $process->owner?->name }}</div>
                        </div>
                        <div>
                            <div class="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Est. delivery date</div>
                            <div class="tabular-nums">{{ $process->preview_end_date?->format('Y-m-d') }}</div>
                        </div>
                    </article>
                @endforeach
            </div>
        </div>

        <div class="mt-4">
            <flux:pagination :paginator="$this->processes" />
        </div>
    </section>
</div>
