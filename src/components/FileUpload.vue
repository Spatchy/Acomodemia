<template>
  <div>
    <form @submit.prevent="onSubmit" enctype="multipart/form-data">
      <div class="field">
        <div class="control is-expanded">
          <label class="label">Upload Profile Picture</label>
          <div class="file has-name is-fullwidth is-primary">
            <label class="file-label">
              <input class="file-input" type="file" ref="file" @change="onSelect" :accept="allowedTypes"/>
              <span class="button file-cta is-rounded">
                <span class="file-icon">
                  <i class="fas fa-upload"></i>
                </span>
                <span class="file-label">
                  Choose a file…
                </span>
              </span>
              <input class="file-name input is-primary is-rounded" type="text" :value="fileName" readonly>
            </label>
          </div>
          <p v-if="message" :class="message=='Uploaded!' ? 'has-text-success' : 'has-text-danger'">{{message}}</p>
        </div>
      </div>
      <div class="field">
        <div class="control is-expanded">
          <button class=" button is-rounded is-primary">Upload</button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import AuthService from '@/services/AuthService.js';
export default {
  name: 'FileUpload',
  data() {
    return {
      file: '',
      fileName: 'No file chosen…',
      message: '',
    };
  },
  methods: {
    onSelect() {
      const allowedTypes = 'image/jpeg, image/jpg, image/png';
      const file = this.$refs.file.files[0];
      this.file = file;
      this.fileName = file.name;
      console.log(file);
      if (!allowedTypes.includes(file.type)) {
        this.message = 'Only images are allowed!';
      }
      if (file.size > 1500000) {
        this.message = 'Your file is too large! max size is 1.5MB';
      }
    },
    async onSubmit() {
      const formData = new FormData();
      formData.append('file', this.file);
      try {
        await AuthService.fileUpload(formData);
        this.message = 'Uploaded!';
      } catch (err) {
        console.log(err);
        this.message = 'Something went wrong';
      }
    },
  },
};
</script>
<style scoped>
span.button{
  width: auto;
}

input.file-name{
  border-width: 2px;
}
</style>
