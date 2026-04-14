import { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  StatusBar, Image,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const OPTION_COLORS = ['#2563EB', '#059669', '#D97706', '#7C3AED'];
const OPTION_LABELS = ['A', 'B', 'C', 'D'];

const QUESTIONS = [
  // ── Set 1: Asosiy savollar ──
  {
    id: 1,
    question: "Begona odam do'stlik so'rasa nima qilasan?",
    options: [
      { id: 'a', label: "Qabul qilaman" },
      { id: 'b', label: "Rad etaman" },
      { id: 'c', label: "Ota-onamdan so'rayman" },
    ],
    correct: 'c',
  },
  {
    id: 2,
    question: "Internetda notanish kishi \"Senga sovg'am bor\" desa ishonasanmi?",
    options: [
      { id: 'a', label: "Ha, sovg'alarni yaxshi ko'raman" },
      { id: 'b', label: "Yo'q, u aldashi mumkin" },
    ],
    correct: 'b',
  },
  {
    id: 3,
    question: "Internetda yomon videolar yoki rasm ko'rib qolsang nima qilasan?",
    options: [
      { id: 'a', label: "Tezda yopib tashlayman" },
      { id: 'b', label: "Oxirigacha ko'raman" },
      { id: 'c', label: "Qo'rqib ketaman" },
    ],
    correct: 'a',
  },
  {
    id: 4,
    question: "Senga kimdir \"Bu sir, hech kimga aytma\" desa, ota-onangga aytasanmi?",
    options: [
      { id: 'a', label: "Ha, ulardan sirim yo'q" },
      { id: 'b', label: "Yo'q, sir saqlayman" },
    ],
    correct: 'a',
  },
  {
    id: 5,
    question: "Internetda kimgadir yomon gaplar yozish to'g'rimi?",
    options: [
      { id: 'a', label: "Ha, u ham yomon gapirsa bo'ladi" },
      { id: 'b', label: "Yo'q, bu mumkin emas" },
    ],
    correct: 'b',
  },
  {
    id: 6,
    question: "Telefoningda o'yin o'ynasang kayfiyating qanday bo'ladi?",
    options: [
      { id: 'a', label: "Xursand bo'laman" },
      { id: 'b', label: "Tezda jahlim chiqadi" },
      { id: 'c', label: "Charchab qolaman" },
    ],
    correct: 'a',
  },
  {
    id: 7,
    question: "Qora kiyimli qurollangan kishilar ko'rsatilgan videolar senga yoqadimi?",
    options: [
      { id: 'a', label: "Ha, ular kuchli ko'rinyapti" },
      { id: 'b', label: "Yo'q, ular qo'rqinchli va xavfli" },
    ],
    correct: 'b',
  },
  {
    id: 8,
    question: "\"Jannatga yo'l\" yoki \"Sodiqlar\" degan videolarni ko'rganmisan?",
    options: [
      { id: 'a', label: "Ha, ko'p ko'raman" },
      { id: 'b', label: "Yo'q, ko'rmaganman" },
    ],
    correct: 'b',
  },
  {
    id: 9,
    question: "Agar internetda seni kimdir xafa qilsa, SafeStep'ga aytasanmi?",
    options: [
      { id: 'a', label: "Ha, yordam berishini xohlayman" },
      { id: 'b', label: "Yo'q, uyalaman" },
    ],
    correct: 'a',
  },
  {
    id: 10,
    question: "Parolingni yoki manzilingni so'rashsa berasanmi?",
    options: [
      { id: 'a', label: "Ha, agar sovg'a berishsa" },
      { id: 'b', label: "Yo'q, bu mumkin emas" },
    ],
    correct: 'b',
  },
  // ── Set 2: Chuqur savollar ──
  {
    id: 11,
    question: "Sayt sovg'a uchun uyingning manzili yoki ota-onangning ish joyini so'radi. Sen nima qilasan?",
    options: [
      { id: 'a', label: "Sovg'a olish uchun yozib yuboraman" },
      { id: 'b', label: "Bu ma'lumotlarni begonalarga bermayman va rad etaman" },
      { id: 'c', label: "Avval saytni o'zim tekshirib ko'raman" },
    ],
    correct: 'b',
  },
  {
    id: 12,
    question: "Tanishing xavfli deb ko'rsatilgan fayl yubordi, lekin \"Qo'rqma, antivirus adashyapti\" deyapti. Nima qilasan?",
    options: [
      { id: 'a', label: "Do'stimga ishonib, faylni ochaman" },
      { id: 'b', label: "Antivirus ogohlantirishiga amal qilaman va faylni ochmayman" },
      { id: 'c', label: "Faylni ochaman, xato bo'lsa o'chirib tashlayman" },
    ],
    correct: 'b',
  },
  {
    id: 13,
    question: "\"Haqiqiy adolat faqat biz bilan\" shiori ostida qurollangan odamlar videosiga duch kelding. Bu videolar senga qanday ta'sir qiladi?",
    options: [
      { id: 'a', label: "Ularning kuchi va gaplari menga qiziq tuyuladi" },
      { id: 'b', label: "Bu videolar xavfli va adashgan guruhlarga tegishli deb o'ylayman" },
      { id: 'c', label: "Shunchaki tomosha qilaman, menga farqi yo'q" },
    ],
    correct: 'b',
  },
  {
    id: 14,
    question: "Internetda kimdir seni muntazam ravishda haqorat qilsa yoki siringni tarqatish bilan qo'rqitsa, birinchi navbatda kimga murojaat qilasan?",
    options: [
      { id: 'a', label: "Hech kimga, o'zim hal qilishga harakat qilaman" },
      { id: 'b', label: "Ota-onamga yoki ishonchli kattalarga aytaman" },
      { id: 'c', label: "Men ham uni haqorat qilib, o'chimni olaman" },
    ],
    correct: 'b',
  },
  {
    id: 15,
    question: "Videoda \"Buni hamma ko'rishi shart, tarqatmasang gunoh bo'ladi\" degan gapni eshitsang, nima qilasan?",
    options: [
      { id: 'a', label: "Buyruqqa amal qilib, do'stlarimga tarqataman" },
      { id: 'b', label: "Bunday bosim o'tkazuvchi kontentdan shubhalanaman va tarqatmayman" },
      { id: 'c', label: "Videoni saqlab qo'yaman, keyinroq ko'rish uchun" },
    ],
    correct: 'b',
  },
];

export default function TestScreen({ onBack, coins = 0, addCoins, onTestComplete }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [earned, setEarned] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = QUESTIONS[current];

  const handleSelect = (id) => {
    if (selected) return;
    setSelected(id);
    if (id === q.correct) {
      setScore(s => s + 1);
      setEarned(e => e + 10);
      addCoins && addCoins(10);
    }
  };

  const handleNext = () => {
    if (!selected) return;
    if (current + 1 >= QUESTIONS.length) {
      setFinished(true);
      onTestComplete && onTestComplete(score, QUESTIONS.length);
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
    }
  };

  const handleRetry = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setEarned(0);
    setFinished(false);
  };

  if (finished) {
    return (
      <ResultScreen
        score={score}
        total={QUESTIONS.length}
        earned={earned}
        onBack={onBack}
        onRetry={handleRetry}
      />
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Feather name="chevron-left" size={26} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Test</Text>
        <View style={styles.coinBadge}>
          <Text style={styles.coinIcon}>🪙</Text>
          <Text style={styles.coinText}>{coins}</Text>
        </View>
      </View>

      {/* Mascot */}
      <View style={styles.mascotWrap}>
        <Image source={require('../../assets/rabbit.png')} style={styles.mascot} resizeMode="contain" />
      </View>

      {/* Title */}
      <Text style={styles.title}>Bilimingni sinab ko'r!</Text>
      <Text style={styles.meta}>{QUESTIONS.length} ta savol • 15 daqiqa</Text>

      {/* Progress */}
      <View style={styles.progressWrap}>
        <View style={styles.progressBg}>
          <View style={[styles.progressFill, { width: `${(current / QUESTIONS.length) * 100}%` }]} />
        </View>
        <Text style={styles.progressText}>{current + 1}/{QUESTIONS.length}</Text>
      </View>

      {/* Question card */}
      <View style={styles.questionCard}>
        <Text style={styles.questionText}>{q.question}</Text>
      </View>

      {/* Options */}
      <View style={styles.optionsList}>
        {q.options.map((opt, idx) => {
          const isSelected = selected === opt.id;
          const isCorrect = opt.id === q.correct;
          const showResult = selected !== null;

          let bgColor = '#fff';
          let borderColor = '#E2E8F0';
          let textColor = '#1E293B';
          let labelBg = OPTION_COLORS[idx] || '#64748B';

          if (showResult && isCorrect) {
            bgColor = '#F0FDF4';
            borderColor = '#22C55E';
            textColor = '#15803D';
            labelBg = '#22C55E';
          } else if (showResult && isSelected && !isCorrect) {
            bgColor = '#FEF2F2';
            borderColor = '#EF4444';
            textColor = '#DC2626';
            labelBg = '#EF4444';
          }

          return (
            <TouchableOpacity
              key={opt.id}
              style={[styles.optionRow, { backgroundColor: bgColor, borderColor }]}
              onPress={() => handleSelect(opt.id)}
              activeOpacity={0.8}
            >
              <View style={[styles.optionLabel, { backgroundColor: labelBg }]}>
                <Text style={styles.optionLabelText}>{OPTION_LABELS[idx]}</Text>
              </View>
              <Text style={[styles.optionText, { color: textColor }]} numberOfLines={2}>
                {opt.label}
              </Text>
              {showResult && isCorrect && (
                <Feather name="check-circle" size={18} color="#22C55E" />
              )}
              {showResult && isSelected && !isCorrect && (
                <Feather name="x-circle" size={18} color="#EF4444" />
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Next button */}
      <TouchableOpacity
        style={[styles.nextBtn, !selected && styles.nextBtnDisabled]}
        onPress={handleNext}
        activeOpacity={0.85}
      >
        <Text style={styles.nextBtnText}>
          {current + 1 === QUESTIONS.length ? 'Yakunlash' : 'Keyingi savol'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function ResultScreen({ score, total, earned, onBack, onRetry }) {
  const pct = Math.round((score / total) * 100);
  return (
    <View style={styles.resultContainer}>
      <Text style={styles.resultEmoji}>{pct >= 80 ? '🏆' : pct >= 50 ? '👍' : '📚'}</Text>
      <Text style={styles.resultTitle}>{pct >= 80 ? 'Ajoyib!' : pct >= 50 ? 'Yaxshi!' : 'Harakat qiling!'}</Text>
      <Text style={styles.resultScore}>{score}/{total} to'g'ri javob — {pct}%</Text>

      {/* Coins earned */}
      <View style={styles.earnedBox}>
        <Text style={styles.coinIcon}>🪙</Text>
        <Text style={styles.earnedText}>+{earned} tanga</Text>
        <Text style={styles.earnedSub}>bu testdan qo'lga kiritildi</Text>
      </View>

      <View style={styles.resultBtns}>
        <TouchableOpacity style={styles.retryBtn} onPress={onRetry}>
          <Text style={styles.retryText}>Qayta urinish</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.homeBtn} onPress={onBack}>
          <Text style={styles.homeText}>Chiqish</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC', paddingBottom: 12 },

  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 52,
    paddingHorizontal: 20,
    paddingBottom: 4,
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

  /* Mascot */
  mascotWrap: { alignItems: 'center', marginTop: 2 },
  mascot: { width: 90, height: 90 },

  /* Title */
  title: { fontSize: 18, fontWeight: '800', color: '#1E293B', textAlign: 'center', marginTop: 2 },
  meta: { fontSize: 12, color: '#94A3B8', textAlign: 'center', marginTop: 2, marginBottom: 8 },

  /* Progress */
  progressWrap: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    paddingHorizontal: 16, marginBottom: 8,
  },
  progressBg: {
    flex: 1, height: 5, backgroundColor: '#E2E8F0', borderRadius: 3, overflow: 'hidden',
  },
  progressFill: { height: '100%', backgroundColor: '#2563EB', borderRadius: 3 },
  progressText: { fontSize: 11, fontWeight: '700', color: '#94A3B8', minWidth: 32, textAlign: 'right' },

  /* Question */
  questionCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
    minHeight: 60,
    justifyContent: 'center',
  },
  questionText: { fontSize: 13, fontWeight: '700', color: '#1E293B', lineHeight: 20, textAlign: 'center' },

  /* Options */
  optionsList: { paddingHorizontal: 16, gap: 8, marginBottom: 10 },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 14,
    borderWidth: 1.5,
    paddingVertical: 11,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  optionLabel: {
    width: 30, height: 30, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
  optionLabelText: { fontSize: 13, fontWeight: '800', color: '#fff' },
  optionText: { flex: 1, fontSize: 13, fontWeight: '600', lineHeight: 18 },

  /* Next button */
  nextBtn: {
    marginHorizontal: 16, borderRadius: 16,
    backgroundColor: '#2563EB', paddingVertical: 15,
    alignItems: 'center',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  nextBtnDisabled: { backgroundColor: '#93C5FD', elevation: 0 },
  nextBtnText: { fontSize: 15, fontWeight: '800', color: '#fff' },

  /* Result */
  resultContainer: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#F8FAFC', padding: 32, gap: 12,
  },
  resultEmoji: { fontSize: 80 },
  resultTitle: { fontSize: 26, fontWeight: '800', color: '#1E293B' },
  resultScore: { fontSize: 16, color: '#64748B' },
  earnedBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FEF3C7',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  coinIcon: { fontSize: 24 },
  earnedText: { fontSize: 22, fontWeight: '900', color: '#92400E' },
  earnedSub: { fontSize: 13, color: '#B45309', width: '100%', textAlign: 'center', marginTop: 2 },
  resultBtns: { flexDirection: 'row', gap: 12, marginTop: 16 },
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
