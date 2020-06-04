import service from '@/utils/tax'
import { Message } from 'element-ui';

/**
 * 获取服务器当前时间
 */

export const getDate = () => {
    return new Promise((resolve, reject) => {
        service('/common/getDate', {}, 'POST').then(res => {
            const { code, date } = res.data
            if (code == '0000') {
                resolve(date)
            } else {
                Message.error('获取当前服务器时间失败, 请刷新页面')
            }
        }).catch(err => {
            Message.error('获取当前服务器时间失败, 请刷新页面')
        })
    })
}


/**
 * 去除word复制格式
 */

export const cleanWord = html => {
    html = html.replace(/<\/?SPAN[^>]*>/gi, "");
    html = html.replace(/<(\w[^>]*)class=([^|>]*)([^>]*)/gi, "<$1$3"); //Remove Class attributes
    html = html.replace(/<(\w[^>]*)style="([^"]*)"([^>]*)/gi, "<$1$3"); //Remove Style attributes
    html = html.replace(/<(\w[^>]*)lang=([^|>]*)([^>]*)/gi, "<$1$3"); //Remove Lang attributes
    html = html.replace(/<\\?\?xml[^>]*>/gi, ""); //Remove XMLelementsanddeclarations
    html = html.replace(/<\/?\w+:[^>]*>/gi, ""); //Remove TagswithXMLnamespacedeclarations:<o:p></o:p>
    html = html.replace(/&nbsp;/, ""); //Replacethe&nbsp;
    html = html.replace(/<!--\[if\s+gte\s+mso\s+9\]>(?:(?!<!\[endif\]-->)[\s\S])*<!\[endif\]-->/gi, "") //Transform<P>to<DIV>
    html = html.replace(/<!--\[if\s+gte\s+mso\s+10\]>(?:(?!<!\[endif\]-->)[\s\S])*<!\[endif\]-->/gi, "")

    let strEnd = html.substring(html.indexOf('<style>'), html.indexOf('</style>'))
    html = changeStr(html, html.indexOf('<style>'), html.indexOf('</style>'), strEnd, '')
        // var abc = new RegExp('</style>', 'g')
        // html=html.replace(abc, "")
    var re = new RegExp("(<P)([^>]*>.*?)(<\/P>)", "gi"); //DifferentbecauseofaIE5.0error
    html = html.replace(re, "<div$2</div>");
    html = html.trim()
    return html
}

function changeStr(allstr, start, end, str, changeStr) { //allstr:原始字符串，start,开始位置,end: 结束位置,str: 要改变的字, changeStr:改变后的字
    let first = allstr.substring(0, start - 1) + changeStr + allstr.substring(end, allstr.length);
    first = first.replace('</style>', "")
    let strEnd = first.substring(first.indexOf('<style>'), first.indexOf('</style>'))
    if (strEnd === '') return first
    else {
        first = first.substring(0, first.indexOf('<style>') - 1) + '' + first.substring(first.indexOf('</style>'), first.length);
        first = first.replace('</style>', "")
        return first
    }
}

/**
 * 导出excel
 */
export function export2Excel(columns, list, fileTitle) {
    require.ensure([], () => {
        const { export_json_to_excel } = require('@/excel/Export2Excel');
        let tHeader = []
        let filterVal = []
        for (const { title, key }
            of columns) {
            tHeader.push(title)
            filterVal.push(key)
        }
        const data = list.map(v => filterVal.map(j => v[j]))
        export_json_to_excel(tHeader, data, fileTitle);
    })
}