import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  year: number;

  artistId: string | null; // refers to Artist
}
