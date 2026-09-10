/**
 * TaskFlow — Modern Task & Schedule Manager
 * Logic, State Management, and Interactivity
 */

(() => {
  'use strict';

  // --- Storage Keys ---
  const STORAGE_TASKS_KEY = 'taskflow_tasks';
  const STORAGE_LISTS_KEY = 'taskflow_lists';
  const STORAGE_THEME_KEY = 'taskflow_theme';

  // --- Preset Color & Icon Palettes ---
  const COLOR_PALETTE = [
    '#6366f1', // Indigo
    '#3b82f6', // Blue
    '#06b6d4', // Cyan
    '#10b981', // Emerald
    '#f59e0b', // Amber
    '#f43f5e', // Rose
    '#a855f7', // Purple
    '#ec4899', // Pink
  ];

  const ICON_PALETTE = [
    { id: 'folder', svg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>' },
    { id: 'briefcase', svg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>' },
    { id: 'user', svg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>' },
    { id: 'book', svg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>' },
    { id: 'shopping-cart', svg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>' },
    { id: 'code', svg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>' },
    { id: 'heart', svg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>' },
    { id: 'zap', svg: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>' }
  ];

  // Helper to format local date YYYY-MM-DD
  function getLocalDateString(offsetDays = 0) {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // --- Initial Default Sample Data ---
  const DEFAULT_LISTS = [
    { id: 'list-work', name: 'Work & Projects', color: '#6366f1', icon: 'briefcase' },
    { id: 'list-personal', name: 'Personal & Health', color: '#10b981', icon: 'heart' },
    { id: 'list-study', name: 'Study & Learning', color: '#a855f7', icon: 'book' },
    { id: 'list-shopping', name: 'Shopping & Errands', color: '#f59e0b', icon: 'shopping-cart' }
  ];

  const DEFAULT_TASKS = [
    {
      id: 'task-1',
      title: 'Complete SkillCraft Web Development Task 4',
      description: 'Finish the To-Do web app with sleek dark/light theme, custom lists, and date/time tracking.',
      listId: 'list-work',
      priority: 'urgent',
      dueDate: getLocalDateString(0),
      dueTime: '17:00',
      completed: false,
      starred: true,
      createdAt: Date.now() - 3600000 * 5
    },
    {
      id: 'task-2',
      title: 'Review team pull requests & API documentation',
      description: 'Check code reviews on GitHub and ensure documentation matches the latest schema.',
      listId: 'list-work',
      priority: 'high',
      dueDate: getLocalDateString(0),
      dueTime: '14:30',
      completed: false,
      starred: false,
      createdAt: Date.now() - 3600000 * 3
    },
    {
      id: 'task-3',
      title: 'Evening 5K Run & Stretching session',
      description: 'Maintain cardiovascular health and stretch for 15 minutes after the workout.',
      listId: 'list-personal',
      priority: 'medium',
      dueDate: getLocalDateString(1),
      dueTime: '18:30',
      completed: false,
      starred: false,
      createdAt: Date.now() - 3600000 * 2
    },
    {
      id: 'task-4',
      title: 'Prepare grocery shopping list',
      description: 'Fresh fruits (apples, berries), Greek yogurt, almond milk, oats, and green tea.',
      listId: 'list-shopping',
      priority: 'low',
      dueDate: getLocalDateString(2),
      dueTime: '11:00',
      completed: false,
      starred: false,
      createdAt: Date.now() - 3600000 * 1
    },
    {
      id: 'task-5',
      title: 'Submit quarterly budget report',
      description: 'Review departmental expenditures and send finalize invoice summary.',
      listId: 'list-work',
      priority: 'urgent',
      dueDate: getLocalDateString(-1), // overdue
      dueTime: '16:00',
      completed: false,
      starred: true,
      createdAt: Date.now() - 3600000 * 24
    },
    {
      id: 'task-6',
      title: 'Setup GitHub repository & project structure',
      description: 'Initialize files, set up semantic HTML layout, CSS custom properties, and Git commits.',
      listId: 'list-study',
      priority: 'medium',
      dueDate: getLocalDateString(-2),
      dueTime: '12:00',
      completed: true,
      starred: false,
      createdAt: Date.now() - 3600000 * 48
    }
  ];

  // --- Application State ---
  const state = {
    tasks: [],
    lists: [],
    currentView: 'all', // 'all', 'today', 'upcoming', 'starred', 'completed', or listId
    searchQuery: '',
    sortBy: 'dueDate',
    filterPriority: 'all',
    deletedTaskBuffer: null,
    undoTimeoutId: null
  };

  // --- DOM Elements Cache ---
  const DOM = {
    // Sidebar
    sidebar: document.getElementById('sidebar'),
    sidebarOverlay: document.getElementById('sidebarOverlay'),
    mobileMenuBtn: document.getElementById('mobileMenuBtn'),
    closeSidebarBtn: document.getElementById('closeSidebarBtn'),
    smartNavList: document.getElementById('smartNavList'),
    customListsNav: document.getElementById('customListsNav'),
    newListBtn: document.getElementById('newListBtn'),
    sidebarNewTaskBtn: document.getElementById('sidebarNewTaskBtn'),
    headerNewTaskBtn: document.getElementById('headerNewTaskBtn'),
    themeToggleBtn: document.getElementById('themeToggleBtn'),
    themeLabel: document.getElementById('themeLabel'),
    sidebarProgressBar: document.getElementById('sidebarProgressBar'),
    sidebarProgressText: document.getElementById('sidebarProgressText'),

    // Badges
    badgeAll: document.getElementById('badgeAll'),
    badgeToday: document.getElementById('badgeToday'),
    badgeUpcoming: document.getElementById('badgeUpcoming'),
    badgeStarred: document.getElementById('badgeStarred'),
    badgeCompleted: document.getElementById('badgeCompleted'),

    // Header & Toolbar
    searchInput: document.getElementById('searchInput'),
    clearSearchBtn: document.getElementById('clearSearchBtn'),
    clearCompletedBtn: document.getElementById('clearCompletedBtn'),
    currentViewIcon: document.getElementById('currentViewIcon'),
    currentViewTitle: document.getElementById('currentViewTitle'),
    currentViewSubtitle: document.getElementById('currentViewSubtitle'),
    editCurrentListBtn: document.getElementById('editCurrentListBtn'),
    deleteCurrentListBtn: document.getElementById('deleteCurrentListBtn'),
    priorityFilter: document.getElementById('priorityFilter'),
    sortBy: document.getElementById('sortBy'),

    // Quick Add Form
    quickAddForm: document.getElementById('quickAddForm'),
    quickAddInput: document.getElementById('quickAddInput'),
    quickAddDate: document.getElementById('quickAddDate'),
    quickAddTime: document.getElementById('quickAddTime'),
    quickAddPriority: document.getElementById('quickAddPriority'),
    quickAddList: document.getElementById('quickAddList'),

    // Stats
    statsTotal: document.getElementById('statsTotal'),
    statsPending: document.getElementById('statsPending'),
    statsOverdue: document.getElementById('statsOverdue'),
    statsCompleted: document.getElementById('statsCompleted'),

    // Tasks Container & Empty State
    tasksContainer: document.getElementById('tasksContainer'),
    emptyState: document.getElementById('emptyState'),

    // Task Modal
    taskModalBackdrop: document.getElementById('taskModalBackdrop'),
    taskModalTitle: document.getElementById('taskModalTitle'),
    taskModalForm: document.getElementById('taskModalForm'),
    modalTaskId: document.getElementById('modalTaskId'),
    modalTaskTitle: document.getElementById('modalTaskTitle'),
    modalTaskDesc: document.getElementById('modalTaskDesc'),
    modalTaskList: document.getElementById('modalTaskList'),
    modalTaskPriority: document.getElementById('modalTaskPriority'),
    modalTaskDate: document.getElementById('modalTaskDate'),
    modalTaskTime: document.getElementById('modalTaskTime'),
    modalTaskStarred: document.getElementById('modalTaskStarred'),
    modalTaskCompleted: document.getElementById('modalTaskCompleted'),
    closeTaskModalBtn: document.getElementById('closeTaskModalBtn'),
    cancelTaskModalBtn: document.getElementById('cancelTaskModalBtn'),

    // List Modal
    listModalBackdrop: document.getElementById('listModalBackdrop'),
    listModalTitle: document.getElementById('listModalTitle'),
    listModalForm: document.getElementById('listModalForm'),
    modalListId: document.getElementById('modalListId'),
    modalListName: document.getElementById('modalListName'),
    colorPickerPalette: document.getElementById('colorPickerPalette'),
    modalListColor: document.getElementById('modalListColor'),
    iconPickerPalette: document.getElementById('iconPickerPalette'),
    modalListIcon: document.getElementById('modalListIcon'),
    closeListModalBtn: document.getElementById('closeListModalBtn'),
    cancelListModalBtn: document.getElementById('cancelListModalBtn'),

    // Toast Container
    toastContainer: document.getElementById('toastContainer'),

    // Canvas
    confettiCanvas: document.getElementById('confettiCanvas')
  };

  // ==========================================================================
  // Initialization & LocalStorage
  // ==========================================================================
  function init() {
    loadTheme();
    loadData();
    renderCustomLists();
    populateListDropdowns();
    renderColorPicker();
    renderIconPicker();
    setupEventListeners();
    updateViewHeader();
    renderTasks();
    updateStatsAndBadges();
  }

  function loadData() {
    try {
      const storedLists = localStorage.getItem(STORAGE_LISTS_KEY);
      state.lists = storedLists ? JSON.parse(storedLists) : DEFAULT_LISTS;

      const storedTasks = localStorage.getItem(STORAGE_TASKS_KEY);
      state.tasks = storedTasks ? JSON.parse(storedTasks) : DEFAULT_TASKS;
    } catch (e) {
      console.warn('Failed to parse localStorage, resetting to defaults.', e);
      state.lists = DEFAULT_LISTS;
      state.tasks = DEFAULT_TASKS;
    }
  }

  function saveData() {
    try {
      localStorage.setItem(STORAGE_TASKS_KEY, JSON.stringify(state.tasks));
      localStorage.setItem(STORAGE_LISTS_KEY, JSON.stringify(state.lists));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  // ==========================================================================
  // Theme Toggle
  // ==========================================================================
  function loadTheme() {
    const savedTheme = localStorage.getItem(STORAGE_THEME_KEY) || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeLabel(savedTheme);
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem(STORAGE_THEME_KEY, newTheme);
    updateThemeLabel(newTheme);
  }

  function updateThemeLabel(theme) {
    if (DOM.themeLabel) {
      DOM.themeLabel.textContent = theme === 'dark' ? 'Dark Mode' : 'Light Mode';
    }
  }

  // ==========================================================================
  // Date & Time Helpers
  // ==========================================================================
  function isTaskOverdue(task) {
    if (task.completed || !task.dueDate) return false;
    const now = new Date();
    const [year, month, day] = task.dueDate.split('-').map(Number);
    let dueHour = 23, dueMin = 59;
    if (task.dueTime) {
      const [h, m] = task.dueTime.split(':').map(Number);
      dueHour = h;
      dueMin = m;
    }
    const dueDateTime = new Date(year, month - 1, day, dueHour, dueMin, 59);
    return dueDateTime < now;
  }

  function formatTaskDateTime(dateStr, timeStr) {
    if (!dateStr) return null;

    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const checkDate = new Date(year, month - 1, day);
    checkDate.setHours(0, 0, 0, 0);

    const diffDays = Math.round((checkDate - today) / (1000 * 60 * 60 * 24));

    let dateLabel = '';
    if (diffDays === 0) {
      dateLabel = 'Today';
    } else if (diffDays === 1) {
      dateLabel = 'Tomorrow';
    } else if (diffDays === -1) {
      dateLabel = 'Yesterday';
    } else {
      dateLabel = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined });
    }

    let timeLabel = '';
    if (timeStr) {
      const [hour, minute] = timeStr.split(':').map(Number);
      const isPM = hour >= 12;
      const h12 = hour % 12 || 12;
      const mStr = String(minute).padStart(2, '0');
      timeLabel = ` at ${h12}:${mStr} ${isPM ? 'PM' : 'AM'}`;
    }

    return {
      text: `${dateLabel}${timeLabel}`,
      isToday: diffDays === 0,
      diffDays
    };
  }

  // ==========================================================================
  // Lists Navigation & Rendering
  // ==========================================================================
  function renderCustomLists() {
    DOM.customListsNav.innerHTML = '';

    state.lists.forEach(list => {
      const count = state.tasks.filter(t => t.listId === list.id && !t.completed).length;
      const iconObj = ICON_PALETTE.find(i => i.id === list.icon) || ICON_PALETTE[0];

      const li = document.createElement('li');
      li.className = `nav-item ${state.currentView === list.id ? 'active' : ''}`;
      li.dataset.view = list.id;

      li.innerHTML = `
        <button class="nav-btn">
          <span class="custom-list-dot" style="background-color: ${list.color}; color: ${list.color};"></span>
          <span class="nav-label">${escapeHtml(list.name)}</span>
          <span class="nav-badge">${count}</span>
        </button>
      `;

      li.addEventListener('click', () => switchView(list.id));
      DOM.customListsNav.appendChild(li);
    });
  }

  function populateListDropdowns() {
    const populate = (selectElem) => {
      if (!selectElem) return;
      selectElem.innerHTML = '';
      state.lists.forEach(list => {
        const option = document.createElement('option');
        option.value = list.id;
        option.textContent = list.name;
        selectElem.appendChild(option);
      });
    };

    populate(DOM.quickAddList);
    populate(DOM.modalTaskList);
  }

  function switchView(viewId) {
    state.currentView = viewId;

    // Update active class on smart nav
    document.querySelectorAll('#smartNavList .nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.view === viewId);
    });

    // Update active class on custom lists nav
    document.querySelectorAll('#customListsNav .nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.view === viewId);
    });

    // Close mobile sidebar if open
    closeSidebar();

    updateViewHeader();
    renderTasks();
    updateStatsAndBadges();
  }

  function updateViewHeader() {
    const isCustomList = state.lists.find(l => l.id === state.currentView);

    if (isCustomList) {
      const iconObj = ICON_PALETTE.find(i => i.id === isCustomList.icon) || ICON_PALETTE[0];
      DOM.currentViewIcon.innerHTML = iconObj.svg;
      DOM.currentViewIcon.style.color = isCustomList.color;
      DOM.currentViewTitle.textContent = isCustomList.name;
      DOM.currentViewSubtitle.textContent = `All tasks grouped under ${isCustomList.name}`;
      DOM.editCurrentListBtn.style.display = 'inline-flex';
      DOM.deleteCurrentListBtn.style.display = 'inline-flex';
    } else {
      DOM.editCurrentListBtn.style.display = 'none';
      DOM.deleteCurrentListBtn.style.display = 'none';
      DOM.currentViewIcon.style.color = '';

      switch (state.currentView) {
        case 'today':
          DOM.currentViewIcon.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>';
          DOM.currentViewTitle.textContent = 'Today';
          DOM.currentViewSubtitle.textContent = 'Tasks scheduled for completion today';
          break;
        case 'upcoming':
          DOM.currentViewIcon.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>';
          DOM.currentViewTitle.textContent = 'Upcoming';
          DOM.currentViewSubtitle.textContent = 'Tasks scheduled for future dates';
          break;
        case 'starred':
          DOM.currentViewIcon.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>';
          DOM.currentViewTitle.textContent = 'Important';
          DOM.currentViewSubtitle.textContent = 'High priority and starred tasks';
          break;
        case 'completed':
          DOM.currentViewIcon.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>';
          DOM.currentViewTitle.textContent = 'Completed';
          DOM.currentViewSubtitle.textContent = 'Accomplished tasks history';
          break;
        case 'all':
        default:
          DOM.currentViewIcon.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>';
          DOM.currentViewTitle.textContent = 'All Tasks';
          DOM.currentViewSubtitle.textContent = 'Manage and organize all your pending and completed activities';
          break;
      }
    }
  }

  // ==========================================================================
  // Task Rendering, Sorting & Filtering
  // ==========================================================================
  function getFilteredTasks() {
    const todayStr = getLocalDateString(0);

    return state.tasks.filter(task => {
      // 1. View Filter
      if (state.currentView === 'today') {
        if (task.dueDate !== todayStr) return false;
      } else if (state.currentView === 'upcoming') {
        if (!task.dueDate || task.dueDate <= todayStr) return false;
      } else if (state.currentView === 'starred') {
        if (!task.starred) return false;
      } else if (state.currentView === 'completed') {
        if (!task.completed) return false;
      } else if (state.currentView !== 'all') {
        // Custom List view
        if (task.listId !== state.currentView) return false;
      }

      // 2. Priority Filter
      if (state.filterPriority !== 'all') {
        if (task.priority !== state.filterPriority) return false;
      }

      // 3. Search Query
      if (state.searchQuery.trim() !== '') {
        const q = state.searchQuery.toLowerCase();
        const matchTitle = task.title.toLowerCase().includes(q);
        const matchDesc = task.description && task.description.toLowerCase().includes(q);
        const list = state.lists.find(l => l.id === task.listId);
        const matchList = list && list.name.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchList) return false;
      }

      return true;
    }).sort((a, b) => {
      // Sorting
      if (state.sortBy === 'dueDate') {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        const dateTimeA = `${a.dueDate} ${a.dueTime || '23:59'}`;
        const dateTimeB = `${b.dueDate} ${b.dueTime || '23:59'}`;
        return dateTimeA.localeCompare(dateTimeB);
      } else if (state.sortBy === 'priority') {
        const weight = { urgent: 4, high: 3, medium: 2, low: 1 };
        return (weight[b.priority] || 0) - (weight[a.priority] || 0);
      } else if (state.sortBy === 'title') {
        return a.title.localeCompare(b.title);
      } else if (state.sortBy === 'createdAt') {
        return b.createdAt - a.createdAt;
      }
      return 0;
    });
  }

  function renderTasks() {
    const filtered = getFilteredTasks();
    DOM.tasksContainer.innerHTML = '';

    if (filtered.length === 0) {
      DOM.emptyState.style.display = 'block';
      return;
    } else {
      DOM.emptyState.style.display = 'none';
    }

    filtered.forEach(task => {
      const list = state.lists.find(l => l.id === task.listId) || { name: 'Inbox', color: '#6366f1' };
      const overdue = isTaskOverdue(task);
      const dateTimeFormatted = formatTaskDateTime(task.dueDate, task.dueTime);

      const card = document.createElement('div');
      card.className = `task-card ${task.completed ? 'completed' : ''}`;
      card.style.setProperty('--task-list-color', list.color);

      // Date badge styling
      let dateBadgeHtml = '';
      if (dateTimeFormatted) {
        let dateClass = 'badge-date';
        if (overdue) {
          dateClass += ' overdue';
        } else if (dateTimeFormatted.isToday) {
          dateClass += ' today';
        }

        dateBadgeHtml = `
          <span class="badge ${dateClass}">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            ${overdue ? 'Overdue: ' : ''}${escapeHtml(dateTimeFormatted.text)}
          </span>
        `;
      }

      card.innerHTML = `
        <div class="task-checkbox-wrapper">
          <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} aria-label="Mark task complete">
        </div>

        <div class="task-body">
          <div class="task-main-row">
            <h3 class="task-title">${escapeHtml(task.title)}</h3>
          </div>
          ${task.description ? `<p class="task-description">${escapeHtml(task.description)}</p>` : ''}
          <div class="task-meta-row">
            <span class="badge badge-${task.priority}">
              ${capitalize(task.priority)}
            </span>
            ${dateBadgeHtml}
            <span class="badge badge-list">
              <span class="badge-list-dot" style="background-color: ${list.color};"></span>
              ${escapeHtml(list.name)}
            </span>
          </div>
        </div>

        <div class="task-actions">
          <button class="btn-star ${task.starred ? 'starred' : ''}" title="${task.starred ? 'Unmark Important' : 'Mark Important'}" aria-label="Toggle Star">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="${task.starred ? '#fbbf24' : 'none'}" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          </button>
          <button class="btn-action edit" title="Edit Task" aria-label="Edit Task">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
          </button>
          <button class="btn-action delete" title="Delete Task" aria-label="Delete Task">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          </button>
        </div>
      `;

      // Checkbox Complete Toggle
      const checkbox = card.querySelector('.task-checkbox');
      checkbox.addEventListener('change', () => {
        toggleTaskComplete(task.id, checkbox.checked);
      });

      // Star Toggle
      const starBtn = card.querySelector('.btn-star');
      starBtn.addEventListener('click', () => {
        toggleTaskStarred(task.id);
      });

      // Edit Button
      const editBtn = card.querySelector('.btn-action.edit');
      editBtn.addEventListener('click', () => {
        openTaskModal(task);
      });

      // Delete Button
      const deleteBtn = card.querySelector('.btn-action.delete');
      deleteBtn.addEventListener('click', () => {
        deleteTask(task.id);
      });

      DOM.tasksContainer.appendChild(card);
    });
  }

  function updateStatsAndBadges() {
    const todayStr = getLocalDateString(0);

    const total = state.tasks.length;
    const completed = state.tasks.filter(t => t.completed).length;
    const pending = total - completed;
    const overdue = state.tasks.filter(t => isTaskOverdue(t)).length;
    const today = state.tasks.filter(t => t.dueDate === todayStr && !t.completed).length;
    const upcoming = state.tasks.filter(t => t.dueDate && t.dueDate > todayStr && !t.completed).length;
    const starred = state.tasks.filter(t => t.starred && !t.completed).length;

    // View badges
    DOM.badgeAll.textContent = pending;
    DOM.badgeToday.textContent = today;
    DOM.badgeUpcoming.textContent = upcoming;
    DOM.badgeStarred.textContent = starred;
    DOM.badgeCompleted.textContent = completed;

    // Main header stats
    DOM.statsTotal.textContent = total;
    DOM.statsPending.textContent = pending;
    DOM.statsOverdue.textContent = overdue;
    DOM.statsCompleted.textContent = completed;

    // Sidebar progress
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
    DOM.sidebarProgressBar.style.width = `${pct}%`;
    DOM.sidebarProgressText.textContent = `${completed}/${total} (${pct}%)`;

    // Re-render custom list badges
    renderCustomLists();
  }

  // ==========================================================================
  // Task Operations (Add, Edit, Complete, Star, Delete)
  // ==========================================================================
  function addTask(title, description, listId, priority, dueDate, dueTime, starred = false) {
    if (!title.trim()) return;

    const newTask = {
      id: 'task-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      title: title.trim(),
      description: description ? description.trim() : '',
      listId: listId || state.lists[0]?.id || 'list-work',
      priority: priority || 'medium',
      dueDate: dueDate || '',
      dueTime: dueTime || '',
      completed: false,
      starred: Boolean(starred),
      createdAt: Date.now()
    };

    state.tasks.unshift(newTask);
    saveData();
    renderTasks();
    updateStatsAndBadges();
    showToast(`Task "${escapeHtml(newTask.title)}" added!`);
  }

  function updateTask(id, updates) {
    const index = state.tasks.findIndex(t => t.id === id);
    if (index === -1) return;

    state.tasks[index] = { ...state.tasks[index], ...updates };
    saveData();
    renderTasks();
    updateStatsAndBadges();
    showToast('Task updated successfully');
  }

  function toggleTaskComplete(id, isCompleted) {
    const task = state.tasks.find(t => t.id === id);
    if (!task) return;

    task.completed = isCompleted;
    saveData();
    renderTasks();
    updateStatsAndBadges();

    if (isCompleted) {
      triggerConfetti();
      showToast('Task completed! Great job! 🎉');
    }
  }

  function toggleTaskStarred(id) {
    const task = state.tasks.find(t => t.id === id);
    if (!task) return;

    task.starred = !task.starred;
    saveData();
    renderTasks();
    updateStatsAndBadges();
  }

  function deleteTask(id) {
    const index = state.tasks.findIndex(t => t.id === id);
    if (index === -1) return;

    const [removedTask] = state.tasks.splice(index, 1);
    state.deletedTaskBuffer = { task: removedTask, index };
    saveData();
    renderTasks();
    updateStatsAndBadges();

    showToast('Task deleted', true);
  }

  function undoDelete() {
    if (!state.deletedTaskBuffer) return;
    const { task, index } = state.deletedTaskBuffer;
    state.tasks.splice(index, 0, task);
    state.deletedTaskBuffer = null;
    saveData();
    renderTasks();
    updateStatsAndBadges();
    showToast('Task restored');
  }

  function clearCompleted() {
    const initialCount = state.tasks.length;
    state.tasks = state.tasks.filter(t => !t.completed);
    const deletedCount = initialCount - state.tasks.length;

    if (deletedCount === 0) {
      showToast('No completed tasks to clear.');
      return;
    }

    saveData();
    renderTasks();
    updateStatsAndBadges();
    showToast(`Cleared ${deletedCount} completed task${deletedCount > 1 ? 's' : ''}`);
  }

  // ==========================================================================
  // Modal Handlers (Task & List)
  // ==========================================================================
  function openTaskModal(task = null) {
    populateListDropdowns();

    if (task) {
      DOM.taskModalTitle.textContent = 'Edit Task';
      DOM.modalTaskId.value = task.id;
      DOM.modalTaskTitle.value = task.title;
      DOM.modalTaskDesc.value = task.description || '';
      DOM.modalTaskList.value = task.listId;
      DOM.modalTaskPriority.value = task.priority;
      DOM.modalTaskDate.value = task.dueDate || '';
      DOM.modalTaskTime.value = task.dueTime || '';
      DOM.modalTaskStarred.checked = task.starred;
      DOM.modalTaskCompleted.checked = task.completed;
    } else {
      DOM.taskModalTitle.textContent = 'New Task';
      DOM.modalTaskId.value = '';
      DOM.modalTaskTitle.value = '';
      DOM.modalTaskDesc.value = '';
      DOM.modalTaskList.value = (state.currentView !== 'all' && state.lists.some(l => l.id === state.currentView))
        ? state.currentView
        : (state.lists[0]?.id || '');
      DOM.modalTaskPriority.value = 'medium';
      DOM.modalTaskDate.value = state.currentView === 'today' ? getLocalDateString(0) : '';
      DOM.modalTaskTime.value = '';
      DOM.modalTaskStarred.checked = state.currentView === 'starred';
      DOM.modalTaskCompleted.checked = false;
    }

    DOM.taskModalBackdrop.classList.add('active');
    setTimeout(() => DOM.modalTaskTitle.focus(), 100);
  }

  function closeTaskModal() {
    DOM.taskModalBackdrop.classList.remove('active');
    DOM.taskModalForm.reset();
  }

  function openListModal(list = null) {
    if (list) {
      DOM.listModalTitle.textContent = 'Edit List';
      DOM.modalListId.value = list.id;
      DOM.modalListName.value = list.name;
      DOM.modalListColor.value = list.color;
      DOM.modalListIcon.value = list.icon;
    } else {
      DOM.listModalTitle.textContent = 'Create New List';
      DOM.modalListId.value = '';
      DOM.modalListName.value = '';
      DOM.modalListColor.value = COLOR_PALETTE[0];
      DOM.modalListIcon.value = ICON_PALETTE[0].id;
    }

    selectColorSwatch(DOM.modalListColor.value);
    selectIconChoice(DOM.modalListIcon.value);

    DOM.listModalBackdrop.classList.add('active');
    setTimeout(() => DOM.modalListName.focus(), 100);
  }

  function closeListModal() {
    DOM.listModalBackdrop.classList.remove('active');
    DOM.listModalForm.reset();
  }

  // ==========================================================================
  // Color & Icon Picker Renderers
  // ==========================================================================
  function renderColorPicker() {
    DOM.colorPickerPalette.innerHTML = '';
    COLOR_PALETTE.forEach(color => {
      const swatch = document.createElement('div');
      swatch.className = 'color-swatch';
      swatch.style.backgroundColor = color;
      swatch.style.color = color;
      swatch.dataset.color = color;
      swatch.addEventListener('click', () => {
        selectColorSwatch(color);
      });
      DOM.colorPickerPalette.appendChild(swatch);
    });
  }

  function selectColorSwatch(color) {
    DOM.modalListColor.value = color;
    document.querySelectorAll('.color-swatch').forEach(el => {
      el.classList.toggle('selected', el.dataset.color === color);
    });
  }

  function renderIconPicker() {
    DOM.iconPickerPalette.innerHTML = '';
    ICON_PALETTE.forEach(item => {
      const choice = document.createElement('div');
      choice.className = 'icon-choice';
      choice.dataset.icon = item.id;
      choice.innerHTML = item.svg;
      choice.addEventListener('click', () => {
        selectIconChoice(item.id);
      });
      DOM.iconPickerPalette.appendChild(choice);
    });
  }

  function selectIconChoice(iconId) {
    DOM.modalListIcon.value = iconId;
    document.querySelectorAll('.icon-choice').forEach(el => {
      el.classList.toggle('selected', el.dataset.icon === iconId);
    });
  }

  // ==========================================================================
  // List CRUD (Create, Update, Delete)
  // ==========================================================================
  function saveListFromModal() {
    const listId = DOM.modalListId.value;
    const name = DOM.modalListName.value.trim();
    const color = DOM.modalListColor.value;
    const icon = DOM.modalListIcon.value;

    if (!name) return;

    if (listId) {
      // Edit existing
      const list = state.lists.find(l => l.id === listId);
      if (list) {
        list.name = name;
        list.color = color;
        list.icon = icon;
        showToast(`List "${escapeHtml(name)}" updated`);
      }
    } else {
      // Create new
      const newList = {
        id: 'list-' + Date.now(),
        name,
        color,
        icon
      };
      state.lists.push(newList);
      showToast(`Created new list "${escapeHtml(name)}"`);
      state.currentView = newList.id;
    }

    saveData();
    populateListDropdowns();
    renderCustomLists();
    updateViewHeader();
    renderTasks();
    updateStatsAndBadges();
    closeListModal();
  }

  function deleteCurrentList() {
    const list = state.lists.find(l => l.id === state.currentView);
    if (!list) return;

    if (confirm(`Are you sure you want to delete the list "${list.name}"? Tasks inside will be kept in All Tasks.`)) {
      state.lists = state.lists.filter(l => l.id !== list.id);
      // Fallback default list for tasks in that list
      const fallbackListId = state.lists[0]?.id || 'list-general';
      state.tasks.forEach(t => {
        if (t.listId === list.id) t.listId = fallbackListId;
      });

      state.currentView = 'all';
      saveData();
      populateListDropdowns();
      renderCustomLists();
      updateViewHeader();
      renderTasks();
      updateStatsAndBadges();
      showToast(`List "${list.name}" deleted`);
    }
  }

  // ==========================================================================
  // Toast Notification System
  // ==========================================================================
  function showToast(message, allowUndo = false) {
    DOM.toastContainer.innerHTML = '';

    const toast = document.createElement('div');
    toast.className = 'toast';

    toast.innerHTML = `
      <span>${message}</span>
      ${allowUndo ? '<button class="toast-undo-btn">Undo</button>' : ''}
    `;

    if (allowUndo) {
      const undoBtn = toast.querySelector('.toast-undo-btn');
      undoBtn.addEventListener('click', () => {
        undoDelete();
        toast.remove();
      });
    }

    DOM.toastContainer.appendChild(toast);

    if (state.undoTimeoutId) clearTimeout(state.undoTimeoutId);
    state.undoTimeoutId = setTimeout(() => {
      toast.remove();
      state.deletedTaskBuffer = null;
    }, 5000);
  }

  // ==========================================================================
  // Confetti Particle Engine (Lightweight Canvas)
  // ==========================================================================
  let confettiAnimationId = null;
  const confettiParticles = [];

  function triggerConfetti() {
    const canvas = DOM.confettiCanvas;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    confettiParticles.length = 0;
    const colors = ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#06b6d4', '#8b5cf6'];

    for (let i = 0; i < 70; i++) {
      confettiParticles.push({
        x: canvas.width / 2 + (Math.random() * 200 - 100),
        y: canvas.height / 2 + (Math.random() * 100 - 50),
        w: Math.random() * 8 + 4,
        h: Math.random() * 8 + 4,
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 0.8) * 14 - 3,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: 1,
        gravity: 0.35
      });
    }

    if (confettiAnimationId) cancelAnimationFrame(confettiAnimationId);

    function updateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let aliveCount = 0;

      confettiParticles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.rotation += p.rotationSpeed;
        p.opacity -= 0.015;

        if (p.opacity > 0) {
          aliveCount++;
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.opacity);
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          ctx.restore();
        }
      });

      if (aliveCount > 0) {
        confettiAnimationId = requestAnimationFrame(updateParticles);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    confettiAnimationId = requestAnimationFrame(updateParticles);
  }

  // ==========================================================================
  // Event Listeners Setup
  // ==========================================================================
  function openSidebar() {
    DOM.sidebar.classList.add('open');
    DOM.sidebarOverlay.classList.add('active');
  }

  function closeSidebar() {
    DOM.sidebar.classList.remove('open');
    DOM.sidebarOverlay.classList.remove('active');
  }

  function setupEventListeners() {
    // Mobile Drawer navigation
    DOM.mobileMenuBtn?.addEventListener('click', openSidebar);
    DOM.closeSidebarBtn?.addEventListener('click', closeSidebar);
    DOM.sidebarOverlay?.addEventListener('click', closeSidebar);

    // Theme Toggle
    DOM.themeToggleBtn?.addEventListener('click', toggleTheme);

    // Smart View Clicks
    DOM.smartNavList?.addEventListener('click', (e) => {
      const item = e.target.closest('.nav-item');
      if (item && item.dataset.view) {
        switchView(item.dataset.view);
      }
    });

    // Quick Add Form Submit
    DOM.quickAddForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = DOM.quickAddInput.value;
      const date = DOM.quickAddDate.value;
      const time = DOM.quickAddTime.value;
      const priority = DOM.quickAddPriority.value;
      const listId = DOM.quickAddList.value;

      addTask(title, '', listId, priority, date, time);
      DOM.quickAddInput.value = '';
      DOM.quickAddDate.value = '';
      DOM.quickAddTime.value = '';
    });

    // Modal Task Triggers
    DOM.sidebarNewTaskBtn?.addEventListener('click', () => openTaskModal());
    DOM.headerNewTaskBtn?.addEventListener('click', () => openTaskModal());
    DOM.closeTaskModalBtn?.addEventListener('click', closeTaskModal);
    DOM.cancelTaskModalBtn?.addEventListener('click', closeTaskModal);
    DOM.taskModalBackdrop?.addEventListener('click', (e) => {
      if (e.target === DOM.taskModalBackdrop) closeTaskModal();
    });

    DOM.taskModalForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = DOM.modalTaskId.value;
      const title = DOM.modalTaskTitle.value;
      const description = DOM.modalTaskDesc.value;
      const listId = DOM.modalTaskList.value;
      const priority = DOM.modalTaskPriority.value;
      const dueDate = DOM.modalTaskDate.value;
      const dueTime = DOM.modalTaskTime.value;
      const starred = DOM.modalTaskStarred.checked;
      const completed = DOM.modalTaskCompleted.checked;

      if (id) {
        updateTask(id, {
          title,
          description,
          listId,
          priority,
          dueDate,
          dueTime,
          starred,
          completed
        });
      } else {
        addTask(title, description, listId, priority, dueDate, dueTime, starred);
      }
      closeTaskModal();
    });

    // List Modal Triggers
    DOM.newListBtn?.addEventListener('click', () => openListModal());
    DOM.editCurrentListBtn?.addEventListener('click', () => {
      const list = state.lists.find(l => l.id === state.currentView);
      if (list) openListModal(list);
    });
    DOM.deleteCurrentListBtn?.addEventListener('click', deleteCurrentList);
    DOM.closeListModalBtn?.addEventListener('click', closeListModal);
    DOM.cancelListModalBtn?.addEventListener('click', closeListModal);
    DOM.listModalBackdrop?.addEventListener('click', (e) => {
      if (e.target === DOM.listModalBackdrop) closeListModal();
    });
    DOM.listModalForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      saveListFromModal();
    });

    // Search Box
    DOM.searchInput?.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      DOM.clearSearchBtn.style.display = state.searchQuery ? 'flex' : 'none';
      renderTasks();
    });

    DOM.clearSearchBtn?.addEventListener('click', () => {
      DOM.searchInput.value = '';
      state.searchQuery = '';
      DOM.clearSearchBtn.style.display = 'none';
      renderTasks();
    });

    // Toolbar Filters
    DOM.priorityFilter?.addEventListener('change', (e) => {
      state.filterPriority = e.target.value;
      renderTasks();
    });

    DOM.sortBy?.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      renderTasks();
    });

    // Clear Completed Button
    DOM.clearCompletedBtn?.addEventListener('click', clearCompleted);

    // Global Keyboard Shortcuts
    window.addEventListener('keydown', (e) => {
      // Ctrl+N or Cmd+N to open task modal
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'n') {
        e.preventDefault();
        openTaskModal();
      }
      // Escape to close modals
      if (e.key === 'Escape') {
        if (DOM.taskModalBackdrop.classList.contains('active')) closeTaskModal();
        if (DOM.listModalBackdrop.classList.contains('active')) closeListModal();
      }
    });

    // Resize handler for canvas
    window.addEventListener('resize', () => {
      if (DOM.confettiCanvas) {
        DOM.confettiCanvas.width = window.innerWidth;
        DOM.confettiCanvas.height = window.innerHeight;
      }
    });
  }

  // --- Utility Functions ---
  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // Boot Application
  document.addEventListener('DOMContentLoaded', init);
})();
