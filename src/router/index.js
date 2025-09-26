import { createWebHistory, createRouter } from "vue-router";
import ContactBook from "@/views/ContactBook.vue";
import ContactAdd from "@/views/ContactAdd.vue";
import ContactEdit from "@/views/ContactEdit.vue";

const routes = [
  {
    path: "/",
    name: "contactbook",
    component: ContactBook,
  },
  {
    path: "/contacts",
    name: "contact.book",
    component: ContactBook,
  },
  {
    path: "/contacts/add",
    name: "contact.add",
    component: ContactAdd,
  },
  {
    path: "/contacts/:id/edit",
    name: "contact.edit",
    component: ContactEdit,
    props: true,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
