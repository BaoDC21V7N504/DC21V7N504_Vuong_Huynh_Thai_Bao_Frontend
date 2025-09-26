<template>
  <div class="page row">
    <!-- Search input -->
    <div class="col-md-10">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Tìm kiếm liên hệ..."
          v-model="searchText"
        />
        <div class="input-group-append">
          <span class="input-group-text">
            <i class="fas fa-search"></i>
          </span>
        </div>
      </div>
    </div>

    <!-- Contact list -->
    <div class="mt-3 col-md-6">
      <h4>
        Danh bạ
        <i class="fas fa-address-book"></i>
      </h4>

      <div v-if="filteredContactsCount > 0" class="contact-list">
        <div
          v-for="(contact, index) in filteredContacts"
          :key="contact._id"
          :class="['contact-item', { active: activeIndex === index }]"
          @click="activeIndex = index"
        >
          <div class="contact-name">{{ contact.name }}</div>
          <div class="contact-email">{{ contact.email }}</div>
          <div class="contact-favorite" v-if="contact.favorite">
            <i class="fas fa-heart text-danger"></i>
          </div>
        </div>
      </div>
      <p v-else>Không có liên hệ nào.</p>

      <div class="mt-3 row justify-content-around align-items-center">
        <button class="btn btn-sm btn-primary" @click="refreshList">
          <i class="fas fa-redo"></i> Làm mới
        </button>
        <button class="btn btn-sm btn-success" @click="goToAddContact">
          <i class="fas fa-plus"></i> Thêm mới
        </button>
        <button class="btn btn-sm btn-danger" @click="removeAllContacts">
          <i class="fas fa-trash"></i> Xóa tất cả
        </button>
      </div>
    </div>

    <!-- Contact details -->
    <div class="mt-3 col-md-6" v-if="activeContact">
      <h4>
        Chi tiết Liên hệ
        <i class="fas fa-address-card"></i>
      </h4>
      <ContactCard :contact="activeContact" />
      <div class="mt-2">
        <router-link
          :to="{ name: 'contact.edit', params: { id: activeContact._id } }"
          class="btn btn-sm btn-outline-primary"
        >
          <i class="fas fa-edit"></i> Sửa / Xóa
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import ContactCard from "@/components/ContactCard.vue";
import ContactService from "@/services/contact.service";

export default {
  components: {
    ContactCard,
  },
  data() {
    return {
      contacts: [],
      activeIndex: -1,
      searchText: "",
    };
  },
  watch: {
    searchText() {
      this.activeIndex = -1;
    },
  },
  computed: {
    contactStrings() {
      return this.contacts.map((contact) => {
        const { name, email, address, phone } = contact;
        return [name, email, address, phone].join("").toLowerCase();
      });
    },
    filteredContacts() {
      if (!this.searchText) return this.contacts;
      const keyword = this.searchText.toLowerCase();
      return this.contacts.filter((_c, index) =>
        this.contactStrings[index].includes(keyword)
      );
    },
    activeContact() {
      if (this.activeIndex < 0) return null;
      return this.filteredContacts[this.activeIndex];
    },
    filteredContactsCount() {
      return this.filteredContacts.length;
    },
  },
  methods: {
    async retrieveContacts() {
      try {
        this.contacts = await ContactService.getAll();
      } catch (error) {
        console.error("Error retrieving contacts:", error);
      }
    },
    refreshList() {
      this.retrieveContacts();
      this.activeIndex = -1;
    },
    async removeAllContacts() {
      if (confirm("Bạn muốn xóa tất cả Liên hệ?")) {
        try {
          await ContactService.deleteAll();
          this.refreshList();
          alert("Đã xóa tất cả liên hệ thành công!");
        } catch (error) {
          console.error("Error deleting all contacts:", error);
          alert("Xóa tất cả thất bại!");
        }
      }
    },
    goToAddContact() {
      this.$router.push({ name: "contact.add" });
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script>

<style scoped>
.page {
  text-align: left;
  max-width: 750px;
}

.contact-list {
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
}

.contact-item {
  padding: 10px;
  border-bottom: 1px solid #dee2e6;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.contact-item:hover {
  background-color: #f8f9fa;
}

.contact-item.active {
  background-color: #007bff;
  color: white;
}

.contact-item:last-child {
  border-bottom: none;
}

.contact-name {
  font-weight: bold;
  margin-bottom: 2px;
}

.contact-email {
  font-size: 0.9em;
  color: #6c757d;
}

.contact-item.active .contact-email {
  color: #e9ecef;
}
</style>
