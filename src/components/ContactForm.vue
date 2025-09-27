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

    <!-- Job Selection -->
    <div class="form-group mb-3">
      <label for="job">Nghề nghiệp</label>
      <div class="job-selection">
        <select
          id="job"
          v-model="local.job"
          class="form-control mb-2"
          @change="handleJobChange"
        >
          <option value="">-- Chọn nghề nghiệp --</option>
          <option v-for="job in predefinedJobs" :key="job" :value="job">
            {{ job }}
          </option>
          <option value="custom">Nghề khác (nhập thủ công)</option>
        </select>

        <div v-if="showCustomJobInput" class="mt-2">
          <input
            v-model="customJob"
            type="text"
            class="form-control"
            placeholder="Nhập nghề nghiệp khác..."
            @input="handleCustomJobInput"
          />
        </div>
      </div>
    </div>

    <!-- Hobbies Selection -->
    <div class="form-group mb-3">
      <label>Sở thích</label>
      <div class="hobbies-selection">
        <div class="hobbies-grid mb-2">
          <div
            v-for="hobby in predefinedHobbies"
            :key="hobby"
            class="form-check form-check-inline"
          >
            <input
              :id="'hobby-' + hobby"
              v-model="selectedHobbies"
              :value="hobby"
              type="checkbox"
              class="form-check-input"
            />
            <label :for="'hobby-' + hobby" class="form-check-label">
              {{ hobby }}
            </label>
          </div>
        </div>

        <div class="custom-hobbies mt-3">
          <div class="form-check">
            <input
              id="custom-hobbies-check"
              v-model="enableCustomHobbies"
              type="checkbox"
              class="form-check-input"
            />
            <label for="custom-hobbies-check" class="form-check-label">
              Sở thích khác
            </label>
          </div>

          <div v-if="enableCustomHobbies" class="mt-2">
            <input
              v-model="customHobbiesInput"
              type="text"
              class="form-control"
              placeholder="Nhập sở thích khác (cách nhau bằng dấu phẩy)..."
              @input="handleCustomHobbiesInput"
            />
            <small class="form-text text-muted">
              Ví dụ: Đọc sách, Xem phim, Du lịch
            </small>
          </div>
        </div>
      </div>
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
        job: "",
        hobbies: [],
        favorite: false,
      },
      predefinedJobs: [
        "Giám đốc",
        "Phó giám đốc",
        "Trợ lý",
        "Thư ký",
        "Nhân viên truyền thông",
        "Kế toán",
        "Nhân viên kinh doanh",
        "Lập trình viên",
        "Thiết kế đồ họa",
        "Giáo viên",
        "Bác sĩ",
        "Y tá",
        "Kỹ sư",
        "Luật sư",
        "Nhà báo",
        "Photographer",
        "Marketing",
        "HR",
      ],
      predefinedHobbies: [
        "Bóng đá",
        "Bơi lội",
        "Bóng chuyền",
        "Cầu lông",
        "Chơi nhạc cụ",
        "Hát karaoke",
        "Đọc sách",
        "Xem phim",
        "Du lịch",
        "Nấu ăn",
        "Chụp ảnh",
        "Vẽ tranh",
        "Chơi game",
        "Yoga",
        "Tập gym",
        "Câu cá",
      ],
      selectedHobbies: [],
      customJob: "",
      customHobbiesInput: "",
      showCustomJobInput: false,
      enableCustomHobbies: false,
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
        if (val) {
          this.local = { ...val };
          this.selectedHobbies = Array.isArray(val.hobbies)
            ? [...val.hobbies]
            : [];
          this.updateHobbiesDisplay();
        } else {
          this.resetForm();
        }
      },
    },
    selectedHobbies: {
      deep: true,
      handler(newHobbies) {
        this.local.hobbies = [...newHobbies];
      },
    },
  },
  methods: {
    resetForm() {
      this.local = {
        name: "",
        email: "",
        phone: "",
        address: "",
        job: "",
        hobbies: [],
        favorite: false,
      };
      this.selectedHobbies = [];
      this.customJob = "";
      this.customHobbiesInput = "";
      this.showCustomJobInput = false;
      this.enableCustomHobbies = false;
    },

    handleJobChange() {
      if (this.local.job === "custom") {
        this.showCustomJobInput = true;
        this.local.job = this.customJob;
      } else {
        this.showCustomJobInput = false;
        this.customJob = "";
      }
    },

    handleCustomJobInput() {
      this.local.job = this.customJob;
    },

    handleCustomHobbiesInput() {
      if (this.customHobbiesInput.trim()) {
        const customHobbies = this.customHobbiesInput
          .split(",")
          .map((hobby) => hobby.trim())
          .filter((hobby) => hobby.length > 0);

        // Remove previous custom hobbies and add new ones
        const predefinedSelected = this.selectedHobbies.filter((hobby) =>
          this.predefinedHobbies.includes(hobby)
        );
        this.selectedHobbies = [...predefinedSelected, ...customHobbies];
      } else {
        // Remove custom hobbies if input is empty
        this.selectedHobbies = this.selectedHobbies.filter((hobby) =>
          this.predefinedHobbies.includes(hobby)
        );
      }
    },

    updateHobbiesDisplay() {
      // Separate predefined and custom hobbies for display
      const predefined = this.selectedHobbies.filter((hobby) =>
        this.predefinedHobbies.includes(hobby)
      );
      const custom = this.selectedHobbies.filter(
        (hobby) => !this.predefinedHobbies.includes(hobby)
      );

      if (custom.length > 0) {
        this.enableCustomHobbies = true;
        this.customHobbiesInput = custom.join(", ");
      }
    },

    onSubmit() {
      // Ensure hobbies are properly set and clean
      const cleanHobbies = this.selectedHobbies.filter(
        (hobby) => hobby && hobby.trim() !== ""
      );
      this.local.hobbies = cleanHobbies;

      // Debug log to see what we're sending
      console.log("ContactForm - Submitting data:", this.local);
      console.log("ContactForm - Job:", this.local.job);
      console.log("ContactForm - Hobbies:", this.local.hobbies);

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

.job-selection {
  position: relative;
}

.hobbies-selection {
  border: 1px solid #dee2e6;
  border-radius: 0.375rem;
  padding: 15px;
  background-color: #f8f9fa;
}

.hobbies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 8px;
}

.form-check-inline {
  margin-right: 15px;
  margin-bottom: 8px;
}

.custom-hobbies {
  border-top: 1px solid #dee2e6;
  padding-top: 15px;
}

.form-check-label {
  font-size: 14px;
  cursor: pointer;
}

.form-check-input {
  cursor: pointer;
}

.form-text {
  font-size: 12px;
}
</style>
