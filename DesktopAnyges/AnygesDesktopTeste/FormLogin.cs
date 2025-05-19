using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using AnygesDesktopTeste.Forms;
using System.Data.SqlClient;

namespace AnygesDesktopTeste
{
    public partial class FormLogin : Form
    {

        ClasseConexao con;
        DataTable dt;
        public FormLogin()
        {
            InitializeComponent();
        }

        private void btnEntrar_Click(object sender, EventArgs e)
        {

            con = new ClasseConexao();
            string email = txtEmail.Text;
            string senha = txtSenha.Text;
            string tipo = cmbTipoUsuario.SelectedItem.ToString();
            string sql = "";

            if (tipo == "Funcionário")
            {
                sql = "SELECT codigo_func, senha_func FROM tblFuncionario WHERE codigo_func = @codigo AND senha_func = @senha";
            }
            else if (tipo == "Associação") { 
            
                sql = "SELECT codigo_assoc, senha_assoc FROM tblAssociacao WHERE codigo_assoc = @codigo AND senha_assoc = @senha";
            }
            else if (tipo == "Local de Depósito") { 
         
                sql = "SELECT codigo_depo, senha_depo FROM tblLocalDeposito WHERE codigo_depo = @codigo AND senha_depo = @senha";
            }

            // Cria o comando e adiciona parâmetros
            SqlCommand comando = new SqlCommand(sql);
            comando.Parameters.AddWithValue("@codigo", email);
            comando.Parameters.AddWithValue("@senha", senha);

            // Usa o novo método seguro
            dt = con.executarSQL_Parametros(comando);

            if (dt != null && dt.Rows.Count > 0)
            {
                this.Hide();

                if (tipo == "Funcionário")
                {
                    MenuInicial menu = new MenuInicial();
                    menu.ShowDialog();
                }
                else if (tipo == "Associação")
                {
                    frmAssociacao assoc = new frmAssociacao();
                    assoc.ShowDialog();
                }
                else if (tipo == "Local de Depósito")
                {
                    frmLocalDeDeposito LocalDepos = new frmLocalDeDeposito();
                    LocalDepos.ShowDialog();
                  
                }

                this.Close();
            }
            else
            {
                MessageBox.Show("E-mail ou senha incorretos!", "Erro de Login", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }


        }



        private void BtnSair_Click_1(object sender, EventArgs e)
        {
            Application.Exit();
        
        }

        private void FormLogin_Load(object sender, EventArgs e)
        {
            cmbTipoUsuario.Items.Add("Funcionário");
            cmbTipoUsuario.Items.Add("Associação");
            cmbTipoUsuario.Items.Add("Local de Depósito");
            cmbTipoUsuario.SelectedIndex = 0;
        }
    }
}


