export class Artist {
  constructor(partial: Partial<Artist>) {
    Object.assign(this, partial);
  }

  id: string; // uuid v4
  name: string;
  grammy: boolean;
}
