<template>
    <div class="col-sm-12 col-md-10 col-md-offset-1">
        <p>
            <router-link :to="{name: 'nova_banca'}" class="btn btn-lg btn-success send-projects">Adicionar novo</router-link>
        </p>

        <div class="bs-component">
            <div class="list-group">
                <h3>
                    <a href="#" class="list-group-item active">
                        Projetos
                    </a>
                </h3>
                <a href="#" class="list-group-item projeto-item" v-for="projeto in projetos">
                    <span class="glyphicons glyphicons-user"></span> {{ projeto.nome }} <small class="text-muted">({{  projeto.aluno }})</small>
                    <span class="pull-right">
                        <button class="btn btn-default" data-toggle="modal" data-target=".bs-example-modal-lg" @click="getProjeto(projeto)"><i class="fa fa-cog"></i> Editar</button>
                    </span>
                </a>
            </div>
        </div>

        <!-- Modal editar projeto -->
        <div class="modal bs-example-modal-lg fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel"><i class="fa fa-book"></i> {{ projeto.nome }}</h4>
                    </div>
                    <div class="modal-body">
                        <div class="bs-component">
                            <form class="form-horizontal">

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
                                        <select name="curso" class="form-control" id="inputCurso" v-model="projeto.curso_id">
                                            <option v-for="curso in cursos" :value="projeto.curso_id">{{curso.nome}}</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="inputOrientador" class="col-lg-2 control-label">Orientador</label>
                                    <div class="col-lg-10">
                                        <select v-model="projeto.orientador_id" name="curso" class="form-control" id="inputOrientador">
                                            <option v-for="user in usuarios" :value="user.id" v-if="user.role !== 'admin'">{{user.name}}</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="areas" class="col-lg-2 control-label">Área de interesse principal</label>
                                    <div class="col-lg-10">
                                        <select class="form-control" id="areas" v-model="projeto.area_primaria">
                                            <option v-for="area in areas">{{ area }}</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="areas_sec" class="col-lg-2 control-label">Área de interesse secundária</label>
                                    <div class="col-lg-10">
                                        <select class="form-control" id="areas_sec" v-model="projeto.area_secundaria">
                                            <option v-for="area in areas">{{ area }}</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="inputAluno" class="col-lg-2 control-label">Resumo</label>
                                    <div class="col-lg-10">
                                        <textarea v-model="projeto.resumo" class="form-control"></textarea>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="inputData" class="col-lg-2 control-label">Horário</label>
                                    <div class="col-lg-3">
                                        <input type="text" name="data" class="form-control m-data" id="inputData" placeholder="Data" v-model="projeto.data" required>
                                    </div>
                                    <div class="col-lg-3">
                                        <input v-model="projeto.hora" type="text" name="hora" class="form-control m-hora" id="inputHora" placeholder="Hora" required>
                                    </div>
                                    <div class="col-lg-4">
                                        <input v-model="projeto.sala" type="text" name="sala" class="form-control" id="inputSala" placeholder="Sala" required>
                                    </div>
                                </div>

                                <div class="modal-footer">
                                    <button type="button" class="btn btn-success" data-dismiss="modal" @click="updateProjeto(projeto)">Salvar</button>
                                    <button type="button" class="btn btn-" data-dismiss="modal">Fechar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import { listaProjetos, getProjeto, getHeader } from '../../config'

    export default {

        data() {
           return {
               projeto: []
           }
        },

        beforeRouteEnter (to, from, next) {
            next(vm => {

                if(vm.usuarioLogado == false || vm.usuario.role !== 'admin') {
                    vm.$router.push({name: 'login'})
                }

                vm.$http.get(listaProjetos, {headers: getHeader()})
                        .then((res) => {
                            vm.listarProjetos(res.body.projetos)
                        }, (res) => {
                            vm.$router.push({name: 'login'})
                        })
            })
        },

        methods: {
            getProjeto(projeto) {
                this.$http.get(listaProjetos + '/' + projeto.id, {headers: getHeader()})
                        .then((res) => {
                            projeto.data = this.convertDate(projeto.data)
                            projeto.hora = this.convertTime(projeto.hora)
                            this.projeto = projeto
                            console.log(res)
                        }, (res) => {
                            console.log(res)
                        })
            },
            updateProjeto(projeto) {
                this.$http.put(getProjeto + '/update/' + projeto.id, projeto, {headers: getHeader()})
                        .then((res) => {
                            console.log(res)
                        }, (res) => {
                            console.log(res)
                        })
            },
            convertDate(inputFormat) {
                var str = inputFormat.split('-')
                return str.reverse().join('/')
            },
            convertTime(inputFormat) {
                var str = inputFormat.split(' ')
                str = str[1].substr(0,5)
                return str;
            },
            ...mapActions(['listarProjetos'])
        },

        computed: mapState({
            projetos: 'projetos',
            usuario: 'usuario',
            usuarioLogado: 'usuarioLogado',
            usuarios: 'usuarios',
            cursos: 'cursos',
            areas: 'areas'
        })

    }
</script>

<style>
    .list-group-item {
        height: 68px;
    }
</style>
