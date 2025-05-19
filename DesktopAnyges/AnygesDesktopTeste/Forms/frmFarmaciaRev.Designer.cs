
namespace AnygesDesktopTeste.Forms
{
    partial class frmFarmaciaRev
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.label1 = new System.Windows.Forms.Label();
            this.TxtFiltro = new System.Windows.Forms.TextBox();
            this.button1 = new System.Windows.Forms.Button();
            this.dataGridView1 = new System.Windows.Forms.DataGridView();
            this.inscricao = new System.Windows.Forms.Panel();
            this.btnAbrirPDF = new System.Windows.Forms.Button();
            this.GerarPDF = new System.Windows.Forms.Button();
            this.BtnCancelar = new System.Windows.Forms.Button();
            this.BtnConcluido = new System.Windows.Forms.Button();
            this.BtnEditar = new System.Windows.Forms.Button();
            this.label15 = new System.Windows.Forms.Label();
            this.label14 = new System.Windows.Forms.Label();
            this.label13 = new System.Windows.Forms.Label();
            this.label12 = new System.Windows.Forms.Label();
            this.txtidAssoc = new System.Windows.Forms.TextBox();
            this.txtCodigoAssoc = new System.Windows.Forms.TextBox();
            this.txtAprovadaAssoc = new System.Windows.Forms.TextBox();
            this.txtsenhaAssoc = new System.Windows.Forms.TextBox();
            this.label11 = new System.Windows.Forms.Label();
            this.txtContrato = new System.Windows.Forms.TextBox();
            this.txtRegularidade = new System.Windows.Forms.TextBox();
            this.txtRegistro = new System.Windows.Forms.TextBox();
            this.txtInscricao = new System.Windows.Forms.TextBox();
            this.txtAlvara = new System.Windows.Forms.TextBox();
            this.txtEmail = new System.Windows.Forms.TextBox();
            this.txtCertidao = new System.Windows.Forms.TextBox();
            this.txtCnpj = new System.Windows.Forms.TextBox();
            this.txtNome = new System.Windows.Forms.TextBox();
            this.label10 = new System.Windows.Forms.Label();
            this.label9 = new System.Windows.Forms.Label();
            this.label8 = new System.Windows.Forms.Label();
            this.label7 = new System.Windows.Forms.Label();
            this.label6 = new System.Windows.Forms.Label();
            this.lblMailFarmacia = new System.Windows.Forms.Label();
            this.lblContatoFarmacia = new System.Windows.Forms.Label();
            this.lblCnpj = new System.Windows.Forms.Label();
            this.lblNome = new System.Windows.Forms.Label();
            this.label5 = new System.Windows.Forms.Label();
            this.label4 = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            ((System.ComponentModel.ISupportInitialize)(this.dataGridView1)).BeginInit();
            this.inscricao.SuspendLayout();
            this.SuspendLayout();
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("Inria Sans", 15.75F);
            this.label1.Location = new System.Drawing.Point(8, -3);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(65, 26);
            this.label1.TabIndex = 12;
            this.label1.Text = "Filtro:";
            // 
            // TxtFiltro
            // 
            this.TxtFiltro.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.TxtFiltro.Location = new System.Drawing.Point(72, 3);
            this.TxtFiltro.Name = "TxtFiltro";
            this.TxtFiltro.Size = new System.Drawing.Size(355, 20);
            this.TxtFiltro.TabIndex = 11;
            // 
            // button1
            // 
            this.button1.BackColor = System.Drawing.Color.ForestGreen;
            this.button1.Font = new System.Drawing.Font("Inria Sans", 8.25F, System.Drawing.FontStyle.Bold);
            this.button1.Location = new System.Drawing.Point(433, 1);
            this.button1.Name = "button1";
            this.button1.Size = new System.Drawing.Size(93, 27);
            this.button1.TabIndex = 13;
            this.button1.Text = "Pesquisar 🔍";
            this.button1.UseVisualStyleBackColor = false;
            this.button1.Click += new System.EventHandler(this.button1_Click);
            // 
            // dataGridView1
            // 
            this.dataGridView1.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dataGridView1.Location = new System.Drawing.Point(433, 31);
            this.dataGridView1.Name = "dataGridView1";
            this.dataGridView1.Size = new System.Drawing.Size(355, 404);
            this.dataGridView1.TabIndex = 20;
            // 
            // inscricao
            // 
            this.inscricao.AutoScroll = true;
            this.inscricao.Controls.Add(this.btnAbrirPDF);
            this.inscricao.Controls.Add(this.GerarPDF);
            this.inscricao.Controls.Add(this.BtnCancelar);
            this.inscricao.Controls.Add(this.BtnConcluido);
            this.inscricao.Controls.Add(this.BtnEditar);
            this.inscricao.Controls.Add(this.label15);
            this.inscricao.Controls.Add(this.label14);
            this.inscricao.Controls.Add(this.label13);
            this.inscricao.Controls.Add(this.label12);
            this.inscricao.Controls.Add(this.txtidAssoc);
            this.inscricao.Controls.Add(this.txtCodigoAssoc);
            this.inscricao.Controls.Add(this.txtAprovadaAssoc);
            this.inscricao.Controls.Add(this.txtsenhaAssoc);
            this.inscricao.Controls.Add(this.label11);
            this.inscricao.Controls.Add(this.txtContrato);
            this.inscricao.Controls.Add(this.txtRegularidade);
            this.inscricao.Controls.Add(this.txtRegistro);
            this.inscricao.Controls.Add(this.txtInscricao);
            this.inscricao.Controls.Add(this.txtAlvara);
            this.inscricao.Controls.Add(this.txtEmail);
            this.inscricao.Controls.Add(this.txtCertidao);
            this.inscricao.Controls.Add(this.txtCnpj);
            this.inscricao.Controls.Add(this.txtNome);
            this.inscricao.Controls.Add(this.label10);
            this.inscricao.Controls.Add(this.label9);
            this.inscricao.Controls.Add(this.label8);
            this.inscricao.Controls.Add(this.label7);
            this.inscricao.Controls.Add(this.label6);
            this.inscricao.Controls.Add(this.lblMailFarmacia);
            this.inscricao.Controls.Add(this.lblContatoFarmacia);
            this.inscricao.Controls.Add(this.lblCnpj);
            this.inscricao.Controls.Add(this.lblNome);
            this.inscricao.Controls.Add(this.label5);
            this.inscricao.Controls.Add(this.label4);
            this.inscricao.Controls.Add(this.label3);
            this.inscricao.Controls.Add(this.label2);
            this.inscricao.Location = new System.Drawing.Point(6, 31);
            this.inscricao.Name = "inscricao";
            this.inscricao.Size = new System.Drawing.Size(421, 404);
            this.inscricao.TabIndex = 21;
            // 
            // btnAbrirPDF
            // 
            this.btnAbrirPDF.BackColor = System.Drawing.Color.ForestGreen;
            this.btnAbrirPDF.Font = new System.Drawing.Font("Inria Sans", 8.25F, System.Drawing.FontStyle.Bold);
            this.btnAbrirPDF.Location = new System.Drawing.Point(207, 368);
            this.btnAbrirPDF.Name = "btnAbrirPDF";
            this.btnAbrirPDF.Size = new System.Drawing.Size(136, 33);
            this.btnAbrirPDF.TabIndex = 38;
            this.btnAbrirPDF.Text = "Abrir Relatorio";
            this.btnAbrirPDF.UseVisualStyleBackColor = false;
            // 
            // GerarPDF
            // 
            this.GerarPDF.BackColor = System.Drawing.Color.ForestGreen;
            this.GerarPDF.Font = new System.Drawing.Font("Inria Sans", 8.25F, System.Drawing.FontStyle.Bold);
            this.GerarPDF.Location = new System.Drawing.Point(65, 368);
            this.GerarPDF.Name = "GerarPDF";
            this.GerarPDF.Size = new System.Drawing.Size(136, 33);
            this.GerarPDF.TabIndex = 37;
            this.GerarPDF.Text = "Gerar Relatorio";
            this.GerarPDF.UseVisualStyleBackColor = false;
            // 
            // BtnCancelar
            // 
            this.BtnCancelar.BackColor = System.Drawing.Color.ForestGreen;
            this.BtnCancelar.Font = new System.Drawing.Font("Inria Sans", 8.25F, System.Drawing.FontStyle.Bold);
            this.BtnCancelar.Location = new System.Drawing.Point(285, 335);
            this.BtnCancelar.Name = "BtnCancelar";
            this.BtnCancelar.Size = new System.Drawing.Size(136, 33);
            this.BtnCancelar.TabIndex = 34;
            this.BtnCancelar.Text = "Cancelar";
            this.BtnCancelar.UseVisualStyleBackColor = false;
            this.BtnCancelar.Click += new System.EventHandler(this.BtnCancelar_Click);
            // 
            // BtnConcluido
            // 
            this.BtnConcluido.BackColor = System.Drawing.Color.ForestGreen;
            this.BtnConcluido.Font = new System.Drawing.Font("Inria Sans", 8.25F, System.Drawing.FontStyle.Bold);
            this.BtnConcluido.Location = new System.Drawing.Point(146, 335);
            this.BtnConcluido.Name = "BtnConcluido";
            this.BtnConcluido.Size = new System.Drawing.Size(136, 33);
            this.BtnConcluido.TabIndex = 33;
            this.BtnConcluido.Text = "Concluir";
            this.BtnConcluido.UseVisualStyleBackColor = false;
            this.BtnConcluido.Click += new System.EventHandler(this.BtnConcluido_Click);
            // 
            // BtnEditar
            // 
            this.BtnEditar.BackColor = System.Drawing.Color.ForestGreen;
            this.BtnEditar.Font = new System.Drawing.Font("Inria Sans", 8.25F, System.Drawing.FontStyle.Bold);
            this.BtnEditar.Location = new System.Drawing.Point(7, 335);
            this.BtnEditar.Name = "BtnEditar";
            this.BtnEditar.Size = new System.Drawing.Size(136, 33);
            this.BtnEditar.TabIndex = 32;
            this.BtnEditar.Text = "Editar Dados";
            this.BtnEditar.UseVisualStyleBackColor = false;
            this.BtnEditar.Click += new System.EventHandler(this.BtnEditar_Click);
            // 
            // label15
            // 
            this.label15.AutoSize = true;
            this.label15.Font = new System.Drawing.Font("Inria Sans", 14.25F);
            this.label15.Location = new System.Drawing.Point(102, 47);
            this.label15.Name = "label15";
            this.label15.Size = new System.Drawing.Size(70, 24);
            this.label15.TabIndex = 31;
            this.label15.Text = "Código:";
            // 
            // label14
            // 
            this.label14.AutoSize = true;
            this.label14.Font = new System.Drawing.Font("Inria Sans", 14.25F);
            this.label14.Location = new System.Drawing.Point(107, 72);
            this.label14.Name = "label14";
            this.label14.Size = new System.Drawing.Size(65, 24);
            this.label14.TabIndex = 30;
            this.label14.Text = "Senha:";
            // 
            // label13
            // 
            this.label13.AutoSize = true;
            this.label13.Font = new System.Drawing.Font("Inria Sans", 14.25F);
            this.label13.Location = new System.Drawing.Point(78, 295);
            this.label13.Name = "label13";
            this.label13.Size = new System.Drawing.Size(91, 24);
            this.label13.TabIndex = 29;
            this.label13.Text = "Aprovada:";
            // 
            // label12
            // 
            this.label12.AutoSize = true;
            this.label12.Font = new System.Drawing.Font("Inria Sans", 14.25F);
            this.label12.Location = new System.Drawing.Point(137, 0);
            this.label12.Name = "label12";
            this.label12.Size = new System.Drawing.Size(32, 24);
            this.label12.TabIndex = 28;
            this.label12.Text = "ID:";
            // 
            // txtidAssoc
            // 
            this.txtidAssoc.BackColor = System.Drawing.SystemColors.ControlLightLight;
            this.txtidAssoc.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.txtidAssoc.Location = new System.Drawing.Point(187, 8);
            this.txtidAssoc.Name = "txtidAssoc";
            this.txtidAssoc.ReadOnly = true;
            this.txtidAssoc.Size = new System.Drawing.Size(212, 13);
            this.txtidAssoc.TabIndex = 27;
            // 
            // txtCodigoAssoc
            // 
            this.txtCodigoAssoc.BackColor = System.Drawing.SystemColors.ControlLightLight;
            this.txtCodigoAssoc.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.txtCodigoAssoc.Location = new System.Drawing.Point(187, 55);
            this.txtCodigoAssoc.Name = "txtCodigoAssoc";
            this.txtCodigoAssoc.ReadOnly = true;
            this.txtCodigoAssoc.Size = new System.Drawing.Size(212, 13);
            this.txtCodigoAssoc.TabIndex = 26;
            // 
            // txtAprovadaAssoc
            // 
            this.txtAprovadaAssoc.BackColor = System.Drawing.SystemColors.ControlLightLight;
            this.txtAprovadaAssoc.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.txtAprovadaAssoc.Location = new System.Drawing.Point(187, 303);
            this.txtAprovadaAssoc.Name = "txtAprovadaAssoc";
            this.txtAprovadaAssoc.ReadOnly = true;
            this.txtAprovadaAssoc.Size = new System.Drawing.Size(212, 13);
            this.txtAprovadaAssoc.TabIndex = 25;
            // 
            // txtsenhaAssoc
            // 
            this.txtsenhaAssoc.BackColor = System.Drawing.SystemColors.ControlLightLight;
            this.txtsenhaAssoc.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.txtsenhaAssoc.Location = new System.Drawing.Point(187, 80);
            this.txtsenhaAssoc.Name = "txtsenhaAssoc";
            this.txtsenhaAssoc.ReadOnly = true;
            this.txtsenhaAssoc.Size = new System.Drawing.Size(212, 13);
            this.txtsenhaAssoc.TabIndex = 24;
            // 
            // label11
            // 
            this.label11.AutoSize = true;
            this.label11.Font = new System.Drawing.Font("Inria Sans", 14.25F);
            this.label11.Location = new System.Drawing.Point(87, 269);
            this.label11.Name = "label11";
            this.label11.Size = new System.Drawing.Size(82, 24);
            this.label11.TabIndex = 23;
            this.label11.Text = "Registro:";
            // 
            // txtContrato
            // 
            this.txtContrato.BackColor = System.Drawing.SystemColors.ControlLightLight;
            this.txtContrato.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.txtContrato.Location = new System.Drawing.Point(187, 181);
            this.txtContrato.Name = "txtContrato";
            this.txtContrato.ReadOnly = true;
            this.txtContrato.Size = new System.Drawing.Size(212, 13);
            this.txtContrato.TabIndex = 22;
            // 
            // txtRegularidade
            // 
            this.txtRegularidade.BackColor = System.Drawing.SystemColors.ControlLightLight;
            this.txtRegularidade.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.txtRegularidade.Location = new System.Drawing.Point(187, 253);
            this.txtRegularidade.Name = "txtRegularidade";
            this.txtRegularidade.ReadOnly = true;
            this.txtRegularidade.Size = new System.Drawing.Size(212, 13);
            this.txtRegularidade.TabIndex = 21;
            // 
            // txtRegistro
            // 
            this.txtRegistro.BackColor = System.Drawing.SystemColors.ControlLightLight;
            this.txtRegistro.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.txtRegistro.Location = new System.Drawing.Point(187, 277);
            this.txtRegistro.Name = "txtRegistro";
            this.txtRegistro.ReadOnly = true;
            this.txtRegistro.Size = new System.Drawing.Size(212, 13);
            this.txtRegistro.TabIndex = 20;
            // 
            // txtInscricao
            // 
            this.txtInscricao.BackColor = System.Drawing.SystemColors.ControlLightLight;
            this.txtInscricao.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.txtInscricao.Location = new System.Drawing.Point(187, 204);
            this.txtInscricao.Name = "txtInscricao";
            this.txtInscricao.ReadOnly = true;
            this.txtInscricao.Size = new System.Drawing.Size(212, 13);
            this.txtInscricao.TabIndex = 19;
            // 
            // txtAlvara
            // 
            this.txtAlvara.BackColor = System.Drawing.SystemColors.ControlLightLight;
            this.txtAlvara.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.txtAlvara.Location = new System.Drawing.Point(187, 229);
            this.txtAlvara.Name = "txtAlvara";
            this.txtAlvara.ReadOnly = true;
            this.txtAlvara.Size = new System.Drawing.Size(212, 13);
            this.txtAlvara.TabIndex = 18;
            // 
            // txtEmail
            // 
            this.txtEmail.BackColor = System.Drawing.SystemColors.ControlLightLight;
            this.txtEmail.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.txtEmail.Location = new System.Drawing.Point(187, 157);
            this.txtEmail.Name = "txtEmail";
            this.txtEmail.ReadOnly = true;
            this.txtEmail.Size = new System.Drawing.Size(212, 13);
            this.txtEmail.TabIndex = 17;
            // 
            // txtCertidao
            // 
            this.txtCertidao.BackColor = System.Drawing.SystemColors.ControlLightLight;
            this.txtCertidao.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.txtCertidao.Location = new System.Drawing.Point(187, 133);
            this.txtCertidao.Name = "txtCertidao";
            this.txtCertidao.ReadOnly = true;
            this.txtCertidao.Size = new System.Drawing.Size(212, 13);
            this.txtCertidao.TabIndex = 16;
            // 
            // txtCnpj
            // 
            this.txtCnpj.BackColor = System.Drawing.SystemColors.ControlLightLight;
            this.txtCnpj.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.txtCnpj.Location = new System.Drawing.Point(187, 104);
            this.txtCnpj.Name = "txtCnpj";
            this.txtCnpj.ReadOnly = true;
            this.txtCnpj.Size = new System.Drawing.Size(212, 13);
            this.txtCnpj.TabIndex = 15;
            // 
            // txtNome
            // 
            this.txtNome.BackColor = System.Drawing.SystemColors.ControlLightLight;
            this.txtNome.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.txtNome.Location = new System.Drawing.Point(187, 32);
            this.txtNome.Name = "txtNome";
            this.txtNome.ReadOnly = true;
            this.txtNome.Size = new System.Drawing.Size(212, 13);
            this.txtNome.TabIndex = 14;
            // 
            // label10
            // 
            this.label10.AutoSize = true;
            this.label10.Font = new System.Drawing.Font("Inria Sans", 14.25F);
            this.label10.Location = new System.Drawing.Point(46, 245);
            this.label10.Name = "label10";
            this.label10.Size = new System.Drawing.Size(123, 24);
            this.label10.TabIndex = 12;
            this.label10.Text = "Regularidade:";
            // 
            // label9
            // 
            this.label9.AutoSize = true;
            this.label9.Font = new System.Drawing.Font("Inria Sans", 14.25F);
            this.label9.Location = new System.Drawing.Point(105, 221);
            this.label9.Name = "label9";
            this.label9.Size = new System.Drawing.Size(64, 24);
            this.label9.TabIndex = 11;
            this.label9.Text = "Alvara:";
            // 
            // label8
            // 
            this.label8.AutoSize = true;
            this.label8.Font = new System.Drawing.Font("Inria Sans", 14.25F);
            this.label8.Location = new System.Drawing.Point(92, 197);
            this.label8.Name = "label8";
            this.label8.Size = new System.Drawing.Size(80, 24);
            this.label8.TabIndex = 10;
            this.label8.Text = "Incrição:";
            // 
            // label7
            // 
            this.label7.AutoSize = true;
            this.label7.Font = new System.Drawing.Font("Inria Sans", 14.25F);
            this.label7.Location = new System.Drawing.Point(87, 173);
            this.label7.Name = "label7";
            this.label7.Size = new System.Drawing.Size(85, 24);
            this.label7.TabIndex = 9;
            this.label7.Text = "Contrato:";
            // 
            // label6
            // 
            this.label6.AutoSize = true;
            this.label6.Font = new System.Drawing.Font("Inria Sans", 14.25F);
            this.label6.Location = new System.Drawing.Point(95, 125);
            this.label6.Name = "label6";
            this.label6.Size = new System.Drawing.Size(83, 24);
            this.label6.TabIndex = 8;
            this.label6.Text = "Certidão:";
            // 
            // lblMailFarmacia
            // 
            this.lblMailFarmacia.AutoSize = true;
            this.lblMailFarmacia.Location = new System.Drawing.Point(143, 133);
            this.lblMailFarmacia.Name = "lblMailFarmacia";
            this.lblMailFarmacia.Size = new System.Drawing.Size(0, 13);
            this.lblMailFarmacia.TabIndex = 7;
            // 
            // lblContatoFarmacia
            // 
            this.lblContatoFarmacia.AutoSize = true;
            this.lblContatoFarmacia.Location = new System.Drawing.Point(143, 93);
            this.lblContatoFarmacia.Name = "lblContatoFarmacia";
            this.lblContatoFarmacia.Size = new System.Drawing.Size(0, 13);
            this.lblContatoFarmacia.TabIndex = 6;
            // 
            // lblCnpj
            // 
            this.lblCnpj.AutoSize = true;
            this.lblCnpj.Location = new System.Drawing.Point(143, 59);
            this.lblCnpj.Name = "lblCnpj";
            this.lblCnpj.Size = new System.Drawing.Size(0, 13);
            this.lblCnpj.TabIndex = 5;
            // 
            // lblNome
            // 
            this.lblNome.AutoSize = true;
            this.lblNome.Location = new System.Drawing.Point(143, 17);
            this.lblNome.Name = "lblNome";
            this.lblNome.Size = new System.Drawing.Size(0, 13);
            this.lblNome.TabIndex = 4;
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Font = new System.Drawing.Font("Inria Sans", 14.25F);
            this.label5.Location = new System.Drawing.Point(105, 149);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(67, 24);
            this.label5.TabIndex = 3;
            this.label5.Text = "E-mail:";
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(39, 93);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(0, 13);
            this.label4.TabIndex = 2;
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Font = new System.Drawing.Font("Inria Sans", 14.25F);
            this.label3.Location = new System.Drawing.Point(118, 96);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(54, 24);
            this.label3.TabIndex = 1;
            this.label3.Text = "CNPJ:";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Font = new System.Drawing.Font("Inria Sans", 14.25F);
            this.label2.Location = new System.Drawing.Point(10, 24);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(164, 24);
            this.label2.TabIndex = 0;
            this.label2.Text = "Nome da Empresa:";
            // 
            // frmFarmaciaRev
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(800, 450);
            this.Controls.Add(this.inscricao);
            this.Controls.Add(this.dataGridView1);
            this.Controls.Add(this.button1);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.TxtFiltro);
            this.Name = "frmFarmaciaRev";
            this.Text = "Farmácias em Revisão";
            this.Load += new System.EventHandler(this.frmFarmaciaRev_Load);
            ((System.ComponentModel.ISupportInitialize)(this.dataGridView1)).EndInit();
            this.inscricao.ResumeLayout(false);
            this.inscricao.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.TextBox TxtFiltro;
        private System.Windows.Forms.Button button1;
        private System.Windows.Forms.DataGridView dataGridView1;
        private System.Windows.Forms.Panel inscricao;
        private System.Windows.Forms.Button BtnCancelar;
        private System.Windows.Forms.Button BtnConcluido;
        private System.Windows.Forms.Button BtnEditar;
        private System.Windows.Forms.Label label15;
        private System.Windows.Forms.Label label14;
        private System.Windows.Forms.Label label13;
        private System.Windows.Forms.Label label12;
        private System.Windows.Forms.TextBox txtidAssoc;
        private System.Windows.Forms.TextBox txtCodigoAssoc;
        private System.Windows.Forms.TextBox txtAprovadaAssoc;
        private System.Windows.Forms.TextBox txtsenhaAssoc;
        private System.Windows.Forms.Label label11;
        private System.Windows.Forms.TextBox txtContrato;
        private System.Windows.Forms.TextBox txtRegularidade;
        private System.Windows.Forms.TextBox txtRegistro;
        private System.Windows.Forms.TextBox txtInscricao;
        private System.Windows.Forms.TextBox txtAlvara;
        private System.Windows.Forms.TextBox txtEmail;
        private System.Windows.Forms.TextBox txtCertidao;
        private System.Windows.Forms.TextBox txtCnpj;
        private System.Windows.Forms.TextBox txtNome;
        private System.Windows.Forms.Label label10;
        private System.Windows.Forms.Label label9;
        private System.Windows.Forms.Label label8;
        private System.Windows.Forms.Label label7;
        private System.Windows.Forms.Label label6;
        private System.Windows.Forms.Label lblMailFarmacia;
        private System.Windows.Forms.Label lblContatoFarmacia;
        private System.Windows.Forms.Label lblCnpj;
        private System.Windows.Forms.Label lblNome;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Button btnAbrirPDF;
        private System.Windows.Forms.Button GerarPDF;
    }
}