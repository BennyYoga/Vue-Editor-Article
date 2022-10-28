
import { createRouter,createWebHistory } from 'vue-router'

import CreateArticle from "@/components/CreateArticle.vue"
import EditArticle from "@/components/EditArticle.vue"
import ListArticle from "@/components/ListArticle.vue"

const routes = [
    {
        name: 'list-article',
        path: '/',
        component: ListArticle
    },
    {
        name: 'create-article',
        path: '/article/create',
        component: CreateArticle
    },
    {
        name: 'edit-article',
        path: '/article/edit/:id',
        component: EditArticle
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
  });

export default router
