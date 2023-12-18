# Data Master
Data master merupakan induk data atau tabel pada database yang berdiri sendiri. Contoh dari data master adalah `User`. Data master memiliki beberapa atribut yang dapat diatur sesuai kebutuhan.

## Membuat Form User View
Untuk membuat form User View, klik kanan pada direktori Views -> Add -> Windows Form -> UserView.cs. Kita akan menggunakan desain pada gambar berikut ini:
<img src="/assets/userform.png" alt="User View"/>

Rubah name pada form menjadi `Input`. Setelah itu, rubah juga setiap komponen yang digunakan menyesuaikan dengan gambar diatas. Pada contoh ini, kita menggunakan `TextBox` untuk `username`, `password`, `address`, `email`, dan `phone`. Kemudian, kita menggunakan `RadioButton` untuk `male` dan `female`. Terakhir, kita menggunakan `Button` untuk `tambah`, `edit`, `hapus`, dan `batal`.

## Create Data Master
Jika menggunakan BaseController maka kita hanya perlu membuat controller baru dan meng-extend BaseController. Jika tidak menggunakan BaseController maka kita perlu membuat controller baru. Berikut contoh membuat controller baru dengan nama `UserController` yang meng-extend BaseController.

Direktori Controllers -> Klik kanan -> Add -> Class -> UserController.cs

```csharp
using System.Collections.Generic;
using System.Data;
using System.Windows.Forms;
using MySql.Data.MySqlClient;

namespace project_akhir.Controllers
{
    public class UserController: // [!code --]
    public class UserController: BaseController// [!code ++]
    {
        public UserController()// [!code ++]
        {// [!code ++]
            this.table = "users";// [!code ++]
        }// [!code ++]
        public void Create(Models.User user)// [!code ++]
        { // [!code ++]
            if(user.Username == "" || user.Password == "" || user.address == "" || user.email == "" || user.phone == "" ) {// [!code ++]
                MessageBox.Show("Data tidak boleh kosong");// [!code ++]
                return;// [!code ++]
            }// [!code ++]
            IDictionary<string, object> request = new Dictionary<string, object>();// [!code ++]
            request.Add("username", user.Username);// [!code ++]
            request.Add("password", user.Password);// [!code ++]
            request.Add("address", user.address);// [!code ++]
            request.Add("email", user.email);// [!code ++]
            request.Add("phone", user.phone);// [!code ++]
            request.Add("gender", user.gender);// [!code ++]
            this.Create(request);// [!code ++]
        }// [!code ++]
    }
}
```

Pada Constructor Class UserController kita mengatur `this.table = "users";` yang berarti kita akan membuat data master `users`. Pada method `Create` kita mengatur atribut yang akan diisi pada data master `users`. Jika ingin membuat data master lain maka kita perlu mengubah `this.table` dan atribut yang akan diisi. Kemudian, terdapat fungsi `this.Create(request);` yang berarti kita akan membuat data master `users` dengan atribut yang telah diatur.

Direktori Views -> Klik kanan -> Add -> Windows Form -> UserView.cs

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
        Controllers.User userController = new Controllers.User(); // [!code ++]
        Models.User _user = new Models.User(); // [!code ++]
        public Input() // [!code ++]
        { // [!code ++]
            InitializeComponent(); // [!code ++]
        } // [!code ++]
        private void tambah_Click(object sender, EventArgs e) // [!code ++]
        { // [!code ++]
            _user.Username = username.Text; // [!code ++]
            _user.Password = password.Text; // [!code ++]
            _user.address = address.Text; // [!code ++]
            _user.email = email.Text; // [!code ++]
            _user.phone = phone.Text; // [!code ++]
            if (male.Checked == true) // [!code ++]
            { // [!code ++]
                _user.gender = "Pria"; // [!code ++]
            } // [!code ++]
            if (female.Checked == true) // [!code ++]
            { // [!code ++]
                _user.gender = "Perempuan"; // [!code ++]
            } // [!code ++]
            userController.Create(_user); // [!code ++]
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

Pada method `button1_Click` terdapat `userController.Create(_user);` yang berarti kita akan membuat data master `users` dengan atribut yang telah diatur. Kemudian, terdapat `dataGridView1.DataSource = userController.ShowAll();` yang berarti kita akan menampilkan data master `users` pada `dataGridView1`. Terakhir, terdapat `clearForm();` yang berarti kita akan mengosongkan form setelah data master `users` berhasil dibuat.

## Read Data Master
Untuk menampilkan data master kita perlu memanggil method `ShowAll` pada controller yang telah dibuat. Method tersebut akan mengembalikan data master dalam bentuk `DataTable`. Kemudian, kita perlu mengatur `DataSource` pada `dataGridView1` dengan data master yang telah diambil. Berikut contoh menampilkan data master `users` pada `dataGridView1`. Tambahkan kode berikut pada method form_load:

```csharp
private void Input_Load(object sender, EventArgs e)
{ 
    dataGridView1.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill;
    dataGridView1.DataSource = userController.ShowAll();
    dataGridView1.Columns["id"].Visible = false;
    dataGridView1.Columns["createdAt"].Visible = false;
    dataGridView1.Columns["updatedAt"].Visible = false;
    male.Checked = true;
}
```

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
        _user.Username = username.Text;//[!code ++]
        _user.Password = password.Text;//[!code ++]
        _user.address = address.Text;//[!code ++]
        _user.email = email.Text;//[!code ++]
        _user.phone = phone.Text;//[!code ++]
        if (male.Checked == true)//[!code ++]
        {//[!code ++]
            _user.gender = "Pria";//[!code ++]
        }//[!code ++]
        if (female.Checked == true)//[!code ++]
        {//[!code ++]
            _user.gender = "Perempuan";//[!code ++]
        }//[!code ++]
        userController.Update(id_user, _user);//[!code ++]
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
        _user.Username = username.Text;
        _user.Password = password.Text;
        _user.address = address.Text;
        _user.email = email.Text;
        _user.phone = phone.Text;
        if (male.Checked == true)
        {
            _user.gender = "Pria";
        }

        if (female.Checked == true)
        {
            _user.gender = "Perempuan";
        }
        userController.Create(_user);
        dataGridView1.DataSource = userController.ShowAll();
    }
    clearForm();
    tambah.Enabled = true;
    edit.Text = "Edit";
    hapus.Enabled = true;
}
```

Pada button edit, klik dua kali kemudian tambahkan kode berikut ini:

```csharp
private void button2_Click(object sender, EventArgs e)
{
    tambah.Text = "Simpan";
    hapus.Enabled = false;
    edit.Text = "Batal";
    tambah.Enabled = true;
}
```

## Delete Data Master
Method yang digunakan untuk menghapus data master adalah `Delete`. Method tersebut menerima 1 parameter yaitu `id`. `id` digunakan untuk menentukan data master mana yang akan dihapus. Klik dua kali pada button hapus kemudian tambahkan kode berikut:

```csharp
private void button3_Click(object sender, EventArgs e)
{
    userController._Delete(id_user);
    dataGridView1.DataSource = userController.ShowAll();
    clearForm();
    tambah.Enabled = true;
}
```






