<template>
    <div v-if="usuarioLogado">

        <nav class="navbar navbar-default">
            <div class="container-fluid">

                <div class="navbar-header">
                    <router-link :to="{ name: 'painel' }" class="navbar-brand">
                        <img src="src/assets/logo-mini.png" width="40" class="logo">
                    </router-link>
                </div>

                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav" v-if="usuario.role === 'admin'">
                        <li>
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Professores <span class="caret"></span></a>
                            <ul class="dropdown-menu">
                                <li>
                                    <router-link :to="{ name: 'usuarios' }">Todos</router-link>
                                </li>
                                <li class="divider"></li>
                                <li>
                                    <router-link :to="{ name: 'novo_usuario' }">Adicionar novo</router-link>
                                </li>
                            </ul>
                        </li>

                        <li>
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Bancas <span class="caret"></span></a>
                            <ul class="dropdown-menu">
                                <li>
                                    <router-link :to="{ name: 'bancas' }">Todas</router-link>
                                </li>
                                <li class="divider"></li>
                                <li>
                                    <router-link :to="{ name: 'nova_banca' }">Adicionar nova</router-link>
                                </li>
                            </ul>
                        </li>

                        <li>
                            <router-link :to="{ name: 'cursos' }">Cursos</router-link>
                        </li>
                    </ul>

                    <div class="navbar-form navbar-right">
                        <div class="btn-group" v-if="usuario.role === 'professor' || usuario.role === 'professor-moderador'">
                            <router-link :to="{name: 'bancas_enviadas'}" active-class="current" class="btn btn-primary"><i class="fa fa-user fa-fw"></i> {{ usuario.nome }}</router-link>
                            <a href="#" class="btn btn-primary dropdown-toggle" data-toggle="dropdown"><span class="caret"></span></a>
                            <ul class="dropdown-menu">
                                <li><router-link :to="{name: 'bancas_enviadas'}">Minha conta</router-link></li>
                                <li><a href="#" @click="encerrarSessao">Sair</a></li>
                            </ul>
                        </div>

                        <div class="btn-group" v-if="usuario.role === 'admin'">
                            <button class="btn btn-primary"><i class="fa fa-user fa-fw"></i> {{ usuario.nome }}</button>
                            <a href="#" class="btn btn-primary dropdown-toggle" data-toggle="dropdown"><span class="caret"></span></a>
                            <ul class="dropdown-menu">
                                <li><router-link :to="{name: 'bancas_enviadas'}">Minha conta</router-link></li>
                                <li><a href="#" @click="encerrarSessao">Sair</a></li>
                            </ul>
                        </div>


                        <router-link :to="{name: 'validar_bancas'}"  v-if="usuario.role === 'professor-moderador'" class="btn btn-warning" >
                            <i class="fa fa-check-square-o"></i>
                            Validar bancas</router-link>
                    </div>
                </div>

            </div>
        </nav>

        <div class="container">
            <router-view></router-view>
            <home-professor v-if="$store.state.usuarioLogado && $store.state.usuario.role === 'professor' || $store.state.usuario.role === 'professor-moderador'"></home-professor>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import { userUrl, listaCursos, listaProjetos, teacherUrl, getHeader } from '../../config'
    import HomeProfessor from './HomeProfessor.vue'

    export default {

        beforeRouteEnter (to, from, next) {
            next(vm => {

                if(vm.usuarioLogado === false) {
                    vm.$router.push({name: 'login'})
                }

                vm.$http.get(userUrl, {headers: getHeader()})
                        .then((res) => {
                            const usuario = {
                                nome: res.body.user.name,
                                email: res.body.user.email,
                                id: res.body.user.id,
                                role: res.body.user.role
                            }
                            vm.atualizarUsuario(usuario)
                            vm.logarUsuario(true)

                        }, (res) => {
                            vm.$router.push({name: 'login'})
                            console.log('Não autorizado')
                        })

                vm.$http.get(listaCursos, { headers: getHeader() })
                        .then((res) => {
                            vm.listarCursos(res.body.cursos)
                        }, (res) => {
                            vm.$router.push({name: 'login'})
                            console.log('Não autorizado')
                        })

                vm.$http.get(teacherUrl, {headers: getHeader()})
                        .then((res) => {
                            vm.listarUsuarios(res.body.users)
                        }, (res) => {
                            vm.$router.push({name: 'login'})
                        })

                vm.$http.get(listaProjetos, {headers: getHeader()})
                        .then((res) => {
                            vm.listarProjetos(res.body.projetos)
                        }, (res) => {
                            vm.$router.push({name: 'login'})
                        })
            })
        },

        components: {
          HomeProfessor
        },

        methods: {
            encerrarSessao () {
                this.logarUsuario(false)
                window.localStorage.setItem('id_token','')
                this.$router.push({name: 'login'})
            },
            ...mapActions(['atualizarUsuario','logarUsuario', 'listarCursos', 'listarUsuarios', 'listarProjetos'])
        },

        computed: mapState({
            usuarioLogado: 'usuarioLogado',
            usuario: 'usuario',
            usuarios: 'usuarios'
        })
    }
</script>

<style>
    .navbar-brand {
        padding: 10px;
        padding-top: 12px;
    }
    ul.nav a {
        font-size: 16px;
    }
    .list-group-item.active {
        font-size: 18px;
    }
    div['data-permission'] {
        display: none
    }
    div['data-permission="professorActive"'] {
        display: block
    }
</style>
