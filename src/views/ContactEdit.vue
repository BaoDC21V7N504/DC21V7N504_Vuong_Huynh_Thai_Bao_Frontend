<template>
  <div class="page">
    <h4>Hiệu chỉnh Liên hệ</h4>
    <div v-if="loading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <ContactForm
      v-else-if="contact"
      :contact="contact"
      @submit:contact="updateContact"
      @delete:contact="deleteContact"
    />
    <div v-else class="alert alert-danger">Không tìm thấy liên hệ!</div>
    <p class="mt-2 text-success" v-if="message">{{ message }}</p>
    <p class="mt-2 text-danger" v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import ContactForm from "@/components/ContactForm.vue";
import ContactService from "@/services/contact.service";

export default {
  name: "ContactEdit",
  components: { ContactForm },
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      contact: null,
      message: "",
      error: "",
      loading: true,
    };
  },
  async created() {
    await this.loadContact();
  },
  methods: {
    async loadContact() {
      try {
        this.loading = true;
        this.error = "";
        console.log("Loading contact with ID:", this.id);
        this.contact = await ContactService.get(this.id);
        console.log("Loaded contact:", this.contact);
      } catch (err) {
        console.error("Failed to load contact:", err);
        this.error = "Không thể tải thông tin liên hệ!";
        this.contact = null;
      } finally {
        this.loading = false;
      }
    },
    async updateContact(updated) {
      try {
        this.error = "";
        console.log("Updating contact:", updated);
        await ContactService.update(this.id, updated);
        this.message = "Cập nhật thành công!";
        setTimeout(() => {
          this.$router.push({ name: "contact.book" });
        }, 1500);
      } catch (err) {
        console.error("Update failed:", err);
        this.error = "Cập nhật thất bại!";
        this.message = "";
      }
    },
    async deleteContact() {
      if (!confirm("Bạn có chắc muốn xóa liên hệ này?")) return;
      try {
        this.error = "";
        console.log("Deleting contact with ID:", this.id);
        await ContactService.delete(this.id);
        this.message = "Xóa thành công!";
        setTimeout(() => {
          this.$router.push({ name: "contact.book" });
        }, 1500);
      } catch (err) {
        console.error("Delete failed:", err);
        this.error = "Xóa thất bại!";
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
