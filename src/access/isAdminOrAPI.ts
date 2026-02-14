import { Access, FieldAccess } from "payload/types";

export const isAdminOrAPI: Access = ({ req: { user } }) => {
  if (user?.role === "admin" || user?.role === "api") return true;

  return false;
};

export const isAdminOrAPIFieldLevel: FieldAccess = ({ req: { user } }) => {
  if (user?.role === "admin" || user?.role === "api") return true;

  return false;
};
