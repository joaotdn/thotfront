export default {

    /**
     * Atualiza o usuário do state após login
     * @param state
     * @param payload
     */
    'ATUALIZAR_USUARIO' (state, payload) {
        state.usuario = payload
    },

    /**
     * Manteḿ uma flag indicando se o usuário está logado
     * @param state
     * @param payload
     */
    'LOGAR_USUARIO' (state, payload) {
        state.usuarioLogado = payload
    },

    /**
     * Retorna uma lista com todos os usuários
     * @param state
     * @param payload
     */
    'LISTAR_USUARIOS' (state, payload) {
        state.usuarios = payload
    },

    'PROFESSOR_ALOCADO' (state, payload) {
        state.alocado = payload
    },

    /**
     * Retorna lista com todos os cursos
     * @param state
     * @param payload
     */
    'LISTAR_CURSOS' (state, payload) {
        state.cursos = payload
    },
    'ADD_CURSO' (state, payload) {
        state.cursos.push(payload)
    },
    'DELETE_CURSO' (state, payload) {
        var index = state.cursos.indexOf(payload)
        state.cursos.splice(index, 1)
    },

    /**
     * Lista com todos os projetos
     * @param state
     * @param payload
     */
    'LISTAR_PROJETOS' (state, payload) {
        state.projetos = payload
    },

}