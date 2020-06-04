import service from '@/utils/tax'
import qs from 'qs'
import { Message } from 'element-ui';

/**
 * 新建自测
 */

export const selfExamCreate = data => service('/selfExam/create', qs.stringify(data), 'POST');

/**
 * 删除自测
 */

export const selfExamDelete = data => service('/selfExam/delete', qs.stringify(data), 'POST');

/**
 * 更新自测
 */

export const selfExamUpdate = data => service('/selfExam/update', qs.stringify(data), 'POST');

/**
 * 自测列表
 */

export const selfExamList = data => service('/selfExam/list', qs.stringify(data), 'POST');

/**
 * 开始自测
 */

export const selfExamStart = data => service('/selfExam/start', qs.stringify(data), 'POST');

/**
 * 自测详情
 */

export const selfExamDetail = data => service('/selfExam/detail', qs.stringify(data), 'POST');

/**
 * 记录客观题操作
 */

export const selfExamAddRecord = data => service('/selfExam/addRecord', qs.stringify(data), 'POST');

/**
 * 交卷操作
 */

export const selfExamSubmit = data => service('/selfExam/submit', qs.stringify(data), 'POST');

/**
 * 获得所有操作记录
 */

export const selfExamGetRecord = data => service('/selfExam/getRecord', qs.stringify(data), 'POST');

/**
 * 开始实训训练 ->实际即为创建一场只有该实训题的自测
 */

export const selfExamPrcTraining = data => service('/selfExam/prcTraining', qs.stringify(data), 'POST');