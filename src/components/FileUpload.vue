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

    <!--Image cropping modal-->
    <div :class="['modal', modalClass]">
      <div class="modal-background" @click="cancelUpload()"></div>
      <div class="modal-content">
        <div>
          <img :src="formattedPhoto" alt="Crop your photo" id="cropImage" ref="cropImage">
        </div>
      </div>
      <div class="modal-content has-overflow">
        <div class="box">
          <div class="level">
            <div class="level-item">
              <button class="button is-primary is-rounded" ref="savebtn">Save</button>
            </div>
          </div>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close" @click="cancelUpload()"></button>
    </div>
  </div>
</template>
<script>
import AuthService from '@/services/AuthService.js';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
export default {
  name: 'FileUpload',
  data() {
    return {
      file: '',
      fileName: 'No file chosen…',
      message: '',
      modalClass: '',
      formattedPhoto: '',
      cropper: null,
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
      } else if (file.size > 1500000) {
        this.message = 'Your file is too large! max size is 1.5MB';
      } else {
        this.message = ''; // reset message

        // image cropping stuff
        this.modalClass = 'is-active';
        try {
          const reader = new FileReader();
          reader.readAsDataURL(this.file);
          const refThis = this; // keep a reference to this for the onload function
          reader.onload = function() {
            refThis.formattedPhoto = reader.result;
            setTimeout(function() {
              refThis.cropper = new Cropper(refThis.$refs.cropImage, {
                aspectRatio: 1 / 1,
                viewMode: 3,
                dragMode: 'move',
                ready() {
                  refThis.$refs.savebtn.addEventListener('click', function() {
                    refThis.cropper.getCroppedCanvas({
                      width: 300,
                      height: 300,
                    }).toBlob(function(blob) {
                      refThis.file = blob;
                      refThis.fileName = 'Ready for upload';
                      refThis.modalClass = '';
                    });
                  });
                },
              });
            }, 10);
          };
        } catch (err) {
          console.error(err);
        }
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
    cancelUpload() {
      try {
        this.cropper.destroy();
      } catch (error) {
        console.warn(error);
      }
      this.file = '';
      this.$refs.file.value = '';
      this.fileName = 'No file chosen…';
      this.modalClass = ''; // This needs to stay last
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
img{
  object-fit: contain;
  max-width: 100%;
}
.box{
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.has-overflow{
  overflow: visible;
}
</style>
