import { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  StatusBar, Image,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { currentUser } from '../data/mockData';

const ACHIEVEMENTS = [
  {
    icon: 'shield',
    label: 'Xavfsizlik\nbilimdoni',
    color: '#22C55E',
    bg: '#DCFCE7',
    check: ({ lessonsWatched }) => lessonsWatched >= 1,
    hint: '1 ta dars ko\'ring',
  },
  {
    icon: 'award',
    label: 'Top tester',
    color: '#F97316',
    bg: '#FEF3C7',
    check: ({ testsCompleted }) => testsCompleted >= 1,
    hint: '1 ta test yechish',
  },
  {
    icon: 'star',
    label: 'Fidoyi\no\'quvchi',
    color: '#3B82F6',
    bg: '#DBEAFE',
    check: ({ coins }) => coins >= 50,
    hint: '50 tanga yig\'ing',
  },
];

const MENU = [
  { icon: 'download', label: 'Yuklab olingan' },
  { icon: 'heart', label: 'Sevimlilar' },
  { icon: 'settings', label: 'Sozlamalar' },
];

export default function ProfileScreen({ coins = 0, lessonsWatched = 0, testsCompleted = 0, onBack }) {
  const [name] = useState(currentUser.name);
  const stats = { coins, lessonsWatched, testsCompleted };
  const unlockedCount = ACHIEVEMENTS.filter(a => a.check(stats)).length;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Feather name="chevron-left" size={26} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profil</Text>
        <View style={styles.coinBadge}>
          <Text style={styles.coinIcon}>🪙</Text>
          <Text style={styles.coinText}>{coins}</Text>
        </View>
      </View>

      {/* Avatar */}
      <View style={styles.avatarSection}>
        <View style={styles.avatarCircle}>
          <Image
            source={require('../../assets/boy.png')}
            style={styles.avatarImg}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.userName}>{name}</Text>
        <Text style={styles.userSub}>6-sinf o'quvchisi</Text>
      </View>

      {/* Stats */}
      <View style={styles.statsCard}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{lessonsWatched}</Text>
          <Text style={styles.statLabel}>Darslar{'\n'}ko'rildi</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{testsCompleted}</Text>
          <Text style={styles.statLabel}>Testlar{'\n'}yechildi</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{unlockedCount}</Text>
          <Text style={styles.statLabel}>Yutuqlar</Text>
        </View>
      </View>

      {/* Achievements */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Yutuqlarim</Text>
        <View style={styles.achievRow}>
          {ACHIEVEMENTS.map((a, i) => {
            const unlocked = a.check(stats);
            return (
              <View key={i} style={[styles.achievCard, { backgroundColor: a.bg, opacity: unlocked ? 1 : 0.45 }]}>
                {/* Badge shield shape */}
                <View style={styles.badgeOuter}>
                  <View style={[styles.badgeInner, { backgroundColor: a.color }]}>
                    <Feather name={a.icon} size={22} color="#fff" />
                  </View>
                  {/* Checkmark if unlocked */}
                  {unlocked && (
                    <View style={styles.checkDot}>
                      <Feather name="check" size={8} color="#fff" />
                    </View>
                  )}
                </View>
                <Text style={[styles.achievLabel, { color: a.color }]}>{a.label}</Text>
                {!unlocked && (
                  <Text style={styles.hintText}>{a.hint}</Text>
                )}
              </View>
            );
          })}
        </View>
      </View>

      {/* Menu */}
      <View style={styles.menuSection}>
        {MENU.map((item, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.menuItem, i < MENU.length - 1 && styles.menuItemBorder]}
            activeOpacity={0.7}
          >
            <View style={styles.menuIconWrap}>
              <Feather name={item.icon} size={17} color="#2563EB" />
            </View>
            <Text style={styles.menuLabel}>{item.label}</Text>
            <Feather name="chevron-right" size={17} color="#CBD5E1" />
          </TouchableOpacity>
        ))}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F6FB' },

  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 54,
    paddingHorizontal: 20,
    paddingBottom: 6,
  },
  backBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#1E293B' },
  coinBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: '#FEF3C7', borderRadius: 20,
    paddingHorizontal: 12, paddingVertical: 6,
  },
  coinIcon: { fontSize: 13 },
  coinText: { fontSize: 14, fontWeight: '800', color: '#92400E' },

  /* Avatar */
  avatarSection: { alignItems: 'center', paddingTop: 10, paddingBottom: 16 },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 55,
    backgroundColor: '#BFDBFE',
    alignItems: 'center',
    justifyContent: 'flex-end',
    overflow: 'hidden',
    marginBottom: 0,
  },
  avatarImg: { width: 100, height: 100 },
  userName: { fontSize: 20, fontWeight: '800', color: '#1E293B', marginBottom: 3 },
  userSub: { fontSize: 13, color: '#64748B', fontWeight: '500' },

  /* Stats */
  statsCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 18,
    marginHorizontal: 16,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 18,
  },
  statItem: { flex: 1, alignItems: 'center', gap: 3 },
  statDivider: { width: 1, backgroundColor: '#E2E8F0', marginVertical: 4 },
  statValue: { fontSize: 20, fontWeight: '800', color: '#1E293B' },
  statLabel: { fontSize: 11, color: '#94A3B8', textAlign: 'center', lineHeight: 15 },

  /* Achievements */
  section: { paddingHorizontal: 16, marginBottom: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#1E293B', marginBottom: 12 },
  achievRow: { flexDirection: 'row', gap: 10 },
  achievCard: {
    flex: 1, borderRadius: 18, padding: 12,
    alignItems: 'center', gap: 6,
  },
  badgeOuter: {
    width: 56, height: 56,
    alignItems: 'center', justifyContent: 'center',
  },
  badgeInner: {
    width: 52, height: 52, borderRadius: 16,
    alignItems: 'center', justifyContent: 'center',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3, shadowRadius: 6, elevation: 4,
  },
  checkDot: {
    position: 'absolute', bottom: 0, right: 0,
    width: 16, height: 16, borderRadius: 8,
    backgroundColor: '#22C55E',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1.5, borderColor: '#fff',
  },
  achievLabel: { fontSize: 11, fontWeight: '700', textAlign: 'center', lineHeight: 15 },
  hintText: { fontSize: 9, color: '#94A3B8', textAlign: 'center', lineHeight: 13 },

  /* Menu */
  menuSection: {
    backgroundColor: '#fff',
    borderRadius: 18,
    marginHorizontal: 16,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 14, gap: 12,
  },
  menuItemBorder: { borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  menuIconWrap: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: '#EFF6FF',
    alignItems: 'center', justifyContent: 'center',
  },
  menuLabel: { flex: 1, fontSize: 14, fontWeight: '600', color: '#1E293B' },
});
