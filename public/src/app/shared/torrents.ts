export interface Torrents {
  status: number;
  data: {
    total: number;
    pages: number;
    torrents: Torrent[];
  };
}

export interface Torrent {
  id: string;
  name: string;
  size: string;
  added: Date;
  scenerelease: string;
  kat_main: string;
  kat_sub_1: string;
  kat_sub_2: string;
  kat_sub_3: string;
  added_unix: string;
  main_name: string;
  sub1_name: string;
  sub2_name: string;
  sub3_name: string;
  info_hash: string;
  seeders: string;
  leechers: string;
  freeleech: number;
  freeleech_time: number;
}