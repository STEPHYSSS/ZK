import service from '@/utils/attendance'
import qs from 'qs'
import { Message } from 'element-ui';

/**
 * 员工列表
 */

export const personnelList = data => service('/manage/personnel/list', qs.stringify(data), 'POST');

/**
 * 员工新增
 * @error name不能为空
 */

export const personnelInsert = data => service('/manage/personnel/insert', qs.stringify(data), 'POST');

/**
 * 员工修改
 * @error id不能为空
 */

export const personnelUpdate = data => service('/manage/personnel/update', qs.stringify(data), 'POST');

/**
 * 员工详情
 */

export const personnelDetail = data => service('/manage/personnel/detail', qs.stringify(data), 'POST');

/**
 * 员工重置密码
 */

export const personnelrePwd = data => service('/manage/personnel/modify/password', qs.stringify(data), 'POST');

/**
 * 账号列表
 */

export const accountList = data => service('/manage/account/list', qs.stringify(data), 'POST');

/**
 * 账号新增
 * @error name不能为空
 */

export const accountInsert = data => service('/manage/account/insert', qs.stringify(data), 'POST');

/**
 * 账号修改
 * @error id不能为空
 */

export const accountUpdate = data => service('/manage/account/update', qs.stringify(data), 'POST');

/**
 * 账号详情
 */

export const accountDetail = data => service('/manage/account/detail', qs.stringify(data), 'POST');

/**
 * 账号重置密码
 */

export const accountrePwd = data => service('/manage/account/modify/password', qs.stringify(data), 'POST');

/**
 * 本人修改密码
 */

export const rePwd = data => service('/manage/account/change/password', qs.stringify(data), 'POST');