# Config
Folder Config biasanya berisi file-file konfigurasi yang dibutuhkan oleh aplikasi. File-file ini biasanya berisi konfigurasi yang berbeda-beda untuk setiap lingkungan (development, production, staging, dll). Salah satu contoh file yang sering ditemukan di folder ini adalah file connection yang berisi konfigurasi koneksi ke database.

## Menambahkan Folder Config
Adapun cara menambahkan folder Config adalah sebagai berikut:
1. Buat folder dengan nama *Config*
2. Tambahkan file-file konfigurasi yang dibutuhkan oleh aplikasi.

Kita akan menggunakan file connection sebagai contoh. Adapun cara menambahkan file connection adalah sebagai berikut:
```csharp
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
namespace WindowsFormsApplication7.Config
{
    public sealed class Connection
    {
        private static Connection instance;
        private static MySqlConnection connection;
        private readonly string url = "datasource=localhost;username=root;password=;database=pharmacy;Convert Zero Datetime=True";

        private Connection()
        {
            try
            {
                connection = new MySqlConnection(this.url);
            } catch (Exception err)
            {
                Utils.Notify.notifyError(err);
            }
        }

        public MySqlConnection getConnection()
        {
            return connection;
        }
        
        public MySqlDataReader Query(string sql)
        {
            try {
                MySqlDataReader response;
                connection.Close();
                connection.Open();
                MySqlCommand query = new MySqlCommand(sql, getConnection());
                query.ExecuteNonQuery();
                response = query.ExecuteReader();
                return response;
            } 
            catch (Exception error) {
                Utils.Notify.notifyError(error);
            }
            return null;
        }

        public static Connection getInstance()
        {
            if(instance == null)
            {
                instance = new Connection();
            }
            return instance;

        }
    }
}
```

Kode di atas akan membuat class Connection yang berisi method getConnection() dan Query(). Method getConnection() digunakan untuk mendapatkan koneksi ke database. Sedangkan method Query() digunakan untuk melakukan query ke database. Method Query() akan mengembalikan nilai MySqlDataReader yang berisi hasil query.

## Menggunakan File Connection
File koneksi biasanya sering digunakan di dalam class Controller. Adapun cara menggunakan file connection adalah sebagai berikut:
```csharp
Connection connection = Connection.getInstance();
public void Create(Models.User user) 
{
    try {
        MySqlCommand _command = _connection.getConnection().CreateCommand();
        _command.CommandText = "INSERT INTO " + _user.TableName + " (name, email) VALUES (@name, @email)";
        _command.Parameters.AddWithValue("@name", User.Name);
        _command.Parameters.AddWithValue("@email", User.Email);
        _connection.getConnection().Open();
        _command.Connection = _connection.getConnection();
        _command.ExecuteNonQuery();
        _connection.getConnection().Close();
    } catch (Exception e) {
        MessageBox.Show(e.Message);
    }
}
```

Atau dapat juga dilakukan dengan cara sebagai berikut:
```csharp
Connection connection = Connection.getInstance();
public void Create(Models User) 
{
    try {
        this.connection.Query("INSERT INTO " + _user.TableName + " (name, email) VALUES ('" + User.Name + "', '" + User.Email + "')");
    } catch (Exception e) {
        MessageBox.Show(e.Message);
    }
}
```