<template>
    <div class="col-sm-12 col-md-10 col-md-offset-1 well bs-component">
        <form class="form-horizontal" @submit.prevent="sendUser">
            <fieldset>
                <legend>Cadastrar professor</legend>
            </fieldset>

            <div class="form-group">
                <label for="inputNome" class="col-lg-2 control-label">Nome</label>
                <div class="col-lg-10">
                    <input type="text" name="name" class="form-control" id="inputNome" placeholder="Nome" v-model="novoUsuario.nome" required>
                </div>
            </div>

            <div class="form-group">
                <label for="inputEmail" class="col-lg-2 control-label">Email</label>
                <div class="col-lg-10">
                    <input type="email" name="email" class="form-control" id="inputEmail" v-model="novoUsuario.email" placeholder="Email"  required>
                </div>
            </div>

            <div class="form-group">
                <label for="inputSenha" class="col-lg-2 control-label">Senha</label>
                <div class="col-lg-10">
                    <input type="password" name="password" class="form-control" id="inputSenha" value="" placeholder="Senha" v-model="novoUsuario.senha" required>
                </div>
            </div>

            <div class="form-group">
                <label for="areas" class="col-lg-2 control-label">Área de interesse principal</label>
                <div class="col-lg-10">
                    <select class="form-control" id="areas" v-model="novoUsuario.areaP">
                        <option v-for="area in areas">{{ area }}</option>
                    </select>
                </div>
            </div>

            <div class="form-group">
                <label for="areas_sec" class="col-lg-2 control-label">Área de interesse secundária</label>
                <div class="col-lg-10">
                    <select class="form-control" id="areas_sec" v-model="novoUsuario.areaS">
                        <option v-for="area in areas">{{ area }}</option>
                    </select>
                </div>
            </div>

            <div class="form-group">
                <label class="col-lg-2 control-label">Permissões</label>
                <div class="col-lg-10">
                    <label><input type="radio"  name="permissao" value="professor" v-model="novoUsuario.permissao">Professor examinador</label><br>
                    <label><input type="radio" name="permissao" value="professor-moderador" v-model="novoUsuario.permissao">Professor moderador</label>
                </div>
            </div>

            <p class="text-right">
                <router-link :to="{name: 'usuarios'}" class="btn btn-default">Cancelar</router-link>
                <button type="submit" class="btn btn-primary">Cadastrar</button>
            </p>
        </form>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import { novoProfessor, getHeader } from '../../config'
    export default {

        beforeRouteEnter (to, from, next) {
            next(vm => {
                if(vm.usuarioLogado == false || vm.usuario.role !== 'admin') {
                    vm.$router.push({name: 'login'})
                }
            })
        },

        data() {
            return {
                novoUsuario: {
                    nome: '',
                    email: '',
                    senha: '',
                    areaP: '',
                    areaS: '',
                    permissao: 'professor'
                }
            }
        },

        methods: {

            sendUser() {

                this.$http.post(novoProfessor, {

                    name: this.novoUsuario.nome,
                    email: this.novoUsuario.email,
                    password: this.novoUsuario.senha,
                    area_primaria: this.novoUsuario.areaP,
                    area_secundaria: this.novoUsuario.areaS,
                    role: this.novoUsuario.permissao

                }, {headers: getHeader()})
                        .then((res) => {
                            console.log('cadastrado com sucesso')
                            this.$router.push({name: 'usuarios'})
                        }, (res) => {
                            console.log(res)
                        })
            }

        },

        computed: mapState({
            cursos: 'cursos',
            usuario: 'usuario',
            usuarioLogado: 'usuarioLogado',
            areas: 'areas'
        })

    }
</script>
