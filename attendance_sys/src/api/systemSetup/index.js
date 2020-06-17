import service from '@/utils/attendance'
import qs from 'qs'
import { Message } from 'element-ui';

/**
 * 岗位列表
 */

export const stationList = data => service('/manage/section/list', qs.stringify(data), 'POST');

/**
 * 岗位新增
 */

export const stationInsert = data => service('/manage/section/insert', qs.stringify(data), 'POST');

/**
 * 岗位修改
 */

export const stationUpdate = data => service('/manage/section/update', qs.stringify(data), 'POST');

/**
 * 岗位详情
 */

export const stationDetail = data => service('/manage/section/detail', qs.stringify(data), 'POST');

/**
 * 岗位删除
 */

export const stationreDel = data => service('/manage/section/delete', qs.stringify(data), 'POST');

/**
 * 岗位记录列表
 */

export const recordList = data => service('/manage/section/record/list', qs.stringify(data), 'POST');

/**
 * 岗位记录修改
 */

export const recordChange = data => service('/manage/section/record/change', qs.stringify(data), 'POST');

/**
 * 角色列表
 */

export const roleList = data => service('/manage/role/list', qs.stringify(data), 'POST');

/**
 * 角色新增
 * @error name不能为空
 */

export const roleInsert = data => service('/manage/role/insert', qs.stringify(data), 'POST');

/**
 * 角色修改
 * @error id不能为空
 */

export const roleUpdate = data => service('/manage/role/update', qs.stringify(data), 'POST');

/**
 * 角色详情
 */

export const roleDetail = data => service('/manage/role/detail', qs.stringify(data), 'POST');

/**
 * 角色删除
 */

export const roleDel = data => service('/manage/role/delete', qs.stringify(data), 'POST');

/**
 * 权限树结构
 */

export const powerTree = () => service('/manage/power/tree', {}, 'POST');