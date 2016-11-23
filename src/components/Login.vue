<template>
    <div class="container">
        <div class="row">
            <div id="form-login" class="col-sm-12 col-md-6 col-md-push-3">
                <figure>
                    <img src="src/assets/logo.png">
                </figure>
                <div class="panel panel-default">
                    <div class="panel-heading"><strong>Login</strong></div>
                    <div class="panel-body">
                        <form @submit.prevent="signin">
                            <div class="form-group">
                                <label for="user_email">E-mail</label>
                                <input type="email" id="user_email" class="form-control" v-model="usuario" placeholder="E-mail">
                            </div>

                            <div class="form-group">
                                <label for="user_pass">Senha</label>
                                <input type="password" id="user_pass" class="form-control" v-model="senha" placeholder="Senha">
                            </div>

                            <button type="submit" :disabled="usuario === '' || senha === ''" class="btn btn-primary">Enviar</button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    import { loginUrl, userUrl, getHeader } from  '../config'

    export default {

        data() {
            return {
                usuario: '',
                senha: ''
            }
        },

        methods: {

            signin() {
                this.$http.post(loginUrl, { email: this.usuario, password: this.senha })
                        .then((res) => {

                            //Definir um token para a sessão
                            const userToken = res.body.token
                            window.localStorage.setItem('id_token', userToken)
                            this.$router.push({name: 'painel'})

                            //Definir o usuário no estado da aplicação
                            this.$http.get(userUrl, {headers: getHeader()})
                                    .then((res) => {
                                        const usuario = {
                                            nome: res.body.user.name,
                                            email: res.body.user.email,
                                            id: res.body.user.id,
                                            role: res.body.user.role,
                                            area_primaria: res.body.user.area_primaria,
                                        }
                                        this.atualizarUsuario(usuario)
                                        this.logarUsuario(true)

                                    }, (res) => {
                                        this.$router.push({name: 'login'})
                                        console.log('erro')
                                    })

                        }, (res) => {
                            /**
                             * Usuário inválido
                             */
                            this.$router.push({name: 'login'})
                        })
            },

            ...mapActions(['atualizarUsuario','logarUsuario'])
        }

    }
</script>

<style>
    #form-login {
        -webkit-transform: translateY(50%);
        -moz-transform: translateY(50%);
        -ms-transform: translateY(50%);
        -o-transform: translateY(50%);
        transform: translateY(50%);
    }

    #form-login figure {
        text-align: center;
        margin-bottom: 30px;
    }
</style>
