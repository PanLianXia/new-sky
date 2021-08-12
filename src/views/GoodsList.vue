<template>
    <el-card class="page-content" :class="filterIsCollapse ? 'filter-is-collapse' : ''">
        <div class="filter-content">
            <el-row type="flex" justify="end" style="flex-wrap: wrap; flex-direction: row">
                <el-col :xs="10" :sm="12" :md="14" :lg="17" :xl="19">
                    <el-input class="filter-item filter-input" size="small" placeholder="请输入内容"  v-model="filterInput"></el-input>
                    <el-select class="filter-item filter-select" v-model="filterSelect" size="small" placeholder="请选择">
                        <el-option v-for="item in filterSelectOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-select class="filter-item filter-select" v-model="filterSelectSearch" size="small" filterable placeholder="请选择">
                        <el-option v-for="item in filterSelectOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-date-picker class="filter-item filter-datepicker" v-model="filterDatepicker" type="datetime" size="small" placeholder="选择日期时间"></el-date-picker>
                    <el-cascader class="filter-item filter-select" :options="filterCascaderOptions" size="small" clearable></el-cascader>
                    <el-input class="filter-item filter-input" size="small" placeholder="请输入内容"  v-model="filterInput"></el-input>
                    <el-select class="filter-item filter-select" v-model="filterSelect" size="small" placeholder="请选择">
                        <el-option v-for="item in filterSelectOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-select class="filter-item filter-select" v-model="filterSelectSearch" size="small" filterable placeholder="请选择">
                        <el-option v-for="item in filterSelectOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-date-picker class="filter-item filter-datepicker" v-model="filterDatepicker" type="datetime" size="small" placeholder="选择日期时间"></el-date-picker>
                    <el-cascader class="filter-item filter-select" :options="filterCascaderOptions" size="small" clearable></el-cascader>
                </el-col>
                <el-col :xs="14" :sm="12" :md="10" :lg="7" :xl="5">
                    <el-button  size="small" type="primary">搜索</el-button>
                    <el-button  size="small">重置</el-button>
                    <el-button  size="small" type="primary" @click="filterIsCollapse = !filterIsCollapse">{{ filterIsCollapse ? '展开' : '收起' }}</el-button>
                </el-col>
            </el-row>
        </div>
        <div class="table-actions">
            <el-button size="small" type="primary">新建</el-button>
            <el-button size="small">批量操作</el-button>
        </div>
        <div class="table-count-statistics">
        </div>
        <div class="table-list">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="value" label="ID"></el-table-column>
                <el-table-column prop="name" label="银行"></el-table-column>
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button size="mini">编辑</el-button>
                        <el-button size="mini" type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </el-card>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRef, toRefs } from 'vue'
import axios from 'axios'

class CityModel {
    name: string | undefined
    value: string | undefined
}
class SelectOption {
    value: string | undefined
    label: string | undefined
}
interface IState {
    tableData: CityModel[]
    filterSelectOptions: SelectOption[],
    filterCascaderOptions: any[]
}

function loadTableData(state: any) {
    axios.get("/Manage/ashx/Order.ashx?action=get_bank").then((res: any) => {
        state.tableData = [...res.data.Data, ...res.data.Data]
    })
}

export default defineComponent({
    loadTableData() {},
    setup() {
        const filterInput = ref<string>('')
        const filterSelect = ref<string>('')
        const filterSelectSearch = ref<string>('')
        const filterIsCollapse = ref<boolean>(true)
        const filterDatepicker = ref<Date | null>(null)
        const state = reactive<IState> ({
            tableData: [],
            filterSelectOptions: [],
            filterCascaderOptions: []
        })
        onMounted(() => {
            console.log('import.meta.env.VITE_APP_URL',import.meta.env.VITE_APP_URL)
            loadTableData(state)
            state.filterSelectOptions = [{
                value: '选项1',
                label: '黄金糕'
                }, {
                value: '选项2',
                label: '双皮奶'
                }, {
                value: '选项3',
                label: '蚵仔煎'
                }, {
                value: '选项4',
                label: '龙须面'
                }, {
                value: '选项5',
                label: '北京烤鸭'
            }]
            state.filterCascaderOptions = [{
            value: 'zhinan',
            label: '指南',
            children: [{
                value: 'shejiyuanze',
                label: '设计原则',
                children: [{
                value: 'yizhi',
                label: '一致'
                }, {
                value: 'fankui',
                label: '反馈'
                }, {
                value: 'xiaolv',
                label: '效率'
                }, {
                value: 'kekong',
                label: '可控'
                }]
            }, {
                value: 'daohang',
                label: '导航',
                children: [{
                value: 'cexiangdaohang',
                label: '侧向导航'
                }, {
                value: 'dingbudaohang',
                label: '顶部导航'
                }]
            }]
            }, {
            value: 'zujian',
            label: '组件',
            children: [{
                value: 'basic',
                label: 'Basic',
                children: [{
                value: 'layout',
                label: 'Layout 布局'
                }, {
                value: 'color',
                label: 'Color 色彩'
                }, {
                value: 'typography',
                label: 'Typography 字体'
                }, {
                value: 'icon',
                label: 'Icon 图标'
                }, {
                value: 'button',
                label: 'Button 按钮'
                }]
            }, {
                value: 'form',
                label: 'Form',
                children: [{
                value: 'radio',
                label: 'Radio 单选框'
                }, {
                value: 'checkbox',
                label: 'Checkbox 多选框'
                }, {
                value: 'input',
                label: 'Input 输入框'
                }, {
                value: 'input-number',
                label: 'InputNumber 计数器'
                }, {
                value: 'select',
                label: 'Select 选择器'
                }, {
                value: 'cascader',
                label: 'Cascader 级联选择器'
                }, {
                value: 'switch',
                label: 'Switch 开关'
                }, {
                value: 'slider',
                label: 'Slider 滑块'
                }, {
                value: 'time-picker',
                label: 'TimePicker 时间选择器'
                }, {
                value: 'date-picker',
                label: 'DatePicker 日期选择器'
                }, {
                value: 'datetime-picker',
                label: 'DateTimePicker 日期时间选择器'
                }, {
                value: 'upload',
                label: 'Upload 上传'
                }, {
                value: 'rate',
                label: 'Rate 评分'
                }, {
                value: 'form',
                label: 'Form 表单'
                }]
            }, {
                value: 'data',
                label: 'Data',
                children: [{
                value: 'table',
                label: 'Table 表格'
                }, {
                value: 'tag',
                label: 'Tag 标签'
                }, {
                value: 'progress',
                label: 'Progress 进度条'
                }, {
                value: 'tree',
                label: 'Tree 树形控件'
                }, {
                value: 'pagination',
                label: 'Pagination 分页'
                }, {
                value: 'badge',
                label: 'Badge 标记'
                }]
            }, {
                value: 'notice',
                label: 'Notice',
                children: [{
                value: 'alert',
                label: 'Alert 警告'
                }, {
                value: 'loading',
                label: 'Loading 加载'
                }, {
                value: 'message',
                label: 'Message 消息提示'
                }, {
                value: 'message-box',
                label: 'MessageBox 弹框'
                }, {
                value: 'notification',
                label: 'Notification 通知'
                }]
            }, {
                value: 'navigation',
                label: 'Navigation',
                children: [{
                value: 'menu',
                label: 'NavMenu 导航菜单'
                }, {
                value: 'tabs',
                label: 'Tabs 标签页'
                }, {
                value: 'breadcrumb',
                label: 'Breadcrumb 面包屑'
                }, {
                value: 'dropdown',
                label: 'Dropdown 下拉菜单'
                }, {
                value: 'steps',
                label: 'Steps 步骤条'
                }]
            }, {
                value: 'others',
                label: 'Others',
                children: [{
                value: 'dialog',
                label: 'Dialog 对话框'
                }, {
                value: 'tooltip',
                label: 'Tooltip 文字提示'
                }, {
                value: 'popover',
                label: 'Popover 弹出框'
                }, {
                value: 'card',
                label: 'Card 卡片'
                }, {
                value: 'carousel',
                label: 'Carousel 走马灯'
                }, {
                value: 'collapse',
                label: 'Collapse 折叠面板'
                }]
            }]
            }, {
            value: 'ziyuan',
            label: '资源',
            children: [{
                value: 'axure',
                label: 'Axure Components'
            }, {
                value: 'sketch',
                label: 'Sketch Templates'
            }, {
                value: 'jiaohu',
                label: '组件交互文档'
            }]
            }]
        })
        return {
            filterInput,
            filterSelect,
            filterSelectSearch,
            filterIsCollapse,
            filterDatepicker,
            ...toRefs(state)
        }
    },
})
</script>

<style lang="scss" scoped>
.filter-content {
    max-height: 2000px;
    // transition: max-height .28s;
}
.filter-is-collapse .filter-content{
    max-height: 52px;
    overflow: hidden;
    // transition: max-height .28s;
}
.page-content {
    .table-count-statistics {
        height: 40px;
        margin-top: 20px;
        border: 1px solid #bad7f5;
        background-color: #d9ecff;
    }
}

</style>

