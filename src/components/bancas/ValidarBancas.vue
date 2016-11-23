<template>
    <div v-if="usuario.role === 'professor-moderador'">
        <h4>Bancas sugeridas</h4>
        <table class="table table-bordered table-hover">
            <caption>Click no botão verde para selecionar as bancas e gerar a tabela com as apresentações</caption>
            <thead>
            <tr>
                <th></th>
                <th>Data</th>
                <th>Hora</th>
                <th>Sala</th>
                <th>Título do TCC</th>
                <th>Aluno</th>
                <th>Orientador</th>
                <th>Examinador 1</th>
                <th>Examinador 2</th>
            </tr>
            </thead>

            <tbody>

            <tr class="success">
                <th><input type="checkbox"></th>
                <th scope="row">12/10/2016</th>
                <td>18:30</td>
                <td>F120</td>
                <td>Thot Auto Banc</td>
                <td>João Teodoro Dantas Neto</td>
                <td>Jefferson Barbosa</td>
                <td>
                    <select>
                        <option></option>
                        <option>Rodrigo Fujioka</option>
                        <option>Moisés da Silva</option>
                        <option>Walter Santos</option>
                        <option>Leonardo Barbosa</option>
                        <option>Renato Russo</option>
                        <option>Mauricio Samy</option>
                    </select>
                </td>
                <td>
                    <select>
                        <option></option>
                        <option>Rodrigo Fujioka</option>
                        <option>Moisés da Silva</option>
                        <option>Walter Santos</option>
                        <option>Leonardo Barbosa</option>
                        <option>Renato Russo</option>
                        <option>Mauricio Samy</option>
                    </select>
                </td>
            </tr>

            <tr class="success">
                <th><input type="checkbox"></th>
                <th scope="row">13/10/2016</th>
                <td>19:30</td>
                <td>F120</td>
                <td>Jogo da Velha 3D</td>
                <td>Jim Morrison da Silva</td>
                <td>Moisés da Silva</td>
                <td>
                    <select>
                        <option></option>
                        <option>Rodrigo Fujioka</option>
                        <option>Moisés da Silva</option>
                        <option>Walter Santos</option>
                        <option>Leonardo Barbosa</option>
                        <option>Renato Russo</option>
                        <option>Mauricio Samy</option>
                    </select>
                </td>
                <td>
                    <select>
                        <option></option>
                        <option>Rodrigo Fujioka</option>
                        <option>Moisés da Silva</option>
                        <option>Walter Santos</option>
                        <option>Leonardo Barbosa</option>
                        <option>Renato Russo</option>
                        <option>Mauricio Samy</option>
                    </select>
                </td>
            </tr>

            <tr class="warning">
                <th><input type="checkbox"></th>
                <th scope="row">14/10/2016</th>
                <td>14:30</td>
                <td>RR20</td>
                <td>Automação de Estoque</td>
                <td>Maria Fernandes de Sá</td>
                <td>Wallace Rolim</td>
                <td>
                    <select>
                        <option></option>
                        <option>Rodrigo Fujioka</option>
                        <option>Moisés da Silva</option>
                        <option>Walter Santos</option>
                        <option>Leonardo Barbosa</option>
                        <option>Renato Russo</option>
                        <option>Mauricio Samy</option>
                    </select>
                </td>
                <td>
                    <select>
                        <option></option>
                        <option>Rodrigo Fujioka</option>
                        <option>Moisés da Silva</option>
                        <option>Walter Santos</option>
                        <option>Leonardo Barbosa</option>
                        <option>Renato Russo</option>
                        <option>Mauricio Samy</option>
                    </select>
                </td>
            </tr>

            <tr class="danger">
                <th><input type="checkbox"></th>
                <th scope="row">14/10/2016</th>
                <td>15:30</td>
                <td>RR20</td>
                <td>Sistema Comercial</td>
                <td>Cássio Cunha Dutra</td>
                <td>Walter Santos</td>
                <td>
                    <select>
                        <option></option>
                        <option>Rodrigo Fujioka</option>
                        <option>Moisés da Silva</option>
                        <option>Walter Santos</option>
                        <option>Leonardo Barbosa</option>
                        <option>Renato Russo</option>
                        <option>Mauricio Samy</option>
                    </select>
                </td>
                <td>
                    <select>
                        <option></option>
                        <option>Rodrigo Fujioka</option>
                        <option>Moisés da Silva</option>
                        <option>Walter Santos</option>
                        <option>Leonardo Barbosa</option>
                        <option>Renato Russo</option>
                        <option>Mauricio Samy</option>
                    </select>
                </td>
            </tr>

            <tr class="success">
                <th><input type="checkbox"></th>
                <th scope="row">16/10/2016</th>
                <td>15:30</td>
                <td>RR20</td>
                <td>Sistema Riqueza</td>
                <td>Ana Paula Souza</td>
                <td>Rodrigo Fujioka</td>
                <td>
                    <select>
                        <option></option>
                        <option>Rodrigo Fujioka</option>
                        <option>Moisés da Silva</option>
                        <option>Walter Santos</option>
                        <option>Leonardo Barbosa</option>
                        <option>Renato Russo</option>
                        <option>Mauricio Samy</option>
                    </select>
                </td>
                <td>
                    <select>
                        <option></option>
                        <option>Rodrigo Fujioka</option>
                        <option>Moisés da Silva</option>
                        <option>Walter Santos</option>
                        <option>Leonardo Barbosa</option>
                        <option>Renato Russo</option>
                        <option>Mauricio Samy</option>
                    </select>
                </td>
            </tr>

            <tr class="warning">
                <th><input type="checkbox"></th>
                <th scope="row">16/10/2016</th>
                <td>15:30</td>
                <td>RR20</td>
                <td>Sistema para Bancos</td>
                <td>Marcilio Damassena Ferreira</td>
                <td>Thiago Japiassu</td>
                <td>
                    <select>
                        <option></option>
                        <option>Rodrigo Fujioka</option>
                        <option>Moisés da Silva</option>
                        <option>Walter Santos</option>
                        <option>Leonardo Barbosa</option>
                        <option>Renato Russo</option>
                        <option>Mauricio Samy</option>
                    </select>
                </td>
                <td>
                    <select>
                        <option></option>
                        <option>Rodrigo Fujioka</option>
                        <option>Moisés da Silva</option>
                        <option>Walter Santos</option>
                        <option>Leonardo Barbosa</option>
                        <option>Renato Russo</option>
                        <option>Mauricio Samy</option>
                    </select>
                </td>
            </tr>

            </tbody>

        </table>

        <p class="bs-component">
            <a href="#" class="btn btn-primary btn-lg">
                <i class="fa fa-file-pdf-o" aria-hidden="true"></i>
                Gerar lista de bancas</a>

            <a href="#" class="btn btn-success btn-lg">
                <i class="fa fa-envelope-o" aria-hidden="true"></i>
                Enviar para professores</a>
        </p>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        beforeRouteEnter (to, from, next) {
            next(vm => {
                if(vm.usuario.role === 'professor' || vm.usuario.role === 'admin')
                    vm.$route.push({ name: 'bancas_enviadas' })
            })
        },

        computed: mapState({
            usuario: 'usuario',
            usuarioLogado: 'usuarioLogado',
            projetos: 'projetos'
        })
    }
</script>
