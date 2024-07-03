### Tugas UAS FRAMEWORK

#### **Deskripsi Tugas:**

Buatlah sebuah RESTful API untuk mengelola informasi tempat wisata di Madura. API ini akan digunakan oleh pengguna untuk melihat daftar tempat wisata, membeli tiket, dan melakukan pembayaran. Pengguna juga dapat melihat daftar kategori wisata, melihat daftar pembayaran, dan melakukan pemesanan tiket. Selain itu, pengguna dapat mendaftar, login, dan logout dari aplikasi.

API ini harus mendukung operasi CRUD (Create, Read, Update, Delete) serta otentikasi pengguna. Anda juga harus mengintegrasikan fitur untuk mengunggah gambar untuk entitas wisata dan pengguna.

Berikut adalah endpoint yang harus dibuat beserta deskripsi lengkapnya:

#### **Endpoint yang Harus Dibuat:**

1. **Wisata**

   - **GET /wisata**

     - Fungsi: Mengambil daftar tempat wisata.
     - Fitur: Mendukung pagination, searching (pencarian berdasarkan nama atau deskripsi), dan sorting (pengurutan berdasarkan nama atau rating).
     - Contoh Query:
       - Pagination: `GET /wisata?page=1&limit=10`
       - Searching: `GET /wisata?search=Taman`
       - Sorting: `GET /wisata?sort=rating&order=desc`

   - **GET /wisata/:id**

     - Fungsi: Mengambil detail dari tempat wisata berdasarkan ID.
     - Fitur: Mendukung pencarian spesifik berdasarkan ID.

   - **POST /wisata**

     - Fungsi: Menambahkan tempat wisata baru.
     - Fitur: Wajib menyertakan foto wisata.
     - Body:
       ```json
       {
         "nama": "Taman Siring",
         "alamat": "Jl. Raya Siring, Madura",
         "deskripsi": "Tempat rekreasi yang indah.",
         "foto": "<file>",
         "latitude": -7.614529,
         "longitude": 111.903542
       }
       ```

   - **PUT /wisata/:id**

     - Fungsi: Memperbarui informasi tempat wisata.
     - Body: Sama seperti POST.

   - **DELETE /wisata/:id**
     - Fungsi: Menghapus tempat wisata berdasarkan ID.

2. **Kategori Wisata**

   - **GET /kategori-wisata**
     - Fungsi: Mengambil daftar kategori wisata.
   - **GET /kategori-wisata/:id**
     - Fungsi: Mengambil detail kategori wisata berdasarkan ID.
   - **POST /kategori-wisata**

     - Fungsi: Menambahkan kategori wisata baru.
     - Body:
       ```json
       {
         "nama": "Alam"
       }
       ```

   - **PUT /kategori-wisata/:id**

     - Fungsi: Memperbarui informasi kategori wisata.
     - Body: Sama seperti POST.

   - **DELETE /kategori-wisata/:id**
     - Fungsi: Menghapus kategori wisata berdasarkan ID.

3. **Tiket**

   - **GET /tiket**
     - Fungsi: Mengambil daftar tiket.
   - **GET /tiket/:id**
     - Fungsi: Mengambil detail tiket berdasarkan ID.
   - **POST /tiket**

     - Fungsi: Menambahkan tiket baru.
     - Body:
       ```json
       {
         "wisataId": "64a9f9c2c5a4c68b28c5b90a",
         "harga": 50000,
         "deskripsi": "Tiket masuk ke Taman Siring",
         "tanggalMulai": "2024-07-01",
         "tanggalSelesai": "2024-07-10"
       }
       ```

  - **GET /tiket/qr-code/:id**
     - Fungsi: Mengambil detail tiket berdasarkan ID.
     - Response: QR Code bukan link melainkan gambar.

   - **PATCH /tiket/:id**

     - Fungsi: Memperbarui informasi tiket(Tiket masih berlaku atau sudah tidak berlaku).

   - **DELETE /tiket/:id**
     - Fungsi: Menghapus tiket berdasarkan ID.

4. **Pembayaran**

Anda boleh menggunakan TRIPAY untuk pembayaran tiket wisata. Jika Anda tidak ingin menggunakan TRIPAY, Anda dapat membuat fitur pembayaran sendiri.
   - **GET /pembayaran**
     - Fungsi: Mengambil daftar pembayaran.
   - **GET /pembayaran/:id**
     - Fungsi: Mengambil detail pembayaran berdasarkan ID.
   - **POST /pembayaran**

     - Fungsi: Menambahkan pembayaran baru.
     - Body:
       ```json
       {
         "userId": "64a9fa9fc5a4c68b28c5b90b",
         "tiketId": "64a9f9c2c5a4c68b28c5b90a",
         "totalBayar": 50000,
         "status": "LUNAS"
       }
       ```

   - **PUT /pembayaran/:id**

     - Fungsi: Memperbarui informasi pembayaran.
     - Body: Sama seperti POST.

   - **DELETE /pembayaran/:id**
     - Fungsi: Menghapus pembayaran berdasarkan ID.

5. **User**

   - **GET /user**
     - Fungsi: Mengambil daftar pengguna.
   - **GET /user/:id**
     - Fungsi: Mengambil detail pengguna berdasarkan ID.
   - **POST /user**

     - Fungsi: Menambahkan pengguna baru.
     - Fitur: Wajib menyertakan foto pengguna.
     - Body:
       ```json
       {
         "username": "johndoe",
         "email": "johndoe@example.com",
         "password": "password123",
         "foto": "<file>"
       }
       ```

   - **PUT /user/:id**

     - Fungsi: Memperbarui informasi pengguna.
     - Body: Sama seperti POST.

   - **DELETE /user/:id**
     - Fungsi: Menghapus pengguna berdasarkan ID.

6. **Pemesanan**

   - **GET /pemesanan**
     - Fungsi: Mengambil daftar pemesanan.
   - **GET /pemesanan/:id**
     - Fungsi: Mengambil detail pemesanan berdasarkan ID.
   - **POST /pemesanan**

     - Fungsi: Menambahkan pemesanan baru.
     - Body:
       ```json
       {
         "userId": "64a9fa9fc5a4c68b28c5b90b",
         "tiketId": "64a9f9c2c5a4c68b28c5b90a",
         "jumlahTiket": 2,
         "totalHarga": 100000
       }
       ```

   - **PUT /pemesanan/:id**

     - Fungsi: Memperbarui informasi pemesanan.
     - Body: Sama seperti POST.

   - **DELETE /pemesanan/:id**
     - Fungsi: Menghapus pemesanan berdasarkan ID.

7. **Otentikasi**

   - **POST /login**

     - Fungsi: Login pengguna.
     - Body:
       ```json
       {
         "email": "johndoe@example.com",
         "password": "password123"
       }
       ```

   - **POST /register**

     - Fungsi: Registrasi pengguna baru.
     - Body: Sama seperti POST /user.

   - **POST /logout**

     - Fungsi: Logout pengguna.

   - **POST /forgot-password**

     - Fungsi: Permintaan reset password.
     - Body:
       ```json
       {
         "email": "johndoe@example.com"
       }
       ```

   - **POST /reset-password**

     - Fungsi: Reset password.
     - Body:
       ```json
       {
         "token": "resetToken",
         "password": "newPassword123"
       }
       ```

   - **POST /change-password**
     - Fungsi: Mengganti password.
     - Body:
       ```json
       {
         "currentPassword": "password123",
         "newPassword": "newPassword123"
       }
       ```

#### **Detail Pengambilan Data dari Google:**

Untuk mengumpulkan data wisata Madura, Anda dapat mencari informasi di Google terkait:

- Nama Wisata
- Alamat Wisata
- Deskripsi Wisata
- Foto Wisata
- Latitude dan Longitude

Anda bisa menggunakan teknik scraping atau manual collection sesuai kebijakan Anda. Pastikan Anda mengikuti aturan hukum dan etika terkait pengumpulan data.

#### **Kriteria Penilaian:**

- Kebenaran implementasi CRUD untuk setiap endpoint.
- Keberhasilan implementasi otentikasi pengguna.
- Penggunaan middleware untuk upload gambar.
- Penggunaan metode pagination, searching, dan sorting.
- Struktur kode yang rapi dan terdokumentasi dengan baik.
- Kode harus bebas dari kesalahan dan memiliki validasi data yang memadai.
- Dokumentasi API menggunakan POSTMAN atau Insomnia.
- Anda dapat menghosting API ini di Heroku atau platform lainnya.

#### **Waktu Pengerjaan:**

Deadline pengumpulan tugas adalah **20 Juli 2024** pukul 23.59 WIB.
Presentasi Tugas Tanggal 1 Agustus 2024(Online/Offline) tergantung situasi dan kondisi!.

#### **Catatan:**
Berkelompok 2-3 Orang. Untuk kaum hawa, digabung menjadi 1 kelompok.

Selamat mengerjakan!

Silahkan tentukan kelompok anda!

### Contoh:
Kelompok Wisata Indah:
1. Umar Mansyur
2. Umar Bakrie
3. Jalaludin Akbar