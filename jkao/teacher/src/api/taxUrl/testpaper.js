import service from '@/utils/tax'
import qs from 'qs'
import { Message } from 'element-ui';

/**
 * 新增试卷 教师或管理员权限
 */

export const createPaper = data => service('/testpaper/create', qs.stringify({testpaper: JSON.stringify(data)}), 'POST');

/**
 * 新增试卷类型 教师或管理员权限
 */

export const createTypePaper = data => service('/testpaper/createType', qs.stringify({testpaper_type: JSON.stringify(data)}), 'POST');

/**
 * 删除试卷 试卷创建人或管理员权限
 */

export const deletePaper = data => service('/testpaper/delete', qs.stringify({testpaper_id: JSON.stringify(data)}), 'POST');

/**
 * 删除试卷类型 试卷类型的创建人或管理员权限
 */

export const deleteTypePaper = data => service('/testpaper/deleteType', qs.stringify({type_id: JSON.stringify(data)}), 'POST');

/**
 * 更新试卷  试卷创建人和管理员权限
 */

export const updatePaper = data => service('/testpaper/update', qs.stringify({testpaper: JSON.stringify(data)}), 'POST');

/**
 * 更新试卷类型  试卷类型创建人或管理员权限
 */

export const updateTypePaper = data => service('/testpaper/updateType', qs.stringify({testpaper_type: JSON.stringify(data)}), 'POST');

/**
 * 试卷列表
 */

export const getPapers = data => service('/testpaper/list', qs.stringify(data), 'POST');

/**
 * 试卷类型列表
 */

export const getTypePapers = data => service('/testpaper/listType', qs.stringify(data), 'POST');

/**
 * 试卷详情
 */

export const paperDetail = data => service('/testpaper/detail', qs.stringify({testpaper_id: JSON.stringify(data)}), 'POST');

/**
 * 试卷设置详情
 */

export const papersetDetail = data => service('/testpaper/setDetail', qs.stringify({testpaper_id: JSON.stringify(data)}), 'POST');

/**
 * 设置试卷
 */

export const typePaperSet = data => service('/testpaper/set', qs.stringify(data), 'POST');