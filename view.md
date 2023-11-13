# View
View merupakan file yang digunakan untuk menampilkan data yang telah diolah oleh controller. 

## Membuat View

Adapun cara membuat view adalah sebagai berikut:
1. Buat folder dengan nama *Views*
2. Add Window Form dengan nama sesuai dengan nama view yang akan dibuat. Contoh : 

```csharp
public partial class UserView : Form
{
    public UserView()
    {
        InitializeComponent();
    }
}
```

## Menjalankan View

Controller :  
```csharp
public MySqlReader GetAll()
{
    return this.db.Query("SELECT * FROM users");
}
```

Kita berasumsi db adalah objek yang digunakan untuk mengakses database. Kemudian kita akan menggabungkan dengan view yang telah dibuat sebelumnya. Berikut adalah contoh penggabungannya:

```csharp
public partial class UserView : Form
{
    protected UserController userController = new UserController();
    private DataTable users = new DataTable();

    public UserView()
    {
        InitializeComponent();
    }

    private void UserView_Load(object sender, EventArgs e)
    {
        this.users.Load(this.userController.GetAll());
        this.dataGridView1.DataSource = this.users;
    }
}
```

Pada contoh di atas, terdapat 2 baris kode yang pertama untuk membuat objek userController dan yang kedua untuk memanggil method GetAll pada *UserController*. Pastikan untuk mengimport controller yang sudah dibuat. Anda juga dapat menggunakan fungsi lain yang telah dibuat pada controller. Seperti contoh, jika ingin menambahkan data, maka dapat dilakukan dengan cara sebagai berikut:

```csharp
public partial class UserView : Form
{
    protected UserController userController = new UserController();
    private DataTable users = new DataTable();

    public UserView()
    {
        InitializeComponent();
    }

    private void UserView_Load(object sender, EventArgs e)
    {
        this.users.Load(this.userController.GetAll());
        this.dataGridView1.DataSource = this.users;
    }

    private void button1_Click(object sender, EventArgs e)
    {
        Models.User user = new Models.User();
        user.Name = textBox1.Text;
        user.Email = textBox2.Text;
        this.userController.Create(user);
    }
}
```

Di Controller, pastikan fungsi Create sudah dibuat. Contoh:

```csharp
public void Create(Models.User user) 
{
  try {
    MySqlCommand command = new MySqlCommand();
    command.CommandText = "INSERT INTO " + _user.TableName + " (name, email) VALUES (@name, @email)";
    command.Parameters.AddWithValue("@name", User.Name);
    command.Parameters.AddWithValue("@email", User.Email);
    this.Connection.Open();
    command.Connection = this.Connection;
    command.ExecuteNonQuery();
    this.Connection.Close();
  } catch (Exception e) {
    MessageBox.Show(e.Message);
  }
}
```