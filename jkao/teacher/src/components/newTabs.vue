<template>
    <div class="new-tabs">
        <!-- 动态tabs -->
        <!-- <span v-for="(item,index) in tabsArray" :key="index+'a'" @click="$emit('toTabs',index,item)" :class="active === index ? 'active' : ''" class="new-tabs-child cur-point dis-inline-block">{{item.name}}</span> -->
        <el-tree
            :data="data"
            :props="defaultProps"
            default-expand-all
            ref="tree"
            :default-checked-keys="[3]"
            node-key="id"
            highlight-current
            @node-click="handleNodeClick"
        ></el-tree>
    </div>
</template>

<script>
import {EventBus} from '@/common/bus.js'; 
export default {
    data() {
        return {
            defaultProps: {
                children: "children",
                label: "label"
            },
            key:6,
            msg: ""
        };
    },
    created(){
        this.$nextTick(()=>{
            if(this.$route.query.key){
                this.$refs.tree.setCurrentKey(this.$route.query.key)
            }
            // else {
            //     this.$refs.tree.setCurrentKey(this.key)
            // }
            
        })
    },
    mounted() {
        // if (sessionStorage.getItem("checkNode")) {
        //     this.$refs.tree.setCurrentKey(sessionStorage.getItem("checkNode"));
        // }
        this.$refs.tree.setCurrentKey(this.$route.query.key);
        EventBus.$on("aMsg", msg => {
            this.msg = msg;
            
            this.$refs.tree.setCurrentKey(this.msg)
        });
    },
    watch: {
        key(val) {
            // this.$nextTick(() => {
            //     this.$refs.tree.setCurrentKey(
            //         this.$route.query.key
            //     );
            // });
        }
    },
    methods: {
        handleNodeClick(data) {
            console.log(data.url)
            // this.$router.push(data.url);
            this.key = this.$refs.tree.getCurrentKey();
            // console.log(this.key,'this.key')
           
            // sessionStorage.setItem("checkNode", this.key);
            this.$router.push({
                name:data.url,
                query:{
                    key:this.key
                }
            })
        }
    },
    props: {
        tabsArray: {
            type: Array
        },
        data: {
            type: Array
        },
        active: {
            type: Number,
            default: 1
        },
        level1: {
            type: String,
            default: ""
        },
        level2: {
            type: String,
            default: ""
        },
        level3: {
            type: String,
            default: ""
        },
        level4: {
            type: String,
            default: ""
        },
        level5: {
            type: String,
            default: ""
        },
        level6: {
            type: String,
            default: ""
        },
        level7: {
            type: String,
            default: ""
        }
        // level8: {
        //   type: String,
        //   default: ''
        // }
    }
};
</script>

<style scoped>
/* .new-tabs {
    background-color: #f1f4f6;
    border-bottom: 1px solid #dbe0e5;
    height: 40px;
}
.new-tabs-child {
    width: 90px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    color: #444;
    position: relative;
}
.new-tabs .active {
    background-color: #fff;
}
.new-tabs .active::before {
    content: "";
    display: inline-block;
    width: 90px;
    height: 4px;
    background-color: #e71517;
    position: absolute;
    top: 0;
    left: 0;
} */
.new-tabs {
    width: 268px;
    min-width: 268px;
    height: 750px;
    border: 1px solid #eee;
    overflow: auto;
}
</style>