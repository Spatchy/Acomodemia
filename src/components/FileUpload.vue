<template>
    <div>
        <form @submit.prevent="onSubmit" enctype="multipart/form-data">
            <label>Upload Profile Picture</label><br/>
            <input type="file" ref="file" @change="onSelect"/>
            <button class=" button is-rounded is-primary">Upload</button>
        </form>
        <div>
            <h5>{{message}}</h5>
        </div>
    </div>
</template>
<script>
import AuthService from '@/services/AuthService.js';
export default {
  name: 'FileUpload',
  data() {
    return {
      file: '',
      message: '',
    };
  },
  methods: {
    onSelect() {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      const file = this.$refs.file.files[0];
      this.file = file;
      if (!allowedTypes.includes(file.type)) {
        this.message = 'Only images are allowed!';
      }
      if (file.size > 1500000) {
        this.message = 'Your files is too large! max size is 1.5MB';
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
