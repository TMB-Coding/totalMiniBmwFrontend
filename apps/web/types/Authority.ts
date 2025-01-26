enum Authority {
  NO_ACCESS,
  INVENTORY,
  KIOSK,
  PAYROLL,
}

interface AuthorityModel {
  authority: Authority;
}

export { type AuthorityModel, Authority };
