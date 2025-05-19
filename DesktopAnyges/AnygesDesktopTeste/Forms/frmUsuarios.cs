using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Data.SqlClient;


namespace AnygesDesktopTeste.Forms
{
    public partial class frmUsuarios : Form
    {
        ClasseConexao conexao = new ClasseConexao();
        public frmUsuarios()
        {
            InitializeComponent();
        }
        private void frmUsuarios_Load(object sender, EventArgs e)
        {
            dataGridView1.CellClick += dataGridView1_CellClick;
            CarregarGrid();
            PreencherTextBoxes(0);
            BloquearTextBoxes();
        }
        private void CarregarGrid()
        {
           
            string sql = "SELECT * FROM tblUsuario";

            try
            {
                DataTable dt = conexao.executarSQL(sql);
                dataGridView1.DataSource = dt;
            }
            catch (Exception ex)
            {
                MessageBox.Show("Erro ao carregar dados: " + ex.Message);
            }
        }

        private void PreencherTextBoxes(int rowIndex)
        {
            if (dataGridView1.Rows.Count > 0 && rowIndex >= 0)
            {
                txtId.Text = dataGridView1.Rows[rowIndex].Cells["ID_usuario"].Value?.ToString();
                txtNome.Text = dataGridView1.Rows[rowIndex].Cells["nome_usuario"].Value?.ToString();
                txtSobrenome.Text = dataGridView1.Rows[rowIndex].Cells["sobrenome_usuario"].Value?.ToString();
                txtCpf.Text = dataGridView1.Rows[rowIndex].Cells["cpf"].Value?.ToString();
                txtTelefone.Text = dataGridView1.Rows[rowIndex].Cells["telefone_usuario"].Value?.ToString();
                txtEmail.Text = dataGridView1.Rows[rowIndex].Cells["email_usuario"].Value?.ToString();
                txtSenha.Text = dataGridView1.Rows[rowIndex].Cells["senha_usuario"].Value?.ToString();

                if (dataGridView1.Rows[rowIndex].Cells["dt_nascimento"].Value != DBNull.Value)
                {
                    DateTime dataNascimento = (DateTime)dataGridView1.Rows[rowIndex].Cells["dt_nascimento"].Value;
                    txtDataNascimento.Text = dataNascimento.ToString("yyyy-MM-dd"); 
                }
            }
        }
   

        private void BtnConcluido_Click(object sender, EventArgs e)
        {
            if (dataGridView1.CurrentRow != null)
            {
                SqlCommand cmd = new SqlCommand(@"UPDATE tblUsuario SET 
            nome_usuario = @Nome,
            sobrenome_usuario = @Sobrenome,
            cpf = @Cpf,
            telefone_usuario = @Telefone,
            email_usuario = @Email,
            senha_usuario = @Senha,
            dt_nascimento = @DataNascimento
            WHERE ID_usuario = @Id");

                cmd.Parameters.AddWithValue("@Nome", txtNome.Text);
                cmd.Parameters.AddWithValue("@Sobrenome", txtSobrenome.Text);
                cmd.Parameters.AddWithValue("@Cpf", txtCpf.Text);
                cmd.Parameters.AddWithValue("@Telefone", txtTelefone.Text);
                cmd.Parameters.AddWithValue("@Email", txtEmail.Text);
                cmd.Parameters.AddWithValue("@Senha", txtSenha.Text);

                if (DateTime.TryParse(txtDataNascimento.Text, out DateTime dtNasc))
                    cmd.Parameters.AddWithValue("@DataNascimento", dtNasc);
                else
                    cmd.Parameters.AddWithValue("@DataNascimento", DBNull.Value);

                cmd.Parameters.AddWithValue("@Id", txtId.Text);

                conexao.manutencaoDB_Parametros(cmd);
                CarregarGrid();
                BloquearTextBoxes();
            }
        }
        private void BloquearTextBoxes()
        {

            txtNome.ReadOnly = true;
            txtEmail.ReadOnly = true;
            txtCpf.ReadOnly = true;
            txtTelefone.ReadOnly = true;
            txtDataNascimento.ReadOnly = true;
            txtId.ReadOnly = true;
            txtSenha.ReadOnly = true;
        }

        private void LiberarTextBoxes()
        {
            txtNome.ReadOnly = false;
            txtEmail.ReadOnly = false;
            txtCpf.ReadOnly = false;
            txtTelefone.ReadOnly = false;
            txtDataNascimento.ReadOnly = false;
            txtId.ReadOnly = false;
            txtSenha.ReadOnly = false;
        
        }

        private void BtnCancelar_Click(object sender, EventArgs e)
        {
            PreencherTextBoxes(0);
            BloquearTextBoxes();
        }
        private void dataGridView1_DataError(object sender, DataGridViewDataErrorEventArgs e)
        {
            e.ThrowException = false;
        }

        private void BtnEditar_Click(object sender, EventArgs e)
        {
          
                LiberarTextBoxes();
            
        }
        private void dataGridView1_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            if (e.RowIndex >= 0)
            {
                PreencherTextBoxes(e.RowIndex);
            }
        }

        private void button1_Click_1(object sender, EventArgs e)
        {
            string sql = "SELECT * FROM tblUsuario WHERE nome_usuario LIKE @busca";
            SqlCommand cmd = new SqlCommand(sql);
            cmd.Parameters.AddWithValue("@busca", "%" + TxtFiltro.Text + "%");

            ClasseConexao con = new ClasseConexao();
            DataTable dt = con.executarSQL_Parametros(cmd);

            if (dt != null && dt.Rows.Count > 0)
            {
                txtNome.Text = dt.Rows[0]["nome_usuario"].ToString();
                txtEmail.Text = dt.Rows[0]["email_usuario"].ToString();
                txtCpf.Text = dt.Rows[0]["cpf"].ToString();
                txtSobrenome.Text = dt.Rows[0]["sobrenome_usuario"].ToString();
                txtTelefone.Text = dt.Rows[0]["telefone_usuario"].ToString();
                txtDataNascimento.Text = dt.Rows[0]["dt_nascimento"].ToString();
                txtId.Text = dt.Rows[0]["Id_usuario"].ToString();
                txtSenha.Text = dt.Rows[0]["senha_usuario"].ToString();


            }
            else
            {
                MessageBox.Show("Nenhum registro encontrado!");
            }

        }
    }
}
