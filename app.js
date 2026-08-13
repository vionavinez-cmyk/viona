/* JavaScript Application Logic for Viona Website - Blue & White Theme */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initMobileMenu();
  initAssignmentFilters();
  initAssignmentModals();
  initSmoothScroll();
});

/**
 * Tab Navigation Logic
 */
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-tab');
  const tabContents = document.querySelectorAll('.tab-content');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetTab = link.getAttribute('data-tab');

      // Update Active Navigation Button Style (Blue & White Theme)
      navLinks.forEach(l => {
        l.classList.remove('bg-blue-600', 'text-white', 'shadow-md');
        l.classList.add('text-slate-600', 'hover:text-slate-900', 'hover:bg-slate-200/60');
      });

      // Highlight clicked link with solid blue background
      link.classList.remove('text-slate-600', 'hover:text-slate-900', 'hover:bg-slate-200/60');
      link.classList.add('bg-blue-600', 'text-white', 'shadow-md');

      // Switch Tab Display
      tabContents.forEach(content => {
        if (content.id === targetTab) {
          content.style.display = 'block';
          setTimeout(() => {
            content.classList.add('active');
          }, 20);
        } else {
          content.classList.remove('active');
          content.style.display = 'none';
        }
      });

      // Close mobile menu if open
      const mobileMenu = document.getElementById('mobile-menu');
      if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
      }

      // Scroll smoothly to top of section
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Handle URL hash or tab query parameter on page load
  const urlParams = new URLSearchParams(window.location.search);
  const tabParam = urlParams.get('tab') || window.location.hash.substring(1);
  if (tabParam) {
    const matchingTabBtn = document.querySelector(`.nav-tab[data-tab="${tabParam}"]`);
    if (matchingTabBtn) {
      matchingTabBtn.click();
    }
  }
}

/**
 * Mobile Navbar Toggle
 */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
}

/**
 * Assignment Search & Category Filtering
 */
function initAssignmentFilters() {
  // Informatika Filtering
  const infoFilterBtns = document.querySelectorAll('.info-filter-btn');
  const infoCards = document.querySelectorAll('.info-card');
  const infoSearch = document.getElementById('info-search-input');

  if (infoFilterBtns.length > 0) {
    infoFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const category = btn.getAttribute('data-filter');
        
        infoFilterBtns.forEach(b => {
          b.classList.remove('bg-blue-600', 'text-white');
          b.classList.add('bg-white', 'text-slate-700', 'border', 'border-slate-300');
        });
        btn.classList.remove('bg-white', 'text-slate-700', 'border', 'border-slate-300');
        btn.classList.add('bg-blue-600', 'text-white');

        filterCards(infoCards, category, infoSearch ? infoSearch.value : '');
      });
    });
  }

  if (infoSearch) {
    infoSearch.addEventListener('input', (e) => {
      const activeFilter = document.querySelector('.info-filter-btn.bg-blue-600')?.getAttribute('data-filter') || 'all';
      filterCards(infoCards, activeFilter, e.target.value);
    });
  }

  // Bahasa Indonesia Filtering
  const indoFilterBtns = document.querySelectorAll('.indo-filter-btn');
  const indoCards = document.querySelectorAll('.indo-card');
  const indoSearch = document.getElementById('indo-search-input');

  if (indoFilterBtns.length > 0) {
    indoFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const category = btn.getAttribute('data-filter');
        
        indoFilterBtns.forEach(b => {
          b.classList.remove('bg-blue-600', 'text-white');
          b.classList.add('bg-white', 'text-slate-700', 'border', 'border-slate-300');
        });
        btn.classList.remove('bg-white', 'text-slate-700', 'border', 'border-slate-300');
        btn.classList.add('bg-blue-600', 'text-white');

        filterCards(indoCards, category, indoSearch ? indoSearch.value : '');
      });
    });
  }

  if (indoSearch) {
    indoSearch.addEventListener('input', (e) => {
      const activeFilter = document.querySelector('.indo-filter-btn.bg-blue-600')?.getAttribute('data-filter') || 'all';
      filterCards(indoCards, activeFilter, e.target.value);
    });
  }
}

function filterCards(cards, category, query) {
  const searchTerm = query.toLowerCase().trim();

  cards.forEach(card => {
    const cardCat = card.getAttribute('data-category');
    const cardTitle = card.getAttribute('data-title')?.toLowerCase() || '';
    const cardDesc = card.getAttribute('data-desc')?.toLowerCase() || '';

    const matchesCategory = (category === 'all' || cardCat === category);
    const matchesSearch = (searchTerm === '' || cardTitle.includes(searchTerm) || cardDesc.includes(searchTerm));

    if (matchesCategory && matchesSearch) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

/**
 * Assignment Detail Modal Functionality
 */
const assignmentData = {
  // Informatika Tasks
  'info-1': {
    title: 'Website Portofolio Sekolah & Personal UI Design',
    subject: 'Informatika - Web Development',
    date: '15 Juli 2026',
    score: '98 / 100',
    tags: ['HTML5', 'Tailwind CSS', 'JavaScript'],
    description: 'Proyek pembuatan website responsif menggunakan HTML5, Tailwind CSS, dan JavaScript interaktif untuk menyajikan biodata serta kumpulan karya akademik di Sekolah Cinta Kasih Tzu Chi.',
    contentHtml: `
      <div class="space-y-4">
        <h4 class="font-semibold text-slate-900">Fitur Utama Proyek:</h4>
        <ul class="list-disc pl-5 text-slate-700 space-y-1">
          <li>Desain UI/UX modern dengan skema warna Biru dan Putih (Blue & White Theme) yang bersih, profesional, dan proporsional.</li>
          <li>Sistem Navigasi Tab (Dashboard, Profil, Informatika, Bahasa Indonesia) tanpa reload halaman.</li>
          <li>Kartu tugas interaktif dengan filter kategori dan kolom pencarian (*search*).</li>
          <li>Modal pratinjau tugas untuk membaca detail karya dan kodenya.</li>
          <li>Desain 100% responsif untuk tampilan Smartphone, Tablet, dan Desktop.</li>
        </ul>
        <div class="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-blue-950">
          <code>&lt;!-- Code Snippet Example --&gt;<br>&lt;header class="glass-nav sticky top-0 z-50 border-b border-zinc-200"&gt;<br>&nbsp;&nbsp;&lt;nav class="container mx-auto px-4 py-3 flex justify-between"&gt;...&lt;/nav&gt;<br>&lt;/header&gt;</code>
        </div>
      </div>
    `
  },
  'info-2': {
    title: 'Kalkulator Nilai Akhir Siswa & Predikat Akademik',
    subject: 'Informatika - Logika & Pemrograman JS',
    date: '02 Juni 2026',
    score: '95 / 100',
    tags: ['JavaScript', 'Algoritma', 'Logic'],
    description: 'Aplikasi logika JavaScript sederhana untuk menghitung bobot nilai harian, UTS, dan UAS siswa secara otomatis beserta konversi huruf mutu (A, B, C) dan evaluasi catatan guru.',
    contentHtml: `
      <div class="space-y-4">
        <h4 class="font-semibold text-slate-900">Penjelasan Pemrograman:</h4>
        <p class="text-slate-700">Program ini menggunakan formula persentase (Harian 30%, UTS 30%, UAS 40%) dengan struktur percabangan <code>if-else</code> untuk menentukan kelulusan.</p>
        <div class="bg-zinc-950 text-emerald-400 p-4 rounded-xl font-mono text-xs overflow-x-auto border border-zinc-800">
          <code>function hitungNilai(harian, uts, uas) {<br>&nbsp;&nbsp;const total = (harian * 0.3) + (uts * 0.3) + (uas * 0.4);<br>&nbsp;&nbsp;if (total >= 90) return { grade: 'A', status: 'Sangat Memuaskan' };<br>&nbsp;&nbsp;if (total >= 80) return { grade: 'B', status: 'Memuaskan' };<br>&nbsp;&nbsp;return { grade: 'C', status: 'Cukup' };<br>}</code>
        </div>
      </div>
    `
  },
  'info-3': {
    title: 'Perancangan Wireframe & Prototype Aplikasi Edukasi Tzu Chi',
    subject: 'Informatika - UI/UX Design',
    date: '18 Mei 2026',
    score: '97 / 100',
    tags: ['Figma', 'UI/UX', 'Wireframing'],
    description: 'Rancangan prototype antarmuka aplikasi mobile pendukung budaya humanis dan kegiatan sosial siswa Sekolah Cinta Kasih Tzu Chi.',
    contentHtml: `
      <div class="space-y-4">
        <h4 class="font-semibold text-slate-900">Tahapan UI/UX Design:</h4>
        <ol class="list-decimal pl-5 text-slate-700 space-y-1">
          <li><strong>User Research:</strong> Wawancara kebutuhan siswa & guru terhadap aplikasi aktivitas sosial.</li>
          <li><strong>Information Architecture:</strong> Pemetaan struktur menu dan alur penggunaan aplikasi.</li>
          <li><strong>Low-Fidelity Wireframe:</strong> Sketsa awal tata letak tombol dan navigasi.</li>
          <li><strong>High-Fidelity Interactive Prototype:</strong> Hasil akhir visual design lengkap dengan animasi transisi.</li>
        </ol>
      </div>
    `
  },
  'info-4': {
    title: 'Analisis Data & Visualisasi Grafik Prestasi Siswa',
    subject: 'Informatika - Data Analysis',
    date: '24 April 2026',
    score: '94 / 100',
    tags: ['Python', 'Data Analysis', 'Charts'],
    description: 'Pengolahan data hasil belajar menggunakan Python dan matplotlib untuk menghasilkan grafik tren pencapaian kompetensi siswa.',
    contentHtml: `
      <div class="space-y-4">
        <p class="text-slate-700">Pengolahan data kuantitatif menggunakan dataset simulasi akademik untuk menampilkan distribusi nilai rata-rata tiap kelas dalam grafik batang dan diagram lingkaran.</p>
      </div>
    `
  },

  // Bahasa Indonesia Tasks
  'indo-1': {
    title: 'Puisi: "Cahaya Kasih di Ujung Pena"',
    subject: 'Bahasa Indonesia - Karya Sastra Puisi',
    date: '10 Juni 2026',
    score: '98 / 100',
    tags: ['Puisi', 'Sastra', 'Budaya Humanis'],
    description: 'Puisi bertema rasa syukur, ketulusan belajar, dan nilai budaya humanis di Sekolah Cinta Kasih Tzu Chi.',
    contentHtml: `
      <div class="bg-blue-50 p-6 rounded-2xl border border-blue-200 text-center font-serif space-y-3 text-slate-800 italic">
        <h4 class="font-bold text-slate-950 not-italic font-sans text-lg text-blue-700">Cahaya Kasih di Ujung Pena</h4>
        <p>Di bawah naungan atap Tzu Chi yang tenang,<br>Langkah kaki melangkah membawa impian terang.<br>Tak hanya ilmu yang dikejar dalam jemari,<br>Namun kehangatan kasih yang menuntun hati.</p>
        <p>Setiap lembar kertas bertuliskan harapan,<br>Dikerjakan dengan senyum dan ketulusan.<br>Bukan sekadar kata dalam buku pelajaran,<br>Tapi wujud budi pekerti yang diabadikan.</p>
        <p>Terima kasih guru, terima kasih kawan,<br>Bersama kita merajut masa depan.</p>
      </div>
    `
  },
  'indo-2': {
    title: 'Esai Ilmiah: "Pentingnya Budaya Humanis di Era Digital"',
    subject: 'Bahasa Indonesia - Penulisan Esai',
    date: '20 Mei 2026',
    score: '96 / 100',
    tags: ['Esai', 'Opini', 'Teknologi & Etika'],
    description: 'Esai kritis mengenai bagaimana nilai-nilai etika dan empati dari budaya humanis Tzu Chi menjadi benteng utama generasi muda dalam berinteraksi di dunia digital.',
    contentHtml: `
      <div class="space-y-3 text-slate-700 leading-relaxed text-sm">
        <h4 class="font-semibold text-slate-900 text-base">Abstrak & Ringkasan Argumen:</h4>
        <p>Pesatnya perkembangan teknologi informasi memberikan kemudahan komunikasi, namun juga memicu tantangan etika seperti perundungan siber (*cyberbullying*) dan lunturnya rasa empati. Melalui pendekatan Budaya Humanis yang diajarkan di Sekolah Cinta Kasih Tzu Chi, siswa dibekali kesadaran untuk tidak hanya cerdas secara intelektual, tetapi juga santun dalam berinteraksi secara digital.</p>
        <p class="font-medium text-slate-900 bg-blue-50 p-3 rounded-lg border-l-4 border-blue-600">"Teknologi adalah alat, namun kasih dan empati adalah arah petunjuk utama dalam menggunakannya."</p>
      </div>
    `
  },
  'indo-3': {
    title: 'Resensi Buku: "Bumi Manusia" karya Pramoedya Ananta Toer',
    subject: 'Bahasa Indonesia - Literasi & Resensi',
    date: '14 April 2026',
    score: '95 / 100',
    tags: ['Resensi', 'Literasi', 'Novel'],
    description: 'Ulasan komprehensif mengenai latar belakang sejarah, penokohan Minke dan Annelies, serta kelebihan karya sastra klasik Indonesia.',
    contentHtml: `
      <div class="space-y-4">
        <div class="grid grid-cols-2 gap-4 bg-zinc-100 p-4 rounded-xl text-xs text-slate-700 border border-zinc-200">
          <div><strong>Judul Buku:</strong> Bumi Manusia</div>
          <div><strong>Penulis:</strong> Pramoedya Ananta Toer</div>
          <div><strong>Penerbit:</strong> Lentera Dipantara</div>
          <div><strong>Tebal:</strong> 535 Halaman</div>
        </div>
        <p class="text-slate-700 text-sm">Resensi ini mengulas perjuangan kesetaraan dan keadilan yang disampaikan Pramoedya secara tajam melalui tokoh Minke, seorang pemuda pribumi terpelajar pada era kolonial.</p>
      </div>
    `
  },
  'indo-4': {
    title: 'Naskah Presentasi Ceramah Sapaan Pagi & Kesantunan Berbahasa',
    subject: 'Bahasa Indonesia - Retorika & Public Speaking',
    date: '05 Maret 2026',
    score: '97 / 100',
    tags: ['Presentasi', 'Public Speaking', 'Komunikasi'],
    description: 'Naskah pidato dan penyampaian pesan kesantunan berbahasa sehari-hari di lingkungan sekolah dan keluarga.',
    contentHtml: `
      <div class="space-y-3 text-slate-700 text-sm">
        <p>Naskah ini disusun untuk latihan komunikasi publik dalam acara apresiasi siswa. Poin utamanya adalah penerapan 3 kata ajaib: <em>"Tolong"</em>, <em>"Maaf"</em>, dan <em>"Terima Kasih"</em>.</p>
      </div>
    `
  },

  // Informatika Materi
  'materi-info-1': {
    title: 'Topologi Jaringan Komputer',
    subject: 'Informatika - Jaringan Komputer',
    date: 'Juli 2026',
    score: 'Materi Pembelajaran',
    tags: ['Topologi', 'Jaringan', 'Kurikulum Merdeka'],
    description: 'Topografi atau topologi jaringan mendefinisikan struktur fisik atau logis dari sebuah jaringan komputer.',
    contentHtml: `
      <div class="space-y-4 text-slate-700 text-sm leading-relaxed">
        <img src="assets/images/network_topology.png" alt="Topologi Jaringan" class="w-full h-48 object-cover rounded-2xl mb-4 border border-blue-100 shadow-sm">
        
        <p><strong>Topologi jaringan komputer</strong> adalah konsep mendasar dalam dunia teknologi informasi yang mendefinisikan bagaimana perangkat-perangkat komputer, server, switch, router, dan node lainnya diatur dan dihubungkan satu sama lain. Struktur koneksi ini bisa berupa bentuk fisik (tata letak kabel, konektor, dan perangkat keras) maupun bentuk logis (bagaimana data ditransmisikan dan mengalir secara virtual di dalam jaringan). Pemilihan topologi yang tepat akan menentukan efisiensi transfer data, tingkat kecepatan akses, biaya instalasi, serta skalabilitas jaringan di masa mendatang.</p>
        
        <p>Dalam perkembangannya, terdapat beberapa jenis topologi fisik yang umum digunakan di industri maupun lingkungan institusi pendidikan, masing-masing dengan karakteristik uniknya. Topologi <strong>Star (Bintang)</strong> menghubungkan semua node langsung ke switch sentral, memberikan isolasi kegagalan yang andal. Topologi <strong>Bus</strong> menggunakan satu kabel utama sebagai jalur transmisi tunggal, yang hemat biaya namun rawan gangguan. Di sisi lain, topologi <strong>Mesh (Jala)</strong> menghubungkan setiap perangkat langsung ke perangkat lainnya untuk redundansi maksimal, sementara topologi <strong>Tree (Pohon)</strong> menggabungkan struktur bintang dan bus untuk tata kelola bertingkat pada organisasi besar.</p>
        
        <p>Masing-masing jenis topologi memiliki kelebihan dan kekurangan yang perlu dianalisis secara cermat sebelum melakukan instalasi. Sebagai contoh, meskipun topologi Mesh menawarkan keamanan dan keandalan transmisi yang sangat tinggi karena tidak ada titik kegagalan tunggal (single point of failure), biaya kabel dan kerumitan konfigurasi membuatnya jarang digunakan di jaringan kantor kecil. Sebaliknya, topologi Star menjadi standar yang paling banyak diadopsi karena memudahkan tim IT dalam mendeteksi dan mengisolasi titik masalah (troubleshooting) tanpa perlu mematikan seluruh sistem operasional jaringan.</p>
        
        <p>Di Sekolah Cinta Kasih Tzu Chi, pemahaman mengenai materi topologi jaringan ini tidak hanya diajarkan sebagai teori semata, melainkan dihubungkan dengan nilai ketelitian, kedisiplinan, dan tanggung jawab sosial. Siswa dilatih untuk merancang skema jaringan komputer yang efisien guna meminimalkan pemborosan energi dan material kabel, sekaligus mengedepankan keamanan informasi. Hal ini diharapkan dapat melatih cara berpikir komputasional yang humanis, di mana teknologi dirancang dengan cermat demi memberikan kemudahan bagi seluruh civitas akademika tanpa melupakan keberlanjutan lingkungan sekitar.</p>
      </div>
    `
  },
  'materi-info-2': {
    title: 'Sistem Bilangan Biner',
    subject: 'Informatika - Logika Komputer',
    date: 'Juli 2026',
    score: 'Materi Pembelajaran',
    tags: ['Biner', 'Komputer', 'Basis 2'],
    description: 'Sistem bilangan biner merupakan bahasa dasar komputer yang menggunakan basis dua angka, yaitu 0 dan 1.',
    contentHtml: `
      <div class="space-y-4 text-slate-700 text-sm leading-relaxed">
        <img src="assets/images/binary_system.png" alt="Sistem Bilangan Biner" class="w-full h-48 object-cover rounded-2xl mb-4 border border-blue-100 shadow-sm">
        
        <p><strong>Sistem bilangan biner</strong> (atau basis dua) adalah sistem penulisan angka yang hanya menggunakan dua simbol unik, yaitu <strong>0 (nol) dan 1 (satu)</strong>. Sistem biner ini dipopulerkan oleh matematikawan terkenal Gottfried Wilhelm Leibniz pada abad ke-17 dan kini telah menjadi fondasi absolut dari seluruh arsitektur komputer digital modern. Berbeda dengan manusia yang menggunakan sistem desimal berbasis sepuluh karena memiliki sepuluh jari, mesin komputer menggunakan biner karena kesesuaian alaminya dengan hukum kelistrikan dan sirkuit elektronik mikroprosesor.</p>
        
        <p>Pada tingkat perangkat keras terkecil, miliaran transistor di dalam Central Processing Unit (CPU) bekerja sebagai sakelar elektronik ultra-cepat yang hanya memiliki dua status fisik stabil. Status mati atau tanpa tegangan listrik direpresentasikan dengan angka <strong>0</strong>, sedangkan status hidup atau adanya tegangan listrik direpresentasikan dengan angka <strong>1</strong>. Setiap digit biner ini disebut sebagai satu <strong>bit</strong> (binary digit). Kumpulan dari 8 bit membentuk satu <strong>byte</strong>, yang merupakan standar dasar representasi satu karakter teks di dalam memori komputer menggunakan pengkodean khusus seperti tabel ASCII atau Unicode.</p>
        
        <p>Seluruh data digital yang kita konsumsi sehari-hari—mulai dari teks dokumen, suara audio, gambar foto, file video resolusi tinggi, hingga game 3D yang kompleks—pada akhirnya dikompresi dan dikonversi menjadi barisan angka biner raksasa sebelum diproses oleh komputer. Melalui gerbang logika boolean dasar seperti AND, OR, dan NOT, transistor-transistor tersebut melakukan kalkulasi aritmatika dan logika berkecepatan tinggi. Proses inilah yang mengubah barisan 0 dan 1 menjadi visualisasi grafis yang indah dan interaktif di layar monitor komputer maupun ponsel pintar kita.</p>
        
        <p>Melalui pembelajaran sistem biner di Sekolah Cinta Kasih Tzu Chi, siswa diajarkan untuk memahami esensi kejujuran dan ketepatan informasi yang dianalogikan dari sistem biner tersebut. Dalam biner, tidak ada ruang abu-abu; informasi hanya bernilai benar (1) atau salah (0). Filosofi ini memotivasi siswa untuk senantiasa bersikap jujur dan tegas dalam membedakan hal baik dan buruk dalam kehidupan sehari-hari, sekaligus melatih ketangkasan berpikir kritis yang sistematis dalam memecahkan masalah algoritma pemrograman.</p>
      </div>
    `
  },
  'materi-info-3': {
    title: 'Konsep Dasar Kriptografi',
    subject: 'Informatika - Keamanan Informasi',
    date: 'Juli 2026',
    score: 'Materi Pembelajaran',
    tags: ['Kriptografi', 'Keamanan', 'Enkripsi'],
    description: 'Kriptografi adalah metode penyandian data agar data tersebut aman dari pihak yang tidak berwenang saat ditransmisikan.',
    contentHtml: `
      <div class="space-y-4 text-slate-700 text-sm leading-relaxed">
        <img src="assets/images/cryptography.png" alt="Kriptografi" class="w-full h-48 object-cover rounded-2xl mb-4 border border-blue-100 shadow-sm">
        
        <p><strong>Kriptografi</strong> adalah disiplin ilmu dan seni yang mempelajari metode-metode matematika untuk menyandikan data atau pesan agar keamanannya tetap terjaga saat dikirim melalui media komunikasi publik seperti internet. Secara historis, istilah ini berasal dari bahasa Yunani, <em>kryptos</em> (tersembunyi) dan <em>graphein</em> (menulis). Dalam ekosistem digital yang rentan terhadap ancaman penyadapan dan manipulasi data, kriptografi menjadi pilar pertahanan siber terpenting untuk menjamin privasi, integritas, dan otentikasi data global.</p>
        
        <p>Proses inti dalam kriptografi melibatkan dua tahapan utama, yaitu <strong>enkripsi</strong> dan <strong>dekripsi</strong>. Enkripsi adalah proses mengubah data asli yang dapat dibaca (disebut <em>Plaintext</em>) menjadi bentuk acak yang tidak dapat dipahami (disebut <em>Ciphertext</em>) dengan menggunakan rumus matematika dan kunci rahasia tertentu. Sebaliknya, dekripsi adalah proses mengembalikan data acak (<em>Ciphertext</em>) tersebut menjadi pesan semula (<em>Plaintext</em>) agar penerima yang sah dapat membaca dan memahami isinya dengan kunci dekripsi yang cocok.</p>
        
        <p>Berdasarkan jenis kunci yang digunakan, algoritma kriptografi modern terbagi menjadi dua kategori utama, yaitu kriptografi simetris dan asimetris. Kriptografi simetris menggunakan satu kunci rahasia yang sama untuk enkripsi dan dekripsi (seperti standar AES yang sangat cepat), sedangkan kriptografi asimetris menggunakan sepasang kunci: <em>Public Key</em> (untuk mengenkripsi pesan, boleh disebarkan secara bebas) dan <em>Private Key</em> (untuk mendekripsi pesan, wajib disimpan rahasia oleh pemiliknya). Penerapan asimetris ini digunakan dalam enkripsi HTTPS (SSL/TLS) yang mengamankan transaksi bank online kita.</p>
        
        <p>Dengan mempelajari konsep kriptografi, siswa Sekolah Cinta Kasih Tzu Chi dibekali kesadaran tinggi perihal pentingnya menjaga kerahasiaan dan privasi data pribadi di dunia maya. Budaya humanis mengajarkan kita untuk saling menghormati hak orang lain, termasuk hak atas privasi data digital mereka. Melalui pemahaman kriptografi ini, siswa tidak hanya belajar cara melindungi akun media sosial mereka dari peretasan secara teknis, melainkan juga menumbuhkan rasa empati dan integritas moral untuk tidak pernah menyalahgunakan teknologi demi merugikan pihak lain.</p>
      </div>
    `
  },
  'materi-info-4': {
    title: 'Vibe Coding',
    subject: 'Informatika - Tren Pemrograman Modern',
    date: 'Juli 2026',
    score: 'Materi Pembelajaran',
    tags: ['Vibe Coding', 'Artificial Intelligence', 'Software Development'],
    description: 'Vibe coding adalah tren pemrograman baru di mana manusia bertindak sebagai arsitek yang mengarahkan kecerdasan buatan (AI) untuk menyusun kode.',
    contentHtml: `
      <div class="space-y-4 text-slate-700 text-sm leading-relaxed">
        <img src="assets/images/vibe_coding.png" alt="Vibe Coding" class="w-full h-48 object-cover rounded-2xl mb-4 border border-blue-100 shadow-sm">
        
        <p><strong>Vibe coding</strong> adalah istilah modern dalam dunia teknologi informasi yang merujuk pada gaya pemrograman baru di mana manusia tidak lagi menulis baris kode (sintaks) satu per satu secara manual. Sebaliknya, peran pengembang bergeser menjadi arsitek perangkat lunak tingkat tinggi yang mengarahkan asisten kecerdasan buatan (AI) seperti LLM (<em>Large Language Model</em>) untuk menulis, memperbaiki, dan menyusun kode program. Fokus utama dalam <em>vibe coding</em> adalah rekayasa perintah (<em>prompt engineering</em>), pemahaman logika sistem, dan visualisasi produk secara keseluruhan, sementara pengerjaan teknis penulisan sintaks diserahkan sepenuhnya kepada kecerdasan buatan.</p>
        
        <p>Proses <em>vibe coding</em> berjalan secara interaktif melalui siklus dialog dan umpan balik antara manusia dan AI. Pengembang menjelaskan kebutuhan fitur, perilaku aplikasi, atau struktur data yang diinginkan dalam bahasa manusia biasa. AI kemudian merancang dan menulis kode secara instan, yang selanjutnya diuji secara langsung oleh pengembang. Jika terdapat galat (<em>bug</em>) atau hasil yang tidak sesuai ekspektasi, pengembang cukup memberikan instruksi perbaikan tambahan kepada AI hingga kode tersebut berfungsi dengan sempurna. Metode ini memangkas waktu belajar sintaks yang rumit dan mempercepat fase pembuatan prototipe aplikasi secara radikal.</p>
        
        <p>Fenomena ini membawa dampak transformatif yang sangat besar terhadap industri perangkat lunak dengan mendemokratisasi keahlian pemrograman. Siapa pun, termasuk pelajar atau desainer yang tidak memiliki latar belakang ilmu komputer yang mendalam, kini dapat merealisasikan ide aplikasi mereka menjadi produk nyata dalam waktu singkat. Di sisi lain, para pengembang profesional dapat menghemat waktu pengerjaan tugas rutin (<em>boilerplate code</em>) dan mengalihkan fokus mereka pada pemecahan masalah yang lebih kompleks, optimalisasi performa, keamanan sistem, serta inovasi fitur yang bernilai tinggi bagi pengguna.</p>
        
        <p>Di Sekolah Cinta Kasih Tzu Chi, eksplorasi teknologi mutakhir seperti <em>vibe coding</em> diajarkan selaras dengan penanaman nilai budi pekerti dan tanggung jawab etis. Kemudahan memproduksi kode secara otomatis menggunakan kecerdasan buatan menuntut siswa untuk memiliki integritas moral yang kuat agar tidak menyalahgunakan AI untuk menjiplak karya orang lain secara ilegal atau menciptakan perangkat lunak yang merugikan masyarakat. Siswa dilatih untuk menggunakan kemudahan <em>vibe coding</em> ini sebagai sarana efisiensi guna menciptakan solusi digital inovatif yang membawa manfaat nyata bagi sesama, mempromosikan nilai kemanusiaan, serta peduli terhadap lingkungan sosial sekitar.</p>
      </div>
    `
  },

  // Bahasa Indonesia Materi
  'materi-indo-1': {
    title: 'Teks Laporan Hasil Observasi (LHO)',
    subject: 'Bahasa Indonesia - Kebahasaan',
    date: 'Juli 2026',
    score: 'Materi Pembelajaran',
    tags: ['LHO', 'Observasi', 'Fakta'],
    description: 'Teks LHO memaparkan hasil pengamatan terhadap suatu objek secara sistematis, objektif, dan faktual.',
    contentHtml: `
      <div class="space-y-4 text-slate-700 text-sm leading-relaxed">
        <p>Teks Laporan Hasil Observasi (LHO) adalah jenis teks nonfiksi ilmiah yang memaparkan hasil pengamatan atau observasi terhadap suatu objek secara sistematis, objektif, dan faktual. Teks ini ditulis berdasarkan data otentik di lapangan tanpa dicampuri opini subjektif penulis.</p>
        
        <h4 class="font-bold text-slate-900 mt-3 text-base">Struktur Wajib Teks LHO:</h4>
        <ul class="list-disc pl-5 space-y-2 text-xs text-slate-600">
          <li><strong>Pernyataan Umum (Klasifikasi):</strong> Pembuka teks yang berisi definisi umum objek yang diamati serta pengelompokan dasarnya.</li>
          <li><strong>Deskripsi Bagian:</strong> Bagian inti yang menjelaskan ciri-ciri fisik, perilaku khusus, pembagian, habitat, atau karakteristik spesifik objek secara detail.</li>
          <li><strong>Deskripsi Manfaat:</strong> Penjelasan mengenai fungsi, kegunaan, atau manfaat langsung objek tersebut bagi manusia atau lingkungan sekitarnya.</li>
        </ul>
        
        <h4 class="font-bold text-slate-900 mt-3 text-base">Kaidah Kebahasaan Teks LHO:</h4>
        <ul class="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
          <li>Menggunakan kata benda umum (*nomen*) sebagai objek kajian utama.</li>
          <li>Menggunakan verba relasional/kopula untuk mendefinisikan objek (contoh: *adalah*, *merupakan*, *yaitu*).</li>
          <li>Menggunakan kata kerja aktif untuk menerangkan perilaku objek.</li>
          <li>Menggunakan istilah-istilah ilmiah atau teknis bidang studi tertentu.</li>
        </ul>
      </div>
    `
  },
  'materi-indo-2': {
    title: 'Teks Anekdot',
    subject: 'Bahasa Indonesia - Karya Sastra',
    date: 'Juli 2026',
    score: 'Materi Pembelajaran',
    tags: ['Anekdot', 'Kritik', 'Humor'],
    description: 'Teks anekdot adalah cerita pendek yang lucu, menarik, dan mengesankan untuk menyampaikan kritik sosial.',
    contentHtml: `
      <div class="space-y-4 text-slate-700 text-sm leading-relaxed">
        <p>Teks anekdot adalah cerita naratif pendek yang lucu, menarik, menghibur, dan mengesankan. Walaupun terlihat jenaka, teks anekdot memiliki fungsi sosial yang sangat serius, yaitu sebagai sarana menyampaikan kritik sosial, opini kritis, atau sindiran terhadap pelayanan publik, tokoh ternama, atau fenomena sosial di masyarakat secara santun dan cerdas.</p>
        
        <h4 class="font-bold text-slate-900 mt-3 text-base">Struktur Alur Teks Anekdot:</h4>
        <ul class="list-disc pl-5 space-y-2 text-xs text-slate-600">
          <li><strong>Abstraksi:</strong> Kalimat pengantar yang memberikan gambaran umum mengenai latar belakang atau topik cerita.</li>
          <li><strong>Orientasi:</strong> Bagian awal yang menceritakan urutan kejadian atau peristiwa sebelum terjadinya konflik utama.</li>
          <li><strong>Krisis (Masalah):</strong> Inti dari anekdot, berisi kejadian yang ganjil, unik, janggal, atau puncak kelucuan cerita.</li>
          <li><strong>Reaksi:</strong> Tanggapan atau penyelesaian dari masalah unik yang muncul di bagian krisis.</li>
          <li><strong>Koda:</strong> Bagian akhir cerita yang menyatakan kesimpulan, pesan moral, atau perubahan sikap tokoh.</li>
        </ul>
        
        <h4 class="font-bold text-slate-900 mt-3 text-base">Perbedaan Teks Anekdot dengan Humor Biasa:</h4>
        <p class="text-xs text-slate-600">Humor biasa hanya dibuat untuk menghibur atau memancing tawa tanpa tujuan lain. Sedangkan teks anekdot selalu membawa misi edukatif, pesan moral, atau sindiran halus yang bernilai kebenaran sosial.</p>
      </div>
    `
  },
  'materi-indo-3': {
    title: 'Teks Hikayat',
    subject: 'Bahasa Indonesia - Sastra Klasik',
    date: 'Juli 2026',
    score: 'Materi Pembelajaran',
    tags: ['Hikayat', 'Melayu', 'Nilai Moral'],
    description: 'Hikayat adalah karya sastra prosa lama berbahasa Melayu yang berkisah tentang kepahlawanan dan kesaktian.',
    contentHtml: `
      <div class="space-y-4 text-slate-700 text-sm leading-relaxed">
        <p>Hikayat adalah karya sastra prosa lama berbahasa Melayu klasik yang berisi kisah tentang kepahlawanan, keajaiban tokoh, kesaktian raja-raja, hingga petualangan magis. Hikayat diproduksi pada masa lalu sebagai sarana pelipur lara, pembangkit semangat juang, atau sekadar meramaikan pesta adat.</p>
        
        <h4 class="font-bold text-slate-900 mt-3 text-base">Karakteristik Unik Hikayat Nusantara:</h4>
        <ul class="list-disc pl-5 space-y-2 text-xs text-slate-600">
          <li><strong>Anonim:</strong> Nama penulis asli hampir tidak pernah dicantumkan karena ceritanya berkembang dari mulut ke mulut secara lisan.</li>
          <li><strong>Istanasentris:</strong> Setting cerita didominasi lingkungan kerajaan, keluarga istana, peperangan antar raja, atau kehidupan para keturunan dewa.</li>
          <li><strong>Kemustahilan:</strong> Alur cerita kental dengan unsur magis atau tidak logis (contoh: bayi lahir dengan pedang sakti, hewan bisa berbicara).</li>
          <li><strong>Statis (Kaku):</strong> Pola penceritaan dan akhir cerita sangat khas (misalnya tokoh protagonis selalu menang dan hidup bahagia).</li>
        </ul>
        
        <h4 class="font-bold text-slate-900 mt-3 text-base">Mengapa Kita Harus Mempelajari Hikayat?</h4>
        <p class="text-xs text-slate-600">Membaca hikayat membantu kita melestarikan nilai budaya luhur zaman prasejarah, memahami sejarah bahasa Melayu yang merupakan cikal bakal bahasa Indonesia, serta memperkaya daya imajinasi kreatif sastra kita.</p>
      </div>
    `
  },
  'materi-indo-4': {
    title: 'Teks Biografi',
    subject: 'Bahasa Indonesia - Nonfiksi',
    date: 'Juli 2026',
    score: 'Materi Pembelajaran',
    tags: ['Biografi', 'Inspirasi', 'Tokoh'],
    description: 'Teks biografi mengisahkan riwayat hidup seseorang secara faktual yang ditulis oleh orang lain.',
    contentHtml: `
      <div class="space-y-4 text-slate-700 text-sm leading-relaxed">
        <p>Teks biografi adalah teks naratif nonfiksi ilmiah yang menceritakan riwayat perjalanan hidup seorang tokoh secara faktual, ditulis oleh orang lain dari sudut pandang orang ketiga. Biografi bertujuan mendokumentasikan masa sulit, perjuangan karier, nilai-nilai kemanusiaan, hingga puncak prestasi tokoh tersebut.</p>
        
        <h4 class="font-bold text-slate-900 mt-3 text-base">Struktur Formal Teks Biografi:</h4>
        <ul class="list-disc pl-5 space-y-2 text-xs text-slate-600">
          <li><strong>Orientasi (Pengenalan):</strong> Berisi pengenalan tokoh secara umum, latar belakang keluarga, tanggal lahir, riwayat pendidikan awal, dan masa kecil tokoh.</li>
          <li><strong>Kejadian Penting & Masalah:</strong> Rangkaian alur kronologis peristiwa hidup tokoh, hambatan berat yang dihadapinya, serta keberhasilan menaklukkan rintangan demi meraih impian.</li>
          <li><strong>Reorientasi (Penutup/Pandangan Penulis):</strong> Opini penutup dari penulis biografi tentang warisan moral, keteladanan tokoh, atau kesimpulan pesan hidup tokoh bagi generasi penerus.</li>
        </ul>
        
        <h4 class="font-bold text-slate-900 mt-3 text-base">Perbedaan Biografi dan Otobiografi:</h4>
        <p class="text-xs text-slate-600">Biografi ditulis oleh orang lain untuk menceritakan riwayat hidup sang tokoh. Sementara otobiografi (autobiografi) ditulis oleh tokoh itu sendiri mengenai perjalanan hidupnya.</p>
      </div>
    `
  },
  'materi-indo-5': {
    title: 'Karya Sastra Puisi',
    subject: 'Bahasa Indonesia - Sastra',
    date: 'Juli 2026',
    score: 'Materi Pembelajaran',
    tags: ['Puisi', 'Sajak', 'Refleksi'],
    description: 'Puisi adalah ungkapan emosi, pemikiran, dan imajinasi penyair melalui bait-bait indah yang terikat oleh rima.',
    contentHtml: `
      <div class="space-y-4 text-slate-700 text-sm leading-relaxed">
        <p>Puisi adalah ungkapan perasaan, pikiran, emosi mendalam, dan daya imajinasi penyair yang diekspresikan lewat susunan bait dan baris yang indah. Puisi mentransformasikan gagasan abstrak menjadi estetika visual yang penuh dengan pesan tersembunyi.</p>
        
        <h4 class="font-bold text-slate-900 mt-3 text-base">Unsur Fisik (Struktur Luar) Puisi:</h4>
        <ul class="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
          <li><strong>Diksi:</strong> Pemilihan kata yang padat, ekspresif, dan memiliki kedalaman makna kiasan.</li>
          <li><strong>Citraan (Imaji):</strong> Kata atau susunan kalimat yang merangsang indra pembaca (pendengaran, penglihatan, perabaan) agar seolah mengalami sendiri apa yang ditulis penyair.</li>
          <li><strong>Majas (Gaya Bahasa):</strong> Penggunaan bahasa figuratif seperti metafora, personifikasi, atau hiperbola untuk melipatgandakan efek rasa.</li>
          <li><strong>Rima/Ritme:</strong> Pengulangan bunyi vokal/konsonan di akhir baris puisi demi menciptakan alunan melodi indah.</li>
        </ul>
        
        <h4 class="font-bold text-slate-900 mt-3 text-base">Unsur Batin (Struktur Dalam) Puisi:</h4>
        <p class="text-xs text-slate-600">Meliputi <strong>Tema</strong> (ide gagasan utama), <strong>Rasa/Sikap</strong> (ekspresi emosi penyair), <strong>Nada</strong> (suasana kejiwaan penyair saat berhadapan dengan pembaca), dan <strong>Amanat</strong> (tujuan moral/pesan moral yang ingin ditinggalkan bagi pembaca).</p>
      </div>
    `
  },
  'materi-indo-6': {
    title: 'Teks Negosiasi',
    subject: 'Bahasa Indonesia - Praktis',
    date: 'Juli 2026',
    score: 'Materi Pembelajaran',
    tags: ['Negosiasi', 'Komunikasi', 'Kesepakatan'],
    description: 'Teks negosiasi berisi percakapan atau interaksi sosial untuk menghasilkan kesepakatan bersama.',
    contentHtml: `
      <div class="space-y-4 text-slate-700 text-sm leading-relaxed">
        <p>Teks negosiasi adalah teks yang berisi proses interaksi sosial, tawar-menawar, atau dialog taktis antara dua pihak atau lebih yang memiliki kepentingan berbeda. Negosiasi bertujuan untuk merumuskan kesepakatan bersama yang sah, adil, dan saling menguntungkan (win-win solution) tanpa ada paksaan.</p>
        
        <h4 class="font-bold text-slate-900 mt-3 text-base">Struktur Percakapan Negosiasi:</h4>
        <ul class="list-disc pl-5 space-y-2 text-xs text-slate-600">
          <li><strong>Orientasi:</strong> Kalimat pembuka berupa salam, sapaan santun, atau basa-basi untuk mencairkan suasana.</li>
          <li><strong>Permintaan:</strong> Pihak pembeli atau pengaju mengutarakan keinginan atau kebutuhan barang/jasa yang ingin dicapai.</li>
          <li><strong>Pemenuhan:</strong> Tanggapan dari pihak penyedia barang/jasa untuk menjelaskan kesiapan atau kondisi barang/jasa tersebut.</li>
          <li><strong>Penawaran:</strong> Proses inti tawar-menawar harga, spesifikasi, atau opsi kompromi antar pihak.</li>
          <li><strong>Persetujuan:</strong> Tahap krusial di mana tercapai kesepakatan bersama yang disetujui tanpa paksaan.</li>
          <li><strong>Penutup:</strong> Salam akhir untuk menutup percakapan secara profesional.</li>
        </ul>
      </div>
    `
  }
};

function initAssignmentModals() {
  const modal = document.getElementById('assignment-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const modalBody = document.getElementById('modal-body-content');
  const modalTitle = document.getElementById('modal-title');
  const modalSubject = document.getElementById('modal-subject');
  const modalDate = document.getElementById('modal-date');
  const modalScore = document.getElementById('modal-score');
  const modalTags = document.getElementById('modal-tags');

  document.querySelectorAll('.open-modal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const taskId = btn.getAttribute('data-task-id');
      const data = assignmentData[taskId];

      if (data && modal) {
        modalTitle.textContent = data.title;
        modalSubject.textContent = data.subject;
        modalDate.textContent = data.date;
        modalScore.textContent = data.score;
        modalBody.innerHTML = data.contentHtml;

        // Render Blue Tags
        modalTags.innerHTML = data.tags.map(t => 
          `<span class="px-3 py-1 text-xs font-semibold rounded-full bg-blue-600 text-white">${t}</span>`
        ).join('');

        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      document.body.style.overflow = 'auto';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = 'auto';
      }
    });
  }
}

/**
 * Smooth Scroll Utility
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElem = document.querySelector(targetId);
        if (targetElem) {
          e.preventDefault();
          targetElem.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
}
