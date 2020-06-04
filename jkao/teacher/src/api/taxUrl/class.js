import service from '@/utils/tax'
import qs from 'qs'
import { Message } from 'element-ui';

/**
 * 班级列表
 */

export const classList = () => service('/class/list', {}, 'POST');