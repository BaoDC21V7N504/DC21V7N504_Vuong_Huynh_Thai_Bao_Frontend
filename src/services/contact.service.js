import createApiClient from "./api.service";

class ContactService {
  constructor(baseUrl = "http://localhost:3000/api/contacts") {
    this.api = createApiClient(baseUrl);
  }

  async getAll() {
    try {
      console.log("Fetching all contacts");
      const response = await this.api.get("/");
      return response.data;
    } catch (error) {
      console.error("Error fetching all contacts:", error);
      throw error;
    }
  }

  async create(data) {
    try {
      console.log("Creating contact with data:", data);
      const response = await this.api.post("/", data);
      return response.data;
    } catch (error) {
      console.error("Error creating contact:", error);
      throw error;
    }
  }

  async deleteAll() {
    try {
      console.log("Deleting all contacts");
      const response = await this.api.delete("/");
      return response.data;
    } catch (error) {
      console.error("Error deleting all contacts:", error);
      throw error;
    }
  }

  async get(id) {
    try {
      console.log("Fetching contact with ID:", id);
      const response = await this.api.get(`/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching contact with ID ${id}:`, error);
      throw error;
    }
  }

  async update(id, data) {
    try {
      console.log("Updating contact with ID:", id, "Data:", data);
      const response = await this.api.put(`/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating contact with ID ${id}:`, error);
      throw error;
    }
  }

  async delete(id) {
    try {
      console.log("Deleting contact with ID:", id);
      const response = await this.api.delete(`/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting contact with ID ${id}:`, error);
      throw error;
    }
  }
}

export default new ContactService();
