<template>
    <div class="col-sm-12 col-md-10 col-md-offset-1 bs-component" v-if="!alocado">
        <!--
        Quando o usuário não submeter suas bancas
        -->
        <h3><i class="fa fa-user fa-md"></i> Olá, {{ usuario.nome }}</h3>
        <p class="lead">Confira abaixo as datas com projetos relacionados a sua área para compor sua(s) banca(s)</p>
        <hr>

        <div class="bs-component">

            <div class="bs-component">
                <div class="list-group">
                    <label class="list-group-item auto" v-for="banca in projetosData">
                        <span class="badge">{{ getCountBancas(banca) }}</span>
                            <input type="checkbox" v-model="selecionadas" :value="banca">
                            <i class="fa fa-calendar fa-md"></i> <strong>{{ convertDate(banca) }}</strong>
                        <hr>

                        <span v-for="proj in getBancasData(banca)">
                            <span class="block">
                                <i class="fa fa-clock-o" aria-hidden="true"></i>
                                {{ convertTime(proj.hora) }} - {{ proj.nome }}
                            </span>
                        </span>
                    </label>
                </div>
            </div>

        </div>

        <p class="bs-component">
            <a href="#" class="btn btn-success btn-lg btn-block" @click="enviaDatas">Enviar</a>
        </p>

        <!--
        Bancas para o professor moderador validar

        colocar pra organizar pelos titulo, data, hora
        -->

    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import { userUrl, getHeader } from '../../config'

    export default {
        data () {
            return {
                projetosUsuario: [],
                projetosData: [],
                selecionadas: [],
                alocado: true
            }
        },

        beforeMount () {

            this.$http.get(userUrl + '/' + this.usuario.id + '/alocado', { headers: getHeader() })
                    .then((res) => {
                        const checar = res.body

                        if(checar.msg === "checked") {
                            this.alocado = true
                            this.$router.push({ name: 'bancas_enviadas', params: { datas: checar.datas.datas_disponiveis } })
                        } else {
                            this.alocado = false
                        }

                    }, (res) => {
                        console.log(res)
                    })

            this.$http.get(userUrl + '/' + this.usuario.id + '/bancas', { headers: getHeader() })
                    .then((res) => {
                        this.projetosUsuario = res.body
                        for(var i = 0; i < this.projetosUsuario.length; i++) {
                            if(this.projetosData.indexOf(this.projetosUsuario[i].data) === -1) {
                                this.projetosData.push(this.projetosUsuario[i].data)
                            }
                        }
                        this.ordenaDatas(this.projetosData)
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

            convertTime(inputFormat) {
                var str = inputFormat.split(' ')
                str = str[1].substr(0,5)
                return str;
            },

            ordenaDatas(datas) {
                return datas.sort()
            },

            enviaDatas() {
                if(this.selecionadas.length > 0) {
                    const obj = {
                        datas_disponiveis: this.selecionadas,
                        professor_id: this.usuario.id
                    }

                    this.$http.post(userUrl + '/' + this.usuario.id + '/bancas/enviar', obj,{ headers: getHeader() })
                            .then((res) => {
                                console.log(res)
                                this.alocado = true
                                this.$router.push({ name: 'bancas_enviadas' })
                            }, (res) => {
                                console.log(res)
                                this.alocado = false
                            })
                } else {
                    alert('Selecione pelo menos uma data')
                }
            }
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
    label {
        cursor: pointer;
    }
</style>
