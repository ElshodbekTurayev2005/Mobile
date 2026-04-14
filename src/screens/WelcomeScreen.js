import { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  StatusBar,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen({ onStart, onParentLogin }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 700, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, tension: 55, friction: 8, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <LinearGradient colors={['#DBEAFE', '#BAE6FD', '#E0F2FE']} style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* Decorative bubbles */}
      <View style={styles.bubble1} />
      <View style={styles.bubble2} />
      <View style={styles.bubble3} />

      <Animated.View style={[styles.top, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        {/* Logo */}
        <View style={styles.logoRow}>
          <View style={styles.shieldWrap}>
            <Feather name="shield" size={22} color="#fff" />
            <View style={styles.shieldCheck}>
              <Feather name="check" size={10} color="#2563EB" />
            </View>
          </View>
          <Text style={styles.logoText}>SafeStep</Text>
        </View>

        {/* Tagline */}
        <Text style={styles.tagline}>Har bir qadam{'\n'}xavfsiz kelajak sari</Text>
      </Animated.View>

      {/* Big character image */}
      <Animated.View style={[styles.imageWrap, { transform: [{ scale: scaleAnim }] }]}>
        <Image
          source={require('../../assets/characters.png')}
          style={styles.charactersImage}
          resizeMode="contain"
        />
      </Animated.View>

      {/* Bottom section */}
      <Animated.View style={[styles.bottom, { opacity: fadeAnim }]}>
        <TouchableOpacity style={styles.button} onPress={onStart} activeOpacity={0.85}>
          <LinearGradient
            colors={['#2563EB', '#1D4ED8']}
            style={styles.buttonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.buttonText}>Boshlash</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={onParentLogin} activeOpacity={0.7}>
          <Text style={styles.parentLink}>Ota-ona sifatida kirish</Text>
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#DBEAFE',
  },

  /* Decorative bubbles */
  bubble1: {
    position: 'absolute', top: height * 0.06, left: -20,
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: 'rgba(147,197,253,0.3)',
  },
  bubble2: {
    position: 'absolute', top: height * 0.12, right: -15,
    width: 70, height: 70, borderRadius: 35,
    backgroundColor: 'rgba(147,197,253,0.25)',
  },
  bubble3: {
    position: 'absolute', bottom: height * 0.22, right: -10,
    width: 55, height: 55, borderRadius: 28,
    backgroundColor: 'rgba(186,230,253,0.35)',
  },

  /* Top */
  top: {
    alignItems: 'center',
    paddingTop: height * 0.07,
    paddingHorizontal: 28,
  },

  /* Logo */
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  shieldWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  shieldCheck: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 30,
    fontWeight: '800',
    color: '#1E3A8A',
    letterSpacing: 0.5,
  },

  /* Tagline */
  tagline: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1E293B',
    textAlign: 'center',
    lineHeight: 34,
  },

  /* Image */
  imageWrap: {
    flex: 1,
    width: width,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  charactersImage: {
    width: width,
    height: '100%',
  },

  /* Bottom */
  bottom: {
    width: '100%',
    paddingHorizontal: 28,
    paddingBottom: height * 0.04,
    paddingTop: 10,
    alignItems: 'center',
    gap: 12,
  },

  /* Button */
  button: {
    width: '100%',
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonGradient: {
    paddingVertical: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.3,
  },

  /* Parent link */
  parentLink: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1D4ED8',
    textDecorationLine: 'underline',
    opacity: 0.8,
  },
});
