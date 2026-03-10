# 🎓 Kişisel Ders Programı Oluşturucu

Modern **React + Tailwind CSS** kullanılarak geliştirilmiş bir **Ders
Programı Yönetim Uygulaması**.\
Kullanıcılar kendi haftalık ders programlarını oluşturabilir,
düzenleyebilir ve görsel bir tablo üzerinde görüntüleyebilir.

------------------------------------------------------------------------

## 🚀 Özellikler

✨ Bu uygulama aşağıdaki özellikleri içerir:

-   ➕ Yeni ders ekleme\
-   📋 Dersleri listeleme\
-   ✏️ Ders bilgilerini güncelleme\
-   ❌ Ders silme\
-   📅 Haftalık ders programı görünümü\
-   ⏰ Ders saatleri arasında çakışma kontrolü\
-   💾 LocalStorage ile veri kalıcılığı\
-   🎨 Renkli ders kartları\
-   📱 Responsive tasarım

------------------------------------------------------------------------

## 🖥️ Ekran Görüntüsü

Projeye ait ekran görüntüsünü aşağıdaki şekilde ekleyebilirsiniz:

``` md
![Proje Görseli](./screenshots/app.png)
```

------------------------------------------------------------------------

## 🧱 Kullanılan Teknolojiler

  Teknoloji         Açıklama
  ----------------- ------------------------------
  ⚛️ React          Kullanıcı arayüzü geliştirme
  🎨 Tailwind CSS   Modern stil ve tasarım
  ⚡ Vite           Hızlı geliştirme ortamı
  💾 LocalStorage   Verileri tarayıcıda saklama
  🌐 Netlify        Uygulama yayınlama

------------------------------------------------------------------------

## 📦 Kurulum

Projeyi bilgisayarında çalıştırmak için:

``` bash
# Projeyi klonla
git clone https://github.com/kullaniciadi/ders-programi.git

# Proje klasörüne gir
cd ders-programi

# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev
```

------------------------------------------------------------------------

## 🌐 Netlify Deploy

Projeyi canlıya almak için:

1.  GitHub'a push et\
2.  Netlify hesabına giriş yap\
3.  **New Site From Git** seç\
4.  GitHub reposunu bağla

### Build Ayarları

``` bash
Build Command: npm run build
Publish Directory: dist
```

Alternatif olarak Netlify CLI:

``` bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

------------------------------------------------------------------------

## 📁 Proje Yapısı

    src/
    ├── Components/
    │   ├── CourseForm.jsx
    │   ├── CourseList.jsx
    │   ├── EditCourseModal.jsx
    │   └── WeeklySchedule.jsx
    │
    ├── Pages/
    │   └── Home.jsx
    │
    ├── Interfaces/
    │   └── createCourse.js
    │
    ├── data/
    │   └── courses.json
    │
    ├── App.jsx
    ├── main.jsx
    └── index.css

------------------------------------------------------------------------

## ⚙️ Uygulama İşleyişi

### 1️⃣ Ders Ekleme

Kullanıcı ders adı, gün, başlangıç ve bitiş saati, sınıf, öğretim
görevlisi ve renk seçerek yeni ders ekleyebilir.

### 2️⃣ Ders Listeleme

Eklenen dersler kart yapısında listelenir.

### 3️⃣ Ders Güncelleme

Mevcut bir ders **Düzenle** butonu ile güncellenebilir.

### 4️⃣ Ders Silme

Dersler **Sil** butonu ile kaldırılabilir.

### 5️⃣ Haftalık Program

Dersler haftalık tablo görünümünde gösterilir.

### 6️⃣ Çakışma Kontrolü

Aynı gün ve saat aralığında iki ders eklenmesi engellenir.

------------------------------------------------------------------------

## 💾 Veri Saklama

Uygulama verileri **LocalStorage** üzerinde saklanır.

Bu sayede:

-   Sayfa yenilense bile dersler kaybolmaz
-   Kullanıcı kendi programını kalıcı olarak saklayabilir

------------------------------------------------------------------------

## 📚 Varsayılan Dersler

Uygulama ilk açıldığında şu örnek dersler bulunmaktadır:

-   Veri Tabanı
-   Web Geliştirme
-   Yapay Zeka

------------------------------------------------------------------------

## 🎯 Proje Amacı

Bu proje aşağıdaki konuları öğrenmek amacıyla geliştirilmiştir:

-   React Component yapısı
-   State yönetimi
-   CRUD işlemleri
-   LocalStorage kullanımı
-   Modern frontend tasarımı

------------------------------------------------------------------------

## 👨‍💻 Geliştirici

Bu proje **Web Geliştirme / JavaScript Eğitimi** kapsamında
hazırlanmıştır.
