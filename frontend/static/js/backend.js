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
            if (this.html.length <= 0) {
                alert('HTML 不能为空！')
                return
            }
            axios.post('/extract', {
                html: this.html,
                title_xpath: this.title_xpath,
                author_xpath: this.author_xpath,
                publish_time_xpath: this.publish_time_xpath,
                host: this.host,
                with_body_html: this.with_body_html,
                noise_node_list:this.noise_node_list.split('\n')
            }).then((response) => {
                    result = JSON.stringify(response.data, null, 2)
                    app.extract_result = result
                }).catch(function (error) {
                    console.log(error)
                })
        }
    }
})