# Model
Dalam pengertiannya model merupakan file yang digunakan untuk menggambarkan schema dari database. Schema tersebut berupa tabel, kolom, relasi antar tabel, dan lain-lain. 

## Menambahkan Model
Adapun cara menambahkan model adalah sebagai berikut:
1. Buat folder dengan nama *Models*
2. Buat class sesuai dengan model yang akan dibuat. Contoh : 

```csharp
public class User
{
    public string TableName = "users";
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
}
```

Dari kode di atas dapat dilihat bahwa terdapat 3 properti yang mewakiliki kolom pada tabel User.

## Mengekspor Model
Untuk mengekspor model, dapat dilakukan dengan cara sebagai berikut:

```csharp
public static List<object> Models = new List<object>
{
    new User()
};
```

Cara di atas akan mengekspor model User. Jika ingin mengekspor lebih dari satu model, maka dapat dilakukan dengan cara sebagai berikut:

```csharp
public static List<object> Models = new List<object>
{
    new User(),
    new Role()
};
```

Jika masih bingung, dapat melihat contoh pada folder *Models*.

## Menjalankan Model
Untuk menjalankan model, dapat dilakukan dengan cara sebagai berikut:

```csharp
Models.User user = new Models.User();
user.Name = "Umar";
user.Email = "umar@unira.ac.id";
this.UserController.Create(user);
```

Pada contoh di atas, terdapat 2 baris kode yang pertama untuk membuat objek user dan yang kedua untuk memanggil method Create pada *UserController*. Dalam class Controller anda dapat membuat fungsi sebagai berikut: 

```csharp
Models.User _user = new Models.User();

public void Create(Models User) 
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

Jika anda menggunakan cara prosedural, maka dapat dilakukan dengan cara sebagai berikut:

```csharp
Models.User user = new Models.User();
user.Name = "Umar";
user.Email = "umar@unira.ac.id";

// Penulisan kode berikut ini tidak disarankan
string query = "INSERT INTO users (name, email) VALUES ('" + user.Name + "', '" + user.Email + "')";
this.Connection.Open();
MySqlCommand command = new MySqlCommand(query, this.Connection);
command.ExecuteNonQuery();
this.Connection.Close();
```
```