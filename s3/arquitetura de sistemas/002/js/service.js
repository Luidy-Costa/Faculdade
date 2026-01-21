const Service = {
    // --- Autenticação ---
    autenticar(usuario, senha) {
        // Usuários "Hardcoded" para teste
        const usuariosDB = {
            'user1': { nome: 'Dr. Ricardo', tipo: 'admin' },
            'user2': { nome: 'Dra. Ana', tipo: 'admin' },
            'user3': { nome: 'Dr. Carlos', tipo: 'admin' },
            'sec': { nome: 'Secretária', tipo: 'sec' }
        };

        if (usuariosDB[usuario] && senha === '123') {
            return usuariosDB[usuario];
        }
        throw new Error("Usuário ou senha incorretos!");
    },

    // --- Pacientes ---
    listarPacientes() {
        return DAO.get('pacientes');
    },

    buscarPaciente(index) {
        const list = DAO.get('pacientes');
        return list[index];
    },

    salvarPaciente(index, dados, usuarioLogado) {
        // 1. Validação (Regra de Negócio)
        if (!dados.nome || !dados.cpf) {
            throw new Error("Nome e CPF são obrigatórios!");
        }

        // 2. Auditoria (Quem fez?)
        const dadosCompletos = {
            ...dados,
            editadoPor: usuarioLogado.nome,
            dataEdicao: new Date().toISOString()
        };

        if (index === "" || index === null) {
            DAO.add('pacientes', dadosCompletos);
            return "Paciente cadastrado com sucesso!";
        } else {
            DAO.update('pacientes', parseInt(index), dadosCompletos);
            return "Paciente atualizado com sucesso!";
        }
    },

    deletarPaciente(index) {
        DAO.remove('pacientes', index);
    },

    // --- Agenda ---
    listarAgenda() {
        const list = DAO.get('agenda');
        // Ordena por Data/Hora
        return list.sort((a,b) => new Date(a.data + 'T' + a.hora) - new Date(b.data + 'T' + b.hora));
    },

    agendar(pacienteIndex, dentista, data, hora) {
        if (pacienteIndex === "" || !data || !hora || !dentista) {
            throw new Error("Preencha todos os campos do agendamento!");
        }

        // Busca nome do paciente para facilitar exibição
        const listaPacientes = this.listarPacientes();
        const paciente = listaPacientes[pacienteIndex];

        const agendamento = {
            nome: paciente.nome,
            dentista, data, hora,
            status: 'Agendado'
        };
        
        DAO.add('agenda', agendamento);
        return "Agendado com sucesso!";
    },

    cancelarAgendamento(index) {
        DAO.remove('agenda', index);
    },

    // --- Financeiro ---
    listarFinanceiro() {
        return DAO.get('financeiro');
    },

    lancarFinanceiro(desc, valorStr, data, forma, status) {
        const valor = parseFloat(valorStr);
        if (!desc || isNaN(valor) || !data) {
            throw new Error("Verifique os dados financeiros.");
        }
        
        const lancamento = { desc, valor, data, forma, status };
        DAO.add('financeiro', lancamento);
        return "Lançamento financeiro registrado!";
    },

    // --- Dashboard ---
    getDadosDashboard() {
        const pac = DAO.get('pacientes').length;
        const fin = DAO.get('financeiro');
        const age = DAO.get('agenda');
        const hoje = new Date().toISOString().split('T')[0];

        const totalCaixa = fin
            .filter(i => i.status === 'Pago')
            .reduce((total, item) => total + item.valor, 0);

        const consultasHoje = age
            .filter(a => a.data === hoje).length;

        return {
            totalPacientes: pac,
            consultasHoje: consultasHoje,
            caixaTotal: totalCaixa
        };
    }
};