import service from '@/utils/tax'
import { Message } from 'element-ui';

/**
 * 获取试卷列表
 */

export const getFindPapers = () => service('exam/sys/findPapers', {}, 'POST');

/**
 * 获取排名
 */

export const getTestTopMan = () => service('exam/test/findTestTopMan', {}, 'POST');