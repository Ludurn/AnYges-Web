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
    public partial class frmCentDistRev : Form
    {
        ClasseConexao conexao = new ClasseConexao();
        public frmCentDistRev()
        {
            InitializeComponent();
        }
        private void frmCentDistRev_Load(object sender, EventArgs e)
        {
            dataGridView1.CellFormatting += dataGridView1_CellFormatting;
            dataGridView1.CellClick += dataGridView1_CellClick;
            CarregarGrid();
            PreencherTextBoxes(0);
            BloquearTextBoxes();
        }
        private void CarregarGrid()
        {

            string sql = "SELECT * FROM tblLocalDeposito WHERE aprovado_depo = 'R'";


            try
            {
                DataTable dtOriginal = conexao.executarSQL(sql);
      string[] colunasBinarias = { "CNPJ_depo", "certificacao_depo", "alvara_depo", "licenca_depo", "comprovante_depo" };

        
                DataTable dtConvertido = new DataTable();

                foreach (DataColumn col in dtOriginal.Columns)
                {
                    if (colunasBinarias.Contains(col.ColumnName) && !dtConvertido.Columns.Contains(col.ColumnName))
                    {
                        dtConvertido.Columns.Add(col.ColumnName, typeof(string));
                    }
                    else if (!dtConvertido.Columns.Contains(col.ColumnName))
                    {
                        dtConvertido.Columns.Add(col.ColumnName, col.DataType);
                    }
                }

                foreach (DataRow rowOrig in dtOriginal.Rows)
                {
                    DataRow rowNovo = dtConvertido.NewRow();

                    foreach (DataColumn col in dtOriginal.Columns)
                    {
                        if (colunasBinarias.Contains(col.ColumnName))
                        {
                            if (rowOrig[col.ColumnName] != DBNull.Value)
                            {
                                byte[] bytes = (byte[])rowOrig[col.ColumnName];
                                rowNovo[col.ColumnName] = "0x" + BitConverter.ToString(bytes).Replace("-", "");
                            }
                            else
                            {
                                rowNovo[col.ColumnName] = null;
                            }
                        }
                        else
                        {
                            rowNovo[col.ColumnName] = rowOrig[col.ColumnName];
                        }
                    }

                    dtConvertido.Rows.Add(rowNovo);
                }

            
                dataGridView1.DataSource = dtConvertido;
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
                txtNome.Text = dataGridView1.Rows[rowIndex].Cells["nome_depo"].Value?.ToString();
                txtEmail.Text = dataGridView1.Rows[rowIndex].Cells["email_depo"].Value?.ToString();

                txtCnpj.Text = ConversorBytes.TratarValor(dataGridView1.Rows[rowIndex].Cells["CNPJ_depo"].Value);
                txtCertidao.Text = ConversorBytes.TratarValor(dataGridView1.Rows[rowIndex].Cells["certificacao_depo"].Value);
                txtAlvara.Text = ConversorBytes.TratarValor(dataGridView1.Rows[rowIndex].Cells["alvara_depo"].Value);
                txtLicenca.Text = ConversorBytes.TratarValor(dataGridView1.Rows[rowIndex].Cells["licenca_depo"].Value);
                txtComprovante.Text = ConversorBytes.TratarValor(dataGridView1.Rows[rowIndex].Cells["comprovante_depo"].Value);

                txtId.Text = dataGridView1.Rows[rowIndex].Cells["ID_local_deposito"].Value?.ToString();
                txtCodigo.Text = dataGridView1.Rows[rowIndex].Cells["codigo_depo"].Value?.ToString();
                txtSenha.Text = dataGridView1.Rows[rowIndex].Cells["senha_depo"].Value?.ToString();
                txtAprovado.Text = dataGridView1.Rows[rowIndex].Cells["aprovado_depo"].Value?.ToString();
            }
        }//comprovante_depo

        private void BloquearTextBoxes()
        {
            txtNome.ReadOnly = true;
            txtEmail.ReadOnly = true;
            txtCnpj.ReadOnly = true;
            txtCertidao.ReadOnly = true;
            txtAlvara.ReadOnly = true;
            txtLicenca.ReadOnly = true;
            txtComprovante.ReadOnly = true;
            txtCodigo.ReadOnly = true;
            txtSenha.ReadOnly = true;
            txtAprovado.ReadOnly = true;
        }

        private void LiberarTextBoxes()
        {
            txtNome.ReadOnly = false;
            txtEmail.ReadOnly = false;
            txtCnpj.ReadOnly = false;
            txtCertidao.ReadOnly = false;
            txtAlvara.ReadOnly = false;
            txtLicenca.ReadOnly = false;
            txtComprovante.ReadOnly = false;
            txtCodigo.ReadOnly = false;
            txtSenha.ReadOnly = false;
            txtAprovado.ReadOnly = false;
        }
        private void dataGridView1_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            if (e.RowIndex >= 0)
            {
                PreencherTextBoxes(e.RowIndex);
            }
        }





        public string ByteArrayToHexString(byte[] bytes)
        {
            return "0x" + BitConverter.ToString(bytes).Replace("-", "");
        }

        public byte[] HexStringToByteArray(string hex)
        {
            int length = hex.Length;
            byte[] bytes = new byte[length / 2];
            for (int i = 0; i < length; i += 2)
            {
                bytes[i / 2] = Convert.ToByte(hex.Substring(i, 2), 16);
            }
            return bytes;
        }

        private void BtnEditar_Click(object sender, EventArgs e)
        {
            LiberarTextBoxes();
        }

        private void BtnConcluido_Click(object sender, EventArgs e)
        {
           
                if (dataGridView1.CurrentRow != null)
                {
                    SqlCommand cmd = new SqlCommand(@"UPDATE tblLocalDeposito SET 
                nome_depo = @Nome,
                email_depo = @Email,
                CNPJ_depo = CONVERT(VARBINARY(MAX), @Cnpj, 1),
                certificacao_depo = CONVERT(VARBINARY(MAX), @Certidao, 1),
                alvara_depo = CONVERT(VARBINARY(MAX), @Alvara, 1),
                licenca_depo = CONVERT(VARBINARY(MAX), @Licenca, 1),
                comprovante_depo = CONVERT(VARBINARY(MAX), @Comprovante, 1),
                codigo_depo = @Codigo,
                senha_depo = @Senha,
                aprovado_depo = @Aprovado
                WHERE ID_local_deposito = @Id");

                    cmd.Parameters.AddWithValue("@Nome", txtNome.Text);
                    cmd.Parameters.AddWithValue("@Email", txtEmail.Text);
                    cmd.Parameters.AddWithValue("@Codigo", txtCodigo.Text);
                    cmd.Parameters.AddWithValue("@Senha", txtSenha.Text);
                    cmd.Parameters.AddWithValue("@Aprovado", txtAprovado.Text);
                    cmd.Parameters.AddWithValue("@Id", txtId.Text);
                    cmd.Parameters.AddWithValue("@Cnpj", HexStringToByteArray(txtCnpj.Text.Replace("0x", "")));
                    cmd.Parameters.AddWithValue("@Certidao", HexStringToByteArray(txtCertidao.Text.Replace("0x", "")));
                    cmd.Parameters.AddWithValue("@Alvara", HexStringToByteArray(txtAlvara.Text.Replace("0x", "")));
                    cmd.Parameters.AddWithValue("@Licenca", HexStringToByteArray(txtLicenca.Text.Replace("0x", "")));
                    cmd.Parameters.AddWithValue("@Comprovante", HexStringToByteArray(txtComprovante.Text.Replace("0x", "")));

                    conexao.manutencaoDB_Parametros(cmd); 
                    CarregarGrid();                    
                    BloquearTextBoxes();              
                }
            
        
           
        
 
        }

        private void BtnCancelar_Click(object sender, EventArgs e)
        {
            PreencherTextBoxes(0);
            BloquearTextBoxes();

        }



        private void dataGridView1_CellFormatting(object sender, DataGridViewCellFormattingEventArgs e)
        {

            if (e.Value is byte[] bytes)
            {
                e.Value = ConversorBytes.ByteArrayToHexString(bytes);
                e.FormattingApplied = true;
            }
        }

        private void dataGridView1_DataError(object sender, DataGridViewDataErrorEventArgs e)
        {
            e.ThrowException = false;
        }

        private void BtnEditar_Click_1(object sender, EventArgs e)
        {
            LiberarTextBoxes();
        }

        private void BtnConcluido_Click_1(object sender, EventArgs e)
        {
            if (dataGridView1.CurrentRow != null)
            {
                SqlCommand cmd = new SqlCommand(@"UPDATE tblLocalDeposito SET 
            nome_depo = @Nome,
            email_depo = @Email,
            CNPJ_depo = CONVERT(VARBINARY(MAX), @Cnpj, 1),
            certificacao_depo = CONVERT(VARBINARY(MAX), @Certidao, 1),
            alvara_depo = CONVERT(VARBINARY(MAX), @Alvara, 1),
            licenca_depo = CONVERT(VARBINARY(MAX), @Licenca, 1),
            comprovante_depo = CONVERT(VARBINARY(MAX), @Comprovante, 1),
            codigo_depo = @Codigo,
            senha_depo = @Senha,
            aprovado_depo = @Aprovado
            WHERE ID_local_deposito = @Id");

                cmd.Parameters.AddWithValue("@Nome", txtNome.Text);
                cmd.Parameters.AddWithValue("@Email", txtEmail.Text);
                cmd.Parameters.AddWithValue("@Codigo", txtCodigo.Text);
                cmd.Parameters.AddWithValue("@Senha", txtSenha.Text);
                cmd.Parameters.AddWithValue("@Aprovado", txtAprovado.Text);
                cmd.Parameters.AddWithValue("@Id", txtId.Text);
                cmd.Parameters.AddWithValue("@Cnpj", HexStringToByteArray(txtCnpj.Text.Replace("0x", "")));
                cmd.Parameters.AddWithValue("@Certidao", HexStringToByteArray(txtCertidao.Text.Replace("0x", "")));
                cmd.Parameters.AddWithValue("@Alvara", HexStringToByteArray(txtAlvara.Text.Replace("0x", "")));
                cmd.Parameters.AddWithValue("@Licenca", HexStringToByteArray(txtLicenca.Text.Replace("0x", "")));
                cmd.Parameters.AddWithValue("@Comprovante", HexStringToByteArray(txtComprovante.Text.Replace("0x", "")));


                conexao.manutencaoDB_Parametros(cmd);
                CarregarGrid();
                BloquearTextBoxes();
            }
        }

        private void BtnCancelar_Click_1(object sender, EventArgs e)
        {
            PreencherTextBoxes(0);
            BloquearTextBoxes();

        }
        private void dataGridView_CellFormatting(object sender, DataGridViewCellFormattingEventArgs e)
        {

            if (e.Value is byte[] bytes)
            {
                e.Value = ConversorBytes.ByteArrayToHexString(bytes);
                e.FormattingApplied = true;
            }
        }

        private void dataGridView_DataError(object sender, DataGridViewDataErrorEventArgs e)
        {
            e.ThrowException = false;
        }

        private void button1_Click_1(object sender, EventArgs e)
        {
            string sql = "SELECT * FROM tblLocalDeposito WHERE nome_depo LIKE @busca";
            SqlCommand cmd = new SqlCommand(sql);
            cmd.Parameters.AddWithValue("@busca", "%" + TxtFiltro.Text + "%");


            DataTable dt = conexao.executarSQL_Parametros(cmd);

            if (dt != null && dt.Rows.Count > 0)
            {
                txtNome.Text = dt.Rows[0]["nome_depo"].ToString();
                txtEmail.Text = dt.Rows[0]["email_depo"].ToString();
                txtCnpj.Text = ConversorBytes.TratarValor(dt.Rows[0]["CNPJ_depo"]);
                txtCertidao.Text = ConversorBytes.TratarValor(dt.Rows[0]["certificacao_depo"]);
                txtAlvara.Text = ConversorBytes.TratarValor(dt.Rows[0]["alvara_depo"]);
                txtLicenca.Text = ConversorBytes.TratarValor(dt.Rows[0]["licenca_depo"]);
                txtComprovante.Text = ConversorBytes.TratarValor(dt.Rows[0]["comprovante_depo"]);
                txtId.Text = dt.Rows[0]["ID_local_deposito"].ToString();
                txtCodigo.Text = dt.Rows[0]["codigo_depo"].ToString();
                txtSenha.Text = dt.Rows[0]["senha_depo"].ToString();
                txtAprovado.Text = dt.Rows[0]["aprovado_depo"].ToString();



            }
            else
            {
                MessageBox.Show("Nenhum registro encontrado!");
            }
        }
    }
}

