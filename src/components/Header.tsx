import { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun } from 'lucide-react';
import axios from 'axios';
import { sheikhConfig } from '../data/sheikhConfig';

// ============================================================================
// Hooks
// ============================================================================
const useAthkar = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (!sheikhConfig.athkar || sheikhConfig.athkar.length === 0) return;
    const savedIndex = localStorage.getItem('lastAthkarIndex');
    if (savedIndex !== null) setCurrentIndex(parseInt(savedIndex) % sheikhConfig.athkar.length);
    let intervalId: any;
    let prayerVisible = false;
    let lastPrayerHideTime = 0;

    const handlePrayerVisibility = (e: any) => {
      prayerVisible = e.detail.isVisible;
      if (prayerVisible) {
        setIsVisible(false);
      } else {
        lastPrayerHideTime = Date.now();
      }
    };
    window.addEventListener('prayerVisibilityChanged', handlePrayerVisibility);

    const showToast = () => {
      if (prayerVisible) return;
      if (Date.now() - lastPrayerHideTime < 5000) return; // wait 5s after prayer toast hides

      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
        setCurrentIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % sheikhConfig.athkar.length;
          localStorage.setItem('lastAthkarIndex', nextIndex.toString());
          return nextIndex;
        });
      }, sheikhConfig.settings.athkarDuration);
    };

    const initialTimeout = setTimeout(() => {
      showToast();
      intervalId = setInterval(showToast, sheikhConfig.settings.athkarInterval);
    }, 3500);

    return () => {
      clearTimeout(initialTimeout);
      if (intervalId) clearInterval(intervalId);
      window.removeEventListener('prayerVisibilityChanged', handlePrayerVisibility);
    };
  }, []);

  if (!sheikhConfig.athkar || sheikhConfig.athkar.length === 0) return { thikr: null, isVisible: false };
  return { thikr: sheikhConfig.athkar[currentIndex], isVisible };
};

const usePrayerTimes = () => {
  const [prayerTimes, setPrayerTimes] = useState<Record<string, string> | null>(null);
  const [nextPrayer, setNextPrayer] = useState<{name: string, time: string, originalName: string} | null>(null);
  const [reminderState, setReminderState] = useState<'none' | 'upcoming' | 'current'>('none');
  
  const arabicPrayers: Record<string, string> = { Fajr: 'الفجر', Dhuhr: 'الظهر', Asr: 'العصر', Maghrib: 'المغرب', Isha: 'العشاء' };

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const { city, country } = sheikhConfig.settings;
        const response = await axios.get(`https://api.aladhan.com/v1/timingsByCity`, { params: { city, country, method: 5 } });
        setPrayerTimes(response.data.data.timings);
      } catch (error) { console.error(error); }
    };
    fetchPrayerTimes();
  }, []);

  useEffect(() => {
    if (!prayerTimes) return;
    const checkTimes = () => {
      const now = new Date();
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();
      const prayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
      let foundNext = false;
      const nowMins = currentHours * 60 + currentMinutes;
      
      for (const prayer of prayers) {
        const timeStr = prayerTimes[prayer];
        if (!timeStr) continue;
        const [h, m] = timeStr.split(':').map(Number);
        const prayerMins = h * 60 + m;
        
        if (prayerMins > nowMins && prayerMins - nowMins <= 15) {
          setNextPrayer({ name: arabicPrayers[prayer], time: timeStr, originalName: prayer });
          setReminderState('upcoming');
          foundNext = true;
          break;
        }
        
        if (nowMins >= prayerMins && nowMins - prayerMins <= 30) {
          const prayedDate = localStorage.getItem(`prayed_${prayer}_${now.toDateString()}`);
          if (!prayedDate) {
            setNextPrayer({ name: arabicPrayers[prayer], time: timeStr, originalName: prayer });
            setReminderState('current');
            foundNext = true;
            break;
          }
        }
      }
      if (!foundNext) setReminderState('none');
    };
    checkTimes();
    const interval = setInterval(checkTimes, 60000);
    return () => clearInterval(interval);
  }, [prayerTimes]);

  const markPrayed = (prayerOriginalName: string) => {
    localStorage.setItem(`prayed_${prayerOriginalName}_${new Date().toDateString()}`, 'true');
    setReminderState('none');
  };
  return { prayerTimes, nextPrayer, reminderState, markPrayed };
};

const useTheme = () => {
  const [theme, setTheme] = useState<string>(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('theme')) return localStorage.getItem('theme') || 'light';
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    if (theme) localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  return { theme, toggleTheme };
};


// ============================================================================
// Components
// ============================================================================

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme} className="theme-toggle-btn">
      {theme === 'dark' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
    </button>
  );
};

const AthkarTicker = () => {
  const { thikr, isVisible } = useAthkar();
  
  return (
    <AnimatePresence>
      {isVisible && thikr && (
        <motion.div 
          initial={{ opacity: 0, x: 40, scale: 0.95 }} 
          animate={{ opacity: 1, x: 0, scale: 1 }} 
          exit={{ opacity: 0, x: 40, scale: 0.95 }} 
          transition={{ type: 'spring', stiffness: 300, damping: 25 }} 
          className="fixed top-20 md:top-24 right-4 md:right-8 z-[100] pointer-events-none flex justify-end"
        >
          {/* كبسولة الأذكار الصغيرة والموجزة حسب رغبة المستخدم */}
          <div className="pointer-events-auto w-fit max-w-[88vw] bg-white/60 dark:bg-[#09182E]/75 rounded-xl px-3.5 py-1.5 shadow-lg border border-gold/45 relative overflow-hidden text-center">
            <p className="font-amiri text-sm sm:text-base font-bold text-primary dark:text-gold-light leading-normal drop-shadow-sm">
              {thikr}
            </p>
            {/* مؤشر المدة الزمني */}
            <motion.div
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: (sheikhConfig.settings.athkarDuration || 5000) / 1000, ease: 'linear' }}
              className="absolute bottom-0 right-0 h-[2px] bg-gradient-to-l from-gold to-gold-light/40"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const PrayerReminder = () => {
  const { nextPrayer, reminderState, markPrayed } = usePrayerTimes();
  const [isVisible, setIsVisible] = useState(false);
  const [activeKey, setActiveKey] = useState('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentKeyRef = useRef<string>('');

  // 10 ثوانٍ لاقتراب موعد الصلاة و 7 ثوانٍ لنداء الفريضة الآن وتختفي تلقائياً
  const durationSeconds = reminderState === 'upcoming' ? 10 : 7;

  useEffect(() => {
    if (reminderState === 'none' || !nextPrayer) {
      setIsVisible(false);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    const key = `${reminderState}_${nextPrayer.originalName}_${nextPrayer.time}`;

    // عدم إظهار التنبيه مجدداً إن كان قد أُغلق أو انتهت مدته
    if (sessionStorage.getItem(`dismissed_prayer_${key}`)) {
      setIsVisible(false);
      return;
    }

    // بدء التنبيه فقط إذا تغير المفتاح، دون إلغاء المؤقت في التحديثات المتكررة
    if (currentKeyRef.current !== key) {
      currentKeyRef.current = key;
      setActiveKey(key);
      setIsVisible(true);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        setIsVisible(false);
        try {
          sessionStorage.setItem(`dismissed_prayer_${key}`, 'true');
        } catch {
          // تجاهل خطأ التخزين
        }
        timerRef.current = null;
      }, durationSeconds * 1000);
    }
  }, [reminderState, nextPrayer?.originalName, nextPrayer?.time, durationSeconds]);

  // تنظيف عند إلغاء تركيب المكون
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleManualDismiss = () => {
    setIsVisible(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    const key = currentKeyRef.current;
    if (key) {
      try {
        sessionStorage.setItem(`dismissed_prayer_${key}`, 'true');
      } catch {
        // تجاهل خطأ التخزين
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && nextPrayer && reminderState !== 'none' && (
        <motion.div
          key={activeKey}
          initial={{ opacity: 0, y: -40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.95 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed top-20 md:top-24 left-1/2 transform -translate-x-1/2 z-[9999] w-[92%] max-w-md pointer-events-auto"
        >
          {/* نافذة تنبيه بشفافية متوازنة مع حدود ذهبية راقية */}
          <div
            dir="rtl"
            className="relative overflow-hidden rounded-2xl bg-white/75 dark:bg-[#071426]/85 border border-gold/50 shadow-2xl p-5 text-center text-text backdrop-blur-md"
          >
            {/* زر الإغلاق اليدوي */}
            <button
              type="button"
              onClick={handleManualDismiss}
              aria-label="إغلاق التنبيه"
              className="absolute top-3 left-3 w-7 h-7 rounded-full flex items-center justify-center text-muted hover:text-text hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* أيقونة المسجد / الصلاة */}
            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 bg-gold/20 border border-gold/40 shadow-inner">
              <span className="text-gold text-2xl">🕌</span>
            </div>

            {reminderState === 'upcoming' ? (
              <div>
                <span className="inline-block px-3 py-0.5 rounded-full text-xs font-bold bg-gold/20 text-gold border border-gold/35 mb-2">
                  تنبيه باقتراب الصلاة (يختفي تلقائياً بعد {durationSeconds} ثوانٍ)
                </span>
                <h3 className="text-lg md:text-xl font-bold font-amiri text-primary dark:text-gold mb-1 drop-shadow-sm">
                  اقترب موعد أذان صلاة {nextPrayer.name}
                </h3>
                <p className="text-gold font-bold text-2xl font-mono drop-shadow-sm" style={{ direction: 'ltr' }}>
                  {nextPrayer.time}
                </p>
                <p className="text-xs text-muted dark:text-gray-300 mt-1 font-medium">استعد للوضوء ولإجابة النداء</p>
              </div>
            ) : (
              <div>
                <span className="inline-block px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/35 mb-2">
                  نداء الفريضة الآن (يختفي بعد {durationSeconds} ثوانٍ)
                </span>
                <h3 className="text-lg md:text-xl font-bold font-amiri text-primary dark:text-gold mb-1 drop-shadow-sm">
                  حان الآن موعد صلاة {nextPrayer.name}
                </h3>
                <p className="text-xs md:text-sm text-muted dark:text-gray-300 font-medium mb-4">
                  ﴿ إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا ﴾
                </p>
                <button
                  type="button"
                  onClick={() => {
                    markPrayed(nextPrayer.originalName);
                    handleManualDismiss();
                  }}
                  className="bg-primary hover:bg-primary-light text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md hover:shadow-lg w-full flex items-center justify-center gap-2 border border-gold/40"
                >
                  <span>تمت الصلاة بفضل الله</span>
                  <span>✅</span>
                </button>
              </div>
            )}

            {/* مؤشر اختفاء الإشعار المتناقص زمنياً */}
            <motion.div
              key={activeKey}
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: durationSeconds, ease: 'linear' }}
              className="absolute bottom-0 right-0 h-1 bg-gradient-to-l from-gold to-gold-light"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="header-nav">
      <div className="header-nav-container">
        <div className="header-nav-content">
          <div className="header-logo-wrapper">
            <Link to="/" className="header-logo-link group flex items-center gap-3">
              <div className="w-10 h-10 md:w-11 md:h-11 rounded-full overflow-hidden border-2 border-gold shadow-md shrink-0">
                <img
                  src={sheikhConfig.heroImage}
                  alt={sheikhConfig.name}
                  style={{ objectPosition: '50% 38%' }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="flex flex-col text-right">
                <span className="text-xl md:text-2xl font-amiri font-bold text-primary dark:text-gold leading-tight">
                  {sheikhConfig.typeLabel} {sheikhConfig.name}
                </span>
                <span className="text-[11px] md:text-xs text-muted font-medium">
                  باحث وداعية إسلامي أزهري
                </span>
              </div>
            </Link>
          </div>
          <div className="header-desktop-menu">
            <NavLink to="/" className={({ isActive }) => `header-nav-link ${isActive ? 'active' : ''}`} end>الرئيسية</NavLink>
            <NavLink to="/profile" className={({ isActive }) => `header-nav-link ${isActive ? 'active' : ''}`}>عن {sheikhConfig.typeLabel}</NavLink>
            <ThemeToggle />
          </div>
          <div className="header-mobile-menu-btn">
            <ThemeToggle />
            <button onClick={() => setIsOpen(!isOpen)} className="text-text hover:text-primary focus:outline-none" aria-label="القائمة">
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="header-mobile-dropdown">
          <div className="px-4 py-6 space-y-4">
            <NavLink to="/" onClick={() => setIsOpen(false)} className={({ isActive }) => `block px-4 py-3 text-lg font-bold rounded-xl transition-colors ${isActive ? 'bg-primary-lighter text-primary' : 'text-text hover:bg-primary-lighter hover:text-primary'}`} end>الرئيسية</NavLink>
            <NavLink to="/profile" onClick={() => setIsOpen(false)} className={({ isActive }) => `block px-4 py-3 text-lg font-bold rounded-xl transition-colors ${isActive ? 'bg-primary-lighter text-primary' : 'text-text hover:bg-primary-lighter hover:text-primary'}`}>عن {sheikhConfig.typeLabel}</NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};


export const Header = () => (
  <>
    <AthkarTicker />
    <Navbar />
    <PrayerReminder />
  </>
);
