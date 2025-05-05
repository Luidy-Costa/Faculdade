/**
 * Sistema Bancário
 * Autor: [Seu Nome]
 * Data: [Data]
 * 
 * Este sistema permite gerenciar contas bancárias (corrente e poupança) com operações como:
 * criação, consulta, remoção, crédito, débito, transferência e aplicação de juros.
 */

// Variáveis globais
let accounts = JSON.parse(localStorage.getItem('bankAccounts')) || []; // Array para armazenar as contas
let nextAccountNumber = accounts.length > 0 ? Math.max(...accounts.map(acc => acc.number)) + 1 : 1; // Contador para números de conta
let loggedIn = false; // Estado de login

// Dados de usuário válido (simulando autenticação)
const validUser = {
    username: "admin",
    password: "1234"
};

/**
 * Função para alternar entre telas
 * @param {string} screenId - ID da tela a ser mostrada
 */
function showScreen(screenId) {
    // Esconde todas as telas
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Mostra a tela solicitada
    document.getElementById(screenId).classList.add('active');
}

/**
 * Função para fazer logout
 */
function logout() {
    loggedIn = false;
    window.location.href = 'index.html';
}

/**
 * Salva as contas no localStorage
 */
function saveAccounts() {
    localStorage.setItem('bankAccounts', JSON.stringify(accounts));
}

/**
 * Classe que representa uma conta bancária
 */
class BankAccount {
    /**
     * Construtor da classe BankAccount
     * @param {string} type - Tipo da conta (CORRENTE ou POUPANCA)
     * @param {string} agency - Agência da conta
     * @param {string} holderName - Nome do titular
     * @param {string} holderCpf - CPF do titular
     * @param {string} holderAddress - Endereço do titular
     * @param {string} holderPhone - Telefone do titular
     * @param {number} balance - Saldo inicial
     */
    constructor(type, agency, holderName, holderCpf, holderAddress, holderPhone, balance = 0) {
        this.number = nextAccountNumber++;
        this.type = type;
        this.agency = agency;
        this.balance = balance;
        this.holder = {
            name: holderName,
            cpf: holderCpf,
            address: holderAddress,
            phone: holderPhone
        };
    }
    
    /**
     * Credita um valor na conta
     * @param {number} amount - Valor a ser creditado
     */
    credit(amount) {
        if (amount > 0) {
            this.balance += amount;
            saveAccounts();
            return true;
        }
        return false;
    }
    
    /**
     * Debita um valor da conta
     * @param {number} amount - Valor a ser debitado
     */
    debit(amount) {
        if (amount > 0 && this.balance >= amount) {
            this.balance -= amount;
            saveAccounts();
            return true;
        }
        return false;
    }
    
    /**
     * Aplica juros na conta (apenas para poupança)
     * @param {number} rate - Taxa de juros em porcentagem
     */
    applyInterest(rate) {
        if (this.type === 'POUPANCA') {
            const interest = this.balance * (rate / 100);
            this.balance += interest;
            saveAccounts();
            return true;
        }
        return false;
    }
}

// Evento de login
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === validUser.username && password === validUser.password) {
        loggedIn = true;
        // Armazena o estado de login no sessionStorage
        sessionStorage.setItem('bankLoggedIn', 'true');
        // Redireciona para o menu principal
        window.location.href = 'main-menu.html';
    } else {
        document.getElementById('login-error').textContent = 'Usuário ou senha inválidos';
    }
});

// Verifica se o usuário está logado ao carregar páginas protegidas
window.onload = function() {
    const protectedPages = ['main-menu.html', 'create-account.html', 'consult-account.html', 
                          'remove-account.html', 'credit.html', 'debit.html', 
                          'interest.html', 'transfer.html', 'list-accounts.html'];
    
    const currentPage = window.location.pathname.split('/').pop();
    
    // Verifica o login no sessionStorage
    const isLoggedIn = sessionStorage.getItem('bankLoggedIn') === 'true';
    
    if (protectedPages.includes(currentPage)) {
        if (!isLoggedIn) {
            window.location.href = 'index.html';
        } else {
            loggedIn = true;
        }
    }
    
    // Para a página de login, se já estiver logado, redireciona para o menu
    if (currentPage === 'index.html' && isLoggedIn) {
        window.location.href = 'main-menu.html';
    }
};

/**
 * Cria uma nova conta bancária
 */
if (document.getElementById('create-account-form')) {
    document.getElementById('create-account-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const type = document.getElementById('account-type').value;
        const agency = document.getElementById('account-agency').value;
        const holderName = document.getElementById('account-holder-name').value;
        const holderCpf = document.getElementById('account-holder-cpf').value;
        const holderAddress = document.getElementById('account-holder-address').value;
        const holderPhone = document.getElementById('account-holder-phone').value;
        const initialBalance = parseFloat(document.getElementById('initial-balance').value) || 0;
        
        if (!type) {
            document.getElementById('create-account-message').textContent = 'Selecione o tipo de conta';
            document.getElementById('create-account-message').className = 'error';
            return;
        }
        
        const newAccount = new BankAccount(
            type, agency, holderName, holderCpf, holderAddress, holderPhone, initialBalance
        );
        
        accounts.push(newAccount);
        saveAccounts();
        
        document.getElementById('create-account-message').textContent = 
            `Conta criada com sucesso! Número: ${newAccount.number}`;
        document.getElementById('create-account-message').className = 'success';
        
        // Limpa o formulário
        this.reset();
    });
}

/**
 * Consulta uma conta bancária
 */
if (document.getElementById('consult-account-form')) {
    document.getElementById('consult-account-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const accountNumber = parseInt(document.getElementById('consult-account-number').value);
        const account = accounts.find(acc => acc.number === accountNumber);
        
        if (account) {
            const resultDiv = document.getElementById('consult-account-result');
            resultDiv.innerHTML = `
                <h3>Dados da Conta</h3>
                <p><strong>Número:</strong> ${account.number}</p>
                <p><strong>Tipo:</strong> ${account.type === 'CORRENTE' ? 'Conta Corrente' : 'Conta Poupança'}</p>
                <p><strong>Agência:</strong> ${account.agency}</p>
                <p><strong>Saldo:</strong> R$ ${account.balance.toFixed(2)}</p>
                <h4>Titular</h4>
                <p><strong>Nome:</strong> ${account.holder.name}</p>
                <p><strong>CPF:</strong> ${account.holder.cpf}</p>
                <p><strong>Endereço:</strong> ${account.holder.address}</p>
                <p><strong>Telefone:</strong> ${account.holder.phone}</p>
            `;
            resultDiv.className = '';
        } else {
            document.getElementById('consult-account-result').textContent = 'Conta não encontrada';
            document.getElementById('consult-account-result').className = 'error';
        }
    });
}

/**
 * Remove uma conta bancária
 */
if (document.getElementById('remove-account-form')) {
    document.getElementById('remove-account-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const accountNumber = parseInt(document.getElementById('remove-account-number').value);
        const accountIndex = accounts.findIndex(acc => acc.number === accountNumber);
        
        if (accountIndex !== -1) {
            accounts.splice(accountIndex, 1);
            saveAccounts();
            document.getElementById('remove-account-message').textContent = 'Conta removida com sucesso';
            document.getElementById('remove-account-message').className = 'success';
        } else {
            document.getElementById('remove-account-message').textContent = 'Conta não encontrada';
            document.getElementById('remove-account-message').className = 'error';
        }
    });
}

/**
 * Credita valor em uma conta
 */
if (document.getElementById('credit-form')) {
    document.getElementById('credit-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const accountNumber = parseInt(document.getElementById('credit-account-number').value);
        const amount = parseFloat(document.getElementById('credit-amount').value);
        const account = accounts.find(acc => acc.number === accountNumber);
        
        if (account) {
            if (account.credit(amount)) {
                document.getElementById('credit-message').textContent = 
                    `Crédito de R$ ${amount.toFixed(2)} realizado com sucesso. Novo saldo: R$ ${account.balance.toFixed(2)}`;
                document.getElementById('credit-message').className = 'success';
            } else {
                document.getElementById('credit-message').textContent = 'Valor inválido para crédito';
                document.getElementById('credit-message').className = 'error';
            }
        } else {
            document.getElementById('credit-message').textContent = 'Conta não encontrada';
            document.getElementById('credit-message').className = 'error';
        }
    });
}

/**
 * Debita valor de uma conta
 */
if (document.getElementById('debit-form')) {
    document.getElementById('debit-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const accountNumber = parseInt(document.getElementById('debit-account-number').value);
        const amount = parseFloat(document.getElementById('debit-amount').value);
        const account = accounts.find(acc => acc.number === accountNumber);
        
        if (account) {
            if (account.debit(amount)) {
                document.getElementById('debit-message').textContent = 
                    `Débito de R$ ${amount.toFixed(2)} realizado com sucesso. Novo saldo: R$ ${account.balance.toFixed(2)}`;
                document.getElementById('debit-message').className = 'success';
            } else {
                document.getElementById('debit-message').textContent = 
                    account.balance < amount ? 'Saldo insuficiente' : 'Valor inválido para débito';
                document.getElementById('debit-message').className = 'error';
            }
        } else {
            document.getElementById('debit-message').textContent = 'Conta não encontrada';
            document.getElementById('debit-message').className = 'error';
        }
    });
}

/**
 * Aplica juros em uma conta poupança
 */
if (document.getElementById('interest-form')) {
    document.getElementById('interest-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const accountNumber = parseInt(document.getElementById('interest-account-number').value);
        const rate = parseFloat(document.getElementById('interest-rate').value);
        const account = accounts.find(acc => acc.number === accountNumber);
        
        if (account) {
            if (account.type === 'POUPANCA') {
                const oldBalance = account.balance;
                if (account.applyInterest(rate)) {
                    const interest = account.balance - oldBalance;
                    document.getElementById('interest-message').textContent = 
                        `Juros de ${rate}% aplicados. Rendimento: R$ ${interest.toFixed(2)}. Novo saldo: R$ ${account.balance.toFixed(2)}`;
                    document.getElementById('interest-message').className = 'success';
                } else {
                    document.getElementById('interest-message').textContent = 'Erro ao aplicar juros';
                    document.getElementById('interest-message').className = 'error';
                }
            } else {
                document.getElementById('interest-message').textContent = 'Apenas contas poupança podem render juros';
                document.getElementById('interest-message').className = 'error';
            }
        } else {
            document.getElementById('interest-message').textContent = 'Conta não encontrada';
            document.getElementById('interest-message').className = 'error';
        }
    });
}

/**
 * Transfere valor entre contas
 */
if (document.getElementById('transfer-form')) {
    document.getElementById('transfer-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const fromAccountNumber = parseInt(document.getElementById('transfer-from').value);
        const toAccountNumber = parseInt(document.getElementById('transfer-to').value);
        const amount = parseFloat(document.getElementById('transfer-amount').value);
        
        if (fromAccountNumber === toAccountNumber) {
            document.getElementById('transfer-message').textContent = 'Não é possível transferir para a mesma conta';
            document.getElementById('transfer-message').className = 'error';
            return;
        }
        
        const fromAccount = accounts.find(acc => acc.number === fromAccountNumber);
        const toAccount = accounts.find(acc => acc.number === toAccountNumber);
        
        if (!fromAccount || !toAccount) {
            document.getElementById('transfer-message').textContent = 'Uma das contas não foi encontrada';
            document.getElementById('transfer-message').className = 'error';
            return;
        }
        
        if (fromAccount.debit(amount)) {
            toAccount.credit(amount);
            document.getElementById('transfer-message').textContent = 
                `Transferência de R$ ${amount.toFixed(2)} realizada com sucesso. ` +
                `Novo saldo da conta ${fromAccount.number}: R$ ${fromAccount.balance.toFixed(2)}. ` +
                `Novo saldo da conta ${toAccount.number}: R$ ${toAccount.balance.toFixed(2)}`;
            document.getElementById('transfer-message').className = 'success';
        } else {
            document.getElementById('transfer-message').textContent = 
                fromAccount.balance < amount ? 'Saldo insuficiente' : 'Valor inválido para transferência';
            document.getElementById('transfer-message').className = 'error';
        }
    });
}

/**
 * Lista todas as contas cadastradas
 */
function listAccounts() {
    const accountsListDiv = document.getElementById('accounts-list');
    
    if (!accountsListDiv) return;
    
    if (accounts.length === 0) {
        accountsListDiv.innerHTML = '<p>Nenhuma conta cadastrada</p>';
        return;
    }
    
    let html = '<table><tr><th>Número</th><th>Tipo</th><th>Agência</th><th>Titular</th><th>Saldo</th></tr>';
    
    accounts.forEach(account => {
        html += `
            <tr>
                <td>${account.number}</td>
                <td>${account.type === 'CORRENTE' ? 'Corrente' : 'Poupança'}</td>
                <td>${account.agency}</td>
                <td>${account.holder.name}</td>
                <td>R$ ${account.balance.toFixed(2)}</td>
            </tr>
        `;
    });
    
    html += '</table>';
    accountsListDiv.innerHTML = html;
}

// Verifica se o usuário está logado ao carregar páginas protegidas
window.onload = function() {
    const protectedPages = ['main-menu.html', 'create-account.html', 'consult-account.html', 
                          'remove-account.html', 'credit.html', 'debit.html', 
                          'interest.html', 'transfer.html', 'list-accounts.html'];
    
    const currentPage = window.location.pathname.split('/').pop();
    
    if (protectedPages.includes(currentPage) && !loggedIn) {
        window.location.href = 'index.html';
    }
};