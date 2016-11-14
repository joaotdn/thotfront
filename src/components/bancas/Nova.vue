<template>

    <div class="col-sm-12 col-md-10 col-md-offset-1 well bs-component">

        <form @submit.prevent="cadastrarProjeto" class="form-horizontal">
            <fieldset>
                <legend>Cadastrar projeto</legend>
            </fieldset>

            <div class="form-group">
                <label for="inputNome" class="col-lg-2 control-label">Nome do projeto</label>
                <div class="col-lg-10">
                    <input v-model="projeto.nome" type="text" name="nome" class="form-control" id="inputNome" required>
                </div>
            </div>

            <div class="form-group">
                <label for="inputAluno" class="col-lg-2 control-label">Aluno(s)</label>
                <div class="col-lg-10">
                    <input v-model="projeto.aluno" type="text" name="aluno" class="form-control" id="inputAluno" required>
                </div>
            </div>

            <!--<div class="form-group">-->
                <!--<label for="textArea" class="col-lg-2 control-label">Descrição</label>-->
                <!--<div class="col-lg-10">-->
                    <!--<textarea class="form-control" name="descricao" rows="3" id="textArea" placeholder="Opcional"></textarea>-->
                <!--</div>-->
            <!--</div>-->

            <div class="form-group">
                <label for="inputCurso" class="col-lg-2 control-label">Curso</label>
                <div class="col-lg-10">
                    <select v-model="projeto.curso_id" name="curso" class="form-control" id="inputCurso">
                        <option v-for="curso in cursos" :value="curso.id">{{curso.nome}}</option>
                    </select>
                </div>
            </div>

            <div class="form-group">
                <label for="inputOrientador" class="col-lg-2 control-label">Orientador</label>
                <div class="col-lg-10">
                    <select v-model="projeto.orientador" name="curso" class="form-control" id="inputOrientador">
                        <option v-for="user in usuarios" :value="user.id" v-if="user.role !== 'admin'">{{user.name}}</option>
                    </select>
                </div>
            </div>

            <div class="form-group">
                <label for="areas" class="col-lg-2 control-label">Área de interesse principal</label>
                <div class="col-lg-10">
                    <select v-model="projeto.area_primaria" class="form-control" id="areas">
                        <option>Segurança da informação</option>
                        <option>Programação</option>
                        <option>Análise de sistemas</option>
                        <option>Redes</option>
                        <option>Gestão em TI</option>
                    </select>
                </div>
            </div>

            <div class="form-group">
                <label for="areas_sec" class="col-lg-2 control-label">Área de interesse secundária</label>
                <div class="col-lg-10">
                    <select v-model="projeto.area_secundaria" class="form-control" id="areas_sec">
                        <option>Segurança da informação</option>
                        <option>Programação</option>
                        <option>Análise de sistemas</option>
                        <option>Redes</option>
                        <option>Gestão em TI</option>
                    </select>
                </div>
            </div>

            <div class="form-group">
                <label for="inputData" class="col-lg-2 control-label">Horário</label>
                <div class="col-lg-3">
                    <input v-model="projeto.data" type="text" name="data" class="form-control m-data date" id="inputData" placeholder="Data" required>
                </div>
                <div class="col-lg-3">
                    <input v-model="projeto.hora" type="text" name="hora" class="form-control m-hora time" id="inputHora" placeholder="Hora" required>
                </div>
                <div class="col-lg-4">
                    <input v-model="projeto.sala" type="text" name="sala" class="form-control" id="inputSala" placeholder="Sala" required>
                </div>
            </div>

            <p class="text-right">
                <router-link :to="{name: 'bancas'}" class="btn btn-default">Cancelar</router-link>
                <button type="submit" class="btn btn-primary">Cadastrar</button>
            </p>
        </form>
    </div>
</template>

<script>
    import { teacherUrl, novoProjeto, getHeader } from '../../config'
    import { mapState } from 'vuex'

    export default {
        mounted() {
            $('.date').mask('00/00/0000');
            $('.time').mask('00:00');
        },
        beforeRouteEnter (to, from, next) {
            next(vm => {
                if(vm.usuarioLogado == false || vm.usuario.role !== 'admin') {
                    vm.$router.push({name: 'login'})
                }
            })
        },

        data() {
            return {

                projeto: {
                    nome: '',
                    aluno: '',
                    curso_id: new Number(),
                    orientador: '',
                    area_primaria: '',
                    area_secundaria: '',
                    data: '',
                    hora: '',
                    sala: ''
                }

            }
        },

        methods: {
            cadastrarProjeto() {
                const _this = this

                this.$http.post(novoProjeto, {

                    nome: this.projeto.nome,
                    aluno: this.projeto.aluno,
                    curso_id: this.projeto.curso_id,
                    orientador_id: this.projeto.orientador,
                    area_primaria: this.projeto.area_primaria,
                    area_secundaria: this.projeto.area_secundaria,
                    data: this.projeto.data,
                    hora: this.projeto.hora,
                    sala: this.projeto.sala

                }, {headers: getHeader()})
                        .then((res) => {
                            const _redirect = res.body.redirect

                            if(_redirect) {
                                console.log(res)
                                _this.$router.push({ name: 'bancas' })
                            } else {
                                console.log(res)
                            }

                        }, (res) => {
                            console.log(res)
                            _this.$router.push({ name: 'login' })
                        })
            },
        },

        computed: mapState({
            cursos: 'cursos',
            usuarios: 'usuarios',
            usuario: 'usuario',
            usuarioLogado: 'usuarioLogado',
            projetos: 'projetos'
        })
    }
</script>
