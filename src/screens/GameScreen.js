import { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  StatusBar, Animated, Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const SCENARIOS = [
  { text: "Noma'lum kishidan do'stlik so'rovi keldi", safe: false, emoji: '👤' },
  { text: "Ota-onam bilan birgalikda onlayn o'yin o'ynamoqdaman", safe: true, emoji: '🎮' },
  { text: "Begona kishi uyimning manzilini so'radi", safe: false, emoji: '🏠' },
  { text: "O'qituvchim elektron dars materiallari yubordi", safe: true, emoji: '📚' },
  { text: "Noma'lum havolaga (link) bosdim", safe: false, emoji: '🔗' },
  { text: "Parolimni hech kimga aytmayman", safe: true, emoji: '🔒' },
  { text: "Kimdir sovg'a va'da qilib ma'lumotlarimni so'radi", safe: false, emoji: '🎁' },
  { text: "Ota-onamga internetdagi muammoni aytdim", safe: true, emoji: '👨‍👩‍👦' },
  { text: "Noma'lum saytga bank kartam raqamini yozdim", safe: false, emoji: '💳' },
  { text: "Xavfsiz saytdan dars materiallarini yuklab oldim", safe: true, emoji: '✅' },
  { text: "Kimdir 'Seni kuzatyapman' dedi — e'tibor bermadim", safe: false, emoji: '👁' },
  { text: "Shubhali xabarni o'chirib, ota-onamga ko'rsatdim", safe: true, emoji: '🛡' },
];

const TOTAL_TIME = 30;

export default function GameScreen({ onBack, addCoins, coins = 0, onGameComplete }) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [earned, setEarned] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [feedback, setFeedback] = useState(null); // 'correct' | 'wrong' | null
  const [finished, setFinished] = useState(false);

  const flashAnim = useRef(new Animated.Value(0)).current;
  const cardAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (finished) return;
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timer); setFinished(true); onGameComplete && onGameComplete(score, index); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [finished]);

  const showFeedback = (correct) => {
    setFeedback(correct ? 'correct' : 'wrong');
    Animated.sequence([
      Animated.timing(flashAnim, { toValue: 1, duration: 120, useNativeDriver: true }),
      Animated.timing(flashAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]).start();

    setTimeout(() => {
      setFeedback(null);
      if (index + 1 >= SCENARIOS.length) {
        setFinished(true);
        onGameComplete && onGameComplete(score, SCENARIOS.length);
      } else {
        Animated.sequence([
          Animated.timing(cardAnim, { toValue: 0, duration: 150, useNativeDriver: true }),
          Animated.timing(cardAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
        ]).start();
        setIndex(i => i + 1);
      }
    }, 500);
  };

  const handleAnswer = (playerSaidSafe) => {
    if (feedback) return;
    const scenario = SCENARIOS[index];
    const correct = playerSaidSafe === scenario.safe;
    if (correct) {
      setScore(s => s + 1);
      setEarned(e => e + 10);
      addCoins && addCoins(10);
    }
    showFeedback(correct);
  };

  if (finished) {
    return (
      <GameResult
        score={score}
        total={SCENARIOS.length}
        earned={earned}
        onBack={onBack}
        onRetry={() => {
          setIndex(0); setScore(0); setEarned(0);
          setTimeLeft(TOTAL_TIME); setFinished(false); setFeedback(null);
        }}
      />
    );
  }

  const scenario = SCENARIOS[index];
  const timerPct = (timeLeft / TOTAL_TIME) * 100;
  const timerColor = timeLeft > 15 ? '#22C55E' : timeLeft > 7 ? '#F59E0B' : '#EF4444';

  const flashColor = flashAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(0,0,0,0)', feedback === 'correct' ? 'rgba(34,197,94,0.25)' : 'rgba(239,68,68,0.25)'],
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Animated.View style={[StyleSheet.absoluteFillObject, { backgroundColor: flashColor, zIndex: 99, pointerEvents: 'none' }]} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Feather name="chevron-left" size={26} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>O'yin</Text>
        <View style={styles.coinBadge}>
          <Text style={styles.coinIcon}>🪙</Text>
          <Text style={styles.coinText}>{coins}</Text>
        </View>
      </View>

      {/* Timer + score row */}
      <View style={styles.infoRow}>
        <View style={styles.timerWrap}>
          <Feather name="clock" size={14} color={timerColor} />
          <Text style={[styles.timerText, { color: timerColor }]}>{timeLeft}s</Text>
        </View>
        <View style={styles.timerBarBg}>
          <View style={[styles.timerBarFill, { width: `${timerPct}%`, backgroundColor: timerColor }]} />
        </View>
        <View style={styles.scorePill}>
          <Text style={styles.scoreText}>{score}/{index}</Text>
        </View>
      </View>

      {/* Progress dots */}
      <View style={styles.dotsRow}>
        {SCENARIOS.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i < index && styles.dotDone,
              i === index && styles.dotActive,
            ]}
          />
        ))}
      </View>

      {/* Instruction */}
      <Text style={styles.instruction}>Bu holat xavfsizmi yoki xavflimi?</Text>

      {/* Scenario card */}
      <Animated.View style={[styles.card, { opacity: cardAnim, transform: [{ scale: cardAnim }] }]}>
        <Text style={styles.cardEmoji}>{scenario.emoji}</Text>
        <Text style={styles.cardText}>{scenario.text}</Text>
      </Animated.View>

      {/* Feedback label */}
      <View style={styles.feedbackWrap}>
        {feedback === 'correct' && (
          <View style={[styles.feedbackBadge, { backgroundColor: '#DCFCE7' }]}>
            <Feather name="check-circle" size={16} color="#22C55E" />
            <Text style={[styles.feedbackText, { color: '#15803D' }]}>To'g'ri! +10 🪙</Text>
          </View>
        )}
        {feedback === 'wrong' && (
          <View style={[styles.feedbackBadge, { backgroundColor: '#FEE2E2' }]}>
            <Feather name="x-circle" size={16} color="#EF4444" />
            <Text style={[styles.feedbackText, { color: '#DC2626' }]}>Noto'g'ri!</Text>
          </View>
        )}
      </View>

      {/* Answer buttons */}
      <View style={styles.btnRow}>
        <TouchableOpacity
          style={[styles.answerBtn, styles.unsafeBtn]}
          onPress={() => handleAnswer(false)}
          activeOpacity={0.85}
        >
          <Feather name="x-circle" size={28} color="#fff" />
          <Text style={styles.answerBtnText}>XAVFLI</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.answerBtn, styles.safeBtn]}
          onPress={() => handleAnswer(true)}
          activeOpacity={0.85}
        >
          <Feather name="shield" size={28} color="#fff" />
          <Text style={styles.answerBtnText}>XAVFSIZ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function GameResult({ score, total, earned, onBack, onRetry }) {
  const pct = Math.round((score / total) * 100);
  return (
    <View style={styles.resultContainer}>
      <Text style={styles.resultEmoji}>{pct >= 80 ? '🏆' : pct >= 50 ? '👍' : '📚'}</Text>
      <Text style={styles.resultTitle}>{pct >= 80 ? 'Zo\'r natija!' : pct >= 50 ? 'Yaxshi!' : 'Harakat qiling!'}</Text>
      <Text style={styles.resultScore}>{score}/{total} to'g'ri javob — {pct}%</Text>
      <View style={styles.earnedBox}>
        <Text style={styles.earnedEmoji}>🪙</Text>
        <Text style={styles.earnedAmount}>+{earned} tanga</Text>
        <Text style={styles.earnedSub}>bu o'yindan qo'lga kiritildi</Text>
      </View>
      <View style={styles.resultBtns}>
        <TouchableOpacity style={styles.retryBtn} onPress={onRetry}>
          <Text style={styles.retryText}>Qayta o'ynash</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.homeBtn} onPress={onBack}>
          <Text style={styles.homeText}>Chiqish</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },

  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingTop: 52, paddingHorizontal: 20, paddingBottom: 8,
  },
  backBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#1E293B' },
  coinBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: '#FEF3C7', borderRadius: 20,
    paddingHorizontal: 12, paddingVertical: 6,
  },
  coinIcon: { fontSize: 14 },
  coinText: { fontSize: 14, fontWeight: '800', color: '#92400E' },

  infoRow: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    paddingHorizontal: 20, marginBottom: 10,
  },
  timerWrap: { flexDirection: 'row', alignItems: 'center', gap: 4, minWidth: 42 },
  timerText: { fontSize: 13, fontWeight: '800' },
  timerBarBg: {
    flex: 1, height: 6, backgroundColor: '#E2E8F0', borderRadius: 3, overflow: 'hidden',
  },
  timerBarFill: { height: '100%', borderRadius: 3 },
  scorePill: {
    backgroundColor: '#EFF6FF', borderRadius: 12,
    paddingHorizontal: 10, paddingVertical: 3,
  },
  scoreText: { fontSize: 12, fontWeight: '700', color: '#2563EB' },

  dotsRow: {
    flexDirection: 'row', gap: 5, justifyContent: 'center',
    paddingHorizontal: 20, marginBottom: 14, flexWrap: 'wrap',
  },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#E2E8F0' },
  dotDone: { backgroundColor: '#22C55E' },
  dotActive: { backgroundColor: '#2563EB', transform: [{ scale: 1.3 }] },

  instruction: {
    fontSize: 13, color: '#94A3B8', textAlign: 'center',
    fontWeight: '600', marginBottom: 12,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    marginHorizontal: 20,
    padding: 28,
    alignItems: 'center',
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 6,
    minHeight: 180,
    justifyContent: 'center',
  },
  cardEmoji: { fontSize: 56 },
  cardText: {
    fontSize: 16, fontWeight: '700', color: '#1E293B',
    textAlign: 'center', lineHeight: 24,
  },

  feedbackWrap: { height: 40, alignItems: 'center', justifyContent: 'center', marginTop: 10 },
  feedbackBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8,
  },
  feedbackText: { fontSize: 14, fontWeight: '700' },

  btnRow: {
    flexDirection: 'row', gap: 14,
    paddingHorizontal: 20, marginTop: 10,
  },
  answerBtn: {
    flex: 1, borderRadius: 20, paddingVertical: 20,
    alignItems: 'center', justifyContent: 'center', gap: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35, shadowRadius: 10, elevation: 6,
  },
  safeBtn: {
    backgroundColor: '#22C55E',
    shadowColor: '#22C55E',
  },
  unsafeBtn: {
    backgroundColor: '#EF4444',
    shadowColor: '#EF4444',
  },
  answerBtnText: { fontSize: 15, fontWeight: '900', color: '#fff', letterSpacing: 1 },

  resultContainer: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#F8FAFC', padding: 32, gap: 14,
  },
  resultEmoji: { fontSize: 80 },
  resultTitle: { fontSize: 26, fontWeight: '800', color: '#1E293B' },
  resultScore: { fontSize: 16, color: '#64748B' },
  earnedBox: {
    alignItems: 'center', gap: 4,
    backgroundColor: '#FEF3C7', borderRadius: 16,
    paddingHorizontal: 28, paddingVertical: 16,
  },
  earnedEmoji: { fontSize: 32 },
  earnedAmount: { fontSize: 26, fontWeight: '900', color: '#92400E' },
  earnedSub: { fontSize: 13, color: '#B45309' },
  resultBtns: { flexDirection: 'row', gap: 12, marginTop: 8 },
  retryBtn: {
    backgroundColor: '#2563EB', borderRadius: 14,
    paddingHorizontal: 24, paddingVertical: 14,
  },
  retryText: { fontSize: 15, fontWeight: '700', color: '#fff' },
  homeBtn: {
    backgroundColor: '#F1F5F9', borderRadius: 14,
    paddingHorizontal: 24, paddingVertical: 14,
  },
  homeText: { fontSize: 15, fontWeight: '700', color: '#64748B' },
});
