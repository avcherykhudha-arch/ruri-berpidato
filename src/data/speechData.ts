import { SpeechSection } from '../types';
import { stripIntonationTags } from '../utils/speechUtils';

function createParagraph(
  id: string,
  rawText: string,
  intonationFocus?: 'TEGAS' | 'JEDA' | 'LEMBUT' | 'TEKANAN' | 'SEMANGAT' | 'RENUNGAN',
  deliveryTip?: string
) {
  return {
    id,
    rawText,
    cleanText: stripIntonationTags(rawText),
    intonationFocus,
    deliveryTip
  };
}

export const EVENT_DETAILS = {
  eventName: 'Upacara Peringatan Hari Pahlawan 2026',
  dateFormatted: 'Selasa, 10 November 2026',
  targetDateIso: '2026-11-10T07:30:00+07:00',
  venue: 'SMAS TUNAS BARU JIN SEUNG BATAM',
  pembina: 'BU GURU RURI OKVAWANI',
  pembinaRole: 'Pembina Upacara / Tenaga Pendidik',
  theme: 'PAHLAWANKU TELADANKU, MELANGKAH BERSAMA MELANJUTKAN PERJUANGAN',
  targetDurationMinutes: 20
};

export const SPEECH_SECTIONS: SpeechSection[] = [
  {
    id: 'sec-1',
    number: 1,
    title: 'Salam Pembuka & Penghormatan Resmi',
    sectionCategory: 'Protokoler & Salam',
    estimatedMinutes: 2.0,
    keyTakeaway: 'Salam inklusif penuh kehangatan, penghormatan kepada pimpinan sekolah, rekan pendidik, staf tata usaha, dan seluruh siswa.',
    cues: [
      'Salam Sejahtera, Shalom, Om Swastyastu, Namo Buddhaya, Salam Kebajikan, Rahayu',
      'Selamat pagi dan salam sehat bagi keluarga besar sekolah',
      'Penghormatan Kepala Sekolah & Rekan Dewan Guru serta Tendik',
      'Sapaan hangat untuk seluruh siswa di lapangan upacara SMAS Tunas Baru Jin Seung Batam'
    ],
    paragraphs: [
      createParagraph(
        'sec-1-p1',
        '[TEGAS] Salam sejahtera bagi kita semua, [JEDA] Shalom, [JEDA] Om Swastyastu, Namo Buddhaya, [JEDA] Salam kebajikan, Rahayu, dan salam damai bagi kita sekalian. [JEDA] Selamat pagi dan salam sehat yang penuh berkah bagi seluruh keluarga besar SMAS Tunas Baru Jin Seung Batam yang sangat saya banggakan dan saya muliakan.',
        'TEGAS',
        'Ucapkan salam pembuka dengan suara lantang, wibawa penuh keramahan, artikulasi bulat, dan pandangan menyeluruh.'
      ),
      createParagraph(
        'sec-1-p2',
        '[LEMBUT] Yang teramat saya hormati, Bapak Kepala SMAS Tunas Baru Jin Seung Batam yang senantiasa bijaksana memimpin bahtera pendidikan kita. Yang saya hormati, rekan-rekan Dewan Guru, bapak dan ibu guru pembimbing, staf tata usaha, serta segenap tenaga kependidikan yang setiap fajar menyingsing tanpa lelah mencurahkan tenaga, ketulusan, dan doa terbaik demi mengantarkan tunas-tunas muda bangsa menuju gerbang masa depan yang gemilang.',
        'LEMBUT',
        'Arahkan tatapan penuh hormat dan apresiasi ke barisan dewan guru dan pimpinan sekolah.'
      ),
      createParagraph(
        'sec-1-p3',
        '[LEMBUT] Serta yang paling saya cintai, saya banggakan, dan saya rindukan kejayaannya dari lubuk sanubari terdalam: [TEKANAN] seluruh anak-anakku, siswa dan siswi SMAS Tunas Baru Jin Seung Batam dari kelas sepuluh, sebelas, hingga kelas dua belas, yang berdiri tegap berbaris rapi di bawah naungan kibaran Sang Merah Putih pada pagi hari yang sejuk dan bersejarah ini.',
        'TEKANAN',
        'Tatap hangat seluruh siswa. Biarkan mereka merasakan kasih seorang ibu guru yang bangga pada muridnya.'
      ),
      createParagraph(
        'sec-1-p4',
        '[RENUNGAN] Marilah kita bersama-sama menundukkan hati, memanjatkan puji dan syukur sedalam-dalamnya ke hadirat Tuhan Yang Maha Kuasa. Karena hanya atas kelimpahan rahmat, perlindungan, serta nafas kehidupan dari-Nya, kita semua diperkenankan berhimpun dalam keadaan sehat walafiat untuk melangsungkan Upacara Peringatan Hari Pahlawan Nasional pada tanggal 10 November 2026.',
        'RENUNGAN',
        'Keluarkan rasa syukur yang dalam, tenang, dan berbobot spiritual.'
      )
    ]
  },
  {
    id: 'sec-2',
    number: 2,
    title: 'Pantun Pembuka Semangat Kebangsaan',
    sectionCategory: 'Pantun Pembuka',
    estimatedMinutes: 1.5,
    keyTakeaway: 'Pantun menggugah tentang laut Batam, keberanian pejuang Surabaya, dan panggilan melanjutkan kemerdekaan.',
    cues: [
      'Layar perahu di Selat Malaka & Pulau Sambu',
      'Pekik pejuang mempertahankan merdeka',
      'Kota Batam tempat bertunas generasi unggul',
      'Menyalakan api teladan di dalam sanubari'
    ],
    paragraphs: [
      createParagraph(
        'sec-2-p1',
        '[SEMANGAT] Anak-anakku dan rekan-rekan guru yang saya hormati, sebelum kita melangkah lebih jauh menyelami samudera makna peringatan hari ini, izinkan saya membawakan bait-bait pantun pembakar semangat untuk menyapa hati kita bersama:',
        'SEMANGAT',
        'Tersenyum ramah dan bangun interaksi hangat sebelum melantunkan pantun.'
      ),
      createParagraph(
        'sec-2-p2',
        'Perahu pinisi membelah Selat Malaka, [JEDA]\nSinggah berlabuh di Pulau Sambu nan megah. [JEDA]\nBila pahlawan gugur demi Indonesia merdeka, [JEDA]\nKini giliran kita melangkah pantang menyerah!',
        'TEGAS',
        'Beri jeda setelah baris kedua, lalu tekankan baris keempat dengan nada optimis dan mantap.'
      ),
      createParagraph(
        'sec-2-p3',
        '[SEMANGAT] Memang elok kota Batam penuh pesona, [JEDA]\nBumi Melayu bertabur insan berhati mulia. [JEDA]\nHari Pahlawan kita peringati bersama, [JEDA]\nNyalakan api keteladanan sepanjang usia!',
        'SEMANGAT',
        'Tekankan kata \'Nyalakan api keteladanan\' agar siswa merasa terpanggil secara batiniah.'
      )
    ]
  },
  {
    id: 'sec-3',
    number: 3,
    title: 'Pengantar Hari Pahlawan: Jejak Darah & Air Mata 10 November 1945',
    sectionCategory: 'Kilas Balik Sejarah & Refleksi',
    estimatedMinutes: 2.5,
    keyTakeaway: 'Kemerdekaan Indonesia tidak diperoleh secara gratis; Surabaya 1945 saksi darah, air mata, dan keberanian rakyat.',
    cues: [
      'Mengenang Surabaya 10 November 1945',
      'Bukan cerita fiksi, tapi pengorbanan nyata',
      'Bambu runcing melawan senjata modern tentara sekutu',
      'Dapur umum ibu-ibu dan santri pemuda bersatu',
      'Harga kemerdekaan yang teramat mahal'
    ],
    paragraphs: [
      createParagraph(
        'sec-3-p1',
        '[RENUNGAN] Anak-anakku sekalian yang Ibu sayangi, setiap kali jarum jam berputar dan kalender bangsa ini menunjuk angka 10 November, nurani kita diajak melintasi lorong waktu, kembali pada delapan puluh satu tahun yang silam. Tepatnya di kota Surabaya pada tahun 1945. Di sana, langit kelabu dipenuhi asap mesiu, dentuman meriam menggetarkan tanah pertiwi, dan desing peluru tentara Sekutu menghujam tanpa belas kasihan.',
        'RENUNGAN',
        'Tempo perlahan, hening, ajak audiens mengheningkan cipta dan memvisualisasikan medan laga Surabaya 1945.'
      ),
      createParagraph(
        'sec-3-p2',
        '[TEKANAN] Coba bayangkan sejenak dalam benak kalian, anak-anakku... Mereka yang berhamburan maju ke garis depan kala itu sebagian besar bukanlah serdadu profesional dengan persenjataan canggih. Sebagian besar dari mereka adalah pemuda-pemudi belia, pelajar, santri, dan anak-anak muda yang umurnya persis sama seperti kalian yang kini berdiri di hadapan Ibu! [JEDA] Mereka tidak memiliki tank baja, mereka tidak memiliki pesawat tempur, bahkan peluru pun mereka hitung satu per satu. Senjata utama mereka adalah sebilah bambu runcing, doa tulus dari para orang tua di dapur umum, tekad membaja di dada, serta ikatan pita Merah Putih di kening.',
        'TEKANAN',
        'Sampaikan dengan penuh penekanan empati. Tekankan bahwa para pejuang itu sebaya dengan siswa SMA.'
      ),
      createParagraph(
        'sec-3-p3',
        '[LEMBUT] Mereka tahu persis bahwa melangkah ke medan pertempuran itu berarti kemungkinan besar tidak akan pernah lagi memeluk ayah dan ibu mereka di rumah. Mereka tahu peluru lawan bisa merenggut nyawa mereka dalam hitungan detik. [JEDA] Namun mengapa mereka tidak mundur? Mengapa mereka tidak memilih bersembunyi di balik pintu rumah yang aman? [JEDA] [TEGAS] Karena di dalam dada mereka telah tertanam satu sumpah suci yang tak tergoyahkan: Lebih baik mati berkalang tanah daripada hidup kembali menjadi bangsa budak yang terjajah di negerinya sendiri!',
        'TEGAS',
        'Transisi vokal dari keharuan mendalam menjadi ketegasan yang mengguncang sanubari.'
      ),
      createParagraph(
        'sec-3-p4',
        '[RENUNGAN] Hari ini, anak-anakku, kita dapat berdiri tegak di lapangan upacara SMAS Tunas Baru Jin Seung Batam ini dengan aman, damai, dan berpengharapan. Kita tidak perlu tiarap karena takut roket meledak. Kita bisa duduk di ruang kelas yang nyaman, bersenda gurau dengan kawan karib, dan mengenakan seragam putih abu-abu ini [JEDA] karena ada darah yang pernah tumpah membasahi bumi nusantara. Ada air mata ibu yang mengering menanti anaknya yang tak kunjung pulang. Dan ada ribuan jiwa syuhada bangsa yang jasadnya terkubur tanpa nama demi bendera Merah Putih tetap berkibar di angkasa. [TEKANAN] Kemerdekaan ini tidak turun gratis dari langit, kemerdekaan ini ditebus dengan harga yang teramat mahal!',
        'RENUNGAN',
        'Turunkan intonasi, berikan jeda hening agar pesan mengenai harga kemerdekaan benar-benar membekas.'
      )
    ]
  },
  {
    id: 'sec-4',
    number: 4,
    title: 'Makna Tema: Pahlawanku Teladanku di Era Modern',
    sectionCategory: 'Elaborasi Nilai Keteladanan',
    estimatedMinutes: 2.5,
    keyTakeaway: 'Pahlawan masa kini bukan pemegang senapan; melainkan siapapun yang berintegritas, tulus, dan memberi manfaat.',
    cues: [
      'Tema: Pahlawanku Teladanku',
      'Pahlawan bertransformasi di zaman modern',
      'Pahlawan: Siswa bangun subuh menepis kemalasan',
      'Pahlawan: Siswa jujur saat ujian tanpa diawasi',
      'Pahlawan: Guru yang sabar & orang tua yang berkeringat di Batam',
      'Setiap insan yang menghadirkan kebaikan bagi sesama'
    ],
    paragraphs: [
      createParagraph(
        'sec-4-p1',
        '[TEGAS] Tema peringatan Hari Pahlawan Nasional tahun 2026 ini menyerukan kepada kita: [TEKANAN] "PAHLAWANKU TELADANKU, MELANGKAH BERSAMA MELANJUTKAN PERJUANGAN." [JEDA] Tema agung ini bukan sekadar susunan kata indah untuk menghiasi baliho sekolah atau spanduk upacara. Tema ini adalah panggilan moral, panggilan jiwa bagi setiap insan yang bernafas di tanah air Indonesia.',
        'TEGAS',
        'Sampaikan dengan wibawa dan penekanan kuat pada frasa tema.'
      ),
      createParagraph(
        'sec-4-p2',
        '[LEMBUT] Seringkali kita menyangka bahwa gelar pahlawan itu hanya milik mereka yang gugur di masa silam—sosok dengan potret hitam putih di buku lembar kerja siswa, atau nama jalan yang sering kita lewati di tengah kota. [JEDA] Kita merasa pahlawan itu terlalu jauh, terlalu tinggi, dan mustahil kita capai. [JEDA] [TEGAS] Namun ketahuilah, anak-anakku, hakikat pahlawan hari ini telah bertransformasi secara mendasar!',
        'TEGAS',
        'Ajak siswa mendefinisikan ulang makna pahlawan dalam kehidupan sehari-hari mereka.'
      ),
      createParagraph(
        'sec-4-p3',
        '[TEKANAN] Siapakah pahlawan sejati di zaman modern ini? [JEDA] Pahlawan masa kini adalah seorang siswa yang rela bangun pagi-pagi buta, menepis selimut dingin kemalasan, melipat sajadah atau merapikan tempat tidurnya, lalu melangkah ke sekolah dengan doa tulus membahagiakan orang tuanya. [JEDA] Pahlawan adalah siswa yang tetap memegang teguh kejujuran saat lembar ujian dibagikan, meskipun kawan di sampingnya berbisik menawarkan contekan, dan meskipun tidak ada pengawas yang melihat. Kejujuran di saat sunyi itulah kepahlawanan sejati!',
        'TEKANAN',
        'Gunakan contoh konkret yang langsung menyentuh pengalaman nyata kehidupan siswa di sekolah.'
      ),
      createParagraph(
        'sec-4-p4',
        '[LEMBUT] Pahlawan adalah kalian, yang ketika melihat sahabatmu duduk terdiam murung di pojok kelas, kalian datang menyapa, berbagi bekal, dan menjadi pendengar yang setia. [JEDA] Pahlawan adalah Bapak dan Ibu Gurumu, yang meski lelah dan menghadapi berbagai pergumulan hidup pribadi, tetap melangkah masuk ke kelas dengan senyuman tulus, sabar mengulang penjelasan materi demi memastikan tidak ada satu pun dari kalian yang tertinggal. [JEDA] Dan pahlawan yang paling nyata dalam hidupmu adalah ayah dan ibumu di rumah, yang telapak tangannya menebal dan kasap, yang bajunya basah oleh keringat di galangan perkapalan, di pabrik perakitan elektronik, di pasar basah, atau di jalanan terik pulau Batam ini, demi selembar uang halal agar kalian bisa mengenyam pendidikan terbaik di SMAS Tunas Baru Jin Seung Batam.',
        'LEMBUT',
        'Vokal penuh kelembutan dan keharuan mendalam yang menyentuh bakti anak kepada orang tua.'
      )
    ]
  },
  {
    id: 'sec-5',
    number: 5,
    title: 'Melangkah Bersama Melanjutkan Perjuangan Generasi Masa Depan',
    sectionCategory: 'Tantangan Nyata Generasi Muda',
    estimatedMinutes: 3.0,
    keyTakeaway: 'Perjuangan generasi Z & Alpha: perang melawan rasa malas, darurat perundungan/bullying, bijak medsos, ketangguhan mental, dan persatuan Batam.',
    cues: [
      'Bukan lagi mengangkat bedil, tapi mengangkat ilmu dan integritas',
      'Perang terbesar: Melawan kemalasan dan godaan gawai tanpa faedah',
      'Katakan TIDAK pada perundungan (Stop Bullying di sekolah)',
      'Bijak bermedia sosial, bukan penyebar hoaks dan kebencian',
      'Mental tangguh: Bangkit ketika nilai jatuh atau gagal lomba',
      'Kuasai sains, teknologi, dan bahasa di Batam kota industri',
      'Merajut persatuan di tengah kebinekaan suku, agama, dan budaya'
    ],
    paragraphs: [
      createParagraph(
        'sec-5-p1',
        '[TEGAS] Jika delapan puluh satu tahun lalu para pejuang kita berhadapan dengan tank baja, senapan mesin, dan bayonet musuh, [JEDA] maka medan laga generasi kalian hari ini jauh lebih sunyi namun tidak kalah berbahayanya. Medan laga kalian berada di dalam ruang kelas, di laboratorium, di layar ponsel pintar di genggaman tangan, dan di dalam pertarungan melawan hawa nafsu diri sendiri.',
        'TEGAS',
        'Tegaskan bahwa pertempuran zaman sekarang adalah perang integritas dan penguasaan diri.'
      ),
      createParagraph(
        'sec-5-p2',
        '[TEKANAN] Musuh terbesar kalian hari ini bukan serdadu asing penjajah. Musuh terbesar kalian adalah rasa malas yang selalu berbisik: "Nanti saja belajarnya, masih ada hari esok!" Musuh terbesar kalian adalah kecanduan game dan gawai tanpa kendali, yang diam-diam merampas jam tidurmu, merusak kesehatan matamu, dan menghancurkan masa depan cemerlangmu! [JEDA] [TEGAS] Sadarlah anak-anakku, bangsa ini tidak akan pernah maju bila generasinya terlena dalam buaian kesenangan semu!',
        'TEGAS',
        'Suara tegas dan berbobot peringatan penuh kepedulian seorang ibu guru pendidik.'
      ),
      createParagraph(
        'sec-5-p3',
        '[LEMBUT] Ibu juga ingin menitipkan pesan yang teramat penting dari podium ini: [TEKANAN] Hentikan dan bersihkan sekolah kita dari segala bentuk perundungan atau bullying, baik secara lisan, fisik, maupun di dunia maya! [JEDA] [LEMBUT] Dengarkan Ibu: Tidak ada kehebatan dalam menertawakan kelemahan fisik temanmu. Tidak ada kehormatan dalam mengucilkan kawan yang pendiam. Pahlawan sejati tidak pernah memadamkan lentera orang lain agar lenteranya terlihat paling terang! Pahlawan sejati adalah mereka yang menggunakan kekuatannya untuk melindungi yang lemah, dan merengkuh mereka yang tersisihkan.',
        'LEMBUT',
        'Penekanan keras dan penuh empati pada larangan perundungan (anti-bullying).'
      ),
      createParagraph(
        'sec-5-p4',
        '[SEMANGAT] Gunakan jari-jemari kalian di media sosial untuk menyebarkan berita kebaikan, karya kreatif, dan inspirasi, bukan komentar jahat, fitnah, atau hoaks yang memecah belah bangsa. Dan ketika kalian menghadapi kegagalan—saat nilai ujianmu turun, saat perlombaanmu belum meraih piala, atau saat cita-citamu menemui jalan buntu—jangan pernah menyerah dan jangan putus asa! Pahlawan kita dahulu berulang kali mengalami kekalahan di medan perang, namun mereka tidak pernah mengibarkan bendera putih keputusasaan! Dari setiap kegagalan, mereka bangkit kembali dengan tekad yang berlipat ganda!',
        'SEMANGAT',
        'Bangkitkan daya juang mental para siswa agar tangguh menghadapi kegagalan.'
      ),
      createParagraph(
        'sec-5-p5',
        '[TEGAS] Kita beruntung tinggal dan belajar di Batam, sebuah kota industri berdaya saing global yang menjadi etalase terdepan Indonesia di mata dunia. Kuasailah sains, kuasailah teknologi informasi dan kecerdasan buatan, fasihkan kemampuan bahasamu, namun tetap rawatlah adab dan kesantunan budi pekerti ketimuran. Dan di atas segalanya, jagalah persatuan! Di SMAS Tunas Baru Jin Seung Batam, kita berpadu dari berbagai suku bangsa, agama, dan latar belakang keluarga. Kebinekaan ini adalah kekayaan anugerah Tuhan yang wajib kita rawat dengan segenap cinta kasih.',
        'TEGAS',
        'Sorot konteks strategis kota Batam dan harmonisasi kebinekaan di lingkungan sekolah.'
      )
    ]
  },
  {
    id: 'sec-6',
    number: 6,
    title: 'Pesan Khusus untuk Siswa SMAS Tunas Baru Jin Seung Batam',
    sectionCategory: 'Puncak Emosional & Sentuhan Kalbu',
    estimatedMinutes: 3.5,
    keyTakeaway: 'Ibu Guru memandang setiap siswa dengan cinta; masa depan Indonesia ada di tangan mereka yang terus berusaha tanpa kenal menyerah.',
    cues: [
      'Ibu memandang kalian satu per satu dari podium kehormatan ini',
      'Masa depan Indonesia bukan hanya milik anak konglomerat atau pejabat',
      'Masa depan Indonesia ada di pundak kalian di lapangan upacara ini',
      'Kalian yang pernah minder, gagal, atau diremehkan: Ibu sangat percaya pada kalian',
      'Tunas Baru Jin Seung Batam adalah rahim lahirnya generasi penerus bangsa berjiwa pahlawan'
    ],
    paragraphs: [
      createParagraph(
        'sec-6-p1',
        '[LEMBUT] Anak-anakku tercinta di SMAS Tunas Baru Jin Seung Batam... [JEDA] Berdirinya Ibu di podium kehormatan ini pada pagi hari ini bukan sekadar untuk menjalankan tugas protokoler upacara. Berdirinya Ibu di sini adalah sebagai seorang guru, seorang pendidik, dan seorang ibu yang menatap kalian satu per satu dengan rasa cinta yang tulus dan harapan yang tak terhingga.',
        'LEMBUT',
        'Bicara dari hati ke hati, turunkan sedikit tempo, jadikan atmosfer hening dan sarat sentuhan batin.'
      ),
      createParagraph(
        'sec-6-p2',
        '[RENUNGAN] Dengarkan Ibu baik-baik, anak-anakku sekalian... [JEDA] Masa depan Republik Indonesia yang terbentang dari Sabang sampai Merauke ini tidak hanya ditentukan oleh orang-orang yang duduk di gedung megah ibu kota. Masa depan bangsa ini tidak hanya ditentukan oleh mereka yang bergelimang harta warisan atau anak-anak dari pejabat tinggi berkuasa.',
        'RENUNGAN',
        'Beri jeda hening agar setiap siswa merasa diajak berbicara secara langsung dan personal.'
      ),
      createParagraph(
        'sec-6-p3',
        '[LEMBUT] Masa depan Indonesia sedang ditentukan hari ini, di detik ini, [TEKANAN] oleh anak-anak yang berdiri tegak berjemur matahari di lapangan upacara SMAS Tunas Baru Jin Seung Batam ini!',
        'TEKANAN',
        'Ucapkan dengan penuh rasa bangga dan keyakinan mutlak.'
      ),
      createParagraph(
        'sec-6-p4',
        '[LEMBUT] Ibu tahu, mungkin di antara kalian ada yang saat ini sedang memendam beban berat. Mungkin ada yang merasa rendah diri karena keadaan ekonomi orang tua yang serba pas-pasan. Mungkin ada yang pernah terluka karena dicap lambat belajar, pernah diremehkan oleh orang lain, atau bahkan pernah merasa tidak berguna dan putus asa memandang hari esok. [JEDA] Dengarkan suara Ibu hari ini, tatap mata Ibu: [TEGAS] Kalian tidak pernah sia-sia! Di dalam diri setiap siswa yang berdiri di lapangan ini, Tuhan telah menenun potensi yang agung, bakat yang istimewa, dan rencana masa depan yang penuh dengan harapan!',
        'TEGAS',
        'Afirmasi kuat penumbuh harga diri bagi siswa yang sedang rapuh atau kehilangan arah.'
      ),
      createParagraph(
        'sec-6-p5',
        '[LEMBUT] Jangan pernah membandingkan awal perjalananmu dengan puncak keberhasilan orang lain. Selama kalian tidak pernah berhenti melangkah, selama kalian tidak pernah menyerah untuk bangun setiap kali terjatuh, dan selama kalian terus berusaha menjadi insan yang lebih jujur dan lebih baik dari hari kemarin—bagi Ibu, kalian semua adalah pahlawan-pahlawan sejati di hati kami para guru! Kami bangga mendidik kalian, dan kami percaya kelak nama SMAS Tunas Baru Jin Seung Batam akan harum semerbak di seantero nusantara berkat baktimu.',
        'LEMBUT',
        'Ekspresikan senyum haru dan kehangatan tulus seorang ibu pendidik.'
      )
    ]
  },
  {
    id: 'sec-7',
    number: 7,
    title: 'Pesan dan Refleksi Spiritual Kristiani yang Inklusif & Penuh Kasih',
    sectionCategory: 'Refleksi Spiritual & Kasih Semesta',
    estimatedMinutes: 2.5,
    keyTakeaway: 'Refleksi Kolose 3:23 — lakukan segala sesuatu dengan segenap hati seperti untuk Tuhan; jadilah garam dan terang.',
    cues: [
      'Refleksi nurani dan ketulusan universal',
      'Kolose 3:23: Lakukan segala sesuatu dengan segenap hati seperti untuk Tuhan',
      'Ketulusan belajar dan mengabdi tanpa pamrih manusia',
      'Jadilah garam yang memberi damai dan terang yang mengusir kegelapan',
      'Saluran berkat bagi sesama di Batam dan Indonesia'
    ],
    paragraphs: [
      createParagraph(
        'sec-7-p1',
        '[RENUNGAN] Dalam keheningan doa dan refleksi nurani kita pada pagi yang mulia ini, perkenankan saya juga membagikan secercah perenungan spiritual yang sarat dengan nilai kasih, kerendahan hati, dan ketulusan universal. Sebuah nilai luhur yang melintasi sekat perbedaan dan menuntun kita memaknai setiap pengorbanan.',
        'RENUNGAN',
        'Ciptakan suasana syahdu, teduh, merangkul semua peserta dengan damai.'
      ),
      createParagraph(
        'sec-7-p2',
        '[LEMBUT] Sebagaimana firman Tuhan yang tertulis indah dalam Kitab Suci pada surat [TEKANAN] Kolose pasal 3 ayat 23 mengingatkan kita: [JEDA] [RENUNGAN] "Apapun juga yang kamu perbuat, perbuatlah dengan segenap hatimu seperti untuk Tuhan dan bukan untuk manusia."',
        'RENUNGAN',
        'Kutip ayat Alkitab dengan khidmat, artikulasi bening, dan hening sejenak.'
      ),
      createParagraph(
        'sec-7-p3',
        '[LEMBUT] Renungkanlah pesan suci ini, anak-anakku dan rekan-rekan pendidik yang saya hormati. Ayat ini mengajarkan kepada kita makna terdalam dari sebuah integritas dan ketulusan hidup. Para pahlawan bangsa yang gugur di medan laga tidak pernah mengharapkan tepuk tangan manusia. Mereka tidak menuntut medali emas atau pujian dari orang lain. Mereka berjuang dengan segenap jiwa dan raga, karena mereka meyakini bahwa pengorbanan demi keadilan dan kebebasan sesama adalah panggilan luhur di hadapan Sang Pencipta semesta alam.',
        'LEMBUT',
        'Hubungkan firman Kolose 3:23 dengan ketulusan pengorbanan para pejuang 1945.'
      ),
      createParagraph(
        'sec-7-p4',
        '[TEGAS] Maka dalam hidup kita sehari-hari: [JEDA] Ketika kalian belajar, belajarlah dengan segenap hatimu. Ketika para guru mengajar, mengajarlah dengan segenap kasih dan kesabaran. Ketika kalian membantu orang tuamu, bantulah dengan segenap baktimu. Jangan pernah berbuat baik hanya ketika ada orang yang memuji, dan jangan pernah berhenti berbuat benar hanya karena tidak ada orang yang melihat. [SEMANGAT] Jadilah pribadi yang membawa terang di kala kegelapan melanda, jadilah garam yang memberi rasa damai dan kerukunan, serta jadilah saluran berkat bagi sesama di manapun kaki kalian berpijak.',
        'SEMANGAT',
        'Dorongan moral yang membumi, universal, dan membakar semangat pelayanan tanpa pamrih.'
      )
    ]
  },
  {
    id: 'sec-8',
    number: 8,
    title: 'Ajakan dan Komitmen Bersama: Menjadi Pahlawan Masa Kini',
    sectionCategory: 'Panggilan Bertindak (Call to Action)',
    estimatedMinutes: 2.0,
    keyTakeaway: 'Komitmen bersama di depan Sang Merah Putih: pahlawan bagi diri sendiri, keluarga, almamater, dan ibu pertiwi.',
    cues: [
      'Tegakkan bahu, angkat dagu, tatap Sang Saka Merah Putih',
      'Pahlawan bagi diri sendiri: Disiplin, integritas, pantang menyerah',
      'Pahlawan bagi keluarga: Membanggakan orang tua dengan budi pekerti',
      'Pahlawan bagi almamater SMAS Tunas Baru Jin Seung Batam',
      'Pahlawan bagi tanah air Indonesia: Merawat persatuan'
    ],
    paragraphs: [
      createParagraph(
        'sec-8-p1',
        '[TEGAS] Sebelum saya mengakhiri amanat upacara ini, saya meminta seluruh peserta upacara, khususnya anak-anakku generasi penerus bangsa: [TEKANAN] tegakkan bahumu, angkat dagumu, dan arahkan pandanganmu ke puncak tiang bendera, di mana Sang Saka Merah Putih berkibar dengan agung diterpa angin pagi.',
        'TEGAS',
        'Instruksikan dengan suara mantap agar seluruh peserta upacara fokus dan khidmat menatap bendera.'
      ),
      createParagraph(
        'sec-8-p2',
        '[SEMANGAT] Hari ini, Selasa 10 November 2026, di lapangan SMAS Tunas Baru Jin Seung Batam yang kita cintai ini, mari kita mengukir janji dan komitmen bersama di dalam relung dada kita:',
        'SEMANGAT',
        'Bawa hadirin ke titik ikrar bersama dengan intonasi menggelora.'
      ),
      createParagraph(
        'sec-8-p3',
        '[TEKANAN] Yang pertama, jadilah pahlawan bagi dirimu sendiri: [JEDA] Taklukkan rasa malasmu, jaga kesucian pikiranmu, pegang teguh disiplin, dan jangan biarkan keputusasaan menghentikan langkah impianmu! [JEDA]\n[TEKANAN] Yang kedua, jadilah pahlawan bagi keluargamu: [JEDA] Balaslah peluh keringat dan air mata ayah ibumu dengan prestasi membanggakan, tutur kata yang santun, dan bakti yang tak pernah pudar! [JEDA]\n[TEKANAN] Yang ketiga, jadilah pahlawan bagi almamatermu SMAS Tunas Baru Jin Seung Batam: [JEDA] Harumkan nama sekolah ini lewat keteladanan budi pekerti, keunggulan akademis dan non-akademis, serta semangat tolong-menolong yang tulus! [JEDA]\n[SEMANGAT] Dan yang keempat, jadilah pahlawan bagi bangsamu Republik Indonesia: [JEDA] Dengan menjaga persatuan di atas kebinekaan, menolak perpecahan, dan mempersembahkan karya terbaik bagi kemajuan tanah air!',
        'SEMANGAT',
        'Ucapkan poin 1 sampai 4 dengan dinamika vokal bertingkat yang membakar rasa cinta tanah air.'
      )
    ]
  },
  {
    id: 'sec-9',
    number: 9,
    title: 'Pantun Penutup Estafet Obor Perjuangan',
    sectionCategory: 'Pantun Penutup',
    estimatedMinutes: 1.0,
    keyTakeaway: 'Pantun penutup menggetarkan jiwa tentang Jembatan Barelang dan obor pahlawan yang tak boleh padam.',
    cues: [
      'Jembatan Barelang merajut pulau di laut Batam',
      'Semangat pahlawan bersemi di dada generasi Tunas Baru',
      'Obor pahlawan tak pernah padam di perapian zaman',
      'Meneruskan estafet kemerdekaan dengan penuh marwah'
    ],
    paragraphs: [
      createParagraph(
        'sec-9-p1',
        '[SEMANGAT] Sebagai bekal pengingat yang akan kita bawa pulang ke ruang-ruang kelas dan ke dalam sanubari kehidupan sehari-hari, terimalah untaian pantun penutup dari Ibu:',
        'SEMANGAT',
        'Tatap hadirin dengan senyum hangat dan sorot mata percaya diri.'
      ),
      createParagraph(
        'sec-9-p2',
        'Gagah berdiri Jembatan Barelang nan permai, [JEDA]\nMenghubungkan pulau merajut asa di laut tenang. [JEDA]\nBila semangat pahlawan senantiasa bersemi di hati, [JEDA]\nKelak siswa Tunas Baru pasti tampil jadi pemenang!',
        'SEMANGAT',
        'Lantunkan pantun dengan artikulasi merdu dan irama yang bersemangat.'
      ),
      createParagraph(
        'sec-9-p3',
        '[TEGAS] Layar terkembang menuju seberang, [JEDA]\nBawalah bibit pohon kelapa. [JEDA]\nWalau raga pahlawan telah berpulang, [JEDA]\nObor perjuangannya takkan pernah sirna!',
        'TEGAS',
        'Beri penekanan kuat pada dua baris terakhir agar pesan abadi terserap sempurna.'
      )
    ]
  },
  {
    id: 'sec-10',
    number: 10,
    title: 'Salam Penutup & Kalimat Pamungkas Penggugah Jiwa',
    sectionCategory: 'Penutup & Kalimat Pamungkas',
    estimatedMinutes: 1.5,
    keyTakeaway: 'Ungkapan syukur, salam penutup, dan satu kalimat pamungkas yang sangat membekas dan merenungkan makna perjuangan.',
    cues: [
      'Apresiasi dan terima kasih mendalam kepada seluruh keluarga besar sekolah',
      'Doa perlindungan Tuhan bagi SMAS Tunas Baru Jin Seung Batam dan Indonesia',
      'Salam penutup: Salam sejahtera, Shalom, Salam kebajikan, Rahayu',
      'Kalimat pamungkas penggugah jiwa: Kemerdekaan direbut dengan darah dan air mata, giliran kita menjaganya dengan karya nyata, akhlak mulia, dan cinta tanah air yang tak pernah padam',
      'Pekik MERDEKA tiga kali yang berwibawa'
    ],
    paragraphs: [
      createParagraph(
        'sec-10-p1',
        '[LEMBUT] Terima kasih yang tak terhingga atas perhatian, kesabaran, dan kekhidmatan dari Bapak Kepala Sekolah, rekan-rekan Dewan Guru, seluruh staf tata usaha, dan seluruh anak-anakku yang hebat dan luar biasa. Selamat memperingati Hari Pahlawan Nasional tahun 2026.',
        'LEMBUT',
        'Ucapkan rasa terima kasih dengan ketulusan seorang ibu dan tundukkan kepala sedikit sebagai tanda penghormatan.'
      ),
      createParagraph(
        'sec-10-p2',
        '[TEGAS] Semoga Tuhan Yang Maha Kuasa senantiasa mencurahkan perlindungan, hikmat, dan kesehatan bagi keluarga besar SMAS Tunas Baru Jin Seung Batam, serta melimpahkan damai sejahtera, kemakmuran, dan kejayaan yang abadi bagi nusa dan bangsa tercinta, Republik Indonesia.',
        'TEGAS',
        'Doa penutup yang berwibawa, teduh, dan mengayomi.'
      ),
      createParagraph(
        'sec-10-p3',
        '[TEGAS] Salam sejahtera bagi kita semua, [JEDA] Shalom, [JEDA] Om Shanti Shanti Shanti Om, [JEDA] Namo Buddhaya, [JEDA] Salam kebajikan, Rahayu. [JEDA]',
        'TEGAS',
        'Ucapkan salam lintas agama penutup secara tegas dan sempurna.'
      ),
      createParagraph(
        'sec-10-p4',
        '[SEMANGAT] Dan sebelum saya melangkah turun dari podium kehormatan ini, tanamkanlah kalimat pamungkas ini sedalam-dalamnya di dalam jiwa raga kalian: [JEDA] [TEGAS] "Kemerdekaan ini telah direbut oleh para pahlawan dengan tumpahan darah, keringat, dan air mata; [JEDA] [TEKANAN] kini adalah giliran kita menjaga dan memuliakannya dengan karya nyata, keluhuran akhlak, dan cinta tanah air yang tak akan pernah padam!" [JEDA] [SEMANGAT] MERDEKA! [JEDA] MERDEKA! [JEDA] MERDEKA! INDONESIA TETAP MERDEKA!',
        'SEMANGAT',
        'Puncak klimaks: kepalkan tangan di dada, pekik Merdeka dengan getaran patriotik yang menyulut tepuk tangan membahana di seluruh lapangan upacara.'
      )
    ]
  }
];

export const READINESS_CHECKLIST_DEFAULT = [
  {
    id: 'chk-1',
    title: 'Olah Vokal & Pemanasan Diafragma',
    description: 'Lakukan senam bibir, latihan vokal A-I-U-E-O, dan pernapasan perut 10 menit sebelum upacara.',
    category: 'Vokal & Suara' as const,
    completed: true
  },
  {
    id: 'chk-2',
    title: 'Penguasaan 10 Bagian Utama Pidato',
    description: 'Hafalkan urutan struktur: Salam, Pantun 1, Kilas Balik 1945, Makna Teladan, Tantangan Gen-Z, Pesan SMAS Tunas Baru, Refleksi Kolose 3:23, Ajakan 4 Butir, Pantun 2, Kalimat Pamungkas.',
    category: 'Penguasaan Naskah' as const,
    completed: false
  },
  {
    id: 'chk-3',
    title: 'Penjiwaan Tanda Intonasi [TEGAS], [LEMBUT], [JEDA]',
    description: 'Pastikan jeda 2-3 detik pada bagian emosional pesan siswa dan transisi pantun.',
    category: 'Vokal & Suara' as const,
    completed: false
  },
  {
    id: 'chk-4',
    title: 'Kontak Mata & Sikap Berdiri Tegak di Podium',
    description: 'Bagi pandangan secara berkala: 40% siswa tengah, 30% sayap kiri, 30% sayap kanan & dewan guru.',
    category: 'Bahasa Tubuh' as const,
    completed: false
  },
  {
    id: 'chk-5',
    title: 'Simulasi Waktu 20 Menit dengan Stopwatch',
    description: 'Latih penyampaian menggunakan Speech Timer agar durasi tetap pada rentang emas 18–22 menit.',
    category: 'Penguasaan Naskah' as const,
    completed: false
  },
  {
    id: 'chk-6',
    title: 'Pakaian Dinas Upacara Resmi (PDU / Jas / Batik Nasional)',
    description: 'Pastikan seragam pembina upacara rapi, bersih, mengenakan lencana Garuda/Korpri, dan sepatu dinas pantofel hitam bersih.',
    category: 'Penampilan & Teknis' as const,
    completed: false
  },
  {
    id: 'chk-7',
    title: 'Cek Mikrofon & Sound System Lapangan Batam',
    description: 'Uji kepekaan mikrofon podium terhadap hembusan angin lapangan Batam, jarak ideal bibir dengan mic sekitar 10-15 cm.',
    category: 'Penampilan & Teknis' as const,
    completed: false
  },
  {
    id: 'chk-8',
    title: 'Ketenangan Hati & Doa Pribadi Sebelum Naik Podium',
    description: 'Tarik napas dalam 4 detik, tahan 4 detik, hembuskan 6 detik. Berdoa memohon kelancaran dan berkat bagi para siswa.',
    category: 'Penguasaan Naskah' as const,
    completed: false
  }
];

export const INTONATION_GUIDES = [
  {
    tag: 'TEGAS',
    label: 'Tegas & Berwibawa',
    color: 'bg-red-700 text-white border-red-800',
    description: 'Artikulasi mantap, volume berbobot, tempo stabil untuk menunjukkan keteguhan dan wibawa pembina upacara.'
  },
  {
    tag: 'JEDA',
    label: 'Jeda Sejenak (2–3 detik)',
    color: 'bg-amber-600 text-white border-amber-700',
    description: 'Berhenti sejenak untuk membiarkan pesan meresap ke hati pendengar dan memberi ruang perenungan batin.'
  },
  {
    tag: 'LEMBUT',
    label: 'Lembut & Penuh Kasih',
    color: 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950 dark:text-rose-200 dark:border-rose-800',
    description: 'Nada penuh kasih sayang seorang guru perempuan yang merangkul dan memahami perasaan terdalam muridnya.'
  },
  {
    tag: 'TEKANAN',
    label: 'Penekanan Kata Kunci',
    color: 'bg-blue-700 text-white border-blue-800',
    description: 'Beri aksentuasi pada kata-kata penting agar menjadi ingatan jangka panjang bagi peserta upacara.'
  },
  {
    tag: 'SEMANGAT',
    label: 'Berkobar & Menggugah',
    color: 'bg-orange-600 text-white border-orange-700',
    description: 'Suara penuh daya dorong optimis untuk mengajak siswa bangkit dari keterpurukan dan melanjutkan perjuangan.'
  },
  {
    tag: 'RENUNGAN',
    label: 'Reflektif & Khidmat',
    color: 'bg-purple-700 text-white border-purple-800',
    description: 'Tempo melambat, nada rendah dan khidmat untuk mengajak siswa membayangkan pengorbanan pahlawan dan nilai Tuhan.'
  }
];
