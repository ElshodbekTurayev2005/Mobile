import { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
  ScrollView, StatusBar,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const FILTERS = ['Barchasi', 'Xavf', 'Tavsiyalar', 'Tizim'];

function buildNotifications(stats = {}) {
  const { lessonsWatched = 0, testsCompleted = 0, lastTestScore = null, coins = 0 } = stats;
  const now = new Date();
  const timeStr = now.toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });

  const list = [];

  // ── Test result notification ──
  if (testsCompleted > 0 && lastTestScore) {
    const pct = Math.round((lastTestScore.correct / lastTestScore.total) * 100);
    if (pct < 50) {
      list.push({
        id: 'xavf-test',
        type: 'Xavf',
        icon: 'alert-triangle',
        iconBg: '#FEE2E2',
        iconColor: '#EF4444',
        title: 'Xavf aniqlangan',
        message: `Farzandingiz testda faqat ${pct}% to'g'ri javob berdi. Qo'shimcha o'rganish kerak.`,
        time: timeStr,
      });
    } else {
      list.push({
        id: 'test-result',
        type: 'Tizim',
        icon: 'file-text',
        iconBg: '#DBEAFE',
        iconColor: '#3B82F6',
        title: 'Test natijasi',
        message: `Farzandingiz testni ${pct}% natija bilan yakunladi. ${pct >= 80 ? 'Ajoyib natija! 🏆' : 'Yaxshi harakat! 👍'}`,
        time: timeStr,
      });
    }
  }

  // ── Lessons watched notification ──
  if (lessonsWatched > 0) {
    list.push({
      id: 'dars-watched',
      type: 'Tizim',
      icon: 'play-circle',
      iconBg: '#DCFCE7',
      iconColor: '#22C55E',
      title: 'Darslar ko\'rildi',
      message: `Farzandingiz bugun ${lessonsWatched} ta dars ko'rdi.`,
      time: timeStr,
    });
  }

  // ── Coins earned notification ──
  if (coins > 0) {
    list.push({
      id: 'coins',
      type: 'Tizim',
      icon: 'star',
      iconBg: '#FEF3C7',
      iconColor: '#F59E0B',
      title: 'Tangalar yig\'ildi',
      message: `Farzandingiz jami ${coins} ta tanga yig'di. Zo'r natija!`,
      time: timeStr,
    });
  }

  // ── Recommendations based on performance ──
  if (testsCompleted === 0 && lessonsWatched === 0) {
    list.push({
      id: 'rec-start',
      type: 'Tavsiyalar',
      icon: 'zap',
      iconBg: '#FEF3C7',
      iconColor: '#F59E0B',
      title: 'Tavsiyalar',
      message: 'Farzandingiz hali hech qanday dars ko\'rmagan. Birinchi darsni birga ko\'ring!',
      time: timeStr,
    });
  } else if (lastTestScore && Math.round((lastTestScore.correct / lastTestScore.total) * 100) < 70) {
    list.push({
      id: 'rec-improve',
      type: 'Tavsiyalar',
      icon: 'zap',
      iconBg: '#FEF3C7',
      iconColor: '#F59E0B',
      title: 'Tavsiyalar',
      message: '"Internet xavfsizligi" darslari tavsiya etildi. Farzandingiz bilan birga o\'qing.',
      time: timeStr,
    });
  } else {
    list.push({
      id: 'rec-great',
      type: 'Tavsiyalar',
      icon: 'zap',
      iconBg: '#FEF3C7',
      iconColor: '#F59E0B',
      title: 'Tavsiyalar',
      message: '"Onlayn do\'stliklar" darsi tavsiya etildi. Ko\'rib chiqing.',
      time: timeStr,
    });
  }

  // ── Risk alert if test score very low ──
  if (lastTestScore && Math.round((lastTestScore.correct / lastTestScore.total) * 100) < 30) {
    list.push({
      id: 'xavf-low',
      type: 'Xavf',
      icon: 'alert-triangle',
      iconBg: '#FEE2E2',
      iconColor: '#EF4444',
      title: 'Jiddiy xavf',
      message: 'Farzandingiz internet xavfsizligi bo\'yicha bilimi juda past. Zudlik bilan e\'tibor bering!',
      time: timeStr,
    });
  }

  // ── Default system message ──
  list.push({
    id: 'system-default',
    type: 'Tizim',
    icon: 'bell',
    iconBg: '#DCFCE7',
    iconColor: '#22C55E',
    title: 'Tizim',
    message: `Yangi darslar qo'shildi. Ko'rib chiqing.`,
    time: '12:00',
  });

  return list;
}

export default function NotificationsScreen({ onBack, stats = {} }) {
  const [filter, setFilter] = useState('Barchasi');
  const notifications = buildNotifications(stats);

  const filtered = notifications.filter(n =>
    filter === 'Barchasi' || n.type === filter
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Feather name="chevron-left" size={26} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bildirishnomalar</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Filter tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterScroll}
        contentContainerStyle={styles.filterRow}
      >
        {FILTERS.map(f => (
          <TouchableOpacity
            key={f}
            style={[styles.filterTab, filter === f && styles.filterTabActive]}
            onPress={() => setFilter(f)}
            activeOpacity={0.8}
          >
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* List */}
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={[styles.iconWrap, { backgroundColor: item.iconBg }]}>
              <Feather name={item.icon} size={20} color={item.iconColor} />
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardMessage}>{item.message}</Text>
            </View>
            <Text style={styles.cardTime}>{item.time}</Text>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Feather name="bell-off" size={40} color="#CBD5E1" />
            <Text style={styles.emptyText}>Bildirishnoma yo'q</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F6FB' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 54,
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  backBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#1E293B' },
  headerSpacer: { width: 36 },

  filterScroll: { maxHeight: 52 },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  filterTab: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  filterTabActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  filterText: { fontSize: 13, fontWeight: '600', color: '#64748B' },
  filterTextActive: { color: '#fff' },

  list: { padding: 16, gap: 10 },

  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  iconWrap: {
    width: 44, height: 44, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
  },
  cardContent: { flex: 1 },
  cardTitle: { fontSize: 14, fontWeight: '800', color: '#1E293B', marginBottom: 4 },
  cardMessage: { fontSize: 12, color: '#64748B', lineHeight: 17 },
  cardTime: { fontSize: 11, color: '#94A3B8', fontWeight: '500', marginTop: 2 },

  empty: { alignItems: 'center', paddingTop: 80, gap: 12 },
  emptyText: { fontSize: 15, color: '#94A3B8', fontWeight: '500' },
});
