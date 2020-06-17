import service from '@/utils/attendance'
import qs from 'qs'
import { Message } from 'element-ui';

/**
 * 登录
 */

export const login = data => service('/manage/index/login', qs.stringify(data), 'POST');