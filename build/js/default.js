window.onload = function(){
    var app = new Vue({
        el: "#app",
        data: {
            message: 'hello Vue!'
        }
    });

    var app2 = new Vue({
        el: '#app2',
        data: {
            message: 'testestest' + new Date()
        }
    });

    var app3 = new Vue({
        el: '#app3',
        data: {
            show: true,
            hide: false,
        }
    });

    var app4 = new Vue({
        el: '#app4',
        data: {
            todos: [{
                text: 'text1',
            },{
                text: 'text12',
            },{
                text: 'text123',
            }],
        },
    });

    var app5 = new Vue({
        el: '#app5',
        data: {message: 'hogehogehoge-ge'},
        methods: {
            reverseMessage: function() {
                this.message = this.message.split('').reverse().join().replace(/,/g,'');
            }
        }
    })
}