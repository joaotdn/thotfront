<template>
    <div class="col-sm-12 col-md-10 col-md-offset-1 bs-component" v-if="alocado">

        <div class="bs-component">
            <div class="jumbotron">
                <h3>Olá {{ usuario.nome }}</h3>
                <p>Você já informou à instituição as bancas que você terá disponibidade de examinar. Aguarde o contato do moderador para saber quais bancas foram validadas para você.</p>
                <p>
                    <a class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal"><i class="fa fa-book" aria-hidden="true"></i> Suas bancas</a>
                </p>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel"><i class="fa fa-book" aria-hidden="true"></i> Suas bancas</h4>
                    </div>
                    <div class="modal-body">
                        <div class="bs-component">
                            <ul class="list-group">
                                <li class="list-group-item auto" v-for="projeto in projetos_escolhidos">
                                    <strong>{{ projeto.nome }}</strong> -
                                    <span><i class="fa fa-calendar" aria-hidden="true"></i> {{ convertDate(projeto.data) }}</span> -
                                    <span><i class="fa fa-clock-o" aria-hidden="true"></i> {{ convertTime(projeto.hora) }}</span> -
                                    <span><i class="fa fa-university" aria-hidden="true"></i> Sala: {{ projeto.sala }}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import { userUrl, getProfessor, listaProjetos, getHeader } from '../../config'

    export default{
        data(){
            return{
                bancas_escolhidas: [],
                projetos_escolhidos: [],
                listarBancas: []
            }
        },

        beforeMount (to, from, next) {

            this.$http.get(getProfessor + '/' + this.usuario.id + '/bancas', { headers: getHeader() })
                    .then((res) => {
                        this.bancas_escolhidas = res.body.professor_bancas

                        for (var i = 0; i < this.projetos.length; i++) {
                            var id = this.projetos[i].id

                            for(var j = 0; j < this.bancas_escolhidas.length; j++) {
                                if(id === this.bancas_escolhidas[j].banca)
                                    this.projetos_escolhidos.push(this.projetos[i])
                            }
                        }

                    }, (res) => {
                        console.log(res)
                    })

        },

        methods: {

            convertDate(inputFormat) {
                var str = inputFormat.split('-')
                return str.reverse().join('/')
            },

            convertTime(inputFormat) {
                var str = inputFormat.split(' ')
                str = str[1].substr(0,5)
                return str;
            },

            ordenaDatas(datas) {
                return datas.sort()
            },

            getProjetosBanca () {
                return this.projetos
            }
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
        height: auto
    }
    .block {
        display: block;
    }
</style>
