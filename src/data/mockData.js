export const currentUser = {
  id: 1,
  name: 'Jasur',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jasur',
  xp: 120,
  friends: 12,
  tasks: 35,
  level: 5,
};

export const daralarList = [
  {
    id: 1,
    name: 'Alisher Nishonov',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alisher',
    status: 'known',
    lastSeen: '2 daqiqa oldin',
    message: 'Salom, qandaysiz?',
  },
  {
    id: 2,
    name: 'Noma\'lum shaxs',
    avatar: null,
    status: 'unknown',
    lastSeen: '15 daqiqa oldin',
    message: 'Siz bilan gaplashmoqchiman',
    warning: true,
  },
  {
    id: 3,
    name: 'Dilnoza Karimova',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dilnoza',
    status: 'known',
    lastSeen: '1 soat oldin',
    message: 'Yaxshi dars bo\'ldi bugun',
  },
  {
    id: 4,
    name: 'Noma\'lum shaxs',
    avatar: null,
    status: 'unknown',
    lastSeen: '3 soat oldin',
    message: 'Menga yordam kerak',
    warning: true,
  },
  {
    id: 5,
    name: 'Bobur Toshmatov',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bobur',
    status: 'known',
    lastSeen: 'Kecha',
    message: 'Holimga qaragin',
  },
  {
    id: 6,
    name: 'Noma\'lum shaxs',
    avatar: null,
    status: 'unknown',
    lastSeen: '2 kun oldin',
    message: 'Sening manzilingni bilishni istayman',
    warning: true,
    danger: true,
  },
];

export const notifications = [
  {
    id: 1,
    type: 'warning',
    title: 'Bilmagan shak bu!',
    message: 'Noma\'lum shaxs siz bilan bog\'lanmoqchi',
    time: '5 daqiqa oldin',
    read: false,
  },
  {
    id: 2,
    type: 'task',
    title: 'Vazifa bajarildi',
    message: '"Xavfsizlik asoslari" darsini tugatdingiz',
    time: '1 soat oldin',
    read: false,
  },
  {
    id: 3,
    type: 'xp',
    title: '+20 XP qo\'shildi',
    message: 'Yangi yutuq uchun XP topshingiz',
    time: '2 soat oldin',
    read: true,
  },
  {
    id: 4,
    type: 'warning',
    title: 'Bilmagan shak bu!',
    message: 'Shubhali havola yuborildi',
    time: 'Kecha',
    read: true,
  },
  {
    id: 5,
    type: 'info',
    title: 'Yangi dars mavjud',
    message: '"Internetda xavfsizlik" bo\'limi ochildi',
    time: '2 kun oldin',
    read: true,
  },
];

export const chatMessages = [
  {
    id: 1,
    sender: 'ai',
    text: 'Salom! Men SafeStep AI yordamchisiman. Sizga qanday yordam bera olaman? 😊',
    time: '10:00',
  },
  {
    id: 2,
    sender: 'user',
    text: 'Salom! Noma\'lum shaxs menga xabar yubordi, nima qilishim kerak?',
    time: '10:01',
  },
  {
    id: 3,
    sender: 'ai',
    text: 'Bu juda muhim savol! Noma\'lum shaxsdan xabar kelsa:\n\n1. Xabarga javob bermang\n2. Ota-onangizga ayting\n3. Shaxsni bloklang\n4. Bizga xabar bering\n\nXavfsizligingiz eng muhim narsa! 🛡️',
    time: '10:01',
  },
  {
    id: 4,
    sender: 'user',
    text: 'Rahmat! Uni bloklab bildirdim.',
    time: '10:03',
  },
  {
    id: 5,
    sender: 'ai',
    text: 'Ajoyib! Siz to\'g\'ri ish qildingiz. Xavfsiz bo\'ling! 👍',
    time: '10:03',
  },
];

export const menuItems = [
  { id: 1, icon: 'book-open', label: 'Bilimdon', color: '#4CAF50', screen: 'Bilimdon' },
  { id: 2, icon: 'check-square', label: 'Vazifalar', color: '#2196F3', screen: 'Vazifalar' },
  { id: 3, icon: 'shield', label: 'Xavfsizlik', color: '#FF5722', screen: 'Xavfsizlik' },
  { id: 4, icon: 'message-circle', label: 'AI Chat', color: '#9C27B0', screen: 'AIChat' },
  { id: 5, icon: 'users', label: 'Daralar', color: '#FF9800', screen: 'Daralar' },
  { id: 6, icon: 'bar-chart-2', label: 'Statistika', color: '#00BCD4', screen: 'ParentPanel' },
];

export const tasks = [
  { id: 1, title: 'Xavfsizlik darsini o\'qi', xp: 20, completed: true, category: 'Bilim' },
  { id: 2, title: 'Noma\'lum shaxsni bloklash', xp: 15, completed: true, category: 'Amaliyot' },
  { id: 3, title: 'Parolni yangilash', xp: 10, completed: false, category: 'Xavfsizlik' },
  { id: 4, title: 'Ota-onaga hisobot', xp: 25, completed: false, category: 'Muloqot' },
  { id: 5, title: 'Shubhali xabarni aniqlash', xp: 30, completed: false, category: 'Amaliyot' },
];

export const parentStats = {
  safetyScore: 73,
  dailyScreenTime: '2 soat 15 daqiqa',
  blockedContacts: 3,
  completedTasks: 8,
  totalTasks: 12,
  weeklyActivity: [40, 65, 55, 80, 45, 70, 73],
  recentAlerts: 2,
};
