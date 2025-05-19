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
using iTextSharp;
using iTextSharp.text;
using iTextSharp.text.pdf;
using System.IO;
using PdfiumViewer;

namespace AnygesDesktopTeste.Forms
{
    public partial class frmFarmaciaAprov : Form
    {
        ClasseConexao con = new ClasseConexao();
        PdfiumViewer.PdfViewer pdf;
        private PdfiumViewer.PdfDocument pdfDocument = null;
        private PdfViewer pdfViewer = null;

        public frmFarmaciaAprov()
        {
            InitializeComponent();
            pdf = new PdfiumViewer.PdfViewer();
            pdf.Dock = DockStyle.Fill;
            pdf.Visible = false; // invisível inicialmente
            this.Controls.Add(pdf);
        }

        private void frmFarmaciaAprov_Load(object sender, EventArgs e)
        {
            dataGridView1.CellFormatting += dataGridView1_CellFormatting;
            dataGridView1.CellClick += dataGridView1_CellClick;
            CarregarGrid();
            PreencherTextBoxes(0);
            BloquearTextBoxes();
            btnFecharPDF.Visible = false;
        }
        private void CarregarGrid()
        {


            string sql = "SELECT * FROM tblAssociacao WHERE aprovada_assoc = 'S'";

            try
            {
                DataTable dtOriginal = con.executarSQL(sql);


                string[] colunasBinarias = { "CNPJ_assoc", "contrato_assoc", "certidao_assoc", "inscricao_assoc", "alvara_assoc", "regularidade_assoc", "registro_assoc" };


                DataTable dtConvertido = new DataTable();

                foreach (DataColumn col in dtOriginal.Columns)
                {
                    if (colunasBinarias.Contains(col.ColumnName))
                        dtConvertido.Columns.Add(col.ColumnName, typeof(string));
                    else
                        dtConvertido.Columns.Add(col.ColumnName, col.DataType);
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

        private void BtnEditar_Click_1(object sender, EventArgs e)
        {
            LiberarTextBoxes();
        }

        private void BtnCancelar_Click(object sender, EventArgs e)
        {
            PreencherTextBoxes(0);
            BloquearTextBoxes();
        }

        private void BtnConcluido_Click_1(object sender, EventArgs e)
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

            con.manutencaoDB_Parametros(cmd);
            CarregarGrid();
            BloquearTextBoxes();
        }

        private void button1_Click_1(object sender, EventArgs e)
        {
            string sql = "SELECT * FROM tblAssociacao WHERE nome_assoc LIKE @busca";
            SqlCommand cmd = new SqlCommand(sql);
            cmd.Parameters.AddWithValue("@busca", "%" + TxtFiltro.Text + "%");


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
        private static void AddCellToHeader(PdfPTable tableLayout, string cellText)
        {
            tableLayout.AddCell(new PdfPCell(new Phrase(cellText, FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 8)))
            {
                HorizontalAlignment = Element.ALIGN_CENTER,
                Padding = 10,
                BackgroundColor = new iTextSharp.text.BaseColor(255, 255, 255)
            });
        }
        protected PdfPTable corpo_documento(PdfPTable tableLayout)
        {
            float[] headers = { 10, 30, 30, 20, 20, 15, 20, 20, 20, 20, 20, 20, 20 };
            tableLayout.SetWidths(headers);
            tableLayout.WidthPercentage = 100;
            tableLayout.HeaderRows = 1;

            AddCellToHeader(tableLayout, "Id");
            AddCellToHeader(tableLayout, "Nome");
            AddCellToHeader(tableLayout, "Email");
            AddCellToHeader(tableLayout, "Codigo");
            AddCellToHeader(tableLayout, "Senha");
            AddCellToHeader(tableLayout, "Aprovado");
            AddCellToHeader(tableLayout, "Cnpj");
            AddCellToHeader(tableLayout, "Contrato");
            AddCellToHeader(tableLayout, "Certidao");
            AddCellToHeader(tableLayout, "Alvara");
            AddCellToHeader(tableLayout, "Regularidade");
            AddCellToHeader(tableLayout, "Registro");
            AddCellToHeader(tableLayout, "Inscricao");

            // Corpo
            DataTable dt = con.executarSQL("SELECT * FROM tblAssociacao");

            for (int i = 0; i < dt.Rows.Count; i++)
            {

                AddCellToBody(tableLayout, dt.Rows[i]["ID_associacao"].ToString(), i);
                AddCellToBody(tableLayout, dt.Rows[i]["nome_assoc"].ToString(), i);
                AddCellToBody(tableLayout, dt.Rows[i]["email_assoc"].ToString(), i);
                AddCellToBody(tableLayout, dt.Rows[i]["codigo_assoc"].ToString(), i);
                AddCellToBody(tableLayout, dt.Rows[i]["senha_assoc"].ToString(), i);
                AddCellToBody(tableLayout, dt.Rows[i]["aprovada_assoc"].ToString(), i);

                AddCellToBody(tableLayout, ByteArrayToHexString(dt.Rows[i]["CNPJ_assoc"] as byte[]), i);
                AddCellToBody(tableLayout, ByteArrayToHexString(dt.Rows[i]["contrato_assoc"] as byte[]), i);
                AddCellToBody(tableLayout, ByteArrayToHexString(dt.Rows[i]["certidao_assoc"] as byte[]), i);
                AddCellToBody(tableLayout, ByteArrayToHexString(dt.Rows[i]["alvara_assoc"] as byte[]), i);
                AddCellToBody(tableLayout, ByteArrayToHexString(dt.Rows[i]["regularidade_assoc"] as byte[]), i);
                AddCellToBody(tableLayout, ByteArrayToHexString(dt.Rows[i]["registro_assoc"] as byte[]), i);
                AddCellToBody(tableLayout, ByteArrayToHexString(dt.Rows[i]["inscricao_assoc"] as byte[]), i);
            }

            return tableLayout;
        }
        private static void AddCellToBody(PdfPTable tableLayout, string cellText, int count) //Efeito fundo: cinza e claro
        {
            if (count % 2 == 0)
            {
                tableLayout.AddCell(new PdfPCell(new Phrase(cellText, FontFactory.GetFont(FontFactory.HELVETICA, 8, 1, iTextSharp.text.BaseColor.BLACK)))
                {
                    HorizontalAlignment = Element.ALIGN_LEFT,
                    Padding = 8,
                    BackgroundColor = new iTextSharp.text.BaseColor(255, 255, 255)
                });
            }
            else
            {
                tableLayout.AddCell(new PdfPCell(new Phrase(cellText, FontFactory.GetFont(FontFactory.HELVETICA, 8, 1, iTextSharp.text.BaseColor.BLACK)))
                {
                    HorizontalAlignment = Element.ALIGN_LEFT,
                    Padding = 8,
                    BackgroundColor = new iTextSharp.text.BaseColor(230, 230, 230)
                });
            }
        }
        private void GerarPDF_Click(object sender, EventArgs e)
        {
            SaveFileDialog saveFileDialog = new SaveFileDialog();
            saveFileDialog.Filter = "Arquivo PDF (*.pdf)|*.pdf";
            saveFileDialog.Title = "Salvar relatório em PDF";
            saveFileDialog.FileName = "RelatorioAssociacoes.pdf";

            if (saveFileDialog.ShowDialog() == DialogResult.OK)
            {
                try
                {
                    using (FileStream stream = new FileStream(saveFileDialog.FileName, FileMode.Create))
                    {
                        Document document = new Document(PageSize.A4.Rotate(), 10f, 10f, 10f, 10f);
                        PdfWriter.GetInstance(document, stream);

                        document.Open();

                        PdfPTable tableLayout = new PdfPTable(13); // 13 colunas
                        tableLayout = corpo_documento(tableLayout); // seu método que preenche o conteúdo

                        document.Add(tableLayout);
                        document.Close(); // <<< IMPORTANTE!
                        stream.Close();
                    }

                    MessageBox.Show("PDF gerado com sucesso!", "Sucesso", MessageBoxButtons.OK, MessageBoxIcon.Information);
                }
                catch (Exception ex)
                {
                    MessageBox.Show("Erro ao gerar PDF: " + ex.Message);
                }
            }
        }
        private List<Control> controlesVisiveisAntesPDF = new List<Control>();

        private void btnAbrirPDF_Click(object sender, EventArgs e)
        {
            using (OpenFileDialog ofd = new OpenFileDialog())
            {
                ofd.Filter = "Arquivos PDF (*.pdf)|*.pdf";
                if (ofd.ShowDialog() == DialogResult.OK)
                {
                    // Fecha se já existe um PDF aberto
                    if (pdfDocument != null)
                    {
                        pdfViewer.Document.Dispose();
                        pdfDocument.Dispose();
                        pdfViewer.Dispose();
                        pdfDocument = null;
                        pdfViewer = null;
                    }

                    // Salva os controles visíveis
                    controlesVisiveisAntesPDF.Clear();
                    foreach (Control ctrl in this.Controls)
                    {
                        if (ctrl.Visible && ctrl != btnFecharPDF)
                            controlesVisiveisAntesPDF.Add(ctrl);
                    }

                    // Oculta todos os controles, exceto o botão de fechar
                    foreach (Control ctrl in this.Controls)
                    {
                        if (ctrl != btnFecharPDF)
                            ctrl.Visible = false;
                    }

                    // Cria novo visualizador
                    pdfViewer = new PdfViewer();
                    pdfViewer.Name = "visualizadorPDF";
                    pdfViewer.Dock = DockStyle.Fill;

                    pdfDocument = PdfiumViewer.PdfDocument.Load(ofd.FileName);
                    pdfViewer.Document = pdfDocument;

                    this.Controls.Add(pdfViewer);
                    pdfViewer.BringToFront();

                    btnFecharPDF.Visible = true;
                    btnFecharPDF.BringToFront();
                    btnFecharPDF.FlatStyle = FlatStyle.Popup;
                    btnFecharPDF.BackColor = Color.ForestGreen;
                    btnFecharPDF.ForeColor = Color.White;
                    btnFecharPDF.Font = new System.Drawing.Font("Inria Sans", 8.25f, FontStyle.Bold);
 

                }
            }
        }

     
        
   
       

        private void btnFecharPDF_Click_1(object sender, EventArgs e)
        {

            if (pdfViewer != null)
            {
                if (pdfDocument != null)
                {
                    pdfDocument.Dispose();
                    pdfDocument = null;
                }

                this.Controls.Remove(pdfViewer);
                pdfViewer.Dispose();
                pdfViewer = null;
            }

            // Restaura controles visíveis
            foreach (Control ctrl in controlesVisiveisAntesPDF)
            {
                ctrl.Visible = true;
            }

            btnFecharPDF.Visible = false;
        }
    }
}









