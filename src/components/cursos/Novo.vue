<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div class="col-sm-12 col-md-10 col-md-offset-1 well bs-component">

        <form @submit.prevent="newCurso" class="form-horizontal">
            <fieldset>
                <legend>Adicionar curso</legend>
            </fieldset>

            <div class="form-group">
                <label for="inputNome" class="col-lg-2 control-label">Nome do curso</label>
                <div class="col-lg-10">
                    <input type="text" name="nome" class="form-control" id="inputNome" v-model="novoCurso" required>
                </div>
            </div>

            <p class="text-right">
                <button type="submit" class="btn btn-primary">Adicionar</button>
            </p>
        </form>

        <div class="list-group">
            <hr>
            <a href="#" class="list-group-item" v-for="(curso, index) in cursos">
                {{ curso.nome }}
                <!--<span class="pull-right">-->
                    <!--<button class="btn btn-danger" v-on:remove="cursos.splice(index, 1)"><i class="fa fa-trash" aria-hidden="true"></i> Apagar</button>-->
                <!--</span>-->
            </a>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex'
    import { novoCurso, listaCursos, removeCurso, getHeader } from '../../config'

    export default{

        beforeRouteEnter (to, from, next) {
            next(vm => {
                if(vm.usuarioLogado == false || vm.usuario.role !== 'admin') {
                    vm.$router.push({name: 'login'})
                }
            })
        },

        data () {
            return {
                novoCurso: null
            }
        },

        methods: {
            newCurso() {
                this.$http.post(novoCurso, {nome: this.novoCurso}, {headers: getHeader()})
                        .then((res) => {
                            if(res.status != 401) {
                                this.addCursos(res.body.curso)
                                console.log("Curso adicionado com sucesso")
                            }
                        }, (res) => {
                            console.log("Este curso já existe")
                        })
            },

            removeCurso (id) {
                this.$http.get(removeCurso + id, {headers: getHeader()})
                        .then((res) => {
                            this.deleteCurso(res.body.curso.nome)
                            console.log("Curso removido com sucesso")
                        }, (res) => {
                            console.log("Este curso já foi removido")
                        })
            },

            ...mapActions(['addCursos','deleteCurso','listarCursos'])
        },

        computed: mapState({
            cursos: 'cursos',
            usuario: 'usuario',
            usuarioLogado: 'usuarioLogado'
        })

    }
</script>

<style>
    .list-group-item {
        display: block;
        height: 68px;
    }
</style>
