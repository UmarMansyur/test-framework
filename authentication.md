# Authentication

## Membuat Koneksi ke Database
Untuk membuat autentikasi, kita perlu membuat sebuah class di dalam direktori `Controllers`. Namun sebelum itu, pastikan folder `Config` sudah memiliki class `Connection.cs`. Jika belum buatlah class tersebut dengan kode berikut:

```csharp
using System.Collections.Generic;
using System.Data;
using System.Linq;
using MySql.Data.MySqlClient; // [!code ++]
using System.Windows.Forms; // [!code ++]

namespace project_akhir.Config
{
    public class Connection
    {
        private static Connection instance; // [!code ++]
        private static MySqlConnection connection; // [!code ++]
        private readonly string url = "datasource=localhost;username=root;password=;database=app_konter;Convert Zero Datetime=True"; // [!code ++]

        private Connection() // [!code ++]
        { // [!code ++]
            try // [!code ++]
            { // [!code ++]
                connection = new MySqlConnection(this.url); // [!code ++]
            } // [!code ++]
            catch (Exception err) // [!code ++]
            { // [!code ++]
                Utils.Notify.notifyError(err); // [!code ++]
            } // [!code ++]
        } // [!code ++]

        public MySqlConnection getConnection() // [!code ++]
        { // [!code ++]
            return connection; // [!code ++]
        } // [!code ++]

        public MySqlDataReader Query(string sql) // [!code ++]
        { // [!code ++]
            try // [!code ++]
            { // [!code ++]
                MySqlDataReader response; // [!code ++]
                connection.Close(); // [!code ++]
                connection.Open(); // [!code ++]
                MySqlCommand query = new MySqlCommand(sql, getConnection()); // [!code ++]
                query.ExecuteNonQuery(); // [!code ++]
                response = query.ExecuteReader(); // [!code ++]
                return response; // [!code ++]
            } // [!code ++]
            catch (Exception error) // [!code ++]
            { // [!code ++]
                Utils.Notify.notifyError(error); // [!code ++]
            } // [!code ++]
            return null; // [!code ++]
        } // [!code ++]

        public static Connection getInstance() // [!code ++]
        { // [!code ++]
            if (instance == null) // [!code ++]
            { // [!code ++]
                instance = new Connection(); // [!code ++]
            } // [!code ++]
            return instance; // [!code ++]
        } // [!code ++]
    }
}
```
::: warning
Kode di atas menerapkan konsep singleton pada class Connection. Singleton adalah sebuah konsep yang memungkinkan sebuah class hanya memiliki satu instance. Dengan kata lain, kita tidak dapat membuat instance baru dari class tersebut. Hal ini berguna untuk menghindari terjadinya duplikasi koneksi ke database. Karena jika terjadi duplikasi koneksi, maka memori yang digunakan akan menjadi **boros**.
:::

<br/>
<br/>
Kode berikut ini harus disesuaikan dengan namespace dari project yang sedang dibuat. Cara untuk mengetahui namespace yang sedang digunakan adalah dengan mengunjungi direktori Views. Kemudian klik dua kali pada design form.
<br/>
<br/>
<div style="text-align: center">
  <img src="/assets/namepsace.png" alt="add class" style="zoom:100%;" />
</div>
<br/>

Config merupakan nama dari direktori untuk membuat class Connection. Jika nama direktori berbeda, maka nama namespace juga harus disesuaikan.
<br/>

```csharp
namespace project_akhir.Config
```

<br/>

Selanjutnya, import __*MySql.Data.MySqlClient*__. Library ini digunakan untuk menghubungkan aplikasi dengan database MySQL. Jika belum menginstallnya, ikuti langkah-langkah berikut:
1. Silahkan klik kanan pada References
2. Pilih Add Reference. Setelah itu, pilih tab Browse, lalu cari MySql.Data.dll. Jika sudah ditemukan, klik OK.
<br/>
<br/>
Anda dapat mendownloadnya di [sini](https://dev.mysql.com/downloads/connector/net/).

<br/>

## Membuat Class Notify di dalam direktori Utils

```csharp
private Connection()
{
    try
    {
        connection = new MySqlConnection(this.url);
    }
    catch (Exception err)
    {
        Utils.Notify.notifyError(err); // [!code focus]
    }
}
```

Kode tersebut pasti akan menimbulkan error. Karena kita belum membuat class Notify. Jika belum, silahkan buat class Utils.cs di dalam direktori Utils. Kemudian tambahkan kode berikut:

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Windows.Forms;

namespace project_akhir.Utils // [!code warning]
{
    static class Notify
    {
        public static void notifyError(Exception Error, string message = null)
        {
            if (Error != null && message == null)
            {
                MessageBox.Show(Error.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
            else
            {
                MessageBox.Show(message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }

        }
        public static bool notifyDelete()
        {
            if (MessageBox.Show("Apakah anda ingin menghapus data ini ?", "Konfirmasi", MessageBoxButtons.YesNo, MessageBoxIcon.Question) == DialogResult.Yes)
            {
                return true;
            }
            return false;
        }
    }
}
```

Kode di atas merupakan class Utils yang berisi method untuk menampilkan pesan error dan konfirmasi. Jika ingin menampilkan pesan error, cukup panggil method notifyError. Jika ingin menampilkan konfirmasi, panggil method notifyDelete. Jika ingin menampilkan pesan error dan konfirmasi, panggil method notifyError lalu panggil method notifyDelete.

<br/>

## Mengubah kode Connection.cs

Setelah membuat class Utils, kembali ke class Connection. Rubah kode berikut:

```csharp
private static Connection instance;
private static MySqlConnection connection;
private readonly string url = "datasource=localhost;username=root;password=;database=app_konter;Convert Zero Datetime=True"; // [!code focus]


private Connection()
{
    try
    {
        connection = new MySqlConnection(this.url);
    }
    catch (Exception err)
    {
        Utils.Notify.notifyError(err);
    }
}       
```
Keterangan:
1. **datasource** adalah nama server yang digunakan.
2. **username** adalah nama pengguna yang digunakan untuk mengakses database.
3. **password** adalah password yang digunakan untuk mengakses database.
4. **database** adalah nama database yang digunakan.
5. **Convert Zero Datetime** adalah sebuah konfigurasi yang digunakan untuk mengubah nilai datetime yang bernilai 0000-00-00 00:00:00 menjadi null. Hal ini berguna untuk menghindari terjadinya error saat mengubah nilai datetime menjadi string.

<br/>

## Membuat Model User

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace project_akhir.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string gender { get; set; }
        public string email { get; set; }
        public string phone { get; set; }
        public string address { get; set; }
    }
}

```

Model User digunakan untuk menyimpan data username dan password yang diinputkan oleh user. **Properti** yang ada pada model User harus disesuaikan dengan nama kolom yang ada pada tabel users.

*__{ get; set; }__* adalah sebuah konsep yang digunakan untuk mengakses properti dari luar class. Jika tidak menggunakan konsep ini, maka properti tersebut tidak dapat diakses dari luar class.

## Membuat Class Authentication di dalam direktori Controllers

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using MySql.Data.MySqlClient;

namespace project_akhir.Controllers
{
    class Authentication
    {
        private Config.Connection __connection = Config.Connection.getInstance();
        public void IsLogin(Models.User _user)
        {
            MySqlDataReader exist = __connection.Query("SELECT * FROM users WHERE username = '" + _user.Username + "' AND password = '" + _user.Password + "'");
            if (exist.Read())
            {
                MessageBox.Show("Login Berhasil", "Informasi", MessageBoxButtons.OK, MessageBoxIcon.Information);
                Session.Session.Username = exist["username"].ToString();
            }
            else
            {
                Session.Session.Username = "";
                MessageBox.Show("Login Gagal", "Informasi", MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
        }
    }
}
```

Keterangan:
1. **Models.User** adalah sebuah class yang berisi properti username dan password. Class ini digunakan untuk menyimpan data username dan password yang diinputkan oleh user.
2. **Config.Connection** adalah sebuah class yang berisi method untuk membuat koneksi ke database. Class ini digunakan untuk membuat koneksi ke database.
3. **Session.Session** adalah sebuah class yang berisi properti username. Class ini digunakan untuk menyimpan data username yang sedang login.



## Membuat Class Session di dalam direktori Session

```csharp
 Session.Session.Username = exist["username"].ToString();
```

Kode tersebut pasti akan menimbulkan error. Karena kita belum membuat class Session. Jika belum, silahkan buat class **Session.cs** di dalam direktori **Session**. Kemudian tambahkan kode berikut:

```csharp

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace project_akhir.Session
{
    static class Session
    {
        public static string Username { get; set; }
        public static string Password { get; set; }
    }
}
```

::: warning
Properti yang ada pada class Session harus disesuaikan dengan properti yang dibutuhkan. Jika ingin menyimpan data username dan password, maka buatlah properti username dan password. Jika ingin menyimpan data username saja, maka buatlah properti username saja. Begitu juga dengan password. Alangkah lebih baiknya menambahkan properti id. Mengingat id menjadi identitas dari sebuah data.
:::

## Membuat Form Login
Kita akan membuat form login dengan nama **Masuk.cs**. Silahkan buat form tersebut di dalam direktori `Views`. Kemudian buatlah tampilan seperti berikut:
<img src="/assets/form_login.png" alt="add class" style="zoom:100%;" />

Agar kode kita menjadi lebih mudah untuk dipahami dan terstruktur. Maka, rubah nama dari setiap komponen yang ada pada form tersebut. Berikut adalah nama komponen yang harus diubah:
1. TextBox pada kolom username menjadi **username**.
2. TextBox pada kolom password menjadi **password**.
3. Tombol pada button masuk menjadi **Login**.

Selanjutnya, klik dua kali pada button **Masuk**. Kemudian tambahkan kode berikut:

```csharp
 private void button1_Click(object sender, EventArgs e)
{
    Models.User _user = new Models.User();
    _user.Username = username.Text;
    _user.Password = password.Text;
    Controllers.Authentication _auth = new Controllers.Authentication();
    _auth.IsLogin(_user);
    if (Session.Session.Username != "") 
    {
        this.Close();
    }
}
```

Hal pertama yang dilakukan adalah membuat instance dari class User. Kemudian mengisi properti username dan password dengan nilai yang diinputkan oleh user. Selanjutnya, membuat instance dari class Authentication. Kemudian memanggil method IsLogin dengan mengirimkan instance dari class User sebagai parameter. Setelah itu, mengecek apakah properti username pada class Session kosong atau tidak. Jika tidak kosong, maka form login akan ditutup.

<br/>

## Question and Answer

### Question 1
<blockquote>
Kenapa kita harus membuat instance dari class User dan mengisi properti username dan password dengan nilai yang diinputkan oleh user. Kenapa tidak langsung mengirimkan nilai yang diinputkan oleh user saja?
</blockquote>

### Answer 1
1. Karena kita menggunakan konsep MVC. Dimana, class User berfungsi sebagai model. Sedangkan class Authentication berfungsi sebagai controller. Jadi, class Authentication tidak boleh mengakses komponen yang ada pada form. Karena hal tersebut akan melanggar konsep MVC.
2. Jika nilai yang diinputkan oleh user langsung dikirimkan ke class Authentication, maka class Authentication tidak dapat mengakses nilai yang diinputkan oleh user. Karena nilai tersebut hanya dapat diakses oleh form login.
3. Class Authentication hanya dapat mengakses nilai yang diinputkan oleh user melalui class User pada Models. Karena class User berfungsi sebagai model. Sehingga, class Authentication dapat mengakses nilai yang diinputkan oleh user melalui class User. 

Perhatikan kode berikut:

```csharp
Models.User _user = new Models.User();
_user.Username = username.Text;
_user.Password = password.Text;

Controllers.Authentication _auth = new Controllers.Authentication();
_auth.IsLogin(_user);
```

Kode di atas merupakan cara untuk mengakses nilai yang diinputkan oleh user melalui class User. Karena class User berfungsi sebagai model. Sehingga, class Authentication dapat mengakses nilai yang diinputkan oleh user melalui class User. Pada class Authentication, kita dapat mengakses nilai yang diinputkan oleh user melalui properti username dan password yang ada pada class User.

<br/>

```csharp
    class Authentication
    {
        private Config.Connection __connection = Config.Connection.getInstance();
        public void IsLogin(Models.User _user) // [!code focus]
        {
            MySqlDataReader exist = __connection.Query("SELECT * FROM users WHERE username = '" + _user.Username + "' AND password = '" + _user.Password + "'");
            if (exist.Read())
            {
                MessageBox.Show("Login Berhasil", "Informasi", MessageBoxButtons.OK, MessageBoxIcon.Information);
                Session.Session.Username = exist["username"].ToString();
            }
            else
            {
                Session.Session.Username = "";
                MessageBox.Show("Login Gagal", "Informasi", MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
        }
    }
```

### Toogle Lihat Password

Pada desain sebelumnya, terdapat sebuah checkbox yang berfungsi untuk menampilkan password. Namun, checkbox tersebut tidak berfungsi. Karena kita belum menambahkan kode untuk menampilkan password. Klik dua kali pada checkbox tersebut. Kemudian tambahkan kode berikut:

```csharp
if (checkBox1.Checked == true)
{
    password.PasswordChar = '\0';
}
else
{
    password.PasswordChar = '*';
}
```

Di fungsi form_load, tambahkan kode berikut:

```csharp
private void Form1_Load(object sender, EventArgs e)
{
    password.PasswordChar = '*'; // [!code ++]
}
```


