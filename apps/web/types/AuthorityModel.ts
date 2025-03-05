enum Authority {
  NO_ACCESS,
  INVENTORY,
  KIOSK,
  PAYROLL,
  ROLE_ADMIN,
  ROLE_EMPLOYEE,
  ROLE_GUEST,
}

interface AuthorityModel {
  authority: Authority;
}

function extractRole(authorityModels: AuthorityModel[]): string[] {
  return authorityModels
    .filter((model) => {
      // Convert enum value to string to check if it starts with "ROLE_"
      const authorityString = model.authority.toString();
      return authorityString.startsWith("ROLE_");
    })
    .map((model) => {
      // Get the role name by removing "ROLE_" prefix
      const authorityString = model.authority.toString();
      return authorityString.substring(5);
    });
}

export { Authority, extractRole, type AuthorityModel };
