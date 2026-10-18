import { useEffect, useState, useRef, useMemo } from 'react';
import { Link, useParams, Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, PlayCircle, Play, ChevronRight, ChevronLeft,
  Film, Sparkles, Mic, BookOpen, Heart, HelpCircle, Video,
  Search, GraduationCap, CheckCircle2, ShieldCheck,
  Compass
} from 'lucide-react';
import { sheikhConfig } from '../data/sheikhConfig';
import { SocialLinks } from '../components/Footer';
import { PrayerTimes } from '../components/PrayerTimes';
import { ShareButtons } from '../components/ShareButtons';
import { SEO } from '../components/SEO';

// ============================================================================
// Types
// ============================================================================
export interface Video {
  id: string;
  url: string;
  title?: string;
  orientation?: 'portrait' | 'landscape' | 'square';
}

export interface Category {
  id: string;
  name: string;
  image: string;
  videos: Video[];
}

// ============================================================================
// Category Icon Helper
// ============================================================================
const getCategoryIcon = (id: string, name: string) => {
  const key = (id + ' ' + name).toLowerCase();
  if (key.includes('podcast') || key.includes('بودكاست') || key.includes('حوار')) return Mic;
  if (key.includes('women') || key.includes('مرأة') || key.includes('مراه') || key.includes('نساء') || key.includes('أسرة') || key.includes('حجاب')) return Heart;
  if (key.includes('prayer') || key.includes('صلاة') || key.includes('صلاه') || key.includes('طهارة') || key.includes('وضوء') || key.includes('عباد')) return Compass;
  if (key.includes('thought') || key.includes('فكر') || key.includes('تأصيل') || key.includes('شبه')) return ShieldCheck;
  if (key.includes('spiritual') || key.includes('إيمان') || key.includes('مشاهد')) return Compass;
  if (key.includes('short') || key.includes('قبسات') || key.includes('خواطر')) return Sparkles;
  if (key.includes('ethic') || key.includes('أخلاق') || key.includes('قيم')) return Heart;
  if (key.includes('khutub') || key.includes('خطب')) return Mic;
  if (key.includes('lesson') || key.includes('درس')) return BookOpen;
  if (key.includes('qa') || key.includes('سؤال') || key.includes('فتاوى')) return HelpCircle;
  return Video;
};

// ============================================================================
// Video Detector
// ============================================================================
// Video Detector & Orientation Sizer
// ============================================================================
const detectVideo = (url: string, overrideOrientation?: 'portrait' | 'landscape' | 'square') => {
  const orientationToRatio = (o: string) =>
    o === 'portrait' ? '9/16' : o === 'square' ? '1/1' : '16/9';

  const applyOverride = (result: any) => {
    if (!overrideOrientation) return result;
    return { ...result, orientation: overrideOrientation, aspectRatio: orientationToRatio(overrideOrientation) };
  };

  if (!url) return applyOverride({ platform: 'other', orientation: 'landscape', embedUrl: '', aspectRatio: '16/9', id: '' });
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();

    if (hostname.includes('youtube.com') || hostname.includes('youtu.be')) {
      let id = '';
      let isShorts = urlObj.pathname.startsWith('/shorts/') || url.includes('/shorts/');
      
      if (hostname.includes('youtu.be')) {
        id = urlObj.pathname.slice(1);
      } else if (urlObj.searchParams.has('v')) {
        id = urlObj.searchParams.get('v') || '';
      } else if (urlObj.pathname.startsWith('/embed/')) {
        id = urlObj.pathname.split('/')[2];
      } else if (urlObj.pathname.startsWith('/shorts/')) {
        id = urlObj.pathname.split('/')[2];
        isShorts = true;
      }

      // تنظيف المعرف من أية وسائط أو إضافات
      if (id) {
        id = id.split('/')[0].split('?')[0].split('&')[0];
      }

      if (id) {
        const determinedOrientation = overrideOrientation || (isShorts ? 'portrait' : 'landscape');
        return {
          platform: 'youtube',
          orientation: determinedOrientation,
          embedUrl: `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`,
          aspectRatio: determinedOrientation === 'portrait' ? '9/16' : '16/9',
          id,
        };
      }
    }

    if (hostname.includes('facebook.com') || hostname.includes('fb.watch')) {
      const isPortrait = urlObj.pathname.includes('/reel/') || urlObj.pathname.includes('/reels/');
      return applyOverride({
        platform: 'facebook',
        orientation: isPortrait ? 'portrait' : 'landscape',
        embedUrl: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&width=800`,
        aspectRatio: isPortrait ? '9/16' : '16/9',
        id: '',
      });
    }

    if (hostname.includes('tiktok.com')) {
      let id = '';
      if (urlObj.pathname.includes('/video/')) id = urlObj.pathname.split('/video/')[1].split('?')[0];
      else if (urlObj.pathname.includes('/v/')) id = urlObj.pathname.split('/v/')[1].split('?')[0];
      if (id) return applyOverride({
        platform: 'tiktok',
        orientation: 'portrait',
        embedUrl: `https://www.tiktok.com/embed/v2/${id}`,
        aspectRatio: '9/16',
        id,
      });
    }

    if (hostname.includes('instagram.com')) {
      let id = '';
      let embedType = 'p';
      if (urlObj.pathname.includes('/p/')) { id = urlObj.pathname.split('/p/')[1].split('/')[0]; embedType = 'p'; }
      else if (urlObj.pathname.includes('/reel/')) { id = urlObj.pathname.split('/reel/')[1].split('/')[0]; embedType = 'reel'; }
      else if (urlObj.pathname.includes('/reels/')) { id = urlObj.pathname.split('/reels/')[1].split('/')[0]; embedType = 'reel'; }
      else if (urlObj.pathname.includes('/tv/')) { id = urlObj.pathname.split('/tv/')[1].split('/')[0]; embedType = 'tv'; }

      if (id) return applyOverride({
        platform: 'instagram',
        orientation: embedType === 'reel' ? 'portrait' : 'square',
        embedUrl: `https://www.instagram.com/${embedType}/${id}/embed/`,
        aspectRatio: embedType === 'reel' ? '9/16' : '1/1',
        id,
      });
    }

    return applyOverride({ platform: 'other', orientation: 'landscape', embedUrl: url, aspectRatio: '16/9', id: '' });
  } catch {
    return applyOverride({ platform: 'other', orientation: 'landscape', embedUrl: url, aspectRatio: '16/9', id: '' });
  }
};

// ============================================================================
// Auto Video Title Fetcher Hook - يجلب عنوان الفيديو تلقائياً من أي رابط
// ============================================================================
export const useVideoTitle = (videoUrl: string, fallbackTitle?: string) => {
  const [resolvedTitle, setResolvedTitle] = useState(fallbackTitle || '');

  useEffect(() => {
    if (!videoUrl) return;

    const cacheKey = `yt_title_${videoUrl}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      setResolvedTitle(cached);
      return;
    }

    if (fallbackTitle && !fallbackTitle.startsWith('درس ') && !fallbackTitle.startsWith('فيديو ')) {
      setResolvedTitle(fallbackTitle);
    }

    if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
      fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(videoUrl)}&format=json`)
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data && data.title) {
            setResolvedTitle(data.title);
            try {
              localStorage.setItem(cacheKey, data.title);
            } catch {}
          }
        })
        .catch(() => {
          if (fallbackTitle) setResolvedTitle(fallbackTitle);
        });
    }
  }, [videoUrl, fallbackTitle]);

  return resolvedTitle || fallbackTitle || 'درس علمي';
};

// ============================================================================
// Hero Section - Scientific & Scholarly Design
// ============================================================================
const Hero = () => (
  <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 bg-gradient-to-b from-[#071326] via-[#0B1D3A] to-[#0A182F] text-white">
    {/* الزخرفة الهندسية الإسلامية الخفيفة */}
    <div
      className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 0L80 40L40 80L0 40L40 0z M40 10L70 40L40 70L10 40L40 10z' fill='%23C5A869' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        backgroundSize: '100px 100px'
      }}
    />

    {/* التوهج اللوني الذهبي والأزرق الداكن */}
    <div className="absolute top-1/4 -right-20 w-96 h-96 rounded-full blur-[140px] bg-gold/15 pointer-events-none" />
    <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full blur-[140px] bg-primary/25 pointer-events-none" />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        
        {/* العمود النصي العلمي */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 text-center lg:text-right space-y-6"
        >
          {/* شارة التوثيق الأزهري */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/30 text-gold text-xs md:text-sm font-bold shadow-sm">
            <GraduationCap className="w-4 h-4 text-gold" />
            <span>باحث وداعية إسلامي • خريج جامعة الأزهر الشريف 🏛️</span>
          </div>

          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-amiri font-bold text-white leading-[1.2] tracking-wide mb-3">
              {sheikhConfig.typeLabel} {sheikhConfig.name}
            </h1>
            <p className="text-base sm:text-lg text-gold-light font-medium tracking-wide">
              {sheikhConfig.title}
            </p>
          </div>

          {/* رسالة ومنهج الدعوة إلى الله */}
          <div className="relative p-5 md:p-6 rounded-2xl bg-white/[0.06] border border-gold/30 shadow-xl max-w-2xl mx-auto lg:mx-0 text-right">
            <div className="flex items-center gap-2 mb-2 text-gold">
              <span className="text-base">❖</span>
              <span className="text-xs font-bold tracking-wider uppercase">رسالة ومنهج الدعوة إلى الله</span>
            </div>
            <p className="text-base sm:text-lg md:text-xl font-amiri font-bold text-white leading-relaxed">
              الدعوة إلى الله تعالى على بصيرة بالحكمة والموعظة الحسنة، وبناء الوعي الإيماني الرشيد في نفوس الشباب، وترسيخ الفكر الأزهري الوسطي، وتنوير العقول بقيم الإسلام وتفنيد شبهات العصر.
            </p>
            <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-gold-light/90 font-medium">
              <span>منهج أزهري رصين • خطاب عصري هادف</span>
              <span>جامعة الأزهر الشريف</span>
            </div>
          </div>

          {/* نبذة موجزة */}
          <p className="text-sm md:text-base text-white/80 leading-relaxed max-w-2xl mx-auto lg:mx-0">
            منصة علمية وتأصيلية تُعنى بنشر الفكر الإسلامي الوسطي المستنير، وتفنيد الشبهات المعاصرة، وتأصيل الأحكام الفقهية والقيم الأخلاقية بأسلوب أزهري رصين يخاطب العقول والوجدان.
          </p>

          {/* ركائز المنهج العلمي السريعة */}
          <div className="flex flex-wrap gap-2.5 justify-center lg:justify-start pt-2">
            <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-white/90 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-gold" />
              تأصيل فقهي رصين
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-white/90 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-gold" />
              معالجة قضايا العصر
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-white/90 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-gold" />
              الوسطية والاعتدال الأزهري
            </span>
          </div>

          {/* روابط التواصل الرسمية */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <span className="text-xs font-bold text-gold uppercase tracking-wider">المنصات الرسمية:</span>
            <div className="hero-social-wrapper">
              <SocialLinks />
            </div>
          </div>
        </motion.div>

        {/* العمود الصوري للشيخ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 flex justify-center"
        >
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">
            {/* الهالة والتطريز الخارجي */}
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-gold/40 animate-[spin_60s_linear_infinite]" />
            <div className="absolute inset-3 rounded-full border border-gold/30" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-gold/20 via-transparent to-primary/30 blur-2xl -z-10" />

            {/* صورة الشيخ الحقيقية */}
            <div className="w-full h-full p-4">
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-gold shadow-2xl bg-[#0B1D3A] relative">
                <img
                  src={sheikhConfig.heroImage || sheikhConfig.seo.defaultImage}
                  alt={sheikhConfig.name}
                  style={{ objectPosition: '50% 38%' }}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* وسام أزهري عائم */}
            <div className="absolute -bottom-2 right-4 sm:right-8 bg-[#0B1D3A]/95 border-2 border-gold backdrop-blur-md rounded-2xl px-4 py-2 shadow-2xl flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gold/20 flex items-center justify-center text-gold font-bold">
                🏛️
              </div>
              <div className="text-right">
                <span className="block text-xs font-bold text-white font-amiri leading-tight">جامعة الأزهر</span>
                <span className="text-[10px] text-gold font-mono">Cairo • Al-Azhar</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  </section>
);

// ============================================================================
// Scientific Methodology Section - المنهج العلمي والتأصيلي
// ============================================================================
const ScientificMethodology = () => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: "التأصيل الشرعي الرصين",
      desc: "الاستناد إلى الكتاب العزيز والسنة النبوية الشريفة بفهم سلف الأمة ومنهج علماء الأزهر الشريف المعتدل، دون إفراط أو تفريط."
    },
    {
      icon: Compass,
      title: "فقه الواقع ومعالجة الشبهات",
      desc: "طرح الإشكالات الفكرية والمجتمعية التي تواجه الشباب اليوم، وتفنيد الشبهات الرائجة بحجج نقلية وعقلية منضبطة وبناءة."
    },
    {
      icon: GraduationCap,
      title: "الخطاب الوسطي المستنير",
      desc: "إبراز يسر الشريعة ومقاصدها السامية في إصلاح الفرد والمجتمع، وصياغة الرسالة الدعوية بأسلوب علمي مبسّط يجمع القلوب."
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-card border-b border-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary dark:text-gold text-xs font-bold mb-3 border border-primary/20">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>المرتكزات التأصيلية</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-amiri font-bold text-primary dark:text-primary-light mb-3">
            منهج الشيخ في الدعوة والبحث العلمي
          </h2>
          <div className="w-16 h-1 bg-gold rounded-full mx-auto mb-4" />
          <p className="text-sm sm:text-base text-muted leading-relaxed">
            يقوم محتوى الشيخ علاء إبراهيم على الجمع المتوازن بين أصالة التراث الأزهري ومواكبة قضايا المجتمع المعاصر.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="p-6 md:p-8 rounded-2xl bg-background border border-border hover:border-gold/50 shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-gold/10 text-gold flex items-center justify-center mb-5 group-hover:bg-gold group-hover:text-primary transition-colors border border-gold/30">
                  <Icon className="w-7 h-7" strokeWidth={1.8} />
                </div>
                <h3 className="text-xl font-amiri font-bold text-primary dark:text-gold mb-3">
                  {pillar.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {pillar.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// Category Card - بطاقة السلسلة العلمية
// ============================================================================
const CategoryCard = ({ category, index }: { category: Category; index: number }) => {
  const Icon = getCategoryIcon(category.id, category.name);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/category/${category.id}`} className="block h-full group">
        <div className="h-full flex flex-col rounded-2xl overflow-hidden bg-card border border-border hover:border-gold shadow-sm hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-1.5">
          {/* الصورة والغلاف */}
          <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            
            {/* الشارة العائمة بعدد الفيديوهات */}
            <div className="absolute top-3 right-3 bg-primary/90 text-white font-bold text-xs px-3 py-1 rounded-full border border-gold/50 backdrop-blur-sm flex items-center gap-1.5 shadow-md">
              <Play className="w-3 h-3 fill-gold text-gold" />
              <span>{category.videos?.length || 0} درس وبحث</span>
            </div>

            {/* تصنيف السلسلة */}
            <div className="absolute bottom-3 right-3 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gold/20 backdrop-blur-md border border-gold/40 flex items-center justify-center text-gold">
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-gold-light uppercase tracking-wider">سلسلة علمية</span>
            </div>
          </div>

          {/* محتوى البطاقة */}
          <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
            <div>
              <h3 className="font-amiri font-bold text-lg md:text-xl text-primary dark:text-primary-light group-hover:text-gold transition-colors leading-snug">
                {category.name}
              </h3>
              <p className="text-xs text-muted mt-2 line-clamp-2 leading-relaxed">
                دروس ومحاضرات الشيخ علاء إبراهيم ضمن هذه السلسلة العلمية لمعالجة القضايا الفكرية والشرعية.
              </p>
            </div>

            <div className="pt-3 border-t border-border flex items-center justify-between text-xs font-bold text-primary dark:text-gold">
              <span className="group-hover:underline">تصفح محتوى السلسلة</span>
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

// ============================================================================
// Home Page Component
// ============================================================================
export const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const totalVideos = sheikhConfig.categories?.reduce((sum, c) => sum + (c.videos?.length || 0), 0) || 0;
  const totalCategories = sheikhConfig.categories?.length || 0;

  // تصفية السلاسل والدروس بالبحث
  const filteredCategories = useMemo(() => {
    if (!searchTerm.trim()) return sheikhConfig.categories;
    const term = searchTerm.toLowerCase();
    return sheikhConfig.categories.filter((cat) => {
      const matchName = cat.name.toLowerCase().includes(term);
      const matchVideo = cat.videos.some((v) => (v.title || '').toLowerCase().includes(term));
      return matchName || matchVideo;
    });
  }, [searchTerm]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen"
    >
      <SEO />
      <Hero />
      <PrayerTimes />

      {/* شريط الإحصائيات الأكاديمية والتوثيق */}
      <section className="bg-card border-y border-border shadow-sm relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 md:py-9">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            <div className="text-center p-3 rounded-2xl bg-primary/5 border border-primary/10">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold font-mono text-primary dark:text-gold mb-1">
                +160K
              </div>
              <div className="text-xs md:text-sm font-bold text-muted">مشترك ومتابع على يوتيوب</div>
            </div>

            <div className="text-center p-3 rounded-2xl bg-primary/5 border border-primary/10">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold font-mono text-primary dark:text-gold mb-1">
                {totalCategories}
              </div>
              <div className="text-xs md:text-sm font-bold text-muted">موسوعات وسلاسل علمية</div>
            </div>

            <div className="text-center p-3 rounded-2xl bg-primary/5 border border-primary/10">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold font-mono text-primary dark:text-gold mb-1">
                {totalVideos}+
              </div>
              <div className="text-xs md:text-sm font-bold text-muted">درس ومحاضرة علمية</div>
            </div>

            <div className="text-center p-3 rounded-2xl bg-primary/5 border border-primary/10">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold font-mono text-primary dark:text-gold mb-1">
                {sheikhConfig.yearsInField}+
              </div>
              <div className="text-xs md:text-sm font-bold text-muted">{sheikhConfig.fieldLabel}</div>
            </div>
          </div>
        </div>
      </section>

      {/* المنهج العلمي والتأصيلي */}
      <ScientificMethodology />

      {/* قسم السلاسل العلمية والبحوث المرئية */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 text-gold text-xs font-bold mb-3 border border-gold/30">
              <span>❖</span>
              <span>المكتبة المرئية</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-amiri font-bold text-primary dark:text-primary-light">
              السلاسل والبحوث العلمية
            </h2>
            <div className="w-20 h-1 bg-gold rounded-full mt-3 mb-2" />
            <p className="text-muted text-sm md:text-base">
              اختر السلسلة أو الموضوع العلمي الذي تود الاستفادة منه
            </p>
          </div>

          {/* محرك بحث سريع عن الدروس */}
          <div className="w-full md:w-80 relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ابحث في الدروس والسلاسل..."
              className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-card border border-border focus:border-gold focus:outline-none text-sm text-text transition-colors shadow-sm"
            />
            <Search className="w-4 h-4 text-muted absolute right-3.5 top-3.5" />
          </div>
        </div>

        {filteredCategories && filteredCategories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCategories.map((category, index) => (
              <CategoryCard key={category.id} category={category} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-card rounded-3xl border border-border">
            <Sparkles className="w-12 h-12 text-gold mx-auto mb-3" />
            <p className="text-xl font-amiri font-bold text-primary dark:text-gold mb-1">
              لم نجد نتائج مطابقة لبحثك
            </p>
            <p className="text-sm text-muted">
              جرّب البحث بكلمة أخرى أو تصفح كل السلاسل
            </p>
            <button
              onClick={() => setSearchTerm('')}
              className="mt-4 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold"
            >
              عرض جميع السلاسل
            </button>
          </div>
        )}
      </main>
    </motion.div>
  );
};

// ============================================================================
// Video Row Item Component — يعرض عنوان الفيديو تلقائياً مع الكاش وشارة المقاس
// ============================================================================
const VideoRow = ({
  video,
  idx,
  isCurrent,
  onPlay,
}: {
  video: Video;
  idx: number;
  isCurrent: boolean;
  onPlay: () => void;
}) => {
  const dynamicTitle = useVideoTitle(video.url, video.title);
  const isPortrait = video.orientation === 'portrait' || video.url.includes('/shorts/');

  return (
    <motion.div
      whileHover={{ x: isCurrent ? 0 : -4 }}
      onClick={() => !isCurrent && onPlay()}
      className={`group flex items-center gap-4 rounded-xl transition-all border p-3 md:p-4 ${
        isCurrent
          ? 'bg-primary/10 border-gold shadow-md cursor-default'
          : 'bg-card hover:bg-primary/5 border-border hover:border-gold/60 cursor-pointer shadow-sm hover:shadow-md'
      }`}
    >
      {/* رقم الدرس */}
      <div className="w-8 h-8 rounded-full bg-gold/15 border border-gold/30 items-center justify-center flex text-xs md:text-sm font-bold text-gold shrink-0">
        {idx + 1}
      </div>

      {/* أيقونة التشغيل */}
      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary dark:text-gold flex items-center justify-center shrink-0">
        <PlayCircle className="w-6 h-6" strokeWidth={1.8} />
      </div>

      {/* عنوان الدرس التلقائي وشارة المقاس (طولي أو أفقي) */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <h4 className={`font-bold text-sm md:text-base leading-relaxed ${
            isCurrent ? 'text-primary dark:text-gold' : 'text-text group-hover:text-primary dark:group-hover:text-gold'
          }`}>
            {dynamicTitle}
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
            isPortrait
              ? 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30'
              : 'bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/30'
          }`}>
            {isPortrait ? '📱 مقطع طولي (9:16)' : '🖥️ فيديو عريض (16:9)'}
          </span>
          {isCurrent && (
            <span className="text-[10px] font-bold text-gold bg-gold/10 px-2 py-0.5 rounded-full border border-gold/30">
              ▶ قيد المشاهدة حالياً
            </span>
          )}
        </div>
      </div>

      {!isCurrent && (
        <ChevronLeft className="w-4 h-4 text-gold opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
      )}
    </motion.div>
  );
};

// ============================================================================
// Series Page — مع Scroll ذكي + مشغل فيديو متكيف تلقائياً (طولي وعرضي)
// ============================================================================
const SeriesPage = () => {
  const { id, videoId } = useParams();
  const navigate = useNavigate();
  const [iframeError, setIframeError] = useState(false);
  const [userOrientation, setUserOrientation] = useState<'portrait' | 'landscape' | null>(null);
  const videoPlayerRef = useRef<HTMLDivElement>(null);

  // دعم المعرفات البديلة لضمان عمل كافة الروابط القديمة والجديدة بدون أخطاء
  const categoryAliases: Record<string, string> = {
    'contemporary-issues': 'contemporary-thought',
    'contemporary-thought': 'contemporary-thought',
    'spiritual-insights': 'prayer-and-worship',
    'spiritual-reflections': 'prayer-and-worship',
    'ethics-and-values': 'women-and-family',
    'women-and-family': 'women-and-family',
    'prayer-and-worship': 'prayer-and-worship',
    'podcasts-and-dialogues': 'podcasts-and-dialogues',
    'scholarly-shorts': 'scholarly-shorts',
  };
  const effectiveId = (id && categoryAliases[id]) || id;
  const series = sheikhConfig.categories?.find(c => c.id === effectiveId || c.id === id);

  const currentIndex = videoId && series ? series.videos.findIndex(v => v.id === videoId) : -1;
  const currentVideo = currentIndex >= 0 && series ? series.videos[currentIndex] : null;
  const parsedVideo = currentVideo ? detectVideo(currentVideo.url, currentVideo.orientation) : null;
  const currentTitle = useVideoTitle(currentVideo?.url || '', currentVideo?.title);
  const hasNext = currentIndex >= 0 && series ? currentIndex < series.videos.length - 1 : false;
  const hasPrev = currentIndex > 0;

  // إعادة ضبط التبديل اليدوي عند اختيار فيديو جديد
  useEffect(() => {
    setUserOrientation(null);
  }, [videoId]);

  const activeOrientation = userOrientation || parsedVideo?.orientation || 'landscape';
  const activeAspectRatio = activeOrientation === 'portrait' ? '9/16' : '16/9';

  // Scroll ذكي للمشغل
  useEffect(() => {
    setIframeError(false);
    const timer = setTimeout(() => {
      if (videoId && videoPlayerRef.current) {
        const yOffset = -90;
        const element = videoPlayerRef.current;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      } else if (!videoId) {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [id, videoId]);

  if (!series) return <Navigate to="/" replace />;

  const Icon = getCategoryIcon(series.id, series.name);
  const playVideo = (vId: string) => navigate(`/category/${id}/video/${vId}`);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen py-6 md:py-12"
    >
      <SEO title={series.name} description={`دروس ومحاضرات سلسلة ${series.name} للشيخ علاء إبراهيم`} type="article" />

      <div className="max-w-6xl mx-auto md:px-4 sm:px-6 lg:px-8">
        
        {/* رابط العودة */}
        <div className="px-4 md:px-0 mb-6">
          <Link to="/" className="inline-flex items-center text-primary dark:text-gold hover:underline font-bold text-sm md:text-base gap-2">
            <ArrowRight className="w-4 h-4" /> العودة للرئيسية
          </Link>
        </div>

        {/* ترويسة السلسلة */}
        <div className="mx-4 md:mx-0 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 bg-card p-6 md:p-8 rounded-3xl shadow-lg border border-border">
            <div className="relative flex-shrink-0">
              <img
                src={series.image}
                alt={series.name}
                className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-2xl shadow-xl border-4 border-gold"
              />
              <div className="absolute -bottom-3 -right-3 bg-primary text-white font-bold px-3 py-1 rounded-xl shadow-lg border-2 border-gold text-xs">
                {series.videos.length} درس
              </div>
            </div>
            <div className="text-center md:text-right flex-grow">
              <div className="inline-flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-gold/15 border border-gold/30 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-gold" strokeWidth={2} />
                </div>
                <span className="text-xs font-bold text-gold uppercase tracking-wider">سلسلة علمية معتمدة</span>
              </div>
              <h1 className="text-2xl md:text-4xl font-amiri font-bold text-primary dark:text-primary-light mb-3">
                {series.name}
              </h1>
              <div className="w-16 h-1 bg-gold rounded-full mx-auto md:mx-0 mb-4" />
              <p className="text-xs md:text-sm text-muted mb-4 max-w-xl">
                مجموعة دروس وبحوث شرعية وفكرية يقدمها فضيلة الشيخ علاء إبراهيم للتأصيل والتبيان.
              </p>
              <ShareButtons
                url={typeof window !== 'undefined' ? window.location.href : ''}
                title={`سلسلة: ${series.name} - الشيخ علاء إبراهيم`}
              />
            </div>
          </div>
        </div>

        {/* مشغل الفيديو المتكيف تلقائياً (طولي للشورتس والمقاطع الرأسية / عريض للمحاضرات والبودكاست) */}
        {currentVideo && parsedVideo && (
          <motion.div
            ref={videoPlayerRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8 md:mb-12 scroll-mt-24"
          >
            <div
              className={`relative mx-auto bg-black overflow-hidden shadow-2xl transition-all duration-300 ${
                activeOrientation === 'portrait'
                  ? 'w-full max-w-[340px] sm:max-w-[380px] md:max-w-[420px] aspect-[9/16] rounded-3xl border-2 border-gold/60'
                  : 'w-full max-w-[960px] aspect-[16/9] md:rounded-2xl md:border-2 md:border-gold/60'
              }`}
              style={{
                aspectRatio: activeAspectRatio,
                maxHeight: activeOrientation === 'portrait' ? '82vh' : 'none',
              }}
            >
              {!iframeError ? (
                <iframe
                  src={parsedVideo.embedUrl}
                  title={currentTitle || series.name}
                  className="absolute inset-0 w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                  allowFullScreen
                  loading="eager"
                  onError={() => setIframeError(true)}
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 text-center">
                  <Film className="w-16 h-16 text-gold mb-4" />
                  <p className="text-xl font-bold mb-2">الفيديو غير متاح حالياً</p>
                  <p className="text-white/70 text-sm">يرجى تجربة درس آخر من السلسلة</p>
                </div>
              )}
            </div>

            {/* عنوان الفيديو وأدوات تبديل المقاس الفوري والمشاركة */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-4 px-4 md:px-0 max-w-[960px] mx-auto">
              <div className="flex-1 text-center md:text-right">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-gold/15 text-gold border border-gold/30 mb-1.5">
                  <span>{activeOrientation === 'portrait' ? '📱 وضع العرض الطولي (9:16)' : '🖥️ وضع العرض الأفقي (16:9)'}</span>
                </div>
                <h2 className="text-lg md:text-2xl font-amiri font-bold text-primary dark:text-gold leading-relaxed">
                  {currentTitle || series.name}
                </h2>
              </div>

              <div className="flex items-center gap-3 flex-wrap justify-center">
                {/* زر التبديل السريع بين الطول والعرض */}
                <div className="flex items-center gap-1 bg-card border border-gold/30 rounded-xl p-1 shadow-sm">
                  <button
                    type="button"
                    onClick={() => setUserOrientation('portrait')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeOrientation === 'portrait'
                        ? 'bg-primary text-gold border border-gold shadow-md'
                        : 'text-muted hover:text-text hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                    title="تطبيق مقاس العرض الطولي 9:16"
                  >
                    <span>📱</span>
                    <span>طولي</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserOrientation('landscape')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      activeOrientation === 'landscape'
                        ? 'bg-primary text-gold border border-gold shadow-md'
                        : 'text-muted hover:text-text hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                    title="تطبيق مقاس العرض الأفقي 16:9"
                  >
                    <span>🖥️</span>
                    <span>عرضي</span>
                  </button>
                </div>

                <ShareButtons
                  url={typeof window !== 'undefined' ? window.location.href : ''}
                  title={`${series.name} - ${currentTitle || ''}`}
                />
              </div>
            </div>

            {/* أزرار التنقل بين الدروس */}
            {(hasPrev || hasNext) && (
              <div className="flex justify-center gap-3 mt-4 mb-6">
                {hasPrev && (
                  <button
                    onClick={() => playVideo(series.videos[currentIndex - 1].id)}
                    className="flex items-center gap-2 bg-primary hover:bg-primary-light text-white px-4 py-2 md:px-6 md:py-2.5 rounded-xl font-bold text-xs md:text-sm transition-all shadow-md"
                  >
                    <ChevronLeft className="w-4 h-4" /> الدرس السابق
                  </button>
                )}
                {hasNext && (
                  <button
                    onClick={() => playVideo(series.videos[currentIndex + 1].id)}
                    className="flex items-center gap-2 bg-primary hover:bg-primary-light text-white px-4 py-2 md:px-6 md:py-2.5 rounded-xl font-bold text-xs md:text-sm transition-all shadow-md"
                  >
                    الدرس التالي <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}

            <div className="w-full h-px bg-gold/20 my-6" />
          </motion.div>
        )}

        {/* قائمة دروس السلسلة مع العناوين التلقائية وشارات المقاس */}
        {series.videos.length > 0 && (
          <div className="px-4 md:px-0">
            <h3 className="font-amiri text-xl md:text-2xl font-bold mb-5 text-text flex items-center gap-2">
              <span className="text-gold">❖</span>
              <span>دروس ومحاضرات السلسلة ({series.videos.length})</span>
            </h3>

            <div className="flex flex-col gap-3">
              {series.videos.map((v, idx) => (
                <VideoRow
                  key={v.id}
                  video={v}
                  idx={idx}
                  isCurrent={v.id === videoId}
                  onPlay={() => playVideo(v.id)}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </motion.div>
  );
};

// ============================================================================
// Exports
// ============================================================================
export const CategoryPage = SeriesPage;
export const VideoPage = SeriesPage;