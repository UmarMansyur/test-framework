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

namespace project_akhir.Helpers
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

Semisal, kita menggunakan database kemudiann kita ingin mengisi ComboBox dengan data dari database. Maka, kita dapat menggunakan kode berikut:

1. Letakkan kode berikut pada File Controller. Misal, kita akan mengisi ComboBox dengan data dari tabel kategori pada file ProductController.cs

```csharp
public void GetCategories(ComboBox ComboBox1)
{
    MySqlDataReader categories = this._connection.Query("SELECT * FROM kategori");
    while (categories.Read())
    {
        ComboBox1.Items.Add(new Helpers.ComboBox(categories.GetInt32(0), categories.GetString(1)));
    }
    categories.Close();
}
```

2. Buka File BaseController.cs. Kemudian, rubah hak akses dari private menjadi public. Perhatikan kode berikut:

```csharp
private Config.Connection _connection = Config.Connection.getInstance(); // [!code --]
public Config.Connection _connection = Config.Connection.getInstance(); // [!code ++]
```
3. Kemudian, buka form view. Kemudian, ketikkan kode berikut:
```csharp
ProductController productController = new ProductController();
public void InitializeComboBox()
{
   productController.GetCategories(ComboBox1);
}

```
## Mendapatkan Id and Value dari ComboBox

Untuk mendapatkan Id dan Value dari ComboBox, maka dapat dilakukan dengan cara sebagai berikut:

```csharp
ComboBox comboBox = (ComboBox)ComboBox1.SelectedItem;
MessageBox.Show(comboBox.Id.ToString());
```

Kode di atas akan menampilkan Id dari ComboBox yang dipilih. Jika ingin menampilkan Value, maka dapat menggunakan kode berikut:

```csharp
ComboBox comboBox = (ComboBox)ComboBox1.SelectedItem;
MessageBox.Show(comboBox.Value.ToString());
```


## Menampilkan Id dan Value pada ComboBox

```csharp
private void category_SelectedIndexChanged(object sender, EventArgs e)
{
    string item = ((Helpers.ComboBox)category.SelectedItem).Id.ToString();
}
```
