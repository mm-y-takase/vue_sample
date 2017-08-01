/** sample main
*
* @see: https://github.com/sagalbot/vue-sortable/blob/master/vue-sortable.js
*/
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
    });

    genImage = function(rank,id,image_id){
        return {
            id: id,
            image_id: image_id,
            url: '/attachments/252ff274233e3ac057f60325aa92d194e849aae6/store/limit/300/300/a88c0d12bc690ee2263c692f7febc04fe5f2ac9c55112ad593bb0530a0ba/mm_room_img.jpg',
            type: 'other',
            reference: '0bc801061c6c3a903fec3b75a004b25a',
            rank: rank,
            caption: '',
        };
    };

    genImagesData = function(){
        var images = [];
        for (var i = 0; i <= 3; i++) {
            images.push(genImage(i+2,i+22,i+135));
        }
        return images;
    };

    var app6 = new Vue({
        el: '#app6',
        data: {
            dragActiveList: null,
            dragActiveItem: null,
            currentId: null,
            targetId: null,
            isDragging: false,
            images: genImagesData(),
        },
        created : function(){
            this.$on("itemDrag", this.onItemDrag);
            this.$on("listDrag", this.onListDrag);
            this.$on("listDrop", this.onListDrop);
        },
        methods : {
            vDragstart: function(e){
                this.isDragging = true;
                e.dataTransfer.setData('test',e.target);
                console.log('vDragstart',e,this);
            },
            vDragover: function(e){
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                console.log('vDragover',e);
            },
            vDragenter: function(e){
                this.isDragging = false;
                console.log('vDragenter',e);
            },
            vdrop:function(e){
                console.log('vdrop',e);
                debugger;
            }
        }
    });
    Vue.component('draggable');
    Vue.directive('sortable', {
        inserted: function(el, binding, vnode) {
            var arr = binding.value || null;
            var options = {};
            if (arr) {
                options.onUpdate = function(e) {
                  arr.splice(e.newIndex, 0, arr.splice(e.oldIndex, 1)[0]);
                  console.log(0);
                };
            }
            Sortable.create(el, options);
        }
    });

    // vue.draggable test
    var app7 = new Vue({
        el: '#app7',
        data: {
            images: genImagesData(),
        },
        created : function(){
            this.$on("onUpdate", this.onUpdate);
        },
        method: {
            onUpdate:function(e){
                console.log('onUpdate',e);
            },
            checkMove: function(e){
                console.log('checkMove',e);
            },
            endDrag: function(e){
                console.log('endDrag',e);
            },
            startDrag: function(e){
                console.log('startDrag',e);
            },
        }

    });

    // jqueryui + vue
    var app8data = genImagesData()
    var app8 = new Vue({
        el: '#app8',
        data: {
            images: app8data,
        },
        mounted: function(a) {
            var self = this;
            console.log(a)
            $('#sortable').sortable()
            $('#sortable').on('sortupdate',function(e, ui){
                console.log(app8,ui)
                var indexIds = $('#sortable .v-image-rank').map(function(i,$d){
                    var id = $($d).closest('li').find('.v-image-id').text()
                    console.log($d,id)
                    var obj = {
                        id: id,
                        rank: i+2
                    };
                    console.log(obj)
                    return obj
                }).get();
                console.log(indexIds)
                app8.resort(indexIds);
            });
        },
        methods: {
            resort: function(indexIds) {
                var images = app8.$data.images;
                console.log(indexIds,images)
                indexIds.forEach(function(rank,id){
                    console.log(rank,id)
                    var target = images.filter(function(image){
                        return image.id == id;
                    });
                    target.rank = rank;
                    target.id = target.id + 'after'
                });
                images.forEach(function(image,index){
                    var targetData = indexIds.find(function(ids){ return ids.id == image.id});
                    console.log(targetData)
                    image.rank = targetData.rank
                });
            }
        }
    });
};