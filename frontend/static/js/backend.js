var app = new Vue({
    el: '#app',
    data: {
        html: '',
        title_xpath: '',
        author_xpath: '',
        publish_time_xpath: '',
        host: '',
        with_body_html: false,
        noise_node_list: [],
        extract_result: ''
    },
    methods: {
        extract: function (event) {
            axios.post('/extract', {
                html: this.html,
                title_xpath: this.title_xpath,
                author_xpath: this.author_xpath,
                publish_time_xpath: this.publish_time_xpath,
                host: this.host,
                with_body_html: this.with_body_html,
                noise_node_list:this.noise_node_list
            })
                .then(function (response) {
                    this.extract_result = response.toString()
                })
                .catch(function (error) {
                    console.log(error)
                })
        }
    }
})