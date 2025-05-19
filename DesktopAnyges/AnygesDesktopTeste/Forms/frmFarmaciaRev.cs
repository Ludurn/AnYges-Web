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
    public partial class frmFarmaciaRev : Form
    
    {
        ClasseConexao conexao = new ClasseConexao();
        DataTable dt;
        public frmFarmaciaRev()
        {
            InitializeComponent();
        }
        private void CarregarGrid()
        {

            string sql = "SELECT * FROM tblAssociacao WHERE aprovada_assoc = 'R'";

            try
            {
                DataTable dtOriginal = conexao.executarSQL(sql);


                string[] colunasBinarias = { "CNPJ_assoc", "contrato_assoc", "certidao_assoc", "inscricao_assoc", "alvara_assoc", "regularidade_assoc", "registro_assoc" };


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
                txtNome.Text = dataGridView1.Rows[rowIndex].Cells["nome_assoc"].Value?.ToString();
                txtEmail.Text = dataGridView1.Rows[rowIndex].Cells["email_assoc"].Value?.ToString();

                txtCnpj.Text = ConversorBytes.TratarValor(dataGridView1.Rows[rowIndex].Cells["CNPJ_assoc"].Value);
                txtCertidao.Text = ConversorBytes.TratarValor(dataGridView1.Rows[rowIndex].Cells["certidao_assoc"].Value);
                txtAlvara.Text = ConversorBytes.TratarValor(dataGridView1.Rows[rowIndex].Cells["alvara_assoc"].Value);
                txtInscricao.Text = ConversorBytes.TratarValor(dataGridView1.Rows[rowIndex].Cells["inscricao_assoc"].Value);
                txtContrato.Text = ConversorBytes.TratarValor(dataGridView1.Rows[rowIndex].Cells["contrato_assoc"].Value);
                txtRegistro.Text = ConversorBytes.TratarValor(dataGridView1.Rows[rowIndex].Cells["registro_assoc"].Value);
                txtRegularidade.Text = ConversorBytes.TratarValor(dataGridView1.Rows[rowIndex].Cells["regularidade_assoc"].Value);

                txtidAssoc.Text = dataGridView1.Rows[rowIndex].Cells["ID_associacao"].Value?.ToString();
                txtCodigoAssoc.Text = dataGridView1.Rows[rowIndex].Cells["codigo_assoc"].Value?.ToString();
                txtsenhaAssoc.Text = dataGridView1.Rows[rowIndex].Cells["senha_assoc"].Value?.ToString();
                txtAprovadaAssoc.Text = dataGridView1.Rows[rowIndex].Cells["aprovada_assoc"].Value?.ToString();


            }
        }//comprovante_depo

        private void BloquearTextBoxes()
        {
            txtNome.ReadOnly = true;
            txtEmail.ReadOnly = true;
            txtCnpj.ReadOnly = true;
            txtCertidao.ReadOnly = true;
            txtAlvara.ReadOnly = true;
            txtInscricao.ReadOnly = true;
            txtContrato.ReadOnly = true;
            txtRegistro.ReadOnly = true;
            txtRegularidade.ReadOnly = true;
            txtidAssoc.ReadOnly = true;
            txtCodigoAssoc.ReadOnly = true;
            txtsenhaAssoc.ReadOnly = true;
            txtAprovadaAssoc.ReadOnly = true;

        }

        private void LiberarTextBoxes()
        {
            txtNome.ReadOnly = false;
            txtEmail.ReadOnly = false;
            txtCertidao.ReadOnly = false;
            txtAlvara.ReadOnly = false;
            txtInscricao.ReadOnly = false;
            txtContrato.ReadOnly = false;
            txtRegistro.ReadOnly = false;
            txtRegularidade.ReadOnly = false;
            txtidAssoc.ReadOnly = false;
            txtCodigoAssoc.ReadOnly = false;
            txtsenhaAssoc.ReadOnly = false;
            txtAprovadaAssoc.ReadOnly = false;

        }
        private void dataGridView1_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            if (e.RowIndex >= 0)
            {
                PreencherTextBoxes(e.RowIndex);
            }
        }

        private void button1_Click(object sender, EventArgs e)
        {

            string sql = "SELECT * FROM tblAssociacao WHERE nome_assoc LIKE @busca";
            SqlCommand cmd = new SqlCommand(sql);
            cmd.Parameters.AddWithValue("@busca", "%" + TxtFiltro.Text + "%");

            ClasseConexao con = new ClasseConexao();
            DataTable dt = con.executarSQL_Parametros(cmd);

            if (dt != null && dt.Rows.Count > 0)
            {
                txtNome.Text = dt.Rows[0]["nome_assoc"].ToString();
                txtEmail.Text = dt.Rows[0]["email_assoc"].ToString();
                txtCnpj.Text = ByteArrayToHexString((byte[])dt.Rows[0]["CNPJ_assoc"]);
                txtCertidao.Text = ByteArrayToHexString((byte[])dt.Rows[0]["certidao_assoc"]);
                txtContrato.Text = ByteArrayToHexString((byte[])dt.Rows[0]["contrato_assoc"]);
                txtInscricao.Text = ByteArrayToHexString((byte[])dt.Rows[0]["inscricao_assoc"]);
                txtAlvara.Text = ByteArrayToHexString((byte[])dt.Rows[0]["alvara_assoc"]);
                txtRegularidade.Text = ByteArrayToHexString((byte[])dt.Rows[0]["regularidade_assoc"]);
                txtRegistro.Text = ByteArrayToHexString((byte[])dt.Rows[0]["registro_assoc"]);
                txtidAssoc.Text = dt.Rows[0]["ID_associacao"].ToString();
                txtCodigoAssoc.Text = dt.Rows[0]["codigo_assoc"].ToString();
                txtsenhaAssoc.Text = dt.Rows[0]["senha_assoc"].ToString();
                txtCodigoAssoc.Text = dt.Rows[0]["codigo_assoc"].ToString();
                txtAprovadaAssoc.Text = dt.Rows[0]["aprovada_assoc"].ToString();


            }
            else
            {
                MessageBox.Show("Nenhum registro encontrado!");
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

     

        private void frmFarmaciaRev_Load(object sender, EventArgs e)
        {

            dataGridView1.CellFormatting += dataGridView1_CellFormatting;
            dataGridView1.CellClick += dataGridView1_CellClick;
            CarregarGrid();
            PreencherTextBoxes(0);
            BloquearTextBoxes();
        }

        private void BtnEditar_Click(object sender, EventArgs e)
        {
            LiberarTextBoxes();
        }

        private void BtnCancelar_Click(object sender, EventArgs e)
        {
            PreencherTextBoxes(0);
            BloquearTextBoxes();
        }

        private void BtnConcluido_Click(object sender, EventArgs e)
        {
            SqlCommand cmd = new SqlCommand(@"UPDATE tblAssociacao SET 
    nome_assoc = @Nome,
    email_assoc = @Email,
    CNPJ_assoc = @Cnpj,
    contrato_assoc = @Contrato,
    certidao_assoc = @Certidao,
    inscricao_assoc = @Inscricao,
    alvara_assoc = @Alvara,
    regularidade_assoc = @Regularidade,
    registro_assoc = @Registro,
    codigo_assoc = @Codigo,
    senha_assoc = @Senha,
    aprovada_assoc = @Aprovado
WHERE ID_associacao = @Id");

            cmd.Parameters.AddWithValue("@Nome", txtNome.Text);
            cmd.Parameters.AddWithValue("@Email", txtEmail.Text);
            cmd.Parameters.AddWithValue("@Codigo", txtCodigoAssoc.Text);
            cmd.Parameters.AddWithValue("@Senha", txtsenhaAssoc.Text);
            cmd.Parameters.AddWithValue("@Aprovado", txtAprovadaAssoc.Text);
            cmd.Parameters.AddWithValue("@Id", txtidAssoc.Text);


            cmd.Parameters.AddWithValue("@Cnpj", HexStringToByteArray(txtCnpj.Text.Replace("0x", "")));
            cmd.Parameters.AddWithValue("@Contrato", HexStringToByteArray(txtContrato.Text.Replace("0x", "")));
            cmd.Parameters.AddWithValue("@Certidao", HexStringToByteArray(txtCertidao.Text.Replace("0x", "")));
            cmd.Parameters.AddWithValue("@Alvara", HexStringToByteArray(txtAlvara.Text.Replace("0x", "")));
            cmd.Parameters.AddWithValue("@Regularidade", HexStringToByteArray(txtRegularidade.Text.Replace("0x", "")));
            cmd.Parameters.AddWithValue("@Registro", HexStringToByteArray(txtRegistro.Text.Replace("0x", "")));
            cmd.Parameters.AddWithValue("@Inscricao", HexStringToByteArray(txtInscricao.Text.Replace("0x", "")));

            conexao.manutencaoDB_Parametros(cmd);
            CarregarGrid();
            BloquearTextBoxes();

        }
    }
}
