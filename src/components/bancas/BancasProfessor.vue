<template>
    <div class="col-sm-12 col-md-10 col-md-offset-1 bs-component">
        <!--
        Quando o usuário já estiver submetido as bancas
        -->
        <div class="bs-component">
            <div class="jumbotron">
                <h3>Olá {{ usuario.nome }}</h3>
                <p>Você já informou à instituição as datas que você terá disponibidade de compor uma banca na(s) área(s) de seu interesse. Aguarde o contato do moderador para saber quais bancas foram validadas para você.</p>
                <p>
                    <a class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal"><i class="fa  fa-calendar-check-o"></i> Suas datas</a>
                </p>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">Suas datas</h4>
                    </div>
                    <div class="modal-body">
                        <div class="bs-component">
                            <ul class="list-group">
                                <li class="list-group-item auto" v-for="data in datas_disponiveis">
                                    <span class="badge">{{ getCountBancas(data) }}</span>
                                    <i class="fa fa-calendar-check-o fa-md"></i> <strong>{{ convertDate(data) }}</strong><hr>

                                    <span v-for="proj in getBancasData(data)">
                                        <span class="block">
                                            <i class="fa fa-clock-o" aria-hidden="true"></i>
                                            {{ convertTime(proj.hora) }} - {{ proj.nome }}
                                        </span>
                                    </span>
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
    import { userUrl, getHeader } from '../../config'

    export default{
        data(){
            return{
                datas_disponiveis: []
            }
        },

        beforeMount (to, from, next) {
            this.$http.get(userUrl + '/' + this.usuario.id + '/alocado', { headers: getHeader() })
                    .then((res) => {
                        const checar = res.body

                        if(checar.msg === "checked") {
                            this.datas_disponiveis = checar.datas.datas_disponiveis
                        } else {
                            this.alocado = false
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

            getCountBancas(data) {
                var arr = 0
                for (var i = 0; i < this.projetos.length; i++) {
                    if(this.projetos[i].data === data)
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

                for (var i = 0; i < this.projetos.length; i++) {
                    if(this.projetos[i].data === data)
                        arr.push(this.projetos[i])
                }

                return this.ordenaDatas(arr)
            },

            convertTime(inputFormat) {
                var str = inputFormat.split(' ')
                str = str[1].substr(0,5)
                return str;
            },

            ordenaDatas(datas) {
                return datas.sort()
            },
        },

        computed: mapState({
            usuario: 'usuario',
            usuarioLogado: 'usuarioLogado',
            projetos: 'projetos'
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
