# Base Controller

Base Controller adalah class yang berfungsi untuk mengatur class controller lainnya. Class ini berisi method-method yang dapat digunakan oleh class controller lainnya. Dengan menggunakan base controller, maka class controller lainnya dapat mengakses method yang terdapat pada base controller. Kita akan membuat base controller dengan nama `BaseController.cs` pada folder `Controllers`.

## Membuat Base Controller
Tambahkan kode berikut pada `BaseController.cs`:
```csharp
using System.Collections.Generic;
using System.Data;
using System.Linq;
using MySql.Data.MySqlClient;
using System.Windows.Forms;

namespace project_akhir.Controllers
{
    public class BaseController
    {
        public string table = "";
        private Config.Connection _connection = Config.Connection.getInstance();
        
        public DataTable ShowAll(string query = "") {
            DataTable _data = new DataTable();
            _connection.getConnection().Close();
            _connection.getConnection().Open();
            MySqlDataReader data;
            if (query == "")
            {
                data = _connection.Query("SELECT * FROM " + this.table);
            }
            else
            {
                data = _connection.Query(query);
            }
            _data.Load(data);
            _connection.getConnection().Close();
            return _data;
        }
        
        public void Create(IDictionary<string, object> request)
        {
            _connection.getConnection().Close();
            _connection.getConnection().Open();
            MySqlCommand _command = _connection.getConnection().CreateCommand();
            string fields = string.Join(", ", request.Keys);
            string values = string.Join(", ", request.Keys.Select(key => "@" + key));
            string sql = "INSERT INTO " + this.table + " (" + fields + ") VALUES (" + values + ")";
            _command.CommandText = sql;
            foreach (var kvp in request)
            {
                _command.Parameters.AddWithValue("@" + kvp.Key, kvp.Value);
            }

            _command.ExecuteNonQuery();
            _connection.getConnection().Close();
        } 

        public void Update(int id, IDictionary<string, object> request)
        {
            _connection.getConnection().Close();
            _connection.getConnection().Open();
            MySqlCommand _command = _connection.getConnection().CreateCommand();
            string fields = string.Join(", ", request.Keys.Select(key => key + " = @" + key));
            string sql = "UPDATE " + this.table + " SET " + fields + " WHERE id = " + id;
            _command.CommandText = sql;
            foreach (var kvp in request)
            {
                _command.Parameters.AddWithValue("@" + kvp.Key, kvp.Value);
            }
            _command.ExecuteNonQuery();
            _connection.getConnection().Close();

        }

        public void Delete(int id)
        {
            
            if(id < 0)
            {
                MessageBox.Show("Pilih data yang akan dihapus");
                return;
            }
            _connection.getConnection().Close();
            _connection.getConnection().Open();
            MySqlCommand _command = _connection.getConnection().CreateCommand();
            string sql = "DELETE FROM " + this.table + " WHERE id = " + id;
            _command.CommandText = sql;
            _command.ExecuteNonQuery();
            _connection.getConnection().Close();
        }
    }
}
```

Keterangan kode di atas:
- public string table = ""; digunakan untuk menyimpan nama tabel yang akan digunakan.
- private Config.Connection _connection = Config.Connection.getInstance(); digunakan untuk membuat objek dari class Connection.
- public DataTable ShowAll(string query = "") digunakan untuk menampilkan semua data dari tabel yang digunakan.
- public void Create(IDictionary<string, object> request) digunakan untuk menambahkan data ke dalam tabel yang digunakan.
- public void Update(int id, IDictionary<string, object> request) digunakan untuk mengubah data pada tabel yang digunakan.
- public void Delete(int id) digunakan untuk menghapus data pada tabel yang digunakan.

## Base Controller Vs Basic Controller

Base Controller dan Basic Controller memiliki perbedaan yang cukup signifikan. Perbedaan tersebut dapat dilihat pada kode berikut:

Base Controller:

```csharp
public void Create(IDictionary<string, object> request)
{
    _connection.getConnection().Close();
    _connection.getConnection().Open();
    MySqlCommand _command = _connection.getConnection().CreateCommand();
    string fields = string.Join(", ", request.Keys);
    string values = string.Join(", ", request.Keys.Select(key => "@" + key));
    string sql = "INSERT INTO " + this.table + " (" + fields + ") VALUES (" + values + ")";
    _command.CommandText = sql;
    foreach (var kvp in request)
    {
        _command.Parameters.AddWithValue("@" + kvp.Key, kvp.Value);
    }

    _command.ExecuteNonQuery();
    _connection.getConnection().Close();
} 
```

Basic Controller:

```csharp
public void Create(Models.User User) 
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


Dari kedua kode di atas dapat dilihat bahwa pada base controller, kita dapat menambahkan data ke dalam tabel dengan cara yang lebih mudah. Sedangkan pada basic controller, kita harus membuat query untuk menambahkan data ke dalam tabel. Kita dapat membayangkan ada 10 fitur yang membutuhkan query untuk menambahkan data ke dalam tabel. Jika menggunakan basic controller, maka kita harus membuat 10 query yang berbeda. Sedangkan jika menggunakan base controller, kita hanya perlu membuat 1 method untuk menambahkan data ke dalam tabel.

::: tip
Jika diperhatikan, sebenarnya pada base controller terdapat method yang sama dengan basic controller. Hanya saja, pada base controller dibuatkan method yang lebih umum sehingga dapat digunakan oleh class controller lainnya serta pada setiap fungsi Query dibuat menjadi dinamis menggunakan bantuan parameter, string interpolation, dan perulangan.
:::