<template>
    <section>
        <div id="aaa">{{age}}</div>
        <input v-if="name=='asp'" v-model="age"/>
    </section>
</template>

<script>
    import $ from 'jquery'

    export default {
        data(){
            return {
                name: "asp",
                age: 22
            }
        },
        created: function () {

        }
    }

</script>