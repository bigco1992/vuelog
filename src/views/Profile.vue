<template>
  <div class="profile">
    <Modal v-if="modalActive" :modalMessage="modalMessage" v-on:close-modal="closeModal" />
    <div class="container">
      <h2>Acconut Setting</h2>
      <div class="profile-info">
        <div class="initials">{{ this.$store.state.profileInitials }}</div>
        <div class="admin-badge">
          <AdminIcon class="icon" />
          <span>Admin</span>
        </div>
        <div class="input">
          <label for="nickName">NickName : </label>
          <input type="text" id="nickName" v-model="nickName" />
        </div>
        <div class="input">
          <label for="email">Email : </label>
          <input disabled type="text" id="email" v-model="email" />
        </div>
        <button @click="updateProfile">Save Changes</button>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from '../components/Modal.vue';

export default {
  name: 'Profile',
  components: {
    Modal,
  },
  data() {
    return {
      modalMessage: 'Changes were saved!',
      modalActive: null,
    };
  },
  methods: {
    updateProfile() {
      this.$store.dispatch('updateUserSettings');
      this.modalActive = !this.modalActive;
    },
    closeModal() {
      this.modalActive = !this.modalActive;
    },
  },
  computed: {
    nickName: {
      get() {
        return this.$store.state.profileNickName;
      },
      set(payload) {
        this.$store.commit('changeNickName', payload);
      },
    },
    email: {
      get() {
        return this.$store.state.profileEmail;
      },
      set(payload) {
        this.$store.commit('changeEmail', payload);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.profile {
  .container {
    max-width: 1000px;
    padding: 60px 25px;
    h2 {
      text-align: center;
      margin-bottom: 16px;
      font-weight: 300;
      font-size: 32px;
    }
    .profile-info {
      border-radius: 8px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      padding: 32px;
      background-color: #f1f1f1;
      display: flex;
      flex-direction: column;
      max-width: 600px;
      margin: 32px auto;
      .initials {
        position: initial;
        width: 80px;
        height: 80px;
        font-size: 32px;
        background-color: #303030;
        color: #fff;
        display: flex;
        align-self: center;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
      }
      .admin-badge {
        display: flex;
        align-self: center;
        color: #fff;
        font-size: 14px;
        padding: 8px 24px;
        border-radius: 8px;
        background-color: #303030;
        margin: 16px 0;
        text-align: center;
        text-transform: capitalize;
        .icon {
          width: 14px;
          height: auto;
          margin-right: 8px;
        }
      }
      .input {
        margin: 16px 0;
        label {
          font-size: 14px;
          display: block;
          padding-bottom: 6px;
        }
        input {
          width: 100%;
          border: none;
          background-color: #f2f7f6;
          padding: 8px;
          height: 50px;
          @media (min-width: 900px) {
          }
          &:focus {
            outline: none;
          }
        }
      }
      button {
        align-self: center;
      }
    }
  }
}
</style>
