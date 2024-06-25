import type { App, Directive, DirectiveBinding } from 'vue';
import useUserInfoStore from '@/store/modules/user';
import { isString, includes } from 'lodash';
import { hasAuth } from '@/utils/auth';

export function hasRole(value: string | Array<string>): boolean {
  const super_admin = 'admin';
  const roles = useUserInfoStore().roles;
  let roleFlag = value;
  if (isString(value)) {
    roleFlag = [value];
  }

  if (roleFlag && roleFlag instanceof Array && roleFlag.length > 0) {
    const hasRole = roles!.some(
      (role) => super_admin === role || roleFlag.includes(role)
    );

    return hasRole;
  } else {
    throw new Error(
      'need role! Like v-role="[\'admin\',\'common\']" or v-role="admin"'
    );
  }
}

const authDirective: Directive = {
  mounted: (el: Element, binding: DirectiveBinding) => {
    const { value } = binding;

    if (value) {
      !hasAuth(value) && el.parentNode?.removeChild(el);
    } else {
      throw new Error("need auths! Like v-auth=\"['btn.add','btn.edit']\"");
    }
  }
};

export default function useAuth(app: App) {
  app.directive('auth', authDirective);
}
