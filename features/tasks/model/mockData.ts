import type { Task } from '@/shared/types/task'

export const mockTasks: Task[] = [
  {
    id: '6b8b4567-0e7e-4b1e-b13c-7a8d2f6b0b88',
    name: 'Fix login validation',
    key: 'TASK-001',
    description:
      'Полагодити валідацію полів логіну. Наразі частина некоректних значень не відловлюється, що створює проблеми для користувачів. Потрібно забезпечити стабільну роботу форми та передбачити детальні повідомлення про помилки.',
    status: 'backlog',
    labels: ['frontend', 'bug'],
  },
  {
    id: '93d3d0c6-2a5f-4a9e-b6c1-9f3a2e7a5b31',
    name: 'Create dashboard layout',
    key: 'TASK-002',
    description:
      'Зверстати основний дешборд. Має бути продумане адаптивне розташування основних блоків та зручна навігація. Дизайн повинен відповідати актуальним UI-гайдлайнам проєкту.',
    status: 'backlog',
    labels: ['frontend', 'feature'],
  },
  {
    id: 'a1f5b0c2-1e3f-4c2a-9e0d-5f3a0b1e8c7a',
    name: 'Add payment loader',
    key: 'TASK-003',
    description:
      'Показати лоадер під час створення платежу. Це допоможе користувачам зрозуміти, що система обробляє їхню дію. Також потрібно забезпечити коректне приховування лоадера у випадку помилки.',
    status: 'backlog',
    labels: ['frontend', 'feature'],
  },
  {
    id: 'f9b2c3d1-6e4a-4c1d-8e3a-7c1b2f3d4e5f',
    name: 'Mobile navigation fix',
    key: 'TASK-004',
    description:
      'Поправити меню на мобільних пристроях. Зараз частина елементів відображається некоректно, що ускладнює роботу користувача. Потрібно забезпечити плавну взаємодію та повну адаптивність.',
    status: 'in_progress',
    labels: ['frontend'],
  },
  {
    id: 'e4f7a2c3-5d6b-4a1e-9f2c-3d1e5f6a7b8c',
    name: 'SEO meta tags',
    key: 'TASK-005',
    description:
      'Додати meta теги для SEO. Це покращить видимість сторінок у пошукових системах та допоможе збільшити органічний трафік. Потрібно передбачити можливість динамічної зміни тегів залежно від контенту.',
    status: 'in_progress',
    labels: ['feature'],
  },
  {
    id: 'b6c1d2e3-7f4a-4e5d-8c2a-1e9f3a7b5d6c',
    name: 'Optimize images',
    key: 'TASK-006',
    description:
      'Оптимізувати зображення на лендингу. Вони завантажуються занадто повільно та негативно впливають на продуктивність сторінки. Необхідно зменшити розмір файлів без втрати якості та додати сучасні формати.',
    status: 'in_progress',
    labels: ['backend'],
  },
  {
    id: 'c2d3e4f5-8b9a-4c1e-9f0a-3e2d1c4b5a6f',
    name: 'Remove legacy styles',
    key: 'TASK-007',
    description:
      'Видалити старі стилі. Вони більше не використовуються та ускладнюють підтримку проєкту. Також це допоможе зменшити розмір CSS і прискорити завантаження сторінок.',
    status: 'done',
    labels: ['backend'],
  },
  {
    id: 'd1e2f3a4-5b6c-4e7d-9a8b-2c3d4e5f6a7b',
    name: 'Accessibility improvements',
    key: 'TASK-008',
    description:
      'Покращити доступність елементів. Деякі компоненти не відповідають стандартам WCAG і не озвучуються скрінрідерами. Необхідно додати ARIA-атрибути та покращити клавіатурну навігацію.',
    status: 'done',
    labels: ['feature'],
  },
  {
    id: 'e5f6a7b8-9c0d-4e1f-8a2b-3c4d5e6f7a8b',
    name: 'Form error handling',
    key: 'TASK-009',
    description:
      'Покращити обробку помилок форм. Наразі помилки відображаються не завжди коректно, що плутає користувачів. Потрібно уніфікувати формат повідомлень та забезпечити їх консистентність у різних формах.',
    status: 'done',
    labels: ['frontend', 'bug'],
  },
  {
    id: 'a2b3c4d5-6e7f-8a9b-0c1d-2e3f4a5b6c7d',
    name: 'Implement dark mode',
    key: 'TASK-010',
    description:
      'Додати підтримку темного режиму. Користувачі зможуть перемикатися між світлою та темною темою. Потрібно забезпечити збереження вибору та коректне відображення всіх компонентів.',
    status: 'backlog',
    labels: ['frontend', 'feature'],
  },
  {
    id: 'b3c4d5e6-7f8a-9b0c-1d2e-3f4a5b6c7d8e',
    name: 'Add unit tests',
    key: 'TASK-011',
    description:
      'Написати unit тести для критичних компонентів. Це допоможе забезпечити стабільність коду та швидше виявляти помилки під час розробки.',
    status: 'backlog',
    labels: ['backend', 'feature'],
  },
  {
    id: 'c4d5e6f7-8a9b-0c1d-2e3f-4a5b6c7d8e9f',
    name: 'Database migration',
    key: 'TASK-012',
    description:
      'Виконати міграцію бази даних до нової версії. Потрібно переконатися, що всі дані коректно переносяться та немає втрати інформації.',
    status: 'in_progress',
    labels: ['backend', 'urgent'],
  },
  {
    id: 'd5e6f7a8-9b0c-1d2e-3f4a-5b6c7d8e9f0a',
    name: 'API rate limiting',
    key: 'TASK-013',
    description:
      'Додати обмеження на кількість запитів до API. Це допоможе захистити сервер від перевантаження та зловмисних атак.',
    status: 'in_progress',
    labels: ['backend'],
  },
  {
    id: 'e6f7a8b9-0c1d-2e3f-4a5b-6c7d8e9f0a1b',
    name: 'User profile page',
    key: 'TASK-014',
    description:
      'Створити сторінку профілю користувача. Має містити інформацію про користувача, налаштування та історію активності.',
    status: 'done',
    labels: ['frontend', 'feature'],
  },
  {
    id: 'f7a8b9c0-1d2e-3f4a-5b6c-7d8e9f0a1b2c',
    name: 'Email notifications',
    key: 'TASK-015',
    description:
      'Налаштувати систему email сповіщень. Користувачі будуть отримувати повідомлення про важливі події та оновлення.',
    status: 'done',
    labels: ['backend', 'feature'],
  },
  {
    id: 'a8b9c0d1-2e3f-4a5b-6c7d-8e9f0a1b2c3d',
    name: 'Performance monitoring',
    key: 'TASK-016',
    description:
      'Інтегрувати систему моніторингу продуктивності. Це дозволить відстежувати швидкість роботи додатку та виявляти проблеми.',
    status: 'backlog',
    labels: ['backend'],
  },
  {
    id: 'b9c0d1e2-3f4a-5b6c-7d8e-9f0a1b2c3d4e',
    name: 'Refactor authentication',
    key: 'TASK-017',
    description:
      'Рефакторити систему аутентифікації. Потрібно спростити код та покращити безпеку.',
    status: 'backlog',
    labels: ['backend', 'bug'],
  },
  {
    id: 'c0d1e2f3-4a5b-6c7d-8e9f-0a1b2c3d4e5f',
    name: 'Add search functionality',
    key: 'TASK-018',
    description:
      'Додати пошук по задачах. Користувачі зможуть швидко знаходити потрібні задачі за назвою, описом або ключем.',
    status: 'done',
    labels: ['frontend', 'feature'],
  },
  {
    id: 'd1e2f3a4-5b6c-7d8e-9f0a-1b2c3d4e5f6a',
    name: 'Update dependencies',
    key: 'TASK-019',
    description:
      'Оновити залежності проєкту до останніх версій. Це допоможе отримати нові функції та виправлення помилок.',
    status: 'done',
    labels: ['backend'],
  },
  {
    id: 'e2f3a4b5-6c7d-8e9f-0a1b-2c3d4e5f6a7b',
    name: 'Documentation update',
    key: 'TASK-020',
    description:
      'Оновити документацію проєкту. Додати описи нових функцій та зміни в API.',
    status: 'done',
    labels: ['feature'],
  },
]
