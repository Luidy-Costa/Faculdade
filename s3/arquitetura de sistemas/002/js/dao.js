const DAO = {
    // Utilitário para ler do navegador
    get(key) {
        return JSON.parse(localStorage.getItem(key)) || [];
    },

    // Utilitário para gravar no navegador
    set(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    },

    // Adicionar item no fim da lista
    add(key, item) {
        const list = this.get(key);
        list.push(item);
        this.set(key, list);
    },

    // Atualizar item numa posição específica
    update(key, index, item) {
        const list = this.get(key);
        if (list[index]) {
            list[index] = item;
            this.set(key, list);
        }
    },

    // Remover item
    remove(key, index) {
        const list = this.get(key);
        list.splice(index, 1);
        this.set(key, list);
    }
};