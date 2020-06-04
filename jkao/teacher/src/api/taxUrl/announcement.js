import service from '@/utils/tax'
import qs from 'qs'
import { Message } from 'element-ui';

/**
 * 新增公告
 */

export const newNotice = data => service('/anno/create', qs.stringify({anno: JSON.stringify(data)}), 'POST');

/**
 * 新增公告分类
 */

export const newNoticeType = data => service('/anno/createType', qs.stringify({anno_type: JSON.stringify(data)}), 'POST');

/**
 * 删除公告
 */

export const delNotice = data => service('/anno/delete', qs.stringify({anno_id: JSON.stringify(data)}), 'POST');

/**
 * 删除公告分类
 */

export const delNoticeType = data => service('/anno/deleteType', qs.stringify({anno_type_id: JSON.stringify(data)}), 'POST');

/**
 * 更新公告
 */

export const updateNotice = data => service('/anno/update', qs.stringify({anno: JSON.stringify(data)}), 'POST');

/**
 * 更新公告分类
 */

export const updateNoticeType = data => service('/anno/updateType', qs.stringify({anno_type: JSON.stringify(data)}), 'POST');

/**
 * 公告列表
 */

export const noticeList = data => service('/anno/list', qs.stringify(data), 'POST');

/**
 * 公告分类列表
 */

export const noticeListType = data => service('/anno/listType', qs.stringify(data), 'POST');
