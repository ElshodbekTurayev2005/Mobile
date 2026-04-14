import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Dimensions, StatusBar, Image,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { currentUser } from '../data/mockData';

const { width } = Dimensions.get('window');
const CARD_SIZE = (width - 48) / 2;

const sections = [
  {
    id: 1,
    icon: 'book-open',
    label: 'Darslar',
    sub: 'Multifilm ko\'rinishida',
    bg: '#E8F4FF',
    iconBg: '#3B82F6',
    screen: 'Daralar',
  },
  {
    id: 2,
    icon: 'edit-3',
    label: 'Testlar',
    sub: 'Bilimingni sinab ko\'!',
    bg: '#E8FFF0',
    iconBg: '#22C55E',
    screen: 'Vazifalar',
  },
  {
    id: 3,
    icon: 'zap',
    label: 'O\'yinlar',
    sub: 'Coin yig\'va yutuq qazon',
    bg: '#FFF4E6',
    iconBg: '#F97316',
    screen: 'Oyinlar',
  },
  {
    id: 4,
    icon: 'message-circle',
    label: 'AI Chat',
    sub: 'Savoling bormi? So\'ra!',
    bg: '#F3EEFF',
    iconBg: '#8B5CF6',
    screen: 'AIChat',
  },
];

export default function HomeScreen({ onNavigate, coins = 0, onBack }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Top section — header + lesson card + monkey overlay */}
        <View style={styles.topSection}>

          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerRow}>
              <TouchableOpacity onPress={onBack} style={styles.backBtn}>
                <Feather name="chevron-left" size={26} color="#1E293B" />
              </TouchableOpacity>
              <Text style={styles.greeting}>Salom, {currentUser.name}! 👋</Text>
              <View style={styles.coinBadge}>
                <Text style={styles.coinIcon}>🪙</Text>
                <Text style={styles.coinText}>{coins}</Text>
              </View>
            </View>
            <Text style={styles.subGreeting}>Bugun yangi bilim olishga{'\n'}tayyormisan?</Text>
          </View>

          {/* Lesson card */}
          <View style={styles.lessonCard}>
            <View style={styles.lessonLeft}>
              <Text style={styles.lessonLabel}>Bugungi dars</Text>
              <Text style={styles.lessonTitle}>Internetdagi xavflar</Text>
              <Text style={styles.lessonMeta}>15 daqiqa • Multifilm</Text>
            </View>
            <TouchableOpacity
              style={styles.playBtn}
              onPress={() => onNavigate('DaralarInternet')}
              activeOpacity={0.85}
            >
              <Feather name="play" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Monkey — overlaps header & card */}
          <Image
            source={require('../../assets/mokey.png')}
            style={styles.monkeyImage}
            resizeMode="contain"
            pointerEvents="none"
          />

        </View>

        {/* Bo'limlar */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bo'limlar</Text>
          <View style={styles.grid}>
            {sections.map(item => (
              <TouchableOpacity
                key={item.id}
                style={[styles.gridCard, { backgroundColor: item.bg }]}
                onPress={() => onNavigate(item.screen)}
                activeOpacity={0.85}
              >
                <View style={[styles.gridIcon, { backgroundColor: item.iconBg }]}>
                  <Feather name={item.icon} size={20} color="#fff" />
                </View>
                <Text style={styles.gridLabel}>{item.label}</Text>
                <Text style={styles.gridSub}>{item.sub}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F6FB' },

  /* Top section wrapper */
  topSection: {
    backgroundColor: '#fff',
    paddingBottom: 20,
  },

  /* Header */
  header: {
    paddingTop: 56,
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  backBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  greeting: { fontSize: 22, fontWeight: '800', color: '#1E293B' },
  subGreeting: { fontSize: 14, color: '#64748B', lineHeight: 20 },
  coinBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FEF3C7',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  coinIcon: { fontSize: 14 },
  coinText: { fontSize: 15, fontWeight: '800', color: '#92400E' },

  /* Lesson card */
  lessonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F1F5FF',
    borderRadius: 20,
    marginHorizontal: 16,
    marginTop: 12,
    padding: 18,
    paddingRight: 80,
  },
  lessonLeft: { flex: 1 },
  lessonLabel: { fontSize: 12, color: '#94A3B8', fontWeight: '500', marginBottom: 5 },
  lessonTitle: { fontSize: 17, fontWeight: '800', color: '#1E293B', marginBottom: 4 },
  lessonMeta: { fontSize: 12, color: '#64748B' },
  playBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },

  /* Monkey overlay */
  monkeyImage: {
    width: 175,
    height: 175,
    position: 'absolute',
    right: 0,
    top: 65,
  },

  /* Bo'limlar */
  section: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 14,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  gridCard: {
    width: CARD_SIZE,
    borderRadius: 20,
    padding: 16,
    gap: 10,
  },
  gridIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridLabel: { fontSize: 15, fontWeight: '800', color: '#1E293B' },
  gridSub: { fontSize: 12, color: '#64748B', lineHeight: 17 },
});
