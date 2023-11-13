# ComboBox

ComboBox merupakan tool pada visual studio yang berfungsi sebagai select dan options. ComboBox biasanya digunakan untuk memilih beberapa pilihan yang tersedia seperti pada kasus memilih prodi pada data mahasiswa.

## Properties

- **Items**: Menampilkan item-item yang ada pada ComboBox
- **Text**: Menampilkan teks yang ada pada ComboBox
- **SelectedIndex**: Menampilkan index yang dipilih pada ComboBox
- **SelectedText**: Menampilkan teks yang dipilih pada ComboBox
- **SelectedValue**: Menampilkan nilai yang dipilih pada ComboBox
- **DropDownStyle**: Menampilkan style yang dipilih pada ComboBox
- **DropDownHeight**: Menampilkan tinggi yang dipilih pada ComboBox

Jika dalam kode bahasa pemrograman PHP. Anda akan menggunakan kode seperti ini:

```html
<form action="" method="POST">
  <select name="choice">
    <option value="1">Pilihan 1</option>
    <option value="2">Pilihan 2</option>
    <option value="3">Pilihan 3</option>
  </select>
  <button type="submit" name="save">Submit</button>
</form>
```

Misalkan kita memilih Pilihan 1, maka akan menghasilkan nilai 1. Jika menggunakan PHP, maka kita akan menggunakan kode seperti ini:

```php
if(isset($_POST['save'])){
  $choice = $_POST['choice'];
  echo $choice;
}
```

Namun, bagaimana jika menggunakan Visual Studio ?. Anda dapat menggunakan kode seperti ini:

1. buatlah Folder Helpers. Lalu buatlah file dengan nama ComboBox.cs
2. Kemudian, ketikkan kode berikut:

```csharp

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WindowsFormsApplication7.Helpers
{
    class ComboBox
    {
        public int Id { get; private set; }
        public string Value { get; private set; }

        public ComboBox(int id, string value)
        {
            Id = id;
            Value = value;
        }

        public ComboBox()
        {
        }

        public override string ToString()
        {
            return Value;
        }

    }
}
```

3. Kemudian, buka file Form1.cs. Kemudian, ketikkan kode berikut:

```csharp

ComboBox1.Items.Add(new ComboBox(1, "Pilihan 1"));
ComboBox1.Items.Add(new ComboBox(2, "Pilihan 2"));
ComboBox1.Items.Add(new ComboBox(3, "Pilihan 3"));

```

4. Kemudian, ketika event button di klik, ketikkan kode berikut:

```csharp
private void button1_Click(object sender, EventArgs e)
{
    ComboBox comboBox = (ComboBox)ComboBox1.SelectedItem;
    MessageBox.Show(comboBox.Id.ToString());
}

```

Jika anda menggunakan database, maka anda dapat menggunakan kode berikut:

```csharp
public void InitializeComboBox()
{
    string query = "SELECT * FROM table";
    using (SqlConnection connection = new SqlConnection(connectionString))
    {
        SqlCommand command = new SqlCommand(query, connection);
        connection.Open();
        SqlDataReader reader = command.ExecuteReader();
        while (reader.Read())
        {
            ComboBox1.Items.Add(new ComboBox(reader.GetInt32(0), reader.GetString(1)));
        }
        reader.Close();
    }
}
```

ComboBox tidak dapat membedakan antara value dan label. Sehingga cara yang bisa digunakan adalah dengan membuat class ComboBox baru. Kemudian, kita akan mengisi ComboBox dengan class ComboBox yang baru. Namun, dalam class ComboBox yang baru, kita akan membuat 2 properti yaitu Id dan Value. Id akan digunakan untuk menyimpan value dari ComboBox. Sedangkan, Value akan digunakan untuk menyimpan label dari ComboBox. Setelah itu, lakukan overriding pada method ToString() untuk mengembalikan nilai Value.

## Mendapatkan Id and Value dari ComboBox

Untuk mendapatkan Id dan Value dari ComboBox, maka dapat dilakukan dengan cara sebagai berikut:

```csharp
ComboBox comboBox = (ComboBox)ComboBox1.SelectedItem;
MessageBox.Show(comboBox.Id.ToString());
```

Misalkan dalam view, nilai id akan ditampilkan pada MessageBox. Maka, dalam fungsi ComboBox1_SelectedIndexChanged, kita dapat menambahkan kode berikut:

```csharp
private void category_SelectedIndexChanged(object sender, EventArgs e)
{
    string item = ((Helpers.ComboBox)category.SelectedItem).Id.ToString();
    this.ProductModel.kategoriId = item;
}
```
