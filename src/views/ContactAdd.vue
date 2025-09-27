<template>
  <div class="page">
    <h4>Thêm Liên hệ mới</h4>
    <ContactForm @submit:contact="createContact" />
    <p class="mt-2 text-success" v-if="message">{{ message }}</p>
    <p class="mt-2 text-danger" v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import ContactForm from "@/components/ContactForm.vue";
import ContactService from "@/services/contact.service";

export default {
  name: "ContactAdd",
  components: { ContactForm },
  data() {
    return {
      message: "",
      error: "",
    };
  },
  methods: {
    async createContact(payload) {
      try {
        this.error = "";
        console.log("Creating contact:", payload);
        await ContactService.create(payload);
        this.message = "Thêm liên hệ thành công!";
        setTimeout(() => {
          this.$router.push({ name: "contact.book" });
        }, 1500);
      } catch (error) {
        console.error("Create failed:", error);
        this.error = "Thêm thất bại!";
        this.message = "";
      }
    },
  },
};
</script>

<style scoped>
.page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
</style>
