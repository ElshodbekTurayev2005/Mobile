import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import WelcomeScreen from './src/screens/WelcomeScreen';
import HomeScreen from './src/screens/HomeScreen';
import DaralarScreen from './src/screens/DaralarScreen';
import AIChatScreen from './src/screens/AIChatScreen';
import ParentPanelScreen from './src/screens/ParentPanelScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';
import TestScreen from './src/screens/TestScreen';
import GameScreen from './src/screens/GameScreen';
import BottomTabBar from './src/components/BottomTabBar';

/* ── Parent panel has its own 3-tab nav ── */
function ParentPanelWrapper({ stats, onBack }) {
  const [tab, setTab] = useState('Asosiy');

  return (
    <View style={{ flex: 1 }}>
      {/* Inner screens */}
      <View style={{ flex: 1 }}>
        {tab === 'Asosiy'    && <ParentPanelScreen stats={stats} onBack={onBack} />}
        {tab === 'Hisobotlar' && <NotificationsScreen onBack={() => setTab('Asosiy')} stats={stats} />}
        {tab === 'Sozlamalar' && <ParentSettingsScreen />}
      </View>

      {/* Parent bottom tab bar */}
      <View style={parentStyles.tabBar}>
        {[
          { key: 'Asosiy',     icon: 'home'      },
          { key: 'Hisobotlar', icon: 'bar-chart-2'},
          { key: 'Sozlamalar', icon: 'settings'  },
        ].map(t => {
          const active = tab === t.key;
          return (
            <TouchableOpacity
              key={t.key}
              style={parentStyles.tab}
              onPress={() => setTab(t.key)}
              activeOpacity={0.7}
            >
              <Feather name={t.icon} size={22} color={active ? '#2563EB' : '#94A3B8'} />
              <Text style={[parentStyles.tabLabel, active && parentStyles.tabLabelActive]}>
                {t.key}
              </Text>
              {active && <View style={parentStyles.dot} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

function ParentSettingsScreen() {
  const SETTINGS = [
    { icon: 'bell',      label: 'Bildirishnomalar' },
    { icon: 'clock',     label: 'Ekran vaqti cheklash' },
    { icon: 'shield',    label: 'Himoya sozlamalari' },
    { icon: 'lock',      label: 'Parolni o\'zgartirish' },
    { icon: 'log-out',   label: 'Chiqish', danger: true },
  ];
  return (
    <View style={{ flex: 1, backgroundColor: '#F4F6FB' }}>
      <View style={{ paddingTop: 54, paddingHorizontal: 20, paddingBottom: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: '800', color: '#1E293B', textAlign: 'center' }}>Sozlamalar</Text>
      </View>
      <View style={{ backgroundColor: '#fff', borderRadius: 18, marginHorizontal: 16, paddingHorizontal: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 }}>
        {SETTINGS.map((s, i) => (
          <TouchableOpacity
            key={i}
            activeOpacity={0.7}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 15, borderBottomWidth: i < SETTINGS.length - 1 ? 1 : 0, borderBottomColor: '#F1F5F9' }}
          >
            <View style={{ width: 38, height: 38, borderRadius: 10, backgroundColor: s.danger ? '#FEE2E2' : '#EFF6FF', alignItems: 'center', justifyContent: 'center' }}>
              <Feather name={s.icon} size={18} color={s.danger ? '#EF4444' : '#2563EB'} />
            </View>
            <Text style={{ flex: 1, fontSize: 15, fontWeight: '600', color: s.danger ? '#EF4444' : '#1E293B' }}>{s.label}</Text>
            {!s.danger && <Feather name="chevron-right" size={17} color="#CBD5E1" />}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

/* ── Main App ── */
export default function App() {
  const [screen, setScreen] = useState('Welcome');
  const [activeTab, setActiveTab] = useState('Home');
  const [coins, setCoins] = useState(0);
  const [lessonsWatched, setLessonsWatched] = useState(0);
  const [testsCompleted, setTestsCompleted] = useState(0);
  const [lastTestScore, setLastTestScore] = useState(null);   // { correct, total }
  const [gameScore, setGameScore] = useState(null);           // { correct, total }

  const addCoins = (amount) => setCoins(c => c + amount);
  const onLessonWatch = () => setLessonsWatched(n => n + 1);
  const onTestComplete = (correct, total) => {
    setTestsCompleted(n => n + 1);
    setLastTestScore({ correct, total });
  };
  const onGameComplete = (correct, total) => setGameScore({ correct, total });

  const mainTabs = ['Home', 'Daralar', 'AIChat', 'ParentPanel', 'Profile', 'Vazifalar', 'Oyinlar'];

  const navigate = (to) => {
    setScreen(to);
    if (mainTabs.includes(to)) setActiveTab(to);
    if (to === 'DaralarInternet') setActiveTab('Daralar');
  };

  const handleTabPress = (tab) => {
    setActiveTab(tab);
    setScreen(tab);
  };

  if (screen === 'Welcome') {
    return (
      <WelcomeScreen
        onStart={() => navigate('Home')}
        onParentLogin={() => navigate('ParentPanel')}
      />
    );
  }

  /* Parent panel uses its own tab bar — hide main tab bar */
  if (screen === 'ParentPanel') {
    const parentStats = { lessonsWatched, testsCompleted, lastTestScore, gameScore, coins };
    return <ParentPanelWrapper stats={parentStats} onBack={() => navigate('Welcome')} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {screen === 'Home'     && <HomeScreen onNavigate={navigate} coins={coins} onBack={() => navigate('Welcome')} />}
        {(screen === 'Daralar' || screen === 'DaralarInternet') && (
          <DaralarScreen onLessonWatch={onLessonWatch} initialCategory={screen === 'DaralarInternet' ? 'Internet xavfsizligi' : 'Barchasi'} onBack={() => navigate('Home')} />
        )}
        {screen === 'AIChat'   && <AIChatScreen onBack={() => navigate('Home')} />}
        {screen === 'Profile'  && <ProfileScreen coins={coins} lessonsWatched={lessonsWatched} testsCompleted={testsCompleted} onBack={() => navigate('Home')} />}
        {screen === 'Vazifalar' && <TestScreen onBack={() => navigate('Home')} coins={coins} addCoins={addCoins} onTestComplete={onTestComplete} />}
        {screen === 'Oyinlar'  && <GameScreen onBack={() => navigate('Home')} coins={coins} addCoins={addCoins} onGameComplete={onGameComplete} />}
        {screen === 'Xavfsizlik' && (
          <PlaceholderScreen title={screen} onBack={() => navigate('Home')} />
        )}
      </View>
      <BottomTabBar activeTab={activeTab} onTabPress={handleTabPress} />
    </View>
  );
}

function PlaceholderScreen({ title, onBack }) {
  const { LinearGradient } = require('expo-linear-gradient');
  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <LinearGradient colors={['#1E40AF', '#2563EB']} style={{ paddingTop: 50, paddingBottom: 20, paddingHorizontal: 20 }}>
        <TouchableOpacity onPress={onBack} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Feather name="arrow-left" size={22} color="#fff" />
          <Text style={{ fontSize: 20, fontWeight: '800', color: '#fff' }}>{title}</Text>
        </TouchableOpacity>
      </LinearGradient>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: '#EFF6FF', alignItems: 'center', justifyContent: 'center' }}>
          <Feather name="layers" size={36} color="#2563EB" />
        </View>
        <Text style={{ fontSize: 18, fontWeight: '700', color: '#1E293B' }}>Tez orada...</Text>
        <Text style={{ fontSize: 14, color: '#94A3B8', textAlign: 'center', paddingHorizontal: 40 }}>
          Bu bo'lim hali ishlab chiqilmoqda. Tez orada tayyor bo'ladi!
        </Text>
        <TouchableOpacity onPress={onBack} style={{ backgroundColor: '#2563EB', borderRadius: 14, paddingHorizontal: 24, paddingVertical: 12 }}>
          <Text style={{ fontSize: 14, fontWeight: '700', color: '#fff' }}>Ortga qaytish</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { flex: 1 },
});

const parentStyles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingBottom: 24,
    paddingTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 10,
  },
  tab: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 3 },
  tabLabel: { fontSize: 10, color: '#94A3B8', fontWeight: '500' },
  tabLabelActive: { color: '#2563EB', fontWeight: '700' },
  dot: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#2563EB', marginTop: 1 },
});
