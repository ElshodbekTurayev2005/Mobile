import { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
  TextInput, KeyboardAvoidingView, Platform, StatusBar, Image,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { chatMessages } from '../data/mockData';

const quickReplies = [
  "Noma'lum shaxs nima qilish kerak?",
  'Xavfsizlik maslahatlari',
];

const aiResponses = [
  "Hech qachon shaxsiy ma'lumot bermagin va ota-onangga ayt. Agar u seni qo'rqitsa yoki bezovta qilsa, blokla va shikoyat qil.",
  "Internetda o'zingizni himoya qilish uchun: shaxsiy ma'lumotlaringizni ommaviy joyda e'lon qilmang, noma'lum havolalarni bosmang. 🛡️",
  "Noma'lum shaxsdan xabar kelsa: javob bermang, bloklang va ota-onangizga xabar bering. ⚠️",
  "Parolni kuchaytirish uchun: harflar, raqamlar va belgilardan foydalaning. Hech kim bilan ulashmang. 🔐",
];

export default function AIChatScreen({ onBack }) {
  const [messages, setMessages] = useState(chatMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef(null);

  const sendMessage = (text) => {
    const userMsg = text || input.trim();
    if (!userMsg) return;

    const newMsg = {
      id: Date.now(),
      sender: 'user',
      text: userMsg,
      time: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        time: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Feather name="chevron-left" size={26} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AI Chat</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.messageList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<IntroCard />}
        renderItem={({ item }) => <MessageBubble message={item} />}
        ListFooterComponent={isTyping ? <TypingIndicator /> : null}
      />

      {/* Quick replies */}
      <View style={styles.quickRow}>
        {quickReplies.map((q, i) => (
          <TouchableOpacity key={i} style={styles.quickChip} onPress={() => sendMessage(q)}>
            <Text style={styles.quickChipText}>{q}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Input */}
      <View style={styles.inputBar}>
        <TextInput
          style={styles.input}
          placeholder="Savolingni yoz..."
          placeholderTextColor="#94A3B8"
          value={input}
          onChangeText={setInput}
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          style={[styles.sendBtn, !input.trim() && styles.sendBtnOff]}
          onPress={() => sendMessage()}
          disabled={!input.trim()}
        >
          <Feather name="navigation" size={18} color="#fff" />
        </TouchableOpacity>
      </View>

    </KeyboardAvoidingView>
  );
}

function IntroCard() {
  return (
    <View style={styles.introWrap}>
      <Image source={require('../../assets/robot.png')} style={styles.robotImg} resizeMode="contain" />
      <View style={styles.introCard}>
        <Text style={styles.introTitle}>Salom! Men SafeStep AI</Text>
        <Text style={styles.introSub}>Sening savollaringga javob berish uchun{'\n'}shu yerdaman.</Text>
      </View>
    </View>
  );
}

function MessageBubble({ message }) {
  const isAI = message.sender === 'ai';
  return (
    <View style={[styles.msgRow, isAI ? styles.aiRow : styles.userRow]}>
      {isAI && (
        <View style={styles.msgAvatar}>
          <Image source={require('../../assets/robot.png')} style={styles.msgAvatarImg} resizeMode="contain" />
        </View>
      )}
      <View style={[styles.bubble, isAI ? styles.aiBubble : styles.userBubble]}>
        <Text style={[styles.bubbleText, isAI ? styles.aiText : styles.userText]}>
          {message.text}
        </Text>
      </View>
    </View>
  );
}

function TypingIndicator() {
  return (
    <View style={[styles.msgRow, styles.aiRow]}>
      <View style={styles.msgAvatar}>
        <Image source={require('../../assets/robot.png')} style={styles.msgAvatarImg} resizeMode="contain" />
      </View>
      <View style={[styles.bubble, styles.aiBubble, { paddingVertical: 14 }]}>
        <View style={styles.typingDots}>
          <View style={styles.dot} />
          <View style={[styles.dot, { opacity: 0.6 }]} />
          <View style={[styles.dot, { opacity: 0.3 }]} />
        </View>
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
    paddingHorizontal: 16,
    paddingBottom: 8,
    backgroundColor: '#F4F6FB',
  },
  backBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#1E293B' },
  headerSpacer: { width: 36 },

  /* Intro */
  introWrap: { alignItems: 'center', paddingTop: 8, paddingBottom: 16 },
  robotImg: { width: 120, height: 120, marginBottom: 8 },
  introCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingHorizontal: 20,
    paddingVertical: 14,
    alignItems: 'center',
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  introTitle: { fontSize: 16, fontWeight: '800', color: '#1E293B', marginBottom: 4 },
  introSub: { fontSize: 13, color: '#64748B', textAlign: 'center', lineHeight: 19 },

  /* Messages */
  messageList: { paddingHorizontal: 16, paddingBottom: 8 },
  msgRow: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: 10, gap: 8 },
  aiRow: { justifyContent: 'flex-start' },
  userRow: { justifyContent: 'flex-end' },
  msgAvatar: {
    width: 30, height: 30, borderRadius: 15,
    backgroundColor: '#E0F2FE',
    alignItems: 'center', justifyContent: 'center',
    overflow: 'hidden',
  },
  msgAvatarImg: { width: 28, height: 28 },
  bubble: {
    maxWidth: '75%', borderRadius: 18,
    paddingHorizontal: 14, paddingVertical: 10,
  },
  aiBubble: { backgroundColor: '#E8F4FF', borderBottomLeftRadius: 4 },
  userBubble: { backgroundColor: '#2563EB', borderBottomRightRadius: 4 },
  bubbleText: { fontSize: 14, lineHeight: 20 },
  aiText: { color: '#1E293B' },
  userText: { color: '#fff' },
  typingDots: { flexDirection: 'row', gap: 4 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#2563EB' },

  /* Quick replies */
  quickRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#F4F6FB',
  },
  quickChip: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  quickChipText: { fontSize: 12, fontWeight: '500', color: '#2563EB' },

  /* Input */
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    paddingBottom: 28,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  input: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 10,
    fontSize: 14,
    color: '#1E293B',
    maxHeight: 100,
  },
  sendBtn: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: '#2563EB',
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
  },
  sendBtnOff: { backgroundColor: '#93C5FD', elevation: 0 },
});
