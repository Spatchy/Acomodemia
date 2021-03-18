<template>
<div class="wrapper">
  <img :src="src" alt="" width="300" height="300">
  <div class="overlay" v-if="showOverlay">
    <h6 class="subtitle is-6 has-text-white">Please upload your image (<span v-if="$isMobile()">Tap</span><span v-else>hover</span> to preview)</h6>
  </div>
</div>
</template>

<script>
import AuthService from '@/services/AuthService.js';
export default {
  data() {
    // empty image
    return {
      src: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      showOverlay: false,
      isDefault: false,
    };
  },
  async created() {
    const response = await AuthService.getProfilePic();
    console.log(response);
    console.log(response.image);
    console.log(response.isDefault);
    const bytes = new Uint8Array(response.image.data);
    this.isDefault = response.isDefault;
    this.$emit('tipState', this.isDefault);
    console.log('bytes: ' + bytes);
    const binary = bytes.reduce((data, b) => data += String.fromCharCode(b), '');
    console.log('bin: ' + binary);
    this.src = 'data:image/jpeg;base64,' + btoa(binary);
  },
  methods: {
    getPic: function() {
      return this.src;
    },
    async refreshImage(blob) {
      console.log(blob);
      const toBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
      this.src = await toBase64(blob);
      this.showOverlay = true;
    },
    async successfulUpload() {
      this.showOverlay = false;
      this.isDefault = false;
      this.$emit('tipState', false);
    },
  },
};
</script>
<style scoped>
.overlay {
  position: absolute;
  display: flex;
  bottom: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  color: #f1f1f1;
  width: 100%;
  transition: .5s ease;
  opacity:1;
  color: white;
  font-size: 20px;
  padding: 20px;
  text-align: center;
  align-items: center;
}
.wrapper:hover .overlay {
  opacity: 0;
}
</style>
