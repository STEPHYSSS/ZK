import service from '@/utils/attendance'
import qs from 'qs'
import { Message } from 'element-ui';

/**
 * 广告列表
 */

export const advertList = data => service('/manage/advert/list', qs.stringify(data), 'POST');

/**
 * 广告新增
 * @error name不能为空
 */

export const advertInsert = data => service('/manage/advert/insert', qs.stringify(data), 'POST');

/**
 * 广告修改
 * @error id不能为空
 */

export const advertUpdate = data => service('/manage/advert/update', qs.stringify(data), 'POST');

/**
 * 广告详情
 */

export const advertDetail = data => service('/manage/advert/detail', qs.stringify(data), 'POST');

/**
 * 广告删除
 */

export const advertDelete = data => service('/manage/advert/delete', qs.stringify(data), 'POST');

/**
 * 图片上传
 */

export const uploadImage = data => service('/image/upload', data, 'POST');