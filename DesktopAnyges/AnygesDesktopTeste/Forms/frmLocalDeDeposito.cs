using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using QRCoder;

namespace AnygesDesktopTeste.Forms
{
    public partial class frmLocalDeDeposito : Form
    {
        public frmLocalDeDeposito()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            string dadosQRCode =
                "Nome: " + txtNomeFunc.Text + "\n" +
                "Código: " + txtCodigoFunc.Text + "\n" +
                "Cargo: " + txtCargoFunc.Text + "\n" +
                "Peso: " + txtPesoDoacao.Text;


            QRCodeGenerator qrGerador = new QRCodeGenerator();
            QRCodeData qrCodeData = qrGerador.CreateQrCode(dadosQRCode, QRCodeGenerator.ECCLevel.Q);
            QRCode qrCode = new QRCode(qrCodeData);
            Bitmap qrImagem = qrCode.GetGraphic(20);
            Bitmap imagemRedimensionada = new Bitmap(qrImagem, pictureBox1.Width, pictureBox1.Height);
            pictureBox1.SizeMode = PictureBoxSizeMode.Zoom;
            pictureBox1.Image = imagemRedimensionada;
        }
    }
}
