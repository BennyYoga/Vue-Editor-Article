<template>
    <button>
        <router-link :to="{ name: 'create-article' }">Membuat Article</router-link>
    </button>
    <div class="card" v-for="data in editorData" :key="data.id">
        <span>
            <br>
            <h4>{{ data.title }}</h4>
            <p v-html="data.body"></p>
            <span>{{ dateConversion(data.date) }}</span>
            <router-link :to="{ name: 'edit-article', params: { id: data.id } }" class="btn btn-primary">Edit
            </router-link>
            <button @click="deleteStudent(data.id)"> Delete </button>
            <hr>
        </span>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'listArticle',
    data() {
        return {
            editorData: "",
            article: [],
        }
    },
    mounted() {
        try {
            axios.get("http://localhost:3000/data")
                .then((response) => {
                    this.editorData = response.data
                })
        }
        catch (error) {
            console.log(error.message);
        }

    },
    methods: {
        dateConversion: function (date) {
            const data = date;
            var print = new Date(data);
            print = print.toString().substring(0, 25)
            return print;
        },
        deleteStudent(id) {
            try {
                axios.delete(`http://localhost:3000/data/${id}`)
                    .then(() => {
                        this.editorData = this.editorData.filter(function (dataeditor) {
                            return dataeditor.id !== id
                        })
                    })
            }
            catch (error) {
                console.log("Data Error");
            }
        },
    }
}
</script>