import service from '@/utils/attendance'
import qs from 'qs'
import { Message } from 'element-ui';

/**
 * 考勤规则列表
 */

export const attendanceList = data => service('/manage/attendance/rule/list', qs.stringify(data), 'POST');

/**
 * 考勤规则新增
 * @error name不能为空
 */

export const attendanceInsert = data => service('/manage/attendance/rule/insert', qs.stringify(data), 'POST');

/**
 * 考勤规则修改
 * @error id不能为空
 */

export const attendanceUpdate = data => service('/manage/attendance/rule/update', qs.stringify(data), 'POST');

/**
 * 考勤规则详情
 */

export const attendanceDetail = data => service('/manage/attendance/rule/detail', qs.stringify(data), 'POST');

/**
 * 考勤规则删除
 */

export const attendanceDelete = data => service('/manage/attendance/rule/delete', qs.stringify(data), 'POST');

/**
 * 考勤规则绑定员工
 */

export const attendanceBind = data => service('/manage/attendance/rule/bind', qs.stringify(data), 'POST');

/**
 * 考勤规则已绑定用户ID数组
 */

export const attAlreadyBind = data => service('/manage/attendance/rule/alreadyBind', qs.stringify(data), 'POST');

/**
 * 考勤记录列表
 */

export const recordList = data => service('/manage/clock/record/list', qs.stringify(data), 'POST');

/**
 * 考勤记录编辑
 * @error name不能为空
 */

export const recordUpdate = data => service('/manage/clock/record/update', qs.stringify(data), 'POST');

/**
 * 考勤记录导出
 * @error id不能为空
 */

export const recordExport = data => service('/manage/clock/record/export', qs.stringify(data), 'POST');

/**
 * 考勤统计列表
 */

export const statisticList = data => service('/manage/clock/record/statistic/list', qs.stringify(data), 'POST');

/**
 * 考勤统计导出
 */

export const statisticExport = data => service('/manage/clock/record/statistic/export', qs.stringify(data), 'POST');

/**
 * 考勤统计导出
 */

export const ruleBan = data => service('/manage/attendance/rule/ban', qs.stringify(data), 'POST');