const View = {
    // Utilitários de Navegação e UI
    mostrarTela(telaId) {
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
        
        document.getElementById(`view-${telaId}`).classList.add('active');
        
        const btn = document.getElementById(`nav-${telaId}`);
        if(btn) btn.classList.add('active');
    },

    mostrarLogin() {
        document.getElementById('tela-login').style.display = 'flex';
        document.getElementById('app-principal').style.display = 'none';
    },

    mostrarApp(nomeUsuario, tipoUsuario) {
        document.getElementById('tela-login').style.display = 'none';
        document.getElementById('app-principal').style.display = 'flex';
        document.getElementById('welcome-msg').innerText = `Bem-vindo, ${nomeUsuario}`;

        // Controle de acesso visual
        if(tipoUsuario === 'sec') {
            document.getElementById('nav-financeiro').style.display = 'none';
        }
    },

    notify(msg) {
        const t = document.getElementById('toast');
        t.innerText = msg; 
        t.className = "show";
        setTimeout(() => t.className = t.className.replace("show", ""), 3000);
    },

    // --- Inputs Getters ---
    getLoginInput() {
        return {
            user: document.getElementById('login-user').value,
            pass: document.getElementById('login-pass').value
        };
    },

    getPacienteInput() {
        return {
            id: document.getElementById('pac-id').value,
            nome: document.getElementById('pac-nome').value,
            cpf: document.getElementById('pac-cpf').value,
            tel: document.getElementById('pac-tel').value,
            hist: document.getElementById('pac-historico').value
        };
    },

    getAgendaInput() {
        return {
            pacienteIndex: document.getElementById('ag-paciente-select').value,
            dentista: document.getElementById('ag-dentista-select').value,
            data: document.getElementById('ag-data').value,
            hora: document.getElementById('ag-hora').value
        };
    },

    getFinanceiroInput() {
        return {
            desc: document.getElementById('fin-desc').value,
            valor: document.getElementById('fin-valor').value,
            data: document.getElementById('fin-data').value,
            forma: document.getElementById('fin-forma').value,
            status: document.getElementById('fin-status').value
        };
    },

    // --- Renders (Saída de Dados) ---
    limparFormPaciente() {
        document.getElementById('pac-id').value = "";
        document.getElementById('pac-nome').value = "";
        document.getElementById('pac-cpf').value = "";
        document.getElementById('pac-tel').value = "";
        document.getElementById('pac-historico').value = "";
        
        document.getElementById('titulo-form-paciente').innerText = "Novo Paciente";
        const btn = document.getElementById('btn-salvar-pac');
        btn.innerText = "Registar";
        btn.className = "btn btn-success";
        document.getElementById('btn-cancelar-pac').style.display = "none";
    },

    preencherFormPaciente(index, paciente) {
        document.getElementById('pac-id').value = index;
        document.getElementById('pac-nome').value = paciente.nome;
        document.getElementById('pac-cpf').value = paciente.cpf;
        document.getElementById('pac-tel').value = paciente.tel;
        document.getElementById('pac-historico').value = paciente.hist;

        document.getElementById('titulo-form-paciente').innerText = "A editar: " + paciente.nome;
        const btn = document.getElementById('btn-salvar-pac');
        btn.innerText = "Guardar Alterações";
        btn.className = "btn btn-warning";
        document.getElementById('btn-cancelar-pac').style.display = "inline-block";
        window.scrollTo(0,0);
    },

    renderPacientes(lista, usuarioAdmin) {
        const tbody = document.getElementById('lista-pacientes');
        tbody.innerHTML = "";
        
        lista.forEach((p, i) => {
            tbody.innerHTML += `
                <tr>
                    <td>${p.nome}</td>
                    <td>${p.cpf}</td>
                    <td>${p.tel}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="Controller.prepararEdicaoPaciente(${i})">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="Controller.deletarPaciente(${i})">Eliminar</button>
                    </td>
                </tr>
            `;
        });
    },

    renderAgenda(lista) {
        const tbody = document.getElementById('lista-agenda');
        tbody.innerHTML = "";

        lista.forEach((a, i) => {
            const dataPt = a.data.split('-').reverse().join('/');
            const dentistaInfo = a.dentista ? `<br><small style="color:gray">${a.dentista}</small>` : '';

            tbody.innerHTML += `
                <tr>
                    <td>${dataPt}</td>
                    <td>${a.hora}</td>
                    <td>${a.nome}${dentistaInfo}</td>
                    <td><span class="badge bg-info" style="background:#0dcaf0">${a.status}</span></td>
                    <td><button class="btn btn-danger btn-sm" onclick="Controller.cancelarAgenda(${i})">X</button></td>
                </tr>
            `;
        });
    },

    renderSelectPacientes(lista) {
        const sel = document.getElementById('ag-paciente-select');
        sel.innerHTML = '<option value="">Selecione...</option>';
        lista.forEach((p, i) => sel.innerHTML += `<option value="${i}">${p.nome} (${p.cpf})</option>`);
    },

    renderFinanceiro(lista) {
        const tbody = document.getElementById('lista-financeiro');
        let totalDisplay = 0;
        tbody.innerHTML = "";

        lista.forEach(f => {
            if(f.status === 'Pago') totalDisplay += parseFloat(f.valor);
            const dataPt = f.data.split('-').reverse().join('/');
            const classBadge = f.status === 'Pago' ? 'bg-pago' : 'bg-pendente';
            
            tbody.innerHTML += `
                <tr>
                    <td>${dataPt}</td>
                    <td>${f.desc}</td>
                    <td>${f.forma}</td>
                    <td>R$ ${parseFloat(f.valor).toFixed(2)}</td>
                    <td><span class="badge ${classBadge}">${f.status}</span></td>
                </tr>
            `;
        });
        document.getElementById('fin-total-display').innerText = `R$ ${totalDisplay.toFixed(2)}`;
    },

    limparFormFinanceiro() {
        document.getElementById('fin-desc').value = "";
        document.getElementById('fin-valor').value = "";
    },

    updateDashboard(dados) {
        document.getElementById('dash-pacientes').innerText = dados.totalPacientes;
        document.getElementById('dash-hoje').innerText = dados.consultasHoje;
        document.getElementById('dash-caixa').innerText = `R$ ${dados.caixaTotal.toFixed(2)}`;
    }
};