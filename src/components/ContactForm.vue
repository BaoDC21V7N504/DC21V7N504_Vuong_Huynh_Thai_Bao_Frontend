<template>
  <form @submit.prevent="onSubmit" class="contact-form">
    <div class="form-group mb-3">
      <label for="name">Tên</label>
      <input
        id="name"
        v-model="local.name"
        type="text"
        class="form-control"
        required
      />
    </div>

    <div class="form-group mb-3">
      <label for="email">E-mail</label>
      <input
        id="email"
        v-model="local.email"
        type="email"
        class="form-control"
      />
    </div>

    <div class="form-group mb-3">
      <label for="phone">Điện thoại</label>
      <input id="phone" v-model="local.phone" type="tel" class="form-control" />
    </div>

    <div class="form-group mb-3">
      <label for="address">Địa chỉ</label>
      <input
        id="address"
        v-model="local.address"
        type="text"
        class="form-control"
      />
    </div>

    <div class="form-group form-check mb-3">
      <input
        id="favorite"
        v-model="local.favorite"
        type="checkbox"
        class="form-check-input"
      />
      <label for="favorite" class="form-check-label">Yêu thích</label>
    </div>

    <div class="form-actions">
      <button type="submit" class="btn btn-primary">
        {{ isEdit ? "Cập nhật" : "Thêm" }}
      </button>
      <button
        v-if="isEdit"
        type="button"
        class="btn btn-danger ms-2"
        @click="$emit('delete:contact', local)"
      >
        Xóa
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "ContactForm",
  emits: ["submit:contact", "delete:contact"],
  props: {
    contact: { type: Object, default: null },
  },
  data() {
    return {
      local: {
        name: "",
        email: "",
        phone: "",
        address: "",
        favorite: false,
      },
    };
  },
  computed: {
    isEdit() {
      return !!(this.contact && this.contact._id);
    },
  },
  watch: {
    contact: {
      immediate: true,
      handler(val) {
        if (val) this.local = { ...val };
        else
          this.local = {
            name: "",
            email: "",
            phone: "",
            address: "",
            favorite: false,
          };
      },
    },
  },
  methods: {
    onSubmit() {
      this.$emit("submit:contact", { ...this.local });
    },
  },
};
</script>

<style scoped>
.contact-form {
  max-width: 700px;
}
.form-actions {
  margin-top: 12px;
  display: flex;
  gap: 8px;
}
</style>
