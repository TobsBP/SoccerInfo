export interface Team {
  id: number;
  name: string;
  logoUrl: string | null;
  foundedYear?: number | null;
  stadium?: string | null;
  city?: string | null;
  state?: string | null;
  country: string;
  titlesTotal: number;
  titlesLeague: number;
  titlesCup: number;
  titlesIntl: number;
  colors?: string | null;
  website?: string | null;
  socialMedia?: string | null;
}

export interface TeamDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}