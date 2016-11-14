export default {

    /**
     * Usuários
     */
    logarUsuario (context, payload) {
        context.commit('LOGAR_USUARIO', payload)
    },

    atualizarUsuario (context, payload) {
        context.commit('ATUALIZAR_USUARIO', payload)
    },

    listarUsuarios (context, payload) {
        context.commit('LISTAR_USUARIOS', payload)
    },

    /**
     * Cursos
     */
    listarCursos (context, payload) {
        context.commit('LISTAR_CURSOS', payload)
    },
    addCursos (context, payload) {
        context.commit('ADD_CURSO', payload)
    },
    deleteCurso (context, payload) {
        context.commit('DELETE_CURSO', payload)
    },

    /**
     * Projetos
     */
    listarProjetos (context, payload) {
        context.commit('LISTAR_PROJETOS', payload)
    },
}