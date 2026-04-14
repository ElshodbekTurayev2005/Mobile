import { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
  ScrollView, StatusBar, Linking, Image,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const AGE_GROUPS = ['Barchasi', '1-5 yosh', '6-12 yosh', '13-16 yosh'];

const CATEGORIES = ['Barchasi', 'Internet xavfsizligi', 'Shaxsiy xavfsizlik', 'Onlayn o\'yinlar'];

const LESSONS = [
  {
    id: 1,
    title: "Dono & Momomo | Bolalar uchun multfilm | Qiziqarli qismlar",
    sub: "Internet xavfsizligi",
    duration: '12:30',
    videoId: 'J4wVgZRTp0U',
    videoUrl: 'https://youtu.be/J4wVgZRTp0U',
    category: 'Internet xavfsizligi',
    ageGroup: '1-5 yosh',
  },
  {
    id: 2,
    title: '"Uy" animatsion filmi',
    sub: "Shaxsiy xavfsizlik",
    duration: '10:45',
    videoId: 'Fbb9ORcLHpI',
    videoUrl: 'https://youtu.be/Fbb9ORcLHpI',
    category: 'Shaxsiy xavfsizlik',
    ageGroup: '1-5 yosh',
  },
  {
    id: 3,
    title: "TANLOV | Animatsion film",
    sub: "Onlayn o'yinlar",
    duration: '11:20',
    videoId: 'lb3jpH96gD8',
    videoUrl: 'https://youtu.be/lb3jpH96gD8',
    category: "Onlayn o'yinlar",
    ageGroup: '1-5 yosh',
  },
  {
    id: 4,
    title: 'Konstitutsiyaga sayohat (1-qism), "Muqaddima"',
    sub: "Shaxsiy xavfsizlik",
    duration: '13:15',
    videoId: '0PUGEMi88Uw',
    videoUrl: 'https://youtu.be/0PUGEMi88Uw',
    category: 'Shaxsiy xavfsizlik',
    ageGroup: '6-12 yosh',
  },
  {
    id: 5,
    title: '"Lex polvon"dan maslahatlar! Sumkadagi sarguzashtlar 2-qism',
    sub: "Shaxsiy xavfsizlik",
    duration: '8:40',
    videoId: 'AbY6VRspAt0',
    videoUrl: 'https://youtu.be/AbY6VRspAt0',
    category: 'Shaxsiy xavfsizlik',
    ageGroup: '6-12 yosh',
  },
  {
    id: 6,
    title: "The Bullying Moster - Vanish",
    sub: "Internet xavfsizligi",
    duration: '9:15',
    videoId: 't8NfkR9eTZc',
    videoUrl: 'https://youtu.be/t8NfkR9eTZc',
    category: 'Internet xavfsizligi',
    ageGroup: '6-12 yosh',
  },
  {
    id: 7,
    title: "Online Privacy for Kids - Internet Safety and Security for Kids",
    sub: "Shaxsiy xavfsizlik",
    duration: '10:00',
    videoId: 'yiKeLOKc1tw',
    videoUrl: 'https://youtu.be/yiKeLOKc1tw',
    category: 'Shaxsiy xavfsizlik',
    ageGroup: '13-16 yosh',
  },
  {
    id: 8,
    title: "Zararli Odatlar",
    sub: "Internet xavfsizligi",
    duration: '11:45',
    videoId: 'BdTXIij9Io4',
    videoUrl: 'https://youtu.be/BdTXIij9Io4',
    category: 'Internet xavfsizligi',
    ageGroup: '13-16 yosh',
  },
  {
    id: 9,
    title: "Inson hayotida ta'limning o'rni",
    sub: "Onlayn o'yinlar",
    duration: '9:50',
    videoId: 'd1FjiE0fHDw',
    videoUrl: 'https://youtu.be/d1FjiE0fHDw',
    category: "Onlayn o'yinlar",
    ageGroup: '13-16 yosh',
  },
];

export default function DaralarScreen({ onLessonWatch, initialCategory = 'Barchasi', onBack }) {
  const [activeAge, setActiveAge] = useState('Barchasi');
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const filtered = LESSONS.filter(l =>
    (activeAge === 'Barchasi' || l.ageGroup === activeAge) &&
    (activeCategory === 'Barchasi' || l.category === activeCategory)
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerSpacer} onPress={onBack}>
          <Feather name="chevron-left" size={26} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Darslar</Text>
        <TouchableOpacity style={styles.bellBtn}>
          <Feather name="bell" size={20} color="#1E293B" />
        </TouchableOpacity>
      </View>

      {/* Age group pills */}
      <View style={styles.ageRow}>
        {AGE_GROUPS.map(age => (
          <TouchableOpacity
            key={age}
            style={[styles.agePill, activeAge === age && styles.agePillActive]}
            onPress={() => setActiveAge(age)}
            activeOpacity={0.8}
          >
            <Text style={[styles.agePillText, activeAge === age && styles.agePillTextActive]}>
              {age}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Category tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.catScroll}
        contentContainerStyle={styles.catRow}
      >
        {CATEGORIES.map(cat => (
          <TouchableOpacity
            key={cat}
            style={[styles.catTab, activeCategory === cat && styles.catTabActive]}
            onPress={() => setActiveCategory(cat)}
            activeOpacity={0.8}
          >
            <Text style={[styles.catText, activeCategory === cat && styles.catTextActive]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Lesson list */}
      <FlatList
        data={filtered}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <LessonCard lesson={item} onLessonWatch={onLessonWatch} />}
      />
    </View>
  );
}

function LessonCard({ lesson, onLessonWatch }) {
  const thumbUrl = `https://img.youtube.com/vi/${lesson.videoId}/mqdefault.jpg`;

  const handlePress = () => {
    onLessonWatch && onLessonWatch();
    Linking.openURL(lesson.videoUrl);
  };

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={handlePress}
    >
      {/* YouTube Thumbnail */}
      <View style={styles.thumbWrap}>
        <Image
          source={{ uri: thumbUrl }}
          style={styles.thumbImg}
          resizeMode="cover"
        />
        {/* Play button overlay */}
        <View style={styles.playOverlay}>
          <View style={styles.playBtn}>
            <Feather name="play" size={14} color="#fff" />
          </View>
        </View>
        {/* Duration badge */}
        <View style={styles.timeBadge}>
          <Text style={styles.timeBadgeText}>{lesson.duration}</Text>
        </View>
      </View>

      {/* Content */}
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={2}>{lesson.title}</Text>
        <View style={styles.cardMeta}>
          <Feather name="tag" size={11} color="#2563EB" />
          <Text style={styles.cardCat}>{lesson.sub}</Text>
        </View>
        <View style={styles.cardBottom}>
          <Feather name="clock" size={11} color="#94A3B8" />
          <Text style={styles.cardDuration}>{lesson.duration}</Text>
          <View style={styles.ytBadge}>
            <Feather name="youtube" size={11} color="#EF4444" />
            <Text style={styles.ytText}>YouTube</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },

  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 56,
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: '#fff',
  },
  headerSpacer: { width: 32 },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#1E293B' },
  bellBtn: {
    width: 32, height: 32, alignItems: 'center', justifyContent: 'center',
  },

  /* Age pills */
  ageRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  agePill: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
  },
  agePillActive: { backgroundColor: '#2563EB' },
  agePillText: { fontSize: 13, fontWeight: '600', color: '#64748B' },
  agePillTextActive: { color: '#fff' },

  /* Category tabs */
  catScroll: { backgroundColor: '#fff', maxHeight: 52 },
  catRow: {
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  catTab: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
  },
  catTabActive: { backgroundColor: '#EFF6FF' },
  catText: { fontSize: 13, fontWeight: '500', color: '#64748B' },
  catTextActive: { color: '#2563EB', fontWeight: '700' },

  /* List */
  list: { padding: 16, gap: 12 },

  /* Card */
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },

  /* Thumbnail */
  thumbWrap: {
    width: 110,
    height: 82,
  },
  thumbImg: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E2E8F0',
  },
  playOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  playBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 2,
  },
  timeBadge: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: 'rgba(0,0,0,0.65)',
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  timeBadgeText: { fontSize: 9, color: '#fff', fontWeight: '700' },

  /* Content */
  cardContent: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 5,
    justifyContent: 'center',
  },
  cardTitle: { fontSize: 13, fontWeight: '800', color: '#1E293B', lineHeight: 18 },
  cardMeta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  cardCat: { fontSize: 11, color: '#2563EB', fontWeight: '600' },
  cardBottom: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  cardDuration: { fontSize: 11, color: '#94A3B8', flex: 1 },
  ytBadge: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  ytText: { fontSize: 10, color: '#EF4444', fontWeight: '600' },
});
