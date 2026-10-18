import { SheikhConfig } from '../types';

export const sheikhConfig: SheikhConfig = {
  // نوع الشخص
  type: "sheikh",
  typeLabel: "الشيخ",

  // الهوية
  name: "علاء إبراهيم",
  title: "باحث وداعية إسلامي | خريج جامعة الأزهر الشريف",
  bio: "الدعوة إلى الله بالحكمة والموعظة الحسنة، وترسيخ الفكر الأزهري الوسطي ومعالجة قضايا العصر",
  bioLong: "الشيخ علاء إبراهيم باحث وداعية إسلامي، من خريجي جامعة الأزهر الشريف العريقة بالقاهرة. عُرف باعتداله ومنهجه العلمي الرصين القائم على التأصيل الفقهي الأصيل، والربط الحكيم بين الثوابت الشرعية ومستجدات العصر، ومناقشة القضايا الفكرية والاجتماعية بأسلوب هادف وبسيط يصل إلى العقول والقلوب، مع عناية خاصة بتبصير الشباب وتصحيح المفاهيم وتفنيد الشبهات، يتابعه مئات الآلاف عبر مختلف المنصات الرقمية في مصر والعالم العربي.",

  // الصور
  logo: "",
  heroImage: "https://yt3.googleusercontent.com/hLJQIvvzfEzchI3RAzpWOLy9e3WFC6zwEraJ7hwJn4XYiMCXvIROQVgh7i0MCRE8ktlF_uaE4hI=s800-c-k-c0x00ffffff-no-rj",

  // معلومات تفصيلية
  yearsInField: 12,
  fieldLabel: "سنة في الدعوة والبحث الأزهري",
  education: "جامعة الأزهر الشريف - القاهرة",
  certificates: [
    "ليسانس الدراسات الإسلامية والعربية - جامعة الأزهر الشريف",
    "إجازة مسندة في القرآن الكريم برواية حفص عن عاصم",
    "دراسات تخصصية في الفقه وأصوله والقضايا الفكرية المعاصرة",
    "دبلومة إعداد وتأهيل الدعاة وتفنيد الشبهات"
  ],
  location: "جمهورية مصر العربية - القاهرة",

  // حقول إضافية
  customFields: [
    { label: "المؤسسة العلمية", value: "جامعة الأزهر الشريف - Cairo" },
    { label: "المنهج العلمي", value: "الوسطية والاعتدال الأزهري وتأصيل قضايا العصر" },
    { label: "متابعو فيسبوك", value: "+410,000 متابع" },
    { label: "مشتركو يوتيوب", value: "+160,000 مشترك" }
  ],

  // الألوان الأكاديمية
  colors: {
    primary: "#0B1D3A",
    gold: "#C5A869",
    background: "#FBF9F5",
    text: "#0B1424"
  },

  // منصات التواصل الاجتماعي الرسمية
  social: {
    youtube: "https://www.youtube.com/@alaaeldinebrahim0",
    facebook: "https://www.facebook.com/share/1GyQ4cTrnT/",
    instagram: "https://www.instagram.com/alaa_ebraheim25/",
    email: "mailto:contact@sheikh-alaa-ibrahim.com"
  },

  // رسالة المشاركة
  shareMessage: "تفضل بالاستفادة من الدروس والسلاسل العلمية مع {typeLabel} {name}",

  // الأذكار القصيرة والمأثورة (موجزة ومناسبة لشريط الإشعار الشفاف)
  athkar: [
    "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
    "سُبْحَانَ اللَّهِ الْعَظِيمِ",
    "أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ",
    "اللَّهُمَّ صَلِّ عَلَى نَبِيِّنَا مُحَمَّدٍ",
    "لَا إِلَهَ إِلَّا اللَّهُ",
    "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
    "سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ",
    "اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ",
    "رَبِّ اغْفِرْ لِي وَتُبْ عَلَيَّ",
    "اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
    "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ"
  ],

  // السلاسل والبحوث العلمية مقسمة حسب الموضوعات الحقيقية والمطلوبة لقناة الشيخ علاء إبراهيم
  categories: [
    {
      id: "podcasts-and-dialogues",
      name: "بودكاست وحوارات فكرية متعمقة",
      image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80",
      videos: [
        { id: "GINCbmOha8k", title: "بودكاست التوبة | يلا نتوب ياشباب مع الشيخ علاء إبراهيم", url: "https://youtu.be/GINCbmOha8k?si=iRIUMwTGNC8RgZn4", orientation: "landscape" },
        { id: "QEW1T-Z-5rc", title: "الطهارة ومجاهدة النفس وأحكام الشهوة وغض البصر | بودكاست متاع 16", url: "https://youtu.be/QEW1T-Z-5rc?si=um1FVYaTg4m6Z9Kq", orientation: "landscape" },
        { id: "Qmc9NNiMjKA", title: "بودكاست برا الكادر مع الشيخ علاء ابراهيم | الموسم التاني", url: "https://youtu.be/Qmc9NNiMjKA?si=y83p6GFxOg3AK0pH", orientation: "landscape" },
        { id: "2BvepovrSVE", title: "هل يكتئب المؤمن؟ تعامل الرسول ﷺ مع الحزن وأسرار البركة | مع الشيخ علاء ابراهيم", url: "https://youtu.be/2BvepovrSVE?si=EtCVW7KtH7xsZ5V5", orientation: "landscape" }
      ]
    },
    {
      id: "women-and-family",
      name: "فقه وقضايا المرأة والأسرة المسلمة",
      image: "/quran_family_jurisprudence.jpg",
      videos: [
        { id: "B1kZPi4Ux30", title: "غير المحجبة ! رؤية شرعية وتأصيل منهجي", url: "https://www.youtube.com/watch?v=B1kZPi4Ux30", orientation: "portrait" },
        { id: "_xzW1zV6Lj4", title: "ينفع أبين رقبتي من الطرحة ؟ أحكام وضوابط الحجاب", url: "https://www.youtube.com/shorts/_xzW1zV6Lj4", orientation: "portrait" },
        { id: "_r9UPgZIp5E", title: "ينفع جوزي يجبرني علي الحجاب ؟ رد الشيخ علاء إبراهيم", url: "https://www.youtube.com/shorts/_r9UPgZIp5E", orientation: "portrait" },
        { id: "SUKfu-p20RM", title: "حتى لو لابسة خمار وانتِ حاطة ميكب وفلاتر تبقي مش محجبة", url: "https://www.youtube.com/shorts/SUKfu-p20RM", orientation: "portrait" },
        { id: "--qrByC3qNA", title: "دا مش نقاب - ضوابط الستر الشرعي واللباس", url: "https://www.youtube.com/shorts/--qrByC3qNA", orientation: "portrait" },
        { id: "IJLfLSO7tjw", title: "إلبسي الحجاب حتى لو مش بتحبيه", url: "https://www.youtube.com/shorts/IJLfLSO7tjw", orientation: "portrait" },
        { id: "XnQi-9aTbgs", title: "ماما مش موافقة ألبس الحجاب - كيف تتصرف الفتاة", url: "https://www.youtube.com/shorts/XnQi-9aTbgs", orientation: "portrait" },
        { id: "WeQWR54nrCs", title: "مش عايزة بناتي يلبسوا الحجاب - نصيحة للآباء والأمهات", url: "https://www.youtube.com/shorts/WeQWR54nrCs", orientation: "portrait" },
        { id: "_llcgjlY2lQ", title: "شاب مسيحي يسألني عن حكم المكيب للنساء في الإسلام", url: "https://www.youtube.com/watch?v=_llcgjlY2lQ", orientation: "portrait" },
        { id: "smdym8SdrHU", title: "وضع العطر للمرأة ليس محرما في الإسلام", url: "https://www.youtube.com/shorts/smdym8SdrHU", orientation: "portrait" },
        { id: "-GyR7YucXAM", title: "حرام البنت تلبس كعب ؟ حكم لبس الكعب العالي", url: "https://www.youtube.com/shorts/-GyR7YucXAM", orientation: "portrait" },
        { id: "2nR8UiXMrdE", title: "تقدري تشترطي على زوجك انه ميتجوزش عليكِ - الشروط في عقد النكاح", url: "https://www.youtube.com/shorts/2nR8UiXMrdE", orientation: "portrait" },
        { id: "6M4Sfh_bGmo", title: "الصبر والرفق بالزوجة وحقوق المرأة في الإسلام", url: "https://www.youtube.com/watch?v=6M4Sfh_bGmo", orientation: "portrait" },
        { id: "yGJb2P8XszM", title: "حرام الست تصرخ وقت الولادة ! تصحيح المفاهيم الخاطئة", url: "https://www.youtube.com/shorts/yGJb2P8XszM", orientation: "portrait" },
        { id: "hbp9VAcI9xE", title: "مش لازم تلبسي الحجاب عشان تقري القران", url: "https://www.youtube.com/shorts/hbp9VAcI9xE", orientation: "portrait" },
        { id: "xvo6aYQS8F8", title: "ركوب الإسكوتر للبنات في الميزان الشرعي", url: "https://www.youtube.com/watch?v=xvo6aYQS8F8", orientation: "portrait" },
        { id: "mDbvz_dzfts", title: "هل المرأة المتبرجة خارجة عن الإسلام ؟!", url: "https://www.youtube.com/shorts/mDbvz_dzfts", orientation: "portrait" },
        { id: "3FlX4fa6hWc", title: "أين النسويات والمدافعين عن حقوق المرأة ؟", url: "https://www.youtube.com/shorts/3FlX4fa6hWc", orientation: "portrait" },
        { id: "V-N4pFlQoH4", title: "كفاية كلام عن الستات - احترام وتقدير دور المرأة", url: "https://www.youtube.com/shorts/V-N4pFlQoH4", orientation: "portrait" },
        { id: "v0HsGFihj1g", title: "مريم لبست الخمار وانا دفعت دم قلبي", url: "https://www.youtube.com/shorts/v0HsGFihj1g", orientation: "portrait" },
        { id: "kTTfOELNCt0", title: "حجاب البنت تحت التسع سنين اسمع راي الشيخ علاء ابراهيم", url: "https://www.youtube.com/shorts/kTTfOELNCt0", orientation: "portrait" }
      ]
    },
    {
      id: "prayer-and-worship",
      name: "أحكام الصلاة والعبادات والطهارة",
      image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80",
      videos: [
        { id: "FcPjTomX-7I", title: "لو كتفك ظهر وانت بتصلي صلاتك باطلة ؟! أحكام الصلاة وستر العورة", url: "https://www.youtube.com/watch?v=FcPjTomX-7I", orientation: "landscape" },
        { id: "DlZyttyoQpM", title: "لازم تقعد كدا في التشهد عشان صلاتك تبقى صحيحة ؟! جلسة التشهد", url: "https://www.youtube.com/shorts/DlZyttyoQpM", orientation: "portrait" },
        { id: "2g2UEZ5TwIM", title: "اوعي تصلي ورِجلك مكشوفة - حكم كشف القدمين في صلاة المرأة", url: "https://www.youtube.com/shorts/2g2UEZ5TwIM", orientation: "portrait" },
        { id: "0azstQ6mca0", title: "بتشوف أشكال على سجادة الصلاة ! خشوع الصلاة وتفادي الوسواس", url: "https://www.youtube.com/shorts/0azstQ6mca0", orientation: "portrait" },
        { id: "oRKLXztRwGo", title: "شوف الفيديو دا كل ما تكسل عن الصلاة - موعظة للمتهاونين", url: "https://www.youtube.com/shorts/oRKLXztRwGo", orientation: "portrait" },
        { id: "prAgWUrRdaE", title: "مسيحي يسأل سؤال مهم جدا في الصلاة", url: "https://www.youtube.com/watch?v=prAgWUrRdaE", orientation: "portrait" },
        { id: "U37CE2uCVUo", title: "اتعلم الوضوء الصحيح في دقيقتين - صفة الوضوء الشرعي", url: "https://www.youtube.com/shorts/U37CE2uCVUo", orientation: "portrait" },
        { id: "JHZfHh1r5DE", title: "الإنغماس في حمام السباحة بنية الوضوء - أحكام الطهارة", url: "https://www.youtube.com/shorts/JHZfHh1r5DE", orientation: "portrait" },
        { id: "w62A3N1ErC8", title: "خلع الشراب لا يبطل الوضوء - مسائل فقهية مهمة", url: "https://www.youtube.com/shorts/w62A3N1ErC8", orientation: "portrait" },
        { id: "urcLoDX1TWg", title: "مش لازم تتوضا قبل ما تمسك المصحف - حكم مس المصحف", url: "https://www.youtube.com/shorts/urcLoDX1TWg", orientation: "portrait" },
        { id: "5L5OTqOf7jI", title: "المسح على الطرحة في الوضوء للنساء", url: "https://www.youtube.com/shorts/5L5OTqOf7jI", orientation: "portrait" },
        { id: "hn8u9B5CZA8", title: "مينفعش تمسحي على الشراب دا - شروط المسح على الجوربين", url: "https://www.youtube.com/shorts/hn8u9B5CZA8", orientation: "portrait" },
        { id: "YcZOU8KIXh4", title: "6 حاجات لا تبطل الوضوء عكس اعتقاد كثير من الناس", url: "https://www.youtube.com/shorts/YcZOU8KIXh4", orientation: "portrait" },
        { id: "LJVGcVV9Nkw", title: "تركت الصلاة عشان الحسد !! تصحيح الأوهام", url: "https://www.youtube.com/watch?v=LJVGcVV9Nkw", orientation: "portrait" },
        { id: "bsu2-2ISa54", title: "صليت التراويح ورا الشيخ علاء ابراهيم - نفحات التراويح", url: "https://www.youtube.com/shorts/bsu2-2ISa54", orientation: "portrait" },
        { id: "q9ssJObcwLc", title: "موقف غريب حصل لي في مسجد النبي صلى الله عليه وسلم", url: "https://www.youtube.com/watch?v=q9ssJObcwLc", orientation: "portrait" },
        { id: "5m1T3y-tc-o", title: "اللهم احفظ بلاد الحرمين وسائر بلاد المسلمين", url: "https://www.youtube.com/watch?v=5m1T3y-tc-o", orientation: "portrait" },
        { id: "3gKZWI1xLGM", title: "مافيش دعوة مستجابة أول ما نشوف الكعبة ؟ آداب الدعاء", url: "https://www.youtube.com/shorts/3gKZWI1xLGM", orientation: "portrait" },
        { id: "1Hfjtvqv2Ho", title: "بيقرا القران بالطريقة الإسكندراني ولطائف التلاوة", url: "https://www.youtube.com/watch?v=1Hfjtvqv2Ho", orientation: "portrait" }
      ]
    },
    {
      id: "contemporary-thought",
      name: "تأصيل فكري وقضايا وشبهات معاصرة",
      image: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=800&q=80",
      videos: [
        { id: "PC4OciovvFI", title: "وقفة شرعية مع الأحكام القضائية والقضايا المجتمعية", url: "https://www.youtube.com/watch?v=PC4OciovvFI", orientation: "portrait" },
        { id: "-llgu9LEvdA", title: "الرد على مصطفى راشد وتفنيد الشبهات حول الثوابت", url: "https://www.youtube.com/watch?v=-llgu9LEvdA", orientation: "landscape" },
        { id: "KpAs2Ym_tzw", title: "واحد طلب صورة النبي محمد من الذكاء الإصطناعي - الموقف الشرعي", url: "https://www.youtube.com/watch?v=KpAs2Ym_tzw", orientation: "portrait" },
        { id: "TwGWvqeKkkE", title: "شخص غير مؤمن بالأديان اتصل بيا وشكرني بسبب فيديو معين", url: "https://www.youtube.com/watch?v=TwGWvqeKkkE", orientation: "portrait" },
        { id: "pGw3e4kzhi0", title: "فتاة تتكلم عن تبرج الشباب في خطبة - توازن الموعظة", url: "https://www.youtube.com/watch?v=pGw3e4kzhi0", orientation: "portrait" },
        { id: "RcbXvKphp7k", title: "كنت موجود هناك وهذا حقيقة ما حدث - توضيح وبيان أزهري", url: "https://www.youtube.com/watch?v=RcbXvKphp7k", orientation: "portrait" },
        { id: "jmC1NFyeiRM", title: "مش كل حاجة حرام عند الشيوخ - يسر الشريعة وسماحتها", url: "https://www.youtube.com/watch?v=jmC1NFyeiRM", orientation: "landscape" },
        { id: "xgQ84qUBhn8", title: "نصيحة لشاب اكتشف خيانة والده لوالدته - الحفاظ على البيوت", url: "https://www.youtube.com/watch?v=xgQ84qUBhn8", orientation: "portrait" },
        { id: "Hs22awfPoG8", title: "شيطان اتجوز شيطان - أغرب سؤال شرعي للشيخ علاء إبراهيم", url: "https://www.youtube.com/watch?v=Hs22awfPoG8", orientation: "portrait" },
        { id: "4K_P03iO730", title: "لو ربيت قطة سودا هتجيلك كوابيس ؟ تصحيح الخرافات والأوهام", url: "https://www.youtube.com/watch?v=4K_P03iO730", orientation: "portrait" },
        { id: "MLzXkihygxE", title: "زواج الجن من الإنسان - حقيقة أم خرافة في الميزان الشرعي", url: "https://www.youtube.com/watch?v=MLzXkihygxE", orientation: "portrait" },
        { id: "ytwXG81yZO0", title: "ازاي ممكن تحسد حد من غير ما تقصد ؟ الرقية والتحصين", url: "https://www.youtube.com/watch?v=ytwXG81yZO0", orientation: "portrait" },
        { id: "yhSeyjTJXVs", title: "هل يقبل الله توبة من أسلم على فراش الموت ؟", url: "https://www.youtube.com/watch?v=yhSeyjTJXVs", orientation: "portrait" }
      ]
    },
    {
      id: "scholarly-shorts",
      name: "قبسات وشورتس دعوية موجزة",
      image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80",
      videos: [
        { id: "j_v1mBX7TUI", title: "الشيخ الفصيح ولطائف البيان العربي والقرآني", url: "https://www.youtube.com/shorts/j_v1mBX7TUI", orientation: "portrait" },
        { id: "MH7WEYaV0ak", title: "إيه رأيك في الراجل الغيور ؟ مفهوم الغيرة المحمودة", url: "https://www.youtube.com/shorts/MH7WEYaV0ak", orientation: "portrait" },
        { id: "h7WIK3qxzLs", title: "إن تسخروا منا - رسائل الثبات واليقين", url: "https://www.youtube.com/shorts/h7WIK3qxzLs", orientation: "portrait" },
        { id: "sGbKKBFGyM8", title: "حكم الكلام على الأكل - آداب الطعام والشراب في السنة", url: "https://www.youtube.com/shorts/sGbKKBFGyM8", orientation: "portrait" },
        { id: "FrXiQUA_Fjc", title: "كلمات مكروهة في الإسلام منتشرة بين الناس", url: "https://www.youtube.com/shorts/FrXiQUA_Fjc", orientation: "portrait" },
        { id: "0usP3Lmsq5g", title: "حكم جملة 'لا حول الله' في الميزان الشرعي", url: "https://www.youtube.com/shorts/0usP3Lmsq5g", orientation: "portrait" },
        { id: "Qc7nZ6DHAsc", title: "والله بعودة يارمضان - نفحات إيمانية واستقبال الشهر", url: "https://www.youtube.com/shorts/Qc7nZ6DHAsc", orientation: "portrait" },
        { id: "3DpQsD8rbPA", title: "حرام تاكل حلاوة المولد ! بيان يسر الشريعة والمناسبات", url: "https://www.youtube.com/shorts/3DpQsD8rbPA", orientation: "portrait" },
        { id: "ef66zAaA-aY", title: "حكم أكل الضب في الميزان الفقهي", url: "https://www.youtube.com/shorts/ef66zAaA-aY", orientation: "portrait" },
        { id: "YveubCzGNq8", title: "كلمتين مش في السر لأخي الفنان أحمد الفيشاوي - نصيحة رقيقة", url: "https://www.youtube.com/shorts/YveubCzGNq8", orientation: "portrait" },
        { id: "PVqTCE80AEo", title: "المسلسلات والأفلام بتعالج التشدد ولا بتحذر من التدين ؟", url: "https://www.youtube.com/shorts/PVqTCE80AEo", orientation: "portrait" },
        { id: "OSyc4MxRpNI", title: "حكم الأبراج وقراءة الطالع في الشريعة الإسلامية", url: "https://www.youtube.com/shorts/OSyc4MxRpNI", orientation: "portrait" },
        { id: "BkvX7w-jpnY", title: "فضل البطيخ ولطائف التراث الفقهي", url: "https://www.youtube.com/shorts/BkvX7w-jpnY", orientation: "portrait" }
      ]
    }
  ],

  // إعدادات التوقيت
  settings: {
    athkarInterval: 14000,
    athkarDuration: 5000,

    // تذكير الصلاة التي لم يؤكد المستخدم أنه صلاها (5 دقائق)
    prayerReminderInterval: 300000,

    // مدة ظهور إشعار دخول وقت الصلاة: 5 ثوانٍ
    prayerReminderDuration: 5000,

    adDelay: 3000,
    city: "Cairo",
    country: "Egypt"
  },

  // تحسين محركات البحث SEO
  seo: {
    siteUrl: "https://sheikh-alaa-ibrahim.com",
    keywords: [
      "الشيخ علاء إبراهيم",
      "علاء إبراهيم",
      "بودكاست علاء إبراهيم",
      "داعية إسلامي",
      "جامعة الأزهر",
      "أزهر الشريف",
      "فتاوى شرعية",
      "دروس دينية",
      "سلاسل علمية أزهرية",
      "قضايا معاصرة"
    ],
    defaultImage: "https://yt3.googleusercontent.com/hLJQIvvzfEzchI3RAzpWOLy9e3WFC6zwEraJ7hwJn4XYiMCXvIROQVgh7i0MCRE8ktlF_uaE4hI=s800-c-k-c0x00ffffff-no-rj"
  }
};
