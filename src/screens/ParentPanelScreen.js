import { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  StatusBar, Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
export default function ParentPanelScreen({ stats = {}, onBack }) {
  const [showAlert, setShowAlert] = useState(true);

  const { lessonsWatched = 0, testsCompleted = 0, lastTestScore = null, coins = 0 } = stats;

  const testPct = lastTestScore
    ? Math.round((lastTestScore.correct / lastTestScore.total) * 100)
    : null;

  // Safety score: higher test result = lower risk. No tests yet = 50%
  const score = testPct !== null ? Math.round(100 - testPct) : 50;

  const ACTIVITY = [
    { icon: 'calendar', label: 'Bugungi darslar', value: `${lessonsWatched} ta`, color: '#3B82F6' },
    { icon: 'file-text', label: 'Test natijasi', value: testPct !== null ? `${testPct}%` : '—', color: '#22C55E' },
    { icon: 'award', label: 'Yig\'ilgan tangalar', value: `${coins} 🪙`, color: '#F97316' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Feather name="chevron-left" size={26} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ota-ona paneli</Text>
        <TouchableOpacity style={styles.bellBtn}>
          <Feather name="bell" size={22} color="#1E293B" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Child card */}
        <View style={styles.childCard}>
          <View style={styles.childAvatar}>
            <Image source={require('../../assets/boy.png')} style={styles.childImg} resizeMode="contain" />
          </View>
          <View style={styles.childInfo}>
            <Text style={styles.childName}>Jasur</Text>
            <Text style={styles.childGrade}>6-sinf</Text>
            <View style={styles.onlineRow}>
              <View style={styles.onlineDot} />
              <Text style={styles.onlineText}>Online</Text>
            </View>
          </View>
        </View>

        {/* Psychology card */}
        {showAlert && (
          <LinearGradient colors={['#2563EB', '#1D4ED8']} style={styles.psychCard} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
            <View style={styles.psychHeader}>
              <Text style={styles.psychTitle}>Psixologik holat tahlili</Text>
              <TouchableOpacity onPress={() => setShowAlert(false)}>
                <Feather name="x" size={18} color="rgba(255,255,255,0.8)" />
              </TouchableOpacity>
            </View>

            {/* Score row */}
            <View style={styles.scoreRow}>
              <Text style={styles.scoreBig}>{score}%</Text>
              <Text style={styles.scoreSmall}> 0%</Text>
            </View>
            <Text style={styles.scoreLevel}>
              Xavf darajasi: {score < 30 ? 'Past 🟢' : score < 60 ? "O'rta 🟡" : 'Yuqori 🔴'}
            </Text>

            {/* Gauge */}
            <View style={styles.gaugeWrap}>
              <View style={styles.gaugeBar}>
                <View style={[styles.gaugeSegment, { backgroundColor: '#22C55E', flex: 2 }]} />
                <View style={[styles.gaugeSegment, { backgroundColor: '#86EFAC', flex: 1 }]} />
                <View style={[styles.gaugeSegment, { backgroundColor: '#FCD34D', flex: 1 }]} />
                <View style={[styles.gaugeSegment, { backgroundColor: '#FB923C', flex: 1 }]} />
                <View style={[styles.gaugeSegment, { backgroundColor: '#EF4444', flex: 1 }]} />
              </View>
              {/* Needle indicator */}
              <View style={[styles.needle, { left: `${score}%` }]}>
                <Feather name="chevron-down" size={18} color="#fff" />
              </View>
            </View>

            {/* Red bar */}
            <View style={styles.redBarBg}>
              <View style={[styles.redBarFill, { width: `${score}%` }]} />
            </View>

            <Text style={styles.psychNote}>
              {testsCompleted === 0
                ? "Hali test yechilmagan. Farzandingiz testni yechsin."
                : score < 30
                  ? "Farzandingiz internetda xavfsizlikni yaxshi biladi! ✅"
                  : score < 60
                    ? "Bolada bir oz xavotir belgilari aniqlangan.\nKo'proq e'tibor bering."
                    : "Farzandingizga internetda xavfsizlik bo'yicha qo'shimcha tushuntirish kerak! ⚠️"}
            </Text>
          </LinearGradient>
        )}

        {/* Activity */}
        <View style={styles.activityCard}>
          <Text style={styles.sectionTitle}>Faoliyati</Text>
          {ACTIVITY.map((item, i) => (
            <View key={i} style={[styles.activityRow, i < ACTIVITY.length - 1 && styles.activityBorder]}>
              <View style={[styles.activityIcon, { backgroundColor: item.color + '20' }]}>
                <Feather name={item.icon} size={18} color={item.color} />
              </View>
              <Text style={styles.activityLabel}>{item.label}</Text>
              <Text style={[styles.activityValue, { color: item.color }]}>{item.value}</Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F6FB' },
  scroll: { paddingBottom: 24 },

  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 54,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  backBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#1E293B' },
  bellBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },

  /* Child card */
  childCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 18,
    marginHorizontal: 16,
    marginBottom: 14,
    padding: 14,
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  childAvatar: {
    width: 58, height: 58, borderRadius: 29,
    backgroundColor: '#BFDBFE',
    alignItems: 'center', justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  childImg: { width: 66, height: 66 },
  childInfo: { gap: 2 },
  childName: { fontSize: 16, fontWeight: '800', color: '#1E293B' },
  childGrade: { fontSize: 13, color: '#64748B' },
  onlineRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 2 },
  onlineDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#22C55E' },
  onlineText: { fontSize: 12, color: '#22C55E', fontWeight: '600' },

  /* Psychology card */
  psychCard: {
    borderRadius: 20,
    marginHorizontal: 16,
    marginBottom: 14,
    padding: 18,
  },
  psychHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  psychTitle: { fontSize: 14, fontWeight: '700', color: '#fff' },
  scoreRow: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: 2 },
  scoreBig: { fontSize: 40, fontWeight: '900', color: '#fff', lineHeight: 44 },
  scoreSmall: { fontSize: 16, fontWeight: '600', color: 'rgba(255,255,255,0.7)', marginBottom: 6 },
  scoreLevel: { fontSize: 13, color: 'rgba(255,255,255,0.85)', marginBottom: 14, fontWeight: '500' },
  gaugeWrap: { marginBottom: 10, position: 'relative' },
  gaugeBar: { flexDirection: 'row', height: 10, borderRadius: 6, overflow: 'hidden', gap: 2 },
  gaugeSegment: { height: '100%' },
  needle: { position: 'absolute', top: -6, marginLeft: -9 },
  redBarBg: { height: 6, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 3, overflow: 'hidden', marginBottom: 12 },
  redBarFill: { height: '100%', backgroundColor: '#EF4444', borderRadius: 3 },
  psychNote: { fontSize: 12, color: 'rgba(255,255,255,0.9)', lineHeight: 18 },

  /* Activity */
  activityCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    marginHorizontal: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#1E293B', marginBottom: 12 },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  activityBorder: { borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  activityIcon: {
    width: 38, height: 38, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center',
  },
  activityLabel: { flex: 1, fontSize: 14, fontWeight: '600', color: '#1E293B' },
  activityValue: { fontSize: 14, fontWeight: '800' },
});
