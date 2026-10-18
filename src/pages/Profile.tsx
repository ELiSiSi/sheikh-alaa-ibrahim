import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen, Award, GraduationCap, MapPin,
  Mail, Calendar, Briefcase, User, CheckCircle2,
  ShieldCheck, Landmark, Eye
} from 'lucide-react';
import { sheikhConfig } from '../data/sheikhConfig';
import { SocialLinks } from '../components/Footer';
import { SEO } from '../components/SEO';

// ============================================================================
// Visitor Counter Hook
// ============================================================================
const useVisitorCount = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const savedCount = localStorage.getItem('visitorCount');
    const newCount = savedCount ? parseInt(savedCount) + 1 : 16840;
    localStorage.setItem('visitorCount', newCount.toString());
    setCount(newCount);
  }, []);
  return count;
};

// ============================================================================
// Info Card Component
// ============================================================================
interface InfoCardProps {
  label: string;
  value: string | string[];
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}

const InfoCard = ({ label, value, icon: Icon }: InfoCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4 }}
    className="profile-info-card group"
  >
    <div className="profile-info-card-head">
      <div className="profile-info-card-icon">
        <Icon className="w-6 h-6 text-gold" strokeWidth={1.8} />
      </div>
      <h4 className="profile-info-card-label">{label}</h4>
    </div>
    {Array.isArray(value) ? (
      <ul className="profile-info-card-list">
        {value.map((v, i) => (
          <li key={i} className="profile-info-card-list-item">
            <span className="profile-info-card-list-dot" />
            <span>{v}</span>
          </li>
        ))}
      </ul>
    ) : (
      <p className="profile-info-card-value">{value}</p>
    )}
  </motion.div>
);

// ============================================================================
// Main Profile Component
// ============================================================================
export const SheikhProfile = () => {
  const visitorCount = useVisitorCount();

  const patternSvg = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30L30 0z' fill='%230B1D3A' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="profile-page-wrapper"
    >
      <SEO title={`سيرة ${sheikhConfig.typeLabel} ${sheikhConfig.name} - الملف العلمي والأكاديمي`} type="profile" />
      
      {/* خلفية الزخرفة الإسلامية الرقيقة */}
      <div
        className="profile-pattern"
        style={{ backgroundImage: patternSvg, backgroundSize: '120px 120px' }}
      />

      <div className="profile-content-container">
        
        {/* ================= HERO ================= */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="profile-hero"
        >
          <div className="profile-hero-glow" />
          <div className="profile-hero-inner">
            
            {/* صورة الشيخ */}
            <div className="profile-hero-image-col">
              <div className="profile-hero-image-wrapper">
                <div className="profile-hero-image-ring">
                  <img
                    src={sheikhConfig.heroImage}
                    alt={sheikhConfig.name}
                    className="profile-hero-image"
                  />
                </div>
              </div>
            </div>

            {/* نصوص السيرة والتعريف */}
            <div className="profile-hero-text-col">
              <span className="profile-hero-eyebrow">
                <span>❖</span>
                <span>السيرة العلمية والأكاديمية</span>
              </span>
              <h1 className="profile-hero-name">
                {sheikhConfig.typeLabel} {sheikhConfig.name}
              </h1>
              <h2 className="profile-hero-title">{sheikhConfig.title}</h2>
              <div className="profile-hero-divider" />
              <p className="profile-hero-bio leading-relaxed">
                {sheikhConfig.bio}
              </p>

              {/* إحصائيات سريعة */}
              <div className="profile-stats-row">
                <div className="profile-stat-mini">
                  <div className="profile-stat-mini-icon">
                    <Calendar className="w-6 h-6" strokeWidth={2} />
                  </div>
                  <div className="profile-stat-mini-content">
                    <span className="profile-stat-mini-value">
                      {sheikhConfig.yearsInField}+
                    </span>
                    <span className="profile-stat-mini-label">
                      {sheikhConfig.fieldLabel}
                    </span>
                  </div>
                </div>

                <div className="profile-stat-mini">
                  <div className="profile-stat-mini-icon">
                    <Award className="w-6 h-6" strokeWidth={2} />
                  </div>
                  <div className="profile-stat-mini-content">
                    <span className="profile-stat-mini-value">
                      {sheikhConfig.certificates?.length || 0}
                    </span>
                    <span className="profile-stat-mini-label">إجازات وشهادات</span>
                  </div>
                </div>

                <div className="profile-stat-mini">
                  <div className="profile-stat-mini-icon">
                    <Landmark className="w-6 h-6" strokeWidth={2} />
                  </div>
                  <div className="profile-stat-mini-content">
                    <span className="profile-stat-mini-value">الأزهر</span>
                    <span className="profile-stat-mini-label">جامعة الأزهر الشريف</span>
                  </div>
                </div>

                <div className="profile-stat-mini">
                  <div className="profile-stat-mini-icon">
                    <Eye className="w-6 h-6" strokeWidth={2} />
                  </div>
                  <div className="profile-stat-mini-content">
                    <span className="profile-stat-mini-value">
                      {visitorCount.toLocaleString('ar-EG')}
                    </span>
                    <span className="profile-stat-mini-label">زائر وباحث</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ================= BIO التفصيلية ================= */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="profile-section"
        >
          <div className="profile-section-header">
            <div className="profile-section-icon-box">
              <User className="w-6 h-6" strokeWidth={2} />
            </div>
            <h2 className="profile-section-title">نبذة تعريفية ومسيرة علمية</h2>
            <div className="profile-section-line" />
          </div>

          <div className="profile-bio">
            <span className="profile-bio-quote">❝</span>
            <p className="profile-bio-text leading-loose">
              {sheikhConfig.bioLong}
            </p>
          </div>
        </motion.section>

        {/* ================= المنهج العلمي والرسالة ================= */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="profile-section"
        >
          <div className="profile-section-header">
            <div className="profile-section-icon-box">
              <ShieldCheck className="w-6 h-6" strokeWidth={2} />
            </div>
            <h2 className="profile-section-title">المنهج العلمي والرسالة الدعوية</h2>
            <div className="profile-section-line" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
            <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
              <h3 className="font-amiri font-bold text-lg text-primary dark:text-gold mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-gold" />
                <span>الوسطية والاعتدال الأزهري</span>
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                يقوم منهج الشيخ على التمسك بالثوابت الشرعية لكتاب الله وسنة رسوله ﷺ، مستنيراً بمنهج الأزهر الشريف في إرساء الفكر المستنير والبعد عن الغلو والتطرف والتعصب، ونشر روح التسامح والتراحم في المجتمع.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
              <h3 className="font-amiri font-bold text-lg text-primary dark:text-gold mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-gold" />
                <span>مخاطبة عقول الشباب والواقع</span>
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                التركيز على القضايا المعاصرة التي تشغل أذهان الشباب في مجالات الأسرة، والأخلاق، والفكر، وتقديم إجابات شرعية وعقلية رصينة تزيل الشبهات وتغرس اليقين في النفوس بأسلوب مبسط وجذاب.
              </p>
            </div>
          </div>
        </motion.section>

        {/* ================= INFO GRID ================= */}
        <section className="profile-section">
          <div className="profile-section-header">
            <div className="profile-section-icon-box">
              <BookOpen className="w-6 h-6" strokeWidth={2} />
            </div>
            <h2 className="profile-section-title">بيانات ومعلومات تفصيلية</h2>
            <div className="profile-section-line" />
          </div>

          <div className="profile-info-grid">
            <InfoCard
              icon={GraduationCap}
              label="المؤهل العلمي"
              value={sheikhConfig.education}
            />
            <InfoCard
              icon={Briefcase}
              label={sheikhConfig.fieldLabel}
              value={`${sheikhConfig.yearsInField} سنة في العمل الدعوي`}
            />
            <InfoCard
              icon={MapPin}
              label="الموقع"
              value={sheikhConfig.location}
            />
            {sheikhConfig.customFields?.map((field, idx) => (
              <InfoCard
                key={idx}
                icon={BookOpen}
                label={field.label}
                value={field.value}
              />
            ))}
          </div>
        </section>

        {/* ================= CERTIFICATES ================= */}
        {sheikhConfig.certificates && sheikhConfig.certificates.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="profile-section"
          >
            <div className="profile-section-header">
              <div className="profile-section-icon-box">
                <Award className="w-6 h-6" strokeWidth={2} />
              </div>
              <h2 className="profile-section-title">الإجازات العلمية والشهادات</h2>
              <div className="profile-section-line" />
            </div>

            <div className="profile-cert-timeline">
              {sheikhConfig.certificates.map((cert, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="profile-cert-item"
                >
                  <div className="profile-cert-number">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <p className="profile-cert-text">{cert}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* ================= CONTACT ================= */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="profile-contact-section"
        >
          <h2 className="profile-contact-title">المنصات الرسمية والتواصل</h2>
          <p className="profile-contact-subtitle">
            تابعوا الدروس والمحاضرات والبحوث الجديدة لفضيلة {sheikhConfig.typeLabel} {sheikhConfig.name} عبر المنصات المعتمدة:
          </p>

          <div className="profile-contact-buttons">
            {sheikhConfig.social.youtube && (
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href={sheikhConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="profile-btn-primary"
              >
                قناة يوتيوب الرسمية (+160K)
              </motion.a>
            )}

            {sheikhConfig.social.facebook && (
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href={sheikhConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="profile-btn-secondary"
              >
                صفحة فيسبوك (+13K)
              </motion.a>
            )}

            {sheikhConfig.social.instagram && (
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href={sheikhConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="profile-btn-secondary"
              >
                إنستغرام الرسمية
              </motion.a>
            )}

            {sheikhConfig.social.email && (
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href={sheikhConfig.social.email}
                className="profile-btn-secondary"
              >
                <Mail className="w-5 h-5" strokeWidth={2} />
                البريد الإلكتروني
              </motion.a>
            )}
          </div>

          {/* أيقونات التواصل الاجتماعي */}
          <div className="flex justify-center mt-8">
            <SocialLinks context="profile" />
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};