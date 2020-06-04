import service from '@/utils/tax'
import qs from 'qs'
import { Message } from 'element-ui';

/**
 * 新增考试
 */

export const createExam = data => service('/exam/create', qs.stringify(data), 'POST');

/**
 * 删除考试
 */

export const deleteExam = data => service('/exam/delete', qs.stringify({exam_id: JSON.stringify(data)}), 'POST');

/**
 * 更新考试
 */

export const updateExam = data => service('/exam/update', qs.stringify(data), 'POST');

/**
 * 查看考试列表
 */

export const examList = data => service('/exam/list', qs.stringify(data), 'POST');

/**
 * 考试详情
 */

export const examDetail = data => service('/exam/detail', qs.stringify({exam_id: JSON.stringify(data)}), 'POST');

/**
 * /exam/startExam
 * 学生接口 开始考试
 */

export const startExam = data => service('/exam/startExam', qs.stringify(data), 'POST');

/**
 * /exam/addRecord
 * 学生接口 记录客观题操作
 */

export const addRecord = data => service('/exam/addRecord', qs.stringify(data), 'POST');

/**
 * /exam/getRecord
 * 学生接口 获得所有操作记录
 */

export const getRecord = data => service('/exam/getRecord', qs.stringify(data), 'POST');

/**
 * /exam/detailForStu
 * 学生接口 考试详情
 */

export const detailForStu = data => service('/exam/detailForStu', qs.stringify(data), 'POST');

/**
 * /exam/myHistoryExam
 * 学生接口 历史考试试卷
 */

export const myHistoryExam = data => service('/exam/myHistoryExamNew', qs.stringify(data), 'POST');

/**
 * /exam/detailHistory
 * 学生接口 历史考试详情
 */

export const detailHistory = data => service('/exam/detailHistory', qs.stringify(data), 'POST');
