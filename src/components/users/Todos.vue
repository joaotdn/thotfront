<template>
    <div class="col-sm-12 col-md-10 col-md-offset-1">
        <p>
            <router-link :to="{name: 'novo_usuario'}" class="btn btn-lg btn-success send-projects">Adicionar novo</router-link>
        </p>

        <div class="bs-component">
            <div class="list-group">
                <h3>
                    <a href="#" class="list-group-item active">
                        Professores cadastrados
                    </a>
                </h3>
                <a href="#" class="list-group-item" v-for="usuario in usuarios" v-if="usuario.role !== 'admin'">
                    <i class="fa fa-user"></i> {{ usuario.name }} <small class="text-muted">({{  usuario.email }})</small>
                    <span class="pull-right">
                        <button class="btn btn-default" data-toggle="modal" data-target=".bs-example-modal-lg" @click="getUsuario(usuario.id)"><i class="fa fa-cog"></i> Editar</button>
                    </span>
                </a>
            </div>
        </div>

        <!-- Modal editar professor -->
        <div class="modal bs-example-modal-lg fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel"><i class="fa fa-user"></i> {{ professor.nome }}</h4>
                    </div>
                    <div class="modal-body">
                        <div class="bs-component">
                            <form action="" class="form-horizontal">

                                <div class="form-group">
                                    <label for="inputNome" class="col-lg-2 control-label">Nome</label>
                                    <div class="col-lg-10">
                                        <input type="text" name="name" class="form-control" id="inputNome" placeholder="Nome" v-model="professor.nome" required>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="inputEmail" class="col-lg-2 control-label">Email</label>
                                    <div class="col-lg-10">
                                        <input type="email" name="email" class="form-control" id="inputEmail" placeholder="Email" v-model="professor.email" required>
                                    </div>
                                </div>

                                <!--<div class="form-group">-->
                                    <!--<label for="inputSenha" class="col-lg-2 control-label">Senha</label>-->
                                    <!--<div class="col-lg-10">-->
                                        <!--<input type="password" name="password" class="form-control" id="inputSenha" v-model="professor.password"  placeholder="Senha" required>-->
                                    <!--</div>-->
                                <!--</div>-->

                                <div class="form-group">
                                    <label for="areas" class="col-lg-2 control-label">Área de interesse principal</label>
                                    <div class="col-lg-10">
                                        <select class="form-control" id="areas" v-model="professor.area_p">
                                            <option v-for="area in areas">{{ area }}</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="areas_sec" class="col-lg-2 control-label">Área de interesse secundária</label>
                                    <div class="col-lg-10">
                                        <select class="form-control" id="areas_sec" v-model="professor.area_s">
                                            <option v-for="area in areas">{{ area }}</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-lg-2 control-label">Permissões</label>
                                    <div class="col-lg-10">
                                        <label><input type="radio"  name="permissao" value="professor" v-model="professor.role">Professor</label><br>
                                        <label><input type="radio" name="permissao" value="professor-moderador" v-model="professor.role">Professor moderador</label>
                                    </div>
                                </div>

                                <div class="modal-footer">
                                    <input type="submit" @click="updateUser(professor.id)" class="btn btn-success" data-dismiss="modal" value="Salvar">
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
    import { teacherUrl, getHeader,userUrl } from '../../config'
    import { mapState, mapActions } from 'vuex'

    export default{

        data() {
            return {
                professor: {}
            }
        },

        beforeRouteEnter (to, from, next) {
            next(vm => {
                if(vm.usuarioLogado == false || vm.usuario.role !== 'admin') {
                    vm.$router.push({name: 'login'})
                }

                vm.$http.get(teacherUrl, {headers: getHeader()})
                        .then((res) => {
                            vm.listarUsuarios(res.body.users)
                        }, (res) => {
                            vm.$router.push({name: 'login'})
                        })
            })
        },

        methods: {
            getUsuario(id) {
              this.$http.get(userUrl + '/' + id, {headers: getHeader()})
                      .then((res) => {
                          const professor = {
                              id: res.body.usuario.id,
                              nome: res.body.usuario.name,
                              email: res.body.usuario.email,
                              role: res.body.usuario.role,
                              area_p: res.body.usuario.teachers[0].area_primaria,
                              area_s: res.body.usuario.teachers[0].area_secundaria
                          }
                          this.professor = professor

                      }, (res) => {
                          console.log("erro")
                      })
            },
            updateUser(id) {
                console.log(this.professor)
               this.$http.put(userUrl + '/update/' + id, {

                   id: id,
                   name: this.professor.nome,
                   email: this.professor.email,
                   area_primaria: this.professor.area_p,
                   area_secundaria: this.professor.area_s,
                   role: this.professor.role,

               }, {headers: getHeader()})
                       .then((res) => {

                           console.log(res)
                           this.$router.push({name: 'usuarios'})

                           this.$http.get(teacherUrl, {headers: getHeader()})
                                   .then((res) => {
                                       this.listarUsuarios(res.body.users)
                                   }, (res) => {
                                       this.$router.push({name: 'login'})
                                   })

                       }, (res) => {

                           console.log(res)
                           this.$router.push({name: 'usuarios'})
                       })
            },
            ...mapActions(['listarUsuarios'])
        },
        computed: mapState({
            cursos: 'cursos',
            usuario: 'usuario',
            usuarioLogado: 'usuarioLogado',
            usuarios: 'usuarios',
            areas: 'areas'
        })
    }
</script>

<style>
    .list-group-item {
        height: 68px;
    }
</style>
