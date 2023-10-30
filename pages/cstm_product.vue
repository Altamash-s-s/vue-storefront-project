<template>
  <div>
    <ul v-if="posts && posts.length">
      <li v-for="post of posts">
        <p><strong>{{post.slug}}</strong></p>
      </li>
    </ul>

    <ul v-if="errors && errors.length">
      <li v-for="error of errors">
        {{error.message}}
      </li>
    </ul>
  </div>
</template>

<script  lang="ts" type="module">

  import axios from 'axios';

  export default {

    name: 'cstm_product',

    data() {
        return {
        posts: [],
        errors: []
        }
    },
    // Fetches posts when the component is created.
    created() {
        axios.get(`https://phpstack-725513-2688800.cloudwaysapps.com/cms/wp-json/wp/v2/parks/`)
        .then(response => {
        // JSON responses are automatically parsed.
        this.posts = response.data
        })
        .catch(e => {
        this.errors.push(e)
        })
    }

  }

</script>