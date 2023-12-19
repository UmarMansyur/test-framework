# Data Master
Data master merupakan induk data atau tabel pada database yang berdiri sendiri. Contoh dari data master adalah `User`. Data master memiliki beberapa atribut yang dapat diatur sesuai kebutuhan.



## Create Data Master
Konsep MVC menekankan pada pemisahan antara Model, View, dan Controller. Model berisi data yang akan ditampilkan pada View. View berisi tampilan yang akan dilihat oleh pengguna. Controller berisi logika yang mengatur Model dan View.

<img src="/assets/mvc.jpg" alt="MVC"/>

Ketika pengguna ingin menambahkan data baru. Maka data yang diinputkan akan ditampung pada Model. Kemudian, Model akan dikirim ke Controller. Controller akan mengatur Model dan View. Dari model tersebut controller dapat mengetahui atribut apa saja yang akan diisi. Kemudian, controller akan mengirimkan data ke database. Setelah data berhasil disimpan, maka controller akan mengatur View untuk menampilkan data yang telah disimpan.

### Membuat Model
Kita akan mempraktekkan konsep MVC dengan membuat data master `User`. Untuk membuat model, klik kanan pada direktori Models -> Add -> Class -> UserModel.cs. Tambahkan kode berikut pada file `UserModel.cs`:

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace project_akhir.Models
{
    public class UserModel
    {
        public int id { get; set; } // [!code ++]
        public string Username { get; set; } // [!code ++]
        public string Password { get; set; } // [!code ++]
        public string gender { get; set; } // [!code ++]
        public string email { get; set; } // [!code ++]
        public string phone { get; set; } // [!code ++]
        public string address { get; set; } // [!code ++]
    }
}

```
Jika anda merasa kebingungan terkait atribut apa yang terdapat pada class Model, maka anda dapat melihatnya pada database. Pada contoh ini, kita akan membuat data master `User`. Maka kita perlu melihat atribut apa saja yang terdapat pada tabel `users`.

<img src="/assets/database.png" alt="Database"/>

Kolom createdAt dan updatedAt merupakan kolom yang dibuat secara otomatis oleh database. Jadi, kita tidak perlu membuatnya pada class Model. Kemudian, kita perlu membuat class `User` pada file `User.cs` yang berisi atribut yang terdapat pada tabel `users`.

### Membuat Form User View
Untuk membuat form User View, klik kanan pada direktori Views -> Add -> Windows Form -> UserView.cs. Kita akan menggunakan desain pada gambar berikut ini:
<img src="/assets/userform.png" alt="User View"/>

Rubah name pada form menjadi `Input`. Setelah itu, rubah juga setiap komponen yang digunakan menyesuaikan dengan gambar diatas. Pada contoh ini, kita menggunakan `TextBox` untuk `username`, `password`, `address`, `email`, dan `phone`. Kemudian, kita menggunakan `RadioButton` untuk `male` dan `female`. Terakhir, kita menggunakan `Button` untuk `tambah`, `edit`, dan `hapus`.

### Membuat Controller
Jika menggunakan BaseController maka kita hanya perlu membuat controller baru dan meng-extend BaseController. Jika tidak menggunakan BaseController maka kita perlu membuat controller baru. Berikut contoh membuat controller baru dengan nama `UserController` yang meng-extend BaseController. Letakkan file `UserController.cs` pada direktori Controllers. Tambahkan kode berikut pada file `UserController.cs`:

```csharp
using System.Collections.Generic;
using System.Data;
using System.Windows.Forms;
using MySql.Data.MySqlClient;

namespace project_akhir.Controllers
{
    public class UserController // [!code --]
    public class UserController: BaseController// [!code ++]
    {

        public UserController()// [!code ++]
        {// [!code ++]
            this.table = "users";// [!code ++]
        }// [!code ++]

        private void ValidationForm(Models.UserModel User) {
            if(User.Username == "" || User.Password == "" || User.address == "" || User.email == "" || User.phone == "" ) {// [!code ++]
                MessageBox.Show("Data tidak boleh kosong");// [!code ++]
                return;// [!code ++]
            }// [!code ++]
        }

        public void Create(Models.UserModel User)// [!code ++]
        { // [!code ++]
            this.ValidationForm(User);// [!code ++]
            IDictionary<string, object> request = new Dictionary<string, object>();// [!code ++]
            request.Add("username", User.Username);// [!code ++]
            request.Add("password", User.Password);// [!code ++]
            request.Add("address", User.address);// [!code ++]
            request.Add("email", User.email);// [!code ++]
            request.Add("phone", User.phone);// [!code ++]
            request.Add("gender", User.gender);// [!code ++]
            this.Create(request);// [!code ++]
        }// [!code ++]

        public void Update(int id, Models.User User) // [!code ++]
        { // [!code ++]
            this.ValidationForm(User); // [!code ++]
            IDictionary<string, object> request = new Dictionary<string, object>(); // [!code ++]
            request.Add("username", User.Username); // [!code ++]
            request.Add("password", User.Password); // [!code ++]
            request.Add("address", User.address); // [!code ++]
            request.Add("email", User.email); // [!code ++]
            request.Add("phone", User.phone); // [!code ++]
            request.Add("gender", User.gender); // [!code ++]
            this.Update(id, request); // [!code ++]
        } // [!code ++]
        
        public void Destroy(int id) // [!code ++]
        { // [!code ++]
            if(id == 0) // [!code ++]
            { // [!code ++]
                MessageBox.Show("Pilih data yang akan dihapus"); // [!code ++]
                return; // [!code ++]
            } // [!code ++]
            if(Utils.Notify.notifyDelete()) {  // [!code ++]
                this.Delete(id); // [!code ++]
            } // [!code ++]
        } // [!code ++]

    }
}
```
Perhatikan baris berwarna merah pada penamaan class. Saat pertama kali dibuat, class Controller belum meng-extend BaseController. Kemudian, kita perlu meng-extend BaseController dengan cara menambahkan `: BaseController`. Kode tersebut akan error apabila kita belum membuat BaseController. Anda dapat membuat BaseController terlebih dahulu untuk mengikuti step-step berikutnya. Kunjungi <a href="./base-controller.md">Base Controller</a> untuk membuat BaseController.

Pada Constructor Class `UserController` kita mengatur `this.table = "users";` yang berarti kita akan menginsertkan data pada tabel `users`. Atribut yang terdapat pada tabel `users` adalah `username`, `password`, `address`, `email`, `phone`, dan `gender`. Atribut tersebut akan diisi dengan data yang diinputkan pada form `Input`. Kita sebenarnya bisa menerima langsung datanya dari user. Namun, parameternya akan sangat panjang. Coba perhatikan kode berikut:

```csharp
public void Create(string Username, string Password, string address, string email, string phone, string gender)
{ 
    if(Username == "" || Password == "" || address == "" || email == "" || phone == "" ) {
        MessageBox.Show("Data tidak boleh kosong");
        return;
    }
    IDictionary<string, object> request = new Dictionary<string, object>();
    request.Add("username", Username);
    request.Add("password", Password);
    request.Add("address", address);
    request.Add("email", email);
    request.Add("phone", phone);
    request.Add("gender", gender);
    this.Create(request);
}
```

Kode tersebut sangat panjang dan tidak efisien. Mungkin jika atribut pada tabel `users` hanya sedikit, maka kode tersebut masih dapat diterima. Namun, jika atribut pada tabel `users` banyak maka kode tersebut akan sangat panjang. Oleh karena itu, kita akan membuat class `UserModel` yang berisi atribut yang terdapat pada tabel `users`. Kemudian, kita akan mengirimkan data yang diinputkan pada form `Input` ke class `UserModel`. UserModel sudah berisi atribut yang terdapat pada tabel `users`.

```csharp
this.Create(request);
```

Mungkin kode di atas menjadi pertanyaan, mengingat kita belum pernah membuat method `Create` pada class `UserController`. Lantas, **apa maksud dari kode tersebut dan dari manakah method `Create` tersebut berasal?**

Kode tersebut merupakan contoh dari **Inheritance**. Inheritance merupakan konsep pemrograman berorientasi objek yang memungkinkan sebuah class untuk mengambil semua properti dan method dari class lain yang di-extend. Class yang mewariskan properti dan methodnya disebut **Parent Class** atau **Super Class**. Class yang menerima properti dan method dari class lain disebut **Child Class** atau **Sub Class**. Pada contoh di atas, class `UserController` merupakan **Child Class** dari class `BaseController`. Class `UserController` mewarisi semua properti dan method dari class `BaseController`. Oleh karena itu, class `UserController` dapat menggunakan method `Create` yang terdapat pada class `BaseController`.

### Membuat Views
Kita akan membuat form `Input` yang telah dibuat sebelumnya dapat berfungsi. Jika belum membuat form `Input` maka buatlah terlebih dahulu. Cara membuat form `Input` dapat dilihat pada bagian <a href="./view.md">Membuat Form User View</a>. Klik dua kali pada button `tambah` kemudian tambahkan kode berikut:

```csharp
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;

namespace project_akhir
{
    public partial class Input : Form
    {
        Controllers.User userController = new Controllers.UserController(); // [!code ++]
        Models.UserModel User = new Models.UserModel(); // [!code ++]

        public Input()
        {
            InitializeComponent();
        }

        private void tambah_Click(object sender, EventArgs e) // [!code ++]
        { // [!code ++]
            User.Username = username.Text; // [!code ++]
            User.Password = password.Text; // [!code ++]
            User.address = address.Text; // [!code ++]
            User.email = email.Text; // [!code ++]
            User.phone = phone.Text; // [!code ++]
            if (male.Checked == true) // [!code ++]
            { // [!code ++]
                User.gender = "Pria"; // [!code ++]
            } // [!code ++]
            if (female.Checked == true) // [!code ++]
            { // [!code ++]
                User.gender = "Perempuan"; // [!code ++]
            } // [!code ++]
            userController.Create(User); // [!code ++]
            dataGridView1.DataSource = userController.ShowAll(); // [!code ++]
            clearForm(); // [!code ++]
            tambah.Enabled = true; // [!code ++]
            edit.Text = "Edit"; // [!code ++]
            hapus.Enabled = true; // [!code ++]
        } // [!code ++]

        private void clearForm() // [!code ++]
        { // [!code ++]
            username.Text = ""; // [!code ++]
            password.Text = ""; // [!code ++]
            address.Text = ""; // [!code ++]
            email.Text = ""; // [!code ++]
            phone.Text = ""; // [!code ++]
        } // [!code ++]
    }
}
```

Model dan Controller yang telah dibuat sebelumnya diinisialisasi menjadi variabel Global. Kemudian, Pada method `tambah_Click` attribut yang terdapat pada model `User` akan diisi dengan data yang diinputkan pada form `Input`. 

yang berarti kita akan membuat data master `users` dengan atribut yang telah diatur. Kemudian, terdapat `dataGridView1.DataSource = userController.ShowAll();` yang berarti kita akan menampilkan data master `users` pada `dataGridView1`. Terakhir, terdapat `clearForm();` yang berarti kita akan mengosongkan form setelah data master `users` berhasil dibuat.

```csharp
if (male.Checked == true)
{
    _user.gender = "Pria";
}
if (female.Checked == true)
{
    _user.gender = "Perempuan";
}
```

Kode di atas digunakan untuk menentukan jenis kelamin. Jika `male` tercentang maka jenis kelamin yang diinputkan adalah `Pria`. Jika `female` tercentang maka jenis kelamin yang diinputkan adalah `Perempuan`.

## Read Data Master
Untuk menampilkan data master kita perlu memanggil method `ShowAll` pada controller yang telah dibuat. Method tersebut akan mengembalikan data master dalam bentuk `DataTable`. Kemudian, kita perlu mengatur `DataSource` pada `dataGridView1` dengan data master yang telah diambil. Berikut contoh menampilkan data master `users` pada `dataGridView1`. Tambahkan kode berikut pada method form_load:

```csharp
private void Input_Load(object sender, EventArgs e)
{ 
    dataGridView1.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill; // [!code ++]
    dataGridView1.DataSource = userController.ShowAll(); // [!code ++]
    dataGridView1.Columns["id"].Visible = false; // [!code ++]
    dataGridView1.Columns["createdAt"].Visible = false; // [!code ++]
    dataGridView1.Columns["updatedAt"].Visible = false; // [!code ++]
    male.Checked = true; // [!code ++]
}
```
Kode di atas akan menampilkan data master `users` pada `dataGridView1`. Kemudian, terdapat `dataGridView1.Columns["id"].Visible = false;` hal tersebut berarti kita akan menyembunyikan kolom `id` pada `dataGridView1`. Terakhir, terdapat `male.Checked = true;` yang berarti kita akan mengatur jenis kelamin menjadi `Pria` secara default.

## Update Data Master
Method yang digunakan untuk mengubah data master adalah `Update`. Method tersebut menerima 2 parameter yaitu `id` dan `request`. `id` digunakan untuk menentukan data master mana yang akan diubah. `request` digunakan untuk menentukan atribut mana yang akan diubah. Sebelum itu, karena datanya ditampung dalam `DataTable` maka kita perlu memberikan event `CellClick` pada `dataGridView1`. Tambahkan kode berikut pada method *__DataGridView1_CellClick__*:

```csharp
    Controllers.User userController = new Controllers.User();
    Models.User _user = new Models.User();
    int id_user = 0; // [!code ++]
    ....
    private void dataGridView1_CellClick(object sender, DataGridViewCellEventArgs e)// [!code ++]
    {// [!code ++]
        if (e.RowIndex > -1)// [!code ++]
        {// [!code ++]
            id_user = Convert.ToInt32(dataGridView1.Rows[e.RowIndex].Cells["id"].Value.ToString());// [!code ++]
            username.Text = dataGridView1.Rows[e.RowIndex].Cells["username"].Value.ToString();// [!code ++]
            password.Text = dataGridView1.Rows[e.RowIndex].Cells["password"].Value.ToString();// [!code ++]
            address.Text = dataGridView1.Rows[e.RowIndex].Cells["address"].Value.ToString();// [!code ++]
            email.Text = dataGridView1.Rows[e.RowIndex].Cells["email"].Value.ToString();// [!code ++]
            phone.Text = dataGridView1.Rows[e.RowIndex].Cells["phone"].Value.ToString();// [!code ++]
            if (dataGridView1.Rows[e.RowIndex].Cells["gender"].Value.ToString() == "Pria")// [!code ++]
            {// [!code ++]
                male.Checked = true;// [!code ++]
            }// [!code ++]
            else// [!code ++]
            {// [!code ++]
                female.Checked = true;// [!code ++]
            }// [!code ++]
            tambah.Enabled = false;// [!code ++]
            edit.Text = "Edit";// [!code ++]
            hapus.Enabled = true;// [!code ++]
        }// [!code ++]
    }
```

Kemudian tambahkan kode berikut pada method tambah_Click:

```csharp
private void button1_Click(object sender, EventArgs e)
{
    if (tambah.Text == "Simpan")//[!code ++]
    {//[!code ++]
        User.Username = username.Text;//[!code ++]
        User.Password = password.Text;//[!code ++]
        User.address = address.Text;//[!code ++]
        User.email = email.Text;//[!code ++]
        User.phone = phone.Text;//[!code ++]
        if (male.Checked == true)//[!code ++]
        {//[!code ++]
            User.gender = "Pria";//[!code ++]
        }//[!code ++]
        if (female.Checked == true)//[!code ++]
        {//[!code ++]
            User.gender = "Perempuan";//[!code ++]
        }//[!code ++]
        userController.Update(id_user, User);//[!code ++]
        dataGridView1.DataSource = userController.ShowAll();//[!code ++]
        tambah.Text = "Tambah";//[!code ++]
        id_user = 0;//[!code ++]
    } //[!code ++]
    else //[!code ++]
    { // [!code ++]
        if(id_user > 0 ) // [!code ++]
        { // [!code ++]
            id_user = 0; // [!code ++]
            username.Text = ""; // [!code ++]
            password.Text = ""; // [!code ++]
            address.Text = ""; // [!code ++]
            email.Text = ""; // [!code ++]
            phone.Text = ""; // [!code ++]
            return; // [!code ++]
        } // [!code ++]
        User.Username = username.Text;
        User.Password = password.Text;
        User.address = address.Text;
        User.email = email.Text;
        User.phone = phone.Text;
        if (male.Checked == true)
        {
            User.gender = "Pria";
        }

        if (female.Checked == true)
        {
            User.gender = "Perempuan";
        }
        userController.Create(User);
        dataGridView1.DataSource = userController.ShowAll();
    } // [!code ++]
    clearForm();
    tambah.Enabled = true;
    edit.Text = "Edit";
    hapus.Enabled = true;
}
```

Pada button edit, klik dua kali kemudian tambahkan kode berikut ini:

```csharp
private void edit_Click(object sender, EventArgs e)
{
    tambah.Text = "Simpan"; // [!code ++]
    hapus.Enabled = false; // [!code ++]
    edit.Text = "Batal"; // [!code ++]
    tambah.Enabled = true; // [!code ++]
}
```

## Delete Data Master
Method yang digunakan untuk menghapus data master adalah `Delete`. Method tersebut menerima 1 parameter yaitu `id`. `id` digunakan untuk menentukan data master mana yang akan dihapus. Klik dua kali pada button hapus kemudian tambahkan kode berikut:

```csharp
private void hapus_Click(object sender, EventArgs e)
{
    userController.Destroy(id_user); //[!code ++]
    dataGridView1.DataSource = userController.ShowAll(); //[!code ++]
    clearForm(); //[!code ++]
    tambah.Enabled = true; //[!code ++]
}
```






