<template>
  <div class="post-view" v-if="currentBlog">
    <div class="container quillWrapper">
      <h2>{{ this.currentBlog[0].title }}</h2>
      <h4>
        posted on:
        {{ this.format(this.currentBlog[0].writedDate) }}
      </h4>
      <img :src="this.currentBlog[0].blogCoverPhoto" alt="" />
      <div class="post-content ql-editor" v-html="this.currentBlog[0].contents"></div>
    </div>
  </div>
</template>

<script>
import { format } from 'timeago.js';

export default {
  name: 'ViewBlog',
  data() {
    return {
      currentBlog: null,
      format,
    };
  },
  async mounted() {
    this.currentBlog = await this.$store.state.blogPosts.filter(post => {
      return post.postNo == this.$route.params.uid;
    });
  },
  computed: {
    getCurrentBlog() {
      return this.currentBlog;
    },
  },
};
</script>

<style lang="scss">
.post-view {
  h4 {
    font-weight: 400;
    font-size: 14px;
    margin-bottom: 24px;
  }
}
</style>
