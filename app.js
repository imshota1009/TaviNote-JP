/* ===================================
   TaviNote — メインアプリケーション
   =================================== */

; (function () {
    'use strict';

    // ========== データ管理 ==========
    const STORAGE_KEY = 'tavinote_data';

    function loadData() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : { trips: [], searchMemo: '', memos: [], darkMode: false };
        } catch { return { trips: [], searchMemo: '', memos: [], darkMode: false }; }
    }

    function saveData() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
    }

    let appData = loadData();

    // ========== ユーティリティ ==========
    function $(sel) { return document.querySelector(sel); }
    function $$(sel) { return document.querySelectorAll(sel); }
    function generateId() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 8); }
    function formatDate(dateStr) {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
    }
    function daysUntil(dateStr) {
        if (!dateStr) return null;
        const now = new Date(); now.setHours(0, 0, 0, 0);
        const target = new Date(dateStr); target.setHours(0, 0, 0, 0);
        return Math.ceil((target - now) / (1000 * 60 * 60 * 24));
    }
    function showToast(msg) {
        const t = document.createElement('div');
        t.className = 'toast';
        t.textContent = msg;
        document.body.appendChild(t);
        setTimeout(() => { t.classList.add('hide'); setTimeout(() => t.remove(), 400); }, 2500);
    }

    // ========== テンプレート ==========
    const TEMPLATES = {
        domestic: [
            { text: '宿泊先を予約する', deadline: '', priority: 'high' },
            { text: '交通手段を調べる', deadline: '', priority: 'high' },
            { text: '持ち物リストを作る', deadline: '', priority: 'medium' },
            { text: '観光スポットを調べる', deadline: '', priority: 'medium' },
            { text: 'お土産リストを考える', deadline: '', priority: 'low' },
            { text: '天気予報をチェック', deadline: '', priority: 'low' },
        ],
        overseas: [
            { text: 'パスポートの有効期限を確認', deadline: '', priority: 'high' },
            { text: '航空券を予約する', deadline: '', priority: 'high' },
            { text: 'ホテルを予約する', deadline: '', priority: 'high' },
            { text: '海外旅行保険に入る', deadline: '', priority: 'high' },
            { text: '両替（現地通貨の準備）', deadline: '', priority: 'medium' },
            { text: 'Wi-Fiレンタルを手配', deadline: '', priority: 'medium' },
            { text: '持ち物リストを作る', deadline: '', priority: 'medium' },
            { text: '観光プランを考える', deadline: '', priority: 'low' },
        ],
        daytrip: [
            { text: '行き先を決める', deadline: '', priority: 'medium' },
            { text: '交通手段を調べる', deadline: '', priority: 'medium' },
            { text: 'レストランを予約する', deadline: '', priority: 'low' },
            { text: '持ち物を確認', deadline: '', priority: 'low' },
        ]
    };

    // ========== 状態管理 ==========
    let currentView = 'dashboard';
    let currentTrip = null;
    let currentTab = 'overview';
    let calendarDate = new Date();
    let scheduleDate = null;
    let editingDiaryId = null;
    let placesMap = null;
    let mapMarkers = [];

    // ========== ダークモード ==========
    function applyDarkMode() {
        document.body.classList.toggle('dark', appData.darkMode);
        const icon = $('#darkModeToggle .toggle-icon');
        if (icon) icon.textContent = appData.darkMode ? '☀️' : '🌙';
    }

    // ========== ビュー切替 ==========
    function showView(viewName) {
        currentView = viewName;
        $$('.view').forEach(v => v.classList.remove('active'));
        const target = $(`#view-${viewName}`);
        if (target) target.classList.add('active');
        $$('.sidebar-menu li').forEach(li => {
            li.classList.toggle('active', li.dataset.view === viewName);
        });
        if (viewName === 'dashboard') renderDashboard();
        if (viewName === 'memo-board') renderMemoBoard();
        if (viewName === 'search-links') loadSearchMemo();
        if (viewName === 'currency') { }
        if (viewName === 'nearby') { }
    }

    function showTripDetail(tripId) {
        currentTrip = appData.trips.find(t => t.id === tripId);
        if (!currentTrip) return;
        showView('trip-detail');
        renderTripDetail();
        switchTab('overview');
    }

    function switchTab(tab) {
        currentTab = tab;
        $$('.sub-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
        $$('.tab-content').forEach(c => c.classList.toggle('active', c.dataset.tabContent === tab));
        if (tab === 'overview') { renderOverview(); renderReminders(); }
        if (tab === 'diary') renderDiary();
        if (tab === 'places') renderPlaces();
        if (tab === 'todo') { renderTodos(); renderCalendar(); }
        if (tab === 'schedule') renderSchedule();
        if (tab === 'tickets') renderTickets();
        if (tab === 'packing') renderPacking();
        if (tab === 'money') { renderBudget(); renderExpenses(); }
        if (tab === 'vote') renderPolls();
    }

    // ========== ダッシュボード ==========
    function renderDashboard() {
        const container = $('#tripCardsContainer');
        const empty = $('#emptyState');
        if (appData.trips.length === 0) {
            container.innerHTML = '';
            empty.style.display = 'block';
            return;
        }
        empty.style.display = 'none';
        container.innerHTML = appData.trips.map(trip => {
            const days = daysUntil(trip.date);
            const todos = trip.todos || [];
            const done = todos.filter(t => t.done).length;
            const pct = todos.length > 0 ? Math.round(done / todos.length * 100) : 0;
            const treeIcon = getTreeIcon(pct);
            let countdown = '';
            if (days === null) countdown = '';
            else if (days > 0) countdown = `あと${days}日`;
            else if (days === 0) countdown = '🎉 今日！';
            else countdown = `${Math.abs(days)}日前`;
            return `
        <div class="trip-card" data-trip-id="${trip.id}">
          <span class="trip-card-tree">${treeIcon}</span>
          <div class="trip-card-title">${escHtml(trip.name)}</div>
          <div class="trip-card-date">📅 ${formatDate(trip.date)}${trip.endDate ? ' 〜 ' + formatDate(trip.endDate) : ''} ${countdown ? `・${countdown}` : ''}</div>
          ${trip.members ? `<div class="trip-card-members">👥 ${escHtml(trip.members)}</div>` : ''}
          <div class="trip-card-progress"><div class="trip-card-progress-bar" style="width:${pct}%"></div></div>
          <div style="font-size:12px;color:var(--text-muted);margin-top:6px;">${done}/${todos.length} 完了</div>
        </div>
      `;
        }).join('');
    }

    function escHtml(s) {
        if (!s) return '';
        return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    // ========== 旅行作成 ==========
    function createTrip() {
        const name = $('#inputTripName').value.trim();
        if (!name) { showToast('旅行の名前を入力してください'); return; }
        const template = $('#selectTemplate').value;
        const trip = {
            id: generateId(),
            name,
            date: $('#inputTripDate').value,
            endDate: $('#inputTripEndDate').value,
            members: $('#inputTripMembers').value.trim(),
            budget: $('#inputTripBudget').value.trim(),
            todos: [],
            places: [],
            diary: [],
            schedule: [],
            createdAt: new Date().toISOString()
        };
        // テンプレート適用
        if (template !== 'none' && TEMPLATES[template]) {
            trip.todos = TEMPLATES[template].map(t => ({
                id: generateId(),
                text: t.text,
                deadline: t.deadline,
                priority: t.priority,
                done: false
            }));
        }
        appData.trips.push(trip);
        saveData();
        closeModal('modalNewTrip');
        clearForm('modalNewTrip');
        showToast(`🗺️ 「${name}」を作成しました！`);
        renderDashboard();
    }

    // ========== 旅行詳細 ==========
    function renderTripDetail() {
        if (!currentTrip) return;
        $('#tripDetailTitle').textContent = currentTrip.name;
        const days = daysUntil(currentTrip.date);
        const badge = $('#tripCountdown');
        if (days === null) badge.textContent = '';
        else if (days > 0) badge.textContent = `🗓️ 出発まであと ${days} 日`;
        else if (days === 0) badge.textContent = '🎉 今日が出発日！';
        else badge.textContent = `✈️ ${Math.abs(days)}日前に出発`;
    }

    function renderOverview() {
        if (!currentTrip) return;
        // 木
        const todos = currentTrip.todos || [];
        const done = todos.filter(t => t.done).length;
        const pct = todos.length > 0 ? Math.round(done / todos.length * 100) : 0;
        $('#treeVisual').textContent = getTreeIcon(pct);
        $('#treeProgress').textContent = `${pct}%`;
        const messages = {
            0: 'タスクを追加して旅行準備を始めよう！',
            25: '芽が出てきた！この調子！',
            50: '順調に育ってます！半分クリア！',
            75: '花が咲きました！もう少し！',
            100: '🎉 準備完了！いってらっしゃい！'
        };
        const msgKey = pct >= 100 ? 100 : pct >= 75 ? 75 : pct >= 50 ? 50 : pct >= 25 ? 25 : 0;
        $('#treeMessage').textContent = messages[msgKey];

        // 旅行情報
        const info = $('#tripInfoContent');
        info.innerHTML = `
      <div class="info-item">
        <span class="info-item-icon">📅</span>
        <div><div class="info-item-label">日程</div><div class="info-item-value">${formatDate(currentTrip.date)}${currentTrip.endDate ? ' 〜 ' + formatDate(currentTrip.endDate) : ''}</div></div>
      </div>
      <div class="info-item">
        <span class="info-item-icon">👥</span>
        <div><div class="info-item-label">メンバー</div><div class="info-item-value">${escHtml(currentTrip.members) || '未設定'}</div></div>
      </div>
      <div class="info-item">
        <span class="info-item-icon">💰</span>
        <div><div class="info-item-label">予算</div><div class="info-item-value">${escHtml(currentTrip.budget) || '未設定'}</div></div>
      </div>
      <div class="info-item">
        <span class="info-item-icon">✅</span>
        <div><div class="info-item-label">TODO進捗</div><div class="info-item-value">${done} / ${todos.length} 完了</div></div>
      </div>
      <div class="info-item">
        <span class="info-item-icon">📍</span>
        <div><div class="info-item-label">行きたい場所</div><div class="info-item-value">${(currentTrip.places || []).length} 件</div></div>
      </div>
      <div class="info-item">
        <span class="info-item-icon">📖</span>
        <div><div class="info-item-label">日記</div><div class="info-item-value">${(currentTrip.diary || []).length} 件</div></div>
      </div>
    `;
    }

    function getTreeIcon(pct) {
        if (pct >= 100) return '🌳';
        if (pct >= 75) return '🌸';
        if (pct >= 50) return '🌲';
        if (pct >= 25) return '🌿';
        return '🌱';
    }

    // ========== 日記 ==========
    function renderDiary() {
        if (!currentTrip) return;
        const entries = (currentTrip.diary || []).sort((a, b) => b.date.localeCompare(a.date));
        const container = $('#diaryEntries');
        if (entries.length === 0) {
            container.innerHTML = '<div class="schedule-empty">📖 まだ日記がありません。<br>「日記を書く」から最初の一歩を！</div>';
            return;
        }
        container.innerHTML = entries.map(e => `
      <div class="diary-entry">
        <div class="diary-entry-date">📅 ${formatDate(e.date)}</div>
        <div class="diary-entry-title">${escHtml(e.title)}</div>
        <div class="diary-entry-content">${escHtml(e.content)}</div>
        ${e.photo ? `<img src="${e.photo}" class="diary-entry-photo" alt="写真" />` : ''}
        <div class="diary-entry-actions">
          <button class="btn btn-ghost btn-sm" onclick="TaviNote.editDiary('${e.id}')">✏️ 編集</button>
          <button class="btn btn-ghost btn-sm" onclick="TaviNote.deleteDiary('${e.id}')">🗑️ 削除</button>
        </div>
      </div>
    `).join('');
    }

    function saveDiary() {
        if (!currentTrip) return;
        const date = $('#inputDiaryDate').value;
        const title = $('#inputDiaryTitle').value.trim();
        const content = $('#inputDiaryContent').value.trim();
        if (!title) { showToast('タイトルを入力してください'); return; }
        if (!currentTrip.diary) currentTrip.diary = [];

        const photoPreview = $('#diaryPhotoPreview img');
        const photo = photoPreview ? photoPreview.src : '';

        if (editingDiaryId) {
            const entry = currentTrip.diary.find(d => d.id === editingDiaryId);
            if (entry) {
                entry.date = date; entry.title = title; entry.content = content;
                if (photo) entry.photo = photo;
            }
            editingDiaryId = null;
        } else {
            currentTrip.diary.push({
                id: generateId(), date, title, content, photo
            });
        }
        saveData();
        closeModal('modalDiary');
        clearForm('modalDiary');
        renderDiary();
        renderOverview();
        showToast('📖 日記を保存しました！');
    }

    function editDiary(id) {
        if (!currentTrip) return;
        const entry = currentTrip.diary.find(d => d.id === id);
        if (!entry) return;
        editingDiaryId = id;
        $('#inputDiaryDate').value = entry.date || '';
        $('#inputDiaryTitle').value = entry.title || '';
        $('#inputDiaryContent').value = entry.content || '';
        $('#diaryPhotoPreview').innerHTML = entry.photo ? `<img src="${entry.photo}" />` : '';
        openModal('modalDiary');
    }

    function deleteDiary(id) {
        if (!currentTrip || !confirm('この日記を削除しますか？')) return;
        currentTrip.diary = currentTrip.diary.filter(d => d.id !== id);
        saveData();
        renderDiary();
        renderOverview();
        showToast('日記を削除しました');
    }

    // ========== 場所 ==========
    function renderPlaces() {
        if (!currentTrip) return;
        const activeFilter = $('.filter-btn.active')?.dataset.category || 'all';
        const places = (currentTrip.places || []).filter(p =>
            activeFilter === 'all' || p.category === activeFilter
        );
        const container = $('#placesList');
        const categoryIcons = {
            sightseeing: '🏛️', food: '🍽️', hotel: '🏨', shopping: '🛍️', other: '📌'
        };
        if (places.length === 0) {
            container.innerHTML = '<div class="schedule-empty">📍 場所を追加してみよう！</div>';
        } else {
            container.innerHTML = places.map(p => `
        <div class="place-item" data-place-id="${p.id}" onclick="TaviNote.focusPlace('${p.id}')">
          <span class="place-item-icon">${categoryIcons[p.category] || '📌'}</span>
          <div class="place-item-info">
            <div class="place-item-name">${escHtml(p.name)}</div>
            ${p.memo ? `<div class="place-item-memo">${escHtml(p.memo)}</div>` : ''}
          </div>
          <span class="place-item-fav" onclick="event.stopPropagation();TaviNote.toggleFav('${p.id}')">${p.fav ? '⭐' : '☆'}</span>
          <span class="place-item-delete" onclick="event.stopPropagation();TaviNote.deletePlace('${p.id}')">✕</span>
        </div>
      `).join('');
        }
        renderMap();
    }

    function savePlace() {
        if (!currentTrip) return;
        const name = $('#inputPlaceName').value.trim();
        if (!name) { showToast('場所の名前を入力してください'); return; }
        if (!currentTrip.places) currentTrip.places = [];
        currentTrip.places.push({
            id: generateId(),
            name,
            category: $('#selectPlaceCategory').value,
            memo: $('#inputPlaceMemo').value.trim(),
            lat: parseFloat($('#inputPlaceLat').value) || null,
            lng: parseFloat($('#inputPlaceLng').value) || null,
            fav: false
        });
        saveData();
        closeModal('modalPlace');
        clearForm('modalPlace');
        renderPlaces();
        renderOverview();
        showToast(`📍 「${name}」を追加しました！`);
    }

    function deletePlace(id) {
        if (!currentTrip) return;
        currentTrip.places = currentTrip.places.filter(p => p.id !== id);
        saveData();
        renderPlaces();
    }

    function toggleFav(id) {
        if (!currentTrip) return;
        const p = currentTrip.places.find(p => p.id === id);
        if (p) p.fav = !p.fav;
        saveData();
        renderPlaces();
    }

    function focusPlace(id) {
        if (!currentTrip || !placesMap) return;
        const p = currentTrip.places.find(p => p.id === id);
        if (p && p.lat && p.lng) {
            placesMap.setView([p.lat, p.lng], 14);
        }
    }

    // 住所検索（Nominatim）
    async function searchAddress() {
        const addr = $('#inputPlaceAddress').value.trim();
        if (!addr) { showToast('住所を入力してください'); return; }
        try {
            const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(addr)}&limit=1`);
            const data = await res.json();
            if (data.length > 0) {
                $('#inputPlaceLat').value = data[0].lat;
                $('#inputPlaceLng').value = data[0].lon;
                showToast('📍 場所が見つかりました！');
            } else {
                showToast('場所が見つかりませんでした');
            }
        } catch {
            showToast('検索中にエラーが発生しました');
        }
    }

    // 地図
    function renderMap() {
        if (!currentTrip) return;
        const mapEl = $('#placesMap');
        if (!mapEl) return;

        if (!placesMap) {
            placesMap = L.map('placesMap').setView([36.5, 137.5], 5); // 日本の中心
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap'
            }).addTo(placesMap);
        }

        // マーカーをクリア
        mapMarkers.forEach(m => placesMap.removeLayer(m));
        mapMarkers = [];

        const places = (currentTrip.places || []).filter(p => p.lat && p.lng);
        if (places.length > 0) {
            places.forEach(p => {
                const marker = L.marker([p.lat, p.lng]).addTo(placesMap);
                marker.bindPopup(`<b>${escHtml(p.name)}</b>${p.memo ? '<br>' + escHtml(p.memo) : ''}`);
                mapMarkers.push(marker);
            });

            // ルート線
            if (places.length >= 2) {
                const line = L.polyline(places.map(p => [p.lat, p.lng]), {
                    color: '#7CB69D', weight: 3, opacity: 0.7, dashArray: '8,8'
                }).addTo(placesMap);
                mapMarkers.push(line);
            }

            // フィット
            const group = L.featureGroup(mapMarkers.filter(m => m instanceof L.Marker));
            placesMap.fitBounds(group.getBounds().pad(0.2));
        }

        // 地図リサイズ対応
        setTimeout(() => placesMap.invalidateSize(), 100);
    }

    // ========== TODO ==========
    function renderTodos() {
        if (!currentTrip) return;
        const todos = currentTrip.todos || [];
        const container = $('#todoList');
        const priorityLabels = { high: '🔴 高い', medium: '🟡 ふつう', low: '🟢 低い' };
        if (todos.length === 0) {
            container.innerHTML = '<div class="schedule-empty">✅ やることを追加してみよう！</div>';
            return;
        }
        // ソート：未完了を先、高優先度を先
        const sorted = [...todos].sort((a, b) => {
            if (a.done !== b.done) return a.done ? 1 : -1;
            const pri = { high: 0, medium: 1, low: 2 };
            return (pri[a.priority] || 1) - (pri[b.priority] || 1);
        });
        container.innerHTML = sorted.map(t => `
      <div class="todo-item ${t.done ? 'done' : ''}">
        <div class="todo-checkbox ${t.done ? 'checked' : ''}" onclick="TaviNote.toggleTodo('${t.id}')">
          ${t.done ? '✓' : ''}
        </div>
        <div class="todo-item-info">
          <div class="todo-item-text">${escHtml(t.text)}</div>
          ${t.deadline ? `<div class="todo-item-deadline">📅 ${formatDate(t.deadline)}</div>` : ''}
        </div>
        <span class="todo-priority ${t.priority}">${priorityLabels[t.priority] || ''}</span>
        <span class="todo-item-delete" onclick="TaviNote.deleteTodo('${t.id}')">✕</span>
      </div>
    `).join('');
    }

    function saveTodo() {
        if (!currentTrip) return;
        const text = $('#inputTodoText').value.trim();
        if (!text) { showToast('やることを入力してください'); return; }
        if (!currentTrip.todos) currentTrip.todos = [];
        currentTrip.todos.push({
            id: generateId(),
            text,
            deadline: $('#inputTodoDeadline').value,
            priority: $('#selectTodoPriority').value,
            done: false
        });
        saveData();
        closeModal('modalTodo');
        clearForm('modalTodo');
        renderTodos();
        renderCalendar();
        updateTreeAfterTodoChange();
        showToast('✅ やることを追加しました！');
    }

    function toggleTodo(id) {
        if (!currentTrip) return;
        const t = currentTrip.todos.find(t => t.id === id);
        if (!t) return;
        t.done = !t.done;
        saveData();
        renderTodos();
        renderCalendar();
        updateTreeAfterTodoChange();
        if (t.done) showToast('🌿 木が少し成長しました！');
    }

    function deleteTodo(id) {
        if (!currentTrip) return;
        currentTrip.todos = currentTrip.todos.filter(t => t.id !== id);
        saveData();
        renderTodos();
        renderCalendar();
        updateTreeAfterTodoChange();
    }

    function updateTreeAfterTodoChange() {
        if (currentTab === 'overview') renderOverview();
        renderTripDetail();
    }

    // ========== カレンダー ==========
    function renderCalendar() {
        if (!currentTrip) return;
        const year = calendarDate.getFullYear();
        const month = calendarDate.getMonth();
        $('#calendarTitle').textContent = `${year}年 ${month + 1}月`;

        const grid = $('#calendarGrid');
        grid.innerHTML = '';
        const dayHeaders = ['日', '月', '火', '水', '木', '金', '土'];
        dayHeaders.forEach(d => {
            const el = document.createElement('div');
            el.className = 'calendar-day-header';
            el.textContent = d;
            grid.appendChild(el);
        });

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const today = new Date(); today.setHours(0, 0, 0, 0);

        // 旅行期間
        const tripStart = currentTrip.date ? new Date(currentTrip.date) : null;
        const tripEnd = currentTrip.endDate ? new Date(currentTrip.endDate) : null;
        if (tripStart) tripStart.setHours(0, 0, 0, 0);
        if (tripEnd) tripEnd.setHours(0, 0, 0, 0);

        // TODO期限マップ
        const todoDeadlines = new Set();
        (currentTrip.todos || []).forEach(t => {
            if (t.deadline) {
                const d = new Date(t.deadline);
                const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
                todoDeadlines.add(key);
            }
        });

        // 前月パディング
        const prevDays = new Date(year, month, 0).getDate();
        for (let i = firstDay - 1; i >= 0; i--) {
            const el = document.createElement('div');
            el.className = 'calendar-day other-month';
            el.textContent = prevDays - i;
            grid.appendChild(el);
        }

        // 当月
        for (let d = 1; d <= daysInMonth; d++) {
            const el = document.createElement('div');
            el.className = 'calendar-day';
            el.textContent = d;
            const date = new Date(year, month, d);
            date.setHours(0, 0, 0, 0);
            if (date.getTime() === today.getTime()) el.classList.add('today');
            if (tripStart && tripEnd && date >= tripStart && date <= tripEnd) el.classList.add('trip-range');
            else if (tripStart && !tripEnd && date.getTime() === tripStart.getTime()) el.classList.add('trip-range');
            const key = `${year}-${month}-${d}`;
            if (todoDeadlines.has(key)) el.classList.add('has-todo');
            grid.appendChild(el);
        }

        // 残りパディング
        const totalCells = firstDay + daysInMonth;
        const remaining = (7 - totalCells % 7) % 7;
        for (let i = 1; i <= remaining; i++) {
            const el = document.createElement('div');
            el.className = 'calendar-day other-month';
            el.textContent = i;
            grid.appendChild(el);
        }
    }

    // ========== スケジュール ==========
    function renderSchedule() {
        if (!currentTrip) return;
        initScheduleDate();
        const dayStr = scheduleDate.toISOString().split('T')[0];
        $('#scheduleCurrentDay').textContent = formatDate(dayStr);

        const items = (currentTrip.schedule || []).filter(s => s.date === dayStr)
            .sort((a, b) => (a.startTime || '').localeCompare(b.startTime || ''));

        const container = $('#scheduleTimeline');
        if (items.length === 0) {
            container.innerHTML = '<div class="schedule-empty">🕐 この日の予定はまだありません。<br>「予定追加」から追加しましょう！</div>';
            return;
        }
        container.innerHTML = items.map(s => `
      <div class="schedule-item">
        <span class="schedule-time">${s.startTime || '--:--'}</span>
        <div class="schedule-item-text">${escHtml(s.text)}</div>
        ${s.memo ? `<div class="schedule-item-memo">${escHtml(s.memo)}</div>` : ''}
        ${s.endTime ? `<div class="schedule-item-memo">〜 ${s.endTime}</div>` : ''}
        <div class="schedule-item-actions">
          <span class="schedule-item-delete" onclick="TaviNote.deleteScheduleItem('${s.id}')">✕</span>
        </div>
      </div>
    `).join('');
    }

    function initScheduleDate() {
        if (!scheduleDate && currentTrip && currentTrip.date) {
            scheduleDate = new Date(currentTrip.date);
        }
        if (!scheduleDate) scheduleDate = new Date();
    }

    function saveScheduleItem() {
        if (!currentTrip) return;
        const text = $('#inputScheduleText').value.trim();
        if (!text) { showToast('予定の内容を入力してください'); return; }
        if (!currentTrip.schedule) currentTrip.schedule = [];
        initScheduleDate();
        currentTrip.schedule.push({
            id: generateId(),
            date: scheduleDate.toISOString().split('T')[0],
            text,
            startTime: $('#inputScheduleStart').value,
            endTime: $('#inputScheduleEnd').value,
            memo: $('#inputScheduleMemo').value.trim()
        });
        saveData();
        closeModal('modalSchedule');
        clearForm('modalSchedule');
        renderSchedule();
        showToast('🕐 予定を追加しました！');
    }

    function deleteScheduleItem(id) {
        if (!currentTrip) return;
        currentTrip.schedule = currentTrip.schedule.filter(s => s.id !== id);
        saveData();
        renderSchedule();
    }

    // ========== 編集・削除旅行 ==========
    function openEditTrip() {
        if (!currentTrip) return;
        $('#editTripName').value = currentTrip.name || '';
        $('#editTripDate').value = currentTrip.date || '';
        $('#editTripEndDate').value = currentTrip.endDate || '';
        $('#editTripMembers').value = currentTrip.members || '';
        $('#editTripBudget').value = currentTrip.budget || '';
        openModal('modalEditTrip');
    }

    function updateTrip() {
        if (!currentTrip) return;
        currentTrip.name = $('#editTripName').value.trim() || currentTrip.name;
        currentTrip.date = $('#editTripDate').value;
        currentTrip.endDate = $('#editTripEndDate').value;
        currentTrip.members = $('#editTripMembers').value.trim();
        currentTrip.budget = $('#editTripBudget').value.trim();
        saveData();
        closeModal('modalEditTrip');
        renderTripDetail();
        renderOverview();
        showToast('✏️ 旅行情報を更新しました！');
    }

    function deleteTrip() {
        if (!currentTrip || !confirm('この旅行を削除してもよいですか？\nすべてのデータが消えます。')) return;
        appData.trips = appData.trips.filter(t => t.id !== currentTrip.id);
        currentTrip = null;
        saveData();
        showView('dashboard');
        showToast('旅行を削除しました');
    }

    // ========== チケット管理 ==========
    const TICKET_ICONS = { train: '🚄', flight: '✈️', hotel: '🏨', event: '🎫', other: '📋' };
    function renderTickets() {
        if (!currentTrip) return;
        const tickets = currentTrip.tickets || [];
        const container = $('#ticketList');
        if (tickets.length === 0) { container.innerHTML = '<div class="schedule-empty">🎫 チケットや予約情報を追加しよう！</div>'; return; }
        container.innerHTML = tickets.map(t => `
            <div class="ticket-card">
                <div class="ticket-card-actions"><span class="ticket-card-delete" onclick="TaviNote.deleteTicket('${t.id}')">✕</span></div>
                <div class="ticket-card-type">${TICKET_ICONS[t.type] || '🎫'} ${t.type}</div>
                <div class="ticket-card-title">${escHtml(t.title)}</div>
                ${t.code ? `<div class="ticket-card-code">${escHtml(t.code)}</div>` : ''}
                ${t.date ? `<div class="ticket-card-meta">📅 ${formatDate(t.date)}</div>` : ''}
                ${t.memo ? `<div class="ticket-card-meta">${escHtml(t.memo)}</div>` : ''}
                ${t.image ? `<img class="ticket-card-image" src="${t.image}" />` : ''}
            </div>
        `).join('');
    }
    function saveTicket() {
        if (!currentTrip) return;
        const title = $('#inputTicketTitle').value.trim();
        if (!title) { showToast('タイトルを入力してください'); return; }
        if (!currentTrip.tickets) currentTrip.tickets = [];
        const preview = $('#ticketImagePreview img');
        currentTrip.tickets.push({
            id: generateId(), type: $('#selectTicketType').value, title,
            code: $('#inputTicketCode').value.trim(), date: $('#inputTicketDate').value,
            memo: $('#inputTicketMemo').value.trim(), image: preview ? preview.src : ''
        });
        saveData(); closeModal('modalTicket'); clearForm('modalTicket');
        renderTickets(); showToast('🎫 チケットを保存しました！');
    }
    function deleteTicket(id) {
        if (!currentTrip) return;
        currentTrip.tickets = (currentTrip.tickets || []).filter(t => t.id !== id);
        saveData(); renderTickets();
    }
    function handleTicketImage(e) {
        const file = e.target.files[0]; if (!file) return;
        const reader = new FileReader();
        reader.onload = ev => { $('#ticketImagePreview').innerHTML = `<img src="${ev.target.result}" style="max-width:200px;margin-top:8px;border-radius:8px;" />`; };
        reader.readAsDataURL(file);
    }

    // ========== 持ち物チェックリスト ==========
    const PACKING_TEMPLATES = {
        domestic: [
            { name: '財布', cat: '貴重品' }, { name: '携帯電話', cat: '貴重品' }, { name: '充電器', cat: '電子機器' },
            { name: '着替え', cat: '衣類' }, { name: '下着', cat: '衣類' }, { name: 'パジャマ', cat: '衣類' },
            { name: '歯ブラシ', cat: '洗面用具' }, { name: 'タオル', cat: '洗面用具' },
            { name: '常備薬', cat: '薬' }, { name: 'エコバッグ', cat: 'その他' }
        ],
        overseas: [
            { name: 'パスポート', cat: '貴重品' }, { name: '航空券', cat: '貴重品' }, { name: '財布・クレジットカード', cat: '貴重品' },
            { name: '携帯電話', cat: '貴重品' }, { name: '海外保険証', cat: '貴重品' },
            { name: '充電器', cat: '電子機器' }, { name: '変換プラグ', cat: '電子機器' }, { name: 'Wi-Fiルーター', cat: '電子機器' },
            { name: '着替え', cat: '衣類' }, { name: '下着', cat: '衣類' }, { name: 'パジャマ', cat: '衣類' },
            { name: '歯ブラシ', cat: '洗面用具' }, { name: 'シャンプー', cat: '洗面用具' },
            { name: '常備薬', cat: '薬' }, { name: '胃薬', cat: '薬' },
            { name: '現地通貨', cat: 'その他' }, { name: 'ガイドブック', cat: 'その他' }
        ],
        daytrip: [
            { name: '財布', cat: '貴重品' }, { name: '携帯電話', cat: '貴重品' },
            { name: 'モバイルバッテリー', cat: '電子機器' },
            { name: '飲み物', cat: 'その他' }, { name: '雨具', cat: 'その他' }
        ],
        camp: [
            { name: 'テント', cat: 'その他' }, { name: '寝袋', cat: 'その他' }, { name: 'マット', cat: 'その他' },
            { name: 'ランタン', cat: '電子機器' }, { name: 'バーナー・コンロ', cat: 'その他' },
            { name: 'クッカーセット', cat: 'その他' }, { name: '食材・飲料', cat: 'その他' },
            { name: '着替え', cat: '衣類' }, { name: '防寒着', cat: '衣類' },
            { name: '歯ブラシ', cat: '洗面用具' }, { name: '虛虫よけ', cat: '薬' }, { name: '救急セット', cat: '薬' }
        ]
    };
    function renderPacking() {
        if (!currentTrip) return;
        const items = currentTrip.packing || [];
        const container = $('#packingList');
        const progress = $('#packingProgress');
        const checked = items.filter(i => i.checked).length;
        const pct = items.length > 0 ? Math.round(checked / items.length * 100) : 0;
        progress.innerHTML = items.length > 0 ? `<div class="packing-progress-bar" style="width:${pct}%"></div><span class="packing-progress-text">${checked}/${items.length} (${pct}%)</span>` : '';
        if (items.length === 0) { container.innerHTML = '<div class="schedule-empty">👜 テンプレートを選んで持ち物を追加しよう！</div>'; return; }
        const grouped = {};
        items.forEach(i => { if (!grouped[i.category]) grouped[i.category] = []; grouped[i.category].push(i); });
        let html = '';
        Object.keys(grouped).forEach(cat => {
            html += `<div class="packing-category">${cat}</div>`;
            grouped[cat].forEach(i => {
                html += `
                <div class="packing-item ${i.checked ? 'checked' : ''}">
                    <div class="todo-checkbox ${i.checked ? 'checked' : ''}" onclick="TaviNote.togglePacking('${i.id}')">${i.checked ? '✓' : ''}</div>
                    <span class="packing-item-text">${escHtml(i.name)}</span>
                    <span class="packing-item-delete" onclick="TaviNote.deletePacking('${i.id}')">✕</span>
                </div>`;
            });
        });
        container.innerHTML = html;
    }
    function applyPackingTemplate() {
        if (!currentTrip) return;
        const key = $('#selectPackingTemplate').value;
        if (!key || !PACKING_TEMPLATES[key]) { showToast('テンプレートを選んでください'); return; }
        if (!currentTrip.packing) currentTrip.packing = [];
        PACKING_TEMPLATES[key].forEach(t => {
            if (!currentTrip.packing.some(p => p.name === t.name)) {
                currentTrip.packing.push({ id: generateId(), name: t.name, category: t.cat, checked: false });
            }
        });
        saveData(); renderPacking(); showToast('👜 テンプレートを適用しました！');
    }
    function savePackingItem() {
        if (!currentTrip) return;
        const name = $('#inputPackingItem').value.trim();
        if (!name) { showToast('アイテム名を入力してください'); return; }
        if (!currentTrip.packing) currentTrip.packing = [];
        currentTrip.packing.push({ id: generateId(), name, category: $('#selectPackingCategory').value, checked: false });
        saveData(); closeModal('modalPackingItem'); clearForm('modalPackingItem');
        renderPacking(); showToast('👜 持ち物を追加しました！');
    }
    function togglePacking(id) {
        if (!currentTrip) return;
        const item = (currentTrip.packing || []).find(i => i.id === id);
        if (item) item.checked = !item.checked;
        saveData(); renderPacking();
    }
    function deletePacking(id) {
        if (!currentTrip) return;
        currentTrip.packing = (currentTrip.packing || []).filter(i => i.id !== id);
        saveData(); renderPacking();
    }

    // ========== お金管理（予算＋割り勘） ==========
    const EXPENSE_ICONS = { transport: '🚄', food: '🍽️', hotel: '🏨', shopping: '🛍️', ticket: '🎫', other: '📦' };
    function renderBudget() {
        if (!currentTrip) return;
        const expenses = currentTrip.expenses || [];
        const cats = {};
        expenses.forEach(e => { cats[e.category] = (cats[e.category] || 0) + (e.amount || 0); });
        const total = expenses.reduce((s, e) => s + (e.amount || 0), 0);
        const budget = parseInt(currentTrip.budget) || 0;
        const members = currentTrip.members ? currentTrip.members.split(/[,、]/).map(m => m.trim()).filter(Boolean) : [];
        const perPerson = members.length > 0 ? Math.round(total / members.length) : total;
        let html = '';
        if (budget > 0) html += `<div class="budget-item"><div class="budget-item-label">予算</div><div class="budget-item-value">¥${budget.toLocaleString()}</div></div>`;
        html += `<div class="budget-item"><div class="budget-item-label">合計支出</div><div class="budget-item-value total">¥${total.toLocaleString()}</div></div>`;
        if (budget > 0) html += `<div class="budget-item"><div class="budget-item-label">残り</div><div class="budget-item-value" style="color:${total > budget ? 'var(--red)' : 'var(--accent)'}">¥${(budget - total).toLocaleString()}</div></div>`;
        if (members.length > 0) html += `<div class="budget-item"><div class="budget-item-label">1人あたり</div><div class="budget-item-value">¥${perPerson.toLocaleString()}</div></div>`;
        Object.keys(cats).forEach(c => {
            html += `<div class="budget-item"><div class="budget-item-label">${EXPENSE_ICONS[c] || ''} ${c}</div><div class="budget-item-value">¥${cats[c].toLocaleString()}</div></div>`;
        });
        $('#budgetSummary').innerHTML = html || '<div style="color:var(--text-muted)">支出を記録すると自動計算されます</div>';
    }
    function renderExpenses() {
        if (!currentTrip) return;
        const expenses = (currentTrip.expenses || []).sort((a, b) => (b.date || '').localeCompare(a.date || ''));
        const container = $('#expenseList');
        if (expenses.length === 0) { container.innerHTML = '<div class="schedule-empty">💰 支出を記録してみよう！</div>'; } else {
            container.innerHTML = expenses.map(e => `
                <div class="expense-item">
                    <span class="expense-item-icon">${EXPENSE_ICONS[e.category] || '📦'}</span>
                    <div class="expense-item-info">
                        <div class="expense-item-title">${escHtml(e.title)}</div>
                        <div class="expense-item-meta">${e.date ? formatDate(e.date) : ''}${e.payer ? ' ・ ' + escHtml(e.payer) + 'が払い' : ''}</div>
                    </div>
                    <span class="expense-item-amount">¥${(e.amount || 0).toLocaleString()}</span>
                    <span class="expense-item-delete" onclick="TaviNote.deleteExpense('${e.id}')">✕</span>
                </div>
            `).join('');
        }
        renderSplitResult();
    }
    function renderSplitResult() {
        if (!currentTrip) return;
        const expenses = currentTrip.expenses || [];
        const members = currentTrip.members ? currentTrip.members.split(/[,、]/).map(m => m.trim()).filter(Boolean) : [];
        const container = $('#splitResult');
        if (members.length < 2 || expenses.length === 0) { container.innerHTML = ''; return; }
        const total = expenses.reduce((s, e) => s + (e.amount || 0), 0);
        const perPerson = Math.round(total / members.length);
        const paid = {};
        members.forEach(m => paid[m] = 0);
        expenses.forEach(e => { if (e.payer && paid[e.payer] !== undefined) paid[e.payer] += (e.amount || 0); });
        let html = '<h4>💸 割り勘ん結果</h4>';
        html += `<div class="split-row"><span>1人あたり</span><span>¥${perPerson.toLocaleString()}</span></div>`;
        members.forEach(m => {
            const diff = (paid[m] || 0) - perPerson;
            if (diff > 0) html += `<div class="split-row receives"><span>${escHtml(m)}</span><span>+¥${diff.toLocaleString()} 受け取り</span></div>`;
            else if (diff < 0) html += `<div class="split-row owes"><span>${escHtml(m)}</span><span>-¥${Math.abs(diff).toLocaleString()} 支払い</span></div>`;
            else html += `<div class="split-row"><span>${escHtml(m)}</span><span>±0</span></div>`;
        });
        container.innerHTML = html;
    }
    function saveExpense() {
        if (!currentTrip) return;
        const title = $('#inputExpenseTitle').value.trim();
        const amount = parseInt($('#inputExpenseAmount').value) || 0;
        if (!title) { showToast('何に使ったか入力してください'); return; }
        if (!currentTrip.expenses) currentTrip.expenses = [];
        currentTrip.expenses.push({
            id: generateId(), title, amount, category: $('#selectExpenseCategory').value,
            payer: $('#inputExpensePayer').value.trim(), date: $('#inputExpenseDate').value
        });
        saveData(); closeModal('modalExpense'); clearForm('modalExpense');
        renderBudget(); renderExpenses(); showToast('💰 支出を記録しました！');
    }
    function deleteExpense(id) {
        if (!currentTrip) return;
        currentTrip.expenses = (currentTrip.expenses || []).filter(e => e.id !== id);
        saveData(); renderBudget(); renderExpenses();
    }

    // ========== 投票 ==========
    function renderPolls() {
        if (!currentTrip) return;
        const polls = currentTrip.polls || [];
        const container = $('#pollList');
        if (polls.length === 0) { container.innerHTML = '<div class="schedule-empty">🗳️ 投票を作ってみんなの意見を聞こう！</div>'; return; }
        container.innerHTML = polls.map(poll => {
            const totalVotes = poll.options.reduce((s, o) => s + o.votes, 0);
            return `
            <div class="poll-card">
                <div class="poll-question">${escHtml(poll.question)}</div>
                ${poll.options.map((opt, i) => {
                const pct = totalVotes > 0 ? Math.round(opt.votes / totalVotes * 100) : 0;
                return `
                    <div class="poll-option" onclick="TaviNote.votePoll('${poll.id}', ${i})">
                        <span class="poll-option-label">${escHtml(opt.text)}</span>
                        <div class="poll-option-bar"><div class="poll-option-fill" style="width:${pct}%"></div></div>
                        <span class="poll-option-votes">${opt.votes}票</span>
                    </div>`;
            }).join('')}
                <div class="poll-card-actions"><span class="poll-delete" onclick="TaviNote.deletePoll('${poll.id}')">🗑️ 削除</span></div>
            </div>`;
        }).join('');
    }
    function savePoll() {
        if (!currentTrip) return;
        const question = $('#inputPollQuestion').value.trim();
        const optionsText = $('#inputPollOptions').value.trim();
        if (!question || !optionsText) { showToast('質問と選択肢を入力してください'); return; }
        const options = optionsText.split('\n').map(t => t.trim()).filter(Boolean).map(t => ({ text: t, votes: 0 }));
        if (!currentTrip.polls) currentTrip.polls = [];
        currentTrip.polls.push({ id: generateId(), question, options });
        saveData(); closeModal('modalPoll'); clearForm('modalPoll');
        renderPolls(); showToast('🗳️ 投票を作成しました！');
    }
    function votePoll(pollId, optIndex) {
        if (!currentTrip) return;
        const poll = (currentTrip.polls || []).find(p => p.id === pollId);
        if (poll && poll.options[optIndex]) { poll.options[optIndex].votes++; saveData(); renderPolls(); }
    }
    function deletePoll(id) {
        if (!currentTrip) return;
        currentTrip.polls = (currentTrip.polls || []).filter(p => p.id !== id);
        saveData(); renderPolls();
    }

    // ========== リマインダー ==========
    function renderReminders() {
        if (!currentTrip) return;
        const reminders = (currentTrip.reminders || []).sort((a, b) => (a.date || '').localeCompare(b.date || ''));
        const container = $('#reminderList');
        if (reminders.length === 0) { container.innerHTML = '<div style="color:var(--text-muted);font-size:13px;">⏰ リマインダーを追加して忘れもの防止！</div>'; return; }
        const today = new Date().toISOString().split('T')[0];
        container.innerHTML = reminders.map(r => {
            const cls = r.date < today ? 'overdue' : r.date <= today ? '' : daysUntil(r.date) <= 3 ? 'upcoming' : '';
            return `
            <div class="reminder-item ${cls}">
                <span class="reminder-date">📅 ${r.date ? formatDate(r.date) : ''}</span>
                <span class="reminder-text">${escHtml(r.text)}</span>
                <span class="reminder-item-delete" onclick="TaviNote.deleteReminder('${r.id}')">✕</span>
            </div>`;
        }).join('');
    }
    function saveReminder() {
        if (!currentTrip) return;
        const text = $('#inputReminderText').value.trim();
        if (!text) { showToast('内容を入力してください'); return; }
        if (!currentTrip.reminders) currentTrip.reminders = [];
        currentTrip.reminders.push({ id: generateId(), text, date: $('#inputReminderDate').value });
        saveData(); closeModal('modalReminder'); clearForm('modalReminder');
        renderReminders(); showToast('⏰ リマインダーを追加しました！');
    }
    function deleteReminder(id) {
        if (!currentTrip) return;
        currentTrip.reminders = (currentTrip.reminders || []).filter(r => r.id !== id);
        saveData(); renderReminders();
    }

    // ========== 外貨計算機 ==========
    function convertCurrency() {
        const amount = parseFloat($('#currencyAmount').value) || 0;
        const rate = parseFloat($('#currencyRate').value) || 0;
        if (rate === 0) { showToast('レートを入力してください'); return; }
        const result = amount * rate;
        const from = $('#currencyFrom').value;
        const to = $('#currencyTo').value;
        $('#currencyResult').innerHTML = `
            <div class="currency-result-value">${result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${to}</div>
            <div class="currency-result-detail">${amount.toLocaleString()} ${from} × ${rate} = ${result.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${to}</div>
        `;
    }
    async function fetchExchangeRate() {
        const from = $('#currencyFrom').value;
        const to = $('#currencyTo').value;
        try {
            showToast('🌐 レートを取得中...');
            const res = await fetch(`https://open.er-api.com/v6/latest/${from}`);
            const data = await res.json();
            if (data.rates && data.rates[to]) {
                $('#currencyRate').value = data.rates[to];
                showToast(`✅ 1 ${from} = ${data.rates[to]} ${to}`);
                convertCurrency();
            } else { showToast('レートが見つかりませんでした'); }
        } catch { showToast('レートの取得に失敗しました'); }
    }

    // ========== 周辺検索 ==========
    let nearbyMap = null;
    let nearbyMarkers = [];
    let userLat = null, userLng = null;
    const NEARBY_TAGS = {
        convenience: '["shop"="convenience"]', station: '["railway"="station"]',
        restaurant: '["amenity"="restaurant"]', cafe: '["amenity"="cafe"]',
        hospital: '["amenity"="hospital"]', atm: '["amenity"="atm"]',
        toilet: '["amenity"="toilets"]'
    };
    function getLocation() {
        if (!navigator.geolocation) { showToast('GPSが使えません'); return; }
        $('#nearbyStatus').textContent = '取得中...';
        navigator.geolocation.getCurrentPosition(pos => {
            userLat = pos.coords.latitude; userLng = pos.coords.longitude;
            $('#nearbyStatus').textContent = `✅ 取得成功 (${userLat.toFixed(4)}, ${userLng.toFixed(4)})`;
            if (!nearbyMap) {
                nearbyMap = L.map('nearbyMap').setView([userLat, userLng], 15);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap' }).addTo(nearbyMap);
            } else { nearbyMap.setView([userLat, userLng], 15); }
            L.marker([userLat, userLng]).addTo(nearbyMap).bindPopup('📍 現在地').openPopup();
            searchNearby();
        }, () => { $('#nearbyStatus').textContent = '❌ 位置情報を取得できませんでした'; showToast('位置情報の取得に失敗しました'); });
    }
    async function searchNearby() {
        if (!userLat || !userLng) { showToast('まず現在地を取得してください'); return; }
        const active = document.querySelector('[data-nearby].active');
        const cat = active ? active.dataset.nearby : 'convenience';
        const tag = NEARBY_TAGS[cat] || NEARBY_TAGS.convenience;
        const radius = 1000;
        const query = `[out:json];node${tag}(around:${radius},${userLat},${userLng});out body 20;`;
        try {
            const res = await fetch('https://overpass-api.de/api/interpreter', { method: 'POST', body: 'data=' + encodeURIComponent(query) });
            const data = await res.json();
            nearbyMarkers.forEach(m => nearbyMap.removeLayer(m)); nearbyMarkers = [];
            const results = $('#nearbyResults');
            if (data.elements.length === 0) { results.innerHTML = '<div style="color:var(--text-muted);text-align:center;padding:20px;">近くに見つかりませんでした</div>'; return; }
            results.innerHTML = data.elements.map(el => {
                const name = el.tags?.name || '名称不明';
                const dist = Math.round(calcDistance(userLat, userLng, el.lat, el.lon));
                const marker = L.marker([el.lat, el.lon]).addTo(nearbyMap).bindPopup(name);
                nearbyMarkers.push(marker);
                return `<div class="nearby-item"><span class="nearby-item-icon">${active?.textContent?.trim().charAt(0) || '📍'}</span><div class="nearby-item-info"><div class="nearby-item-name">${escHtml(name)}</div><div class="nearby-item-distance">約${dist}m</div></div></div>`;
            }).join('');
            showToast(`📍 ${data.elements.length}件見つかりました！`);
        } catch { showToast('検索中にエラーが発生しました'); }
    }
    function calcDistance(lat1, lon1, lat2, lon2) {
        const R = 6371000;
        const dLat = (lat2 - lat1) * Math.PI / 180; const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    }

    // ========== 旅のしおり ==========
    function exportShiori() {
        if (!currentTrip) return;
        const t = currentTrip;
        const schedule = (t.schedule || []).sort((a, b) => (a.date || '').localeCompare(b.date || '') || (a.startTime || '').localeCompare(b.startTime || ''));
        const places = t.places || [];
        let html = `<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><title>旅のしおり - ${escHtml(t.name)}</title>
        <style>body{font-family:sans-serif;max-width:700px;margin:0 auto;padding:24px;color:#333;}
        h1{text-align:center;color:#7CB69D;border-bottom:3px solid #7CB69D;padding-bottom:12px;}
        h2{color:#7CB69D;margin-top:24px;} .info{background:#f5f5f5;padding:16px;border-radius:8px;margin:12px 0;}
        .item{padding:8px 0;border-bottom:1px dashed #ddd;} @media print{body{padding:0;}}</style></head><body>
        <h1>🗺️ ${escHtml(t.name)}</h1>
        <div class="info">✈️ <b>日程:</b> ${formatDate(t.date)}${t.endDate ? ' 〜 ' + formatDate(t.endDate) : ''}<br>
        👥 <b>メンバー:</b> ${escHtml(t.members) || '未設定'}<br>
        💰 <b>予算:</b> ${escHtml(t.budget) || '未設定'}</div>`;
        if (places.length > 0) {
            html += '<h2>📍 行きたい場所</h2>';
            places.forEach(p => { html += `<div class="item">${escHtml(p.name)}${p.memo ? ' - ' + escHtml(p.memo) : ''}</div>`; });
        }
        if (schedule.length > 0) {
            html += '<h2>📅 スケジュール</h2>';
            let curDate = '';
            schedule.forEach(s => {
                if (s.date !== curDate) { curDate = s.date; html += `<h3>${formatDate(s.date)}</h3>`; }
                html += `<div class="item">${s.startTime || '--:--'} ${escHtml(s.text)}${s.memo ? ' (' + escHtml(s.memo) + ')' : ''}</div>`;
            });
        }
        html += '</body></html>';
        const w = window.open('', '_blank');
        w.document.write(html); w.document.close();
        showToast('📄 しおりを作成しました！印刷してお使いください');
    }

    // ========== メモボード ==========
    function renderMemoBoard() {
        if (!appData.memos) appData.memos = [];
        const container = $('#memoNotes');
        const empty = $('#memoBoardEmpty');
        if (appData.memos.length === 0) {
            container.innerHTML = '';
            empty.style.display = 'block';
            return;
        }
        empty.style.display = 'none';
        container.innerHTML = appData.memos.map((memo, index) => {
            const tiltClass = `tilt-${(index % 6) + 1}`;
            const delay = index * 0.08;
            const dateStr = memo.createdAt ? new Date(memo.createdAt).toLocaleDateString('ja-JP') : '';
            return `
            <div class="memo-note color-${memo.color || 'yellow'} ${tiltClass}" style="animation-delay:${delay}s;">
                <button class="memo-note-delete" onclick="TaviNote.deleteMemo('${memo.id}')">✕</button>
                ${escHtml(memo.text).replace(/\n/g, '<br>')}
                <div class="memo-note-date">${dateStr}</div>
            </div>
            `;
        }).join('');
    }

    function saveMemo() {
        const text = $('#inputMemoText').value.trim();
        if (!text) { showToast('メモの内容を入力してください'); return; }
        if (!appData.memos) appData.memos = [];
        const colorEl = document.querySelector('input[name="memoColor"]:checked');
        const color = colorEl ? colorEl.value : 'yellow';
        appData.memos.push({
            id: generateId(),
            text,
            color,
            createdAt: new Date().toISOString()
        });
        saveData();
        closeModal('modalMemo');
        clearForm('modalMemo');
        renderMemoBoard();
        showToast('📌 メモをボードに貼りました！');
    }

    function deleteMemo(id) {
        if (!appData.memos) return;
        appData.memos = appData.memos.filter(m => m.id !== id);
        saveData();
        renderMemoBoard();
        showToast('メモを外しました');
    }

    // ========== 検索メモ ==========
    function loadSearchMemo() {
        $('#searchMemo').value = appData.searchMemo || '';
    }

    function saveSearchMemo() {
        appData.searchMemo = $('#searchMemo').value;
        saveData();
        showToast('🗒️ メモを保存しました！');
    }

    // ========== モーダル共通 ==========
    function openModal(id) { $(`#${id}`).classList.add('show'); }
    function closeModal(id) { $(`#${id}`).classList.remove('show'); }
    function clearForm(modalId) {
        $(`#${modalId}`).querySelectorAll('input, textarea, select').forEach(el => {
            if (el.type === 'select-one') el.selectedIndex = 0;
            else el.value = '';
        });
        const preview = $(`#${modalId} .photo-preview`);
        if (preview) preview.innerHTML = '';
    }

    // ========== 写真プレビュー ==========
    function handlePhotoUpload(e) {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function (ev) {
            $('#diaryPhotoPreview').innerHTML = `<img src="${ev.target.result}" />`;
        };
        reader.readAsDataURL(file);
    }

    // ========== イベントリスナー ==========
    function init() {
        applyDarkMode();

        // ダークモード
        $('#darkModeToggle').addEventListener('click', () => {
            appData.darkMode = !appData.darkMode;
            saveData();
            applyDarkMode();
        });

        // サイドバーメニュー
        $$('.sidebar-menu li').forEach(li => {
            li.addEventListener('click', () => {
                const view = li.dataset.view;
                if (view === 'dashboard' || view === 'search-links' || view === 'memo-board' || view === 'currency' || view === 'nearby') {
                    currentTrip = null;
                    showView(view);
                }
            });
        });

        // 新規旅行
        $('#btnNewTrip').addEventListener('click', () => openModal('modalNewTrip'));
        $('#btnCreateTrip').addEventListener('click', createTrip);

        // 旅行カードクリック
        $('#tripCardsContainer').addEventListener('click', (e) => {
            const card = e.target.closest('.trip-card');
            if (card) showTripDetail(card.dataset.tripId);
        });

        // 戻る
        $('#btnBackToDashboard').addEventListener('click', () => {
            currentTrip = null;
            placesMap = null;
            mapMarkers = [];
            showView('dashboard');
        });

        // サブタブ
        $$('.sub-tab').forEach(tab => {
            tab.addEventListener('click', () => switchTab(tab.dataset.tab));
        });

        // 編集・削除
        $('#btnEditTrip').addEventListener('click', openEditTrip);
        $('#btnUpdateTrip').addEventListener('click', updateTrip);
        $('#btnDeleteTrip').addEventListener('click', deleteTrip);

        // 日記
        $('#btnNewDiary').addEventListener('click', () => {
            editingDiaryId = null;
            clearForm('modalDiary');
            const today = new Date().toISOString().split('T')[0];
            $('#inputDiaryDate').value = today;
            openModal('modalDiary');
        });
        $('#btnSaveDiary').addEventListener('click', saveDiary);
        $('#inputDiaryPhoto').addEventListener('change', handlePhotoUpload);

        // 場所
        $('#btnNewPlace').addEventListener('click', () => { clearForm('modalPlace'); openModal('modalPlace'); });
        $('#btnSavePlace').addEventListener('click', savePlace);
        $('#btnSearchAddress').addEventListener('click', searchAddress);
        $$('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                $$('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                renderPlaces();
            });
        });

        // TODO
        $('#btnNewTodo').addEventListener('click', () => { clearForm('modalTodo'); openModal('modalTodo'); });
        $('#btnSaveTodo').addEventListener('click', saveTodo);

        // カレンダー
        $('#calendarPrev').addEventListener('click', () => {
            calendarDate.setMonth(calendarDate.getMonth() - 1);
            renderCalendar();
        });
        $('#calendarNext').addEventListener('click', () => {
            calendarDate.setMonth(calendarDate.getMonth() + 1);
            renderCalendar();
        });

        // スケジュール
        $('#btnNewScheduleItem').addEventListener('click', () => { clearForm('modalSchedule'); openModal('modalSchedule'); });
        $('#btnSaveSchedule').addEventListener('click', saveScheduleItem);
        $('#schedulePrevDay').addEventListener('click', () => {
            initScheduleDate();
            scheduleDate.setDate(scheduleDate.getDate() - 1);
            renderSchedule();
        });
        $('#scheduleNextDay').addEventListener('click', () => {
            initScheduleDate();
            scheduleDate.setDate(scheduleDate.getDate() + 1);
            renderSchedule();
        });

        // メモボード
        $('#btnNewMemo').addEventListener('click', () => { clearForm('modalMemo'); openModal('modalMemo'); });
        $('#btnSaveMemo').addEventListener('click', saveMemo);

        // チケット
        $('#btnNewTicket').addEventListener('click', () => { clearForm('modalTicket'); openModal('modalTicket'); });
        $('#btnSaveTicket').addEventListener('click', saveTicket);
        $('#inputTicketImage').addEventListener('change', handleTicketImage);

        // 持ち物
        $('#btnNewPackingItem').addEventListener('click', () => { clearForm('modalPackingItem'); openModal('modalPackingItem'); });
        $('#btnSavePackingItem').addEventListener('click', savePackingItem);
        $('#btnApplyPackingTemplate').addEventListener('click', applyPackingTemplate);

        // お金
        $('#btnNewExpense').addEventListener('click', () => {
            clearForm('modalExpense');
            $('#inputExpenseDate').value = new Date().toISOString().split('T')[0];
            openModal('modalExpense');
        });
        $('#btnSaveExpense').addEventListener('click', saveExpense);

        // 投票
        $('#btnNewPoll').addEventListener('click', () => { clearForm('modalPoll'); openModal('modalPoll'); });
        $('#btnSavePoll').addEventListener('click', savePoll);

        // リマインダー
        $('#btnNewReminder').addEventListener('click', () => { clearForm('modalReminder'); openModal('modalReminder'); });
        $('#btnSaveReminder').addEventListener('click', saveReminder);

        // しおり
        $('#btnExportShiori').addEventListener('click', exportShiori);

        // 外貨計算機
        $('#btnConvertCurrency').addEventListener('click', convertCurrency);
        $('#btnFetchRate').addEventListener('click', fetchExchangeRate);

        // 周辺検索
        $('#btnGetLocation').addEventListener('click', getLocation);
        $$('[data-nearby]').forEach(btn => {
            btn.addEventListener('click', () => {
                $$('[data-nearby]').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                if (userLat && userLng) searchNearby();
            });
        });

        // 検索メモ
        $('#btnSaveSearchMemo').addEventListener('click', saveSearchMemo);

        // モーダル閉じる
        $$('.modal-close, [data-close]').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.close || btn.closest('.modal-overlay')?.id;
                if (id) closeModal(id);
            });
        });
        $$('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) closeModal(overlay.id);
            });
        });

        // 初期表示
        showView('dashboard');
    }

    // ========== グローバル公開 ==========
    window.TaviNote = {
        toggleTodo, deleteTodo,
        editDiary, deleteDiary,
        toggleFav, deletePlace, focusPlace,
        deleteScheduleItem,
        deleteMemo,
        deleteTicket,
        togglePacking, deletePacking,
        deleteExpense,
        votePoll, deletePoll,
        deleteReminder
    };

    // 起動
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
