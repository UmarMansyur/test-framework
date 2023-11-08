# Controller

Controller merupakan bagian dari design pattern yang populer pada umumnya yaitu MVC. MVC merupakan singkatan dari Model, View, dan Controller. Controller merupakan bagian yang berisi logika dari aplikasi. Pada halaman ini akan dibahas mengenai controller pada aplikasi windows forms.

## Membuat Controller

1. Buka project yang telah dibuat sebelumnya.
2. Buat folder baru dengan nama **Controllers**.
3. Klik kanan pada project di _solution explorer_, kemudian pilih **Add** > **Class**.
4. Beri nama class dengan **ExampleController**.
<div style="text-align: center">
  <img src="/assets/controller.png" alt="add class" style="zoom:50%;" />
</div>

## Menambahkan Method

Dalam Controller biasanya terdapat beberapa method yang digunakan untuk mengatur aplikasi. Method-method tersebut antara lain:

- Method untuk menampilkan data
- Method untuk menyimpan data
- Method untuk menghapus data
- Method untuk mengubah data

Jika diteliti dengan cermat, kita bisa mengatakan bahwa controller merupakan otak dari aplikasi. Lalu bagaimana implementasi dari controller. Kita ilustrasikan dengan contoh berikut:

![controller](https://media.geeksforgeeks.org/wp-content/uploads/20230927120218/mvc.png)

User melakukan request atau permintaan terhadap aplikasi. Permintaan tersebut akan memanggil method menampilkan data yang terdapat pada kontroller. Kemudian controller akan memanggil model untuk mengambil data dari database. Setelah data berhasil diambil, controller akan mengirimkan data tersebut ke view. View akan menampilkan data tersebut ke user. Langkah tersebut akan berlaku juga untuk method lainnya.

Kita coba implementasikan dengan contoh berikut:

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Windows.Forms;

namespace WindowsFormsApplication3
{
    class ExampleController
    {
      public DataTable _data = new DataTable();
      public DataTable Show()
      {
        return data;
      }

      public void Create(Dictionary<string, object> data)
      {
        try
        {
          var newRow = _data.NewRow();
          foreach (var item in data)
          {
            newRow[item.Key] = item.Value;
          }
          _data.Rows.Add(newRow);
        }
        catch (Exception e)
        {
          MessageBox.Show(e.Message);
        }
      }

      public void Update(int id, IDictionary<string, object> data)
      {
        try
        {
          var row = _data.Rows(id);
          if (row == null)
          {
            throw new Exception("Data tidak ditemukan");
          }
          foreach (var item in data)
          {
          row[item.Key] = item.Value;
          }
        }
        catch (Exception e)
        {
          MessageBox.Show(e.Message);
        }
      }

      public void Destroy(int id)
      {
        try
        {
          if(id >= 0 && id < _data.Rows.Count)
          {
            _data.Rows.RemoveAt(id);
          }
          else
          {
            throw new ArgumentException("Error, ID not found");
          }
        }
        catch (Exception e)
        {
          MessageBox.Show(e.Message);
        }
      }
    }
}
```

Pada contoh di atas, kita membuat class **ExampleController** yang berisi method **Show**, **Create**, **Update**, dan **Destroy**. Method **Show** digunakan untuk menampilkan data. Method **Create** digunakan untuk menyimpan data. Method **Update** digunakan untuk mengubah data. Method **Destroy** digunakan untuk menghapus data.

## Menggunakan Controller

Setelah membuat controller, kita dapat menggunakan controller tersebut pada view. Kita coba implementasikan dengan contoh berikut:

```csharp{23}
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using System.Collections;

namespace WindowsFormsApplication3 
{
  public partial class Form1 : Form
  {
    private ExampleController _controller = new ExampleController();
    private void simpan_Click(object sender, EventArgs e) {
      var data = new Dictionary<string, object>();
      data.Add("id", 1);
      data.Add("name", "John Doe");
      data.Add("address", "Jl. Jendral Sudirman No. 1");
      data.Add("phone", "08123456789");
      data.Add("email", "budi@mail.com");
      _controller.Create(data);
    }
  }
}
```
Pertama, kita membuat instance dari class **ExampleController** dengan nama **_controller**. Kemudian kita memanggil method **Create** pada controller tersebut. Method **Create** menerima parameter berupa dictionary. Dictionary tersebut berisi data yang akan disimpan. Data tersebut berupa pasangan key dan value. Key adalah nama kolom pada tabel. Value adalah nilai yang akan disimpan pada kolom tersebut.

::: warning

Kode di atas hanya contoh. Anda dapat mengubahnya sesuai dengan kebutuhan. Anda juga dapat menambahkan method lainnya pada controller. Method yang telah dibuat dapat digunakan pada view. dengan cara memanggil method tersebut pada **event** yang diinginkan.

:::

Jika dilihat, kode yang telah ditulis sebelumnya tidak ada kaitannya sama sekali dengan model. Lantas, bagaimana model dan controller saling berinteraksi?