import service from '@/utils/tax'
import qs from 'qs'
import { Message } from 'element-ui';

/**
 * 考试管理 详情
 */

export const getStuExamAys = data => service('/analysis/getStuExamAys', qs.stringify(data), 'POST');

/**
 * 查看详情
 */

export const detailForAys = data => service('/exam/detailForAys', qs.stringify(data), 'POST');