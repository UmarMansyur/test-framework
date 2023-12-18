# MDI Parent

MDI Parent merupakan form utama yang berfungsi untuk menampilkan form-form lainnya. Form MDI Parent ini memiliki properti `IsMdiContainer` yang harus di set menjadi `True` agar form-form lainnya dapat ditampilkan di dalamnya.
<img src="/assets/ismdi.png" alt="IsMdiContainer" width="500"/>

Setelah properti `IsMdiContainer` di set menjadi `True`, maka form-form lainnya dapat ditampilkan di dalam form MDI Parent. Pada file `Program.cs` terdapat kode sebagai berikut:
```csharp
Application.Run(new Form1());
```

Kode di atas akan menjalankan form `Form1.cs` sebagai form utama. Untuk menjalankan form MDI Parent, maka kode di atas dapat diubah menjadi sebagai berikut:
```csharp
Application.Run(new MDIParent1());
```

Class `MDIParent1` merupakan class yang dibuat secara otomatis ketika form MDI Parent dibuat.

::: tip
Disarankan penamaan form MDI Parent dirubah sesuai dengan kebutuhan. Cara merubah nama form adalah dengan cara mengubah name yang terdapat pada properties.
:::

## Membuat Menu Strip

Menu strip merupakan menu yang terdapat di atas form. Menu strip ini dapat dibuat dengan cara sebagai berikut:
1. Pilih __MenuStrip__ pada toolbox.
2. Drag __MenuStrip__ ke form.

<img src="/assets/menustrip.png" alt="MenuStrip" width="500"/>

Setelah __MenuStrip__ ditambahkan ke form. Kita coba hubungkan form login yang telah dibuat sebelumnya ke menu strip. Jika belum membuat form login, silahkan buat terlebih dahulu. Kunjungi menu [Authentication](/Authentication) untuk membuat form login.

## Routing
Pada menu strip terdapat menu `Masuk`. Untuk menghubungkan menu `Masuk` ke form login, maka dapat dilakukan dengan cara sebagai berikut:
1. Klik 2 kali pada menu `Masuk`.
2. Tambahkan kode berikut pada event `Click`:
```csharp
Masuk _masuk;
private void loginToolStripMenuItem_Click(object sender, EventArgs e)
{
    if (_masuk == null)
    {
        _masuk = new Masuk();
        _masuk.MdiParent = this;
        _masuk.FormClosed += new FormClosedEventHandler(_masuk_FormClosed);
        _masuk.Show();
    }
    else
    {
        _masuk.Activate();
        loginToolStripMenuItem.Enabled = false;
    } 
}

void _masuk_FormClosed(object sender, FormClosedEventArgs e)
{
    _masuk = null;
    loginToolStripMenuItem.Enabled = true;
}
```

Keterangan kode di atas:
- `Masuk _masuk;` digunakan untuk membuat objek dari form `Masuk`.
- `private void loginToolStripMenuItem_Click(object sender, EventArgs e)` digunakan untuk menangani event `Click` pada menu `Masuk`.
- `if (_masuk == null)` digunakan untuk mengecek apakah objek `_masuk` bernilai `null` atau tidak. Jika bernilai `null`, maka objek `_masuk` akan dibuat dan ditampilkan. Jika tidak bernilai `null`, maka objek `_masuk` akan diaktifkan.
- `loginToolStripMenuItem.Enabled = false;` digunakan untuk menonaktifkan menu `Masuk` ketika form `Masuk` ditutup.
- `void _masuk_FormClosed(object sender, FormClosedEventArgs e)` digunakan untuk menangani event `FormClosed` pada form `Masuk`. Kode di atas akan mengubah nilai objek `_masuk` menjadi `null` dan mengaktifkan kembali menu `Masuk`.


Supaya form `Masuk` dapat ditampilkan di dalam form MDI Parent, saat pertama kali form `MDIParent1` dibuka, maka pada fungsi form `MDIParent1_Load` tambahkan kode berikut:
```csharp
void MDIParent1_Load(object sender, EventArgs e)
{

    if (_masuk == null)
    {
        _masuk = new Masuk();
        _masuk.MdiParent = this;
        _masuk.FormClosed += new FormClosedEventHandler(_masuk_FormClosed);
        _masuk.Show();
    }
    _masuk.Activate();
    loginToolStripMenuItem.Enabled = false;
    menu = this;
}
```

Kode tersebut tentu akan menghasilkan error karena variabel `menu` belum dideklarasikan. Untuk mendeklarasikan variabel `menu`, tambahkan kode berikut pada class `MDIParent1`:

```csharp
public static MDIParent1 menu;
```

Selanjutnya, di dalam form `Masuk` tambahkan kode berikut ketika button `Masuk` diklik:
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
        project_akhir.Menustrip.menu.HandleMenu(true); // [!code ++]
    }
    else // [!code ++]
    { // [!code ++]
        project_akhir.Menustrip.menu.HandleMenu(false); // [!code ++]
    } // [!code ++]
}
```

Kembali ke form `MDIParent1`, tambahkan kode berikut:
```csharp
public void HandleMenu(bool status)
{
    loginToolStripMenuItem.Enabled = !status;
    logoutToolStripMenuItem.Enabled = status;
}
```

Jika loginToolStripMenuItem tidak aktif, maka klik menu `Masuk` pada menustrip. Untuk mengaktifkan semua menu maka klik semua menu pada menustrip. Dan rubah **modifier** pada semua menu menjadi `public`.

<img src="/assets/modifier.png" alt="Modifier" width="500"/>