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
        extract_result: '',
        gnelist: false,
        list_sample: ''
    },
    methods: {
        extract: function (event) {
            if (this.html.length <= 0) {
                alert('HTML 不能为空！')
                return
            }
            if (this.noise_node_list.length <= 0){
                noise_node_list = []
            } else {
                noise_node_list = this.noise_node_list.split('\n')
            }
            axios.post('/extract', {
                html: this.html,
                title_xpath: this.title_xpath,
                author_xpath: this.author_xpath,
                publish_time_xpath: this.publish_time_xpath,
                host: this.host,
                with_body_html: this.with_body_html,
                noise_node_list: noise_node_list
            }).then((response) => {
                    result = JSON.stringify(response.data, null, 2).replace('<', '&lt;').replace('>', '&gt;')
                    app.extract_result = result
                }).catch(function (error) {
                    console.log(error)
                })
        },
        switch_to_gne: function (event) {
            this.gnelist = false
        },
        switch_to_gnelist: function (event) {
            this.gnelist = true
        },
        extract_list: function () {
            if (this.html.length <= 0) {
                alert('HTML 不能为空！')
                return
            }
            if (this.list_sample.length <= 0) {
                alert('全自动智能提取即将上线，敬请期待。现在请填写列表中任一一项的标题或者 XPath。')
                return
            }
            axios.post('/extract_list', {
                html: this.html,
                sample: this.list_sample,
            }).then((response) => {
                result = JSON.stringify(response.data, null, 2)
                app.extract_result = result
            }).catch(function (error) {
                console.log(error)
            })
        }

    }
})
