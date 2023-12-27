# Transaksi
Ketika membuat sebuah sistem berbasis Toko Penjualan maka kegiatan transaksi merupakan fitur yang paling krusial. Pada kenyataannya, sistem informasi yang dilengkapi fitur transaksi dapat mempercepat proses transaksi dan mengurangi kesalahan dalam melakukan transaksi.

## Membuat Form Transaksi
Buatlah sebuah view dengan nama TransaksiView.cs. Kemudian, desain sistemnya seperti ini:
<img src="/assets/transaksi.png" alt="transaksi" width="100%">


Setelah view dibuat, sebagaimana konsep MVC pada pembahasan sebelumnya, selanjutnya kita akan membuat class model. Buatlah sebuah class model dengan nama TransaksiModel.cs. Kemudian, ketikkan kode berikut:

1. TransaksiModel.cs
```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace project_akhir.Models
{
    class TransaksiModel // [!code --]
    public class TransaksiModel // [!code ++]
    {
        public int id { get; set; } // [!code ++]
        public string buyer_name { get; set; } // [!code ++]
        public string buyer_phone { get; set; } // [!code ++]
        public double total_price { get; set; } // [!code ++]
        public int user_id { get; set; } // [!code ++]
    }
}
```

2. DetailTransaksiModel.cs
```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace project_akhir.Models
{
    class TransaksiModel // [!code --]
    public class TransaksiModel // [!code ++]
    {
        public int id { get; set; } // [!code ++]
        public string buyer_name { get; set; } // [!code ++]
        public string buyer_phone { get; set; } // [!code ++]
        public double total_price { get; set; } // [!code ++]
        public int user_id { get; set; } // [!code ++]
    }
}

```

Buatlah sebuah class controller dengan nama TransaksiController.cs. Kemudian, ketikkan kode berikut:

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using MySql.Data.MySqlClient;
using System.Windows.Forms;

namespace project_akhir.Controllers
{
    public class TransaksiController: BaseController
    {
        public void GetProvider(ComboBox ComboBox1)
        {
            MySqlDataReader categories = this._connection.Query("SELECT * FROM providers");
            while (categories.Read())
            {
                ComboBox1.Items.Add(new Helpers.ComboBox(categories.GetInt32(0), categories.GetString(1)));
            }
            categories.Close();
        }
    }
}
```

Klik dua kali pada layar TransaksiView.cs. Kemudian, ketikkan kode berikut:

```csharp
private void TransaksiKartu_Load(object sender, EventArgs e)
{
    Controllers.TransaksiController transaksiController = new Controllers.TransaksiController();
    transaksiController.GetProvider(comboBox1);
}
```

Kode tersebut akan mengisi ComboBox dengan data dari tabel providers. Selanjutnya, kita akan memfilter data dari tabel products berdasarkan provider yang dipilih. Ketikkan kode berikut:

```csharp
private void comboBox1_SelectedIndexChanged(object sender, EventArgs e)
{
    string 
}