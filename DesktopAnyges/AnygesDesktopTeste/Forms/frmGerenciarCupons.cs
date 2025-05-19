using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace AnygesDesktopTeste.Forms
{
    public partial class frmGerenciarCupons : Form
    {
        public frmGerenciarCupons()
        {
            InitializeComponent();
        }

        private void frmGerenciarCupons_Load(object sender, EventArgs e)
        {
            lblCupom.Left = (lblCupom.Parent.Width - lblCupom.Width) / 2;
            lblCupom.AutoSize = true;
        }

        
    }
}
