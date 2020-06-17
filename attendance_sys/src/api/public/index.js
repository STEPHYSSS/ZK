import { Message } from 'element-ui';
import axios from 'axios'
import qs from 'qs'
/**
 * 去除word复制格式
 */
/**
 * 清楚word文档复制的格式
 */
export const cleanWord = html => {
	html = html.replace(/<\/?SPAN[^>]*>/gi,"");
	html = html.replace(/<(\w[^>]*)class=([^|>]*)([^>]*)/gi,"<$1$3"); //Remove Class attributes
	html = html.replace(/<(\w[^>]*)style="([^"]*)"([^>]*)/gi,"<$1$3"); //Remove Style attributes
	html = html.replace(/<(\w[^>]*)lang=([^|>]*)([^>]*)/gi,"<$1$3"); //Remove Lang attributes
	html = html.replace(/<\\?\?xml[^>]*>/gi,""); //Remove XMLelementsanddeclarations
	html = html.replace(/<\/?\w+:[^>]*>/gi,""); //Remove TagswithXMLnamespacedeclarations:<o:p></o:p>
	html = html.replace(/&nbsp;/,""); //Replacethe&nbsp;
	html = html.replace(/<!--\[if\s+gte\s+mso\s+9\]>(?:(?!<!\[endif\]-->)[\s\S])*<!\[endif\]-->/gi, "") //Transform<P>to<DIV>
	html = html.replace(/<!--\[if\s+gte\s+mso\s+10\]>(?:(?!<!\[endif\]-->)[\s\S])*<!\[endif\]-->/gi, "")

	let strEnd = html.substring(html.indexOf('<style>'), html.indexOf('</style>'))
	html = changeStr(html, html.indexOf('<style>'), html.indexOf('</style>'), strEnd, '')
	// var abc = new RegExp('</style>', 'g')
	// html=html.replace(abc, "")
	var re = new RegExp("(<P)([^>]*>.*?)(<\/P>)","gi");//DifferentbecauseofaIE5.0error
	html = html.replace(re,"<div$2</div>");
	html = html.trim()
	return html
}
function changeStr (allstr,start,end,str,changeStr) { //allstr:原始字符串，start,开始位置,end: 结束位置,str: 要改变的字, changeStr:改变后的字
	let first = allstr.substring(0,start-1)+changeStr+allstr.substring(end,allstr.length);
	first=first.replace('</style>', "")
	let strEnd = first.substring(first.indexOf('<style>'), first.indexOf('</style>'))
	if (strEnd === '') return first
	else {
		first = first.substring(0,first.indexOf('<style>')-1)+''+first.substring(first.indexOf('</style>'),first.length);
		first=first.replace('</style>', "")
		return first
	}
}

/**
 * 导出excel
 */
export function export2Excel(columns,list,fileTitle){
  require.ensure([], () => {
    const { export_json_to_excel } = require('@/excel/Export2Excel');
    let tHeader = []
    let filterVal = []
    for (const {title, key} of columns) {
      tHeader.push(title)
      filterVal.push(key)
    }
    const data = list.map(v => filterVal.map(j => v[j]))
    export_json_to_excel(tHeader, data, fileTitle);
  })
}

/**
 * 导出文件流excel
 */
export function download(data) {
	axios({
			method: data.method,
			url: `${data.url}`,
			data: qs.stringify(data.data),
			responseType: 'blob',
			headers: {'token': sessionStorage.getItem('token')}
	}).then((res) => {
			const link = document.createElement('a')
			let blob = new Blob([res.data], {type: 'application/vnd.ms-excel'})
			link.style.display = 'none'
			link.href = URL.createObjectURL(blob)

			// link.download = res.headers['content-disposition'] //下载后文件名
			link.download = data.fileName //下载的文件名
			document.body.appendChild(link)
			link.click()
			document.body.removeChild(link)
	}).catch(error => {
			console.log(error)
	})
	// axios({
	// 		method: data.method,
	// 		url: `${data.url}`,
	// 		data: qs.stringify(data.data),
	// 		responseType: 'blob',
	// 		headers: {'token': sessionStorage.getItem('token')}
	// 	}).then(res => {
	// 	let blob = new Blob([res], { type: 'application/vnd.ms-excel' });
	// 	let objectUrl = URL.createObjectURL(blob);
	// 	window.location.href = objectUrl;
	// });
}

/**
 * 验证邮箱
 */
export const checkEmail = data => {
	let reg = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/;
	if (!reg.test(data)) {
		Message.error("请正确输入邮箱!");
		return '';
	}else {
		return data
	}
}
/**
 * 验证邮箱
 */
export const checkPhone = phone => { 
	if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone))){ 
		Message.error("手机号码有误，请重填!");
		return ''; 
	}else {
		return phone
	}
}