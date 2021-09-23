<template>
  <div class="form-wrap">
    <form class="register">
      <p class="login-register">
        Already have an account?
        <router-link class="router-link" :to="{ name: 'Login' }">Login</router-link>
      </p>
      <h2>Create Your Vuelog Account</h2>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="Email" v-model="email" />
          <icon name="envelope" class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="NickName" v-model="nickName" />
          <icon name="user" class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="Password" v-model="password" />
          <icon name="lock" class="icon" />
        </div>
        <div v-show="error" class="error">{{ this.errorMsg }}</div>
      </div>
      <button @click.prevent="registerUser">Sign Up</button>
      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Register',
  data() {
    return {
      email: '',
      nickName: '',
      password: '',
      error: null,
      errorMsg: '',
    };
  },
  methods: {
    // async register() {
    //   if (this.email !== '' && this.password !== '' && this.nickName !== '') {
    //     this.error = false;
    //     this.errorMsg = '';
    //     const firebaseAuth = await firebase.auth();
    //     const createUser = await firebaseAuth.createUserWithEmailAndPassword(
    //       this.email,
    //       this.password,
    //     );
    //     const result = await createUser;
    //     const dataBase = db.collection('users').doc(result.user.uid);
    //     await dataBase.set({
    //       email: this.email,
    //       nickName: this.nickName,
    //       password: this.password,
    //     });
    //     this.$router.push({ name: 'Home' });
    //     return;
    //   }
    //   this.error = true;
    //   this.errorMsg = 'Please fill out all the fields!';
    //   return;
    // },
    async registerUser() {
      if (this.email !== '' && this.password !== '' && this.nickName !== '') {
        this.error = false;
        this.errorMsg = '';

        await axios.post(`${process.env.VUE_APP_API_URL}/auth/register`, {
          email: this.email,
          nickName: this.nickName,
          password: this.password,
        });
        this.$router.push({ name: 'Home' });
        return;
      }
      this.error = true;
      this.errorMsg = '가입 정보를 입력해주세요!';
      return;
    },
  },
};
</script>

<style lang="scss" scoped>
.register {
  h2 {
    max-width: 350px;
  }
}
</style>
