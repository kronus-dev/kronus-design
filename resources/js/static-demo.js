// Runs only in the static demo (docs/index.html), built by `php artisan kronos:export-static`.
// Re-creates the dashboard's status sort and paging in the browser, using the
// rendered first row / card as templates so the markup matches the real app.
(() => {
    const { rows, perPage } = window.KRONOS_DEMO;
    const state = { sort: '', dir: 'asc', page: 1 };

    const tbody = document.querySelector('table tbody');
    const rowTemplate = tbody.querySelector('tr').cloneNode(true);
    const cardList = document.querySelector('article').parentElement;
    const cardTemplate = cardList.querySelector('article').cloneNode(true);
    const pager = document.querySelector('[data-flux-pagination]') || document.querySelector('.\\@container');

    const ordered = () => {
        const list = [...rows]; // already newest first, like the app's default order
        if (state.sort !== 'status') return list;
        const sign = state.dir === 'desc' ? -1 : 1;
        // Same order as the app: status name, then process number newest first.
        return list.sort((a, b) =>
            sign * a.status.localeCompare(b.status) || b.code.localeCompare(a.code));
    };

    const fillRow = (r) => {
        const tr = rowTemplate.cloneNode(true);
        const cells = tr.querySelectorAll('td');
        [r.code, r.client, r.type, r.owner, r.date].forEach((v, i) => { cells[i].textContent = v ?? ''; });
        const span = document.createElement('span');
        span.className = r.statusClass;
        span.textContent = r.status ?? '';
        cells[5].replaceChildren(span);
        return tr;
    };

    const fillCard = (r) => {
        const card = cardTemplate.cloneNode(true);
        const values = [...card.children].map((field) => field.lastElementChild);
        [r.code, r.status, r.client, r.type, r.owner, r.date].forEach((v, i) => { values[i].textContent = v ?? ''; });
        values[1].className = 'font-medium ' + r.statusClass;
        return card;
    };

    const arrow = (dir) => `<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" class="size-4"><path fill-rule="evenodd" d="${dir === 'prev'
        ? 'M9.78 4.22a.75.75 0 0 1 0 1.06L7.06 8l2.72 2.72a.75.75 0 1 1-1.06 1.06L5.47 8.53a.75.75 0 0 1 0-1.06l3.25-3.25a.75.75 0 0 1 1.06 0Z'
        : 'M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z'}" clip-rule="evenodd"/></svg>`;

    const renderPager = (total) => {
        const pages = Math.ceil(total / perPage);
        const from = (state.page - 1) * perPage + 1;
        const to = Math.min(state.page * perPage, total);
        const idle = 'text-zinc-400 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-white/20 hover:text-zinc-800 dark:hover:text-white';
        const off = 'text-zinc-300 dark:text-zinc-500';
        const nav = (dir, page, disabled) => `<button type="button" data-page="${page}" ${disabled ? 'disabled' : ''}
            aria-label="${dir === 'prev' ? 'Previous page' : 'Next page'}"
            class="flex justify-center items-center size-6 rounded-[6px] ${disabled ? off : idle}">${arrow(dir)}</button>`;
        let numbers = '';
        for (let p = 1; p <= pages; p++) {
            numbers += p === state.page
                ? `<div aria-current="page" class="cursor-default flex justify-center items-center text-xs h-6 px-2 rounded-[6px] font-medium dark:text-white text-zinc-800">${p}</div>`
                : `<button type="button" data-page="${p}" class="text-xs h-6 px-2 rounded-[6px] font-medium ${idle}">${p}</button>`;
        }
        pager.innerHTML = `
            <div class="text-zinc-500 dark:text-zinc-400 text-xs font-medium whitespace-nowrap">Showing ${from} to ${to} of ${total} results</div>
            <div class="flex items-center bg-white border border-zinc-200 rounded-[8px] p-[1px] dark:bg-white/10 dark:border-white/10">
                ${nav('prev', state.page - 1, state.page === 1)}${numbers}${nav('next', state.page + 1, state.page === pages)}
            </div>`;
    };

    const sortIcon = document.querySelector('th:last-child button svg');
    const render = () => {
        const list = ordered();
        const pageRows = list.slice((state.page - 1) * perPage, state.page * perPage);
        tbody.replaceChildren(...pageRows.map(fillRow));
        cardList.replaceChildren(...pageRows.map(fillCard));
        renderPager(list.length);
        if (sortIcon) {
            sortIcon.parentElement.style.opacity = state.sort ? '1' : '';
            sortIcon.style.transform = state.dir === 'asc' ? 'rotate(180deg)' : '';
        }
    };

    // Same cycle as the app: off -> A to Z -> Z to A -> off.
    const cycleSort = () => {
        if (state.sort !== 'status') Object.assign(state, { sort: 'status', dir: 'asc' });
        else if (state.dir === 'asc') state.dir = 'desc';
        else Object.assign(state, { sort: '', dir: 'asc' });
        state.page = 1;
        render();
    };

    document.querySelector('th:last-child button')?.addEventListener('click', cycleSort);
    [...document.querySelectorAll('button')].find((b) => b.textContent.trim() === 'Sort by status')
        ?.addEventListener('click', cycleSort);
    pager.addEventListener('click', (e) => {
        const b = e.target.closest('button[data-page]');
        if (!b || b.disabled) return;
        state.page = Number(b.dataset.page);
        render();
    });

    render();
})();
