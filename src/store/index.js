import { createStore } from 'vuex';
import firebase from 'firebase/app';
import 'firebase/auth';
import db from '../firebase/firebaseInit.js';
import axios from 'axios';
import {
  saveAuthToCookie,
  saveUserToCookie,
  getUserFromCookie,
  deleteCookie,
  saveUserNickNameToCookie,
} from '../utils/cookies.js';

export default createStore({
  state: {
    blogPosts: [],
    postLoaded: null,
    blogHTML: '',
    blogTitle: '',
    blogPhotoName: '',
    blogPhotoFileURL: null,
    blogPhotoPreview: null,
    editPost: null,
    user: null,
    profileEmail: null,
    profileNickName: null,
    profileId: null,
    profileInitials: null,
    userEmail: null,
    userNickName: null,
  },
  getters: {
    blogPostsFeed(state) {
      return state.blogPosts.slice(0, 2);
    },
    blogPostsCards(state) {
      return state.blogPosts.slice(2, 6);
    },
  },
  mutations: {
    newBlogPost(state, payload) {
      state.blogHTML = payload;
    },
    updateBlogTilte(state, payload) {
      state.blogTitle = payload;
    },
    fileNameChange(state, payload) {
      state.blogPhotoName = payload;
    },
    createFileURL(state, payload) {
      state.blogPhotoFileURL = payload;
    },
    openPhotoPreview(state) {
      state.blogPhotoPreview = !state.blogPhotoPreview;
    },
    toggleEditPost(state, payload) {
      state.editPost = payload;
    },
    setBlogState(state, payload) {
      state.blogTitle = payload.title;
      state.blogHTML = payload.contents;
      state.blogPhotoFileURL = payload.blogCoverPhoto;
      state.blogPhotoName = payload.blogCoverPhotoName;
    },
    filterBlogPost(state, payload) {
      state.blogPosts = state.blogPosts.filter(post => post.postNo !== payload);
    },
    updateUser(state, payload) {
      state.user = payload;
    },
    setProfileInfo(state, doc) {
      state.profileId = doc.id;
      state.profileEmail = doc.data().email;
      state.profileNickName = doc.data().nickName;
    },
    setProfileInitials(state) {
      state.profileInitials = state.profileNickName.match(/(\b\S)?/g).join('');
    },
    changeNickName(state, payload) {
      state.profileNickName = payload;
    },
    logoutUser(state) {
      state.userEmail = null;
      state.userNickName = null;
      deleteCookie('til_auth');
      deleteCookie('til_userNickName');
      deleteCookie('til_user');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userNickName');
    },
  },
  actions: {
    async updatePost({ commit, dispatch }, payload) {
      commit('filterBlogPost', payload);
      await dispatch('getPost');
    },
    async deletePost({ commit }, payload) {
      await axios.delete(`${process.env.VUE_APP_API_URL}/post/delete/${payload}`);
      commit('filterBlogPost', payload);
    },
    async updateUserSettings({ commit, state }) {
      const dataBase = await db.collection('users').doc(state.profileId);
      await dataBase.update({
        nickName: state.profileNickName,
      });
      commit('setProfileInitials');
    },
    async getPost({ state }) {
      const response = await axios.get(`${process.env.VUE_APP_API_URL}/post`);
      state.blogPosts = response.data;
      state.postLoaded = true;
    },
    loginUser({ state }, data) {
      console.log(data);
      localStorage.setItem('userEmail', data.email);
      localStorage.setItem('userNickName', data.nickName);
      saveUserToCookie(data.email);
      saveUserNickNameToCookie(data.nickName);
      state.userEmail = data.email;
      state.userNickName = data.nickName;
      state.user = data.email;
    },
    getCurrentAuth({ state }) {
      const userEmail = localStorage.getItem('userEmail');
      const userNickName = localStorage.getItem('userNickName');
      state.user = userEmail;
      state.userEmail = userEmail;
      state.userNickName = userNickName;
      state.profileEmail = userEmail;
      state.profileNickName = userNickName;
      // state.profileInitials = userNickName.match(/(\b\S)?/g).join('');
    },
  },
  modules: {},
});
