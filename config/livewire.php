<?php

/*
 * Only the settings that differ from Livewire's defaults.
 * Livewire 4 looks for full-page layouts at `layouts::app`
 * (resources/views/layouts/app.blade.php). This app keeps its layout at
 * resources/views/components/layouts/app.blade.php, so point Livewire there.
 */
return [
    'component_layout' => 'components.layouts.app',
];
