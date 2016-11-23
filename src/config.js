export const apiDomain = 'http://localhost:8000/api/v1/'

/**
 * Usuarios
 */
export const loginUrl = apiDomain + 'authenticate'
export const userUrl = apiDomain + 'user'
export const teacherUrl = apiDomain + 'teachers'
export const novoProfessor = apiDomain + 'novo/professor'
export const getProfessor = apiDomain + 'professor'

/**
 * Cursos
 */
export const getCurso = apiDomain + 'curso'
export const novoCurso = apiDomain + 'novo/curso'
export const listaCursos = apiDomain + 'cursos'
export const removeCurso = apiDomain + 'delete/curso/'

/**
 * Projetos
 */
export const novoProjeto = apiDomain + 'novo/projeto/'
export const listaProjetos = apiDomain + 'projetos'
export const getProjeto = apiDomain + 'projeto'

export const getHeader = function () {

    const tokenData = window.localStorage.getItem('id_token')

    const headers = {
        'Authorization' : 'Bearer ' + tokenData,
        'Content-Type' : 'application/json'
    }

    return headers
}