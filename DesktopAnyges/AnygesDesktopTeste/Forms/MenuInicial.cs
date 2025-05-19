using System;
using System.Collections.Generic;
using System;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Runtime.InteropServices;
using AnygesDesktopTeste.Forms;

namespace AnygesDesktopTeste.Forms
{
    public partial class MenuInicial : Form
    {
        private Button currentButton;
        private Random random;
        private int tempIndex;
        private Form activeForm;
        public MenuInicial()  // Construtor do Form
        {
            InitializeComponent();  // Inicializa os componentes do formulário
            random = new Random();
            //btnCloseChildForm.Visible = false;
            this.Text = string.Empty;
            this.ControlBox = true;
            this.MaximizedBounds = Screen.FromHandle(this.Handle).WorkingArea;
        }
        [DllImport("user32.DLL", EntryPoint = "ReleaseCapture")]
        private extern static void ReleaseCapture();
        [DllImport("user32.DLL", EntryPoint = "SendMessage")]
        private extern static void SendMessage(System.IntPtr hWnd, int wMsg, int wParam, int lParam);

        private void AtivarBotao(object btnSender)
        {
            if (btnSender != null)
            {
                if (currentButton != (Button)btnSender)
                {
                    DesabilitarBotao();
                   
                    currentButton = (Button)btnSender;

                    currentButton.ForeColor = Color.White;
                    currentButton.Font = new System.Drawing.Font("Inria Sans", 15.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));



                    //btnCloseChildForm.Visible = true;
                }
            }
        }
        private void DesabilitarBotao()
        {
            foreach (Control previousBtn in painelBotoes.Controls)
            {
                if (previousBtn.GetType() == typeof(Button))
                {
                    previousBtn.BackColor = Color.FromArgb(31, 97, 36);
                    previousBtn.ForeColor = Color.Gainsboro;
                    previousBtn.Font = new System.Drawing.Font("Inria Sans", 15.75F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
                }
            }
        }
        private void AbrirForm(Form childForm, object btnSender)
        {
            if (activeForm != null)
                activeForm.Close();
            AtivarBotao(btnSender);
            activeForm = childForm;
            childForm.TopLevel = false;
            childForm.FormBorderStyle = FormBorderStyle.None;
            childForm.Dock = DockStyle.Fill;
            this.painelForm.Controls.Add(childForm);
            this.painelForm.Tag = childForm;
            childForm.BringToFront();
            childForm.Show();
            lblNomeForm.Text = childForm.Text;
            lblNomeForm.Left = (lblNomeForm.Parent.Width - lblNomeForm.Width) / 2;
            lblNomeForm.AutoSize = true;
        }

        private void MenuInicial_Load(object sender, EventArgs e)
        {
            // Coloque aqui o código que você deseja executar quando o formulário for carregado, se necessário.
        }

        private void btnFarmAprov_Click(object sender, EventArgs e)
        {
            AbrirForm(new Forms.frmFarmaciaAprov(), sender);
        }

        private void btnCentAprov_Click(object sender, EventArgs e)
        {
            AbrirForm(new Forms.frmCentDistAprov(), sender);
        }

        private void btnUser_Click(object sender, EventArgs e)
        {
            AbrirForm(new Forms.frmUsuarios(), sender);
        }

        private void btnFarmRev_Click(object sender, EventArgs e)
        {
            AbrirForm(new Forms.frmFarmaciaRev(), sender);
        }

        private void btnCentRev_Click(object sender, EventArgs e)
        {
            AbrirForm(new Forms.frmCentDistRev(), sender);
        }

        private void btnAssociacao_Click(object sender, EventArgs e)
        {
            AbrirForm(new Forms.frmAssociacao(), sender);
        }

        
    }
}