<template>
  <div class="card contact-card p-3">
    <div>
      <div class="mb-2"><strong>Tên:</strong> {{ contact.name || "-" }}</div>
      <div class="mb-2">
        <strong>E-mail:</strong> {{ contact.email || "-" }}
      </div>
      <div class="mb-2">
        <strong>Điện thoại:</strong> {{ contact.phone || "-" }}
      </div>
      <div class="mb-2">
        <strong>Địa chỉ:</strong> {{ contact.address || "-" }}
      </div>
      <div class="mb-2">
        <strong>Yêu thích:</strong>
        <span v-if="contact.favorite" class="text-danger">
          <i class="fas fa-heart"></i> Có
        </span>
        <span v-else class="text-muted">Không</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContactCard",
  props: {
    contact: { type: Object, required: true },
  },
};
</script>

<style scoped>
.contact-card {
  width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
