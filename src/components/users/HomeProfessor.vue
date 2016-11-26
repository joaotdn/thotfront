<template>
    <div class="col-sm-12 col-md-10 col-md-offset-1 bs-component" v-if="!alocado">

        <h3><i class="fa fa-user fa-md"></i> Olá, {{ usuario.nome }}</h3>
        <p class="lead">Confira abaixo bancas com projetos que possuem pelo menos 1 área de seu interesse</p>
        <hr>

        <div class="bs-component" v-if="cursosNomes.length === 0">
            <div class="alert alert-dismissible alert-warning">
                <h4>Não há bancas em suas áreas no momento</h4>
                <p>
                    Aguarde novos cadastros ou entre em contato com o moderador.
                </p>
            </div>
            <div id="source-button" class="btn btn-primary btn-xs" style="display: none;">&lt; &gt;</div>
        </div>

        <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">

            <div class="panel panel-primary" v-for="(curso, index) in cursosNomes">

                <div class="panel-heading" role="tab" id="headingOne">
                    <h2 class="panel-title">
                        <a role="button" data-toggle="collapse" data-parent="#accordion" :href="'#collapseOne' + index" aria-expanded="true" aria-controls="collapseOne">
                            <i class="fa fa-graduation-cap" aria-hidden="true"></i> {{ curso.nome }}
                        </a>
                    </h2>
                </div>

                <div :id="'collapseOne' + index" class="panel-collapse collapse" :class="(index === 0) ? 'in' : ''" role="tabpanel" aria-labelledby="headingOne">
                    <div class="panel-body">
                        <div class="list-group" style="margin-bottom:0;">
                            <a href="#" class="list-group-item" v-for="projeto in projetosUsuario" v-if="projeto.curso_id === curso.id">
                                <label>
                                    <input type="checkbox" v-model="selecionadas" :value="projeto.id" v-if="usuario.id !== projeto.orientador_id"> <strong>{{ projeto.nome }}</strong> - <i class="fa fa-calendar-o" aria-hidden="true"></i> {{ convertDate(projeto.data) }} - <i class="fa fa-clock-o" aria-hidden="true"></i> {{ convertTime( projeto.hora ) }}
                                    <i v-if="usuario.id === projeto.orientador_id" class="text-warning"> - Você é o orientador</i>
                                </label>
                                <button class="btn btn-default pull-right" data-toggle="modal" data-target=".bs-example-modal-lg" @click="getProjetoData(projeto.id)">Detalhes</button>
                            </a>
                        </div>
                    </div>
                </div>

            </div>

            <hr>
            <a href="#" class="btn btn-success btn-lg btn-block" @click="enviaBancas">Enviar</a>
        </div>

        <!--
            Modal do projeto
        -->
        <div class="modal bs-example-modal-lg fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">

                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>

                        <h4 class="modal-title" id="myModalLabel"><i class="fa fa-book"></i> {{ projetoDetalhes.nome }}</h4>
                        <h6>
                            <i class="fa fa-user" aria-hidden="true"></i>
                            {{ projetoDetalhes.aluno }}
                        </h6>
                        <p>
                            <strong>
                                <i class="fa fa-tags" aria-hidden="true"></i>
                                {{ projetoDetalhes.area_primaria }}, {{ projetoDetalhes.area_secundaria }}
                            </strong>
                        </p>
                        <p>
                            <i class="fa fa-calendar-o" aria-hidden="true"></i> {{ convertDate(projetoDetalhes.data) }}<br>
                            <i class="fa fa-clock-o" aria-hidden="true"></i> {{ convertTime(projetoDetalhes.hora) }}<br>
                            <i class="fa fa-university" aria-hidden="true"></i> Sala {{ projetoDetalhes.sala }}
                        </p>
                    </div>

                    <div class="modal-body">
                        <div class="bs-component">

                            <p>
                                <strong>Resumo:</strong><br>
                                {{ projetoDetalhes.resumo }}
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import { userUrl, getCurso, listaProjetos, getHeader } from '../../config'

    export default {
        data () {
            return {
                projetosUsuario: [],
                projetosCursos: [],
                selecionadas: [],
                cursosNomes: [],
                projetoDetalhes: {}
            }
        },

        props: ['showTabela'],

        beforeRouteEnter (to, from, next) {

            next(vm => {
                vm.$http.get(userUrl + '/' + vm.usuario.id + '/alocado', {headers: getHeader()})
                        .then((res) => {
                            if ( res.body.msg === 'checked' ) {
                                vm.professorAlocado(true)
                                vm.$router.push({ name: 'bancas_enviadas' })
                            }
                        }, (res) => {
                            console.log(res)
                        })
            })

        },

        beforeMount () {

            this.$http.get(userUrl + '/' + this.usuario.id + '/alocado', {headers: getHeader()})
                    .then((res) => {
                        if ( res.body.msg === 'checked' ) {
                            this.professorAlocado(true)
                            this.$router.push({ name: 'bancas_enviadas' })
                        }
                    }, (res) => {
                        console.log(res)
                    })

            this.$http.get(userUrl + '/' + this.usuario.id + '/bancas', { headers: getHeader() })
                    .then((res) => {

                        this.projetosUsuario = res.body

                        for(var i = 0; i < this.projetosUsuario.length; i++) {

                            var c = this.projetosUsuario[i].curso_id

                            // Armazena os projetos dos cursos
                            if(this.projetosCursos.indexOf(c) === -1 && typeof c !== 'undefined') {
                                this.projetosCursos.push(c)
                            }

                        }

                        for (var i = 0; i < this.projetosCursos.length; i++) {
                            this.$http.get(getCurso + '/' + this.projetosCursos[i], { headers: getHeader() })
                                    .then((res) => {
                                        this.cursosNomes.push({id: res.body.curso_id, nome: res.body.curso})
                                    })
                        }

                    }, (res) => {
                        console.log(res)
                    })
        },

        methods: {
            verificaProfessor (id) {
              console.log(id)
            },

            convertDate(inputFormat) {
                if(typeof inputFormat !== 'undefined') {
                    var str = inputFormat.split('-')
                    return str.reverse().join('/')
                }
            },

            convertTime(inputFormat) {
                if(typeof inputFormat !== 'undefined') {
                    var str = inputFormat.split(' ')
                    str = str[1].substr(0,5)
                    return str;
                }
            },

            getCountBancas(data) {
                var arr = 0
                for (var i = 0; i < this.projetosUsuario.length; i++) {
                    if(this.projetosUsuario[i].data === data)
                        arr++
                }
                if(arr === 1)
                    return arr + ' banca'
                if(arr > 1)
                    return arr + ' bancas'

                return 'Sem bancas';
            },

            getBancasData(data) {
                var arr = []

                for (var i = 0; i < this.projetosUsuario.length; i++) {
                    if(this.projetosUsuario[i].data === data)
                        arr.push(this.projetosUsuario[i])
                }

                return this.ordenaDatas(arr)
            },

            ordenar(datas) {
                return datas.sort()
            },

            enviaBancas() {
                if(this.selecionadas.length > 0) {

                    this.$http.post(listaProjetos + '/salvar', { bancas: this.selecionadas, usuario: this.usuario.id }, { headers: getHeader() })
                            .then((res) => {
                                console.log(res)
                                this.professorAlocado(true)
                                this.$router.push({ name: 'bancas_enviadas' })
                            })

                } else {
                    alert('Selecione pelo menos uma banca')
                }
            },

            getProjetoData (id) {
                this.$http.get(listaProjetos + '/' + id, { headers: getHeader() })
                        .then((res) => {
                            this.projetoDetalhes = res.body.projeto
                        }, (res) => { alert('O projeto não pode ser selecionado') })
            },

            ...mapActions(['professorAlocado'])
        },

        computed: mapState({
            usuario: 'usuario',
            usuarioLogado: 'usuarioLogado',
            projetos: 'projetos',
            alocado: 'alocado'
        })

    }
</script>

<style>
    .list-group-item.auto {
        height: auto;
        line-height: 0;
    }
    .block {
        display: block;
    }
    label {
        cursor: pointer;
    }
    .panel-body p {
        font-size: 16px;
    }
    .panel-primary>.panel-heading {
        height: 50px;
    }
    .panel-title {
        line-height: 34px;
    }
</style>
