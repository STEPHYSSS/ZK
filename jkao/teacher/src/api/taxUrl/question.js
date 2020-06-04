import service from '@/utils/tax'
import qs from 'qs'
import { Message } from 'element-ui';

/**
 * 客观题库列表
 */

export const questionBack = () => service('/question/obj/listBank', {}, 'POST');

/**
 * 客观题列表
 */

export const questionList = data => service('/question/obj/listQu', qs.stringify(data), 'POST');

/**
 * 锁定客观题
 */

export const lockQu = data => service('/question/obj/lockQu', qs.stringify(data), 'POST');

/**
 * 实训题列表
 */

export const questionPrcList = data => service('/question/prc/listQu', qs.stringify(data), 'POST');

/**
 * 实训题库列表
 */

export const questionPrcBack = () => service('/question/prc/listBank', {}, 'POST');