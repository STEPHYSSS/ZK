<template>
  <div>
    <!-- <pdf ref="pdf" :src="data.url" v-if="data.type === 'pdf'"></pdf> -->
    <!-- <video v-if="data.type === 'video'" :src="data.url" autoplay controls></video> -->
    <!-- <pdf ref="pdf" src="http://192.168.1.120:8081/38aade6082398fffd758eca94e1d2480.pdf" v-if="data.courseware_format === '1'"></pdf> -->
    <!-- <video v-if="data.video_format === '1'" :src="data.url" autoplay controls></video> -->
    <!-- <video v-if="data.video_format === '.video'" src="http://192.168.1.120:8081/04f60bd532867f5b404f8aaf8d83be70.mp4" autoplay controls></video> -->
  </div>
</template>

<script>
import pdf from 'vue-pdf';

export default {
  name: 'priview',
  components: {
    pdf,
  },
  data() {
    return {
    };
  },
  computed: {
    data() {
      return this.$route.query;
    },
  },
  created() {
    // this.data = JSON.parse(window.localStorage.getItem('pdf'));
    // console.log(JSON.parse(window.localStorage.getItem('pdf')));
  },
};
</script>
