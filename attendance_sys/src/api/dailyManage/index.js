import service from '@/utils/attendance'
import qs from 'qs'
import { Message } from 'element-ui';

/**
 * 获取考核标准
 */

export const getStandard = data => service('/manage/grade/standard/get', qs.stringify(data), 'POST');

/**
 * 评分列表
 */

export const gradeList = data => service('/manage/grade/list', qs.stringify(data), 'POST');

/**
 * 评分详情
 */

export const gradeDetail = data => service('/manage/grade/detail', qs.stringify(data), 'POST');

/**
 * 评分作废
 */

export const gradeCancel = data => service('/manage/grade/cancel', qs.stringify(data), 'POST');

/**
 * 评分审核提交
 */

export const gradeCheck = data => service('/manage/grade/check', qs.stringify(data), 'POST');

/**
 * 申诉列表
 */

export const appealList = data => service('/manage/appeal/list', qs.stringify(data), 'POST');

/**
 * 申诉详情
 */

export const appealDetail = data => service('/manage/appeal/detail', qs.stringify(data), 'POST');

/**
 * 申诉审核提交
 * @error name不能为空
 */

export const appealCheck = data => service('/manage/appeal/check', qs.stringify(data), 'POST');

/**
 * 请假列表
 * @error id不能为空
 */

export const leaveList = data => service('/manage/leave/list', qs.stringify(data), 'POST');

/**
 * 请假详情
 */

export const leaveDetail = data => service('/manage/leave/detail', qs.stringify(data), 'POST');

/**
 * 请假审核提交
 */

export const leaveCheck = data => service('/manage/leave/check', qs.stringify(data), 'POST');