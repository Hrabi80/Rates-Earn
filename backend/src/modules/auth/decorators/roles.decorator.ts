import { SetMetadata } from '@nestjs/common';
import { UserRoles } from 'src/modules/user/enums/user.enum';

/*
    ROLES_KEY and Roles:
        Define a key for role-based access control
        The ROLES_KEY constant is used to uniquely identify the metadata for role-based access control.
        The Roles decorator uses SetMetadata to associate roles with specific routes.
        Example usage: @Roles(UserRoles.ADMIN, UserRoles.MODERATOR).
 */
export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRoles[]) => SetMetadata(ROLES_KEY, roles);

/*
    IS_PUBLIC_KEY and Public:
        Define a key for public access
        The IS_PUBLIC_KEY constant is used to mark routes as public.
        The Public decorator allows routes to bypass authentication and authorization guards.
        Example usage: @Public().
 */

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
