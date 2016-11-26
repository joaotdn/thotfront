<template>
    <div v-if="usuario.role === 'professor-moderador'">

<!--<ul>-->
    <!--<li v-for="projeto in projetos">{{ projeto.examinador_1 }} - {{ projeto.examinador_2 }}</li>-->
<!--</ul>-->
        <h4>Bancas sugeridas</h4>

        <table class="table table-bordered table-hover">
            <caption>Click no botão verde para selecionar as bancas e gerar a tabela com as apresentações</caption>
            <thead>
            <tr>
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

            <tr v-for="projeto in projetos" :class="(projeto.examinador_1 !== null && projeto.examinador_2 !== null) ? 'success' : (projeto.examinador_1 !== null || projeto.examinador_2 !== null) ? 'warning' : 'danger'">
                <th scope="row">{{ convertDate(projeto.data) }}</th>
                <td>{{ convertTime(projeto.hora) }}</td>
                <td>{{ projeto.sala }}</td>
                <td>{{ projeto.nome }}</td>
                <td>{{ projeto.aluno }}</td>
                <td>{{ getProfessor( projeto.orientador_id ) }}</td>
                <td>
                    <select v-model="projeto.examinador_1" @change="alterExaminadorBanca(projeto.examinador_1,projeto.id,'ex_1')">
                        <option :value="null"></option>
                        <option v-for="usuario in usuarios" :value="usuario.id">{{ usuario.name }}</option>
                    </select>
                </td>
                <td>
                    <select v-model="projeto.examinador_2" @change="alterExaminadorBanca(projeto.examinador_2,projeto.id,'ex_2')">
                        <option :value="null"></option>
                        <option v-for="usuario in usuarios" :value="usuario.id">{{ usuario.name }}</option>
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
    import { getProfessor, userUrl, listaProjetos, getHeader } from '../../config'
    import { convertDate, convertTime, ordenaDatas } from '../../libs/utils'

    export default {
        data() {
          return {
              professores: []
          }
        },

        beforeRouteEnter (to, from, next) {
            next(vm => {
                if(vm.usuario.role === 'professor' || vm.usuario.role === 'admin')
                    vm.$route.push({ name: 'bancas_enviadas' })
            })
        },

        beforeMount() {
            for (var i = 0; i < this.usuarios.length; i++) {
                this.professores.push(this.usuarios[i].teachers)
            }
            this.getAreaPrimaria()
        },

        methods: {
            convertTime,
            convertDate,
            ordenaDatas,
            getProfessor(id) {
                for (var i = 0; i < this.usuarios.length; i++) {
                    if(id === this.usuarios[i].id)
                        return this.usuarios[i].name
                }
            },
            getAreaPrimaria(id) {
                for(var i = 0; i < this.professores.length; i++) {
                    if(id === this.professores[i][0].teacherable_id)
                        return this.professores[i][0].area_primaria
                }
            },
            getAreaSecundaria(id) {
                for(var i = 0; i < this.professores.length; i++) {
                    if(id === this.professores[i][0].teacherable_id)
                        return this.professores[i][0].area_secundaria
                }
            },
            alterExaminadorBanca(examinador_selected, projeto_id, posicao) {
                this.$http.post(listaProjetos + '/alterar_examinador',{
                    examinador: examinador_selected,
                    projeto: projeto_id,
                    pos: posicao
                }, { headers: getHeader() })
                        .then((res) => {
                            console.log(res)
                        })
            }
        },

        computed: mapState({
            usuario: 'usuario',
            usuarioLogado: 'usuarioLogado',
            projetos: 'projetos',
            usuarios: 'usuarios'
        })
    }
</script>
