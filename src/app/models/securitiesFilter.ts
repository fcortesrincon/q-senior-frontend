export interface PagingFilter {
  skip?: number;
  limit?: number;
}

export interface SecuritiesFilter extends PagingFilter {
  name?: string;
  types?: string[];
  currencies?: string[];
  isPrivate?: boolean;
}
//Only for testing porpoises
export interface SecuritiesTypesAndCurrencies {
  types: string[];
  currencies: string[];
}
