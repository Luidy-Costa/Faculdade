const Controller = {
    userProfile: null,

    init() {
        // Verifica se já estava logado (opcional)
        // Por enquanto, força login sempre que recarrega
    },

    // --- Login ---
    login() {
        const input = View.getLoginInput();
        try {
            this.userProfile = Service.autenticar(input.user, input.pass);
            View.mostrarApp(this.userProfile.nome, this.userProfile.tipo);
            this.atualizarTodosDados();
        } catch (erro) {
            View.notify(erro.message);
        }
    },

    logout() {
        location.reload();
    },

    navegar(tela) {
        View.mostrarTela(tela);
        if (tela === 'agenda') {
            this.carregarSelectPacientes();
        }
    },

    // --- Pacientes ---
    salvarPaciente() {
        const input = View.getPacienteInput();
        try {
            const msg = Service.salvarPaciente(input.id, input, this.userProfile);
            View.notify(msg);
            View.limparFormPaciente();
            this.atualizarPacientes();
            this.atualizarDashboard();
        } catch (erro) {
            View.notify(erro.message);
        }
    },

    prepararEdicaoPaciente(index) {
        const paciente = Service.buscarPaciente(index);
        View.preencherFormPaciente(index, paciente);
    },

    cancelarEdicaoPaciente() {
        View.limparFormPaciente();
    },

    deletarPaciente(index) {
        if (confirm("Tem a certeza que deseja excluir?")) {
            Service.deletarPaciente(index);
            this.atualizarPacientes();
            this.atualizarDashboard();
        }
    },

    atualizarPacientes() {
        const lista = Service.listarPacientes();
        const isAdmin = this.userProfile.tipo === 'admin';
        View.renderPacientes(lista, isAdmin);
    },

    // --- Agenda ---
    carregarSelectPacientes() {
        const lista = Service.listarPacientes();
        View.renderSelectPacientes(lista);
    },

    agendar() {
        const input = View.getAgendaInput();
        try {
            const msg = Service.agendar(input.pacienteIndex, input.dentista, input.data, input.hora);
            View.notify(msg);
            this.atualizarAgenda();
            this.atualizarDashboard();
        } catch (erro) {
            View.notify(erro.message);
        }
    },

    cancelarAgenda(index) {
        if (confirm("Cancelar este agendamento?")) {
            Service.cancelarAgendamento(index);
            this.atualizarAgenda();
            this.atualizarDashboard();
        }
    },

    atualizarAgenda() {
        const lista = Service.listarAgenda();
        View.renderAgenda(lista);
    },

    // --- Financeiro ---
    lancarFinanceiro() {
        const input = View.getFinanceiroInput();
        try {
            const msg = Service.lancarFinanceiro(input.desc, input.valor, input.data, input.forma, input.status);
            View.notify(msg);
            View.limparFormFinanceiro();
            this.atualizarFinanceiro();
            this.atualizarDashboard();
        } catch (erro) {
            View.notify(erro.message);
        }
    },

    atualizarFinanceiro() {
        if (this.userProfile.tipo !== 'admin') return;
        const lista = Service.listarFinanceiro();
        View.renderFinanceiro(lista);
    },

    // --- Geral ---
    atualizarDashboard() {
        const dados = Service.getDadosDashboard();
        View.updateDashboard(dados);
    },

    atualizarTodosDados() {
        this.atualizarPacientes();
        this.atualizarAgenda();
        this.atualizarFinanceiro();
        this.atualizarDashboard();
        this.carregarSelectPacientes();
    }
};